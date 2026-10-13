#!/usr/bin/env node
/**
 * Creates the 12 `redirect` docs for Framer URLs that 404 on the new site
 * (DNS cutover pre-flight, 2026-10-13). Dry run by default; WRITE=1 applies.
 *
 * Each row is checked with the same rules as sanity/schemaTypes/redirect.ts
 * (validateSource / validateDestination: leading /, no query, no reserved
 * path, no duplicate source, no self-loop) before anything is written.
 * Deterministic _ids + createIfNotExists, so a re-run is a no-op. Published
 * ids (no drafts. prefix), so the middleware picks them up straight away.
 * Writes backups/cutover-redirects-<date>.json first (existing docs with the
 * same ids or sources, plus the docs about to be created).
 */
import { readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { createHash } from 'node:crypto';
import { createClient } from '@sanity/client';

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const WRITE = process.env.WRITE === '1';
const env = Object.fromEntries(readFileSync(path.join(ROOT, '.env'), 'utf8').split('\n').filter((l) => /^[A-Z_]+=/.test(l)).map((l) => { const i = l.indexOf('='); return [l.slice(0, i), l.slice(i + 1).trim().replace(/^["']|["']$/g, '')]; }));
const sanity = createClient({ projectId: 'splvhmk1', dataset: 'production', apiVersion: '2026-01-01', token: env.SANITY_TOKEN || env.SANITY_API_TOKEN, useCdn: false });

const NOTE = 'Framer URL, DNS cutover pre-flight 2026-10-13';
const ROWS = [
  ['/blog/10-key-takeaways-from-google-s-material-design-guidelines', '/blog/10-key-takeaways-from-googles-material-design-guidelines'],
  ['/work/ad-tech-imedia-sculpting-the-visual-identity-of-global-martech-summits', '/work/adtech-and-imedia-sculpting-the-visual-identity-of-global-martech-summits'],
  ['/work/adneto-digital-showcase-ai-powered-loyalty-platform', '/work/crafting-digital-authority-the-adneto-website-showcase', 'closest match, owner to confirm'],
  ['/work/airtel-xstream-play-digital-entertainment-ux-web-design', '/work/airtel-xstream-play'],
  ['/work/bankco-super-app-digital-banking-loyalty-commerce', '/work/bankco'],
  ['/work/cartier-career-site-redesign-luxury-ux-ui-talent-branding', '/work/cartier-careers'],
  ['/work/gratify-intelligent-rewards-feedback-platform', '/work/gratify-the-intelligent-rewards-and-feedback-platform'],
  ['/work/kia-customer-loyalty-dashboard-ui-ux', '/work/accelerating-loyalty-designing-kias-intuitive-customer-dashboard'],
  ['/work/rak-sme-scaling-the-tech-infrastructure-for-ras-al-khaimah’s-business-ecosystem', '/work/rak-sme-scaling-the-tech-infrastructure-for-ras-al-khaimah-business-ecosystem'],
  ['/work/tot-bridal-launch-branding-ux-design', '/work/crafting-digital-elegance-the-tot-bridal-launch-story'],
  ['/work/valyu-ai-empowering-india-s-workforce-with-on-demand-earned-wages', '/work/valyu-ai-empowering-indias-workforce-with-on-demand-earned-wages'],
  ['/work/woodkraft-elevating-india’s-largest-corporate-fit-out-legacy', '/work/woodkraft-elevating-indias-largest-corporate-fit-out-legacy'],
];

// Same as sanity/schemaTypes/redirect.ts.
const norm = (v) => {
  let p = String(v ?? '').trim().split(/[?#]/)[0].toLowerCase();
  if (!p.startsWith('/')) p = `/${p}`;
  p = p.replace(/\/{2,}/g, '/');
  return p.length > 1 ? p.replace(/\/+$/, '') : p;
};
const RESERVED = ['/api', '/assets', '/_astro'];
const RESERVED_EXACT = ['/sitemap.xml', '/robots.txt'];
const isReserved = (p) => RESERVED_EXACT.includes(p) || RESERVED.some((r) => p === r || p.startsWith(`${r}/`));

function check(source, destination, existing) {
  if (!source.startsWith('/')) return 'source must start with /';
  if (/[?#*]/.test(source)) return 'source has a query, hash or *';
  if (isReserved(norm(source))) return 'source is reserved';
  if (existing.some((o) => norm(o) === norm(source))) return 'another redirect already uses this source';
  if (!destination.startsWith('/')) return 'destination must start with /';
  if (norm(destination) === norm(source)) return 'destination loops to source';
  return null;
}

const idFor = (source) => `redirect-framer-${createHash('sha1').update(norm(source)).digest('hex').slice(0, 12)}`;

const docs = ROWS.map(([source, destination, extra]) => ({
  _id: idFor(source),
  _type: 'redirect',
  source,
  destination,
  statusCode: 301,
  enabled: true,
  note: extra ? `${NOTE} (${extra})` : NOTE,
}));

const ids = docs.map((d) => d._id);
const existingDocs = await sanity.fetch(`*[_type == "redirect" || _id in $ids || _id in $draftIds]`, { ids, draftIds: ids.map((i) => `drafts.${i}`) });
const otherSources = existingDocs.filter((d) => !ids.includes(d._id.replace(/^drafts\./, ''))).map((d) => d.source);

let bad = 0;
for (const d of docs) {
  const err = check(d.source, d.destination, otherSources);
  const already = existingDocs.some((e) => e._id === d._id);
  console.log(`${err ? 'FAIL' : already ? 'SKIP' : 'OK  '}  ${d._id}  ${d.source} → ${d.destination}${err ? `  (${err})` : already ? '  (exists)' : ''}`);
  if (err) bad++;
}
if (bad) {
  console.error(`${bad} row(s) failed validation, nothing written.`);
  process.exit(1);
}

const date = new Date().toISOString().slice(0, 10);
const backupPath = path.join(ROOT, 'backups', `cutover-redirects-${date}.json`);
if (!WRITE) {
  console.log(`\nDry run. ${docs.length} docs. WRITE=1 to create (backup → ${path.relative(ROOT, backupPath)}).`);
  process.exit(0);
}

writeFileSync(backupPath, JSON.stringify({ takenAt: new Date().toISOString(), existingBefore: existingDocs, toCreate: docs }, null, 2));
console.log(`backup → ${path.relative(ROOT, backupPath)}`);
const tx = sanity.transaction();
for (const d of docs) tx.createIfNotExists(d);
const res = await tx.commit();
console.log(`committed ${res.results.length} mutation(s), transaction ${res.transactionId}`);
