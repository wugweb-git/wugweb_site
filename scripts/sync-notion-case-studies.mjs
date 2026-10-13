#!/usr/bin/env node
/**
 * Notion Case Studies → Sanity caseStudy SEO sync (2026-10-13). Notion is the source of truth for
 * case-study SEO; this script never writes to Notion.
 *
 *   node scripts/sync-notion-case-studies.mjs           dry run: prints what would change
 *   WRITE=1 node scripts/sync-notion-case-studies.mjs   backs up the touched fields, then writes
 *
 * Matched docs (Notion "Sanity ID", else slug): sets title (what was built, no brand), shortTitle
 * (the brand), slug, seoTitle, seoDescription, focusKeyword and canonicalUrl. Empty Notion values
 * never clear Sanity. A slug change never recreates the doc (the _id stays). One slug per case
 * study: the old URL is not redirected (owner decision 2026-10-13). Store titles WITHOUT a site suffix —
 * BaseLayout adds " | Wugweb" when it fits in 60 characters.
 *
 * canonicalUrl is guarded: work/[slug].astro 301s whenever it differs from /work/<slug>, so a value
 * is written only when it is a site-relative /work/ path to a published case study (counting the
 * slugs this run sets). Anything else is listed under "canonical skipped" and left alone. A slug
 * already used by a different published doc is also skipped.
 */
import { createClient } from '@sanity/client';
import { readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const WRITE = process.env.WRITE === '1';
const env = Object.fromEntries(readFileSync(path.join(ROOT, '.env'), 'utf8').split('\n').filter((l) => /^[A-Z_]+=/.test(l)).map((l) => { const i = l.indexOf('='); return [l.slice(0, i), l.slice(i + 1).trim().replace(/^["']|["']$/g, '')]; }));
const DATA_SOURCE = '3a3bb710-b9ab-80d6-b520-000bfeabe514';
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
const plain = (p) => (p ? (p.title || p.rich_text || []).map((t) => t.plain_text).join('').trim() : '');

const rows = []; let cur;
do {
  const j = await notion(`https://api.notion.com/v1/data_sources/${DATA_SOURCE}/query`, { method: 'POST', body: JSON.stringify({ page_size: 100, ...(cur ? { start_cursor: cur } : {}) }) });
  for (const r of j.results) {
    const P = r.properties;
    rows.push({
      id: plain(P['Case Study ID']), slug: plain(P['Slug']).replace(/^\/?work\//, '').replace(/\/$/, ''), sanityId: plain(P['Sanity ID']),
      title: plain(P['Title']), shortTitle: plain(P['Short Title']),
      seoTitle: plain(P['SEO Title']), seoDescription: plain(P['SEO Description']),
      focusKeyword: plain(P['Focus Keyword']), canonicalUrl: plain(P['Canonical URL']),
    });
  }
  cur = j.has_more ? j.next_cursor : null;
} while (cur);

const docs = await sanity.fetch('*[_type == "caseStudy" && !(_id in path("drafts.**"))]{_id, "slug": slug.current, title, shortTitle, seoTitle, seoDescription, focusKeyword, canonicalUrl}');
const byId = new Map(docs.map((d) => [d._id, d]));
const bySlug = new Map(docs.map((d) => [d.slug, d]));
const FIELDS = ['title', 'shortTitle', 'slug', 'seoTitle', 'seoDescription', 'focusKeyword', 'canonicalUrl'];
// Resolve every doc's slug after this run first, so canonicals may point at a slug being set now.
const matchOf = (r) => byId.get(r.sanityId) || bySlug.get(r.slug);
const finalSlug = new Map(docs.map((d) => [d._id, d.slug]));
const slugSkipped = [];
for (const r of rows) {
  const d = matchOf(r);
  if (!d || !r.slug || r.slug === d.slug) continue;
  const owner = bySlug.get(r.slug);
  if (owner && owner._id !== d._id) { slugSkipped.push(`${r.id} (${d.slug}): ${r.slug} is used by ${owner._id}`); continue; }
  finalSlug.set(d._id, r.slug);
}
const liveSlugs = new Set(finalSlug.values());
const patches = []; const unmatched = []; const canonSkipped = [];
for (const r of rows) {
  const d = matchOf(r);
  if (!d) { unmatched.push(r.id || r.slug); continue; }
  const set = {};
  for (const f of FIELDS) {
    const v = f === 'slug' ? finalSlug.get(d._id) : r[f];
    if (!v || v === (d[f] || '')) continue;
    if (f === 'canonicalUrl') {
      const m = v.match(/^\/work\/([^/?#]+)\/?$/);
      if (!m || !liveSlugs.has(m[1])) { canonSkipped.push(`${r.id} (${d.slug}): ${v}`); continue; }
    }
    set[f === 'slug' ? 'slug.current' : f] = v;
  }
  if (Object.keys(set).length) patches.push({ id: r.id, _id: d._id, before: Object.fromEntries(FIELDS.map((f) => [f, d[f] ?? null])), set });
}

console.log(`${WRITE ? 'WRITE' : 'DRY RUN'} · notion ${rows.length} · sanity ${docs.length} · to patch ${patches.length}`);
for (const f of FIELDS) console.log(`  ${f}: ${patches.filter((p) => p.set[f === 'slug' ? 'slug.current' : f] !== undefined).length}`);
for (const p of patches) for (const [f, v] of Object.entries(p.set)) { const k = f.replace('.current', ''); console.log(`  ${p.id} ${k}: "${p.before[k] ?? ''}" → "${v}"`); }
if (unmatched.length) console.log(`no Sanity doc: ${unmatched.join(', ')}`);
if (slugSkipped.length) console.log(`slug skipped (taken):\n  ${slugSkipped.join('\n  ')}`);
if (canonSkipped.length) console.log(`canonical skipped (not a published /work/ slug):\n  ${canonSkipped.join('\n  ')}`);

if (WRITE && patches.length) {
  const file = path.join(ROOT, 'backups', `caseStudy-seo-before-${new Date().toISOString().replace(/[:.]/g, '-')}.json`);
  writeFileSync(file, JSON.stringify(patches.map((p) => ({ _id: p._id, ...p.before })), null, 1));
  console.log('backup', path.relative(ROOT, file));
  let tx = sanity.transaction();
  for (const p of patches) tx = tx.patch(p._id, (q) => q.set(p.set));
  const res = await tx.commit();
  console.log('committed', res.transactionId, res.results.length, 'docs');
}
