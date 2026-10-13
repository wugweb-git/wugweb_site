#!/usr/bin/env node
/**
 * Sets siteSettings.siteUrl (DNS cutover prep, 2026-10-13). Dry run by
 * default; WRITE=1 applies. Backs up the whole doc first and patches with
 * ifRevisionId, so a concurrent Studio edit makes this fail instead of
 * being overwritten.
 */
import { readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { createClient } from '@sanity/client';

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const WRITE = process.env.WRITE === '1';
const SITE_URL = 'https://www.wugweb.com';
const env = Object.fromEntries(readFileSync(path.join(ROOT, '.env'), 'utf8').split('\n').filter((l) => /^[A-Z_]+=/.test(l)).map((l) => { const i = l.indexOf('='); return [l.slice(0, i), l.slice(i + 1).trim().replace(/^["']|["']$/g, '')]; }));
const sanity = createClient({ projectId: 'splvhmk1', dataset: 'production', apiVersion: '2026-01-01', token: env.SANITY_TOKEN || env.SANITY_API_TOKEN, useCdn: false });

const docs = await sanity.fetch(`*[_type == "siteSettings"]`);
const pub = docs.filter((d) => !d._id.startsWith('drafts.'));
if (pub.length !== 1) throw new Error(`expected 1 published siteSettings, found ${pub.length}`);
const doc = pub[0];
const drafts = docs.filter((d) => d._id.startsWith('drafts.'));
console.log(`${doc._id} rev ${doc._rev}\n  before: siteUrl = ${JSON.stringify(doc.siteUrl ?? null)}`);
if (drafts.length) console.log(`  note: draft exists (${drafts.map((d) => d._id).join(', ')}), siteUrl there = ${JSON.stringify(drafts[0].siteUrl ?? null)}`);
if (!WRITE) {
  console.log(`  dry run: would set ${SITE_URL}. WRITE=1 to apply.`);
  process.exit(0);
}
const backup = path.join(ROOT, 'backups', `siteSettings-before-siteUrl-${new Date().toISOString().slice(0, 10)}.json`);
writeFileSync(backup, JSON.stringify(docs, null, 2));
console.log(`  backup → ${path.relative(ROOT, backup)}`);
const res = await sanity.patch(doc._id).ifRevisionId(doc._rev).set({ siteUrl: SITE_URL }).commit();
const after = await sanity.getDocument(doc._id);
console.log(`  after:  siteUrl = ${JSON.stringify(after.siteUrl)} (rev ${res._rev})`);
