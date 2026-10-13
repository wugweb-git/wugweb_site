#!/usr/bin/env node
/**
 * Known Technical Debt #3: case studies whose og:image is a framerusercontent.com
 * URL (ogImage string, no ogImagePath). Sets ogImagePath to the doc's own
 * coverPath, else thumbnailPath, whichever is an image (not .mp4), else
 * /brand/og-default.png. Leaves ogImage, coverImage and clientLogoPath alone.
 *
 * Every target URL is resolved the way src/lib/assets.ts assetUrl() does and
 * must return 200 before anything is written. Dry run by default; WRITE=1
 * applies (backup first, ifRevisionId per doc).
 */
import { readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { createClient } from '@sanity/client';

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const WRITE = process.env.WRITE === '1';
const R2 = 'https://pub-39ad1d03baec440faf48303be95c3782.r2.dev';
const FALLBACK = '/brand/og-default.png';
const IMAGE_EXT = /\.(jpe?g|png|webp|avif|gif)$/i; // same as work/[slug].astro
const env = Object.fromEntries(readFileSync(path.join(ROOT, '.env'), 'utf8').split('\n').filter((l) => /^[A-Z_]+=/.test(l)).map((l) => { const i = l.indexOf('='); return [l.slice(0, i), l.slice(i + 1).trim().replace(/^["']|["']$/g, '')]; }));
const sanity = createClient({ projectId: 'splvhmk1', dataset: 'production', apiVersion: '2026-01-01', token: env.SANITY_TOKEN || env.SANITY_API_TOKEN, useCdn: false });

// Mirrors assetUrl(): absolute stays; else prefix /assets/ unless present; then R2 base.
const assetUrl = (p) => {
  const t = p.trim();
  if (/^https?:\/\//i.test(t)) return t;
  const s = t.startsWith('/') ? t : `/${t}`;
  return R2 + (s.startsWith('/assets/') ? s : `/assets/${s.replace(/^\/+/, '')}`);
};

const docs = await sanity.fetch(`*[_type == "caseStudy" && !(_id in path("drafts.**")) && !defined(ogImagePath) && ogImage match "*framerusercontent.com*"] | order(slug.current asc)`);
const drafts = await sanity.fetch(`*[_id in $ids]._id`, { ids: docs.map((d) => `drafts.${d._id}`) });
console.log(`${docs.length} case studies; drafts present: ${drafts.length ? drafts.join(', ') : 'none'}`);

const plan = [];
let bad = 0;
for (const d of docs) {
  const pick = [['coverPath', d.coverPath], ['thumbnailPath', d.thumbnailPath]].find(([, v]) => typeof v === 'string' && IMAGE_EXT.test(v.trim()));
  const [from, ogImagePath] = pick ?? ['og-default', FALLBACK];
  const url = assetUrl(ogImagePath);
  const res = await fetch(url, { method: 'HEAD' });
  if (res.status !== 200) bad++;
  plan.push({ _id: d._id, _rev: d._rev, slug: d.slug?.current, from, ogImagePath, url, status: res.status });
  console.log(`${res.status}  ${d.slug?.current}  ← ${from}  ${ogImagePath}`);
}
if (bad) {
  console.error(`${bad} target(s) not 200, nothing written.`);
  process.exit(1);
}
if (!WRITE) {
  console.log('Dry run. WRITE=1 to apply.');
  process.exit(0);
}
const backup = path.join(ROOT, 'backups', `casestudy-og-paths-before-${new Date().toISOString().slice(0, 10)}.json`);
writeFileSync(backup, JSON.stringify({ takenAt: new Date().toISOString(), docs, plan }, null, 2));
console.log(`backup → ${path.relative(ROOT, backup)}`);
const tx = sanity.transaction();
for (const p of plan) tx.patch(p._id, (patch) => patch.ifRevisionId(p._rev).set({ ogImagePath: p.ogImagePath }));
const res = await tx.commit();
console.log(`committed ${res.results.length} patch(es), transaction ${res.transactionId}`);
