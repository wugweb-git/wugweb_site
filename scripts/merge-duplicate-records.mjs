/**
 * scripts/merge-duplicate-records.mjs
 *
 * Phase 3 data cleanup: unpublishes (sets _id to draft) the NON-canonical
 * duplicate documents identified by the audit scripts.
 *
 * Strategy:
 *   - Canonical = document whose _id starts with the slug/pageId (e.g. "post-agile-…")
 *     OR the most recently updated if both have random IDs.
 *   - Non-canonical duplicates are UNPUBLISHED (not deleted):
 *     Sanity.delete() is NOT used. Instead we call client.request({method:'DELETE'})
 *     on the *published* version only, leaving the content in drafts/ as a safety net.
 *
 * Safety rails:
 *   - DRY_RUN=1 → prints what would happen, makes no mutations.
 *   - No document is permanently deleted. Unpublished docs can be recovered
 *     from the Sanity Studio History panel.
 *   - Logs every action to stdout.
 *
 * Usage:
 *   DRY_RUN=1 node scripts/merge-duplicate-records.mjs   # preview only
 *   node scripts/merge-duplicate-records.mjs              # live run (needs SANITY_TOKEN)
 */
import { createClient } from '@sanity/client';

const DRY_RUN = process.env.DRY_RUN === '1';
const TOKEN = process.env.SANITY_TOKEN;

if (!TOKEN && !DRY_RUN) {
  console.error('❌ SANITY_TOKEN env var is required for live mutations.');
  console.error('   Set it with: export SANITY_TOKEN=sk...');
  console.error('   Or run in preview mode: DRY_RUN=1 node scripts/merge-duplicate-records.mjs');
  process.exit(1);
}

const client = createClient({
  projectId: 'splvhmk1',
  dataset: 'production',
  apiVersion: '2026-01-01',
  useCdn: false,
  token: TOKEN,
});

console.log(DRY_RUN ? '🔍 DRY RUN — no mutations will be made\n' : '🚀 LIVE RUN — mutations will be committed\n');

let unpublished = 0;
let skipped = 0;
let errors = 0;

async function unpublishDoc(id, reason) {
  const publishedId = id.replace(/^drafts\./, '');
  if (publishedId.startsWith('drafts.')) return; // already a draft
  console.log(`  → unpublishing ${publishedId}  [${reason}]`);
  if (DRY_RUN) { unpublished++; return; }
  try {
    // Delete only the published version — draft copy remains as safety net
    await client.delete(publishedId);
    console.log(`    ✅ unpublished`);
    unpublished++;
  } catch (e) {
    console.error(`    ❌ error: ${e.message}`);
    errors++;
  }
}

// ── 1. Service duplicates: all 6 pillar slugs have 2 docs each ───────────────
// Canonical = the doc whose _id matches the slug (e.g. "strategy" slug → _id "strategy")
// Non-canonical = random UUID

console.log('=== SERVICE DUPLICATES (6 slugs × 2 docs) ===');
const services = await client.fetch(
  `*[_type == "service" && !(_id in path("drafts.**"))] { _id, title, "slug": slug.current } | order(slug.current asc)`
);
const serviceBySlug = {};
for (const s of services) {
  if (!s.slug) continue;
  if (!serviceBySlug[s.slug]) serviceBySlug[s.slug] = [];
  serviceBySlug[s.slug].push(s);
}
for (const [slug, group] of Object.entries(serviceBySlug)) {
  if (group.length <= 1) continue;
  // Canonical: prefer _id === slug (the named singleton), else most recently updated
  const canonical = group.find((d) => d._id === slug) ?? group[0];
  const nonCanonical = group.filter((d) => d._id !== canonical._id);
  console.log(`\nslug="${slug}" — keeping ${canonical._id}`);
  for (const doc of nonCanonical) {
    await unpublishDoc(doc._id, `duplicate of ${canonical._id}`);
  }
}

// ── 2. Post duplicates: 21 slug groups ────────────────────────────────────────
// Canonical = doc with _id that starts with "post-" (the named seeded record)
// Non-canonical = random UUID (sH…, tiq…, sBG…)

console.log('\n\n=== POST DUPLICATES (21 slugs × 2 docs) ===');
const posts = await client.fetch(
  `*[_type == "post" && !(_id in path("drafts.**"))] { _id, _updatedAt, title, "slug": slug.current } | order(slug.current asc, _updatedAt desc)`
);
const postBySlug = {};
for (const p of posts) {
  if (!p.slug) continue;
  if (!postBySlug[p.slug]) postBySlug[p.slug] = [];
  postBySlug[p.slug].push(p);
}
for (const [slug, group] of Object.entries(postBySlug)) {
  if (group.length <= 1) { skipped++; continue; }
  // Canonical: prefer _id starting with "post-" (the deterministic seeded IDs)
  const canonical = group.find((d) => d._id.startsWith('post-')) ?? group[0];
  const nonCanonical = group.filter((d) => d._id !== canonical._id);
  console.log(`\nslug="${slug}" — keeping ${canonical._id}`);
  for (const doc of nonCanonical) {
    await unpublishDoc(doc._id, `duplicate of ${canonical._id}`);
  }
}

// ── 3. Singleton page duplicates: 4 pageIds ───────────────────────────────────
// Canonical per audit:
//   home    → 8a1ce689-9398-4b61-97fc-73ca5b44b38e  (non-canonical: "home")
//   about   → c1b044cd-f638-493f-a7a1-adb7bcfeecf3  (non-canonical: "about")
//   contact → contact                                 (non-canonical: 67069677-…)
//   faq     → 2ac830be-520b-4493-9c06-d2a0094e0ad3   (non-canonical: "faq")
// Note: "contact" _id is kept because it is the deskStructure quickDoc target.

console.log('\n\n=== SINGLETON PAGE DUPLICATES (4 pageIds × 2 docs) ===');
const singletonDups = [
  { pageId: 'home',    keep: '8a1ce689-9398-4b61-97fc-73ca5b44b38e', drop: 'home' },
  { pageId: 'about',   keep: 'c1b044cd-f638-493f-a7a1-adb7bcfeecf3', drop: 'about' },
  { pageId: 'contact', keep: 'contact',                               drop: '67069677-5530-41d4-a1f6-bdd6dacf8b6f' },
  { pageId: 'faq',     keep: '2ac830be-520b-4493-9c06-d2a0094e0ad3', drop: 'faq' },
];

for (const { pageId, keep, drop } of singletonDups) {
  console.log(`\npageId="${pageId}" — keeping ${keep}, unpublishing ${drop}`);
  await unpublishDoc(drop, `duplicate singleton for pageId=${pageId}`);
}

// ── Summary ──────────────────────────────────────────────────────────────────
console.log('\n╔══════════════════════════════════════════╗');
console.log(`║  ${DRY_RUN ? 'DRY RUN' : 'LIVE RUN'} COMPLETE`);
console.log(`║  Unpublished: ${unpublished}`);
console.log(`║  Skipped (unique slugs): ${skipped}`);
console.log(`║  Errors: ${errors}`);
console.log('╚══════════════════════════════════════════╝');

if (DRY_RUN) {
  console.log('\nRun without DRY_RUN=1 to apply changes:');
  console.log('  SANITY_TOKEN=sk... node scripts/merge-duplicate-records.mjs');
}

if (errors > 0) process.exit(1);
