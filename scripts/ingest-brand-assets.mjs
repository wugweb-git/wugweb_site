/**
 * scripts/ingest-brand-assets.mjs
 *
 * Ingests official vector SVG logo graphics (Clutch, DesignRush, GoodFirms, TopDevelopers)
 * and core brand marks into the Sanity `brandAsset` collection.
 *
 * Usage:
 *   DRY_RUN=1 node --env-file=.env scripts/ingest-brand-assets.mjs
 *   node --env-file=.env scripts/ingest-brand-assets.mjs
 */
import { createClient } from '@sanity/client';
import fs from 'node:fs';
import path from 'node:path';

const DRY_RUN = process.env.DRY_RUN === '1';
const TOKEN = process.env.SANITY_TOKEN || process.env.SANITY_API_TOKEN;

if (!TOKEN && !DRY_RUN) {
  console.error('❌ SANITY_TOKEN env var is required for mutations.');
  process.exit(1);
}

const client = createClient({
  projectId: 'splvhmk1',
  dataset: 'production',
  apiVersion: '2026-01-01',
  useCdn: false,
  token: TOKEN,
});

const BRAND_DIR = path.resolve('public/brand');

const ASSETS_TO_INGEST = [
  {
    _id: 'brand-clutch-logo',
    name: 'Clutch Logo (Vector)',
    slug: 'clutch-logo',
    category: 'vector-icon',
    variant: 'dark',
    fileRel: 'trust/clutch.svg',
    path: '/brand/trust/clutch.svg',
    dimensions: '88x25',
    usageNotes: 'Official vector logo for Clutch profile verification & TrustBadges recognition strip.',
    status: 'Active',
  },
  {
    _id: 'brand-designrush-logo',
    name: 'DesignRush Logo (Vector)',
    slug: 'designrush-logo',
    category: 'vector-icon',
    variant: 'dark',
    fileRel: 'trust/designrush.svg',
    path: '/brand/trust/designrush.svg',
    dimensions: '244x55',
    usageNotes: 'Official vector logo for DesignRush agency profile & TrustBadges strip.',
    status: 'Active',
  },
  {
    _id: 'brand-goodfirms-logo',
    name: 'GoodFirms Logo (Vector)',
    slug: 'goodfirms-logo',
    category: 'vector-icon',
    variant: 'dark',
    fileRel: 'trust/goodfirms.svg',
    path: '/brand/trust/goodfirms.svg',
    dimensions: '180x40',
    usageNotes: 'Official vector logo for GoodFirms profile & TrustBadges recognition strip.',
    status: 'Active',
  },
  {
    _id: 'brand-topdevelopers-logo',
    name: 'TopDevelopers Logo (Vector)',
    slug: 'topdevelopers-logo',
    category: 'vector-icon',
    variant: 'dark',
    fileRel: 'trust/topdevelopers.svg',
    path: '/brand/trust/topdevelopers.svg',
    dimensions: '200x45',
    usageNotes: 'Official vector logo for TopDevelopers directory & recognition strip.',
    status: 'Active',
  },
  {
    _id: 'brand-wugweb-logo-large',
    name: 'Wugweb Primary Logo Lockup',
    slug: 'wugweb-logo-large',
    category: 'logo-lockup',
    variant: 'default',
    fileRel: 'logo-large.svg',
    path: '/brand/logo-large.svg',
    dimensions: '149x54',
    usageNotes: 'Primary brand lockup (wordmark + icon) used in SiteHeader, SiteFooter, and marketing pages.',
    status: 'Active',
  },
  {
    _id: 'brand-wugweb-logo-small',
    name: 'Wugweb Compact Brand Mark',
    slug: 'wugweb-logo-small',
    category: 'logo-mark',
    variant: 'default',
    fileRel: 'logo-small.svg',
    path: '/brand/logo-small.svg',
    dimensions: '32x32',
    usageNotes: 'Square brand mark used for mobile navigation header, favicon fallback, and compact UI contexts.',
    status: 'Active',
  },
  {
    _id: 'brand-wugweb-og-default',
    name: 'Wugweb Default OpenGraph Image',
    slug: 'wugweb-og-default',
    category: 'social-og',
    variant: 'dark',
    fileRel: 'og-default.png',
    path: '/brand/og-default.png',
    dimensions: '1200x630',
    usageNotes: 'High-resolution OpenGraph / Twitter Card preview graphic for social sharing and SEO previews.',
    status: 'Active',
  },
  {
    _id: 'brand-wugweb-apple-touch-icon',
    name: 'Apple Touch Icon',
    slug: 'apple-touch-icon',
    category: 'favicon',
    variant: 'default',
    fileRel: 'apple-touch-icon.png',
    path: '/brand/apple-touch-icon.png',
    dimensions: '180x180',
    usageNotes: 'iOS home screen bookmark icon for Apple mobile devices.',
    status: 'Active',
  },
  {
    _id: 'brand-wugweb-pwa-512',
    name: 'PWA App Icon (512x512)',
    slug: 'pwa-icon-512',
    category: 'favicon',
    variant: 'default',
    fileRel: 'pwa-512.png',
    path: '/brand/pwa-512.png',
    dimensions: '512x512',
    usageNotes: 'High-res icon used for Progressive Web App installation manifest and splash loading screen.',
    status: 'Active',
  },
];

console.log(DRY_RUN ? '🔍 DRY RUN — Previewing Brand Asset Ingestion\n' : '🚀 LIVE RUN — Ingesting Brand Assets into Sanity\n');

let upserted = 0;
let failed = 0;

for (const item of ASSETS_TO_INGEST) {
  const filePath = path.join(BRAND_DIR, item.fileRel);
  let svgContent = null;

  if (item.fileRel.endsWith('.svg') && fs.existsSync(filePath)) {
    svgContent = fs.readFileSync(filePath, 'utf-8');
  }

  const doc = {
    _id: item._id,
    _type: 'brandAsset',
    name: item.name,
    slug: { _type: 'slug', current: item.slug },
    category: item.category,
    variant: item.variant,
    path: item.path,
    dimensions: item.dimensions,
    usageNotes: item.usageNotes,
    status: item.status,
    ...(svgContent ? { svgContent } : {}),
  };

  console.log(`Processing: ${item.name} (${item._id}) -> ${item.path}`);

  if (DRY_RUN) {
    upserted++;
    continue;
  }

  try {
    await client.createOrReplace(doc);
    console.log(`  ✅ Successfully saved ${item._id}`);
    upserted++;
  } catch (err) {
    console.error(`  ❌ Failed to save ${item._id}:`, err.message);
    failed++;
  }
}

console.log('\n╔══════════════════════════════════════════╗');
console.log(`║  BRAND ASSET INGESTION COMPLETE`);
console.log(`║  Saved: ${upserted}`);
console.log(`║  Failed: ${failed}`);
console.log('╚══════════════════════════════════════════╝');
