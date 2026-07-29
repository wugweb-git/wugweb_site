#!/usr/bin/env node
/**
 * Download missing assets from wugweb.online and organize into public/assets/
 * Then sync to Notion asset sheet paths.
 *
 * Usage: node scripts/download-assets.mjs
 */

import fs from 'fs';
import path from 'path';
import { createClient } from '@sanity/client';

const SANITY_TOKEN = process.env.SANITY_TOKEN;

const BASE = 'https://wugweb.online';
const LOCAL_DIR = path.resolve(import.meta.dirname, '../public/assets');

// Asset mapping: Notion relative path → wugweb.online URL
// Built from the Notion case studies data which has direct media URLs
const ASSET_MAP = JSON.parse(fs.readFileSync(
  path.resolve(import.meta.dirname, '../notion-data/asset-urls.json'), 'utf8'
));

async function download(url, dest) {
  const dir = path.dirname(dest);
  fs.mkdirSync(dir, { recursive: true });
  
  try {
    const res = await fetch(url);
    if (!res.ok) return false;
    const buffer = Buffer.from(await res.arrayBuffer());
    fs.writeFileSync(dest, buffer);
    return true;
  } catch {
    return false;
  }
}

async function main() {
  console.log(`📋 ${ASSET_MAP.length} assets to download\n`);
  
  let ok = 0, fail = 0;
  for (const asset of ASSET_MAP) {
    const dest = path.join(LOCAL_DIR, asset.path);
    if (fs.existsSync(dest)) { ok++; continue; }
    
    console.log(`  Downloading ${asset.path}...`);
    const success = await download(asset.url, dest);
    if (success) { ok++; }
    else { fail++; console.log(`  ❌ Failed: ${asset.url}`); }
  }
  
  console.log(`\n✅ ${ok} assets (${ok - (ASSET_MAP.length - fail)} existed, ${ok - ASSET_MAP.length + fail} downloaded), ❌ ${fail} failed`);
}

main().catch(console.error);
