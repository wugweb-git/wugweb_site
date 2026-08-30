/**
 * scripts/find-duplicate-slugs.mjs
 *
 * Read-only audit: finds all published documents with duplicate slugs.
 * Outputs a JSON report to stdout (pipe to a file or review interactively).
 *
 * Usage:
 *   node scripts/find-duplicate-slugs.mjs
 *   node scripts/find-duplicate-slugs.mjs > docs/duplicate-slugs.json
 *
 * NO mutations — safe to run at any time.
 */
import { createClient } from '@sanity/client';

const client = createClient({
  projectId: 'splvhmk1',
  dataset: 'production',
  apiVersion: '2026-01-01',
  useCdn: false,
  // Token is optional for reads — set SANITY_TOKEN env var if needed
  token: process.env.SANITY_TOKEN,
});

const TYPES = ['service', 'caseStudy', 'post'];
const report = {};

for (const type of TYPES) {
  console.error(`Scanning ${type}…`);
  const docs = await client.fetch(
    `*[_type == $type && !(_id in path("drafts.**"))] {
      _id, _updatedAt, _createdAt, title,
      "slug": slug.current,
      "isDraft": false
    } | order(slug.current asc, _updatedAt desc)`,
    { type }
  );

  const bySlug = {};
  for (const doc of docs) {
    const s = doc.slug;
    if (!s) continue;
    if (!bySlug[s]) bySlug[s] = [];
    bySlug[s].push(doc);
  }

  const duplicates = Object.entries(bySlug)
    .filter(([, group]) => group.length > 1)
    .map(([slug, group]) => ({
      slug,
      count: group.length,
      // Most recently updated is assumed to be canonical (override manually if needed)
      canonical: group[0]._id,
      documents: group.map((d) => ({
        _id: d._id,
        title: d.title,
        slug: d.slug,
        _updatedAt: d._updatedAt,
        _createdAt: d._createdAt,
        isCanonical: d._id === group[0]._id,
      })),
    }));

  report[type] = {
    total: docs.length,
    uniqueSlugs: Object.keys(bySlug).length,
    duplicateGroups: duplicates.length,
    duplicates,
  };

  if (duplicates.length > 0) {
    console.error(`  ⚠️  ${type}: ${duplicates.length} duplicate slug(s) found`);
    for (const d of duplicates) {
      console.error(`    slug="${d.slug}" — ${d.count} documents`);
    }
  } else {
    console.error(`  ✅ ${type}: no duplicate slugs`);
  }
}

console.log(JSON.stringify(report, null, 2));
