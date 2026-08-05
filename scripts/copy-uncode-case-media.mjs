#!/usr/bin/env node
/**
 * Copy real case-study media (attachments parented to portfolio posts)
 * from vedanshu_design uploads into public/assets/uncode/case/<slug>/.
 */
import fs from 'fs';
import path from 'path';

const UPLOADS = '/Users/abcom/Documents/GitHub/vedanshu_design/wp-content/uploads';
const DEST = '/Users/abcom/Documents/GitHub/wugweb_site/public/assets/uncode/case';
const data = JSON.parse(fs.readFileSync('/Users/abcom/Documents/GitHub/wugweb_site/notion-data/uncode-extract.json', 'utf8'));

// Case id -> slug (from extract)
const caseByParent = {};
for (const p of data.posts) {
  if (p.type === 'caseStudy') caseByParent[p.id] = p.slug;
}

// Build attachment id -> {guid, file}
const attById = {};
for (const a of data.attachments) attById[a.id] = a;

// Postmeta: attachment parent mapping — need parent from wp_posts attachments
// We have it in the extract attachments (parent field).
const attByParent = {};
for (const a of data.attachments) {
  if (a.parent && caseByParent[a.parent]) {
    attByParent[a.parent] = attByParent[a.parent] || [];
    const m = a.guid?.match(/wp-content\/uploads\/([0-9]+\/[0-9]+\/[^"']+\.(?:png|jpe?g|webp|gif|mp4|svg))/i);
    if (m) attByParent[a.parent].push({ rel: m[1], name: path.basename(m[1]) });
  }
}

let copied = 0, missing = 0;
const report = {};
for (const [pid, files] of Object.entries(attByParent)) {
  const slug = caseByParent[pid];
  const dir = path.join(DEST, slug);
  fs.mkdirSync(dir, { recursive: true });
  report[slug] = { files: [], missing: [] };
  for (const f of files) {
    const src = path.join(UPLOADS, f.rel);
    const destFull = path.join(dir, f.name);
    if (fs.existsSync(src)) {
      if (!fs.existsSync(destFull)) {
        fs.copyFileSync(src, destFull);
        copied++;
      }
      report[slug].files.push('/assets/uncode/case/' + slug + '/' + f.name);
    } else {
      missing++;
      report[slug].missing.push(f.rel);
    }
  }
}

fs.writeFileSync('/Users/abcom/Documents/GitHub/wugweb_site/notion-data/uncode-case-media.json', JSON.stringify(report, null, 2));
console.log(`Copied ${copied} case-study media files | ${missing} missing`);
for (const [slug, r] of Object.entries(report)) {
  console.log(`  ${slug.slice(0, 45).padEnd(45)} | files: ${r.files.length} | missing: ${r.missing.length}`);
}
