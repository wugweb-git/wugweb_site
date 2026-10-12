#!/usr/bin/env node
/**
 * Seed asset.alt only where it is obvious and safe, and report the rest.
 *
 *   node scripts/seed-asset-alt.mjs            dry run: prints what it would set, writes the CSV
 *   WRITE=1 node scripts/seed-asset-alt.mjs    also patches (set alt, only where alt is empty)
 *
 * Seeds:
 *   - client logos      "{Client name} logo"   (asset matched by client.logoPath)
 *   - team portraits    "{Person name}"        (asset matched by person.photoPath)
 *   - brand/og-default  "Wugweb"               (the brand card; nothing more is claimed about its pixels)
 * Never overwrites an existing alt. Never invents alt for anything else.
 * Output: backups/asset-alt-missing.csv (image assets still without alt, grouped by folder)
 *         backups/asset-alt-seed-<date>.json (what was/would be written, with prior values)
 */
import { createClient } from '@sanity/client';
import { existsSync, readFileSync, mkdirSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const WRITE = process.env.WRITE === '1';
const env = { ...Object.fromEntries(
  (existsSync(path.join(ROOT, '.env')) ? readFileSync(path.join(ROOT, '.env'), 'utf8').split('\n') : [])
    .filter((l) => l.includes('=') && !l.trim().startsWith('#'))
    .map((l) => { const i = l.indexOf('='); return [l.slice(0, i).trim(), l.slice(i + 1).trim().replace(/^["']|["']$/g, '')]; }),
), ...process.env };
const token = env.SANITY_TOKEN || env.SANITY_API_TOKEN;
if (!token) { console.error('Missing SANITY_TOKEN / SANITY_API_TOKEN'); process.exit(1); }
const client = createClient({ projectId: 'splvhmk1', dataset: 'production', apiVersion: '2026-01-01', token, useCdn: false });

function toRel(v) {
  if (typeof v !== 'string') return null;
  let s = v.trim();
  if (!s || s.length > 600) return null;
  if (/^https?:\/\//i.test(s)) { try { s = new URL(s).pathname; } catch { return null; } }
  s = s.split(/[?#]/)[0];
  try { s = decodeURIComponent(s); } catch {}
  s = s.replace(/^\/+/, '').replace(/^assets\//, '');
  return s || null;
}

const [assets, clients, people] = await Promise.all([
  client.fetch(`*[_type=="asset" && !(_id in path("drafts.**"))]{_id,_rev,name,mediaType,relativePath,sitePath,alt,folder}`),
  client.fetch(`*[_type=="client" && !(_id in path("drafts.**")) && defined(logoPath)]{name,logoPath}`),
  client.fetch(`*[_type=="person" && !(_id in path("drafts.**")) && defined(photoPath)]{name,photoPath}`),
]);

const byRel = new Map();
for (const a of assets) for (const k of [toRel(a.relativePath), toRel(a.sitePath)]) if (k) byRel.set(k, a);

const wanted = new Map(); // asset _id -> { alt, why }
const conflicts = [];
const want = (rel, alt, why) => {
  const a = byRel.get(toRel(rel));
  if (!a) return;
  const prior = wanted.get(a._id);
  if (prior && prior.alt !== alt) { conflicts.push({ id: a._id, a: prior.alt, b: alt }); wanted.delete(a._id); wanted.set(a._id, { alt: null, why: 'conflict' }); return; }
  if (!prior) wanted.set(a._id, { alt, why });
};
for (const c of clients) if (c.name?.trim()) want(c.logoPath, `${c.name.trim()} logo`, 'client logo');
for (const p of people) if (p.name?.trim()) want(p.photoPath, p.name.trim(), 'team portrait');
for (const a of assets) if (/^(brand|og)\/(og-)?default\.(png|jpe?g|webp)$/i.test(a.relativePath || '') || /^brand\/og-default\./i.test(a.relativePath || '')) {
  if (!wanted.has(a._id)) wanted.set(a._id, { alt: 'Wugweb', why: 'brand/og-default' });
}

const todo = [];
for (const [id, w] of wanted) {
  const a = assets.find((x) => x._id === id);
  if (!w.alt || (a.alt || '').trim()) continue; // conflict or already has alt
  todo.push({ id, rev: a._rev, rel: a.relativePath, prior: a.alt ?? null, alt: w.alt, why: w.why });
}

console.log(`${WRITE ? 'WRITING' : 'DRY RUN'}: ${todo.length} assets to seed (${[...new Set(todo.map((t) => t.why))].map((w) => `${w}: ${todo.filter((t) => t.why === w).length}`).join(', ')}); ${conflicts.length} conflicts skipped`);
for (const t of todo.slice(0, 12)) console.log(`  ${t.rel}  ->  ${t.alt}`);
if (todo.length > 12) console.log(`  … ${todo.length - 12} more`);

const stamp = new Date().toISOString().slice(0, 10);
const backups = path.join(ROOT, 'backups');
mkdirSync(backups, { recursive: true });
writeFileSync(path.join(backups, `asset-alt-seed-${stamp}.json`), JSON.stringify({ write: WRITE, seeded: todo, conflicts }, null, 2));

if (WRITE && todo.length) {
  for (let i = 0; i < todo.length; i += 50) {
    const tx = client.transaction();
    for (const t of todo.slice(i, i + 50)) tx.patch(t.id, (p) => p.ifRevisionId(t.rev).set({ alt: t.alt }));
    await tx.commit();
  }
  console.log('Committed.');
}

// Report: images still without alt (SVG icons, video, audio skipped), grouped by folder.
const seeded = new Set(WRITE ? todo.map((t) => t.id) : []);
const missing = assets
  .filter((a) => a.mediaType === 'Image' && !(a.alt || '').trim() && !seeded.has(a._id))
  .map((a) => ({ folder: (a.relativePath || '').split('/')[0] || '(none)', rel: a.relativePath || '', name: a.name || '', id: a._id }))
  .sort((x, y) => x.folder.localeCompare(y.folder) || x.rel.localeCompare(y.rel));
const q = (s) => `"${String(s).replace(/"/g, '""')}"`;
writeFileSync(path.join(backups, 'asset-alt-missing.csv'), ['folder,relative_path,name,asset_id', ...missing.map((m) => [m.folder, m.rel, m.name, m.id].map(q).join(','))].join('\n') + '\n');
const counts = {};
for (const m of missing) counts[m.folder] = (counts[m.folder] || 0) + 1;
console.log(`\nImages still missing alt: ${missing.length}`, counts);
