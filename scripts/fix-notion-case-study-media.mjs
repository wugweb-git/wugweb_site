#!/usr/bin/env node
/**
 * Notion Case Studies ← owner decisions (2026-10-13). Touches ONLY three
 * Notion columns; never Sanity, never Slug / Legacy Slugs / Status / SEO.
 *
 *   1. OG Image + Cover Image: where either is a framerusercontent.com URL,
 *      set both to the public R2 URL of the Sanity doc's coverPath
 *      (PUBLIC_R2_ASSETS_BASE + path), only if that URL returns 200.
 *   2. Canonical URL: where Notion differs from /work/<Sanity slug>, set it to
 *      /work/<Sanity slug> — relative, the format work/[slug].astro and
 *      sync-notion-case-studies.mjs expect (an absolute URL would 301 off-site
 *      or be skipped) — only if that page returns 200 on wugweb.pages.dev.
 *      Rows whose Notion Slug differs from the Sanity slug are listed, not
 *      changed (slug naming is an owner decision).
 *
 * Dry run by default (prints page, column, old, new). WRITE=1 applies after
 * backing up the previous values to backups/.
 */
import { readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { createClient } from '@sanity/client';

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const WRITE = process.env.WRITE === '1';
const SITE = 'https://wugweb.pages.dev';
const DATA_SOURCE = '3a3bb710-b9ab-80d6-b520-000bfeabe514'; // Notion: Case Studies
const wrangler = readFileSync(path.join(ROOT, 'wrangler.jsonc'), 'utf8');
const R2 = (wrangler.match(/"PUBLIC_R2_ASSETS_BASE":\s*"([^"]+)"/) || [])[1]?.replace(/\/+$/, '');
if (!R2) throw new Error('PUBLIC_R2_ASSETS_BASE not found in wrangler.jsonc');
const env = Object.fromEntries(readFileSync(path.join(ROOT, '.env'), 'utf8').split('\n').filter((l) => /^[A-Z_]+=/.test(l)).map((l) => { const i = l.indexOf('='); return [l.slice(0, i), l.slice(i + 1).trim().replace(/^["']|["']$/g, '')]; }));
const NH = { Authorization: 'Bearer ' + env.NOTION_TOKEN, 'Notion-Version': '2025-09-03', 'Content-Type': 'application/json' };
const sanity = createClient({ projectId: 'splvhmk1', dataset: 'production', apiVersion: '2026-01-01', token: env.SANITY_TOKEN || env.SANITY_API_TOKEN, useCdn: false });
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const plain = (p) => !p ? '' : p.type === 'url' ? (p.url || '') : p.type === 'select' ? (p.select?.name || '') : (p[p.type] || []).map?.((t) => t.plain_text).join('') ?? '';
const isFramer = (u) => /framerusercontent\.com/i.test(u || '');

// Notion rows
const rows = [];
let cursor;
do {
  const r = await fetch(`https://api.notion.com/v1/data_sources/${DATA_SOURCE}/query`, { method: 'POST', headers: NH, body: JSON.stringify({ page_size: 100, start_cursor: cursor }) });
  const j = await r.json();
  if (!r.ok) throw new Error(`Notion ${r.status}: ${j.message}`);
  for (const p of j.results) {
    const P = p.properties;
    rows.push({ pageId: p.id, id: plain(P['Case Study ID']), slug: plain(P['Slug']).trim(), sanityId: plain(P['Sanity ID']).trim(), og: plain(P['OG Image']), cover: plain(P['Cover Image']), canonical: plain(P['Canonical URL']).trim() });
  }
  cursor = j.has_more ? j.next_cursor : undefined;
} while (cursor);

// Sanity (published only)
const docs = await sanity.fetch(`*[_type == "caseStudy" && !(_id in path("drafts.**"))]{ _id, "slug": slug.current, coverPath }`);
const byId = new Map(docs.map((d) => [d._id, d]));
const bySlug = new Map(docs.map((d) => [d.slug, d]));

const changes = []; // { pageId, id, column, old, new }
const skipped = [];
const status = async (url) => { const s = (await fetch(url, { method: 'HEAD', redirect: 'manual', headers: { 'user-agent': 'wugweb-notion-fix' } })).status; await sleep(250); return s; };

for (const r of rows) {
  const d = byId.get(r.sanityId) || bySlug.get(r.slug);
  // 1. OG / Cover
  if (isFramer(r.og) || isFramer(r.cover)) {
    if (!d?.coverPath) skipped.push(`${r.id} ${r.slug}: Framer URL but no published Sanity coverPath`);
    else {
      const url = R2 + (d.coverPath.startsWith('/') ? d.coverPath : `/${d.coverPath}`);
      const s = await status(url);
      if (s !== 200) skipped.push(`${r.id} ${r.slug}: R2 cover ${s} (${url})`);
      else {
        if (r.og !== url) changes.push({ pageId: r.pageId, id: r.id, slug: r.slug, column: 'OG Image', old: r.og, new: url });
        if (r.cover !== url) changes.push({ pageId: r.pageId, id: r.id, slug: r.slug, column: 'Cover Image', old: r.cover, new: url });
      }
    }
  }
  // 2. Canonical
  if (d && r.canonical && r.canonical !== `/work/${d.slug}`) {
    if (r.slug !== d.slug) { skipped.push(`${r.id} ${r.slug}: canonical not changed, Notion slug "${r.slug}" ≠ Sanity slug "${d.slug}" (owner decision)`); continue; }
    const s = await status(`${SITE}/work/${d.slug}`);
    if (s !== 200) skipped.push(`${r.id} ${r.slug}: /work/${d.slug} returns ${s}`);
    else changes.push({ pageId: r.pageId, id: r.id, slug: r.slug, column: 'Canonical URL', old: r.canonical, new: `/work/${d.slug}` });
  }
}

const pages = new Set(changes.map((c) => c.pageId));
console.log(`${WRITE ? 'WRITE' : 'DRY RUN'} · Notion rows ${rows.length} · changes ${changes.length} on ${pages.size} pages · skipped ${skipped.length}`);
for (const col of ['OG Image', 'Cover Image', 'Canonical URL']) console.log(`  ${col}: ${changes.filter((c) => c.column === col).length}`);
console.log('\n| page | column | old | new |\n|---|---|---|---|');
for (const c of changes) console.log(`| ${c.id} ${c.slug} | ${c.column} | ${c.old || '—'} | ${c.new} |`);
if (skipped.length) console.log(`\nskipped:\n  ${skipped.join('\n  ')}`);
if (!WRITE) { console.log('\nDry run. WRITE=1 to apply.'); process.exit(0); }

const backup = path.join(ROOT, 'backups', `notion-case-study-media-before-${new Date().toISOString().slice(0, 10)}.json`);
writeFileSync(backup, JSON.stringify({ takenAt: new Date().toISOString(), changes }, null, 2));
console.log(`\nbackup → ${path.relative(ROOT, backup)}`);
const prop = (col, v) => (col === 'Canonical URL' ? { rich_text: [{ type: 'text', text: { content: v } }] } : { url: v });
for (const pageId of pages) {
  const properties = Object.fromEntries(changes.filter((c) => c.pageId === pageId).map((c) => [c.column, prop(c.column, c.new)]));
  const r = await fetch(`https://api.notion.com/v1/pages/${pageId}`, { method: 'PATCH', headers: NH, body: JSON.stringify({ properties }) });
  if (!r.ok) { console.error(`FAILED ${pageId}: ${r.status} ${(await r.json()).message}`); process.exitCode = 1; }
  await sleep(350); // Notion: ~3 requests/s
}
console.log(`patched ${pages.size} page(s)`);
