#!/usr/bin/env node
/**
 * Fix the two Airtel logos (2026-10-12). Additive: copies were made to
 * assets/logos/airtel-xsafe.png and airtel-xstream.png (local + R2); old keys stay.
 *
 *   node scripts/fix-airtel-logos.mjs          read-only: prints what it would change
 *   WRITE=1 node scripts/fix-airtel-logos.mjs  backs up, then patches (ifRevisionId, published + draft)
 *
 * Both client docs pointed at logos/client-logo-c6rj.png (the XSafe file); Xstream's own
 * file is client-logo-8gyg.png. Also the asset record "Airtel Xstream Logo" pointed at c6rj.
 */
import { createClient } from '@sanity/client';
import { existsSync, readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const WRITE = process.env.WRITE === '1';
const dot = Object.fromEntries(readFileSync(path.join(ROOT, '.env'), 'utf8').split('\n').filter((l) => l.includes('=') && !l.trim().startsWith('#')).map((l) => { const i = l.indexOf('='); return [l.slice(0, i).trim(), l.slice(i + 1).trim().replace(/^["']|["']$/g, '')]; }));
const token = process.env.SANITY_TOKEN || process.env.SANITY_API_TOKEN || dot.SANITY_TOKEN || dot.SANITY_API_TOKEN;
const c = createClient({ projectId: 'splvhmk1', dataset: 'production', apiVersion: '2026-01-01', token, useCdn: false });

const R2_BASE = 'https://pub-39ad1d03baec440faf48303be95c3782.r2.dev';
const LOGOS = {
  xsafe: { client: 'client-CLI-0035', alt: 'Airtel XSafe logo', display: 'Airtel XSafe Logo', file: 'airtel-xsafe.png', assetId: 'asset-logos-airtel-xsafe-png', from: 'asset-logos-client-logo-c6rj-png' },
  xstream: { client: 'client-CLI-0031', alt: 'Airtel Xstream logo', display: 'Airtel Xstream Logo', file: 'airtel-xstream.png', assetId: 'asset-logo-airtelxstream', from: 'asset-logos-client-logo-8gyg-png' },
};
const rec = (f) => ({ relativePath: `logos/${f}`, sitePath: `/assets/logos/${f}`, r2Key: `assets/logos/${f}`, publicUrl: `${R2_BASE}/assets/logos/${f}`, fileName: f });

const ids = [...Object.values(LOGOS).flatMap((l) => [l.client, `drafts.${l.client}`, l.assetId, `drafts.${l.assetId}`, l.from])];
const before = await c.fetch(`*[_id in $ids]`, { ids });
const byId = Object.fromEntries(before.map((d) => [d._id, d]));

const ops = []; // {id, rev, set, create?}
for (const [k, L] of Object.entries(LOGOS)) {
  for (const id of [L.client, `drafts.${L.client}`]) {
    const d = byId[id];
    if (!d) continue;
    ops.push({ id, rev: d._rev, set: { logoPath: `/assets/logos/${L.file}` }, was: d.logoPath });
  }
  const existing = byId[L.assetId];
  const tpl = byId[L.from];
  if (existing) {
    ops.push({ id: L.assetId, rev: existing._rev, set: { ...rec(L.file), alt: L.alt, displayName: L.display, name: L.display }, was: existing.relativePath });
  } else {
    if (!tpl) throw new Error(`template asset ${L.from} missing`);
    const { _rev, _createdAt, _updatedAt, usedBy, usedByCount, linkedCaseStudy, linkedClient, linkedService, linkedPost, ...keep } = tpl;
    ops.push({ id: L.assetId, create: { ...keep, _id: L.assetId, name: L.display, displayName: L.display, slug: { _type: 'slug', current: `logos-${L.file.replace(/\./g, '-')}` }, alt: L.alt, ...rec(L.file) } });
  }
}

console.log(WRITE ? 'WRITE' : 'READ-ONLY (set WRITE=1 to apply)');
for (const o of ops) console.log(' ', o.create ? `create ${o.id}` : `patch  ${o.id}  ${o.was ?? ''}  ->  ${JSON.stringify(o.set.logoPath ?? o.set.relativePath)}`);

mkdirSync(path.join(ROOT, 'backups'), { recursive: true });
const backupFile = path.join(ROOT, 'backups', 'airtel-logo-fix-2026-10-12.json');
if (WRITE) {
  if (existsSync(backupFile)) throw new Error('backup already exists; refusing to overwrite it');
  writeFileSync(backupFile, JSON.stringify({ takenAt: new Date().toISOString(), docs: before, note: 'created docs (no prior state): ' + ops.filter((o) => o.create).map((o) => o.id).join(', ') }, null, 2));
  const tx = c.transaction();
  for (const o of ops) {
    if (o.create) tx.createIfNotExists(o.create);
    else tx.patch(o.id, (p) => p.ifRevisionId(o.rev).set(o.set));
  }
  await tx.commit();
  console.log('Committed. Backup:', path.relative(ROOT, backupFile));
}
