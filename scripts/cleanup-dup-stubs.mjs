#!/usr/bin/env node
/**
 * Remove duplicates and stubs in Sanity for caseStudy + post.
 *
 * Safety: ALWAYS checks references before deleting. If a document is referenced
 * elsewhere it is left in place (reported, not deleted).
 *
 *   DRY-RUN (default): SANITY_TOKEN=sk... node scripts/cleanup-dup-stubs.mjs
 *   APPLY:            SANITY_TOKEN=sk... node scripts/cleanup-dup-stubs.mjs --apply
 *
 * Strategy:
 *  CASE STUDIES
 *    - For same title, prefer the doc with the LONGEST slug (the descriptive
 *      canonical for bodyContent). Delete the short-slug duplicate if the
 *      canonical exists and the duplicate carries no content the canonical lacks.
 *  POSTS (duplicate hash IDs)
 *    - Hash-ID published posts (e.g. `sHwg*`, `tiq3*`, `sBGz*`) that are exact
 *      duplicates of a real `post-<slug>` keeper with body content are deleted.
 *  POSTS (placeholder stubs)
 *    - `post-<slug>` docs with < 25 body words and no real excerpt are deleted.
 */
import { createClient } from '@sanity/client';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const token = process.env.SANITY_TOKEN || process.env.SANITY_API_TOKEN;
if (!token) { console.error('Missing SANITY_TOKEN (or SANITY_API_TOKEN) in environment'); process.exit(1); }

const c = createClient({ projectId: 'splvhmk1', dataset: 'production', apiVersion: '2026-07-28', token, useCdn: false });
const __dirname = dirname(fileURLToPath(import.meta.url));
const APPLY = process.argv.includes('--apply');
const OUT_PATH = join(__dirname, '../docs/cleanup-dup-stubs-plan.json');

const normalize = (s = '') => String(s).toLowerCase().replace(/[^a-z0-9]/g, '').trim();

function countBodyWords(body) {
  if (!Array.isArray(body)) return 0;
  return body
    .filter(b => b?._type === 'block')
    .flatMap(b => (b.children || []).map(ch => String(ch?.text || '').split(/\s+/).filter(Boolean)))
    .flat().length;
}

async function fetchDocs() {
  const [caseStudies, posts] = await Promise.all([
    c.fetch(`*[_type == "caseStudy"] { _id, title, "slug": slug.current, bodyContent, body, _updatedAt }`),
    c.fetch(`*[_type == "post"] { _id, title, "slug": slug.current, body, excerpt, category, tags, _updatedAt }`),
  ]);
  return { caseStudies, posts };
}

async function isReferenced(id) {
  const count = await c.fetch(`count(*[references($id)])`, { id });
  return count > 0;
}

// CASE STUDIES: duplicate short-slug vs descriptive canonical
function planCaseStudies(docs) {
  const plan = [];
  const published = docs.filter(d => !d._id.startsWith('drafts.'));
  const byTitle = {};
  for (const d of published) {
    const t = normalize(d.title);
    if (t) (byTitle[t] = byTitle[t] || []).push(d);
  }

  for (const [title, group] of Object.entries(byTitle)) {
    if (group.length < 2) continue;
    // Prefer the doc with the longer (descriptive) slug as canonical
    group.sort((a, b) => (b.slug || '').length - (a.slug || '').length);
    const canonical = group[0];
    const canonWords = countBodyWords(canonical.bodyContent || canonical.body);
    for (const d of group.slice(1)) {
      const dupWords = countBodyWords(d.bodyContent || d.body);
      // Keep the doc if it is the only one carrying content
      if (dupWords > 0 && canonWords === 0) continue;
      const reason = !d.slug || d.slug.trim().toLowerCase() === 'none'
        ? 'malformed slug (None)'
        : 'duplicate short-slug (canonical keeps bodyContent)';
      plan.push({ _type: 'caseStudy', _id: d._id, title: d.title, slug: d.slug, keeper: canonical._id, words: dupWords, reason });
    }
  }
  return plan;
}

// POST hash-id duplicates of a post-<slug> with content
function planPostHashDups(posts) {
  const plan = [];
  const published = posts.filter(d => !d._id.startsWith('drafts.'));
  const bySlug = {};
  for (const d of published) { const s = normalize(d.slug); if (s) (bySlug[s] = bySlug[s] || []).push(d); }

  for (const [slug, group] of Object.entries(bySlug)) {
    const keepers = group.filter(d => d._id.startsWith('post-') && countBodyWords(d.body) > 0);
    if (!keepers.length) continue;
    for (const d of group) {
      const isHash = !d._id.startsWith('post-');
      if (isHash && countBodyWords(d.body) === 0) {
        plan.push({ _type: 'post', _id: d._id, title: d.title, slug, keeper: keepers[0]._id, words: 0, reason: `duplicate empty hash ID (kept: ${keepers[0]._id})` });
      }
    }
  }
  return plan;
}

// POST placeholder stubs
function planPlaceholderPosts(posts) {
  const plan = [];
  const published = posts.filter(d => !d._id.startsWith('drafts.'));
  for (const d of published) {
    if (!d._id.startsWith('post-')) continue;
    const words = countBodyWords(d.body);
    const stubish = words < 25 && (!d.excerpt || d.excerpt.trim().length < 20);
    if (stubish) {
      plan.push({ _type: 'post', _id: d._id, title: d.title, slug: d.slug, words, reason: 'placeholder stub (empty/short body)' });
    }
  }
  return plan;
}

// ── main ──
async function main() {
  console.log(`\n🧹 Sanity dup/stub cleanup  [${APPLY ? 'APPLY' : 'DRY-RUN'}]\n`);

  const { caseStudies, posts } = await fetchDocs();

  const csPlan = planCaseStudies(caseStudies);
  const hashPlan = planPostHashDups(posts);
  const stubPlan = planPlaceholderPosts(posts);

  // Combine all candidates, dedupe by id
  const all = [...csPlan, ...hashPlan, ...stubPlan];
  const byId = new Map();
  for (const p of all) if (!byId.has(p._id)) byId.set(p._id, p);
  const candidates = [...byId.values()];

  console.log('Checking references...');
  const referenced = [];
  const deletable = [];
  for (const p of candidates) {
    if (await isReferenced(p._id)) { referenced.push(p); continue; }
    deletable.push(p);
  }

  const out = {
    mode: APPLY ? 'applied' : 'dry-run',
    generatedAt: new Date().toISOString(),
    stats: {
      caseStudies: deletable.filter(p => p._type === 'caseStudy').length,
      posts: deletable.filter(p => p._type === 'post').length,
      total: deletable.length,
    },
    referencedSkipped: referenced.map(r => ({ _id: r._id, title: r.title, reason: r.reason })),
    deletions: deletable,
  };
  fs.writeFileSync(OUT_PATH, JSON.stringify(out, null, 2), 'utf8');

  console.log(`Case-study deletions: ${out.stats.caseStudies}`);
  console.log(`Post deletions:       ${out.stats.posts}`);
  console.log(`Total deletions:      ${out.stats.total}`);
  console.log(`Skipped (referenced): ${referenced.length}`);

  if (referenced.length) {
    console.log('\nReferenced (NOT deleted):');
    for (const r of referenced) console.log(`  - ${r._id} | ${r.title}`);
  }

  console.log('\nFinal deletions:');
  for (const p of deletable) console.log(`  [${p._type}] ${p._id} | "${p.title}" | ${p.reason}`);
  console.log(`\nPlan written to ${OUT_PATH}`);

  if (!APPLY) { console.log('\n⚠️ DRY RUN — nothing deleted. Re-run with --apply to execute.'); return; }

  console.log('\n🚀 Executing deletions...');
  let ok = 0, fail = 0;
  for (const p of deletable) {
    try { await c.delete(p._id); ok++; console.log(`  ✅ ${p._id}`); }
    catch (e) { console.error(`  ❌ ${p._id}: ${e.message?.substring(0, 100)}`); fail++; }
    await new Promise(r => setTimeout(r, 60));
  }
  console.log(`\nDone. Deleted ${ok}, failed ${fail}.`);
}

main().catch(e => { console.error('❌', e); process.exit(1); });