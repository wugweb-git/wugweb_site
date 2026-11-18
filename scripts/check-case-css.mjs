// Fails the build if anything outside src/components/work/*.astro styles the
// case-study page. Those components are the single source of truth for /work/
// [slug] markup, styles, states and motion. A page-level override would fork
// the design the way the old /work template did before Part 2.
//
// Scans CSS files and <style> blocks in .astro files under src/ for selectors
// using any `.case-` class. The resolver module (src/lib/case-layout.ts) is a
// JS file so no CSS lives there.
// Runs as `prebuild`, so `npm run build` (and Cloudflare Pages) stop.

import fs from 'fs';
import path from 'path';

const ROOT = 'src';
const OWNER_DIR = path.normalize('src/components/work');
// Legacy template: exempted until the thin template replaces it. See
// docs/skills/wugweb-work/PLAN.md step C3. Remove this entry after the
// flip is approved by the owner.
const LEGACY = new Set([
  path.normalize('src/pages/work/[slug].astro')
]);
const SELECTOR = /(^|[^\w-])\.(case-[\w-]+)/;

const files = [];
(function walk(dir) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p);
    else if (/\.(astro|css)$/.test(e.name)) files.push(p);
  }
})(ROOT);

const hits = [];
for (const file of files) {
  const normalized = path.normalize(file);
  if (normalized.startsWith(OWNER_DIR + path.sep)) continue;
  if (LEGACY.has(normalized)) continue;
  const src = fs.readFileSync(file, 'utf8');
  // For .astro files, only check inside <style> blocks. For .css files, the
  // whole file. This avoids catching `<CaseBlocks />` or `className="case-..."`
  // inside markup.
  const blocks = /\.css$/.test(file)
    ? [src]
    : Array.from(src.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/gi)).map(m => m[1]);
  for (const block of blocks) {
    const lines = block.split('\n');
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      // Ignore selectors inside comments.
      const noComment = line.replace(/\/\*[\s\S]*?\*\//g, '').replace(/\/\*.*$/, '');
      const m = noComment.match(SELECTOR);
      if (m) hits.push({ file, line: i + 1, selector: `.${m[2]}`, text: line.trim() });
    }
  }
}

if (hits.length > 0) {
  console.error('case-css guard: .case-* selectors are allowed only in src/components/work/*.astro.');
  for (const h of hits) console.error(`  ${h.file}:${h.line}  ${h.selector}  (${h.text})`);
  process.exit(1);
}

console.log(`case-css guard: clean (${files.length} files scanned).`);
