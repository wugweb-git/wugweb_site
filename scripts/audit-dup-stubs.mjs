#!/usr/bin/env node
/**
 * Audit caseStudy + post documents in Sanity for duplicates and stubs.
 *
 * REPORT-ONLY — does not mutate anything. Prints findings to stdout and
 * writes a JSON summary to docs/audit-dup-stubs-report.json.
 *
 * Usage: SANITY_TOKEN=sk... node scripts/audit-dup-stubs.mjs
 */
import { createClient } from '@sanity/client';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const token = process.env.SANITY_TOKEN || process.env.SANITY_API_TOKEN;
if (!token) { console.error('Missing SANITY_TOKEN (or SANITY_API_TOKEN) in environment'); process.exit(1); }

const c = createClient({ projectId: 'splvhmk1', dataset: 'production', apiVersion: '2026-07-28', token, useCdn: false });
const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT_PATH = join(__dirname, '../docs/audit-dup-stubs-report.json');

// ── Stub heuristics ──────────────────────────────────────────────────────────
const PLACEHOLDER_RE = /\b(lorem(\s+ipsum)?|tbd|todo|coming\s*soon|wip|placeholder|draft|sample|test\b|demo\b|example\b|dummy|xxx|fill\s+in|fixme|new\s+post|untitled)\b/i;
const STUB_TITLE_RE = /^(content|body|blog|post|case\s*study|untitled|new|work|project|sample|test|entry|draft|page)\s*\d*$/i;

function countBodyWords(body) {
  if (!Array.isArray(body)) return 0;
  return body
    .filter(b => b?._type === 'block')
    .flatMap(b => (b.children || []).map(ch => String(ch?.text || '').split(/\s+/).filter(Boolean).length))
    .reduce((a, n) => a + n, 0);
}

function titleLooksStub(title) {
  if (!title || !title.trim()) return true;
  const t = title.trim();
  if (STUB_TITLE_RE.test(t)) return true;
  if (PLACEHOLDER_RE.test(t)) return true;
  return false;
}

// ── Fetch ────────────────────────────────────────────────────────────────────
async function fetchCaseStudies() {
  return c.fetch(`*[_type == "caseStudy"] {
    _id, _rev, _createdAt, _updatedAt,
    title, subtitle, "slug": slug.current,
    summary, about, bodyContent, body, coverPath, coverImage,
    publishedAt, featured, client, industry, timeline
  }`);
}

async function fetchPosts() {
  return c.fetch(`*[_type == "post"] {
    _id, _rev, _createdAt, _updatedAt,
    title, subtitle, "slug": slug.current,
    excerpt, body, bodyContent, coverPath, coverImage,
    publishedAt, category, tags, "author": author->name
  }`);
}

// ── Duplicate detection ──────────────────────────────────────────────────────
function normalize(s) { return (s || '').toLowerCase().replace(/[^a-z0-9]/g, '').trim(); }

function findDuplicates(docs, type) {
  const bySlug = {};
  const byTitle = {};
  const findings = [];

  for (const d of docs) {
    const slug = normalize(d.slug);
    const title = normalize(d.title);
    if (slug) (bySlug[slug] = bySlug[slug] || []).push(d);
    if (title) (byTitle[title] = byTitle[title] || []).push(d);
  }

  for (const [slug, list] of Object.entries(bySlug)) {
    if (list.length < 2) continue;
    findings.push({
      type, kind: 'duplicate-slug', slug,
      docs: list.map(d => ({ _id: d._id, title: d.title, createdAt: d._createdAt, rev: d._rev })),
    });
  }

  for (const [title, list] of Object.entries(byTitle)) {
    if (list.length < 2) continue;
    const slugs = [...new Set(list.map(d => normalize(d.slug)))];
    if (slugs.length === 1) continue;
    findings.push({
      type, kind: 'duplicate-title',
      title: list[0].title,
      docs: list.map(d => ({ _id: d._id, slug: d.slug, createdAt: d._createdAt })),
    });
  }

  return findings;
}

function findDrafts(docs, type) {
  const findings = [];
  const publishedIds = new Set(docs.filter(d => !d._id.startsWith('drafts.')).map(d => d._id));

  for (const d of docs) {
    if (!d._id.startsWith('drafts.')) continue;
    const pubId = d._id.substring('drafts.'.length);
    findings.push({
      type,
      kind: publishedIds.has(pubId) ? 'draft-with-published' : 'draft-orphan',
      _id: d._id,
      publishedId: publishedIds.has(pubId) ? pubId : null,
      title: d.title,
      slug: d.slug,
      createdAt: d._createdAt,
    });
  }
  return findings;
}

function findStubs(docs, type) {
  const findings = [];
  for (const d of docs) {
    if (d._id.startsWith('drafts.')) continue;
    // caseStudy uses bodyContent; post uses body (bodyContent may exist too post-merge)
    const body = Array.isArray(d.bodyContent) ? d.bodyContent : d.body;
    const words = countBodyWords(body);
    const issues = [];

    const titleStub = titleLooksStub(d.title);
    if (!d.title || !d.title.trim()) issues.push('empty-title');
    else if (titleStub) issues.push('stub-title');

    if (words === 0) issues.push('empty-body');
    else if (words < 50) issues.push('tiny-body');

    const hasExcerptOrSummary = !!(d.excerpt?.trim() || d.summary?.trim());
    if (!hasExcerptOrSummary && words < 80) issues.push('no-excerpt/summary');

    const hasCover = !!(d.coverPath || d.coverImage);
    if (!hasCover) issues.push('no-cover');

    if (issues.length) {
      findings.push({
        type,
        _id: d._id,
        title: d.title,
        slug: d.slug,
        createdAt: d._createdAt,
        updatedAt: d._updatedAt,
        bodyWords: words,
        issues,
      });
    }
  }
  return findings;
}

// ── Main ─────────────────────────────────────────────────────────────────────
async function main() {
  console.log('[1/2] Fetching case studies...');
  const caseStudies = await fetchCaseStudies();
  console.log(`      fetched ${caseStudies.length} caseStudy docs`);

  console.log('[2/2] Fetching posts...');
  const posts = await fetchPosts();
  console.log(`      fetched ${posts.length} post docs\n`);

  const publishedCaseStudies = caseStudies.filter(d => !d._id.startsWith('drafts.'));
  const publishedPosts = posts.filter(d => !d._id.startsWith('drafts.'));

  const report = {
    generatedAt: new Date().toISOString(),
    counts: {
      caseStudy: { total: caseStudies.length, published: publishedCaseStudies.length },
      post: { total: posts.length, published: publishedPosts.length },
    },
    findings: {
      caseStudy: {
        duplicates: findDuplicates(publishedCaseStudies, 'caseStudy'),
        drafts: findDrafts(caseStudies, 'caseStudy'),
        stubs: findStubs(publishedCaseStudies, 'caseStudy'),
      },
      post: {
        duplicates: findDuplicates(publishedPosts, 'post'),
        drafts: findDrafts(posts, 'post'),
        stubs: findStubs(publishedPosts, 'post'),
      },
    },
  };

  fs.writeFileSync(OUT_PATH, JSON.stringify(report, null, 2), 'utf8');
  console.log(`Report written to ${OUT_PATH}\n`);

  // ── Pretty print ──
  for (const type of ['caseStudy', 'post']) {
    const data = report.findings[type];
    const counts = report.counts[type];
    console.log(`\n========================================`);
    console.log(`===== ${type.toUpperCase()} =====`);
    console.log(`========================================`);
    console.log(`Docs (published): ${counts.published}`);
    if (counts.total > counts.published) console.log(`Total incl. drafts: ${counts.total}`);

    console.log('\n— Duplicate slugs —');
    const dupSlugs = data.duplicates.filter(d => d.kind === 'duplicate-slug');
    for (const d of dupSlugs) {
      console.log(`  duplicate slug "${d.slug}":`);
      for (const doc of d.docs) console.log(`    - ${doc._id} | ${doc.title || '(untitled)'} | rev: ${doc.rev}`);
    }
    if (!dupSlugs.length) console.log('  (none)');

    console.log('\n— Duplicate titles —');
    const dupTitles = data.duplicates.filter(d => d.kind === 'duplicate-title');
    for (const d of dupTitles) {
      console.log(`  title "${d.title}":`);
      for (const doc of d.docs) console.log(`    - ${doc._id} | ${doc.slug || '(no slug)'}`);
    }
    if (!dupTitles.length) console.log('  (none)');

    console.log('\n— Draft / orphan drafts —');
    for (const d of data.drafts) {
      console.log(`  ${d._id}${d.publishedId ? ` → published: ${d.publishedId}` : ' (no published counterpart)'} | ${d.title || '(untitled)'}`);
    }
    if (!data.drafts.length) console.log('  (none)');

    console.log('\n— Published stubs —');
    for (const d of data.stubs) {
      console.log(`  ${d._id} | "${d.title || '(untitled)'}" | ${d.issues.join(', ')} | words: ${d.bodyWords}`);
    }
    if (!data.stubs.length) console.log('  (none)');
    console.log('');
  }
}

main().catch(e => {
  console.error('\n❌ Audit failed:', e);
  process.exit(1);
});