#!/usr/bin/env node
/**
 * PLAN ONLY. Builds the old_key -> new_key map for public/assets/{framer,uncode,more}.
 * Moves nothing, writes nothing to Sanity or R2. Output: backups/asset-reorg-plan.csv
 * and backups/asset-reorg-summary.md.
 *
 * Reference engine mirrors scripts/scan-asset-usage.mjs (value-matching over every
 * Sanity doc incl. drafts, plus /assets/ literals, CSS url() and service-media in src/),
 * but records WHO references each file instead of only whether anything does.
 */
import { createClient } from '@sanity/client';
import { createHash } from 'node:crypto';
import { existsSync, readFileSync, writeFileSync, mkdirSync, statSync, readdirSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const ASSETS = path.join(ROOT, 'public', 'assets');
const SOURCE_DIRS = ['framer', 'uncode', 'more'];

const dot = existsSync(path.join(ROOT, '.env'))
  ? Object.fromEntries(readFileSync(path.join(ROOT, '.env'), 'utf8').split('\n').filter((l) => l.includes('=') && !l.trim().startsWith('#')).map((l) => { const i = l.indexOf('='); return [l.slice(0, i).trim(), l.slice(i + 1).trim().replace(/^["']|["']$/g, '')]; }))
  : {};
const token = process.env.SANITY_TOKEN || process.env.SANITY_API_TOKEN || dot.SANITY_TOKEN || dot.SANITY_API_TOKEN;
const client = createClient({ projectId: 'splvhmk1', dataset: 'production', apiVersion: '2026-01-01', token, useCdn: false });

const toRel = (v) => {
  if (typeof v !== 'string') return null;
  let s = v.trim();
  if (!s || s.length > 600) return null;
  if (/^https?:\/\//i.test(s)) { try { s = new URL(s).pathname; } catch { return null; } }
  s = s.split(/[?#]/)[0];
  try { s = decodeURIComponent(s); } catch {}
  s = s.replace(/^\/+/, '').replace(/^assets\//, '');
  return s || null;
};
const slugify = (s) => String(s).toLowerCase().replace(/&/g, ' and ').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');

// ── Files on disk ───────────────────────────────────────────────────────────
function walkDisk(dir, out = []) {
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walkDisk(p, out);
    else if (e.name !== '.DS_Store') out.push(p);
  }
  return out;
}
const files = SOURCE_DIRS.flatMap((d) => walkDisk(path.join(ASSETS, d))).map((p) => ({
  rel: path.relative(ASSETS, p).split(path.sep).join('/'),
  abs: p,
  size: statSync(p).size,
}));
const fileSet = new Set(files.map((f) => f.rel));
const allDisk = walkDisk(ASSETS).map((p) => path.relative(ASSETS, p).split(path.sep).join('/'));
const diskLower = new Map(allDisk.map((r) => [r.toLowerCase(), r]));

// ── References: Sanity (published + drafts) ─────────────────────────────────
const refs = new Map(); // rel -> [{kind,docId,docType,slug,field,label,doc?}]
const addRef = (rel, r) => { if (!refs.has(rel)) refs.set(rel, []); refs.get(rel).push(r); };
const known = new Set([...allDisk]);
const record = (raw, r) => {
  const rel = toRel(raw);
  if (rel && known.has(rel)) addRef(rel, r);
};
const SKIP = new Set(['asset', 'syncStatus', 'project']);
const types = (await client.fetch(`array::unique(*[]._type)`)).filter((t) => !SKIP.has(t) && !t.startsWith('sanity.') && !t.startsWith('system.'));
const walk = (node, trail, visit) => {
  if (typeof node === 'string') return visit(node, trail);
  if (Array.isArray(node)) return node.forEach((n, i) => walk(n, `${trail}[${i}]`, visit));
  if (node && typeof node === 'object') for (const [k, v] of Object.entries(node)) if (!k.startsWith('_')) walk(v, trail ? `${trail}.${k}` : k, visit);
};
let docCount = 0;
for (const type of types) {
  const docs = await client.fetch(`*[_type==$t]`, { t: type });
  for (const doc of docs) {
    docCount++;
    const slug = doc.slug?.current || doc.pageId || slugify(doc.name || doc.client || doc.title || doc._id);
    walk(doc, '', (v, field) => record(v, { kind: 'content', docId: doc._id, docType: type, slug, field, label: doc.title || doc.name || doc.client || doc.pageId || doc._id }));
  }
}

// ── References: site code ───────────────────────────────────────────────────
const codeExt = /\.(astro|ts|tsx|js|mjs|jsx|css)$/;
const skipCode = /\.(stories|test|spec)\.[a-z]+$/;
const walkCode = (dir, out = []) => { for (const e of readdirSync(dir, { withFileTypes: true })) { const p = path.join(dir, e.name); if (e.isDirectory()) walkCode(p, out); else if (codeExt.test(e.name) && !skipCode.test(e.name)) out.push(p); } return out; };
const codeFiles = [...walkCode(path.join(ROOT, 'src')), ...['public/sw.js', 'public/manifest.webmanifest'].map((f) => path.join(ROOT, f)).filter(existsSync)];
let templated = 0;
for (const f of codeFiles) {
  const text = readFileSync(f, 'utf8');
  const label = path.relative(ROOT, f);
  for (const m of text.matchAll(/["'`](\/?assets\/[^"'`\s]+?)["'`]/g)) {
    if (m[1].includes('${')) { templated++; continue; }
    record(m[1], { kind: 'code', file: label, field: 'literal' });
  }
  for (const m of text.matchAll(/url\(\s*["']?(\/assets\/[^)"'\s]+)["']?\s*\)/g)) record(m[1], { kind: 'code', file: label, field: 'css' });
  if (label === 'src/lib/service-media.ts') {
    for (const m of text.matchAll(/\{\s*dir:\s*(['"])([^'"]+)\1\s*,\s*file:\s*(['"])([^'"]+)\3\s*(,\s*noPoster:\s*true)?/g)) {
      record(`${m[2]}/${m[4]}.mp4`, { kind: 'code', file: label, field: 'service-media' });
      if (!m[5]) record(`${m[2]}/posters/${m[4]}.webp`, { kind: 'code', file: label, field: 'service-media' });
    }
  }
}

// ── Content hashes (for exact-duplicate detection across the whole tree) ───
const sha = (p) => createHash('sha1').update(readFileSync(p)).digest('hex');
const hashByRel = new Map();
for (const f of files) hashByRel.set(f.rel, sha(f.abs));
const wantedHashes = new Set(hashByRel.values());
const identicalElsewhere = new Map(); // hash -> [rel outside source dirs]
for (const r of allDisk) {
  if (SOURCE_DIRS.some((d) => r.startsWith(d + '/'))) continue;
  const p = path.join(ASSETS, r);
  const size = statSync(p).size;
  if (!files.some((f) => f.size === size)) continue; // cheap prefilter
  const h = sha(p);
  if (wantedHashes.has(h)) identicalElsewhere.set(h, [...(identicalElsewhere.get(h) || []), r]);
}

// ── Classification ──────────────────────────────────────────────────────────
const clientSlugById = new Map();
for (const c of await client.fetch(`*[_type=="client"]{_id,name,"slug":slug.current}`)) clientSlugById.set(c._id.replace(/^drafts\./, ''), c.slug || slugify(c.name || c._id));
const stem = (rel) => rel.replace(/\.[^.]+$/, '');
const base = (rel) => rel.split('/').pop();
const ext = (rel) => (rel.match(/\.[^.]+$/) || [''])[0];

const own = (rel) => refs.get(rel) || [];
const classify = (rel) => {
  const rs = own(rel);
  const content = rs.filter((r) => r.kind === 'content');
  const code = rs.filter((r) => r.kind === 'code');
  const by = (t) => content.filter((r) => r.docType === t);
  const uniq = (list, key) => [...new Set(list.map(key))];
  const cs = uniq(by('caseStudy'), (r) => r.slug);
  const posts = uniq(by('post'), (r) => r.slug);
  const clients = uniq(by('client'), (r) => r.docId.replace(/^drafts\./, ''));
  const people = by('person').concat(by('testimonial'));
  const pages = uniq(by('singletonPage'), (r) => r.slug);
  const other = content.filter((r) => !['caseStudy', 'post', 'client', 'person', 'testimonial', 'singletonPage'].includes(r.docType));
  const kinds = [cs.length && 'caseStudy', posts.length && 'post', clients.length && 'client', people.length && 'team', pages.length && 'page', other.length && 'other', code.length && 'code'].filter(Boolean);
  const note = [];
  let owner_type = 'unreferenced', owner_slug = '', target = '', unsure = false;

  if (!rs.length) return { owner_type, owner_slug, target, unsure, note: '' };

  if (cs.length >= 1) {
    owner_type = 'caseStudy'; owner_slug = cs[0];
    target = `work/${cs[0]}/${base(rel)}`;
    if (cs.length > 1) { unsure = true; note.push(`shared by ${cs.length} case studies: ${cs.join(', ')}`); }
  } else if (posts.length >= 1) {
    owner_type = 'post'; owner_slug = posts[0];
    target = `blog/${base(rel)}`;
    if (posts.length > 1) { unsure = true; note.push(`shared by ${posts.length} posts`); }
  } else if (clients.length >= 1 && !other.length) {
    owner_type = 'client'; owner_slug = clientSlugById.get(clients[0]) || clients[0];
    target = `logos/${owner_slug}${ext(rel)}`;
    if (clients.length > 1) { unsure = true; note.push('shared by several clients'); }
  } else if (people.length >= 1 && !other.length) {
    owner_type = 'team'; owner_slug = people[0].slug;
    target = `about/${base(rel)}`;
  } else if (pages.length >= 1 && !other.length) {
    if (pages.includes('about')) { owner_type = 'page'; owner_slug = 'about'; target = `about/${base(rel)}`; }
    else { owner_type = 'page'; owner_slug = pages[0]; target = `site/${pages[0]}/${base(rel)}`; unsure = true; note.push('proposes new site/ folder'); }
  } else if (other.length) {
    owner_type = other[0].docType; owner_slug = other[0].slug; target = ''; unsure = true; note.push(`${other[0].docType} reference: no target folder proposed`);
  } else {
    owner_type = 'src'; owner_slug = ''; target = `site/${base(rel)}`; unsure = true; note.push('referenced by src/ only: keep in place or move to site/');
  }
  if (kinds.length > 1) { unsure = true; note.push(`mixed owners: ${kinds.join('+')}`); }
  if (code.length && owner_type !== 'src') { unsure = true; note.push('also referenced in src/'); }
  return { owner_type, owner_slug, target, unsure, note: note.join('; ') };
};

const rows = files.map((f) => ({ f, c: classify(f.rel) }));

// Posters / sidecars follow the video they belong to.
const byRel = new Map(rows.map((r) => [r.f.rel, r]));
for (const r of rows) {
  if (r.c.owner_type !== 'unreferenced') continue;
  const m = r.f.rel.match(/^(.*)-poster\.webp$/);
  const sibling = m && [...['.mp4', '.webm', '.mov']].map((e) => byRel.get(m[1] + e)).find(Boolean);
  if (sibling && sibling.c.target) {
    r.c = { ...sibling.c, target: stem(sibling.c.target) + '-poster.webp', note: `poster of ${base(sibling.f.rel)}` + (sibling.c.note ? `; ${sibling.c.note}` : '') };
  }
}

// Collisions
const targetCount = new Map();
for (const r of rows) if (r.c.target) targetCount.set(r.c.target.toLowerCase(), (targetCount.get(r.c.target.toLowerCase()) || 0) + 1);
for (const r of rows) {
  const t = r.c.target;
  r.collision = '';
  if (!t) continue;
  const reasons = [];
  if (diskLower.has(t.toLowerCase()) && !fileSet.has(diskLower.get(t.toLowerCase()))) reasons.push('exists in tree');
  if (targetCount.get(t.toLowerCase()) > 1) reasons.push('two sources, one target');
  if (t === r.f.rel) reasons.push('already there');
  r.collision = reasons.length ? 'yes' : 'no';
  r.collisionWhy = reasons.join(', ');
}

// ── Output ──────────────────────────────────────────────────────────────────
const q = (s) => `"${String(s ?? '').replace(/"/g, '""')}"`;
const refText = (rel) => [...new Set(own(rel).map((r) => (r.kind === 'content' ? `${r.docId} (${r.field.split(/[.[]/)[0]})` : r.file)))].join('; ');
const header = ['old_key', 'new_key', 'owner_type', 'owner_slug', 'size_bytes', 'referenced_by', 'collision', 'unsure', 'identical_to', 'note'];
const csv = [header.join(',')];
for (const { f, c, collision, collisionWhy } of rows.sort((a, b) => a.f.rel.localeCompare(b.f.rel))) {
  const dupes = identicalElsewhere.get(hashByRel.get(f.rel)) || [];
  csv.push([
    `assets/${f.rel}`, c.target ? `assets/${c.target}` : '', c.owner_type, c.owner_slug, f.size, refText(f.rel),
    c.target ? collision : '', c.unsure ? 'yes' : 'no', dupes.slice(0, 3).map((d) => `assets/${d}`).join('; '),
    [c.note, collisionWhy].filter(Boolean).join('; '),
  ].map(q).join(','));
}
mkdirSync(path.join(ROOT, 'backups'), { recursive: true });
writeFileSync(path.join(ROOT, 'backups', 'asset-reorg-plan.csv'), csv.join('\n') + '\n');

const sum = (list) => list.reduce((a, r) => a + r.f.size, 0);
const mb = (b) => (b / 1048576).toFixed(1) + ' MiB';
const byFolder = {};
for (const r of rows) { const k = r.c.target ? r.c.target.split('/')[0] : r.c.owner_type === 'unreferenced' ? '(unreferenced)' : '(no target)'; (byFolder[k] ||= []).push(r); }
const dupRows = rows.filter((r) => identicalElsewhere.has(hashByRel.get(r.f.rel)));
const lines = [];
lines.push(`# Asset reorganisation plan (PLAN ONLY, nothing moved)`, '', `Generated ${new Date().toISOString()}. ${files.length} files, ${mb(sum(rows))} under ${SOURCE_DIRS.join(', ')}. ${docCount} Sanity docs (incl. drafts) and ${codeFiles.length} code files scanned. ${templated} templated /assets/\${…} literals in src/ cannot be resolved statically.`, '', '## Per source folder');
for (const d of SOURCE_DIRS) { const rs = rows.filter((r) => r.f.rel.startsWith(d + '/')); lines.push(`- ${d}/: ${rs.length} files, ${mb(sum(rs))}, unreferenced ${rs.filter((r) => r.c.owner_type === 'unreferenced').length}`); }
lines.push('', '## Counts per target folder');
for (const [k, rs] of Object.entries(byFolder).sort((a, b) => b[1].length - a[1].length)) lines.push(`- ${k}: ${rs.length} files, ${mb(sum(rs))}`);
lines.push('', '## By owner type');
const byOwner = {}; for (const r of rows) (byOwner[r.c.owner_type] ||= []).push(r);
for (const [k, rs] of Object.entries(byOwner).sort((a, b) => b[1].length - a[1].length)) lines.push(`- ${k}: ${rs.length}`);
const coll = rows.filter((r) => r.collision === 'yes');
const unsure = rows.filter((r) => r.c.unsure);
lines.push('', `## Collisions: ${coll.length}`, ...coll.slice(0, 40).map((r) => `- assets/${r.f.rel} -> assets/${r.c.target} (${r.collisionWhy})`));
lines.push('', `## Unsure: ${unsure.length}`, ...unsure.slice(0, 60).map((r) => `- assets/${r.f.rel}: ${r.c.note}`));
lines.push('', `## Byte-identical to a file elsewhere in the tree: ${dupRows.length} (${mb(sum(dupRows))})`, 'Copying these would add R2 storage for no reason; the apply step could repoint at the existing key instead.');
const unref = rows.filter((r) => r.c.owner_type === 'unreferenced');
lines.push('', `## Unreferenced: ${unref.length} files, ${mb(sum(unref))}`, ...unref.map((r) => `- assets/${r.f.rel} (${r.f.size} B)`));
writeFileSync(path.join(ROOT, 'backups', 'asset-reorg-summary.md'), lines.join('\n') + '\n');
console.log(lines.slice(0, lines.findIndex((l) => l.startsWith('## Collisions'))).join('\n'));
console.log(`\nCollisions: ${coll.length} · Unsure: ${unsure.length} · Byte-identical elsewhere: ${dupRows.length} · Unreferenced: ${unref.length}`);
