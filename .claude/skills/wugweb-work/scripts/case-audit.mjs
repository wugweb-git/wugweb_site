#!/usr/bin/env node
// wugweb-work: case-audit.mjs
// Read-only. Parses one Body Content document (a local .md file or a CMS slug)
// and prints its sections, points, media kinds, shapes, archetype, block plan,
// QA flags, dashes and missing pieces. Never writes anything except to stdout.
//
// Usage:
//   node case-audit.mjs <file.md | slug> [--measure] [--json]
//   node case-audit.mjs --all [--json]
//
// --measure  HEAD + ranged reads of every media URL for status, bytes, size,
//            video duration and moov position. Nothing is downloaded whole or saved.
// --all      Every case study from the CMS (needs network to the CMS read API).
//
// CMS read API (this site's wiring; change here only):
const CMS_QUERY_URL = process.env.CASE_CMS_URL ||
  'https://splvhmk1.apicdn.sanity.io/v2024-01-01/data/query/production';

import { readFileSync, existsSync } from 'node:fs';

const args = process.argv.slice(2);
const flag = (f) => args.includes(f);
const positional = args.filter((a) => !a.startsWith('--'));
const AS_JSON = flag('--json');
const MEASURE = flag('--measure');

// ---------------------------------------------------------------- vocabulary
const BANNED = ['pivotal', 'robust', 'seamless', 'seamlessly', 'meticulous', 'holistic',
  'cutting-edge', 'leverage', 'leveraging', 'empower', 'empowering', 'empowers', 'unlock',
  'world-class', 'revolutionary', 'game-changing', 'innovative', 'state-of-the-art',
  'synergy', 'best-in-class', 'next-generation', 'transformative', 'sophisticated', 'delve', 'elevate'];
const US_SPELLINGS = { program: 'programme', programs: 'programmes', centralize: 'centralise',
  centralized: 'centralised', color: 'colour', colors: 'colours', organization: 'organisation',
  organizations: 'organisations', optimize: 'optimise', optimized: 'optimised', customize: 'customise',
  customized: 'customised', streamlined: '(name the doer instead)', analyze: 'analyse', behavior: 'behaviour',
  center: 'centre', favorite: 'favourite', digitize: 'digitise', prioritize: 'prioritise',
  personalized: 'personalised', utilize: 'use', utilized: 'used' };
const GENERIC_HEADINGS = ['about', 'overview', 'challenge', 'challenges', 'solution', 'solutions',
  'design philosophy', 'conclusion', 'impact', 'results', 'the problem', 'the solution', 'approach',
  'process', 'outcome', 'introduction', 'summary', 'features', 'key features'];
const PLACEHOLDERS = [/\bTBD\b/, /\[INSERT/i, /\blorem\b/i, /\bipsum\b/i, /\bXX+\b/];
const META_KEYS = ['Subtitle', 'Client', 'Industry', 'Partner', 'Disciplines', 'Team', 'Timeline',
  'Year', 'Country', 'Platform', 'Special Thanks', 'Category', 'Tags', 'Live', 'App Store',
  'Play Store', 'Behance', 'Dribbble', 'Awards', 'Accent', 'Results', 'Services'];
const PRESENCE_KEYS = ['Live', 'App Store', 'Play Store', 'Behance', 'Dribbble', 'Awards'];
const KIND_WORDS = [
  ['cover', 'cover'], ['hero', 'cover'], ['states', 'states'], ['state', 'states'],
  ['screens', 'screen'], ['screen', 'screen'], ['flow', 'screen'], ['mobile', 'screen'],
  ['web', 'web'], ['dashboard', 'dashboard'], ['mockup', 'mockup'],
  ['style board', 'styles'], ['styles', 'styles'], ['style', 'styles'], ['moodboard', 'styles'],
  ['client logo', 'logo'], ['logo', 'logo'], ['mark', 'logo'], ['type', 'type'], ['colour', 'colour'],
  ['color', 'colour'], ['pattern', 'pattern'], ['application', 'application'], ['print', 'print'],
  ['social', 'social'], ['photo', 'photo'], ['diagram', 'diagram'], ['chart', 'chart'],
  ['before', 'before'], ['after', 'after'], ['video', 'video'], ['loop', 'loop'], ['press', 'press'],
  ['award', 'award'], ['challenge', 'v1-slot'], ['solution', 'v1-slot'], ['design philosophy', 'v1-slot'],
  ['dp', 'v1-slot'], ['conclusion', 'v1-slot'], ['filler', 'v1-slot'], ['about', 'v1-slot'],
  ['thumbnail', 'v1-slot'], ['gallery', 'gallery'], ['image', 'v1-slot'],
];
const VIDEO_EXT = /\.(mp4|mov|webm|m4v)(\?|#|$)/i;
const DASH = /[–—]/;

// ------------------------------------------------------------------- helpers
const words = (s) => (s.match(/[A-Za-z0-9À-ɏ'’%#.]+/g) || []).filter((w) => /[A-Za-z0-9]/.test(w)).length;
const clean = (s) => s.replace(/\*\*/g, '').replace(/^#+\s*/, '').replace(/#+/g, '').replace(/:\s*$/, '').trim();
const kindOf = (label) => {
  const l = (label || '').toLowerCase().split(':')[0].trim();
  for (const [w, k] of KIND_WORDS) if (l === w || l.startsWith(w + ' ') || l.startsWith(w)) return k;
  return 'unknown';
};

// -------------------------------------------------------------------- parser
export function parseBody(md) {
  const raw = md.replace(/\r\n?/g, '\n');
  const lines = raw.split('\n');
  const out = { meta: {}, links: {}, accent: null, results: [], sections: [], closing: [],
    lineCount: lines.length, hasSiteCopy: /^##\s+Sanity site copy/im.test(raw), titleLine: null };

  // If a "Sanity site copy" exists, the long copy wins (v1 compatibility).
  let body = lines;
  if (out.hasSiteCopy) {
    const i = lines.findIndex((l) => /^\s*##\s+Sanity site copy/i.test(l));
    // Keep the meta lines and the ## Media block from the short copy; drop its ### chapters.
    const keep = []; let inShort = false;
    for (const l of lines.slice(0, i)) {
      if (/^\s*###/.test(l)) { inShort = true; continue; }
      if (/^\s*##\s/.test(l)) { inShort = false; keep.push(l); continue; }
      if (!inShort) keep.push(l);
    }
    body = [...keep, ...lines.slice(i + 1)];
  }

  let cur = null; let zone = 'body'; let inResults = false; let lastPoint = null;
  const newSection = (title, lineNo) => ({ title, lineNo, layoutHint: null, lead: null, paras: [],
    points: [], groups: [], media: [], quotes: [], tables: [], milestones: [], words: 0 });

  for (let n = 0; n < body.length; n++) {
    const original = body[n];
    const t = original.trim();
    if (!t) { lastPoint = null; continue; }

    // h2
    if (/^##\s/.test(t) && !/^###/.test(t)) {
      const h = clean(t);
      if (/^media$/i.test(h)) { zone = 'media'; cur = null; continue; }
      if (/^gallery/i.test(h)) { zone = 'gallery'; cur = null; continue; }
      if (/long-form copy as published/i.test(h)) continue;
      if (!out.titleLine) out.titleLine = h;
      zone = 'body'; continue;
    }
    // h3 (also catches #### leaks)
    if (/^###/.test(t)) {
      const h = clean(t);
      inResults = /^results$/i.test(h);
      zone = 'body';
      cur = newSection(h, n + 1); out.sections.push(cur); lastPoint = null; continue;
    }
    // meta (several keys may share one line)
    const metaRe = /\*\*([^*:]+):\*\*\s*([^*]*)/g;
    if (/^\*\*[^*]+:\*\*/.test(t) && !cur) {
      let m; while ((m = metaRe.exec(t))) {
        const key = m[1].trim(); let val = m[2].trim();
        const link = val.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
        const v = link ? { text: link[1], href: link[2] } : val;
        if (key === 'Results') { inResults = true; continue; }
        if (PRESENCE_KEYS.includes(key)) out.links[key] = v;
        else if (key === 'Accent') out.accent = val;
        else out.meta[key] = v;
      }
      continue;
    }
    // layout hint
    if (cur && /^Layout:\s*/i.test(t) && !cur.lead) { cur.layoutHint = t.replace(/^Layout:\s*/i, ''); continue; }

    // media
    const img = t.match(/^!\[([^\]]*)\]\(([^)]+)\)/);
    const vid = t.match(/^[-*]\s*((?:[\w&' ]+?\s+)?(?:Video|Loop))(?:\s+URL)?:\s*(\S+)/i) || t.match(/^[-*]\s*()(https?:\S+\.(?:mp4|mov|webm|m4v))\s*$/i);
    if (img || vid) {
      const label = img ? img[1] : (vid[1] || 'Video');
      const url = (img ? img[2] : vid[2]).replace(/\s+"[^"]*"$/, '');
      const isVideo = !!vid || VIDEO_EXT.test(url);
      const item = { label, url, kind: isVideo ? (vid && /loop/i.test(vid[1] || '') ? 'loop' : 'video') : kindOf(label),
        type: isVideo ? 'video' : (/\.gif(\?|$)/i.test(url) ? 'gif' : 'image'), line: n + 1 };
      if (zone === 'body' && cur) cur.media.push(item);
      else if (zone === 'body' && !cur) out.closing.push({ ...item, where: 'before first chapter' });
      else out.closing.push({ ...item, where: zone });
      continue;
    }
    if (zone !== 'body') continue;

    // results lines
    if (inResults && /^[-*]\s/.test(t) && t.includes('|')) {
      const parts = t.replace(/^[-*]\s*/, '').split('|').map((s) => s.trim());
      out.results.push({ value: parts[0], what: parts[1] || null, source: parts[2] || null, asOf: parts[3] || null, line: n + 1 });
      continue;
    }
    if (!cur) continue;

    // quotes
    if (/^>/.test(t)) {
      const q = t.replace(/^>\s*/, '');
      const last = cur.quotes[cur.quotes.length - 1];
      if (last && !last.by && !/^["“]/.test(q)) last.by = q; else cur.quotes.push({ text: q, by: null });
      continue;
    }
    // tables
    if (/^\|.*\|$/.test(t)) {
      const last = cur.tables[cur.tables.length - 1];
      if (last && last.end === n) { last.rows.push(t); last.end = n + 1; } else cur.tables.push({ rows: [t], end: n + 1 });
      continue;
    }
    // milestones (before titled points)
    if (/^(?:[-*]\s*)?\d{4}(-\d{2})?:\s+\S/.test(t)) { cur.milestones.push(t.replace(/^[-*]\s*/, '')); continue; }
    // group label
    if (/^\*[^*].*[^*]\*$/.test(t)) { cur.groups.push({ label: t.slice(1, -1), at: cur.points.length }); continue; }
    // points
    const titled = t.match(/^(?:[-*]|\d+\.)\s+\*\*([^*]+)\*\*\s*:?\s*(.*)$/);
    const plain = t.match(/^(?:[-*]|\d+\.)\s+(.+)$/);
    const indented = /^[\t ]+/.test(original);
    const boldOnly = t.match(/^\*\*([^*]+)\*\*:?$/);
    if (boldOnly) { lastPoint = { title: clean(boldOnly[1]), text: null, line: n + 1, bare: true }; cur.points.push(lastPoint); continue; }
    if (lastPoint && lastPoint.bare && !lastPoint.text && !/^(?:[-*]|\d+\.)\s/.test(t)) { lastPoint.text = t; continue; }
    if (titled) {
      lastPoint = { title: clean(titled[1]), text: titled[2].trim() || null, line: n + 1 };
      cur.points.push(lastPoint); continue;
    }
    if (plain && !(indented && lastPoint && !lastPoint.text)) {
      lastPoint = { title: null, text: plain[1].trim(), line: n + 1, numbered: /^\d+\./.test(t) }; cur.points.push(lastPoint); continue;
    }
    // two-line item: indented description under a title-only point
    if (lastPoint && !lastPoint.text && indented) { lastPoint.text = t.replace(/^[-*]\s*/, ''); continue; }
    // prose
    if (!cur.lead) cur.lead = t; else cur.paras.push(t);
  }

  for (const s of out.sections) {
    s.words = words([s.lead || '', ...s.paras, ...s.points.map((p) => `${p.title || ''} ${p.text || ''}`)].join(' '));
  }
  return out;
}

// ------------------------------------------------------------------- flags
export function flagsFor(md, parsed) {
  const flags = [];
  const add = (type, line, detail) => flags.push({ type, line, detail });
  const lines = md.replace(/\r\n?/g, '\n').split('\n');
  lines.forEach((l, i) => {
    const isUrlOnly = /^\s*!\[|^\s*[-*]\s*(Video|Loop):/i.test(l);
    const text = isUrlOnly ? (l.match(/!\[([^\]]*)\]/)?.[1] || '') : l.replace(/\(https?:[^)]+\)/g, '');
    if (DASH.test(text)) add('dash', i + 1, text.trim().slice(0, 90));
    const lower = ` ${text.toLowerCase()} `;
    for (const b of BANNED) if (new RegExp(`[^a-z-]${b.replace('-', '\\-')}[^a-z-]`).test(lower)) add('banned word', i + 1, b);
    for (const [us, gb] of Object.entries(US_SPELLINGS)) if (new RegExp(`\\b${us}\\b`, 'i').test(text)) add('spelling', i + 1, `${us} → ${gb}`);
    for (const p of PLACEHOLDERS) if (p.test(text)) add('placeholder', i + 1, text.trim().slice(0, 60));
    if (/^\t+\s*#{2,}/.test(l)) add('parser: tab-indented heading', i + 1, l.trim().slice(0, 60));
    if (/^\s*#{4,}/.test(l) || /\*\*#+/.test(l)) add('parser: #### in heading or title', i + 1, l.trim().slice(0, 60));
    if (/drive\.google\.com/.test(l)) add('media: Google Drive link', i + 1, '');
  });
  if (parsed.hasSiteCopy) add('two copies', null, 'short copy plus "Sanity site copy": collapse to one copy');
  const sub = typeof parsed.meta.Subtitle === 'string' ? parsed.meta.Subtitle : '';
  if (!sub) add('missing', null, 'Subtitle');
  else if (sub.length > 90) add('length', null, `Subtitle ${sub.length} chars > 90`);
  for (const k of ['Client', 'Industry', 'Disciplines', 'Year']) if (!parsed.meta[k]) add('missing', null, `meta ${k}`);
  if (!parsed.results.length) add('missing', null, 'Results (none; ask the owner or mark unvalidated)');
  for (const r of parsed.results) if (!r.source || !r.asOf) add('result incomplete', r.line, `${r.value} | ${r.what}: needs source and as-of date`);
  if (!parsed.sections.length) add('missing', null, 'No chapters (### headings)');
  let mockups = 0; const urls = new Map();
  parsed.sections.forEach((s, i) => {
    if (GENERIC_HEADINGS.includes(s.title.toLowerCase())) add('generic heading', s.lineNo, s.title);
    if (s.title.length > 70) add('length', s.lineNo, `Heading ${s.title.length} chars > 70`);
    if (s.words && (s.words < 30 || s.words > 150) && s.media.length === 0) add('length', s.lineNo, `Chapter "${s.title}" ${s.words} words (30 to 150)`);
    if (s.words > 150) add('length', s.lineNo, `Chapter "${s.title}" ${s.words} words > 150`);
    if (i === 0 && s.lead) { const w = words(s.lead); if (w < 40 || w > 60) add('summary', s.lineNo, `First lead is ${w} words; summary needs 40 to 60, so no summary block`); }
    for (const p of s.points) if (p.title && !p.text) add('point without text', p.line, p.title);
    for (const q of s.quotes) if (!q.by) add('quote without name', s.lineNo, q.text.slice(0, 50));
    for (const m of s.media) {
      if (m.kind === 'mockup') mockups++;
      if (m.kind === 'unknown') add('unknown media label', m.line, m.label || '(empty label)');
      if (!m.label) add('media without label', m.line, m.url.split('/').pop());
      if (!/\.[a-z0-9]{2,5}(\?|#|$)/i.test(m.url.split('/').pop())) add('media: no file extension', m.line, m.url.split('/').pop());
      urls.set(m.url, (urls.get(m.url) || 0) + 1);
    }
    if (s.media.length > 4) add('too many in chapter', s.lineNo, `"${s.title}" links ${s.media.length} media; keep 1 to 4 proof screens, rest to All screens`);
  });
  const folderOf = (u) => { const m = u.match(/\/work\/([^/]+)\//); return m ? m[1] : null; };
  const allMedia = parsed.sections.flatMap((s) => s.media).concat(parsed.closing);
  const counts = {}; for (const m of allMedia) { const f = folderOf(m.url); if (f) counts[f] = (counts[f] || 0) + 1; }
  const own = parsed.slug && counts[parsed.slug] ? parsed.slug : Object.entries(counts).sort((a, b) => b[1] - a[1])[0]?.[0];
  for (const m of allMedia) { const f = folderOf(m.url); if (own && f && f !== own) add('borrowed folder', m.line, `${decodeURIComponent(m.url.split('/').pop())} is in "${f}", not "${own}"`); }
  if (mockups > 2) add('mockups', null, `${mockups} mockups labelled; at most 2 per page`);
  for (const [u, c] of urls) if (c > 1) add('duplicate link', null, `${u.split('/').pop()} linked ${c} times`);
  if (!parsed.accent) add('missing', null, 'Accent (optional)');
  else if (!/^#[0-9a-f]{6}$/i.test(parsed.accent)) add('accent', null, `"${parsed.accent}" is not a 6-digit hex`);
  return flags;
}

// --------------------------------------------------------------- measuring
async function head(url) {
  try { const r = await fetch(url, { method: 'HEAD' }); return { status: r.status, bytes: +r.headers.get('content-length') || null,
    etag: r.headers.get('etag'), lastModified: r.headers.get('last-modified') }; }
  catch (e) { return { status: 0, error: String(e.message || e) }; }
}
async function range(url, start, end) {
  const r = await fetch(url, { headers: { Range: `bytes=${start}-${end}` } });
  return Buffer.from(await r.arrayBuffer());
}
function imageSize(b) {
  if (b.length > 24 && b.readUInt32BE(0) === 0x89504e47) return { w: b.readUInt32BE(16), h: b.readUInt32BE(20) };
  if (b.length > 10 && b.toString('ascii', 0, 3) === 'GIF') return { w: b.readUInt16LE(6), h: b.readUInt16LE(8) };
  if (b.length > 30 && b.toString('ascii', 0, 4) === 'RIFF' && b.toString('ascii', 8, 12) === 'WEBP') {
    const c = b.toString('ascii', 12, 16);
    if (c === 'VP8X') return { w: 1 + b.readUIntLE(24, 3), h: 1 + b.readUIntLE(27, 3) };
    if (c === 'VP8L') { const x = b.readUInt32LE(21); return { w: 1 + (x & 0x3fff), h: 1 + ((x >> 14) & 0x3fff) }; }
    if (c === 'VP8 ') return { w: b.readUInt16LE(26) & 0x3fff, h: b.readUInt16LE(28) & 0x3fff };
  }
  if (b[0] === 0xff && b[1] === 0xd8) {
    let i = 2;
    while (i + 9 < b.length) {
      if (b[i] !== 0xff) { i++; continue; }
      const m = b[i + 1]; const len = b.readUInt16BE(i + 2);
      if (m >= 0xc0 && m <= 0xcf && ![0xc4, 0xc8, 0xcc].includes(m)) return { h: b.readUInt16BE(i + 5), w: b.readUInt16BE(i + 7) };
      i += 2 + len;
    }
    return { needMore: true };
  }
  return null;
}
async function measureImage(url) {
  let size = 65536; let b = await range(url, 0, size - 1); let d = imageSize(b);
  while (d && d.needMore && size < 4 * 1024 * 1024) { size *= 4; b = await range(url, 0, size - 1); d = imageSize(b); }
  return d && !d.needMore ? d : {};
}
async function measureVideo(url, bytes) {
  const atoms = []; let off = 0; let guard = 0;
  while (bytes && off < bytes && guard++ < 50) {
    const h = await range(url, off, off + 15);
    if (h.length < 8) break;
    let size = h.readUInt32BE(0); const type = h.toString('ascii', 4, 8);
    if (size === 1) size = Number(h.readBigUInt64BE(8)); else if (size === 0) size = bytes - off;
    atoms.push({ type, off, size }); if (size < 8) break; off += size;
  }
  const moov = atoms.find((a) => a.type === 'moov'); const mdat = atoms.find((a) => a.type === 'mdat');
  const res = { moovAtEnd: !!(moov && mdat && moov.off > mdat.off) };
  if (moov && moov.size < 8 * 1024 * 1024) {
    const m = await range(url, moov.off, moov.off + moov.size - 1);
    const mv = m.indexOf('mvhd');
    if (mv > 0) { const v = m[mv + 4]; const ts = v === 1 ? m.readUInt32BE(mv + 24) : m.readUInt32BE(mv + 16);
      const du = v === 1 ? Number(m.readBigUInt64BE(mv + 28)) : m.readUInt32BE(mv + 20); res.duration = +(du / ts).toFixed(2); }
    let i = 0; let best = null;
    while ((i = m.indexOf('tkhd', i + 1)) > 0) {
      const v = m[i + 4]; const base = i + (v === 1 ? 92 : 80);
      const a = m.readInt32BE(base - 36); const bb = m.readInt32BE(base - 32);
      let w = m.readUInt32BE(base) >>> 16; let hgt = m.readUInt32BE(base + 4) >>> 16;
      if (a === 0 && bb !== 0) [w, hgt] = [hgt, w];
      if (w && (!best || w > best.w)) best = { w, h: hgt };
    }
    if (best) Object.assign(res, best);
    res.audio = m.includes(Buffer.from('soun'));
  }
  return res;
}
function shapeOf(w, h) {
  if (!w || !h) return null; const r = h / w;
  if (w >= 1280 && r >= 1.75) return 'scrollshot';
  if (r >= 1.75) return 'phone'; if (r >= 1.2) return 'tall'; if (r >= 0.85) return 'square'; if (r >= 0.5) return 'landscape'; return 'wide';
}
async function measureAll(parsed) {
  const all = [...parsed.sections.flatMap((s) => s.media), ...parsed.closing];
  for (const m of all) {
    Object.assign(m, await head(m.url));
    if (m.status !== 200) continue;
    try { Object.assign(m, m.type === 'video' ? await measureVideo(m.url, m.bytes) : await measureImage(m.url)); }
    catch (e) { m.measureError = String(e.message || e); }
    m.shape = shapeOf(m.w, m.h);
  }
  const seen = new Map();
  for (const m of all) { const k = m.bytes && `${m.bytes}`; if (!k) continue; if (seen.has(k)) m.dupOf = seen.get(k); else seen.set(k, m.url); }
  return all;
}

// ---------------------------------------------------------- archetype + plan
function archetypeOf(parsed) {
  const media = parsed.sections.flatMap((s) => s.media).concat(parsed.closing);
  if (!parsed.sections.length && !media.length) return 'no body';
  if (!media.length) return 'thin text-only';
  const c = (k) => media.filter((m) => m.kind === k).length;
  const phones = media.filter((m) => m.shape === 'phone').length;
  const brand = c('logo') + c('type') + c('colour') + c('pattern') + c('application');
  const vids = c('video') + c('loop');
  if (media.length >= 100) return 'large screen set';
  if (parsed.results.length >= 3 && parsed.sections.length >= 5) return 'stats-led, multi-workstream';
  if (brand >= 3 && brand >= c('screen')) return 'brand identity';
  if (vids >= 5 && vids >= media.length / 2) return 'campaign or video-led';
  if (c('dashboard') + media.filter((m) => m.shape === 'scrollshot').length >= 3) return 'dashboard or data product';
  if (phones >= media.length * 0.6 || (c('screen') >= media.length * 0.6 && c('web') + c('dashboard') === 0)) return 'mobile app';
  return 'web platform';
}
function pointsBlock(n) {
  if (n <= 0) return null; if (n === 1) return 'points: prose'; if (n <= 3) return `points: ${n} columns`;
  if (n <= 6) return `points: grid of ${n}, ${n === 3 || n === 6 ? 3 : 2} columns`; return `points: two-column list of ${n}`;
}
function mediaBlocks(s) {
  const blocks = []; const imgs = s.media.filter((m) => m.type !== 'video'); const vids = s.media.filter((m) => m.type === 'video');
  const styles = imgs.filter((m) => m.kind === 'styles'); const rest = imgs.filter((m) => m.kind !== 'styles');
  const phoneLike = (m) => ['phone', 'tall'].includes(m.shape) || (!m.shape && ['screen', 'states'].includes(m.kind));
  const groups = new Map();
  for (const m of rest) { const key = m.kind === 'states' ? 'States' : m.kind === 'mockup' ? 'Mockup' : ((m.label.split(':')[1] || '').split(',')[0].replace(/\s*\d+\s*$/, '').trim() || m.kind); if (!groups.has(key)) groups.set(key, []); groups.get(key).push(m); }
  for (const [name, set] of groups) {
    const ph = set.filter(phoneLike); const other = set.filter((m) => !phoneLike(m));
    if (ph.length >= 3) for (let i = 0; i < ph.length; i += 8) blocks.push(`rail "${name}" (${Math.min(8, ph.length - i)})`);
    else if (ph.length === 2) blocks.push(`pair "${name}"`); else if (ph.length === 1) blocks.push('figure');
    if (name === 'Mockup') { blocks.push(...other.map(() => 'figure (mockup)')); continue; }
    if (other.length === 1) blocks.push(s.words <= 120 && other[0].shape !== 'phone' ? 'split' : (other[0].shape === 'scrollshot' ? 'scrollshot' : 'figure'));
    else if (other.length === 2) blocks.push(`pair "${name}"`);
    else if (other.length >= 3 && other.length <= 6) blocks.push(`mosaic "${name}" (${other.length})`);
    else if (other.length >= 7) blocks.push(`wall "${name}" (${other.length}, viewer)`);
  }
  if (styles.length) blocks.push(styles.length === 2 ? 'pair "Styles" 50:50' : `figure x${styles.length} "Styles"`);
  for (const v of vids) blocks.push(v.duration == null ? `${v.kind === 'loop' ? 'loop' : 'loop or video (duration unknown; measure)'}` : (v.duration <= 15 ? 'loop' : 'video (muted, click to play)'));
  return blocks;
}
export function blockPlan(parsed) {
  if (!parsed.sections.length && !parsed.closing.length) return ['hero (title, brand, SEO description only)', 'related', 'noindex stays on'];
  const plan = ['hero'];
  if (parsed.results.length >= 2) plan.push(`stats (${Math.min(4, parsed.results.length)})`);
  const first = parsed.sections[0]; if (first && first.lead) { const w = words(first.lead); if (w >= 40 && w <= 60) plan.push('summary'); }
  for (const s of parsed.sections) {
    const parts = [`chapter "${s.title}"`]; const steps = s.points.length >= 3 && s.points.every((p) => p.numbered && !p.title);
    const pb = steps ? `steps (${s.points.length})` : pointsBlock(s.points.length); if (pb) parts.push(pb);
    parts.push(...mediaBlocks(s));
    if (s.quotes.length) parts.push(`quote x${s.quotes.length}`); if (s.tables.length) parts.push(`table x${s.tables.length}`);
    if (s.milestones.length >= 3) parts.push(`timeline (${s.milestones.length})`);
    plan.push(parts.join(' + '));
  }
  if (parsed.results.length && !parsed.sections.some((s) => /^results$/i.test(s.title))) plan.push('results');
  plan.push('screens (All screens; only when the folder holds approved screens not shown in a chapter)');
  plan.push('credits'); if (Object.keys(parsed.links).length) plan.push('presence'); plan.push('related', 'next');
  return plan;
}

// ------------------------------------------------------------------ sources
async function fromCms(slug) {
  const q = `*[_type=="caseStudy" && slug.current==$slug][0]{title,shortTitle,"slug":slug.current,bodyMarkdown,coverPath,thumbnailPath}`;
  const url = `${CMS_QUERY_URL}?query=${encodeURIComponent(q)}&%24slug=${encodeURIComponent(JSON.stringify(slug))}`;
  const r = await fetch(url); if (!r.ok) throw new Error(`CMS ${r.status}`); const j = await r.json();
  if (!j.result) throw new Error(`No case study with slug "${slug}"`); return j.result;
}
async function allFromCms() {
  const q = `*[_type=="caseStudy"]|order(slug.current asc){title,"slug":slug.current,bodyMarkdown,noIndex}`;
  const r = await fetch(`${CMS_QUERY_URL}?query=${encodeURIComponent(q)}`); if (!r.ok) throw new Error(`CMS ${r.status}`);
  return (await r.json()).result;
}

// --------------------------------------------------------------------- report
function summarise(name, md, parsed, flags) {
  const media = parsed.sections.flatMap((s) => s.media).concat(parsed.closing);
  const kinds = {}; for (const m of media) kinds[m.kind] = (kinds[m.kind] || 0) + 1;
  const shapes = {}; for (const m of media) if (m.shape) shapes[m.shape] = (shapes[m.shape] || 0) + 1;
  const bytes = media.reduce((a, m) => a + (m.dupOf || m.status && m.status !== 200 ? 0 : (m.bytes || 0)), 0);
  return { name, words: words(md), sections: parsed.sections.map((s) => ({ title: s.title, words: s.words, points: s.points.length,
    media: s.media.length, quotes: s.quotes.length, tables: s.tables.length, milestones: s.milestones.length, layoutHint: s.layoutHint })),
    meta: parsed.meta, links: parsed.links, accent: parsed.accent, results: parsed.results, closingMedia: parsed.closing.length,
    mediaKinds: kinds, shapes, measuredBytes: MEASURE ? bytes : undefined, archetype: archetypeOf(parsed), blockPlan: blockPlan(parsed),
    flags, media: MEASURE ? media : undefined };
}
function printText(r) {
  const o = [];
  o.push(`# Audit: ${r.name}`, '', `Words: ${r.words}  Chapters: ${r.sections.length}  Archetype (guess): ${r.archetype}`);
  o.push(`Media kinds: ${Object.entries(r.mediaKinds).map(([k, v]) => `${k} ${v}`).join(', ') || 'none'}`);
  if (Object.keys(r.shapes).length) o.push(`Shapes: ${Object.entries(r.shapes).map(([k, v]) => `${k} ${v}`).join(', ')}`);
  if (r.measuredBytes != null) o.push(`Rendered bytes (measured, dupes and dead excluded): ${(r.measuredBytes / 1048576).toFixed(1)} MB${r.measuredBytes > 25 * 1048576 ? '  WARN > 25 MB' : ''}`);
  o.push(`Results lines: ${r.results.length}  Presence links: ${Object.keys(r.links).join(', ') || 'none'}  Accent: ${r.accent || 'none'}`, '');
  o.push('## Chapters', '| # | Heading | Words | Points | Media | Quotes | Tables | Milestones |', '|---|---|---|---|---|---|---|---|');
  r.sections.forEach((s, i) => o.push(`| ${i + 1} | ${s.title} | ${s.words} | ${s.points} | ${s.media} | ${s.quotes} | ${s.tables} | ${s.milestones} |`));
  o.push('', '## Block plan', ...r.blockPlan.map((b) => `- ${b}`), '');
  const byType = {}; for (const f of r.flags) (byType[f.type] ||= []).push(f);
  o.push(`## Flags (${r.flags.length})`);
  for (const [t, fs] of Object.entries(byType)) { o.push(`- **${t}** (${fs.length})`); for (const f of fs.slice(0, 12)) o.push(`  - ${f.line ? `line ${f.line}: ` : ''}${f.detail}`); if (fs.length > 12) o.push(`  - … ${fs.length - 12} more`); }
  if (r.media) { o.push('', '## Media (measured)', '| File | Kind | Status | w×h | Shape | Bytes | Extra |', '|---|---|---|---|---|---|---|');
    for (const m of r.media) o.push(`| ${decodeURIComponent(m.url.split('/').pop())} | ${m.kind} | ${m.status} | ${m.w || '?'}×${m.h || '?'} | ${m.shape || '?'} | ${m.bytes ?? '?'} | ${[m.duration != null && `${m.duration}s`, m.moovAtEnd && 'moov at end', m.audio && 'has audio track', m.dupOf && `dup of ${m.dupOf.split('/').pop()}`].filter(Boolean).join(', ')} |`); }
  return o.join('\n');
}

// ----------------------------------------------------------------------- main
async function main() {
  if (flag('--all')) {
    const docs = await allFromCms(); const rows = [];
    for (const d of docs) { const md = d.bodyMarkdown || ''; const p = parseBody(md); const f = flagsFor(md, p);
      rows.push({ slug: d.slug, noIndex: !!d.noIndex, words: words(md), sections: p.sections.length,
        leakedH3: (md.match(/^\s*\t+\s*###/gm) || []).length - 0, hashPoints: p.sections.flatMap((s) => s.points).filter((x) => /^#/.test(x.title || '')).length,
        media: p.sections.reduce((a, s) => a + s.media.length, 0) + p.closing.length, flags: f.length, archetype: archetypeOf(p) }); }
    if (AS_JSON) return console.log(JSON.stringify(rows, null, 2));
    console.log(`# All case studies (${rows.length})\n\n| Slug | noIndex | Words | Chapters | Media | Flags | Archetype |\n|---|---|---|---|---|---|---|`);
    for (const r of rows) console.log(`| ${r.slug} | ${r.noIndex ? 'yes' : ''} | ${r.words} | ${r.sections} | ${r.media} | ${r.flags} | ${r.archetype} |`);
    const withBody = rows.filter((r) => r.words > 0);
    console.log(`\nBodies: ${withBody.length}; with 2 or more chapters: ${withBody.filter((r) => r.sections >= 2).length}; points starting with #: ${rows.reduce((a, r) => a + r.hashPoints, 0)}`);
    return;
  }
  const target = positional[0];
  if (!target) { console.error('Usage: case-audit.mjs <file.md | slug> [--measure] [--json] | --all'); process.exit(2); }
  let md; let name = target;
  if (existsSync(target)) md = readFileSync(target, 'utf8');
  else { const d = await fromCms(target); md = d.bodyMarkdown || ''; name = `${d.title} (${d.slug})`; }
  const parsed = parseBody(md); parsed.slug = existsSync(target) ? null : target;
  if (MEASURE) await measureAll(parsed);
  const report = summarise(name, md, parsed, flagsFor(md, parsed));
  console.log(AS_JSON ? JSON.stringify(report, null, 2) : printText(report));
}

if (import.meta.url === `file://${process.argv[1]}`) main().catch((e) => { console.error(`case-audit: ${e.message}`); process.exit(1); });
