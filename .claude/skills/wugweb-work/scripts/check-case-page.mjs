#!/usr/bin/env node
// wugweb-work: check-case-page.mjs
// Read-only. Fetches a rendered case study page (local or live) and runs the
// static part of the publish gate in references/qa-checklist.md.
// Prints a pass or fail table and [passed]/[applicable]. Exit code 1 on any fail.
//
// Usage:
//   node check-case-page.mjs <url | file.html> [--host www.wugweb.com] [--canonical-host www.wugweb.com]
//                            [--no-media] [--json]
//
// --host            Send this Host header (for a local preview of the canonical host).
// --canonical-host  JSON-LD is required only when the page is served for this host
//                   (default www.wugweb.com); elsewhere the check reports n/a.
// --no-media        Skip HEAD requests for media status and byte total.
//
// Browser-only checks (overflow, cropping, contrast, targets, reduced motion,
// critique) are listed as "browser" and must be run in the pane at each width.

import { readFileSync, existsSync } from 'node:fs';

const args = process.argv.slice(2);
const opt = (k, d) => { const i = args.indexOf(k); return i >= 0 ? args[i + 1] : d; };
const target = args.find((a, i) => !a.startsWith('--') && !['--host', '--canonical-host'].includes(args[i - 1]));
const HOST = opt('--host', null);
const CANON = opt('--canonical-host', 'www.wugweb.com');
const NO_MEDIA = args.includes('--no-media');
const AS_JSON = args.includes('--json');
const BUDGET = 25 * 1024 * 1024;

if (!target) { console.error('Usage: check-case-page.mjs <url | file.html> [--host h] [--no-media] [--json]'); process.exit(2); }

// --------------------------------------------------------------- tiny HTML
function tokenize(html) {
  const toks = []; const re = /<!--[\s\S]*?-->|<(\/?)([a-zA-Z][\w-]*)((?:\s+[^\s=>\/]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]+))?)*)\s*(\/?)>|([^<]+)/g;
  let m;
  while ((m = re.exec(html))) {
    if (m[0].startsWith('<!--')) continue;
    if (m[5] !== undefined) { toks.push({ t: 'text', v: m[5] }); continue; }
    const attrs = {}; const ar = /([^\s=>\/]+)(?:\s*=\s*("([^"]*)"|'([^']*)'|([^\s>]+)))?/g; let a;
    while ((a = ar.exec(m[3] || ''))) attrs[a[1].toLowerCase()] = a[3] ?? a[4] ?? a[5] ?? '';
    toks.push({ t: m[1] ? 'close' : 'open', tag: m[2].toLowerCase(), attrs, self: !!m[4] });
  }
  return toks;
}
const VOID = new Set(['img', 'br', 'hr', 'meta', 'link', 'input', 'source', 'track', 'wbr', 'area', 'base', 'col', 'embed', 'param']);
function buildTree(toks) {
  const root = { tag: '#root', attrs: {}, children: [], parent: null }; let cur = root; let raw = null;
  for (const k of toks) {
    if (raw) { if (k.t === 'close' && k.tag === raw.tag) { cur = raw.parent; raw = null; } else raw.text += k.t === 'text' ? k.v : ''; continue; }
    if (k.t === 'text') { cur.children.push({ tag: '#text', text: k.v, parent: cur }); continue; }
    if (k.t === 'open') {
      const el = { tag: k.tag, attrs: k.attrs, children: [], parent: cur, text: '' }; cur.children.push(el);
      if (k.tag === 'script' || k.tag === 'style') { raw = el; cur = el; continue; }
      if (!VOID.has(k.tag) && !k.self) cur = el; continue;
    }
    let p = cur; while (p && p.tag !== k.tag) p = p.parent; if (p) cur = p.parent || root;
  }
  return root;
}
const all = (n, f, out = []) => { for (const c of n.children || []) { if (c.tag !== '#text' && f(c)) out.push(c); all(c, f, out); } return out; };
const textOf = (n) => n.tag === '#text' ? n.text : (n.tag === 'script' || n.tag === 'style') ? '' : (n.children || []).map(textOf).join(' ');
const decode = (s) => s.replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;|&apos;/g, "'")
  .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(+d)).replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCodePoint(parseInt(h, 16))).replace(/&mdash;/g, '—').replace(/&ndash;/g, '–');
const within = (n, tag) => { let p = n.parent; while (p) { if (p.tag === tag) return p; p = p.parent; } return null; };

// ------------------------------------------------------------------- fetch
async function load() {
  if (existsSync(target)) return { html: readFileSync(target, 'utf8'), base: 'http://localhost/', host: HOST };
  const headers = HOST ? { Host: HOST } : {};
  const r = await fetch(target, { headers, redirect: 'manual' });
  return { html: await r.text(), base: target, status: r.status, host: HOST || new URL(target).host };
}

// ------------------------------------------------------------------- gate
async function run() {
  const { html, base, status, host } = await load();
  const doc = buildTree(tokenize(html));
  const results = [];
  const check = (name, pass, detail = '', applicable = true) => results.push({ name, status: !applicable ? 'n/a' : pass ? 'pass' : 'fail', detail });
  const browser = (name) => results.push({ name, status: 'browser', detail: 'check in the pane at each gate width' });

  if (status !== undefined) check('Page returns 200', status === 200, `status ${status}`);

  // headings
  const hs = all(doc, (n) => /^h[1-6]$/.test(n.tag));
  const h1 = hs.filter((h) => h.tag === 'h1');
  check('Exactly one h1', h1.length === 1, `${h1.length} found`);
  const skips = []; let prev = 0;
  for (const h of hs) { const l = +h.tag[1]; if (prev && l > prev + 1) skips.push(`${'h' + prev} → ${h.tag} "${decode(textOf(h)).trim().slice(0, 40)}"`); prev = l; }
  check('Heading levels never skip', !skips.length, skips.slice(0, 5).join('; '));

  // sections and chapters
  const main = all(doc, (n) => n.tag === 'main')[0] || doc;
  const ids = new Set(all(doc, (n) => n.attrs && n.attrs.id).map((n) => n.attrs.id));
  const sections = all(main, (n) => n.tag === 'section');
  const badSec = sections.filter((s) => !s.attrs.id || !(s.attrs['aria-label'] || (s.attrs['aria-labelledby'] && ids.has(s.attrs['aria-labelledby']))));
  check('Every section has an id and an accessible name', !badSec.length, badSec.slice(0, 5).map((s) => s.attrs.id || s.attrs.class || '(no id)').join(', '));
  const arts = all(main, (n) => n.tag === 'article' && /case-chapter/.test(n.attrs.class || ''));
  const artIds = arts.map((a) => a.attrs.id).filter(Boolean);
  const badArt = arts.filter((a) => !a.attrs.id || !all(a, (n) => n.tag === 'h2').length);
  check('Every chapter article has a unique id and an h2', arts.length > 0 && !badArt.length && new Set(artIds).size === artIds.length,
    arts.length ? `${arts.length} chapters, ${badArt.length} bad, ${artIds.length - new Set(artIds).size} duplicate ids` : 'no article.case-chapter found', true);

  // images
  const imgs = all(main, (n) => n.tag === 'img');
  const noAlt = imgs.filter((i) => !('alt' in i.attrs)); const noSize = imgs.filter((i) => !i.attrs.width || !i.attrs.height);
  const longAlt = imgs.filter((i) => (i.attrs.alt || '').length > 125);
  const altCounts = {}; for (const i of imgs) if (i.attrs.alt) altCounts[i.attrs.alt] = (altCounts[i.attrs.alt] || 0) + 1;
  const sameAlt = Object.values(altCounts).filter((c) => c > 2).reduce((a, c) => a + c, 0);
  check('Every img has alt', !noAlt.length, `${noAlt.length} of ${imgs.length} missing`);
  check('Every img has width and height', !noSize.length, `${noSize.length} of ${imgs.length} missing`);
  check('Alt text 125 characters or fewer', !longAlt.length, `${longAlt.length} too long`);
  check('Alt text is not repeated across many images', sameAlt === 0, sameAlt ? `${sameAlt} images share an alt used 3 or more times` : '');
  const hero = imgs[0];
  if (hero) check('Hero image is high priority and not lazy', hero.attrs.fetchpriority === 'high' && hero.attrs.loading !== 'lazy', `fetchpriority=${hero.attrs.fetchpriority || '-'} loading=${hero.attrs.loading || '-'}`);
  const notLazy = imgs.slice(1).filter((i) => i.attrs.loading !== 'lazy');
  check('Other images lazy', !notLazy.length, `${notLazy.length} not lazy`, imgs.length > 1);

  // dashes in visible text and labels
  const bodyEl = all(doc, (n) => n.tag === 'body')[0] || doc;
  const visible = decode(textOf(bodyEl));
  const dashHits = (visible.match(/.{0,30}[–—].{0,30}/g) || []).map((s) => s.replace(/\s+/g, ' ').trim());
  const labelDash = all(doc, (n) => n.attrs && ['aria-label', 'alt', 'title'].some((k) => /[–—]/.test(decode(n.attrs[k] || ''))));
  const titleEl = all(doc, (n) => n.tag === 'title')[0]; const titleText = titleEl ? decode(textOf(titleEl)).trim() : '';
  check('No em or en dash in visible text', !dashHits.length, dashHits.slice(0, 3).join(' | '));
  check('No em or en dash in aria-label, alt or title attributes', !labelDash.length, labelDash.slice(0, 3).map((n) => n.tag).join(', '));

  // rails
  const rails = all(main, (n) => /case-rail/.test(n.attrs.class || '') && n.tag !== 'button' && !within(n, 'li'));
  const railRoots = rails.filter((r) => !rails.some((o) => o !== r && within(r, o.tag) === o));
  const badRails = railRoots.filter((r) => !['region', 'group'].includes(r.attrs.role) || r.attrs['aria-roledescription'] !== 'carousel' || !(r.attrs['aria-label'] || r.attrs['aria-labelledby']) || /carousel/i.test(r.attrs['aria-label'] || '') || !all(r, (n) => n.tag === 'button').length);
  check('Rails: region or group, carousel role description, name, buttons', !badRails.length, `${railRoots.length} rails, ${badRails.length} bad`, railRoots.length > 0);
  const noSlides = railRoots.filter((r) => { const s = all(r, (n) => n.attrs['aria-roledescription'] === 'slide'); return !s.length || s.some((n) => n.attrs.role !== 'group' || !(n.attrs['aria-label'] || n.attrs['aria-labelledby'])); });
  check('Rail slides are named groups with role description slide', !noSlides.length, `${noSlides.length} rails bad`, railRoots.length > 0);

  // videos
  const vids = all(main, (n) => n.tag === 'video');
  const loops = vids.filter((v) => 'loop' in v.attrs); const longs = vids.filter((v) => !('loop' in v.attrs));
  const badLoops = loops.filter((v) => !('muted' in v.attrs) || !('playsinline' in v.attrs) || !v.attrs['data-src']);
  const badLongs = longs.filter((v) => !('muted' in v.attrs) || 'controls' in v.attrs || v.attrs['aria-hidden'] === 'true' || v.attrs.preload !== 'none' || !v.attrs['aria-label']);
  const autoplaySound = vids.filter((v) => 'autoplay' in v.attrs && !('muted' in v.attrs));
  check('Loops are muted, playsinline, data-src (aria-hidden only for loops of 5 s or less without a control: manual check)', !badLoops.length, `${loops.length} loops, ${badLoops.length} bad`, loops.length > 0);
  check('Long videos muted, no native controls, not aria-hidden, preload none, labelled', !badLongs.length, `${longs.length} videos, ${badLongs.length} bad`, longs.length > 0);
  check('No video can play sound on its own', !autoplaySound.length, `${autoplaySound.length} autoplay without muted`, vids.length > 0);

  // head
  const metas = all(doc, (n) => n.tag === 'meta');
  const desc = (metas.find((m) => m.attrs.name === 'description') || { attrs: {} }).attrs.content || '';
  const canon = all(doc, (n) => n.tag === 'link' && n.attrs.rel === 'canonical')[0];
  // Limits are set by wugweb-seo (.claude/skills/wugweb-seo/references/audit.md): title-rendered, 60 characters as rendered, the one limit for every page type.
  check('<title> 60 characters or fewer as rendered (wugweb-seo title-rendered)', titleText.length > 0 && titleText.length <= 60, `${titleText.length}: "${titleText}"`);
  check('Meta description 140 to 160 characters', decode(desc).length >= 140 && decode(desc).length <= 160, `${decode(desc).length}`);
  let canonOk = false; let canonDetail = 'missing';
  if (canon) { try { const cu = new URL(canon.attrs.href, base); const pu = new URL(base); canonOk = cu.pathname.replace(/\/$/, '') === pu.pathname.replace(/\/$/, ''); canonDetail = canon.attrs.href; } catch { canonDetail = 'invalid'; } }
  check('Canonical points to this page', canonOk, canonDetail, !existsSync(target));

  // JSON-LD
  const ld = all(doc, (n) => n.tag === 'script' && n.attrs.type === 'application/ld+json');
  const types = new Set(); const banned = [];
  for (const s of ld) { try { const j = JSON.parse(s.text); const walk = (o) => { if (Array.isArray(o)) return o.forEach(walk); if (o && typeof o === 'object') { [].concat(o['@type'] || []).forEach((t) => types.add(t)); if ('author' in o) banned.push('author'); Object.values(o).forEach(walk); } }; walk(j); } catch { banned.push('invalid JSON'); } }
  for (const t of ['HowTo', 'Review', 'AggregateRating']) if (types.has(t)) banned.push(t);
  // FAQPage is allowed only when every question and answer is visibly on the page (owner, 2026-11-17)
  const faqHidden = [];
  if (types.has('FAQPage')) {
    const norm = (x) => decode(String(x || '')).replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim().toLowerCase();
    const seen = norm(visible);
    for (const s of ld) { try { const walk = (o) => { if (Array.isArray(o)) return o.forEach(walk); if (o && typeof o === 'object') { if ([].concat(o['@type'] || []).includes('Question')) { const q = norm(o.name); const a = norm(o.acceptedAnswer && o.acceptedAnswer.text); if (!q || !seen.includes(q)) faqHidden.push(`Q: ${q.slice(0, 40)}`); if (!a || !seen.includes(a)) faqHidden.push(`A: ${a.slice(0, 40)}`); } Object.values(o).forEach(walk); } }; walk(JSON.parse(s.text)); } catch {} }
  }
  const onCanon = (host || '').replace(/:\d+$/, '') === CANON;
  check('JSON-LD has WebPage, CreativeWork, BreadcrumbList', ['WebPage', 'CreativeWork', 'BreadcrumbList'].every((t) => types.has(t)), [...types].join(', ') || 'none', onCanon);
  check('JSON-LD has no HowTo, Review, AggregateRating or author', !banned.length, banned.join(', '), onCanon || ld.length > 0);
  check('No FAQPage on a case study', !(types.has('FAQPage') && types.has('CreativeWork')), types.has('FAQPage') ? 'FAQPage with CreativeWork' : 'none', types.has('FAQPage'));
  check('FAQPage only where every question and answer is visible on the page', !faqHidden.length, faqHidden.slice(0, 3).join(' | ') || (types.has('FAQPage') ? 'all visible' : 'no FAQPage'), types.has('FAQPage'));
  check('No JSON-LD on a non-canonical host', ld.length === 0, `${ld.length} blocks`, !onCanon && !existsSync(target));

  // media status and bytes
  if (!NO_MEDIA) {
    const urls = new Set();
    for (const i of imgs) { if (i.attrs.src) urls.add(new URL(i.attrs.src, base).href); }
    for (const v of vids) { const u = v.attrs.src || v.attrs['data-src']; if (u) urls.add(new URL(u.split('#')[0], base).href); if (v.attrs.poster) urls.add(new URL(v.attrs.poster, base).href); }
    for (const s of all(main, (n) => n.tag === 'source')) { const u = s.attrs.src || s.attrs['data-src']; if (u) urls.add(new URL(u, base).href); }
    let total = 0; const dead = []; const heavy = [];
    await Promise.all([...urls].map(async (u) => { try { const r = await fetch(u, { method: 'HEAD' }); if (r.status !== 200) dead.push(`${r.status} ${u.split('/').pop()}`); const b = +r.headers.get('content-length') || 0; total += b; heavy.push([b, u]); } catch (e) { dead.push(`ERR ${u.split('/').pop()}`); } }));
    heavy.sort((a, b) => b[0] - a[0]);
    check('Every media URL returns 200', !dead.length, dead.slice(0, 5).join(', ') || `${urls.size} checked`, urls.size > 0);
    check('Rendered media bytes 25 MB or less', total <= BUDGET, `${(total / 1048576).toFixed(1)} MB summed over ${urls.size} URLs; largest: ${heavy.slice(0, 3).map(([b, u]) => `${decodeURIComponent(u.split('/').pop())} ${(b / 1048576).toFixed(1)} MB`).join(', ')}`, urls.size > 0);
  }

  for (const b of ['No page-level horizontal overflow at 375, 767, 768, 769, 1199, 1200, 1201', 'Aspect ratio kept; no mask or object-fit cover hides the proof on a screen',
    'Files shown larger than natural size are listed; soft ones flagged', 'Rail items 85vw or less on mobile', 'AA contrast including the client accent', 'Targets 44 px or more and focus visible',
    'Reduced motion stops loops and reveals', 'A loop over 5 seconds has a pause control and no aria-hidden; one of 5 seconds or less without a control has aria-hidden (duration from the manifest)', 'All content present with JavaScript off', 'Design critique 3 or more on each axis at 375 and 1200']) browser(b);

  const applicable = results.filter((r) => r.status === 'pass' || r.status === 'fail');
  const passed = applicable.filter((r) => r.status === 'pass').length;
  if (AS_JSON) console.log(JSON.stringify({ target, host, results, passed, applicable: applicable.length }, null, 2));
  else {
    console.log(`# Gate: ${target}${host ? ` (host ${host})` : ''}\n\n| Check | Result | Detail |\n|---|---|---|`);
    for (const r of results) console.log(`| ${r.name} | ${r.status} | ${String(r.detail).replace(/\|/g, '/')} |`);
    console.log(`\nResult: ${passed}/${applicable.length}`);
  }
  process.exit(passed === applicable.length ? 0 : 1);
}

run().catch((e) => { console.error(`check-case-page: ${e.message}`); process.exit(2); });
