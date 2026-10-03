#!/usr/bin/env node
/**
 * Asset usage scan — answers "is this media actually used, and by what?"
 *
 *   node scripts/scan-asset-usage.mjs           read-only report (default)
 *   WRITE=1 node scripts/scan-asset-usage.mjs   also store usedBy on assets
 *
 * Token: SANITY_TOKEN / SANITY_API_TOKEN, from the environment or .env.
 *
 * Two sources of usage, because content alone gives a dangerously wrong answer:
 *
 *  1. Sanity content. Every published document of every content type is
 *     deep-walked, and ANY string value that resolves to an asset path counts,
 *     wherever it sits: coverPath, logoPath, galleryPaths[3], items[0].imagePath,
 *     a portable-text media block. Matching is by VALUE, not field name, so a
 *     field added next month is covered without touching this script. (A
 *     name-based list of six fields missed logoPath, iconPath and ogImagePath —
 *     every client logo would have read as unused.)
 *
 *  2. The site code. /assets/ literals in src/ and CSS url(), plus the two
 *     places that BUILD paths instead of writing them out:
 *       - src/lib/service-media.ts: { dir, file } → <dir>/<file>.mp4 and
 *         <dir>/posters/<file>.webp (mirrors serviceMediaFor()).
 *       - src/pages/services/index.astro: resolveWork()'s last-resort
 *         /assets/work/<folder>/<key>-thumb.mp4 fallback for gallery keys.
 *     A text scan finds none of the service media — no /assets/ prefix, no
 *     extension — so without this every service video reads as unused.
 *
 * When unsure it marks an asset USED. A wrong "used" means a file is not
 * flagged for cleanup; a wrong "unused" gets live media archived.
 *
 * Writes (WRITE=1) set only usedBy + usedByCount, and only on assets whose
 * usage changed — never alt / group / status, and no _updatedAt churn on the
 * rest. The scan time is stored once, on syncStatus `asset-usage-scan`, so an
 * asset added after the last scan reads as "not scanned", never as "unused".
 */
import { createClient } from '@sanity/client';
import { createHash } from 'node:crypto';
import { existsSync, readFileSync, promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const WRITE = process.env.WRITE === '1';
const REPORT_PATH = path.join(ROOT, 'docs', 'asset-usage-report.json');

// ── Client ──────────────────────────────────────────────────────────────────
function loadDotEnv() {
  const file = path.join(ROOT, '.env');
  if (!existsSync(file)) return {};
  return Object.fromEntries(
    readFileSync(file, 'utf8')
      .split('\n')
      .filter((l) => l.includes('=') && !l.trim().startsWith('#'))
      .map((l) => {
        const i = l.indexOf('=');
        return [l.slice(0, i).trim(), l.slice(i + 1).trim().replace(/^["']|["']$/g, '')];
      }),
  );
}
const env = { ...loadDotEnv(), ...process.env };
const token = env.SANITY_TOKEN || env.SANITY_API_TOKEN;
if (!token) {
  console.error('Missing SANITY_TOKEN / SANITY_API_TOKEN');
  process.exit(1);
}
const client = createClient({
  projectId: env.SANITY_PROJECT_ID || 'splvhmk1',
  dataset: env.SANITY_DATASET || 'production',
  apiVersion: '2026-01-01',
  token,
  useCdn: false,
});

// ── Path normalisation ──────────────────────────────────────────────────────
const MEDIA_EXT = /\.(png|jpe?g|webp|avif|gif|svg|ico|mp4|webm|mov|m4v|mp3|wav|pdf|woff2?|ttf|otf)$/i;

/** Any string → asset relativePath key, or null. Handles /assets/x, assets/x,
 *  bare x, full R2/site URLs and %-encoding. */
function toRel(value) {
  if (typeof value !== 'string') return null;
  let v = value.trim();
  if (!v || v.length > 600) return null;
  const isUrl = /^https?:\/\//i.test(v);
  if (isUrl) {
    try { v = new URL(v).pathname; } catch { return null; }
  }
  v = v.split(/[?#]/)[0];
  try { v = decodeURIComponent(v); } catch { /* keep raw */ }
  const pointsIntoAssets = /^\/?assets\//.test(v);
  v = v.replace(/^\/+/, '').replace(/^assets\//, '');
  if (!v) return null;
  return { rel: v, isUrl, pointsIntoAssets };
}

// ── Load assets ─────────────────────────────────────────────────────────────
const assets = await client.fetch(
  `*[_type == "asset" && !(_id in path("drafts.**"))]{ _id, relativePath, sitePath, assetGroup, mediaType, usedBy, usedByCount }`,
);
const byRel = new Map();      // exact rel → [assetId]
const byRelLower = new Map(); // lowercased rel → rel (case-mismatch detection)
const pathless = [];
for (const a of assets) {
  const keys = new Set([toRel(a.relativePath)?.rel, toRel(a.sitePath)?.rel].filter(Boolean));
  if (!keys.size) pathless.push(a._id);
  for (const k of keys) {
    byRel.set(k, [...(byRel.get(k) ?? []), a._id]);
    byRelLower.set(k.toLowerCase(), k);
  }
}

// ── Usage bookkeeping ───────────────────────────────────────────────────────
const usage = new Map(); // assetId → Map(_key → entry)
const unmatched = [];
let hits = 0;

function add(assetId, u) {
  const _key = createHash('sha1')
    .update([u.kind, u.docId || u.label, u.field || ''].join('|'))
    .digest('hex')
    .slice(0, 12);
  if (!usage.has(assetId)) usage.set(assetId, new Map());
  usage.get(assetId).set(_key, { _key, _type: 'assetUsage', ...u });
}

/** Match one candidate string; record usage, or note a broken reference. */
function record(raw, u) {
  const r = toRel(raw);
  if (!r) return;
  const ids = byRel.get(r.rel);
  if (ids) {
    hits++;
    for (const id of ids) add(id, u);
    return;
  }
  // Only report strings that clearly point at our asset tree, so captions,
  // YouTube links and Sanity CDN images are not flagged as broken.
  if (!MEDIA_EXT.test(r.rel)) return;
  if (r.isUrl ? !r.pointsIntoAssets : !(r.pointsIntoAssets || r.rel.includes('/'))) return;
  // A bare path that resolves under public/ OUTSIDE the asset tree (e.g.
  // brandAsset `brand/logo-large.svg` → public/brand/) is a real file served
  // at /brand/…, not a missing asset.
  if (!r.pointsIntoAssets && existsSync(path.join(ROOT, 'public', r.rel))) return;
  const caseVariant = byRelLower.get(r.rel.toLowerCase());
  const onDisk = existsSync(path.join(ROOT, 'public', 'assets', r.rel));
  unmatched.push({
    reason: caseVariant ? 'case-mismatch' : onDisk ? 'unregistered' : 'missing',
    path: r.rel,
    kind: u.kind,
    topField: u.field ? u.field.split(/[.[]/)[0] : '',
    ...(caseVariant ? { assetHas: caseVariant } : {}),
    where: u.field ? `${u.label} · ${u.field}` : u.label,
  });
}

// ── Source 1: Sanity content ────────────────────────────────────────────────
const SKIP_TYPES = new Set(['asset', 'syncStatus', 'project']);
const types = (await client.fetch(`array::unique(*[!(_id in path("drafts.**"))]._type)`))
  .filter((t) => !SKIP_TYPES.has(t) && !t.startsWith('sanity.') && !t.startsWith('system.'))
  .sort();

function walk(node, trail, visit) {
  if (typeof node === 'string') return visit(node, trail);
  if (Array.isArray(node)) return node.forEach((n, i) => walk(n, `${trail}[${i}]`, visit));
  if (node && typeof node === 'object') {
    for (const [k, v] of Object.entries(node)) {
      if (k.startsWith('_')) continue; // _key, _type, _ref (a doc id, not a path)…
      walk(v, trail ? `${trail}.${k}` : k, visit);
    }
  }
}

let docCount = 0;
for (const type of types) {
  const docs = await client.fetch(`*[_type == $type && !(_id in path("drafts.**"))]`, { type });
  for (const doc of docs) {
    docCount++;
    const title = doc.title || doc.name || doc.client || doc.pageId || doc.slug?.current || doc._id;
    walk(doc, '', (value, field) =>
      record(value, { kind: 'content', label: `${type}: ${title}`, docId: doc._id, docType: type, field }),
    );
  }
}

// ── Source 2: site code ─────────────────────────────────────────────────────
const CODE_EXT = /\.(astro|ts|tsx|js|mjs|jsx|css)$/;
const NOT_THE_SITE = /\.(stories|test|spec)\.[a-z]+$/; // Storybook/tests never render on the site

async function filesUnder(dir) {
  const out = [];
  for (const e of await fs.readdir(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) out.push(...(await filesUnder(p)));
    else if (CODE_EXT.test(e.name) && !NOT_THE_SITE.test(e.name)) out.push(p);
  }
  return out;
}
const codeFiles = [
  ...(await filesUnder(path.join(ROOT, 'src'))),
  ...['public/sw.js', 'public/manifest.webmanifest'].map((f) => path.join(ROOT, f)).filter(existsSync),
];

const LITERAL = /["'`](\/?assets\/[^"'`\s]+?)["'`]/g;
const CSS_URL = /url\(\s*["']?(\/assets\/[^)"'\s]+)["']?\s*\)/g;
const MEDIA_REF = /\{\s*dir:\s*(['"])([^'"]+)\1\s*,\s*file:\s*(['"])([^'"]+)\3\s*(,\s*noPoster:\s*true)?/g;

let allCode = '';
let mediaRefsParsed = 0;
let mediaRefsExpected = 0;
let fallbackKeys = 0;

for (const file of codeFiles) {
  const text = await fs.readFile(file, 'utf8');
  const label = path.relative(ROOT, file);
  allCode += text + '\n';

  for (const m of text.matchAll(LITERAL)) {
    if (m[1].includes('${')) continue; // templated — handled explicitly below
    record(m[1], { kind: 'code', label, field: 'literal' });
  }
  for (const m of text.matchAll(CSS_URL)) record(m[1], { kind: 'code', label, field: 'css' });

  if (label === path.join('src', 'lib', 'service-media.ts')) {
    mediaRefsExpected = (text.match(/\bdir:\s*['"]/g) || []).length;
    for (const m of text.matchAll(MEDIA_REF)) {
      mediaRefsParsed++;
      const [dir, name, noPoster] = [m[2], m[4], Boolean(m[5])];
      record(`${dir}/${name}.mp4`, { kind: 'code', label, field: 'service-media' });
      if (!noPoster) record(`${dir}/posters/${name}.webp`, { kind: 'code', label, field: 'service-media' });
    }
  }

  // Mirrors resolveWork()'s fallback in this file, including its two special
  // cases. Over-marks on purpose: it only fires when a case study lacks
  // thumbnailPath/coverPath, and copying that fuzzy match here is fragile.
  if (label === path.join('src', 'pages', 'services', 'index.astro')) {
    const keys = new Set();
    for (const g of text.matchAll(/gallery:\s*\[([^\]]*)\]/g)) {
      for (const k of g[1].matchAll(/['"]([a-z0-9-]+)['"]/g)) keys.add(k[1]);
    }
    for (const key of keys) {
      fallbackKeys++;
      const folder = key === 'indusninja' ? 'indusind-bank' : key;
      const name = key === 'indusninja' ? 'indusninja-thumb.mp4'
        : key === 'airtel-xsafe' ? 'xsafe-thumb.mp4' : `${key}-thumb.mp4`;
      const rel = `work/${folder}/${name}`;
      // A fallback that never resolves is not a broken reference — skip unmatched.
      if (byRel.has(rel)) record(rel, { kind: 'code', label, field: 'gallery-fallback' });
    }
  }
}

// A broken reference only reaches a visitor if some code reads that field.
// Orphan fields left by old imports (aboutVideoPath, thumbnailVideoPath…)
// appear nowhere in src/, so their dead paths 404 for nobody. Heuristic:
// a generic field name (`path`, `url`) can read as rendered when it isn't.
const renderedCache = new Map();
const isRendered = (field) => {
  if (!field) return true;
  if (!renderedCache.has(field)) renderedCache.set(field, new RegExp(`\\b${field}\\b`).test(allCode));
  return renderedCache.get(field);
};
for (const u of unmatched) {
  u.rendered = u.kind === 'code' || isRendered(u.topField);
  delete u.kind;
  delete u.topField;
}

// ── Results ─────────────────────────────────────────────────────────────────
const entriesFor = (id) => [...(usage.get(id)?.values() ?? [])].sort((a, b) => a._key.localeCompare(b._key));
const used = assets.filter((a) => usage.has(a._id));
const unused = assets.filter((a) => !usage.has(a._id));
const sources = (id) => new Set(entriesFor(id).map((e) => e.kind));
const contentOnly = used.filter((a) => { const s = sources(a._id); return s.has('content') && !s.has('code'); }).length;
const codeOnly = used.filter((a) => { const s = sources(a._id); return s.has('code') && !s.has('content'); }).length;
const both = used.length - contentOnly - codeOnly;

const tally = (list, key) =>
  Object.fromEntries(
    Object.entries(list.reduce((acc, a) => ((acc[a[key] || '—'] = (acc[a[key] || '—'] || 0) + 1), acc), {}))
      .sort((x, y) => y[1] - x[1]),
  );
const brokenByReason = unmatched.reduce((acc, u) => ((acc[u.reason] = (acc[u.reason] || 0) + 1), acc), {});
const visible = unmatched.filter((u) => u.reason !== 'unregistered' && u.rendered).length;
const sharedPaths = [...byRel.values()].filter((ids) => ids.length > 1).length;

const report = {
  generatedAt: new Date().toISOString(),
  scanned: { contentTypes: types, contentDocs: docCount, codeFiles: codeFiles.length },
  assets: { total: assets.length, used: used.length, unused: unused.length, pathless: pathless.length, sharingAPath: sharedPaths },
  usedBy: { contentOnly, codeOnly, both },
  unusedByGroup: tally(unused, 'assetGroup'),
  unusedByMediaType: tally(unused, 'mediaType'),
  brokenReferences: { ...brokenByReason, total: unmatched.length, visibleToVisitors: visible },
  checks: {
    serviceMediaRefs: `${mediaRefsParsed} parsed of ${mediaRefsExpected} dir: entries`,
    galleryFallbackKeys: fallbackKeys,
  },
  unused: unused.map((a) => a.relativePath || a._id).sort(),
  broken: unmatched.sort((a, b) => a.reason.localeCompare(b.reason) || a.path.localeCompare(b.path)),
};

console.log(`\nAsset usage scan — ${WRITE ? 'WRITE' : 'read-only'}`);
console.log(`  scanned   ${docCount} docs across ${types.length} content types · ${codeFiles.length} code files`);
console.log(`  assets    ${assets.length} total · ${used.length} used · ${unused.length} unused · ${pathless.length} with no usable path`);
console.log(`  used by   content only ${contentOnly} · code only ${codeOnly} · both ${both}`);
console.log(`  unused    ${JSON.stringify(report.unusedByGroup)}`);
console.log(`  broken    ${JSON.stringify(report.brokenReferences)}`);
console.log(`  checks    service-media ${report.checks.serviceMediaRefs} · gallery keys ${fallbackKeys}`);
if (mediaRefsParsed !== mediaRefsExpected) {
  console.warn(`  ⚠ service-media parse mismatch — the { dir, file } shape changed; usage for those clips is incomplete`);
}

await fs.writeFile(REPORT_PATH, JSON.stringify(report, null, 2) + '\n');
console.log(`  report    ${path.relative(ROOT, REPORT_PATH)}`);

// ── Write ───────────────────────────────────────────────────────────────────
if (WRITE) {
  const sig = (list) => JSON.stringify((list ?? []).map(({ _key, label, field }) => [_key, label, field]));
  const changed = assets.filter((a) => {
    const next = entriesFor(a._id);
    return sig(a.usedBy) !== sig(next) || a.usedByCount !== next.length;
  });

  for (let i = 0; i < changed.length; i += 100) {
    const tx = client.transaction();
    for (const a of changed.slice(i, i + 100)) {
      const next = entriesFor(a._id);
      tx.patch(a._id, { set: { usedBy: next, usedByCount: next.length } });
    }
    await tx.commit({ visibility: 'async' });
  }

  // Pure bookkeeping, fully script-owned — a replace is correct here.
  await client.createOrReplace({
    _id: 'asset-usage-scan',
    _type: 'syncStatus',
    source: 'sanity content + site code',
    target: 'asset.usedBy',
    // 'error' only when a visitor can hit a dead reference. Unregistered media
    // (a real file with no asset doc yet) is a to-do the registry sync clears.
    status: visible ? 'error' : unmatched.length ? 'pending' : 'synced',
    entityType: 'asset',
    entityCount: assets.length,
    lastSyncedAt: report.generatedAt,
    notes: `${used.length} used · ${unused.length} unused · ${unmatched.length} broken references`,
    ...(unmatched.length ? { errorMessage: `${unmatched.length} references have no asset doc (${visible} reach visitors) — see docs/asset-usage-report.json` } : {}),
  });
  console.log(`  wrote     ${changed.length} assets changed (${assets.length - changed.length} untouched) · syncStatus asset-usage-scan`);
}
