// Header parsers for the media manifest (wugweb-work Part 2, B2).
// Pure functions over Buffers: no network, no disk, no dependencies.
// The caller fetches a byte range and asks again with more bytes when a
// parser returns { needMore }.

/**
 * Pixel size from the first bytes of an image.
 * @returns {{type:string,w:number,h:number}|{type:string,needMore:number}|null}
 *   `needMore` is the byte count the parser wants to see (the whole prefix).
 */
export function imageDims(b) {
  if (!b || !b.length) return null;
  if (b.length < 12) return { type: 'unknown', needMore: 65536 };
  // PNG: IHDR is always the first chunk.
  if (b.readUInt32BE(0) === 0x89504e47 && b.readUInt32BE(4) === 0x0d0a1a0a) {
    if (b.length < 24) return { type: 'png', needMore: 24 };
    return { type: 'png', w: b.readUInt32BE(16), h: b.readUInt32BE(20) };
  }
  // GIF87a / GIF89a: logical screen size.
  if (b.toString('ascii', 0, 3) === 'GIF') return { type: 'gif', w: b.readUInt16LE(6), h: b.readUInt16LE(8) };
  // WebP: VP8X (extended), VP8L (lossless), VP8 (lossy).
  if (b.toString('ascii', 0, 4) === 'RIFF' && b.toString('ascii', 8, 12) === 'WEBP') {
    if (b.length < 30) return { type: 'webp', needMore: 30 };
    const c = b.toString('ascii', 12, 16);
    if (c === 'VP8X') return { type: 'webp', w: 1 + b.readUIntLE(24, 3), h: 1 + b.readUIntLE(27, 3) };
    if (c === 'VP8L') { const x = b.readUInt32LE(21); return { type: 'webp', w: 1 + (x & 0x3fff), h: 1 + ((x >>> 14) & 0x3fff) }; }
    if (c === 'VP8 ') return { type: 'webp', w: b.readUInt16LE(26) & 0x3fff, h: b.readUInt16LE(28) & 0x3fff };
    return null;
  }
  // JPEG: walk the markers in order until a SOF.
  if (b[0] === 0xff && b[1] === 0xd8) return jpegDims(b);
  // AVIF / HEIF: ISO BMFF with an `ispe` property box.
  if (b.toString('ascii', 4, 8) === 'ftyp' && /avif|avis|heic|heix|mif1/.test(b.toString('ascii', 8, 32))) {
    const i = b.indexOf('ispe');
    if (i < 0) return { type: 'avif', needMore: b.length * 4 };
    if (i + 16 > b.length) return { type: 'avif', needMore: i + 16 };
    return { type: 'avif', w: b.readUInt32BE(i + 8), h: b.readUInt32BE(i + 12) };
  }
  // SVG: width/height attributes, else the viewBox.
  const head = b.toString('utf8', 0, Math.min(b.length, 4096));
  if (/<svg[\s>]/i.test(head)) return svgDims(head);
  return null;
}

const SOF = (m) => m >= 0xc0 && m <= 0xcf && m !== 0xc4 && m !== 0xc8 && m !== 0xcc;

/** JPEG markers, scanned sequentially. Large EXIF/ICC/XMP push SOF past 64 KB. */
export function jpegDims(b) {
  let i = 2;
  while (i < b.length) {
    if (b[i] !== 0xff) { i++; continue; }
    while (i < b.length && b[i] === 0xff) i++; // fill bytes
    if (i >= b.length) break;
    const m = b[i]; i++;
    if (m === 0xd8 || m === 0x01 || (m >= 0xd0 && m <= 0xd7)) continue; // standalone markers
    if (m === 0xd9 || m === 0xda) return null; // end or scan data before any SOF
    if (i + 2 > b.length) return { type: 'jpeg', needMore: i + 2 };
    const len = b.readUInt16BE(i);
    if (SOF(m)) {
      if (i + 7 > b.length) return { type: 'jpeg', needMore: i + 7 };
      return { type: 'jpeg', h: b.readUInt16BE(i + 3), w: b.readUInt16BE(i + 5) };
    }
    i += len;
  }
  return { type: 'jpeg', needMore: Math.max(i + 4096, b.length * 2) };
}

function svgDims(s) {
  const tag = (s.match(/<svg\b[^>]*>/i) || [''])[0];
  const num = (name) => { const m = tag.match(new RegExp(`\\s${name}\\s*=\\s*["']\\s*([\\d.]+)\\s*(px)?\\s*["']`, 'i')); return m ? +m[1] : null; };
  let w = num('width'); let h = num('height');
  if (!w || !h) {
    const vb = tag.match(/viewBox\s*=\s*["']\s*[-\d.]+[\s,]+[-\d.]+[\s,]+([\d.]+)[\s,]+([\d.]+)/i);
    if (vb) { w = +vb[1]; h = +vb[2]; }
  }
  return w && h ? { type: 'svg', w: Math.round(w), h: Math.round(h) } : { type: 'svg' };
}

// ------------------------------------------------------------------- MP4

/**
 * Top-level boxes found in `b`, which starts at absolute file offset `base`.
 * A box that runs past the buffer is still listed (its size comes from the
 * header: `size == 1` is a 64-bit largesize, `size == 0` runs to end of file).
 * The walk stops there and returns `next`, the absolute offset of the box
 * after it, so the caller can range-read that header (this is how the walk
 * jumps over `mdat` to a `moov` stored at the end).
 */
export function mp4TopBoxes(b, base = 0, fileSize = Infinity) {
  const boxes = []; let i = 0; let next = null;
  while (i + 8 <= b.length) {
    let size = b.readUInt32BE(i); const type = b.toString('latin1', i + 4, i + 8);
    let header = 8;
    if (size === 1) { if (i + 16 > b.length) { next = base + i; break; } size = Number(b.readBigUInt64BE(i + 8)); header = 16; }
    else if (size === 0) size = fileSize - (base + i);
    if (!/^[\x20-\x7e]{4}$/.test(type) || size < header) break; // not a box: stop
    boxes.push({ type, off: base + i, size, header });
    if (i + size > b.length) { next = base + i + size; break; }
    i += size;
  }
  if (next == null && i < b.length && boxes.length) next = base + i;
  return { boxes, next: next != null && next < fileSize ? next : null };
}

/** Children of a container box whose content is `b` (box header already skipped). */
function children(b) {
  const out = []; let i = 0;
  while (i + 8 <= b.length) {
    let size = b.readUInt32BE(i); const type = b.toString('latin1', i + 4, i + 8); let header = 8;
    if (size === 1) { size = Number(b.readBigUInt64BE(i + 8)); header = 16; } else if (size === 0) size = b.length - i;
    if (size < header || i + size > b.length) break;
    out.push({ type, body: b.subarray(i + header, i + size) });
    i += size;
  }
  return out;
}
const child = (b, type) => children(b).find((c) => c.type === type);

/**
 * Duration, display size, rotation and audio from a whole `moov` box (header
 * included). `mvhd` v1 has 64-bit fields; the `tkhd` matrix gives rotation
 * (90/270 swap width and height). The video track is the one whose `hdlr` is
 * `vide`; the largest track size is used if no handler says so.
 */
export function parseMoov(moov) {
  const body = moov.subarray(moov.readUInt32BE(0) === 1 ? 16 : 8);
  const res = { audio: false };
  const mvhd = child(body, 'mvhd');
  if (mvhd) {
    const v = mvhd.body[0];
    const ts = v === 1 ? mvhd.body.readUInt32BE(20) : mvhd.body.readUInt32BE(12);
    const du = v === 1 ? Number(mvhd.body.readBigUInt64BE(24)) : mvhd.body.readUInt32BE(16);
    if (ts) res.duration = +(du / ts).toFixed(2);
  }
  let best = null;
  for (const t of children(body).filter((c) => c.type === 'trak')) {
    const tk = child(t.body, 'tkhd'); if (!tk) continue;
    const v = tk.body[0];
    const base = v === 1 ? 88 : 76; // width offset inside the tkhd content
    if (tk.body.length < base + 8) continue;
    const a = tk.body.readInt32BE(base - 36); const bb = tk.body.readInt32BE(base - 32);
    let w = tk.body.readUInt32BE(base) >>> 16; let h = tk.body.readUInt32BE(base + 4) >>> 16;
    let rotation = 0;
    if (a === 0 && bb > 0) rotation = 90; else if (a === 0 && bb < 0) rotation = 270; else if (a < 0) rotation = 180;
    if (rotation === 90 || rotation === 270) [w, h] = [h, w];
    const mdia = child(t.body, 'mdia'); const hdlr = mdia && child(mdia.body, 'hdlr');
    const handler = hdlr ? hdlr.body.toString('latin1', 8, 12) : '';
    if (handler === 'soun') { res.audio = true; continue; }
    if (!w || !h) continue;
    const cand = { w, h, rotation, video: handler === 'vide' };
    if (!best || (cand.video && !best.video) || (cand.video === best.video && w * h > best.w * best.h)) best = cand;
  }
  if (best) { res.w = best.w; res.h = best.h; if (best.rotation) res.rotation = best.rotation; }
  return res;
}

/** Shape from h/w (wugweb-work media standard). */
export function shapeOf(w, h) {
  if (!w || !h) return null;
  const r = h / w;
  if (w >= 1280 && r >= 1.75) return 'scrollshot';
  if (r >= 1.75) return 'phone';
  if (r >= 1.2) return 'tall';
  if (r >= 0.85) return 'square';
  if (r >= 0.5) return 'landscape';
  return 'wide';
}
