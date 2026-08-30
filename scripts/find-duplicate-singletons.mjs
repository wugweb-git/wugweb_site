/**
 * scripts/find-duplicate-singletons.mjs
 *
 * Read-only audit: finds singletonPage documents where the same pageId
 * appears more than once among published documents.
 *
 * Usage:
 *   node scripts/find-duplicate-singletons.mjs
 *   node scripts/find-duplicate-singletons.mjs > docs/duplicate-singletons.json
 *
 * NO mutations — safe to run at any time.
 */
import { createClient } from '@sanity/client';

const client = createClient({
  projectId: 'splvhmk1',
  dataset: 'production',
  apiVersion: '2026-01-01',
  useCdn: false,
  token: process.env.SANITY_TOKEN,
});

console.error('Scanning singletonPage…');

const docs = await client.fetch(
  `*[_type == "singletonPage"] {
    _id, _updatedAt, _createdAt, title, pageId,
    "isDraft": _id in path("drafts.**")
  } | order(pageId asc, _updatedAt desc)`
);

const published = docs.filter((d) => !d.isDraft);
const drafts    = docs.filter((d) => d.isDraft);

const byPageId = {};
for (const doc of published) {
  const p = doc.pageId;
  if (!p) continue;
  if (!byPageId[p]) byPageId[p] = [];
  byPageId[p].push(doc);
}

const duplicates = Object.entries(byPageId)
  .filter(([, group]) => group.length > 1)
  .map(([pageId, group]) => ({
    pageId,
    count: group.length,
    // Most recently updated is assumed canonical
    canonical: group[0]._id,
    documents: group.map((d) => ({
      _id: d._id,
      title: d.title,
      pageId: d.pageId,
      _updatedAt: d._updatedAt,
      _createdAt: d._createdAt,
      isCanonical: d._id === group[0]._id,
    })),
  }));

const report = {
  totalPublished: published.length,
  totalDrafts: drafts.length,
  uniquePageIds: Object.keys(byPageId).length,
  duplicateGroups: duplicates.length,
  duplicates,
  missingPageId: published.filter((d) => !d.pageId).map((d) => ({ _id: d._id, title: d.title })),
};

if (duplicates.length > 0) {
  console.error(`⚠️  ${duplicates.length} duplicate pageId(s) found:`);
  for (const d of duplicates) {
    console.error(`  pageId="${d.pageId}" — ${d.count} published documents`);
    console.error(`  canonical: ${d.canonical}`);
  }
} else {
  console.error('✅ No duplicate pageIds found among published documents');
}

if (report.missingPageId.length > 0) {
  console.error(`⚠️  ${report.missingPageId.length} published singletonPage docs have no pageId set`);
}

console.log(JSON.stringify(report, null, 2));
