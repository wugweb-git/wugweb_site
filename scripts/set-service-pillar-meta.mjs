#!/usr/bin/env node
/**
 * Owner decision 2026-10-13: service SEO titles use the pillar names, not the
 * retired Framer service names. seoTitle = "<Pillar> Services — Wugweb" on all
 * six. seoDescription: where the recycled Framer copy describes a different
 * service (growth = martech, operations = QA) or none exists (strategy), use the
 * pillar's own subtitle from Sanity; brand / experience / engineering keep theirs.
 * Dry run by default; WRITE=1 applies (backup first, ifRevisionId).
 */
import { readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { createClient } from '@sanity/client';

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const WRITE = process.env.WRITE === '1';
const DESC_FROM_SUBTITLE = new Set(['growth', 'operations', 'strategy']);
const env = Object.fromEntries(readFileSync(path.join(ROOT, '.env'), 'utf8').split('\n').filter((l) => /^[A-Z_]+=/.test(l)).map((l) => { const i = l.indexOf('='); return [l.slice(0, i), l.slice(i + 1).trim().replace(/^["']|["']$/g, '')]; }));
const sanity = createClient({ projectId: 'splvhmk1', dataset: 'production', apiVersion: '2026-01-01', token: env.SANITY_TOKEN || env.SANITY_API_TOKEN, useCdn: false });

const docs = await sanity.fetch(`*[_type == "service" && _id in ["strategy","brand","experience","engineering","growth","operations"]]{ _id, _rev, title, subtitle, seoTitle, seoDescription }`);
if (docs.length !== 6) throw new Error(`expected 6 pillar docs, got ${docs.length}`);
const plan = docs.map((d) => {
  const want = { seoTitle: `${d.title.trim()} Services — Wugweb` };
  if (DESC_FROM_SUBTITLE.has(d._id)) { if (!d.subtitle) throw new Error(`${d._id}: no subtitle`); want.seoDescription = d.subtitle.trim(); }
  const set = Object.fromEntries(Object.entries(want).filter(([k, v]) => (d[k] ?? '') !== v));
  return { id: d._id, rev: d._rev, before: { seoTitle: d.seoTitle ?? null, seoDescription: d.seoDescription ?? null }, set };
});
for (const p of plan) for (const [k, v] of Object.entries(p.set)) console.log(`${p.id}.${k}: "${p.before[k] ?? ''}" → "${v}"`);
if (!WRITE) { console.log('Dry run. WRITE=1 to apply.'); process.exit(0); }
const backup = path.join(ROOT, 'backups', `service-pillar-meta-before-${new Date().toISOString().slice(0, 10)}.json`);
writeFileSync(backup, JSON.stringify({ takenAt: new Date().toISOString(), docs }, null, 2));
const tx = sanity.transaction();
for (const p of plan) if (Object.keys(p.set).length) tx.patch(p.id, (x) => x.ifRevisionId(p.rev).set(p.set));
console.log(`backup → ${path.relative(ROOT, backup)}\ncommitted ${(await tx.commit()).results.length} patch(es)`);
