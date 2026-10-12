#!/usr/bin/env node
/**
 * Finish the Airtel logo fix (2026-10-12). No deletions.
 * A later repoint pass moved the two clients back to work/<slug>/client-logo-*.png; this points
 * clients, case studies (clientLogoPath, was a framerusercontent.com hotlink) and the two named
 * asset records at logos/airtel-*.png. Published + draft, ifRevisionId.
 *
 *   node scripts/finish-airtel-logos.mjs          read-only
 *   WRITE=1 node scripts/finish-airtel-logos.mjs  backs up, then patches
 */
import { createClient } from '@sanity/client';
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const WRITE = process.env.WRITE === '1';
const dot = Object.fromEntries(readFileSync(path.join(ROOT, '.env'), 'utf8').split('\n').filter((l) => l.includes('=') && !l.trim().startsWith('#')).map((l) => { const i = l.indexOf('='); return [l.slice(0, i).trim(), l.slice(i + 1).trim().replace(/^["']|["']$/g, '')]; }));
const token = process.env.SANITY_TOKEN || process.env.SANITY_API_TOKEN || dot.SANITY_TOKEN || dot.SANITY_API_TOKEN;
const c = createClient({ projectId: 'splvhmk1', dataset: 'production', apiVersion: '2026-01-01', token, useCdn: false });
const R2_BASE = 'https://pub-39ad1d03baec440faf48303be95c3782.r2.dev';

const XSAFE = '/assets/logos/airtel-xsafe.png';
const XSTREAM = '/assets/logos/airtel-xstream.png';
const rec = (p) => { const rel = p.replace(/^\/assets\//, ''); return { relativePath: rel, sitePath: p, r2Key: `assets/${rel}`, publicUrl: `${R2_BASE}/assets/${rel}`, fileName: path.basename(rel) }; };
const PLAN = [
  ['client-CLI-0031', { logoPath: XSTREAM }],
  ['client-CLI-0035', { logoPath: XSAFE }],
  ['caseStudy-airtel-xstream-play', { clientLogoPath: XSTREAM }],
  ['caseStudy-airtel-xsafe', { clientLogoPath: XSAFE }],
  ['asset-logo-airtelxstream', rec(XSTREAM)],
  ['asset-logos-airtel-xsafe-png', rec(XSAFE)],
];

const ids = PLAN.flatMap(([id]) => [id, `drafts.${id}`]);
const before = await c.fetch('*[_id in $ids]', { ids });
const byId = Object.fromEntries(before.map((d) => [d._id, d]));
const ops = [];
for (const [id, set] of PLAN) {
  if (!byId[id]) throw new Error(`missing ${id}`);
  for (const did of [id, `drafts.${id}`]) {
    const d = byId[did];
    if (d) ops.push({ id: did, rev: d._rev, set, was: Object.fromEntries(Object.keys(set).map((k) => [k, d[k]])) });
  }
}
console.log(WRITE ? 'WRITE' : 'READ-ONLY (set WRITE=1 to apply)');
for (const o of ops) for (const k of Object.keys(o.set)) if (o.was[k] !== o.set[k]) console.log(`  ${o.id}.${k}: ${o.was[k] ?? '(unset)'} -> ${o.set[k]}`);

if (WRITE) {
  const backupFile = path.join(ROOT, 'backups', 'airtel-logo-finish-2026-10-12.json');
  if (existsSync(backupFile)) throw new Error('backup already exists; refusing to overwrite it');
  writeFileSync(backupFile, JSON.stringify({ takenAt: new Date().toISOString(), docs: before }, null, 2));
  const tx = c.transaction();
  for (const o of ops) tx.patch(o.id, (p) => p.ifRevisionId(o.rev).set(o.set));
  await tx.commit();
  console.log('Committed', ops.length, 'patches. Backup:', path.relative(ROOT, backupFile));
}
