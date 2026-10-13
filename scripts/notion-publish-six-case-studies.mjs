#!/usr/bin/env node
/**
 * Owner decision 2026-10-13: six case studies that are live in Sanity but
 * Draft in Notion become Published in Notion. Changes ONLY the Status column.
 * Dry run by default; WRITE=1 applies (old values backed up first).
 */
import { readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const WRITE = process.env.WRITE === '1';
const DATA_SOURCE = '3a3bb710-b9ab-80d6-b520-000bfeabe514'; // Notion: Case Studies
const SLUGS = [
  'bodyshop-building-a-premium-wellness-commerce-experience',
  'eastman-auto-and-power-modernizing-enterprise-manufacturing-experiences',
  'pharmadropper-designing-cross-border-digital-healthcare-commerce',
  'spark-logistics',
  'thebizgift',
  'hyatt-restaurants-elevating-culinary-discovery-through-digital-experiences',
];
const env = Object.fromEntries(readFileSync(path.join(ROOT, '.env'), 'utf8').split('\n').filter((l) => /^[A-Z_]+=/.test(l)).map((l) => { const i = l.indexOf('='); return [l.slice(0, i), l.slice(i + 1).trim().replace(/^["']|["']$/g, '')]; }));
const NH = { Authorization: 'Bearer ' + env.NOTION_TOKEN, 'Notion-Version': '2025-09-03', 'Content-Type': 'application/json' };
const plain = (p) => !p ? '' : p.type === 'select' ? (p.select?.name || '') : (p[p.type] || []).map?.((t) => t.plain_text).join('') ?? '';

const rows = [];
let cursor;
do {
  const r = await fetch(`https://api.notion.com/v1/data_sources/${DATA_SOURCE}/query`, { method: 'POST', headers: NH, body: JSON.stringify({ page_size: 100, start_cursor: cursor }) });
  const j = await r.json();
  if (!r.ok) throw new Error(`Notion ${r.status}: ${j.message}`);
  for (const p of j.results) rows.push({ pageId: p.id, id: plain(p.properties['Case Study ID']), slug: plain(p.properties['Slug']).trim(), status: plain(p.properties['Status']) });
  cursor = j.has_more ? j.next_cursor : undefined;
} while (cursor);

const targets = SLUGS.map((s) => rows.filter((r) => r.slug === s));
const missing = SLUGS.filter((s, i) => targets[i].length !== 1);
if (missing.length) throw new Error(`expected exactly one Notion row for: ${missing.join(', ')}`);
const plan = targets.flat().filter((r) => r.status !== 'Published');
for (const r of targets.flat()) console.log(`${r.id} ${r.slug}: Status "${r.status}" → "Published"${r.status === 'Published' ? ' (already)' : ''}`);
if (!WRITE) { console.log('Dry run. WRITE=1 to apply.'); process.exit(0); }

const backup = path.join(ROOT, 'backups', `notion-publish-six-before-${new Date().toISOString().slice(0, 10)}.json`);
writeFileSync(backup, JSON.stringify({ takenAt: new Date().toISOString(), rows: targets.flat() }, null, 2));
console.log(`backup → ${path.relative(ROOT, backup)}`);
for (const r of plan) {
  const res = await fetch(`https://api.notion.com/v1/pages/${r.pageId}`, { method: 'PATCH', headers: NH, body: JSON.stringify({ properties: { Status: { select: { name: 'Published' } } } }) });
  if (!res.ok) { console.error(`FAILED ${r.slug}: ${res.status} ${(await res.json()).message}`); process.exitCode = 1; }
  await new Promise((ok) => setTimeout(ok, 350));
}
console.log(`patched ${plan.length} page(s)`);
