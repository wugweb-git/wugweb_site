#!/usr/bin/env node
/**
 * Owner decision 2026-10-13: the case study is "musiclinkd" (Notion is the
 * source). Renames caseStudy-audiofolio's slug and canonicalUrl together
 * (changing one alone makes work/[slug].astro 301 to a dead URL) and adds a
 * 301 redirect doc /work/audiofolio → /work/musiclinkd. Doc _id unchanged.
 * Dry run by default; WRITE=1 applies (backup first, ifRevisionId).
 */
import { readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { createClient } from '@sanity/client';

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const WRITE = process.env.WRITE === '1';
const env = Object.fromEntries(readFileSync(path.join(ROOT, '.env'), 'utf8').split('\n').filter((l) => /^[A-Z_]+=/.test(l)).map((l) => { const i = l.indexOf('='); return [l.slice(0, i), l.slice(i + 1).trim().replace(/^["']|["']$/g, '')]; }));
const sanity = createClient({ projectId: 'splvhmk1', dataset: 'production', apiVersion: '2026-01-01', token: env.SANITY_TOKEN || env.SANITY_API_TOKEN, useCdn: false });

const ID = 'caseStudy-audiofolio';
const REDIRECT = { _id: 'redirect-notion-audiofolio-musiclinkd', _type: 'redirect', source: '/work/audiofolio', destination: '/work/musiclinkd', statusCode: 301, enabled: true, note: 'Slug renamed audiofolio → musiclinkd (owner, Notion is the source) 2026-10-13' };

const doc = await sanity.getDocument(ID);
if (!doc) throw new Error(`${ID} not found`);
const clash = await sanity.fetch(`*[_type == "caseStudy" && slug.current == "musiclinkd" && _id != $id][0]._id`, { id: ID });
if (clash) throw new Error(`slug musiclinkd already used by ${clash}`);
const dupe = await sanity.fetch(`*[_type == "redirect" && lower(source) == "/work/audiofolio"][0]._id`);
console.log(`${ID} rev ${doc._rev}\n  before: slug=${doc.slug?.current} canonicalUrl=${doc.canonicalUrl}\n  after:  slug=musiclinkd canonicalUrl=/work/musiclinkd`);
console.log(`redirect: ${REDIRECT.source} → ${REDIRECT.destination} 301${dupe ? ` (exists: ${dupe}, skipped)` : ''}`);
if (!WRITE) { console.log('Dry run. WRITE=1 to apply.'); process.exit(0); }

const backup = path.join(ROOT, 'backups', `rename-audiofolio-to-musiclinkd-${new Date().toISOString().slice(0, 10)}.json`);
writeFileSync(backup, JSON.stringify({ takenAt: new Date().toISOString(), doc, redirect: REDIRECT }, null, 2));
console.log(`backup → ${path.relative(ROOT, backup)}`);
const tx = sanity.transaction();
if (!dupe) tx.createIfNotExists(REDIRECT);
tx.patch(ID, (p) => p.ifRevisionId(doc._rev).set({ 'slug.current': 'musiclinkd', canonicalUrl: '/work/musiclinkd' }));
const res = await tx.commit();
const after = await sanity.getDocument(ID);
console.log(`committed (${res.transactionId}); now slug=${after.slug.current} canonicalUrl=${after.canonicalUrl}`);
