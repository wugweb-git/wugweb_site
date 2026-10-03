/**
 * Sanity smoke-test suite — splvhmk1 / production
 *
 * Run:  node sanity/test_sanity.mjs
 * Or via root: npm run sanity:health
 */
import { createClient } from '@sanity/client';

const projectId = process.env.SANITY_PROJECT_ID || 'splvhmk1';
const dataset = process.env.SANITY_DATASET || 'production';
const apiVersion = process.env.SANITY_API_VERSION || '2026-01-01';

const client = createClient({
  projectId: 'splvhmk1',   // ← was zy1el06f (wrong project)
  dataset: 'production',
  apiVersion: '2026-01-01', // ← align with frontend + studio
  useCdn: false,
});

let passed = 0;
let failed = 0;

function ok(label, value) {
  console.log(`  ✅ ${label}: ${value}`);
  passed++;
}
function warn(label, value) {
  console.log(`  ⚠️  ${label}: ${value}`);
  // warnings don't fail the suite, they're data-health issues
}
function fail(label, reason) {
  console.error(`  ❌ FAIL — ${label}: ${reason}`);
  failed++;
}

async function run() {
  console.log('╔═══════════════════════════════════════════════════╗');
  console.log('║  Wugweb Sanity Smoke Test — splvhmk1 / production  ║');
  console.log('╚═══════════════════════════════════════════════════╝\n');

  // ── 1. Connectivity ──────────────────────────────────────────────
  console.log('1. Connectivity');
  try {
    const count = await client.fetch('count(*[_type == "post"])');
    ok('Read access', `${count} blog posts`);
  } catch (e) {
    fail('Read access', e.message);
    console.error('\nCannot connect — aborting further tests.');
    process.exit(1);
  }

  // ── 2. Document counts ───────────────────────────────────────────
  console.log('\n2. Document counts');
  const counts = await client.fetch(`{
    "post":              count(*[_type=="post"                         && !(_id in path("drafts.**"))]),
    "caseStudy":         count(*[_type=="caseStudy"                   && !(_id in path("drafts.**"))]),
    "service":           count(*[_type=="service"                     && !(_id in path("drafts.**"))]),
    "singletonPage":     count(*[_type=="singletonPage"               && !(_id in path("drafts.**"))]),
    "client":            count(*[_type=="client"                      && !(_id in path("drafts.**"))]),
    "person":            count(*[_type=="person"                      && !(_id in path("drafts.**"))]),
    "asset":             count(*[_type=="asset"                       && !(_id in path("drafts.**"))]),
    "taxonomy":          count(*[_type=="taxonomy"                    && !(_id in path("drafts.**"))]),
    "industry":          count(*[_type=="industry"                    && !(_id in path("drafts.**"))]),
    "navigationMenu":    count(*[_type=="navigationMenu"              && !(_id in path("drafts.**"))]),
    "drafts":            count(*[_id in path("drafts.**")])
  }`);
  for (const [type, n] of Object.entries(counts)) {
    ok(type, n);
  }

  // ── 3. Duplicate slug detection ──────────────────────────────────
  console.log('\n3. Duplicate slug detection');
  for (const type of ['post', 'caseStudy', 'service']) {
    const slugs = await client.fetch(
      `*[_type == $type && !(_id in path("drafts.**"))] { "slug": slug.current }`,
      { type }
    );
    const freq = {};
    for (const { slug } of slugs) {
      if (!slug) continue;
      freq[slug] = (freq[slug] ?? 0) + 1;
    }
    const dupList = Object.entries(freq).filter(([, n]) => n > 1);
    if (dupList.length === 0) {
      ok(`${type} — no duplicate slugs`, '✓');
    } else {
      warn(`${type} — duplicate slugs found`, JSON.stringify(dupList.slice(0, 5)));
      // Not a hard failure: duplicates are tracked in pending.md for Phase 3 cleanup
    }
  }

  // ── 4. Singleton uniqueness ──────────────────────────────────────
  console.log('\n4. Singleton page uniqueness');
  const pages = await client.fetch(
    `*[_type=="singletonPage" && !(_id in path("drafts.**"))] { pageId }`
  );
  const pageFreq = {};
  for (const { pageId } of pages) {
    if (!pageId) continue;
    pageFreq[pageId] = (pageFreq[pageId] ?? 0) + 1;
  }
  const dupPages = Object.entries(pageFreq).filter(([, n]) => n > 1);
  if (dupPages.length === 0) {
    ok('singletonPage — no duplicate pageIds', '✓');
  } else {
    warn('singletonPage — duplicate pageIds', JSON.stringify(dupPages));
  }

  // ── 5. SEO health ────────────────────────────────────────────────
  console.log('\n5. SEO health');
  const seo = await client.fetch(`{
    "missingSeoDesc": count(*[_type in ["post","caseStudy","service","singletonPage"] && !(_id in path("drafts.**")) && !defined(seoDescription)]),
    "missingOgImage": count(*[_type in ["post","caseStudy","service"] && !(_id in path("drafts.**")) && !defined(ogImage)]),
    "missingExcerpt": count(*[_type=="post" && !(_id in path("drafts.**")) && !defined(excerpt)]),
    "missingCover":   count(*[_type in ["post","caseStudy"] && !(_id in path("drafts.**")) && !defined(coverImage) && !defined(coverPath)])
  }`);
  if (seo.missingSeoDesc > 0) warn('Missing SEO description', seo.missingSeoDesc);
  else ok('All published docs have SEO description', '✓');
  if (seo.missingOgImage > 0) warn('Missing OG image', seo.missingOgImage);
  else ok('All published docs have OG image', '✓');
  if (seo.missingExcerpt > 0) warn('Posts missing excerpt', seo.missingExcerpt);
  else ok('All posts have excerpt', '✓');
  if (seo.missingCover > 0) warn('Posts/case studies missing cover', seo.missingCover);
  else ok('All posts/case studies have cover', '✓');

  // ── 6. Required fields spot-check ────────────────────────────────
  console.log('\n6. Required fields');
  const missingSlug = await client.fetch(
    `count(*[_type in ["post","caseStudy","service"] && !(_id in path("drafts.**")) && !defined(slug.current)])`
  );
  if (missingSlug > 0) fail('Documents missing slug', missingSlug);
  else ok('All content docs have slugs', '✓');

  const missingTitle = await client.fetch(
    `count(*[_type in ["post","caseStudy","service"] && !(_id in path("drafts.**")) && !defined(title)])`
  );
  if (missingTitle > 0) fail('Documents missing title', missingTitle);
  else ok('All content docs have titles', '✓');

  // ── Summary ──────────────────────────────────────────────────────
  console.log('\n╔═══════════════════════════╗');
  console.log(`║  PASSED: ${String(passed).padEnd(4)} FAILED: ${String(failed).padEnd(4)} ║`);
  console.log('╚═══════════════════════════╝');
  if (failed > 0) process.exit(1);
}

run().catch((e) => {
  console.error('Unhandled error:', e);
  process.exit(1);
});
