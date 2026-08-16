#!/usr/bin/env node
/**
 * Remove duplicate empty hash blog posts and placeholder blog stubs.
 *
 * Before deleting the hash-ID posts, re-points any asset.linkedPost._ref to the
 * keeper post-<slug> so relations are preserved.
 *
 *   DRY-RUN (default): SANITY_TOKEN=sk... node scripts/cleanup-blogs.mjs
 *   APPLY:            SANITY_TOKEN=sk... node scripts/cleanup-blogs.mjs --apply
 */
import { createClient } from '@sanity/client';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const token = process.env.SANITY_TOKEN || process.env.SANITY_API_TOKEN;
if (!token) { console.error('Missing SANITY_TOKEN'); process.exit(1); }
const c = createClient({ projectId:'splvhmk1', dataset:'production', apiVersion:'2026-07-28', token, useCdn:false });
const APPLY = process.argv.includes('--apply');
const OUT_PATH = join(dirname(fileURLToPath(import.meta.url)), '../docs/cleanup-blogs-plan.json');

const normalize = (s = '') => String(s).toLowerCase().replace(/[^a-z0-9]/g, '').trim();

function countBodyWords(body) {
  if (!Array.isArray(body)) return 0;
  return body
    .filter(b => b?._type === 'block')
    .flatMap(b => (b.children || []).map(ch => String(ch?.text || '').split(/\s+/).filter(Boolean)))
    .flat().length;
}

async function fetchAll() {
  const posts = await c.fetch(`*[_type == "post"] { _id, title, "slug": slug.current, body, excerpt }`);
  const assets = await c.fetch(`*[_type == "asset" && defined(linkedPost)] { _id, linkedPost, fileName }`);
  return { posts, assets };
}

// Map of assetId -> keeper post id (asset references a hash that will be deleted)
function buildRepointMap({ posts, assets }) {
  const published = posts.filter(d => !d._id.startsWith('drafts.'));
  const bySlug = {};
  for (const p of published) { const s = normalize(p.slug); if (s) (bySlug[s] = bySlug[s] || []).push(p); }

  const repoint = [];
  for (const a of assets) {
    const refId = a.linkedPost?._ref;
    if (!refId) continue;
    const hashDoc = published.find(d => d._id === refId);
    if (!hashDoc || hashDoc._id.startsWith('post-')) continue; // not a hash
    const slug = normalize(hashDoc.slug);
    const keepers = (bySlug[slug] || []).filter(d => d._id.startsWith('post-'));
    if (!keepers.length) {
      console.log(`  ⚠️ asset ${a._id} references hash ${refId}; no post-* keeper for slug "${slug || '(none)'}"`);
      continue;
    }
    const keeper = keepers[0];
    if (keeper._id !== refId) repoint.push({ assetId: a._id, from: refId, to: keeper._id, fileName: a.fileName });
  }
  return repoint;
}

// Empty hash posts (hash id, empty body, matching keeper exists)
function planHashPostDeletes(posts) {
  const published = posts.filter(d => !d._id.startsWith('drafts.'));
  const bySlug = {};
  for (const p of published) { const s = normalize(p.slug); if (s) (bySlug[s] = bySlug[s] || []).push(p); }
  const deletions = [];
  for (const d of published) {
    const isHash = !d._id.startsWith('post-');
    if (!isHash) continue;
    const words = countBodyWords(d.body);
    if (words > 0) continue; // skip if it carries content
    const slug = normalize(d.slug);
    const keepers = (bySlug[slug] || []).filter(k => k._id.startsWith('post-'));
    if (!keepers.length) continue;
    deletions.push({ _id: d._id, title: d.title, slug: d.slug, reason: 'empty hash duplicate (keeper: ' + keepers[0]._id + ')' });
  }
  return deletions;
}

// Placeholder stubs: post-* with < 25 words and no excerpt
function planPlaceholderPosts(posts) {
  const published = posts.filter(d => !d._id.startsWith('drafts.'));
  const deletions = [];
  for (const d of published) {
    if (!d._id.startsWith('post-')) continue;
    const words = countBodyWords(d.body);
    if (words < 25 && (!d.excerpt || d.excerpt.trim().length < 20)) {
      deletions.push({ _id: d._id, title: d.title, slug: d.slug, reason: 'placeholder stub (short body, no excerpt)' });
    }
  }
  return deletions;
}

async function isReferenced(id) {
  const n = await c.fetch(`count(*[references($id)])`, { id });
  return n > 0;
}

async function main() {
  console.log(`\n🧹 Blog dup/stub cleanup  [${APPLY ? 'APPLY' : 'DRY-RUN'}]\n`);
  const { posts, assets } = await fetchAll();

  const repoint = buildRepointMap({ posts, assets });
  const hashCandidates = planHashPostDeletes(posts);
  const placeholderDeletes = planPlaceholderPosts(posts);

  // All hash posts we'll delete must have their asset refs re-pointed (or no refs)
  const hashDeletes = [];
  for (const d of hashCandidates) {
    const hasAsset = assets.some(a => a.linkedPost?._ref === d._id);
    if (hasAsset && !repoint.some(r => r.from === d._id)) {
      console.log(`  skip (has asset ref not repointed): ${d._id}`);
      continue;
    }
    hashDeletes.push(d);
  }

  // Placeholder stubs: skip if referenced by anything
  const placeholderSafe = [];
  for (const p of placeholderDeletes) {
    if (await isReferenced(p._id)) { console.log(`  skip (referenced): ${p._id}`); continue; }
    placeholderSafe.push(p);
  }

  const deletions = [...hashDeletes, ...placeholderSafe];
  const out = {
    mode: APPLY ? 'applied' : 'dry-run',
    generatedAt: new Date().toISOString(),
    stats: { hashDupDeletes: hashDeletes.length, placeholderDeletes: placeholderSafe.length, totalDeletes: deletions.length, repointedAssets: repoint.length },
    repoint,
    deletions,
  };
  fs.writeFileSync(OUT_PATH, JSON.stringify(out, null, 2), 'utf8');

  console.log(`Re-point assets:      ${repoint.length}`);
  for (const r of repoint) console.log(`  ${r.assetId}: ${r.from} -> ${r.to}`);
  console.log(`\nHash dup deletes:     ${hashDeletes.length}`);
  console.log(`Placeholder deletes:  ${placeholderSafe.length}`);
  console.log(`Total deletes:        ${deletions.length}`);
  console.log(`\nDeletions:`);
  for (const d of deletions) console.log(`  ${d._id} | "${d.title}" | ${d.reason}`);
  console.log(`\nPlan written to ${OUT_PATH}`);

  if (!APPLY) { console.log('\n⚠️ DRY RUN — nothing changed. Re-run with --apply.'); return; }

  console.log('\n🚀 Executing...');
  let ok = 0, fail = 0;
  for (const r of repoint) {
    try {
      await c.patch(r.assetId).set({ linkedPost: { _type: 'reference', _ref: r.to } }).commit();
      console.log(`  ✅ repoint ${r.assetId}`); ok++;
    } catch (e) { console.error(`  ❌ repoint ${r.assetId}: ${e.message?.substring(0,100)}`); fail++; }
    await new Promise(r2 => setTimeout(r2, 60));
  }
  for (const d of deletions) {
    try { await c.delete(d._id); console.log(`  ✅ delete ${d._id}`); ok++; }
    catch (e) { console.error(`  ❌ delete ${d._id}: ${e.message?.substring(0,100)}`); fail++; }
    await new Promise(r2 => setTimeout(r2, 60));
  }
  console.log(`\nDone. OK=${ok}, fail=${fail}`);
}

main().catch(e => { console.error('❌', e); process.exit(1); });