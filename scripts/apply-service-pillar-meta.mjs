#!/usr/bin/env node
/**
 * Service pillar SEO titles and descriptions (owner, 2026-10-13): written per
 * pillar from its own sub-services, keyword first and brand last, in the style
 * of the Framer page titles that ranked. Values live in service-pillar-meta.json.
 * Dry run by default; WRITE=1 applies (backup first, ifRevisionId).
 */
import { readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { createClient } from '@sanity/client';

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const WRITE = process.env.WRITE === '1';
const META = JSON.parse(readFileSync(path.join(ROOT, 'scripts/service-pillar-meta.json'), 'utf8'));
const env = Object.fromEntries(readFileSync(path.join(ROOT, '.env'), 'utf8').split('\n').filter((l) => /^[A-Z_]+=/.test(l)).map((l) => { const i = l.indexOf('='); return [l.slice(0, i), l.slice(i + 1).trim().replace(/^["']|["']$/g, '')]; }));
const sanity = createClient({ projectId: 'splvhmk1', dataset: 'production', apiVersion: '2026-01-01', token: env.SANITY_TOKEN || env.SANITY_API_TOKEN, useCdn: false });

const docs = await sanity.fetch(`*[_type == "service" && _id in $ids]{ _id, _rev, seoTitle, seoDescription }`, { ids: Object.keys(META) });
if (docs.length !== Object.keys(META).length) throw new Error('missing pillar doc');
for (const [id, m] of Object.entries(META)) if (m.seoTitle.length > 60 || m.seoDescription.length > 160) throw new Error(`${id}: too long`);
const plan = docs.map((d) => ({ id: d._id, rev: d._rev, set: Object.fromEntries(Object.entries(META[d._id]).filter(([k, v]) => (d[k] ?? '') !== v)), before: { seoTitle: d.seoTitle, seoDescription: d.seoDescription } }));
for (const p of plan) for (const [k, v] of Object.entries(p.set)) console.log(`${p.id}.${k}: "${p.before[k] ?? ''}"\n   → "${v}"`);
if (!WRITE) { console.log('Dry run. WRITE=1 to apply.'); process.exit(0); }
const backup = path.join(ROOT, 'backups', `service-pillar-meta-before-${new Date().toISOString().replace(/[:.]/g, '-')}.json`);
writeFileSync(backup, JSON.stringify({ takenAt: new Date().toISOString(), docs }, null, 2));
const tx = sanity.transaction();
for (const p of plan) if (Object.keys(p.set).length) tx.patch(p.id, (x) => x.ifRevisionId(p.rev).set(p.set));
console.log(`backup → ${path.relative(ROOT, backup)}\ncommitted ${(await tx.commit()).results.length} patch(es)`);
