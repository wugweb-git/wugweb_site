#!/usr/bin/env node
/**
 * Move the hard-coded site media into Sanity fields (additive; only fills empty fields).
 *   node scripts/seed-site-media-cms.mjs          read-only
 *   WRITE=1 node scripts/seed-site-media-cms.mjs  backup to backups/site-media-cms-2026-10-12.json, then patch with ifRevisionId
 * Sets: singletonPage home/about heroPath + heroPosterPath (+ about sectionImagePath),
 *       client.showInLogoBand for the 13 curated logos, service.tagVideoPath for the six pillars,
 *       siteSettings.ogImagePath. Values come from src/lib/site-media.json.
 */
import { createClient } from '@sanity/client';
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const WRITE = process.env.WRITE === '1';
const dot = Object.fromEntries(readFileSync(path.join(ROOT, '.env'), 'utf8').split('\n').filter((l) => l.includes('=') && !l.trim().startsWith('#')).map((l) => { const i = l.indexOf('='); return [l.slice(0, i).trim(), l.slice(i + 1).trim().replace(/^["']|["']$/g, '')]; }));
const c = createClient({ projectId: 'splvhmk1', dataset: 'production', apiVersion: '2026-01-01', token: process.env.SANITY_TOKEN || dot.SANITY_TOKEN || dot.SANITY_API_TOKEN, useCdn: false });
const reg = JSON.parse(readFileSync(path.join(ROOT, 'src/lib/site-media.json'), 'utf8'));
const sp = (p) => '/assets/' + p.replace(/^\/?(assets\/)?/, '');

const want = []; // { id, set }
const home = await c.fetch(`*[_type=="singletonPage" && pageId=="home"][0]{_id,_rev,heroPath,heroPosterPath}`);
const about = await c.fetch(`*[_type=="singletonPage" && pageId=="about"][0]{_id,_rev,heroPath,heroPosterPath,sectionImagePath}`);
const settings = await c.fetch(`*[_type=="siteSettings"][0]{_id,_rev,ogImagePath}`);
const services = await c.fetch(`*[_type=="service" && slug.current in $s]{_id,_rev,"slug":slug.current,tagVideoPath}`, { s: Object.keys(reg.serviceTags) });
const clients = await c.fetch(`*[_type=="client" && defined(logoPath)]{_id,_rev,name,logoPath,showInLogoBand}`);
const norm = (v) => String(v || '').replace(/^\/?(assets\/)?/, '');

const fill = (doc, fields) => { const set = {}; for (const [k, v] of Object.entries(fields)) if (!doc[k]) set[k] = v; if (Object.keys(set).length) want.push({ id: doc._id, rev: doc._rev, before: Object.fromEntries(Object.keys(set).map((k) => [k, doc[k] ?? null])), set }); };
fill(home, { heroPath: sp(reg.home.heroVideo), heroPosterPath: sp(reg.home.heroPoster) });
fill(about, { heroPath: sp(reg.about.messageVideo), heroPosterPath: sp(reg.about.messagePoster), sectionImagePath: sp(reg.about.cultureImage) });
fill(settings, { ogImagePath: sp(reg.seo.ogDefault) });
for (const s of services) fill(s, { tagVideoPath: sp(reg.serviceTags[s.slug]) });
// Match by file name too: some clients point at the byte-identical framer/ copy of the same logo.
const base = (v) => norm(v).split('/').pop();
const unmatched = reg.home.clientLogos.filter((l) => !clients.some((cl) => base(cl.logoPath) === base(l.path)));
// One client per curated logo. When two clients share a file (IndusNinja / IndusInd Bank), prefer the curated name.
const nn = (v) => String(v || '').toLowerCase().replace(/[^a-z0-9]+/g, '');
for (const l of reg.home.clientLogos) {
  const cands = clients.filter((cl) => base(cl.logoPath) === base(l.path));
  const cl = cands.find((x) => nn(x.name) === nn(l.name) || nn(x.name).startsWith(nn(l.name))) || cands[0];
  if (cl && cl.showInLogoBand !== true) want.push({ id: cl._id, rev: cl._rev, before: { showInLogoBand: cl.showInLogoBand ?? null }, set: { showInLogoBand: true } });
}

console.log(WRITE ? 'WRITE' : 'READ-ONLY', `- ${want.length} patches`);
for (const w of want) console.log(' ', w.id, JSON.stringify(w.set));
if (unmatched.length) console.log('Logos in the curated set with no client doc:', unmatched.map((l) => `${l.name} (${l.path})`).join(', '));
const flagged = new Set(want.filter((w) => 'showInLogoBand' in w.set).map((w) => w.id));
console.log(`logo band: ${flagged.size} clients to flag of ${reg.home.clientLogos.length} curated`);
if (WRITE) {
  mkdirSync(path.join(ROOT, 'backups'), { recursive: true });
  writeFileSync(path.join(ROOT, 'backups', 'site-media-cms-2026-10-12.json'), JSON.stringify(want, null, 2));
  const tx = c.transaction();
  for (const w of want) tx.patch(w.id, (p) => p.ifRevisionId(w.rev).set(w.set));
  await tx.commit();
  console.log('Committed.');
}
