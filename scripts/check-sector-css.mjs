// Fails the build if anything outside SectorShowcase.astro styles the Sectors
// section. That component is the single source of truth for its markup,
// styles, states and motion (kits_design_system/docs/blocks/sector-showcase.md);
// a page-level override would quietly fork the design.
//
// Scans CSS files and <style> blocks in .astro files under src/ for selectors
// using `sectors-section`, `sector-card` or any `.sector-` / `.sectors-` class.
// Runs as `prebuild`, so `npm run build` (and the Cloudflare Pages build) stop.
import fs from 'fs';
import path from 'path';

const ROOT = 'src';
const OWNER = path.normalize('src/components/SectorShowcase.astro');
const SELECTOR = /(^|[^\w-])\.(sectors?-[\w-]+)/;

const files = [];
(function walk(dir) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p);
    else if (/\.(css|scss|astro)$/.test(e.name)) files.push(p);
  }
})(ROOT);

const hits = [];
for (const f of files) {
  if (path.normalize(f) === OWNER) continue;
  const src = fs.readFileSync(f, 'utf8');
  // .astro: only the CSS inside <style> blocks; .css: the whole file.
  const blocks = f.endsWith('.astro')
    ? [...src.matchAll(/<style\b[^>]*>([\s\S]*?)<\/style>/g)].map((m) => ({ css: m[1], at: m.index }))
    : [{ css: src, at: 0 }];
  for (const { css: raw, at } of blocks) {
    // Blank out /* comments */ but keep their newlines, so a comment that
    // mentions `.sector-card` is not an override and line numbers still match.
    const css = raw.replace(/\/\*[\s\S]*?\*\//g, (c) => c.replace(/[^\n]/g, ' '));
    css.split('\n').forEach((line, i) => {
      const m = line.match(SELECTOR);
      if (m) {
        const lineNo = src.slice(0, at).split('\n').length + i;
        hits.push(`${f}:${lineNo}  .${m[2]}`);
      }
    });
  }
}

if (hits.length) {
  console.error('✗ Sectors section styled outside SectorShowcase.astro:\n  ' + hits.join('\n  '));
  console.error('Make the change in src/components/SectorShowcase.astro instead.');
  process.exit(1);
}
console.log(`✓ sector CSS check: ${files.length} files, no overrides outside SectorShowcase.astro`);
