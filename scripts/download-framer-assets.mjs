#!/usr/bin/env node
/**
 * Download all Framer CDN assets into public/assets/framer/{caseStudy}/
 *
 * Usage: node scripts/download-framer-assets.mjs
 */

import fs from 'fs';
import path from 'path';

const src = path.resolve(import.meta.dirname, '../notion-data/framer-urls.json');
const urls = JSON.parse(fs.readFileSync(src, 'utf8'));
const baseDir = path.resolve(import.meta.dirname, '../public/assets/framer');

console.log(`📋 ${urls.length} Framer URLs to download\n`);

let ok = 0, fail = 0, skip = 0;

for (const item of urls) {
  const dir = path.join(baseDir, item.caseStudy || 'misc');
  fs.mkdirSync(dir, { recursive: true });

  // Build filename
  const urlStr = item.url;
  const urlExt = urlStr.match(/\.(jpe?g|png|gif|webp|svg|mp4|mov)/i)?.[1]?.toLowerCase() || 'jpg';
  const filename = `${item.name || 'img'}-${Math.random().toString(36).slice(2, 6)}.${urlExt}`;
  const dest = path.join(dir, filename);

  if (fs.existsSync(dest)) { skip++; continue; }

  try {
    const res = await fetch(urlStr, { signal: AbortSignal.timeout(15000) });
    if (!res.ok) { console.log(`  HTTP ${res.status}: ${urlStr.substring(0, 80)}`); fail++; continue; }
    const buf = Buffer.from(await res.arrayBuffer());
    fs.writeFileSync(dest, buf);
    ok++;
  } catch (e) {
    console.log(`  FAIL: ${urlStr.substring(0, 80)} — ${e.message.substring(0, 40)}`);
    fail++;
  }

  if (ok % 25 === 0) console.log(`  ${ok}/${urls.length} downloaded...`);
}

console.log(`\n✅ ${ok} downloaded, ${skip} existed, ${fail} failed`);
