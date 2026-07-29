#!/usr/bin/env node
/**
 * Extract WordPress blog posts + case studies from SQL dump
 * and push body content into Sanity.
 *
 * Usage: SANITY_TOKEN=sk... node scripts/extract-wp-content.mjs
 */
import { createClient } from '@sanity/client';
import fs from 'fs';

const token = process.env.SANITY_TOKEN;
if (!token) process.exit(1);

const client = createClient({ projectId:'splvhmk1', dataset:'production', apiVersion:'2026-07-28', token, useCdn:false });

// Parse SQL dump — extract INSERT INTO wp_posts rows
const sql = fs.readFileSync('/Users/abcom/Documents/GitHub/wugweb_design/u544169507_wugD (1).sql', 'utf8');

// Find all INSERT INTO wp_posts statements
const insertRegex = /INSERT INTO `wp_posts` VALUES\s*\((.+?)\);/gs;
let match;
const posts = [];

while ((match = insertRegex.exec(sql)) !== null) {
  const valuesBlock = match[1];
  // Split by ),( to get individual row values
  const rows = valuesBlock.split('),(');
  for (const row of rows) {
    const clean = row.replace(/^\(|\)$/g, '');
    // Parse CSV-like values — WordPress uses single quotes
    const vals = [];
    let cur = '', inStr = false, escape = false;
    for (const ch of clean) {
      if (escape) { cur += ch; escape = false; continue; }
      if (ch === '\\' && inStr) { escape = true; continue; }
      if (ch === "'" && inStr) { inStr = false; continue; }
      if (ch === "'" && !inStr) { inStr = true; continue; }
      if (ch === ',' && !inStr) { vals.push(cur); cur = ''; continue; }
      cur += ch;
    }
    vals.push(cur);
    
    if (vals.length >= 22) {
      const postType = vals[19]?.trim() || '';
      const status = vals[6]?.trim() || '';
      if ((postType === 'post' || postType === 'case_study') && status === 'publish') {
        posts.push({
          id: vals[0],
          title: vals[4],
          slug: vals[11],
          content: vals[3],
          excerpt: vals[5],
          type: postType,
          date: vals[2],
          author: vals[1],
        });
      }
    }
  }
}

console.log(`📋 Found ${posts.length} published posts (${posts.filter(p=>p.type==='post').length} blogs, ${posts.filter(p=>p.type==='case_study').length} case studies)`);

// Update Sanity docs with body content
let blogUpdated = 0, caseUpdated = 0;

for (const wp of posts) {
  // Build Sanity body blocks from WordPress HTML content
  const content = wp.content || '';
  if (!content) continue;
  
  // Simple HTML to block content conversion
  const blocks = [];
  
  // Add excerpt as intro block
  if (wp.excerpt) {
    blocks.push({
      _type: 'block', _key: 'intro', style: 'normal',
      markDefs: [],
      children: [{ _type: 'span', _key: 'intro-s', text: wp.excerpt, marks: [] }],
    });
  }
  
  // Try to split by headings
  const sections = content.split(/(<h[1-6][^>]*>.*?<\/h[1-6]>|<p>.*?<\/p>)/i);
  for (let i = 0; i < sections.length; i++) {
    const text = sections[i].replace(/<[^>]+>/g, '').trim();
    if (!text) continue;
    
    if (sections[i].startsWith('<h')) {
      blocks.push({
        _type: 'block', _key: `h-${i}`, style: 'h2',
        markDefs: [],
        children: [{ _type: 'span', _key: `hs-${i}`, text, marks: [] }],
      });
    } else {
      blocks.push({
        _type: 'block', _key: `p-${i}`, style: 'normal',
        markDefs: [],
        children: [{ _type: 'span', _key: `ps-${i}`, text: text.substring(0, 3000), marks: [] }],
      });
    }
  }
  
  if (blocks.length === 0) continue;

  try {
    if (wp.type === 'case_study') {
      // Try to find matching case study by slug
      const slug = wp.slug.replace(/^case-study-/, '');
      await client.patch(`caseStudy-${slug}`).set({ 
        body: blocks,
        about: wp.excerpt || wp.content.replace(/<[^>]+>/g, '').substring(0, 1000),
        neonSynced: false,
      }).commit();
      caseUpdated++;
    } else {
      await client.patch(`post-${wp.slug}`).set({
        body: blocks,
        excerpt: wp.excerpt || '',
        neonSynced: false,
      }).commit();
      blogUpdated++;
    }
  } catch (e) {
    // Slug might not match — skip
  }
}

console.log(`✅ ${blogUpdated} blogs, ${caseUpdated} case studies enriched`);
