// node --test scripts/lib/media-manifest.test.mjs
// Header parsers on tiny fixture buffers built in memory, plus the pure
// manifest rules. No network.
import test from 'node:test';
import assert from 'node:assert/strict';
import { imageDims, jpegDims, mp4TopBoxes, parseMoov, shapeOf } from './image-dims.mjs';
import {
  toUrl, keyOf, folderOf, bodyMedia, resolveOwnFolder, slugFolder, stem, flowOf, markDuplicates,
  suspectFor, createFetcher, measure, measureVideo, openCache, R2_BASE,
} from './media-manifest.mjs';

// ---------------------------------------------------------------- fixtures
function png(w, h) {
  const b = Buffer.alloc(33); Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]).copy(b, 0);
  b.writeUInt32BE(13, 8); b.write('IHDR', 12, 'ascii'); b.writeUInt32BE(w, 16); b.writeUInt32BE(h, 20); return b;
}
function gif(w, h) { const b = Buffer.alloc(13); b.write('GIF89a', 0, 'ascii'); b.writeUInt16LE(w, 6); b.writeUInt16LE(h, 8); return b; }
function webpX(w, h) {
  const b = Buffer.alloc(30); b.write('RIFF', 0, 'ascii'); b.write('WEBP', 8, 'ascii'); b.write('VP8X', 12, 'ascii');
  b.writeUIntLE(w - 1, 24, 3); b.writeUIntLE(h - 1, 27, 3); return b;
}
function webpL(w, h) {
  const b = Buffer.alloc(30); b.write('RIFF', 0, 'ascii'); b.write('WEBP', 8, 'ascii'); b.write('VP8L', 12, 'ascii');
  b[20] = 0x2f; b.writeUInt32LE(((w - 1) & 0x3fff) | (((h - 1) & 0x3fff) << 14), 21); return b;
}
/** JPEG with an APPn segment of `pad` bytes before the SOF0. */
function jpeg(w, h, pad = 16) {
  const segs = []; let left = pad;
  while (left > 0) { const n = Math.min(left, 60000); const a = Buffer.alloc(4 + n); a[0] = 0xff; a[1] = 0xe1; a.writeUInt16BE(n + 2, 2); segs.push(a); left -= n; }
  const app = Buffer.concat(segs);
  const sof = Buffer.from([0xff, 0xc0, 0x00, 0x11, 0x08, 0, 0, 0, 0, 0x03]); sof.writeUInt16BE(h, 5); sof.writeUInt16BE(w, 7);
  return Buffer.concat([Buffer.from([0xff, 0xd8]), app, Buffer.from([0xff, 0xff]), sof, Buffer.alloc(16)]);
}
const box = (type, ...parts) => { const body = Buffer.concat(parts); const h = Buffer.alloc(8); h.writeUInt32BE(8 + body.length, 0); h.write(type, 4, 'latin1'); return Buffer.concat([h, body]); };
function mvhd(timescale, duration, v = 0) {
  if (v === 1) { const b = Buffer.alloc(108); b[0] = 1; b.writeUInt32BE(timescale, 20); b.writeBigUInt64BE(BigInt(duration), 24); return box('mvhd', b); }
  const b = Buffer.alloc(96); b.writeUInt32BE(timescale, 12); b.writeUInt32BE(duration, 16); return box('mvhd', b);
}
function tkhd(w, h, rot = 0) {
  const b = Buffer.alloc(84); const M = 0x10000;
  const [a, bb, c, d] = rot === 90 ? [0, M, -M, 0] : rot === 270 ? [0, -M, M, 0] : rot === 180 ? [-M, 0, 0, -M] : [M, 0, 0, M];
  b.writeInt32BE(a, 40); b.writeInt32BE(bb, 44); b.writeInt32BE(c, 52); b.writeInt32BE(d, 56); b.writeInt32BE(0x40000000, 72);
  b.writeUInt32BE(w * 0x10000, 76); b.writeUInt32BE(h * 0x10000, 80); return box('tkhd', b);
}
const hdlr = (t) => { const b = Buffer.alloc(24); b.write(t, 8, 'latin1'); return box('hdlr', b); };
const trak = (w, h, handler, rot) => box('trak', tkhd(w, h, rot), box('mdia', hdlr(handler)));
function mp4({ moovFirst = false, w = 1920, h = 1080, rot = 0, audio = true, mdatBytes = 200 } = {}) {
  const ftyp = box('ftyp', Buffer.from('isom\0\0\0\0isomavc1'));
  const moov = box('moov', mvhd(1000, 12500), trak(w, h, 'vide', rot), ...(audio ? [trak(0, 0, 'soun')] : []));
  const mdat = box('mdat', Buffer.alloc(mdatBytes));
  return Buffer.concat(moovFirst ? [ftyp, moov, mdat] : [ftyp, mdat, moov]);
}
/** A fake fetch over in-memory files, honouring HEAD and Range. */
function fakeFetch(files) {
  const calls = [];
  const fn = async (url, init = {}) => {
    calls.push({ url, method: init.method || 'GET', range: init.headers?.Range });
    const f = files[url];
    const hdrs = (o) => ({ get: (k) => o[k.toLowerCase()] ?? null });
    if (!f) return { status: 404, headers: hdrs({}), arrayBuffer: async () => new ArrayBuffer(0) };
    const common = { etag: `"${f.length}"`, 'content-type': url.endsWith('.mp4') ? 'video/mp4' : 'image/png', 'last-modified': 'Mon, 16 Nov 2026 10:00:00 GMT' };
    if (init.method === 'HEAD') return { status: 200, headers: hdrs({ ...common, 'content-length': String(f.length) }), arrayBuffer: async () => new ArrayBuffer(0) };
    const [, s, e] = init.headers.Range.match(/bytes=(\d+)-(\d+)/);
    const part = f.subarray(+s, Math.min(+e + 1, f.length));
    return { status: 206, headers: hdrs(common), arrayBuffer: async () => part.buffer.slice(part.byteOffset, part.byteOffset + part.length) };
  };
  fn.calls = calls; return fn;
}

// ------------------------------------------------------------ image headers
test('png, gif, webp VP8X and VP8L sizes', () => {
  assert.deepEqual(imageDims(png(1440, 3200)), { type: 'png', w: 1440, h: 3200 });
  assert.deepEqual(imageDims(gif(320, 240)), { type: 'gif', w: 320, h: 240 });
  assert.deepEqual(imageDims(webpX(2400, 1200)), { type: 'webp', w: 2400, h: 1200 });
  assert.deepEqual(imageDims(webpL(640, 480)), { type: 'webp', w: 640, h: 480 });
});

test('jpeg: SOF after an APP segment, fill bytes, and a request for more bytes', () => {
  assert.deepEqual(imageDims(jpeg(2378, 1202)), { type: 'jpeg', w: 2378, h: 1202 });
  const big = jpeg(1000, 750, 70000);
  const cut = jpegDims(big.subarray(0, 65536));
  assert.equal(cut.type, 'jpeg'); assert.ok(cut.needMore > 65536, 'asks for bytes past the cut');
  assert.deepEqual(jpegDims(big), { type: 'jpeg', w: 1000, h: 750 });
});

test('svg from width/height or viewBox; unknown bytes give null', () => {
  assert.deepEqual(imageDims(Buffer.from('<?xml version="1.0"?><svg xmlns="x" width="120px" height="40">')), { type: 'svg', w: 120, h: 40 });
  assert.deepEqual(imageDims(Buffer.from('<svg viewBox="0 0 300 150" xmlns="x">')), { type: 'svg', w: 300, h: 150 });
  assert.equal(imageDims(Buffer.from('hello world, not an image')), null);
});

test('shape thresholds', () => {
  assert.equal(shapeOf(1080, 2340), 'phone');
  assert.equal(shapeOf(1440, 6000), 'scrollshot');
  assert.equal(shapeOf(1000, 1300), 'tall');
  assert.equal(shapeOf(1000, 1000), 'square');
  assert.equal(shapeOf(1920, 1080), 'landscape');
  assert.equal(shapeOf(2400, 1000), 'wide');
  assert.equal(shapeOf(0, 10), null);
});

// -------------------------------------------------------------- mp4 headers
test('mp4 top boxes: moov after mdat is reported via next', () => {
  const f = mp4({ mdatBytes: 100000 });
  const { boxes, next } = mp4TopBoxes(f.subarray(0, 4096), 0, f.length);
  assert.deepEqual(boxes.map((b) => b.type), ['ftyp', 'mdat']);
  assert.equal(next, boxes[1].off + boxes[1].size);
});

test('mp4 largesize (size == 1) and size == 0 boxes', () => {
  const ls = Buffer.alloc(16 + 10); ls.writeUInt32BE(1, 0); ls.write('mdat', 4, 'latin1'); ls.writeBigUInt64BE(26n, 8);
  assert.deepEqual(mp4TopBoxes(ls, 0, 26).boxes[0], { type: 'mdat', off: 0, size: 26, header: 16 });
  const z = Buffer.alloc(40); z.writeUInt32BE(0, 0); z.write('mdat', 4, 'latin1');
  assert.equal(mp4TopBoxes(z, 0, 40).boxes[0].size, 40);
});

test('moov: duration, size, audio, rotation, mvhd v1', () => {
  const f = mp4({ moovFirst: true });
  const { boxes } = mp4TopBoxes(f, 0, f.length);
  const mv = boxes.find((b) => b.type === 'moov');
  assert.deepEqual(parseMoov(f.subarray(mv.off, mv.off + mv.size)), { audio: true, duration: 12.5, w: 1920, h: 1080 });
  const r = parseMoov(box('moov', mvhd(600, 6000, 1), trak(1920, 1080, 'vide', 90)));
  assert.deepEqual(r, { audio: false, duration: 10, w: 1080, h: 1920, rotation: 90 });
});

test('measureVideo jumps over mdat to a trailing moov and flags it', async () => {
  const url = `${R2_BASE}/assets/work/x/clip.mp4`;
  const file = mp4({ mdatBytes: 300000 });
  const f = createFetcher({ fetchImpl: fakeFetch({ [url]: file }) });
  const r = await measureVideo(url, file.length, f);
  assert.equal(r.moovAtEnd, true); assert.equal(r.duration, 12.5); assert.equal(r.w, 1920); assert.equal(r.audio, true);
  const r2 = await measureVideo(url, file.length, createFetcher({ fetchImpl: fakeFetch({ [url]: mp4({ moovFirst: true, audio: false }) }) }));
  assert.equal(r2.moovAtEnd, false); assert.equal(r2.audio, false);
});

test('measure: HEAD then range, dead links, ETag cache skips the range read', async () => {
  const ok = `${R2_BASE}/assets/work/x/a.png`; const gone = `${R2_BASE}/assets/work/x/gone.png`;
  const fetchImpl = fakeFetch({ [ok]: png(800, 600) });
  const cache = openCache(null);
  const f = createFetcher({ fetchImpl });
  const a = await measure(ok, f, cache);
  assert.equal(a.status, 200); assert.equal(a.w, 800); assert.equal(a.bytes, 33);
  assert.equal((await measure(gone, f, cache)).status, 404);
  const before = fetchImpl.calls.length;
  const again = await measure(ok, f, cache);
  assert.equal(again.cached, true); assert.equal(again.h, 600);
  assert.deepEqual(fetchImpl.calls.slice(before).map((c) => c.method), ['HEAD']);
});

test('fetcher keeps at most n requests in flight', async () => {
  let live = 0; let peak = 0;
  const fetchImpl = async () => { live++; peak = Math.max(peak, live); await new Promise((r) => setTimeout(r, 5)); live--; return { status: 200, headers: { get: () => null } }; };
  const f = createFetcher({ concurrency: 4, fetchImpl });
  await Promise.all(Array.from({ length: 20 }, (_, i) => f.head(`u${i}`)));
  assert.equal(peak, 4); assert.equal(f.stats.requests, 20);
});

// ------------------------------------------------------------ manifest rules
const U = (p) => `${R2_BASE}/assets/work/${p}`;

test('urls: relative paths resolve to R2; keys ignore %20 encoding; folder and sub-folder', () => {
  assert.equal(toUrl('/assets/work/a/b c.jpg'), U('a/b%20c.jpg'));
  assert.equal(keyOf(U('a/b%20c.jpg')), keyOf(toUrl(U('a/b c.jpg'))));
  assert.deepEqual(folderOf(U('sadhan/untitled folder/x.png')), { folder: 'sadhan', sub: 'untitled folder' });
  assert.deepEqual(folderOf('https://example.com/x.png'), { folder: '', sub: '' });
});

test('bodyMedia keeps labels, chapters, order and skips plain website links', () => {
  const md = ['## Title', '**Live:** https://client.example', '### Challenge', `![Challenge Image 1](${U('a/c1.jpg')})`, `- About Video URL: ${U('a/about.mp4')}`, '### Screens', `- ${U('b/s1.png')}`].join('\n');
  const m = bodyMedia(md);
  assert.deepEqual(m.map((x) => [x.label, x.section, x.order]), [['Challenge Image 1', 'Challenge', 0], ['About Video URL', 'Challenge', 1], ['', 'Screens', 2]]);
});

test('own folder: cover first, slug folder by prefix, cross-check prefers the slug folder', () => {
  const folders = new Set(['airtel-xsafe', 'gratify-the-intelligent-rewards-and-feedback-platform', 'adneto', 'cartier-careers']);
  assert.equal(slugFolder('airtel-xsafe-securing-homes', folders), 'airtel-xsafe');
  const a = resolveOwnFolder({ slug: 'cartier-redesigning-the-career-website', shortTitle: 'Cartier', coverPath: '/assets/work/cartier-careers/cover.jpg' }, folders);
  assert.deepEqual([a.folder, a.rule], ['cartier-careers', 'cover path']);
  const g = resolveOwnFolder({ slug: 'gratify-the-intelligent-rewards-and-feedback-platform', shortTitle: 'Gratify', coverPath: '/assets/work/adneto/cover.jpg' }, folders);
  assert.equal(g.folder, 'gratify-the-intelligent-rewards-and-feedback-platform'); assert.match(g.rule, /cross-check/);
  const maj = resolveOwnFolder({ slug: 'zzz', shortTitle: 'Zzz' }, new Set(), [{ url: U('zzz-old/1.png') }, { url: U('zzz-old/2.png') }, { url: U('other/1.png') }]);
  assert.deepEqual([maj.folder, maj.rule], ['zzz-old', 'majority of body images']);
  assert.equal(resolveOwnFolder({ slug: 'none' }, new Set(), []).folder, '');
});

test('stems pair Style1 with styles-image-1 and Cover with cover-image-xxxx', () => {
  assert.equal(stem('Style1.png'), stem('styles-image-1-p7wt.png'));
  assert.equal(stem('Cover.jpg'), stem('cover-image-objk.jpg'));
  assert.notEqual(stem('styles-image-1-p7wt.png'), stem('styles-image-2-0y40.png'));
});

test('flows from numeric runs, Group sequences and shared stems', () => {
  assert.equal(flowOf('Group 1000004512.png'), 'Group');
  assert.equal(flowOf('Onboarding - 3.png'), 'Onboarding');
  assert.equal(flowOf('B2-Assistance Programmes – 3.jpg'), 'B2 Assistance Programmes');
  assert.equal(flowOf('12.png'), 'Screens');
});

test('duplicates: same bytes, same size + stem, lower-resolution video copy', () => {
  const es = [
    { url: U('a/styles-image-1-p7wt.png'), status: 200, bytes: 10, type: 'image', w: 100, h: 100 },
    { url: U('a/Style1.png'), status: 200, bytes: 11, type: 'image', w: 100, h: 100 },
    { url: U('a/copy.png'), status: 200, bytes: 10, type: 'image', w: 100, h: 100 },
    { url: U('a/clip.mp4'), status: 200, bytes: 500, type: 'video', w: 1920, h: 1080 },
    { url: U('a/clip-720.mp4'), status: 200, bytes: 200, type: 'video', w: 1280, h: 720 },
    { url: U('a/dead.png'), status: 404, bytes: 10, type: 'image' },
    { url: U('b/challenge-image-1-nyzk.jpg'), status: 200, bytes: 30, type: 'image', w: 50, h: 50 },
    { url: U('c/challenge-image-1-duwn.jpg'), status: 200, bytes: 31, type: 'image', w: 50, h: 50 },
  ];
  markDuplicates(es);
  assert.equal(es[1].dupOf, es[0].url); assert.equal(es[2].dupOf, es[0].url);
  assert.equal(es[4].dupOf, es[3].url); assert.equal(es[3].dupOf, undefined); assert.equal(es[5].dupOf, undefined);
  assert.equal(es[7].dupOf, undefined, 'a name pair across folders is not a duplicate');
});

test('suspects: borrowed, other client brand, stock-style names', () => {
  const brands = new Map([['airtel', 'Airtel Xsafe'], ['indusninja', 'IndusNinja']]);
  const own = new Set(['indusninja']);
  assert.match(suspectFor({ url: U('adneto/x.jpg'), source: 'body' }, 'indusninja', own, brands), /borrowed from adneto/);
  assert.match(suspectFor({ url: U('indusninja/Airtel Xsafe 1.png'), source: 'folder' }, 'indusninja', own, brands), /another client's brand "airtel"/);
  assert.match(suspectFor({ url: U('indusninja/pexels-photo-1.jpg'), source: 'folder' }, 'indusninja', own, brands), /stock\?/);
  assert.match(suspectFor({ url: U('indusninja/20231114.jpg'), source: 'folder' }, 'indusninja', own, brands), /stock\?/);
  assert.equal(suspectFor({ url: U('indusninja/indusninja-cover.jpg'), source: 'body' }, 'indusninja', own, brands), undefined);
});

test('store keys with # and spaces become fetchable URLs', async () => {
  const { keyToUrl, fileName: fn } = await import('./media-manifest.mjs');
  const u = keyToUrl('assets/work/bankco/Scene-#5-(Light).png');
  assert.equal(u, `${R2_BASE}/assets/work/bankco/Scene-%235-(Light).png`);
  assert.equal(fn(u), 'Scene-#5-(Light).png');
});
