#!/usr/bin/env node
/**
 * Migrate Notion CSV content (case study + blog bodies) into Sanity docs.
 * Handles HTML content properly, creates missing docs, enriches existing.
 *
 * SANITY_TOKEN=sk... node scripts/migrate-csv-bodies.mjs
 */
import { createClient } from '@sanity/client';
import fs from 'fs';

const token = process.env.SANITY_TOKEN;
if (!token) { console.error('Missing SANITY_TOKEN'); process.exit(1); }

const client = createClient({ projectId:'splvhmk1', dataset:'production', apiVersion:'2026-07-28', token, useCdn:false });

function stripHtml(h) { return h.replace(/<[^>]+>/g,'').replace(/&amp;/g,'&').replace(/&nbsp;/g,' ').replace(/\s+/g,' ').trim(); }

function htmlToBlocks(html, excerpt) {
  const blocks = [];
  if (excerpt) {
    blocks.push({ _type:'block', _key:'intro', style:'normal', markDefs:[], children:[{ _type:'span', _key:'is', text:stripHtml(excerpt).substring(0,3000), marks:[] }] });
  }
  const parts = html.split(/(<h[1-4][^>]*>.*?<\/h[1-4]>|<p[^>]*>.*?<\/p>)/is);
  let idx = 0;
  for (const part of parts) {
    const text = stripHtml(part).trim();
    if (!text || text.length < 10) continue;
    const isHeading = /^<h[1-4]/i.test(part.trim());
    blocks.push({ _type:'block', _key:`b-${idx}`, style: isHeading ? 'h2' : 'normal', markDefs:[], children:[{ _type:'span', _key:`s-${idx}`, text:text.substring(0,3000), marks:[] }] });
    idx++;
  }
  return blocks;
}

// Manual CSV line parser — handles HTML content with embedded commas
function parseSlugAndContent(line) {
  const slugMatch = line.match(/^([^,]+),/);
  if (!slugMatch) return null;
  return { slug: slugMatch[1] };
}

// ── BLOG POSTS ──
async function migrateBlogs() {
  console.log('📋 Blog posts...');
  const text = fs.readFileSync('/Users/abcom/Documents/GitHub/Private & Shared 3/Blog Posts 395bb710b9ab80bd9947d6b6120f45f5_all.csv','utf8');
  const lines = text.split('\n').filter(l => l.trim());
  
  // Parse CSV properly — find Content column position from header
  const header = lines[0].split(',');
  const slugIdx = header.findIndex(h => h.trim() === 'Slug');
  const titleIdx = header.findIndex(h => h.trim() === 'Title');
  const contentIdx = header.findIndex(h => h.trim() === 'Content');
  const excerptIdx = header.findIndex(h => h.trim() === 'Excerpt');
  const dateIdx = header.findIndex(h => h.trim() === 'Publish Date');
  const readTimeIdx = header.findIndex(h => h.trim() === 'Read Time');
  const categoryIdx = header.findIndex(h => h.trim() === 'Primary Category');
  const authorIdx = header.findIndex(h => h.trim() === 'Author');

  let enriched = 0, created = 0;

  for (let i = 1; i < lines.length; i++) {
    // Extract slug from start of line
    const slugMatch = lines[i].match(/^([^,]+),/);
    if (!slugMatch) continue;
    const slug = slugMatch[1].trim();
    
    // Find content between content column and next column
    // Build columns by tracking quote state
    const cols = [];
    let cur = '', inQ = false;
    for (const ch of lines[i]) {
      if (ch === '"') { inQ = !inQ; continue; }
      if (ch === ',' && !inQ) { cols.push(cur); cur = ''; continue; }
      cur += ch;
    }
    cols.push(cur);
    
    const content = cols[contentIdx] || '';
    const title = cols[titleIdx] || slug;
    const excerpt = cols[excerptIdx] || '';
    const pubDate = cols[dateIdx] ? new Date(cols[dateIdx]).toISOString() : undefined;
    const readTime = parseInt(cols[readTimeIdx]) || undefined;
    const category = (cols[categoryIdx] || '').replace(/^categoryFilter$/i, 'Design').replace(/CAT-\d+/, 'Design').trim() || 'Design';
    
    if (!content && !excerpt) continue;

    const body = content ? htmlToBlocks(content, excerpt) : [];

    // Check if post exists
    const exists = await client.fetch(`*[_id == "post-${slug}"][0]._id`).catch(() => null);
    
    if (exists) {
      // Enrich existing
      await client.createOrReplace({
        _id: `post-${slug}`, _type: 'post',
        slug: { _type: 'slug', current: slug },
        title, body: body.length > 0 ? body : undefined,
        excerpt: stripHtml(excerpt).substring(0,500) || title,
        readingTime: readTime, publishedAt: pubDate,
        category, author: { _type: 'reference', _ref: 'person-wugweb-design' },
        tags: [], featured: false,
      });
      enriched++;
    } else {
      // Create new
      await client.createOrReplace({
        _id: `post-${slug}`, _type: 'post',
        slug: { _type: 'slug', current: slug },
        title, body: body.length > 0 ? body : undefined,
        excerpt: stripHtml(excerpt).substring(0,500) || title,
        readingTime: readTime, publishedAt: pubDate,
        category, author: { _type: 'reference', _ref: 'person-vedanshu-srivastava' },
        tags: [], featured: false,
      });
      created++;
    }
  }
  console.log(`  ✅ ${enriched} enriched, ${created} created`);
}

// ── MAIN ──
async function main() {
  await migrateBlogs();
  console.log(`\n✅ Done`);
}

main().catch(e => console.error('\n❌', e.message));
