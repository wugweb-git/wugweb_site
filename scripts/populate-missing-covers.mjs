#!/usr/bin/env node
/**
 * scripts/populate-missing-covers.mjs
 *
 * Scans posts and case studies missing cover media and matches them against
 * existing registered R2 / local assets.
 *
 * Usage:
 *   DRY_RUN=1 node scripts/populate-missing-covers.mjs
 *   node scripts/populate-missing-covers.mjs
 */

import { createClient } from '@sanity/client';

const projectId = process.env.PUBLIC_SANITY_PROJECT_ID || 'splvhmk1';
const dataset   = process.env.PUBLIC_SANITY_DATASET || 'production';
const token     = process.env.SANITY_API_TOKEN || process.env.SANITY_AUTH_TOKEN || '';
const isDryRun  = process.env.DRY_RUN === '1';

const client = createClient({
  projectId,
  dataset,
  apiVersion: '2026-01-01',
  useCdn: false,
  token: token || undefined,
});

async function main() {
  console.log(`\n╔═════════════════════════════════════════════════════════════════╗`);
  console.log(`║ Wugweb Cover Media Asset Matcher & Populator                   ║`);
  console.log(`║ Project: ${projectId} | Dataset: ${dataset} | DryRun: ${isDryRun ? 'YES' : 'NO'} ║`);
  console.log(`╚═════════════════════════════════════════════════════════════════╝\n`);

  // 1. Fetch all assets
  const assets = await client.fetch(`*[_type == "asset" && defined(sitePath)] {
    _id, name, displayName, sitePath, relativePath, assetGroup, extension
  }`);
  console.log(`Loaded ${assets.length} registered assets.`);

  // Index assets by keyword and path
  const assetByPath = new Map();
  assets.forEach((a) => {
    if (a.sitePath) assetByPath.set(a.sitePath.toLowerCase(), a);
  });

  // 2. Fetch posts and caseStudies missing covers
  const missingPosts = await client.fetch(`*[_type == "post" && !(_id in path("drafts.**")) && !defined(coverImage) && !defined(coverPath)] {
    _id, title, "slug": slug.current, category
  }`);

  const missingCaseStudies = await client.fetch(`*[_type == "caseStudy" && !(_id in path("drafts.**")) && !defined(coverImage) && !defined(coverPath)] {
    _id, title, "slug": slug.current, category
  }`);

  console.log(`Found ${missingPosts.length} posts and ${missingCaseStudies.length} case studies missing cover media.\n`);

  let matchedPosts = 0;
  let matchedCS = 0;

  // Category fallback covers from brand/service assets
  const categoryCoverMap = {
    'SEO': '/assets/more/og-default.jpg',
    'Performance Marketing': '/assets/more/og-default.jpg',
    'Brand & Strategy': '/assets/brand/brand-preview.png',
    'Digital Transformation': '/assets/more/og-default.jpg',
    'Experience Design': '/assets/more/og-default.jpg',
    'Web & App Development': '/assets/more/og-default.jpg',
    'AI & Automation': '/assets/more/og-default.jpg',
    'Data & Analytics': '/assets/more/og-default.jpg',
    'Infrastructure & DevOps': '/assets/more/og-default.jpg',
    'Consulting': '/assets/more/og-default.jpg',
    'Operations': '/assets/more/og-default.jpg',
  };

  for (const post of missingPosts) {
    // Try exact slug match in assets
    const slug = String(post.slug || '').toLowerCase();
    let matchedAsset = assets.find((a) => {
      const p = String(a.sitePath || '').toLowerCase();
      return p.includes(slug) && (p.endsWith('.jpg') || p.endsWith('.png') || p.endsWith('.webp'));
    });

    let assignedPath = matchedAsset ? matchedAsset.sitePath : null;

    if (assignedPath) {
      matchedPosts++;
      console.log(`[POST MATCH] "${post.title}" -> ${assignedPath}`);
      if (!isDryRun && token) {
        try {
          await client.patch(post._id).set({ coverPath: assignedPath }).commit();
          console.log(`  ✓ Updated ${post._id}`);
        } catch (err) {
          console.error(`  ✗ Update failed: ${err.message}`);
        }
      }
    }
  }

  for (const cs of missingCaseStudies) {
    const slug = String(cs.slug || '').toLowerCase();
    let matchedAsset = assets.find((a) => {
      const p = String(a.sitePath || '').toLowerCase();
      return (p.includes(slug) || p.includes(`work/${slug}`)) && (p.endsWith('.jpg') || p.endsWith('.png') || p.endsWith('.webp') || p.endsWith('.mp4'));
    });

    let assignedPath = matchedAsset ? matchedAsset.sitePath : null;

    if (assignedPath) {
      matchedCS++;
      console.log(`[CS MATCH] "${cs.title}" -> ${assignedPath}`);
      if (!isDryRun && token) {
        try {
          await client.patch(cs._id).set({ coverPath: assignedPath }).commit();
          console.log(`  ✓ Updated ${cs._id}`);
        } catch (err) {
          console.error(`  ✗ Update failed: ${err.message}`);
        }
      }
    }
  }

  console.log(`\nSummary:`);
  console.log(`- Matched Posts: ${matchedPosts} / ${missingPosts.length}`);
  console.log(`- Matched Case Studies: ${matchedCS} / ${missingCaseStudies.length}`);
  if (isDryRun) {
    console.log(`\n[DRY RUN] No changes were written to Sanity. Run without DRY_RUN=1 to apply.`);
  }
}

main().catch((err) => {
  console.error('Fatal error:', err);
  process.exit(1);
});
