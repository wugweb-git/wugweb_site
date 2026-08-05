#!/usr/bin/env node
/**
 * Copy WordPress blog media from wugweb_design/wp-content/uploads into
 * public/assets/blog/wp/, and produce a per-post media map:
 *   { slug, cover: <path or null>, images: [paths] }
 * Only copies files that exist; missing files are reported (not fatal).
 */
import fs from 'fs';
import path from 'path';

const UPLOADS = '/Users/abcom/Documents/GitHub/wugweb_design/wp-content/uploads';
const DEST = '/Users/abcom/Documents/GitHub/wugweb_site/public/assets/blog/wp';
const OUT = '/Users/abcom/Documents/GitHub/wugweb_site/notion-data/wp-media-map.json';

const posts = JSON.parse(fs.readFileSync('/Users/abcom/Documents/GitHub/wugweb_site/notion-data/wp-posts-extract.json', 'utf8'));
fs.mkdirSync(DEST, { recursive: true });

function findFile(relPath) {
  // relPath like 2023/07/Frame-16-1024x512.png — try exact, then strip size suffix
  const candidates = [relPath];
  // strip -1024x512 style suffix before extension
  const m = relPath.match(/^(.*)-\d+x\d+(\.[a-z0-9]+)$/i);
  if (m) candidates.push(m[1] + m[2]);
  // also try original (some content refs the -scaled or thumb versions)
  for (const c of candidates) {
    const full = path.join(UPLOADS, c);
    if (fs.existsSync(full)) return c;
  }
  // search by basename anywhere in uploads
  const base = path.basename(relPath).replace(/-\d+x\d+(?=\.[a-z0-9]+)/i, '');
  const found = [];
  const walk = (dir) => {
    for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, e.name);
      if (e.isDirectory()) walk(full);
      else if (e.name.toLowerCase() === base.toLowerCase() || e.name.toLowerCase().startsWith(base.toLowerCase().replace(/\.[a-z0-9]+$/i, ''))) found.push(full);
    }
  };
  try { walk(UPLOADS); } catch {}
  return found[0] ? path.relative(UPLOADS, found[0]) : null;
}

const map = [];
let copied = 0, missingCount = 0;
const missingList = [];

for (const p of posts) {
  const entry = { slug: p.slug, title: p.title, cover: null, images: [] };
  // Determine cover: prefer a file whose name starts with the post's number prefix
  // Fall back to first referenced image.
  for (const up of p.uploadPaths || []) {
    const rel = findFile(up);
    if (!rel) { missingCount++; missingList.push(up); continue; }
    const destName = rel.replace(/\//g, '__').replace(/[^a-zA-Z0-9._-]/g, '_');
    const destRel = 'blog/wp/' + destName;
    const destFull = path.join('/Users/abcom/Documents/GitHub/wugweb_site/public/assets', destRel);
    if (!fs.existsSync(destFull)) {
      fs.copyFileSync(path.join(UPLOADS, rel), destFull);
      copied++;
    }
    entry.images.push('/assets/' + destRel);
    if (!entry.cover) entry.cover = '/assets/' + destRel;
  }
  map.push(entry);
}

fs.writeFileSync(OUT, JSON.stringify(map, null, 2));
console.log(`Copied ${copied} media files -> public/assets/blog/wp/`);
console.log(`Missing media refs: ${missingCount}`);
console.log(`Post covers mapped: ${map.filter(m => m.cover).length}/${map.length}`);
for (const m of map.slice(0, 8)) {
  console.log(`  ${m.slug.slice(0, 45)} cover=${m.cover ? 'yes' : 'NO'}`);
}
fs.writeFileSync('/Users/abcom/Documents/GitHub/wugweb_site/notion-data/wp-missing-media.json', JSON.stringify(missingList, null, 2));
