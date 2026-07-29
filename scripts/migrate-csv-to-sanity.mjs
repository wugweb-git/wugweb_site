#!/usr/bin/env node
/**
 * CSV + Writeup → Sanity Migration
 *
 * Reads case-study metadata from CSV and body content from Case Study Writeup.md,
 * then pushes everything into Sanity. Then syncs Sanity → Neon.
 *
 * Usage:
 *   SANITY_TOKEN=sk... node scripts/migrate-csv-to-sanity.mjs
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

// ── Manual CSV parser ─────────────────────────────────────────
function parseCSV(text) {
  const lines = text.split('\n').filter(l => l.trim());
  if (lines.length < 2) return [];
  const headers = parseCSVLine(lines[0]);
  const records = [];
  for (let i = 1; i < lines.length; i++) {
    const fields = parseCSVLine(lines[i]);
    if (fields.length === 0 || fields.every(f => !f)) continue;
    const record = {};
    headers.forEach((h, idx) => { record[h] = fields[idx] || ''; });
    records.push(record);
  }
  return records;
}

function parseCSVLine(line) {
  const result = [];
  let current = '';
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (ch === '"') {
      if (inQuotes && line[i + 1] === '"') { current += '"'; i++; }
      else inQuotes = !inQuotes;
    } else if (ch === ',' && !inQuotes) {
      result.push(current);
      current = '';
    } else {
      current += ch;
    }
  }
  result.push(current);
  return result;
}

// ── Load CSV ───────────────────────────────────────────────────
const csvPath = '/Users/abcom/Downloads/Case study - full columns.csv';
const csvContent = fs.readFileSync(csvPath, 'utf8');
const records = parseCSV(csvContent);
console.log(`Parsed ${records.length} rows from CSV`);

// Index by Case Study ID, deduplicating (keep first occurrence)
const caseStudyMap = new Map();
for (const r of records) {
  const id = r['Case Study ID'];
  if (id && !caseStudyMap.has(id)) {
    caseStudyMap.set(id, r);
  }
}

const caseStudies = [...caseStudyMap.values()];
console.log(`Loaded ${caseStudies.length} case studies from CSV`);

// ── Parse Writeup ──────────────────────────────────────────────
const writeupPath = '/Users/abcom/Downloads/Case Study Writeup (1).md';
const writeup = fs.readFileSync(writeupPath, 'utf8');

// Split writeup into individual case studies by "## **Case Study N:"
const caseStudyBlocks = writeup.split(/(?=## \*\*Case Study \d+:)/);
console.log(`Found ${caseStudyBlocks.length} case study blocks in writeup`);

// Map writeup blocks to CSV entries by matching title
function findWriteupBlock(title) {
  if (!title) return null;
  // Normalize: lowercase, strip punctuation, collapse spaces
  const normalized = title.toLowerCase().replace(/[^a-z0-9\s]/g, '').replace(/\s+/g, ' ').trim();
  const words = normalized.split(' ').filter(w => w.length > 2);
  
  for (let i = 0; i < caseStudyBlocks.length; i++) {
    const blockTitle = caseStudyBlocks[i].match(/## \*\*Case Study \d+: (.+?)\*\*/);
    if (!blockTitle) continue;
    const bt = blockTitle[1].toLowerCase().replace(/[^a-z0-9\s]/g, '').replace(/\s+/g, ' ').trim();
    const btWords = bt.split(' ').filter(w => w.length > 2);
    // Count overlapping words
    const overlap = words.filter(w => btWords.includes(w)).length;
    const smaller = Math.min(words.length, btWords.length);
    // Match if 60%+ of shorter title's words overlap
    if (smaller > 0 && overlap / smaller >= 0.6) {
      return caseStudyBlocks[i];
    }
  }
  return null;
}

function getSection(writeupText, sectionTitle) {
  // Find the section between "### **{sectionTitle}**" and the next ### or ##
  const regex = new RegExp(`### \\*\\*${sectionTitle}\\*\\*[\\s\\S]*?(?=### \\*\\*|## \\*\\*Case Study|$)`);
  const match = writeupText.match(regex);
  if (!match) return [];
  const content = match[0];
  // Extract bullet points or numbered items
  const items = [];
  const bulletRegex = /\d+\.\s+\*\*([^*]+)\*\*[:\s]*([\s\S]*?)(?=\d+\.\s+\*\*|$)/g;
  let bm;
  while ((bm = bulletRegex.exec(content)) !== null) {
    items.push({ title: bm[1].trim(), body: bm[2].trim().replace(/\n\s*/g, ' ') });
  }
  // If no numbered bullets, try regular bullets
  if (items.length === 0) {
    const simpleBullet = /[-*]\s+\*\*([^*]+)\*\*[:\s]*([\s\S]*?)(?=[-*]\s+\*\*|$)/g;
    while ((bm = simpleBullet.exec(content)) !== null) {
      items.push({ title: bm[1].trim(), body: bm[2].trim().replace(/\n\s*/g, ' ') });
    }
  }
  return items;
}

function getAbout(writeupText) {
  // About section is under "### **About (Context)**" or "### **About**"
  const regex = /### \*\*About(?: \(Context\))?\*\*[\s\S]*?(?=### \*\*)/;
  const match = writeupText.match(regex);
  if (!match) return '';
  // Extract text after the first paragraph
  const lines = match[0].split('\n').filter(l => l.trim() && !l.startsWith('###'));
  return lines.join(' ').trim().replace(/\s+/g, ' ').substring(0, 1500);
}

function getIntroAbout(writeupText) {
  // First paragraph in the About section
  const regex = /### \*\*About(?: \(Context\))?\*\*[\s\S]*?(?=### \*\*)/;
  const match = writeupText.match(regex);
  if (!match) return '';
  const para = match[0].match(/(?<=\n\n)[\s\S]*?(?=\n\n)/);
  return para ? para[0].trim().replace(/\s+/g, ' ') : '';
}

async function upsert(doc) {
  try {
    await client.createOrReplace(doc);
    return true;
  } catch (e) {
    console.error(`  ❌ ${doc._type} "${doc._id}": ${e.message}`);
    return false;
  }
}

// ── Migrate ────────────────────────────────────────────────────
async function main() {
  console.log('🚀 CSV + Writeup → Sanity Migration\n');

  let count = 0;

  for (const csv of caseStudies) {
    const slug = csv['Slug'];
    const id = csv['Case Study ID'];
    const title = csv['Title'];
    if (!slug || !title) continue;

    // Match writeup block by title instead of index
    const block = title ? findWriteupBlock(title) : null;

    const challenges = block ? getSection(block, 'Challenges') : [];
    const solutions = block ? getSection(block, 'Solutions') : [];
    const impact = block ? getSection(block, 'Impact') : [];
    const designPhilosophy = block ? getSection(block, 'Strategic Insights & Design Philosophy') : [];
    const about = block ? getAbout(block) : (csv['About Content'] || csv['Body Content'] || '');

    // Also try getting challenges/solutions from the Notion case studies data
    const notionDataFile = path.join(import.meta.dirname, '../notion-data/case-studies.json');
    let notionRow = null;
    if (fs.existsSync(notionDataFile)) {
      const notionRows = JSON.parse(fs.readFileSync(notionDataFile, 'utf8'));
      notionRow = notionRows.find(n => n['Slug'] === slug);
    }

    // Parse comma-separated fields
    const industries = csv['Industry'] ? csv['Industry'].split(',').map(s => s.trim()).filter(Boolean) : [];
    const categories = csv['Category'] ? csv['Category'].split(',').map(s => s.trim()).filter(Boolean) : [];
    const tags = csv['Tags'] ? csv['Tags'].split(',').map(s => s.trim()).filter(Boolean) : [];
    const disciplines = csv['Primary Discipline'] ? [csv['Primary Discipline'], ...(csv['Additional Disciplines'] ? csv['Additional Disciplines'].split(',').map(s => s.trim()) : [])] : categories;
    const teams = csv['Team'] ? csv['Team'].split(',').map(s => s.trim()).filter(Boolean) : [];
    const timeline = csv['Timeline'] || csv['Timeline'] || '';

    // Format challenges/solutions/impact with _key
    const fmtChallenges = challenges.map((c, i) => ({ _key: `ch-${i}`, title: c.title, body: c.body }));
    const fmtSolutions = solutions.map((s, i) => ({ _key: `sol-${i}`, title: s.title, body: s.body }));
    const fmtImpact = impact.map((im, i) => ({ _key: `imp-${i}`, title: im.title, body: im.body }));

    // Use writeup content if available, fall back to CSV
    const summary = csv['AI Keywords'] ? csv['AI Keywords'].split(',').map(s => s.trim()).join(', ') : '';
    const subtitle = csv['Subtitle'] || '';

    const doc = {
      _id: `caseStudy-${slug}`,
      _type: 'caseStudy',
      title,
      subtitle: csv['Short Title'] || '',
      slug: { _type: 'slug', current: slug },
      client: csv['Client'] || '',
      partner: csv['Partner'] || '',
      industry: industries.join(', ') || '',
      disciplines: disciplines,
      team: teams,
      timeline,
      summary: summary || subtitle,
      about: about.substring(0, 2000),
      tags,
      challenges: fmtChallenges.length ? fmtChallenges : undefined,
      solutions: fmtSolutions.length ? fmtSolutions : undefined,
      impact: fmtImpact.length ? fmtImpact : undefined,
      designPhilosophy: designPhilosophy.map(dp => dp.title).join('\n'),
      publishedAt: '2024-06-15T00:00:00Z',
      featured: csv['Featured'] === 'Yes',
      seoTitle: csv['SEO Title'] || '',
      seoDescription: csv['SEO Description'] || '',
    };

    const ok = await upsert(doc);
    if (ok) count++;
  }

  console.log(`\n✅ ${count} case studies migrated`);
  console.log('\n📊 Done');
}

main().catch((e) => { console.error('\n❌ Migration failed:', e); process.exit(1); });
