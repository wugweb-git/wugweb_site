#!/usr/bin/env node
/**
 * Notion → Sanity Migration
 *
 * Reads Notion data pulled by fetch-notion.mjs and pushes it into Sanity.
 * Then syncs Sanity → Neon via /api/sync.
 *
 * Usage:
 *   SANITY_TOKEN=sk... node scripts/migrate-notion-to-sanity.mjs
 */

import { createClient } from '@sanity/client';
import fs from 'fs';
import path from 'path';

const token = process.env.SANITY_TOKEN;
if (!token) { console.error('Missing SANITY_TOKEN env var'); process.exit(1); }

const client = createClient({
  projectId: 'splvhmk1', dataset: 'production', apiVersion: '2026-07-28',
  token, useCdn: false,
});

const DATA_DIR = path.resolve(import.meta.dirname, '../notion-data');

function loadJson(name) {
  return JSON.parse(fs.readFileSync(path.join(DATA_DIR, name), 'utf8'));
}

async function upsert(doc) {
  try {
    await client.createOrReplace(doc);
    return true;
  } catch (e) {
    console.error(`  ❌ ${doc._type} "${doc._id || doc.title}": ${e.message}`);
    return false;
  }
}

// Helper: strip HTML tags from Notion rich text
function stripHtml(html) {
  if (!html) return '';
  return html.replace(/<[^>]*>/g, '').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&nbsp;/g, ' ').replace(/&quot;/g, '"').trim();
}

// Helper: extract text from HTML for excerpt/summary
function extractText(html) {
  return stripHtml(html).substring(0, 300);
}

// ═══════════════════════════════════════════════════════════════
// STEP 1: Industries
// ═══════════════════════════════════════════════════════════════
async function migrateIndustries() {
  console.log('\n📋 Industries');
  const rows = loadJson('industry.json');
  let count = 0;
  for (const row of rows) {
    const name = row['Name (Title)'];
    if (!name) continue;
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const ok = await upsert({
      _id: `industry-${slug}`,
      _type: 'industry',
      name,
      slug: { _type: 'slug', current: slug },
      order: count + 1,
    });
    if (ok) count++;
  }
  console.log(`  ✅ ${count} industries`);
  return count;
}

// ═══════════════════════════════════════════════════════════════
// STEP 2: Clients
// ═══════════════════════════════════════════════════════════════
async function migrateClients() {
  console.log('\n📋 Clients');
  const rows = loadJson('clients.json');
  let count = 0;
  for (const row of rows) {
    const name = row['Brand Name'] || row['Client ID'];
    if (!name || name === 'Clients') continue;
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || (row['Client ID'] || '').toLowerCase();
    if (!slug) continue;

    const ok = await upsert({
      _id: `client-${row['Client ID'] || slug}`,
      _type: 'client',
      name,
      slug: { _type: 'slug', current: slug },
      website: row['Website'] || '',
      description: row['Notes'] || '',
      engagementType: row['Engagement']?.toLowerCase() || null,
      tags: row['Entity Type'] ? [row['Entity Type']] : [],
      order: count + 1,
    });
    if (ok) count++;
  }
  console.log(`  ✅ ${count} clients`);
  return count;
}

// ═══════════════════════════════════════════════════════════════
// STEP 3: Case Studies (enrich existing, add new)
// ═══════════════════════════════════════════════════════════════
function notionCaseToSanity(row) {
  const slug = row['Slug'];
  if (!slug || slug === 'Case study - seoi') return null;

  // Collect challenges (1-4)
  const challenges = [];
  for (let i = 1; i <= 4; i++) {
    const text = row[`Challenge ${i}`];
    if (text && stripHtml(text)) {
      const lines = stripHtml(text).split('\n')[0].trim();
      challenges.push({ _key: `ch-${i}`, title: lines.substring(0, 80), body: lines });
    }
  }

  // Collect solutions (1-6)
  const solutions = [];
  for (let i = 1; i <= 6; i++) {
    const text = row[`Solution ${i}`];
    if (text && stripHtml(text)) {
      const lines = stripHtml(text).split('\n')[0].trim();
      solutions.push({ _key: `sol-${i}`, title: lines.substring(0, 80), body: lines });
    }
  }

  // Collect impact/conclusions (1-4)
  const impact = [];
  for (let i = 1; i <= 4; i++) {
    const text = row[`Conclusion ${i}`];
    if (text && stripHtml(text)) {
      const lines = stripHtml(text).split('\n')[0].trim();
      impact.push({ _key: `imp-${i}`, title: lines.substring(0, 80), body: lines });
    }
  }

  // Collect design philosophy (1-3)
  const designPhilosophy = [];
  for (let i = 1; i <= 3; i++) {
    const text = row[`Design Philosophy ${i}`];
    if (text && stripHtml(text)) {
      designPhilosophy.push(stripHtml(text).split('\n')[0].trim());
    }
  }

  const disciplines = row['Disciplines'] ? row['Disciplines'].split(',').map(s => s.trim()) : [];
  const teams = row['Team'] ? row['Team'].split(',').map(s => s.trim()) : [];
  const cats = row['Category'] || [];
  const tags = row['Tags'] || [];
  const summary = extractText(row['Challenges Intro'] || row['About Content'] || '');

  return {
    _id: `caseStudy-${slug}`,
    _type: 'caseStudy',
    title: row['Project Title'] || slug,
    slug: { _type: 'slug', current: slug },
    client: row['Client (legacy text)'] || '',
    disciplines: disciplines.length ? disciplines : cats,
    team: teams,
    industry: row['Industry (legacy text)'] || '',
    timeline: row['Timeline'] || (row['Year'] ? String(row['Year']) : ''),
    summary: summary || '',
    about: stripHtml(row['About Content'] || '').substring(0, 1000) || summary,
    tags: tags,
    challenges,
    solutions,
    impact,
    designPhilosophy: designPhilosophy.join('\n\n'),
    publishedAt: row['Year'] ? `${row['Year']}-06-15T00:00:00Z` : '2023-06-15T00:00:00Z',
    featured: false,
  };
}

async function migrateCaseStudies() {
  console.log('\n📋 Case Studies');
  const rows = loadJson('case-studies.json');
  let updated = 0, added = 0;

  for (const row of rows) {
    const doc = notionCaseToSanity(row);
    if (!doc) continue;

    // Check if already exists
    const exists = await client.fetch(`*[_id == $id][0]._id`, { id: doc._id }).catch(() => null);
    const ok = await upsert(doc);
    if (ok) {
      if (exists) updated++; else added++;
    }
  }

  console.log(`  ✅ ${updated} updated, ${added} added`);
  return { updated, added };
}

// ═══════════════════════════════════════════════════════════════
// STEP 4: Blog Posts
// ═══════════════════════════════════════════════════════════════
const CATEGORY_MAP = {
  'CAT-001': 'Design',
  'CAT-002': 'Product',
  'CAT-003': 'Development',
  'CAT-004': 'AI',
  'CAT-005': 'Strategy',
  'CAT-006': 'Career',
};

const AUTHOR_MAP = {
  'AUTH-001': 'person-vedanshu-srivastava',
};

async function migrateBlogs() {
  console.log('\n📋 Blog Posts');
  const rows = loadJson('blog-master.json');
  let count = 0;

  for (const row of rows) {
    if (row['Status'] !== 'Published') continue;
    const slug = row['Slug'];
    if (!slug) continue;

    const catId = row['Primary Category ID'];
    const category = CATEGORY_MAP[catId] || 'Design';
    const authorRef = AUTHOR_MAP[row['Author ID']] || 'person-vedanshu-srivastava';
    const pubDate = row['Publish Date'] ? `${row['Publish Date']}T00:00:00Z` : '2024-01-01T00:00:00Z';
    const content = row['Content'] || null;

    // Build body from AI summary and content if available
    const aiSummary = row['AI Summary'] || '';
    const excerpt = row['Excerpt'] || aiSummary;

    const body = [
      {
        _type: 'block', _key: 'intro', style: 'normal',
        markDefs: [],
        children: [{ _type: 'span', _key: 'intro-span', text: excerpt || row['Title'], marks: [] }],
      },
    ];

    const ok = await upsert({
      _id: `post-${slug}`,
      _type: 'post',
      title: row['Title'],
      slug: { _type: 'slug', current: slug },
      category,
      author: { _type: 'reference', _ref: authorRef },
      excerpt: excerpt,
      readingTime: row['Read Time (min)'] || 5,
      tags: [],
      publishedAt: pubDate,
      featured: false,
      seoTitle: row['SEO Title'] || '',
      seoDescription: row['SEO Description'] || '',
      body,
    });
    if (ok) count++;
  }

  console.log(`  ✅ ${count} blog posts`);
  return count;
}

// ═══════════════════════════════════════════════════════════════
// MAIN
// ═══════════════════════════════════════════════════════════════
async function main() {
  console.log('🚀 Notion → Sanity Migration');
  console.log(`Project: splvhmk1 / production\n`);

  const indCount = await migrateIndustries();
  const cliCount = await migrateClients();
  const { updated, added } = await migrateCaseStudies();
  const blogCount = await migrateBlogs();

  console.log(`\n📊 Summary:`);
  console.log(`  Industries: ${indCount}`);
  console.log(`  Clients: ${cliCount}`);
  console.log(`  Case Studies: ${updated} updated, ${added} added`);
  console.log(`  Blog Posts: ${blogCount}`);

  console.log('\n✅ Done');
}

main().catch((e) => { console.error('\n❌ Migration failed:', e); process.exit(1); });
