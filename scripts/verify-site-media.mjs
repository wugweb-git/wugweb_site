#!/usr/bin/env node
/**
 * Checks every entry in src/lib/site-media.json exists in the R2 bucket
 * (key = assets/<path>) via the public base URL. Exit 1 if any are missing.
 *   node scripts/verify-site-media.mjs [baseUrl]
 */
import fs from 'node:fs';
const reg = JSON.parse(fs.readFileSync(new URL('../src/lib/site-media.json', import.meta.url), 'utf8'));
const base = (process.argv[2] || process.env.PUBLIC_ASSETS_BASE || 'https://pub-39ad1d03baec440faf48303be95c3782.r2.dev').replace(/\/+$/, '');
const paths = [];
(function walk(o) {
  if (typeof o === 'string') return;
  if (Array.isArray(o)) return o.forEach(walk);
  for (const [k, v] of Object.entries(o)) {
    if (k === '_comment') continue;
    if (typeof v === 'string' && (k === 'path' || !k.startsWith('name'))) paths.push(v); else walk(v);
  }
})(reg);
const missing = [];
for (const p of paths) {
  const url = `${base}/assets/${p.split('/').map(encodeURIComponent).join('/')}`;
  const r = await fetch(url, { method: 'HEAD' });
  if (r.status !== 200) missing.push(`${r.status} ${p}`);
}
console.log(`${paths.length - missing.length}/${paths.length} site-media entries found in R2`);
if (missing.length) { console.log(missing.join('\n')); process.exit(1); }
