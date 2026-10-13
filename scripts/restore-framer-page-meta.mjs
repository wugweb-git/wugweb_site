#!/usr/bin/env node
/**
 * Restores page metadata from the live Framer site (owner, 2026-10-13).
 * A 2026-09-24 migration filled singletonPage SEO from hero headings and a
 * placeholder description, and the Work title was rewritten on 2026-10-13.
 *
 * For every site page in the live Framer sitemap (incl. the legal pages):
 *   Sanity singletonPage: seoTitle, seoDescription, ogTitle, ogDescription
 *                         ← Framer <title>, meta description, og:title, og:description
 *   Notion Pages:         SEO Title, SEO Description, OG Title, OG Description (same values)
 *                         OG Image ← public R2 URL of the page's Sanity ogImagePath
 * OG images are NOT changed in Sanity: each page's ogImagePath already points
 * at an R2 copy of its Framer og:image (checked by pixel comparison).
 * Case studies and blog posts are out of scope (their SEO comes from Notion).
 *
 * Dry run by default; WRITE=1 applies (backs up Sanity docs and Notion rows first).
 */
import { readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { createClient } from '@sanity/client';

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const WRITE = process.env.WRITE === '1';
const R2 = 'https://pub-39ad1d03baec440faf48303be95c3782.r2.dev';
const NOTION_PAGES = '3eebb710-b9ab-81e9-b961-000b2a6cf6a9';
const env = Object.fromEntries(readFileSync(path.join(ROOT, '.env'), 'utf8').split('\n').filter((l) => /^[A-Z_]+=/.test(l)).map((l) => { const i = l.indexOf('='); return [l.slice(0, i), l.slice(i + 1).trim().replace(/^["']|["']$/g, '')]; }));
const sanity = createClient({ projectId: 'splvhmk1', dataset: 'production', apiVersion: '2026-01-01', token: env.SANITY_TOKEN || env.SANITY_API_TOKEN, useCdn: false });
const NH = { Authorization: 'Bearer ' + env.NOTION_TOKEN, 'Notion-Version': '2025-09-03', 'Content-Type': 'application/json' };
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// Framer path → Sanity singletonPage _id (= pageId).
const PAGES = {
  '/': 'home', '/about': 'about', '/work': 'work', '/faq': 'faq', '/blog': 'blog', '/services': 'services',
  '/contact-us': 'contact', '/footer/subscription': 'subscription', '/footer/sitemap': 'sitemap',
  '/footer/industries': 'industries', '/footer/impact': 'impact', '/termsofuse': 'terms-of-use',
  '/privacy-policy': 'privacy-policy', '/refund-policy': 'refund-policy',
};
const dec = (v) => (v || '').replace(/&amp;/g, '&').replace(/&#x27;|&#39;/g, "'").replace(/&quot;/g, '"').replace(/&lt;/g, '<').replace(/&gt;/g, '>').trim();
const plain = (p) => !p ? '' : p.type === 'url' ? (p.url || '') : (p[p.type] || []).map?.((t) => t.plain_text).join('') ?? '';

// 1. Live Framer values (one request at a time).
const framer = {};
for (const [p, id] of Object.entries(PAGES)) {
  const res = await fetch('https://www.wugweb.com' + p, { headers: { 'user-agent': 'wugweb-preflight (read-only)' } });
  const h = await res.text();
  await sleep(600);
  const m = (re) => dec((h.match(re) || [])[1]);
  if (res.status !== 200 || /<meta name="generator" content="Framer/.test(h) === false) throw new Error(`${p}: not a live Framer page (${res.status})`);
  framer[id] = { seoTitle: m(/<title>([^<]*)<\/title>/), seoDescription: m(/<meta name="description" content="([^"]*)"/), ogTitle: m(/<meta property="og:title" content="([^"]*)"/), ogDescription: m(/<meta property="og:description" content="([^"]*)"/) };
  for (const [k, v] of Object.entries(framer[id])) if (!v) throw new Error(`${p}: Framer ${k} is empty`);
}

// 2. Current Sanity + Notion.
const ids = Object.values(PAGES);
const docs = await sanity.fetch(`*[_id in $ids]{ _id, _rev, seoTitle, seoDescription, ogTitle, ogDescription, ogImagePath }`, { ids });
const q = await (await fetch(`https://api.notion.com/v1/data_sources/${NOTION_PAGES}/query`, { method: 'POST', headers: NH, body: JSON.stringify({ page_size: 100 }) })).json();
if (!q.results) throw new Error('Notion: ' + q.message);
const notion = new Map(q.results.map((r) => [plain(r.properties['Page ID']), r]));

const sanityPlan = [];
const notionPlan = [];
for (const id of ids) {
  const d = docs.find((x) => x._id === id);
  if (!d) throw new Error(`Sanity page ${id} missing`);
  const f = framer[id];
  const set = Object.fromEntries(Object.entries(f).filter(([k, v]) => (d[k] ?? '') !== v));
  if (Object.keys(set).length) sanityPlan.push({ id, rev: d._rev, before: Object.fromEntries(Object.keys(f).map((k) => [k, d[k] ?? null])), set });

  const n = notion.get(id);
  if (!n) throw new Error(`Notion Pages row ${id} missing`);
  const want = { 'SEO Title': f.seoTitle, 'SEO Description': f.seoDescription, 'OG Title': f.ogTitle, 'OG Description': f.ogDescription, 'OG Image': d.ogImagePath ? R2 + d.ogImagePath : '' };
  const nset = Object.fromEntries(Object.entries(want).filter(([k, v]) => v && plain(n.properties[k]) !== v));
  if (Object.keys(nset).length) notionPlan.push({ pageId: n.id, id, before: Object.fromEntries(Object.keys(want).map((k) => [k, plain(n.properties[k])])), set: nset, types: Object.fromEntries(Object.keys(nset).map((k) => [k, n.properties[k].type])) });
}

console.log(`${WRITE ? 'WRITE' : 'DRY RUN'} · Sanity pages to patch ${sanityPlan.length} · Notion rows to patch ${notionPlan.length}\n`);
for (const p of sanityPlan) {
  console.log(`[${p.id}]`);
  for (const [k, v] of Object.entries(p.set)) console.log(`  ${k}: "${p.before[k] ?? ''}"\n  ${' '.repeat(k.length)}→ "${v}"`);
}
console.log('\nNotion:');
for (const p of notionPlan) console.log(`  ${p.id}: ${Object.keys(p.set).join(', ')}`);
if (!WRITE) { console.log('\nDry run. WRITE=1 to apply.'); process.exit(0); }

const stamp = new Date().toISOString().slice(0, 10);
const backup = path.join(ROOT, 'backups', `page-meta-before-framer-restore-${stamp}.json`);
writeFileSync(backup, JSON.stringify({ takenAt: new Date().toISOString(), sanity: docs, notion: notionPlan.map(({ pageId, id, before }) => ({ pageId, id, before })), framer }, null, 2));
console.log(`\nbackup → ${path.relative(ROOT, backup)}`);

const tx = sanity.transaction();
for (const p of sanityPlan) tx.patch(p.id, (x) => x.ifRevisionId(p.rev).set(p.set));
if (sanityPlan.length) console.log(`Sanity: committed ${(await tx.commit()).results.length} patch(es)`);

const prop = (type, v) => (type === 'url' ? { url: v } : { rich_text: [{ type: 'text', text: { content: v } }] });
let ok = 0;
for (const p of notionPlan) {
  const properties = Object.fromEntries(Object.entries(p.set).map(([k, v]) => [k, prop(p.types[k], v)]));
  const r = await fetch(`https://api.notion.com/v1/pages/${p.pageId}`, { method: 'PATCH', headers: NH, body: JSON.stringify({ properties }) });
  if (r.ok) ok++; else { console.error(`Notion FAILED ${p.id}: ${r.status} ${(await r.json()).message}`); process.exitCode = 1; }
  await sleep(350);
}
console.log(`Notion: patched ${ok}/${notionPlan.length} row(s)`);
