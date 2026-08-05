#!/usr/bin/env node
/**
 * Copy real media for the extracted Uncode posts:
 *  - inline uploads referenced in post content
 *  - attachment files (featured/gallery) from guid
 * into public/assets/uncode/ (blog + caseStudy folders).
 * Reports files that don't exist (deleted from uploads).
 */
import fs from 'fs';
import path from 'path';

const UPLOADS = '/Users/abcom/Documents/GitHub/vedanshu_design/wp-content/uploads';
const DEST = '/Users/abcom/Documents/GitHub/wugweb_site/public/assets/uncode';
const data = JSON.parse(fs.readFileSync('/Users/abcom/Documents/GitHub/wugweb_site/notion-data/uncode-extract.json', 'utf8'));

fs.mkdirSync(DEST, { recursive: true });

// Build guid -> local path map for attachments
const uploadsToLocal = {};
for (const a of data.attachments) {
  const m = a.guid?.match(/wp-content\/uploads\/([0-9]+\/[0-9]+\/[A-Za-z0-9_.-]+\.(?:png|jpe?g|webp|gif|mp4))/i);
  if (m) uploadsToLocal[m[1]] = a;
}

function copyUpload(relPath, destRel) {
  const full = path.join(UPLOADS, relPath);
  const destFull = path.join(DEST, destRel);
  if (fs.existsSync(full)) {
    if (!fs.existsSync(destFull)) {
      fs.mkdirSync(path.dirname(destFull), { recursive: true });
      fs.copyFileSync(full, destFull);
    }
    return '/assets/uncode/' + destRel;
  }
  // try stripping size suffix (-1024x512 etc)
  const m = relPath.match(/^(.*)-\d+x\d+(\.[a-z0-9]+)$/i);
  if (m) {
    const alt = copyUpload(m[1] + m[2], destRel);
    if (alt) return alt;
  }
  return null;
}

let copied = 0, missing = 0;
const report = { blogs: [], caseStudies: [] };
const missingList = [];

for (const p of data.posts) {
  const folder = p.type === 'blog' ? 'blog' : 'case';
  const entry = { slug: p.slug, title: p.title, cover: null, images: [], missing: [] };
  const seen = new Set();

  // 1. inline media from content
  for (const up of p.media.inline) {
    const rel = up.replace('wp-content/uploads/', '');
    const destRel = `${folder}/${p.slug}/inline/${path.basename(rel)}`;
    const url = copyUpload(rel, destRel);
    if (url) { if (!seen.has(url)) { entry.images.push(url); seen.add(url); copied++; } }
    else { missing++; missingList.push(rel); entry.missing.push(rel); }
  }

  // 2. attachment media (featured/gallery)
  for (const att of p.media.attachments) {
    const m = att.guid?.match(/wp-content\/uploads\/([0-9]+\/[0-9]+\/[A-Za-z0-9_.-]+\.(?:png|jpe?g|webp|gif|mp4))/i);
    if (!m) continue;
    const rel = m[1];
    const destRel = `${folder}/${p.slug}/att/${path.basename(rel)}`;
    const url = copyUpload(rel, destRel);
    if (url) {
      if (!entry.cover && !entry.images.length) entry.cover = url;
      if (!seen.has(url)) { entry.images.push(url); seen.add(url); copied++; }
    } else { missing++; missingList.push(rel); entry.missing.push(rel); }
  }

  if (p.type === 'blog') report.blogs.push(entry);
  else report.caseStudies.push(entry);
}

fs.writeFileSync('/Users/abcom/Documents/GitHub/wugweb_site/notion-data/uncode-media-report.json', JSON.stringify(report, null, 2));
fs.writeFileSync('/Users/abcom/Documents/GitHub/wugweb_site/notion-data/uncode-missing-media.json', JSON.stringify(missingList, null, 2));
console.log(`Copied ${copied} media files | ${missing} missing`);
console.log(`Blogs with cover: ${report.blogs.filter(b => b.cover).length}/${report.blogs.length}`);
console.log(`Case studies with media: ${report.caseStudies.filter(c => c.images.length || c.cover).length}/${report.caseStudies.length}`);
for (const b of report.blogs) {
  console.log(`  [blog] ${b.slug.slice(0, 45)} | cover: ${b.cover ? 'yes' : 'NO'} | imgs: ${b.images.length} | missing: ${b.missing.length}`);
}
