#!/usr/bin/env node
/**
 * Notion → Sanity: the Sectors showcase fields.
 *
 *   node scripts/sync-notion-sectors.mjs           dry run (default): prints the plan
 *   WRITE=1 node scripts/sync-notion-sectors.mjs   backs up the docs it touches, then patches
 *
 * Notion is the source (owner decision). Reads:
 *   Table 25: Sector   — "Show in Sectors Section" (checkbox), "Sectors Section Order" (number),
 *                        "Icon" (Lucide icon name, e.g. "landmark")
 *   Table 3: Industry  — "Show on Sector Card" (checkbox)
 * and patches the matching Sanity docs, found by each row's "Sanity ID" formula:
 *   sector-SEC-n:   showcase, showcaseOrder, icon
 *   industry-IND-n: showOnSectorCard
 *
 * Only patches docs that already exist. Never creates, never deletes, never
 * touches any other field. An icon value that isn't a Lucide icon name (a URL,
 * a typo, an empty cell) is reported and NOT written, so it can never replace
 * a working icon already in Sanity.
 */
import { createClient } from '@sanity/client';
import { existsSync, readFileSync, readdirSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const WRITE = process.env.WRITE === '1';
const env = Object.fromEntries(readFileSync(path.join(ROOT, '.env'), 'utf8').split('\n').filter((l) => /^[A-Z_]+=/.test(l)).map((l) => { const i = l.indexOf('='); return [l.slice(0, i), l.slice(i + 1).trim().replace(/^["']|["']$/g, '')]; }));
const SECTORS = 'e3ebb710-b9ab-827a-aab2-87f21948e6be';    // Table 25: Sector
const INDUSTRIES = '33cbb710-b9ab-80d8-bdb9-000bb4671570'; // Table 3: Industry
const F = { show: 'Show in Sectors Section', order: 'Sectors Section Order', icon: 'Icon', card: 'Show on Sector Card' };
const NH = { Authorization: 'Bearer ' + env.NOTION_TOKEN, 'Notion-Version': '2025-09-03', 'Content-Type': 'application/json' };
const sanity = createClient({ projectId: 'splvhmk1', dataset: 'production', apiVersion: '2026-01-01', token: env.SANITY_TOKEN || env.SANITY_API_TOKEN, useCdn: false });

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
async function notion(url, opt = {}) {
  for (let t = 0; t < 6; t++) {
    const r = await fetch(url, { headers: NH, ...opt });
    if (r.status === 429 || r.status >= 500) { await sleep(1500 * (t + 1)); continue; }
    const j = await r.json();
    if (j.object === 'error') throw new Error(`${url}: ${j.message}`);
    return j;
  }
  throw new Error(`${url}: retries exhausted`);
}
async function rows(ds) {
  const out = []; let c;
  do {
    const j = await notion(`https://api.notion.com/v1/data_sources/${ds}/query`, { method: 'POST', body: JSON.stringify({ page_size: 100, ...(c ? { start_cursor: c } : {}) }) });
    out.push(...j.results); c = j.has_more ? j.next_cursor : null;
  } while (c);
  return out;
}
const text = (p) => (p?.rich_text || p?.title || []).map((r) => r.plain_text).join('').trim();
/** Any Notion property → plain value. undefined when the property doesn't exist. */
function val(props, name) {
  const p = props[name];
  if (!p) return undefined;
  switch (p.type) {
    case 'checkbox': return p.checkbox;
    case 'number': return p.number;
    case 'select': return p.select?.name ?? null;
    case 'url': return p.url;
    case 'formula': return p.formula?.string ?? p.formula?.number ?? p.formula?.boolean ?? null;
    case 'title': case 'rich_text': return text(p) || null;
    default: return null;
  }
}
const LUCIDE = new Set(readdirSync(path.join(ROOT, 'node_modules/lucide-static/icons')).map((f) => f.replace(/\.svg$/, '')));
const iconName = (v) => (typeof v === 'string' && v.trim() ? v.trim().toLowerCase() : null);

// ---- Read ----------------------------------------------------------------------------------
const [secRows, indRows] = await Promise.all([rows(SECTORS), rows(INDUSTRIES)]);
const missing = [];
const has = (r, f) => r.some((x) => x.properties[f] !== undefined);
if (!has(secRows, F.show)) missing.push(`Table 25 "${F.show}"`);
if (!has(secRows, F.order)) missing.push(`Table 25 "${F.order}"`);
if (!has(indRows, F.card)) missing.push(`Table 3 "${F.card}"`);
const iconType = secRows[0]?.properties[F.icon]?.type;

const ids = [...secRows, ...indRows].map((r) => val(r.properties, 'Sanity ID')).filter(Boolean);
const docs = await sanity.fetch(`*[_id in $ids]{_id, _type, name, showcase, showcaseOrder, icon, showOnSectorCard, sectorRef}`, { ids });
const byId = new Map(docs.map((d) => [d._id, d]));

// ---- Plan ----------------------------------------------------------------------------------
const patches = []; const notFound = [];
const sectorPlan = secRows.map((r) => {
  const id = val(r.properties, 'Sanity ID'); const name = val(r.properties, 'Name (Title)') || text(Object.values(r.properties).find((p) => p.type === 'title'));
  const want = { showcase: val(r.properties, F.show) === true, showcaseOrder: val(r.properties, F.order) ?? null, icon: iconName(val(r.properties, F.icon)) };
  const doc = byId.get(id);
  if (!doc) { notFound.push(`${id || '(no Sanity ID)'} ${name}`); return null; }
  const iconOk = !!want.icon && LUCIDE.has(want.icon);
  const set = {}; const unset = [];
  for (const [k, v] of Object.entries(want)) {
    if (k === 'icon' && !iconOk) continue; // never write or unset a non-Lucide icon
    const cur = doc[k] ?? (k === 'showcase' ? false : null);
    if (v === cur || (v === false && cur === false)) continue;
    if (v === null) { if (doc[k] != null) unset.push(k); } else set[k] = v;
  }
  if (Object.keys(set).length || unset.length) patches.push({ id, set, unset });
  return { id, name, ...want, iconOk, changed: Object.keys(set).length + unset.length };
}).filter(Boolean);

const cardBySector = {};
for (const r of indRows) {
  const id = val(r.properties, 'Sanity ID'); const doc = byId.get(id);
  const name = text(Object.values(r.properties).find((p) => p.type === 'title'));
  const want = val(r.properties, F.card) === true;
  if (!doc) { notFound.push(`${id || '(no Sanity ID)'} ${name}`); continue; }
  if (want !== (doc.showOnSectorCard === true)) patches.push({ id, set: { showOnSectorCard: want }, unset: [] });
  if (want && doc.sectorRef?._ref) (cardBySector[doc.sectorRef._ref] ||= []).push(doc.name || name);
}

// ---- Report --------------------------------------------------------------------------------
console.log(`Notion: ${secRows.length} sectors, ${indRows.length} industries · Icon field type: ${iconType ?? 'missing'}`);
if (missing.length) console.log(`⚠ Notion fields not found yet: ${missing.join(', ')} — treated as unticked/empty.`);
const show = sectorPlan.filter((s) => s.showcase).sort((a, b) => (a.showcaseOrder ?? 999) - (b.showcaseOrder ?? 999));
console.log(`\nSectors section (${show.length} ticked):`);
console.table(show.length ? show.map((s) => ({ order: s.showcaseOrder ?? '—', sector: s.name, icon: s.icon ?? '—', 'icon ok': s.iconOk ? 'yes' : 'NO', 'card industries': (cardBySector[s.id] || []).join(' · ') || '—' })) : [{ order: '—', sector: '—', icon: '—', 'icon ok': '—', 'card industries': '—' }]);
const badIcons = sectorPlan.filter((s) => !s.iconOk);
if (badIcons.length) console.log(`⚠ Not a Lucide icon name, skipped (Sanity icon kept): ${badIcons.map((s) => `${s.name} ("${s.icon ?? ''}")`).join(', ')}`);
const over = show.filter((s) => (cardBySector[s.id] || []).length > 2);
if (over.length) console.log(`ℹ More than 2 industries ticked (site shows the first 2 by order): ${over.map((s) => s.name).join(', ')}`);
if (show.length && (show.length < 6 || show.length > 8)) console.log(`ℹ ${show.length} sectors ticked; the section is designed for 6–8.`);
if (notFound.length) console.log(`⚠ No matching Sanity doc (skipped): ${notFound.join(', ')}`);
console.log(`\nPatches: ${patches.length} (${patches.filter((p) => p.id.startsWith('sector-')).length} sectors, ${patches.filter((p) => p.id.startsWith('industry-')).length} industries)`);
for (const p of patches.slice(0, 40)) console.log(`  ${p.id}: ${JSON.stringify(p.set)}${p.unset.length ? ' unset ' + p.unset.join(',') : ''}`);
if (patches.length > 40) console.log(`  … ${patches.length - 40} more`);

if (!WRITE) { console.log('\nDry run — nothing written. WRITE=1 to apply.'); process.exit(0); }
if (!patches.length) { console.log('Nothing to write.'); process.exit(0); }

// ---- Write ---------------------------------------------------------------------------------
const stamp = new Date().toISOString().replace(/[:.]/g, '-');
const backup = path.join(ROOT, `backups/sanity-pre-sector-showcase-${stamp}.json`);
const full = await sanity.fetch('*[_id in $ids]', { ids: patches.map((p) => p.id) });
if (!existsSync(path.dirname(backup))) throw new Error('backups/ missing');
writeFileSync(backup, JSON.stringify(full, null, 1));
console.log(`Backup: ${path.relative(ROOT, backup)} (${full.length} docs)`);
const tx = sanity.transaction();
for (const p of patches) tx.patch(p.id, (q) => { let x = q; if (Object.keys(p.set).length) x = x.set(p.set); if (p.unset.length) x = x.unset(p.unset); return x; });
const res = await tx.commit();
console.log(`Written: ${res.results.length} docs (transaction ${res.transactionId})`);
