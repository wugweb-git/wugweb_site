#!/usr/bin/env node
/**
 * Create the two asset records the hard-coded site media was missing, so every
 * path the site references is mapped (asset record + R2 key):
 *   more/home/home-poster.webp   og/default.jpg
 *   node scripts/map-site-media-assets.mjs          read-only
 *   WRITE=1 node scripts/map-site-media-assets.mjs  createIfNotExists (never overwrites)
 * Additive only. Fields are copied from a sibling record; usedBy is left for the next scan.
 */
import { createClient } from '@sanity/client';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const WRITE = process.env.WRITE === '1';
const dot = Object.fromEntries(readFileSync(path.join(ROOT, '.env'), 'utf8').split('\n').filter((l) => l.includes('=') && !l.trim().startsWith('#')).map((l) => { const i = l.indexOf('='); return [l.slice(0, i).trim(), l.slice(i + 1).trim().replace(/^["']|["']$/g, '')]; }));
const c = createClient({ projectId: 'splvhmk1', dataset: 'production', apiVersion: '2026-01-01', token: process.env.SANITY_TOKEN || dot.SANITY_TOKEN || dot.SANITY_API_TOKEN, useCdn: false });
const R2 = 'https://pub-39ad1d03baec440faf48303be95c3782.r2.dev';
const WANT = [
  { rel: 'more/home/home-poster.webp', like: 'more/home/home.mp4', mime: 'image/webp', group: 'More', usage: 'Poster' },
  { rel: 'og/default.jpg', like: 'og/about.jpg', mime: 'image/jpeg', group: 'Brand', usage: 'OG default' },
];
const tx = c.transaction();
for (const w of WANT) {
  const exists = await c.fetch(`count(*[_type=="asset" && relativePath==$r])`, { r: w.rel });
  if (exists) { console.log('has record:', w.rel); continue; }
  const tpl = await c.fetch(`*[_type=="asset" && relativePath==$r][0]`, { r: w.like }) || {};
  const file = w.rel.split('/').pop(); const name = file;
  const id = 'asset-' + w.rel.replace(/\.[^.]+$/, '').replace(/[^a-z0-9]+/gi, '-').toLowerCase() + '-' + w.rel.split('.').pop();
  const doc = {
    _id: id, _type: 'asset', name, displayName: name, slug: { _type: 'slug', current: id.replace(/^asset-/, '') },
    owner: tpl.owner || 'wugweb', assetType: tpl.assetType || 'Page Asset', mediaType: 'Image', mimeType: w.mime,
    assetGroup: w.group, usage: w.usage, status: 'Active', folder: w.rel.split('/').slice(0, -1).join('/'),
    relativePath: w.rel, sitePath: `/assets/${w.rel}`, r2Key: `assets/${w.rel}`, publicUrl: `${R2}/assets/${w.rel}`,
    fileName: file, extension: file.split('.').pop(), r2Synced: true,
  };
  console.log(WRITE ? 'create' : 'would create', id);
  tx.createIfNotExists(doc);
}
if (WRITE) { await tx.commit(); console.log('Committed.'); }
