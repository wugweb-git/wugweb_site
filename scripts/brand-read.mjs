#!/usr/bin/env node
// Brand read (wugweb-work, Look mode). Read-only.
//
//   node scripts/brand-read.mjs --site <client site address> [--slug <name>]
//   node scripts/brand-read.mjs --screens <image address> [<image address> ...] [--slug <name>]
//   (both may be given in one run)
//
// Reads the client's brand from what already exists, so no colour, font or
// style is guessed:
//
//   --site     opens the client's live page and reads its stylesheet as the
//              browser applies it: colour custom properties, the colours that
//              cover the most area and carry the most text, the colours of
//              buttons and links, font families with sizes and weights, corner
//              radii and shadows.
//   --screens  reads the pixels of the project's own screens (media store
//              addresses) and returns the dominant colours of each and of the
//              set, ignoring near-white, near-black and grey.
//
// Every value is reported with where it was read (selector or file) and how
// much of the page or picture it covers. Contrast against the site's own page
// surface and text is computed for each colour. Output goes to
// scripts/data/media-reads/<slug>.brand.json and is printed as a table.
//
// Nothing is written to Sanity, Notion or R2. No font file, stylesheet or
// image is saved: only the values read from them. Fonts are recorded by name;
// a client's font is never loaded on this site without a licence on record.

import { chromium } from 'playwright';
import { mkdirSync, writeFileSync } from 'node:fs';
import { resolve, join } from 'node:path';

const args = process.argv.slice(2);
const opt = (k, d) => { const i = args.indexOf(k); return i >= 0 ? args[i + 1] : d; };
const listAfter = (k) => { const i = args.indexOf(k); if (i < 0) return []; const out = []; for (let j = i + 1; j < args.length && !args[j].startsWith('--'); j++) out.push(args[j]); return out; };
const SITE = opt('--site', '');
const SCREENS = listAfter('--screens');
const OUT = resolve(opt('--out', 'scripts/data/media-reads'));
// This site's own page surface and text, to measure every client colour against.
const SURFACE = opt('--surface', '#050505');
const TEXT = opt('--text', '#F4F4F4');

if (!SITE && !SCREENS.length) {
  console.error('Usage: node scripts/brand-read.mjs --site <address> | --screens <image address> ... [--slug name]');
  process.exit(2);
}
const slug = opt('--slug', SITE ? new URL(SITE).hostname.replace(/^www\./, '').replace(/[^a-z0-9]+/gi, '-') : 'screens');

const hex = ([r, g, b]) => '#' + [r, g, b].map((v) => Math.round(v).toString(16).padStart(2, '0')).join('').toUpperCase();
const parseHex = (h) => { const m = h.replace('#', ''); return [0, 2, 4].map((i) => parseInt(m.slice(i, i + 2), 16)); };
const lum = ([r, g, b]) => { const f = (v) => { v /= 255; return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; }; return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b); };
const ratio = (a, b) => { const [x, y] = [lum(a), lum(b)].sort((p, q) => q - p); return Math.round(((x + 0.05) / (y + 0.05)) * 100) / 100; };
const chroma = ([r, g, b]) => Math.max(r, g, b) - Math.min(r, g, b);
const uses = (rgb) => {
  const onSurface = ratio(rgb, parseHex(SURFACE));
  const underText = ratio(rgb, parseHex(TEXT));
  return {
    onSurface, underText,
    asAccent: onSurface >= 3, asText: onSurface >= 4.5,
    asGroundForBodyText: underText >= 4.5, asGroundForLargeText: underText >= 3,
  };
};

/** Runs in the client's page: what the stylesheet actually applies. */
function readSite() {
  const toRgb = (c) => {
    const m = c && c.match(/rgba?\(([^)]+)\)/);
    if (!m) return null;
    const p = m[1].split(/[ ,/]+/).map(Number);
    if (p.length > 3 && p[3] === 0) return null;
    return [p[0], p[1], p[2]];
  };
  const key = (rgb) => rgb.join(',');
  const bump = (map, rgb, weight, where) => {
    if (!rgb) return;
    const k = key(rgb);
    const e = map.get(k) || { rgb, weight: 0, where: new Set() };
    e.weight += weight; if (e.where.size < 4) e.where.add(where); map.set(k, e);
  };
  const name = (el) => (el.tagName.toLowerCase() + (el.id ? '#' + el.id : '') + (typeof el.className === 'string' && el.className.trim() ? '.' + el.className.trim().split(/\s+/)[0] : '')).slice(0, 60);
  const viewArea = innerWidth * Math.min(document.documentElement.scrollHeight, 6000);

  const backgrounds = new Map(); const texts = new Map(); const actions = new Map(); const borders = new Map();
  const fonts = new Map(); const radii = new Map(); const shadows = new Map();

  for (const el of document.querySelectorAll('body *')) {
    const r = el.getBoundingClientRect();
    if (r.width < 2 || r.height < 2) continue;
    const cs = getComputedStyle(el);
    if (cs.display === 'none' || cs.visibility === 'hidden') continue;
    const area = r.width * r.height;
    const where = name(el);
    bump(backgrounds, toRgb(cs.backgroundColor), area, where);
    const ownText = Array.from(el.childNodes).filter((n) => n.nodeType === 3 && n.textContent.trim()).map((n) => n.textContent.trim()).join(' ');
    if (ownText) {
      bump(texts, toRgb(cs.color), ownText.length, where);
      const fam = cs.fontFamily.split(',')[0].replace(/["']/g, '').trim();
      const f = fonts.get(fam) || { family: fam, stack: cs.fontFamily, chars: 0, weights: new Set(), sizes: new Set(), roles: new Set() };
      f.chars += ownText.length; f.weights.add(cs.fontWeight); if (f.sizes.size < 12) f.sizes.add(Math.round(parseFloat(cs.fontSize)));
      if (/^h[1-6]$/i.test(el.tagName)) f.roles.add('headings'); else if (el.closest('button, a.btn, [role="button"]')) f.roles.add('actions'); else f.roles.add('text');
      fonts.set(fam, f);
    }
    if (el.matches('button, [role="button"], a[class*="btn"], a[class*="button"], input[type="submit"]')) {
      bump(actions, toRgb(cs.backgroundColor), area, where);
      const rad = cs.borderTopLeftRadius; radii.set(rad, (radii.get(rad) || 0) + 1);
    }
    if (el.tagName === 'A' && ownText) bump(actions, toRgb(cs.color), ownText.length * 20, where + ' (link)');
    if (parseFloat(cs.borderTopWidth) > 0) bump(borders, toRgb(cs.borderTopColor), r.width, where);
    if (cs.boxShadow && cs.boxShadow !== 'none') shadows.set(cs.boxShadow, (shadows.get(cs.boxShadow) || 0) + 1);
    if (parseFloat(cs.borderTopLeftRadius) > 0 && area > 4000) radii.set(cs.borderTopLeftRadius, (radii.get(cs.borderTopLeftRadius) || 0) + 1);
  }

  // Colour custom properties the stylesheet declares on the root: the client's own token names.
  const tokens = [];
  const probe = document.createElement('span'); document.body.appendChild(probe);
  const seen = new Set();
  for (const sheet of Array.from(document.styleSheets)) {
    let rules; try { rules = sheet.cssRules; } catch { continue; }
    for (const rule of Array.from(rules || [])) {
      if (!rule.style || !/^(:root|html|body)\b/.test(rule.selectorText || '')) continue;
      for (const prop of Array.from(rule.style)) {
        if (!prop.startsWith('--') || seen.has(prop)) continue;
        seen.add(prop);
        probe.style.color = ''; probe.style.color = `var(${prop})`;
        const raw = rule.style.getPropertyValue(prop).trim();
        if (!probe.style.color || !/#|rgb|hsl|oklch|lab\(|color\(/i.test(raw + getComputedStyle(document.documentElement).getPropertyValue(prop))) continue;
        const rgb = toRgb(getComputedStyle(probe).color);
        if (rgb) tokens.push({ name: prop, declared: raw.slice(0, 60), rgb });
        if (tokens.length >= 80) break;
      }
    }
  }
  probe.remove();

  const top = (map, total, n) => Array.from(map.values()).sort((a, b) => b.weight - a.weight).slice(0, n).map((e) => ({ rgb: e.rgb, share: Math.round((e.weight / total) * 1000) / 10, where: Array.from(e.where) }));
  const sum = (map) => Array.from(map.values()).reduce((a, e) => a + e.weight, 0) || 1;
  return {
    title: document.title,
    stylesheets: Array.from(document.styleSheets).map((s) => s.href).filter(Boolean).slice(0, 12),
    unreadableStylesheets: Array.from(document.styleSheets).filter((s) => { try { return !s.cssRules; } catch { return true; } }).length,
    tokens,
    backgrounds: top(backgrounds, viewArea, 8), text: top(texts, sum(texts), 6), actions: top(actions, sum(actions), 6), borders: top(borders, sum(borders), 4),
    fonts: Array.from(fonts.values()).sort((a, b) => b.chars - a.chars).slice(0, 6).map((f) => ({ family: f.family, stack: f.stack.slice(0, 120), shareOfText: 0, chars: f.chars, weights: Array.from(f.weights).sort(), sizes: Array.from(f.sizes).sort((a, b) => a - b), roles: Array.from(f.roles) })),
    loadedFontFaces: Array.from(document.fonts).filter((f) => f.status === 'loaded').map((f) => `${f.family.replace(/["']/g, '')} ${f.weight} ${f.style}`).slice(0, 20),
    radii: Array.from(radii.entries()).sort((a, b) => b[1] - a[1]).slice(0, 5).map(([value, count]) => ({ value, count })),
    shadows: Array.from(shadows.entries()).sort((a, b) => b[1] - a[1]).slice(0, 3).map(([value, count]) => ({ value: value.slice(0, 90), count })),
  };
}

/** Runs in a blank page: dominant colours of one picture, from its pixels. */
async function readPixels(dataUrl) {
  const img = new Image();
  await new Promise((res, rej) => { img.onload = res; img.onerror = () => rej(new Error('image did not decode')); img.src = dataUrl; });
  const scale = Math.min(1, 240 / Math.max(img.naturalWidth, img.naturalHeight));
  const w = Math.max(1, Math.round(img.naturalWidth * scale)); const h = Math.max(1, Math.round(img.naturalHeight * scale));
  const c = document.createElement('canvas'); c.width = w; c.height = h;
  const ctx = c.getContext('2d'); ctx.drawImage(img, 0, 0, w, h);
  const d = ctx.getImageData(0, 0, w, h).data;
  const buckets = new Map(); let counted = 0;
  for (let i = 0; i < d.length; i += 4) {
    if (d[i + 3] < 200) continue;
    counted++;
    const k = `${d[i] >> 4},${d[i + 1] >> 4},${d[i + 2] >> 4}`;
    const e = buckets.get(k) || { n: 0, r: 0, g: 0, b: 0 };
    e.n++; e.r += d[i]; e.g += d[i + 1]; e.b += d[i + 2]; buckets.set(k, e);
  }
  const all = Array.from(buckets.values()).map((e) => ({ rgb: [e.r / e.n, e.g / e.n, e.b / e.n], share: e.n / counted })).sort((a, b) => b.share - a.share);
  // Merge near neighbours so one brand colour is not split across buckets.
  const merged = [];
  for (const c0 of all) {
    const near = merged.find((m) => Math.hypot(m.rgb[0] - c0.rgb[0], m.rgb[1] - c0.rgb[1], m.rgb[2] - c0.rgb[2]) < 28);
    if (near) { const t = near.share + c0.share; near.rgb = near.rgb.map((v, i) => (v * near.share + c0.rgb[i] * c0.share) / t); near.share = t; } else merged.push({ ...c0 });
  }
  return { width: img.naturalWidth, height: img.naturalHeight, colours: merged.sort((a, b) => b.share - a.share).slice(0, 10) };
}

const browser = await chromium.launch();
const result = { slug, date: new Date().toISOString(), measuredAgainst: { surface: SURFACE, text: TEXT }, site: null, screens: null, notes: [] };
const fmt = (c) => ({ hex: hex(c.rgb), share: c.share, where: c.where, ...uses(c.rgb.map(Math.round)) });

try {
  if (SITE) {
    const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
    const res = await page.goto(SITE, { waitUntil: 'networkidle', timeout: 60000 });
    if (!res || res.status() >= 400) throw new Error(`the site returned ${res ? res.status() : 'no response'}`);
    await page.evaluate(() => document.fonts.ready);
    const s = await page.evaluate(readSite);
    const textChars = s.fonts.reduce((a, f) => a + f.chars, 0) || 1;
    result.site = {
      address: SITE, title: s.title, stylesheets: s.stylesheets, unreadableStylesheets: s.unreadableStylesheets,
      tokens: s.tokens.map((t) => ({ name: t.name, declared: t.declared, hex: hex(t.rgb), chroma: chroma(t.rgb), ...uses(t.rgb) })),
      backgrounds: s.backgrounds.map(fmt), text: s.text.map(fmt), actions: s.actions.map(fmt), borders: s.borders.map(fmt),
      fonts: s.fonts.map((f) => ({ ...f, shareOfText: Math.round((f.chars / textChars) * 1000) / 10 })),
      loadedFontFaces: s.loadedFontFaces, radii: s.radii, shadows: s.shadows,
    };
    if (s.unreadableStylesheets) result.notes.push(`${s.unreadableStylesheets} stylesheet(s) are served from another origin without permission to read their rules, so their custom properties are not listed. The colours and fonts the browser applied are still measured.`);
    await page.close();
  }

  if (SCREENS.length) {
    const page = await browser.newPage();
    const files = []; const pool = new Map();
    for (const url of SCREENS) {
      try {
        const r = await fetch(url);
        if (!r.ok) throw new Error(`status ${r.status}`);
        const type = r.headers.get('content-type') || 'image/png';
        const data = `data:${type};base64,${Buffer.from(await r.arrayBuffer()).toString('base64')}`;
        const px = await page.evaluate(readPixels, data);
        const brand = px.colours.filter((c) => chroma(c.rgb) >= 40);
        files.push({ file: decodeURIComponent(url.split('/').pop()), width: px.width, height: px.height, dominant: px.colours.slice(0, 5).map((c) => ({ hex: hex(c.rgb), share: Math.round(c.share * 1000) / 10 })), brand: brand.slice(0, 4).map((c) => ({ hex: hex(c.rgb), share: Math.round(c.share * 1000) / 10 })) });
        for (const c of brand) {
          const k = c.rgb.map((v) => Math.round(v / 24)).join(',');
          const e = pool.get(k) || { rgb: c.rgb, share: 0, files: 0 };
          e.share += c.share; e.files++; pool.set(k, e);
        }
      } catch (e) { files.push({ file: decodeURIComponent(url.split('/').pop()), error: `not read: ${e.message}` }); }
    }
    result.screens = {
      read: files.filter((f) => !f.error).length, notRead: files.filter((f) => f.error).length, files,
      palette: Array.from(pool.values()).sort((a, b) => b.files - a.files || b.share - a.share).slice(0, 8).map((e) => ({ hex: hex(e.rgb), inFiles: e.files, meanShare: Math.round((e.share / e.files) * 1000) / 10, ...uses(e.rgb.map(Math.round)) })),
    };
    if (result.screens.notRead) result.notes.push(`${result.screens.notRead} screen(s) could not be read and are not part of the palette.`);
    await page.close();
  }
} catch (e) {
  await browser.close();
  console.error(`Brand read failed: ${e.message}. Nothing was recorded; no colour or font may be used from this run.`);
  process.exit(2);
}
await browser.close();

mkdirSync(OUT, { recursive: true });
const file = join(OUT, `${slug}.brand.json`);
writeFileSync(file, JSON.stringify(result, null, 1) + '\n');

const row = (c) => `| ${c.hex} | ${c.share ?? c.meanShare ?? ''} | ${c.onSurface} | ${c.asAccent ? 'yes' : 'no'} | ${c.asText ? 'yes' : 'no'} | ${c.asGroundForBodyText ? 'body text' : c.asGroundForLargeText ? 'large text only' : 'no text'} | ${(c.where || []).join(', ') || (c.inFiles ? `${c.inFiles} screens` : c.name || '')} |`;
const head = '| Colour | Share % | Contrast on this site | As accent (3:1) | As text (4.5:1) | As a ground, may carry | Read from |\n|---|---|---|---|---|---|---|';
const out = [`# Brand read: ${slug}`, '', `${result.date}. Contrast measured against this site's surface ${SURFACE} and text ${TEXT}.`, ''];
if (result.site) {
  const s = result.site;
  const named = s.tokens.filter((t) => t.chroma >= 40).slice(0, 12);
  out.push(`## From the live stylesheet: ${s.address}`, '');
  if (named.length) out.push('Colour tokens the client declares:', '', head, ...named.map((t) => row({ ...t, where: [t.name] })), '');
  out.push('Colours on actions and links:', '', head, ...s.actions.map(row), '', 'Colours covering the most area:', '', head, ...s.backgrounds.map(row), '', 'Text colours:', '', head, ...s.text.map(row), '');
  out.push('Fonts:', '', '| Family | Share of text % | Used for | Weights | Sizes (px) |', '|---|---|---|---|---|', ...s.fonts.map((f) => `| ${f.family} | ${f.shareOfText} | ${f.roles.join(', ')} | ${f.weights.join(', ')} | ${f.sizes.join(', ')} |`), '');
  out.push(`Corner radii: ${s.radii.map((r) => `${r.value} (${r.count})`).join(', ') || 'none read'}.`, `Shadows: ${s.shadows.map((r) => `${r.value} (${r.count})`).join('; ') || 'none read'}.`, '');
}
if (result.screens) {
  out.push(`## From the pixels of ${result.screens.read} screens`, '', head, ...result.screens.palette.map(row), '');
}
if (result.notes.length) out.push('Notes:', ...result.notes.map((n) => `- ${n}`), '');
out.push(`Saved: ${file}`);
console.log(out.join('\n'));
