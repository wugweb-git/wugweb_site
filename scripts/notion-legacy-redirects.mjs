#!/usr/bin/env node
/**
 * Redirects from Notion: Case Studies → "Legacy Slugs" (the source of truth
 * for old case-study URLs). Each legacy slug on a Published row becomes a
 * 301 `redirect` doc: /work/<legacy> → /work/<Slug>.
 *
 * Skipped: Draft rows, empty / "None" values, a legacy slug equal to the
 * current slug, sources that already have a redirect doc, sources that are a
 * live page (200 — a redirect doc would never fire there), and rows whose
 * destination does not return 200. An existing redirect doc for a legacy slug
 * whose destination differs from Notion (e.g. after a slug change) is
 * repointed to the Notion destination, so old URLs never take two hops.
 * Framer-era docs (redirect-framer-*) do not count as existing: Notion
 * supersedes them, so a Notion doc is created alongside and the Framer doc is
 * listed for deletion once the Notion one is verified (owner decision 2026-10-13).
 * Sources are matched decoded, so "india’s" and "india%E2%80%99s" are the same. Validation mirrors
 * sanity/schemaTypes/redirect.ts. Dry run by default; WRITE=1 applies (backup
 * first, deterministic ids + createIfNotExists, so re-runs are no-ops).
 * Checks run against https://wugweb.pages.dev, one request at a time.
 */
import { readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { createHash } from 'node:crypto';
import { createClient } from '@sanity/client';

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const WRITE = process.env.WRITE === '1';
const SITE = 'https://wugweb.pages.dev';
const DATA_SOURCE = '3a3bb710-b9ab-80d6-b520-000bfeabe514'; // Notion: Case Studies
const env = Object.fromEntries(readFileSync(path.join(ROOT, '.env'), 'utf8').split('\n').filter((l) => /^[A-Z_]+=/.test(l)).map((l) => { const i = l.indexOf('='); return [l.slice(0, i), l.slice(i + 1).trim().replace(/^["']|["']$/g, '')]; }));
const NH = { Authorization: 'Bearer ' + env.NOTION_TOKEN, 'Notion-Version': '2025-09-03', 'Content-Type': 'application/json' };
const sanity = createClient({ projectId: 'splvhmk1', dataset: 'production', apiVersion: '2026-01-01', token: env.SANITY_TOKEN || env.SANITY_API_TOKEN, useCdn: false });
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// Same as sanity/schemaTypes/redirect.ts.
const norm = (v) => {
  let p = String(v ?? '').trim().split(/[?#]/)[0];
  try { p = decodeURI(p); } catch { /* keep as given */ }
  p = p.toLowerCase();
  if (!p.startsWith('/')) p = `/${p}`;
  p = p.replace(/\/{2,}/g, '/');
  return p.length > 1 ? p.replace(/\/+$/, '') : p;
};
const text = (p) => !p ? '' : p.type === 'select' ? (p.select?.name || '') : (p[p.type] || []).map?.((t) => t.plain_text).join('') ?? '';

// 1. Notion rows
const rows = [];
let cursor;
do {
  const r = await fetch(`https://api.notion.com/v1/data_sources/${DATA_SOURCE}/query`, { method: 'POST', headers: NH, body: JSON.stringify({ page_size: 100, start_cursor: cursor }) });
  const j = await r.json();
  if (!r.ok) throw new Error(`Notion ${r.status}: ${j.message}`);
  for (const p of j.results) rows.push({ notionId: p.id, slug: text(p.properties['Slug']).trim(), legacy: text(p.properties['Legacy Slugs']), status: text(p.properties['Status']) });
  cursor = j.has_more ? j.next_cursor : undefined;
} while (cursor);

// 2. Candidate pairs
const pairs = [];
for (const r of rows) {
  if (r.status !== 'Published' || !r.slug) continue;
  for (let s of r.legacy.split(/[,\n]/)) {
    s = s.trim().replace(/^\/?work\//i, '').replace(/^\/+|\/+$/g, '');
    if (!s || s.toLowerCase() === 'none' || s === r.slug || /[?#*]/.test(s)) continue;
    pairs.push({ source: `/work/${s}`, destination: `/work/${r.slug}`, notionId: r.notionId });
  }
}
const seen = new Set();
const unique = pairs.filter((p) => !seen.has(norm(p.source)) && seen.add(norm(p.source)));

// 3. Existing redirect docs
const existing = await sanity.fetch(`*[_type == "redirect"]{ _id, source, destination }`);
const isFramer = (d) => d._id.startsWith('redirect-framer-');
const existingBySource = new Map(existing.filter((d) => !isFramer(d)).map((d) => [norm(d.source), d]));
const framerBySource = new Map(existing.filter(isFramer).map((d) => [norm(d.source), d]));

// 4. Check each against the live site
const plan = [];
const repoint = [];
const skipped = [];
const destStatus = new Map();
for (const p of unique) {
  const ex = existingBySource.get(norm(p.source));
  if (ex) {
    if (norm(ex.destination) === norm(p.destination)) { skipped.push({ ...p, why: 'redirect doc exists' }); continue; }
    if (!destStatus.has(p.destination)) {
      destStatus.set(p.destination, (await fetch(SITE + p.destination, { redirect: 'manual', headers: { 'user-agent': 'wugweb-redirect-check' } })).status);
      await sleep(300);
    }
    if (destStatus.get(p.destination) !== 200) { skipped.push({ ...p, why: `repoint skipped: destination ${destStatus.get(p.destination)}` }); continue; }
    repoint.push({ _id: ex._id, source: ex.source, from: ex.destination, destination: p.destination });
    continue;
  }
  const res = await fetch(SITE + encodeURI(norm(p.source)), { redirect: 'manual', headers: { 'user-agent': 'wugweb-redirect-check' } });
  await sleep(300);
  const loc = res.headers.get('location') || '';
  if (res.status === 200) { skipped.push({ ...p, why: 'live page (200)' }); continue; }
  if (!destStatus.has(p.destination)) {
    destStatus.set(p.destination, (await fetch(SITE + p.destination, { redirect: 'manual', headers: { 'user-agent': 'wugweb-redirect-check' } })).status);
    await sleep(300);
  }
  if (destStatus.get(p.destination) !== 200) { skipped.push({ ...p, why: `destination ${destStatus.get(p.destination)}` }); continue; }
  const now = res.status === 301 || res.status === 308 ? `already ${res.status} → ${new URL(loc, SITE).pathname} (code)` : `${res.status}${loc ? ' → ' + new URL(loc, SITE).pathname : ''}`;
  plan.push({
    _id: `redirect-notion-${createHash('sha1').update(norm(p.source)).digest('hex').slice(0, 12)}`,
    _type: 'redirect',
    source: p.source,
    destination: p.destination,
    statusCode: 301,
    enabled: true,
    note: `Notion Case Studies → Legacy Slugs (${p.notionId})`,
    _now: now,
  });
}

console.log(`Notion rows ${rows.length}, legacy pairs ${unique.length}; create ${plan.length}, repoint ${repoint.length}, skip ${skipped.length}\n`);
for (const d of plan) console.log(`CREATE  ${d.source} → ${d.destination}   [now: ${d._now}]`);
for (const d of repoint) console.log(`REPOINT ${d.source}: ${d.from} → ${d.destination}`);
for (const s of skipped) console.log(`skip    ${s.source} → ${s.destination}   (${s.why})`);
const superseded = plan.map((d) => framerBySource.get(norm(d.source))).filter(Boolean);
for (const d of superseded) console.log(`FRAMER  ${d._id} ${d.source} is superseded — delete it once the Notion redirect is verified`);
if (!WRITE) { console.log('\nDry run. WRITE=1 to create.'); process.exit(0); }
if (!plan.length && !repoint.length) { console.log('\nNothing to change.'); process.exit(0); }

const backup = path.join(ROOT, 'backups', `notion-legacy-redirects-${new Date().toISOString().slice(0, 10)}.json`);
writeFileSync(backup, JSON.stringify({ takenAt: new Date().toISOString(), existingBefore: existing, toCreate: plan, toRepoint: repoint, skipped }, null, 2));
console.log(`\nbackup → ${path.relative(ROOT, backup)}`);
const tx = sanity.transaction();
for (const { _now, ...d } of plan) tx.createIfNotExists(d);
for (const d of repoint) tx.patch(d._id, (q) => q.set({ destination: d.destination }));
const res = await tx.commit();
console.log(`committed ${res.results.length} mutation(s), transaction ${res.transactionId}`);
