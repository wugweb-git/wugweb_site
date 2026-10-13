#!/usr/bin/env node
/**
 * Recycles the retired Framer service pages' metadata onto the pillar pages
 * (owner, 2026-10-13). The Framer URLs now 404; their title, description and
 * og:image move to the pillar that already carries that service's title:
 *   brand ← brand-strategy · experience ← experience-design · growth ← martech-genai
 *   engineering ← web-app-development · operations ← qa-testing
 * (no-code-solutions and lead-generation have no pillar of their own; strategy
 * had no Framer service page.)
 *
 * For each pillar:
 *   R2:     Framer og:image → assets/site/services/<pillar>/og.jpg (never overwrites;
 *           an existing key is reused only if it is byte-identical)
 *   Sanity: asset registry doc for that key; service seoTitle, seoDescription, ogImagePath
 * Dry run by default; WRITE=1 applies (Sanity docs backed up first, ifRevisionId).
 * Free tier: 5 small R2 PUTs (Class A), a handful of reads.
 */
import { readFileSync, writeFileSync, mkdtempSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { createClient } from '@sanity/client';

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const WRITE = process.env.WRITE === '1';
const R2 = 'https://pub-39ad1d03baec440faf48303be95c3782.r2.dev';
const BUCKET = 'wugweb-assets';
const MAP = { brand: 'brand-strategy', experience: 'experience-design', growth: 'martech-genai', engineering: 'web-app-development', operations: 'qa-testing' };
const env = Object.fromEntries(readFileSync(path.join(ROOT, '.env'), 'utf8').split('\n').filter((l) => /^[A-Z_]+=/.test(l)).map((l) => { const i = l.indexOf('='); return [l.slice(0, i), l.slice(i + 1).trim().replace(/^["']|["']$/g, '')]; }));
const sanity = createClient({ projectId: 'splvhmk1', dataset: 'production', apiVersion: '2026-01-01', token: env.SANITY_TOKEN || env.SANITY_API_TOKEN, useCdn: false });
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const dec = (v) => (v || '').replace(/&amp;/g, '&').replace(/&#x27;|&#39;/g, "'").replace(/&quot;/g, '"').trim();
const sha = (b) => createHash('sha1').update(b).digest('hex');
const tmp = mkdtempSync(path.join(tmpdir(), 'framer-og-'));

const plan = [];
for (const [pillar, framerSlug] of Object.entries(MAP)) {
  const res = await fetch(`https://www.wugweb.com/services/${framerSlug}`, { headers: { 'user-agent': 'wugweb-preflight (read-only)' } });
  const h = await res.text();
  await sleep(600);
  if (res.status !== 200 || !/<meta name="generator" content="Framer/.test(h)) throw new Error(`${framerSlug}: not a live Framer page`);
  const m = (re) => dec((h.match(re) || [])[1]);
  const f = { seoTitle: m(/<title>([^<]*)<\/title>/), seoDescription: m(/<meta name="description" content="([^"]*)"/), ogImage: m(/<meta property="og:image" content="([^"]*)"/) };
  for (const [k, v] of Object.entries(f)) if (!v) throw new Error(`${framerSlug}: Framer ${k} empty`);

  const img = Buffer.from(await (await fetch(f.ogImage)).arrayBuffer());
  const key = `assets/site/services/${pillar}/og.jpg`;
  const existing = await fetch(`${R2}/${key}`);
  let r2 = 'upload';
  if (existing.ok) {
    const same = sha(Buffer.from(await existing.arrayBuffer())) === sha(img);
    if (!same) throw new Error(`${key} already exists in R2 with different content — not overwriting`);
    r2 = 'exists (identical)';
  }
  const file = path.join(tmp, `${pillar}.jpg`);
  writeFileSync(file, img);
  plan.push({ pillar, framerSlug, f, key, file, bytes: img.length, sha1: sha(img), r2 });
}

const docs = await sanity.fetch(`*[_type == "service" && _id in $ids]{ _id, _rev, seoTitle, seoDescription, ogImagePath }`, { ids: Object.keys(MAP) });
for (const p of plan) {
  const d = docs.find((x) => x._id === p.pillar);
  if (!d) throw new Error(`service ${p.pillar} missing`);
  p.rev = d._rev;
  p.set = Object.fromEntries(Object.entries({ seoTitle: p.f.seoTitle, seoDescription: p.f.seoDescription, ogImagePath: `/${p.key}` }).filter(([k, v]) => (d[k] ?? '') !== v));
  p.before = { seoTitle: d.seoTitle ?? null, seoDescription: d.seoDescription ?? null, ogImagePath: d.ogImagePath ?? null };
}

console.log(`${WRITE ? 'WRITE' : 'DRY RUN'}\n`);
for (const p of plan) {
  console.log(`[${p.pillar}] ← /services/${p.framerSlug}\n  R2 ${p.key}: ${p.r2} (${Math.round(p.bytes / 1024)} KB)`);
  for (const [k, v] of Object.entries(p.set)) console.log(`  ${k}: "${p.before[k] ?? ''}"\n    → "${v}"`);
}
if (!WRITE) { console.log('\nDry run. WRITE=1 to apply.'); process.exit(0); }

const backup = path.join(ROOT, 'backups', `service-meta-before-framer-restore-${new Date().toISOString().slice(0, 10)}.json`);
writeFileSync(backup, JSON.stringify({ takenAt: new Date().toISOString(), services: docs, plan: plan.map(({ file, ...p }) => p) }, null, 2));
console.log(`\nbackup → ${path.relative(ROOT, backup)}`);

for (const p of plan) {
  if (p.r2 === 'upload') {
    execFileSync('npx', ['wrangler', 'r2', 'object', 'put', `${BUCKET}/${p.key}`, '--file', p.file, '--content-type', 'image/jpeg', '--remote'], { cwd: ROOT, stdio: 'pipe' });
    const back = await fetch(`${R2}/${p.key}`);
    const ok = back.ok && sha(Buffer.from(await back.arrayBuffer())) === p.sha1;
    if (!ok) throw new Error(`R2 verify failed for ${p.key}`);
    console.log(`R2 uploaded + verified: ${p.key}`);
  }
}

const rel = (k) => k.replace(/^assets\//, '');
const tx = sanity.transaction();
for (const p of plan) {
  const r = rel(p.key);
  const id = `asset-${r.replace(/[^a-z0-9]+/gi, '-').toLowerCase()}`;
  tx.createIfNotExists({
    _id: id, _type: 'asset', alt: '', assetGroup: 'More', displayName: `${p.pillar}-og.jpg`, extension: 'jpg', fileName: 'og.jpg',
    folder: `site/services/${p.pillar}`, linkedPageId: 'seo', localExists: false, mediaType: 'Image', mimeType: 'image/jpeg', name: `${p.pillar}-og.jpg`,
    publicUrl: `${R2}/${p.key}`, r2Key: p.key, r2Synced: true, relativePath: r, sitePath: `/${p.key}`,
    slug: { _type: 'slug', current: id.replace(/^asset-/, '') }, status: 'Active',
    description: `OG image recycled from the retired Framer page /services/${p.framerSlug}`,
  });
  if (Object.keys(p.set).length) tx.patch(p.pillar, (x) => x.ifRevisionId(p.rev).set(p.set));
}
const res = await tx.commit();
console.log(`Sanity: committed ${res.results.length} mutation(s)`);
