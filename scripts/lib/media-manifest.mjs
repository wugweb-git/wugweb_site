// Media manifest library (wugweb-work Part 2, B2). Read-only.
//
// For one case study: resolve its own R2 folder, list every media URL its
// body links plus every file the asset registry holds in that folder, and
// measure each URL with a HEAD plus ranged GETs of header bytes only (status,
// content-type, bytes, ETag, Last-Modified, pixel size, video duration,
// rotation, audio track, moov position). Nothing is downloaded whole, nothing
// is written except the local cache file the caller names.
//
// The rules (own folder, shape, flows, duplicates, suspects, budgets) are the
// ones in .claude/skills/wugweb-work/references/media-standard.md.

import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs';
import { dirname } from 'node:path';
import { createHash } from 'node:crypto';
import { imageDims, mp4TopBoxes, parseMoov, shapeOf } from './image-dims.mjs';

export const R2_BASE = 'https://pub-39ad1d03baec440faf48303be95c3782.r2.dev';
export const BUDGET = { image: 4 * 1048576, video: 10 * 1048576, page: 25 * 1048576 };
export const MEDIA_EXT = /\.(png|jpe?g|webp|gif|avif|svg|mp4|webm|mov|m4v)$/i;
const VIDEO_EXT = /\.(mp4|webm|mov|m4v)$/i;

// ------------------------------------------------------------------ URLs

/** Absolute, consistently encoded URL. `/assets/...` paths resolve against R2. */
export function toUrl(p) {
  if (!p) return null;
  const raw = String(p).trim();
  const abs = raw.startsWith('/') ? R2_BASE + raw : raw;
  try { const u = new URL(abs); u.hash = ''; return u.href; } catch { return null; }
}
/** URL for a store key (`assets/work/x/Scene-#5-(Light).png`): every segment encoded, so `#` and `?` stay in the name. */
export const keyToUrl = (key) => `${R2_BASE}/${String(key).replace(/^\/+/, '').split('/').map(encodeURIComponent).join('/')}`;
/** Decoded path, for comparing URLs written with and without %20. */
export function keyOf(url) {
  try { const u = new URL(url); return u.host + safeDecode(u.pathname); } catch { return url; }
}
const safeDecode = (s) => { try { return decodeURIComponent(s); } catch { return s; } };
export const fileName = (url) => safeDecode((new URL(url).pathname.split('/').pop()) || '');
export const isR2 = (url) => { try { return new URL(url).origin === R2_BASE; } catch { return false; } };
const extOf = (url) => { try { return (new URL(url).pathname.match(/\.([a-z0-9]{2,5})$/i) || [])[1]?.toLowerCase() || ''; } catch { return ''; } };
export const typeOf = (url) => (VIDEO_EXT.test('.' + extOf(url)) ? 'video' : extOf(url) === 'gif' ? 'gif' : 'image');

/** Folder under assets/work/ (first segment) and the sub-path inside it. */
export function folderOf(url) {
  try {
    const p = safeDecode(new URL(url).pathname);
    const m = p.match(/\/assets\/work\/([^/]+)\/(.*)$/);
    if (!m) return { folder: '', sub: '' };
    const parts = m[2].split('/'); parts.pop();
    return { folder: m[1], sub: parts.join('/') };
  } catch { return { folder: '', sub: '' }; }
}

// ------------------------------------------------------------- body media

/**
 * Every media URL a body links, in order, with its label and the chapter it
 * sits under. Unlike the page parser this keeps borrowed files, so the report
 * can list them. A URL counts when it is on the media store or ends in a media
 * extension; plain links (client websites) are not media.
 */
export function bodyMedia(md) {
  const out = []; let section = ''; let order = 0;
  for (const raw of String(md || '').replace(/\r/g, '').split('\n')) {
    const line = raw.trim();
    const h = line.match(/^#{2,4}\s+(.*)$/);
    if (h) { section = h[1].replace(/\*\*/g, '').trim(); continue; }
    for (const m of line.matchAll(/(!?\[([^\]]*)\]\()?((?:https?:\/\/|\/assets\/)[^\s)\]>"']+)/g)) {
      const url = toUrl(m[3]); if (!url) continue;
      if (!isR2(url) && !MEDIA_EXT.test(new URL(url).pathname)) continue;
      let label = m[2] != null ? m[2].trim() : '';
      if (!m[1]) { const named = line.match(/^[-*]?\s*([^:]+?):\s*(?:https?:\/\/|\/assets\/)/); if (named) label = named[1].replace(/\*\*/g, '').trim(); }
      out.push({ url, label, section, order: order++ });
    }
  }
  return out;
}

// ------------------------------------------------------------ own folder

const STOP = new Set(['the', 'and', 'for', 'with', 'of', 'a', 'an', 'to', 'in', 'on', 'by', 'via', 'your', 'our',
  'designing', 'crafting', 'digital', 'experience', 'experiences', 'platform', 'website', 'web', 'app', 'design',
  'building', 'engineering', 'redefining', 'redesigning', 'next', 'generation', 'india', 'indias', 'global', 'new']);
/** Content words of a slug or title. */
export function tokens(s) {
  return String(s || '').toLowerCase().replace(/[^a-z0-9]+/g, ' ').split(' ').filter((t) => t.length >= 3 && !STOP.has(t));
}

/** The registry folder "named after the slug": exact, else the longest folder the slug starts with. */
export function slugFolder(slug, folders) {
  if (folders.has(slug)) return slug;
  let best = '';
  for (const f of folders) if ((slug.startsWith(f + '-') || f.startsWith(slug + '-')) && f.length > best.length) best = f;
  return best;
}

/**
 * Own folder, in the standard's order: cover path, thumbnail path, the folder
 * named after the slug, the majority of body images. The winner is checked
 * against the slug and short-title words; on disagreement the slug folder wins.
 * @returns {{folder:string, rule:string, note?:string, candidates:object}}
 */
export function resolveOwnFolder(doc, folders, body = []) {
  const fromPath = (p) => { const u = toUrl(p); return u ? folderOf(u).folder : ''; };
  const counts = {};
  for (const m of body) { if (typeOf(m.url) !== 'image') continue; const f = folderOf(m.url).folder; if (f) counts[f] = (counts[f] || 0) + 1; }
  const majority = Object.entries(counts).sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))[0]?.[0] || '';
  const cand = { cover: fromPath(doc.coverPath), thumbnail: fromPath(doc.thumbnailPath), slug: slugFolder(doc.slug, folders), majority };
  const order = [['cover', 'cover path'], ['thumbnail', 'thumbnail path'], ['slug', 'folder named after the slug'], ['majority', 'majority of body images']];
  let folder = ''; let rule = 'none';
  for (const [k, name] of order) if (cand[k]) { folder = cand[k]; rule = name; break; }
  if (!folder) return { folder: '', rule: 'none (no cover, thumbnail, slug folder or body image)', candidates: cand };
  const own = new Set([...tokens(doc.slug), ...tokens(doc.shortTitle), ...tokens(doc.client)]);
  const agrees = tokens(folder).some((t) => own.has(t));
  if (!agrees && cand.slug && cand.slug !== folder) {
    return { folder: cand.slug, rule: 'folder named after the slug (cross-check)', note: `${rule} pointed at "${folder}", which shares no word with the slug or short title`, candidates: cand };
  }
  return agrees ? { folder, rule, candidates: cand } : { folder, rule, note: `"${folder}" shares no word with the slug or short title; no slug folder to prefer`, candidates: cand };
}

// ---------------------------------------------------- flows, stems, dups

/** Name stem used for duplicate pairs: Style1 = styles-image-1, Cover = cover-image-c1g8. */
export function stem(name) {
  let s = String(name).toLowerCase().replace(/\.[a-z0-9]{2,5}$/, '');
  s = s.replace(/(image(?:[-_ ]\d+)?)[-_][a-z0-9]{4}$/, '$1'); // the 4-char suffix the R2 copy step added
  const parts = s.split(/[^a-z0-9]+|(?<=[a-z])(?=\d)|(?<=\d)(?=[a-z])/).filter(Boolean)
    .filter((t) => t !== 'image' && t !== 'img')
    .map((t) => (t.length > 3 && t.endsWith('s') && !/\d/.test(t) ? t.slice(0, -1) : t));
  return parts.join('');
}

/** Flow for a folder file: numeric-prefix runs, `Group NNNNN`, or a shared stem; else "Screens". */
export function flowOf(name) {
  const base = String(name).replace(/\.[a-z0-9]{2,5}$/i, '');
  if (/^group[\s_-]*\d+/i.test(base)) return 'Group';
  const m = base.replace(/(image(?:[-_ ]\d+)?)[-_][a-z0-9]{4}$/i, '$1').replace(/^\d+[\s._-]*/, '').replace(/[\s._-]*\(?\d+\)?$/, '').replace(/[\s–—_-]+\d+$/, '').replace(/[\s–—_-]+$/, '');
  const words = m.replace(/[_-]+/g, ' ').replace(/\s+/g, ' ').trim();
  if (!words || /^\d+$/.test(words)) return 'Screens';
  return words.charAt(0).toUpperCase() + words.slice(1);
}

/**
 * Duplicates inside one manifest: same bytes (and type), or the same w×h with
 * a matching name stem in the same folder; for videos a lower-resolution copy with the same stem
 * points to the larger file. The first (body before folder, larger first for
 * videos) is kept; the others get `dupOf`.
 */
export function markDuplicates(entries) {
  const live = entries.filter((e) => e.status === 200 && e.bytes);
  const byBytes = new Map();
  for (const e of live) {
    const k = `${e.type}:${e.bytes}`;
    if (byBytes.has(k)) { e.dupOf = byBytes.get(k).url; e.dupWhy = 'same bytes'; } else byBytes.set(k, e);
  }
  const byStem = new Map();
  for (const e of live) {
    if (e.dupOf || e.role === 'poster') continue;
    const nm = fileName(e.url);
    const st = stem(e.type === 'video' ? nm.replace(/[-_ ]?(\d{3,4}p?|hd|sd|low(?:res)?|small|compressed)(?=\.[a-z0-9]+$)/i, '') : nm);
    if (!st || /^\d*$/.test(st)) continue;
    // Name pairs only count inside one folder: the old filler shots share names across folders.
    const k = `${e.type === 'video' ? 'v' : 'i'}:${folderOf(e.url).folder}/${folderOf(e.url).sub}:${st}`;
    const prev = byStem.get(k);
    if (!prev) { byStem.set(k, e); continue; }
    if (e.type !== 'video' && prev.w && e.w === prev.w && e.h === prev.h) { e.dupOf = prev.url; e.dupWhy = 'same size, same name stem, same folder'; }
    else if (e.type === 'video' && prev.w && e.w && Math.abs(e.w / e.h - prev.w / prev.h) < 0.02 && e.w !== prev.w) {
      const [small, big] = e.w < prev.w ? [e, prev] : [prev, e];
      small.dupOf = big.url; small.dupWhy = 'lower-resolution copy of a video';
      byStem.set(k, big);
    }
  }
  return entries;
}

const STOCK = /(^|[^a-z])(pexels|unsplash|shutterstock|istock|gettyimages|freepik|adobestock|stock|depositphotos|dreamstime)([^a-z]|$)/i;
/**
 * Suspects (listed, never dropped): a body file from another case study's
 * folder (borrowed), a file name carrying another client's brand, and
 * stock-style names (a stock site's name, or a name that is only digits).
 * @param brands Map of brand token → owning folder/slug, for every case study.
 */
export function suspectFor(entry, ownFolder, ownTokens, brands) {
  const out = [];
  const { folder } = folderOf(entry.url);
  if (entry.source !== 'folder' && folder && ownFolder && folder !== ownFolder) out.push(`borrowed from ${folder}`);
  if (entry.source !== 'folder' && !isR2(entry.url)) out.push(`not on the media store (${new URL(entry.url).host})`);
  const name = fileName(entry.url).toLowerCase();
  const words = new Set(name.replace(/\.[a-z0-9]+$/, '').split(/[^a-z0-9]+/).filter(Boolean));
  for (const [tok, owner] of brands) if (!ownTokens.has(tok) && words.has(tok)) out.push(`name carries another client's brand "${tok}" (${owner})`);
  const base = name.replace(/\.[a-z0-9]+$/, '');
  if (STOCK.test(base) || /^\d{4,}$/.test(base.replace(/[\s_-]/g, ''))) out.push('stock?');
  return out.length ? out.join('; ') : undefined;
}

// ------------------------------------------------------------- fetching

/** A concurrency limiter plus a request counter. */
export function createFetcher({ concurrency = 4, fetchImpl = globalThis.fetch, retries = 2 } = {}) {
  let active = 0; const queue = []; const stats = { requests: 0, head: 0, range: 0, retries: 0, errors: 0 };
  const take = () => new Promise((r) => { if (active < concurrency) { active++; r(); } else queue.push(r); });
  const give = () => { const n = queue.shift(); if (n) n(); else active--; };
  async function go(url, init, kind) {
    await take();
    try {
      for (let a = 0; ; a++) {
        stats.requests++; stats[kind]++;
        try {
          const r = await fetchImpl(url, init);
          if ((r.status === 429 || r.status >= 500) && a < retries) { stats.retries++; await new Promise((s) => setTimeout(s, 800 * (a + 1))); continue; }
          return r;
        } catch (e) {
          if (a < retries) { stats.retries++; await new Promise((s) => setTimeout(s, 800 * (a + 1))); continue; }
          stats.errors++; throw e;
        }
      }
    } finally { give(); }
  }
  return {
    stats,
    head: (url) => go(url, { method: 'HEAD', redirect: 'manual' }, 'head'),
    async range(url, start, end) {
      const r = await go(url, { headers: { Range: `bytes=${start}-${end}` } }, 'range');
      return Buffer.from(await r.arrayBuffer());
    },
  };
}

const HEAD_BYTES = 65536;
const MOOV_CAP = 16 * 1048576;

/** Pixel size from ranged reads; extends the range when JPEG SOF is past 64 KB. */
export async function measureImage(url, bytes, f) {
  let size = Math.min(HEAD_BYTES, bytes || HEAD_BYTES);
  let b = await f.range(url, 0, size - 1); let d = imageDims(b);
  while (d && d.needMore && b.length >= size && size < 8 * 1048576 && (!bytes || size < bytes)) {
    size = Math.min(Math.max(d.needMore, size * 4), 8 * 1048576, bytes || Infinity);
    b = await f.range(url, 0, size - 1); d = imageDims(b);
  }
  if (d && d.w) return { format: d.type, w: d.w, h: d.h };
  return { format: d?.type || 'unknown', measureError: 'size not found in header bytes' };
}

/** Top-level atoms from the head, jump over mdat, read moov wherever it is. */
export async function measureVideo(url, bytes, f) {
  if (!bytes) return { measureError: 'no content-length' };
  const head = await f.range(url, 0, Math.min(HEAD_BYTES, bytes) - 1);
  let { boxes, next } = mp4TopBoxes(head, 0, bytes);
  let guard = 0;
  while (next != null && !boxes.some((x) => x.type === 'moov') && guard++ < 20) {
    const h = await f.range(url, next, Math.min(next + 15, bytes - 1));
    const r = mp4TopBoxes(h, next, bytes);
    if (!r.boxes.length) break;
    boxes = boxes.concat(r.boxes.slice(0, 1));
    const b0 = r.boxes[0]; next = b0.off + b0.size < bytes ? b0.off + b0.size : null;
  }
  const moov = boxes.find((x) => x.type === 'moov'); const mdat = boxes.find((x) => x.type === 'mdat');
  if (!moov) return { format: 'mp4', measureError: 'no moov atom found' };
  const res = { format: 'mp4', moovAtEnd: !!(mdat && moov.off > mdat.off), moovOffset: moov.off };
  if (moov.size > MOOV_CAP) return { ...res, measureError: `moov ${moov.size} bytes, over the read cap` };
  const buf = moov.off + moov.size <= head.length ? head.subarray(moov.off, moov.off + moov.size) : await f.range(url, moov.off, moov.off + moov.size - 1);
  return { ...res, ...parseMoov(buf) };
}

/** HEAD, then header bytes unless the cache has this URL at the same ETag. */
export async function measure(url, f, cache) {
  let r;
  try { r = await f.head(url); } catch (e) { return { status: 0, error: String(e.message || e) }; }
  const base = { status: r.status, contentType: r.headers.get('content-type') || null, bytes: +r.headers.get('content-length') || null,
    etag: r.headers.get('etag') || null, lastModified: r.headers.get('last-modified') || null };
  if (r.status >= 300 && r.status < 400) base.location = r.headers.get('location');
  if (r.status !== 200) return base;
  const c = cache?.get(url);
  if (c && c.etag && c.etag === base.etag && c.bytes === base.bytes) return { ...c, ...base, cached: true };
  let m;
  try { m = typeOf(url) === 'video' ? await measureVideo(url, base.bytes, f) : await measureImage(url, base.bytes, f); }
  catch (e) { m = { measureError: String(e.message || e) }; }
  const out = { ...base, ...m };
  cache?.set(url, out);
  return out;
}

// ----------------------------------------------------------------- cache

/** Cache keyed by URL; an entry is reused only when its ETag and size match. */
export function openCache(path) {
  let data = {};
  if (path && existsSync(path)) { try { data = JSON.parse(readFileSync(path, 'utf8')).entries || {}; } catch { data = {}; } }
  return {
    get: (u) => data[u],
    set: (u, v) => { const { cached, ...rest } = v; data[u] = rest; },
    save() { if (!path) return; mkdirSync(dirname(path), { recursive: true }); writeFileSync(path, JSON.stringify({ _note: 'media-manifest cache (gitignored). Keyed by URL; reused when ETag and size match.', entries: data }, null, 1)); },
    size: () => Object.keys(data).length,
  };
}

export const keyFor = (url) => createHash('sha1').update(url).digest('hex').slice(0, 12);

// --------------------------------------------------------------- manifest

/**
 * Manifest entries for one case study (unmeasured): body media first, in
 * body order, then the registry files of the own folder that the body does
 * not link. Each entry: url, source, label, section, order, type, folder, sub.
 */
export function collectEntries(doc, body, ownFolder, registryByFolder) {
  const seen = new Map(); const out = [];
  const add = (e) => { const k = keyOf(e.url); if (seen.has(k)) { seen.get(k).linkCount++; return; } e.linkCount = 1; seen.set(k, e); out.push(e); };
  for (const p of [['cover path', doc.coverPath], ['thumbnail path', doc.thumbnailPath]]) {
    const u = toUrl(p[1]); if (u) add({ url: u, source: 'record', label: p[0], section: '', order: -1 });
  }
  for (const m of body) add({ ...m, source: 'body' });
  if (ownFolder) {
    const files = (registryByFolder.get(ownFolder) || []).slice().sort((a, b) => a.localeCompare(b));
    let i = 0;
    for (const u of files) { const k = keyOf(u); if (seen.has(k)) { seen.get(k).inRegistry = true; continue; } add({ url: u, source: 'folder', label: '', section: '', order: 1000 + i++, inRegistry: true }); }
    for (const e of out) if (e.source !== 'folder' && folderOf(e.url).folder === ownFolder && (registryByFolder.get(ownFolder) || []).some((u) => keyOf(u) === keyOf(e.url))) e.inRegistry = true;
  }
  for (const e of out) {
    const { folder, sub } = folderOf(e.url);
    Object.assign(e, { type: typeOf(e.url), folder, sub: sub || undefined, _key: keyFor(e.url) });
    if (/-poster\.(webp|jpe?g|png)$/i.test(fileName(e.url))) e.role = 'poster';
    if (e.source === 'folder' && e.role !== 'poster') e.flow = flowOf(fileName(e.url));
  }
  return out;
}

/** The poster beside a video: `<name>-poster.webp` (src/lib/assets.ts posterFor). */
export const posterUrlFor = (videoUrl) => videoUrl.replace(/\.(mp4|webm|mov|m4v)$/i, '-poster.webp');

export const mb = (n) => (n == null ? '?' : (n / 1048576).toFixed(1));
