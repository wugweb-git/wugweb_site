#!/usr/bin/env node
// scripts/check-case-page.mjs
//
// Gate for a /work/<slug> page. Fetches the HTML, parses it with a
// small DOM reader, and runs the checks the plan lists (PLAN.md D1).
// Prints one pass/fail row per check and exits non-zero on any fail.
//
// Usage:
//   node scripts/check-case-page.mjs http://localhost:4321/work/<slug>
//   node scripts/check-case-page.mjs http://localhost:8788/work/<slug> \
//     --host www.wugweb.com   # for the JSON-LD block (astro dev rejects it)
//
// JSON-LD validation runs only when --host is passed, so the canonical
// origin is known. On the live `wugweb.pages.dev` the script reports
// JSON-LD as n/a by design: the canonical host differs from the serving
// host.
//
// Exit codes: 0 ok (all applicable checks passed), 1 one or more fail,
// 2 missing arguments, 3 fetch or parse error.

import { parse } from 'node-html-parser';
const parseHTML = parse;

const TITLE_MAX = 60;
const META_MIN = 140;
const META_MAX = 160;
const BYTES_WARN = 25 * 1024 * 1024;

const [urlArg, ...rest] = process.argv.slice(2);
if (!urlArg) {
  console.error('Usage: node scripts/check-case-page.mjs <url> [--host <canonical-host>]');
  process.exit(2);
}
let hostOverride = '';
for (let i = 0; i < rest.length; i++) {
  if (rest[i] === '--host' && rest[i + 1]) hostOverride = rest[i + 1];
}

const url = new URL(urlArg);
const headers = hostOverride ? { Host: hostOverride } : {};

let html;
try {
  const r = await fetch(url, { headers });
  if (!r.ok) {
    console.error(`${url} returned ${r.status}`);
    process.exit(3);
  }
  html = await r.text();
} catch (err) {
  console.error(`Fetch failed for ${url}: ${err.message}`);
  process.exit(3);
}

const root = parseHTML(html);
const rows = [];
const warn = [];

// ---------- 1. Exactly one h1 ----------
{
  const h1 = root.querySelectorAll('h1');
  rows.push({ id: 'one-h1', pass: h1.length === 1, note: `found ${h1.length}` });
}

// ---------- 2. Heading levels never skip ----------
{
  const hs = root.querySelectorAll('h1,h2,h3,h4,h5,h6').map(n => Number(n.tagName.slice(1)));
  let ok = true;
  let last = 0;
  const skips = [];
  for (const level of hs) {
    if (last === 0) { last = level; continue; }
    if (level > last + 1) { ok = false; skips.push(`h${last} -> h${level}`); }
    last = level;
  }
  rows.push({ id: 'heading-steps', pass: ok, note: ok ? `${hs.length} headings` : `skipped: ${skips.join(', ')}` });
}

// ---------- 3. Every <section> has an id and an accessible name ----------
{
  const sections = root.querySelectorAll('section');
  const bad = sections.filter(s => {
    const hasId = Boolean(s.getAttribute('id'));
    const named = Boolean(
      s.getAttribute('aria-label') ||
      s.getAttribute('aria-labelledby') ||
      s.querySelector('h1,h2,h3,h4,h5,h6')
    );
    return !hasId || !named;
  });
  rows.push({ id: 'section-ided-and-named', pass: bad.length === 0, note: `${sections.length} sections, ${bad.length} bad` });
}

// ---------- 4. Every chapter <article> has a unique id and an h2 ----------
{
  const articles = root.querySelectorAll('article');
  const ids = new Set();
  const dupes = [];
  const missing = [];
  for (const a of articles) {
    const id = a.getAttribute('id');
    if (!id) missing.push('article without id');
    else if (ids.has(id)) dupes.push(id);
    else ids.add(id);
    const h2 = a.querySelector('h2');
    if (!h2) missing.push(`article#${id ?? '(no id)'} without h2`);
  }
  const ok = dupes.length === 0 && missing.length === 0;
  rows.push({
    id: 'chapters-unique-id-and-h2',
    pass: ok,
    note: ok ? `${articles.length} chapters` : `${dupes.length} dupes, ${missing.length} missing: ${missing.slice(0, 3).join(', ')}`
  });
}

// ---------- 5. Every <img> has alt, width, height ----------
{
  const imgs = root.querySelectorAll('img');
  const bad = imgs.filter(i =>
    i.getAttribute('alt') == null ||
    !i.getAttribute('width') ||
    !i.getAttribute('height')
  );
  rows.push({ id: 'img-alt-width-height', pass: bad.length === 0, note: `${imgs.length} imgs, ${bad.length} missing attrs` });
}

// ---------- 6. No em or en dashes in text nodes ----------
{
  const text = root.text || '';
  const em = (text.match(/—/g) || []).length;
  const en = (text.match(/–/g) || []).length;
  rows.push({ id: 'no-em-en-dashes', pass: em === 0 && en === 0, note: `em=${em}, en=${en}` });
}

// ---------- 7. Rails have role region + aria-roledescription=carousel + buttons ----------
{
  const rails = root.querySelectorAll('[aria-roledescription="carousel"]');
  const bad = rails.filter(r =>
    r.getAttribute('role') !== 'region' ||
    r.querySelectorAll('button').length < 2
  );
  rows.push({ id: 'rails-aria-and-buttons', pass: bad.length === 0, note: `${rails.length} rails, ${bad.length} bad` });
}

// ---------- 8. Loops are muted playsinline aria-hidden ----------
{
  const videos = root.querySelectorAll('video');
  const loops = videos.filter(v => v.hasAttribute('loop') && v.hasAttribute('autoplay'));
  const bad = loops.filter(v => !v.hasAttribute('muted') || !v.hasAttribute('playsinline') || v.getAttribute('aria-hidden') !== 'true');
  rows.push({ id: 'loops-muted-playsinline-aria-hidden', pass: bad.length === 0, note: `${loops.length} loops, ${bad.length} bad` });
}

// ---------- 9. Long videos are muted with controls, not aria-hidden ----------
{
  const videos = root.querySelectorAll('video');
  const long = videos.filter(v => v.hasAttribute('controls'));
  const bad = long.filter(v => !v.hasAttribute('muted') || v.getAttribute('aria-hidden') === 'true');
  rows.push({ id: 'long-videos-muted-not-hidden', pass: bad.length === 0, note: `${long.length} long videos, ${bad.length} bad` });
}

// ---------- 10. Every media URL returns 200 ----------
{
  const srcs = new Set();
  for (const el of root.querySelectorAll('img, video, source')) {
    const src = el.getAttribute('src');
    if (src && /^https?:\/\//i.test(src)) srcs.add(src.split('#')[0]);
  }
  const fails = [];
  await Promise.all(Array.from(srcs).slice(0, 80).map(async s => {
    try {
      const r = await fetch(s, { method: 'HEAD' });
      if (!r.ok) fails.push(`${r.status} ${s}`);
    } catch (err) {
      fails.push(`err ${s}`);
    }
  }));
  rows.push({ id: 'media-urls-200', pass: fails.length === 0, note: `${srcs.size} urls, ${fails.length} bad${fails.length ? ': ' + fails.slice(0, 2).join('; ') : ''}` });
}

// ---------- 11. Total rendered media bytes <= 25 MB (warn) ----------
{
  const srcs = new Set();
  for (const el of root.querySelectorAll('img, video, source')) {
    const src = el.getAttribute('src');
    if (src && /^https?:\/\//i.test(src)) srcs.add(src.split('#')[0]);
  }
  let total = 0;
  let known = 0;
  await Promise.all(Array.from(srcs).slice(0, 80).map(async s => {
    try {
      const r = await fetch(s, { method: 'HEAD' });
      const len = Number(r.headers.get('content-length'));
      if (Number.isFinite(len) && len > 0) { total += len; known++; }
    } catch { /* skip */ }
  }));
  const ok = total <= BYTES_WARN;
  rows.push({
    id: 'total-media-under-25mb',
    pass: ok,
    note: `~${(total / 1024 / 1024).toFixed(2)} MB across ${known} measured urls`
  });
}

// ---------- 12. <title> <= 60 ----------
{
  const title = (root.querySelector('title')?.text || '').trim();
  rows.push({ id: 'title-max-60', pass: title.length > 0 && title.length <= TITLE_MAX, note: `len ${title.length}` });
}

// ---------- 13. meta description 140-160 ----------
{
  const meta = root.querySelector('meta[name="description"]');
  const content = (meta?.getAttribute('content') || '').trim();
  const ok = content.length >= META_MIN && content.length <= META_MAX;
  rows.push({ id: 'meta-description-140-160', pass: ok, note: `len ${content.length}` });
}

// ---------- 14. canonical self ----------
{
  const link = root.querySelector('link[rel="canonical"]');
  const href = link?.getAttribute('href') ?? '';
  const expectedHost = hostOverride || url.host;
  const canonicalUrl = href.startsWith('http') ? new URL(href) : null;
  const ok = canonicalUrl ? (canonicalUrl.pathname === url.pathname && canonicalUrl.host === expectedHost) : false;
  rows.push({ id: 'canonical-self', pass: ok, note: href || '(missing)' });
}

// ---------- 15. JSON-LD WebPage + CreativeWork + BreadcrumbList ----------
if (hostOverride) {
  const scripts = root.querySelectorAll('script[type="application/ld+json"]');
  const types = new Set();
  for (const s of scripts) {
    try {
      const data = JSON.parse(s.text);
      const graph = Array.isArray(data['@graph']) ? data['@graph'] : [data];
      for (const node of graph) {
        const t = node['@type'];
        if (typeof t === 'string') types.add(t);
        else if (Array.isArray(t)) for (const tt of t) if (typeof tt === 'string') types.add(tt);
      }
    } catch { /* skip */ }
  }
  const want = ['WebPage', 'CreativeWork', 'BreadcrumbList'];
  const missing = want.filter(w => !types.has(w));
  rows.push({ id: 'jsonld-webpage-creativework-breadcrumb', pass: missing.length === 0, note: missing.length ? `missing: ${missing.join(', ')}` : 'all present' });
} else {
  rows.push({ id: 'jsonld-webpage-creativework-breadcrumb', pass: true, note: 'n/a (no --host)' });
}

// ---------- Report ----------
const applicable = rows.length;
const passed = rows.filter(r => r.pass).length;
console.log(`check-case-page: ${url}`);
console.log(`${'id'.padEnd(42)}  result  note`);
console.log('-'.repeat(80));
for (const r of rows) console.log(`${r.id.padEnd(42)}  ${r.pass ? 'pass' : 'FAIL'}    ${r.note}`);
console.log('-'.repeat(80));
console.log(`${passed}/${applicable} passed`);

if (warn.length) {
  for (const w of warn) console.log(`warn: ${w}`);
}

process.exit(passed === applicable ? 0 : 1);
