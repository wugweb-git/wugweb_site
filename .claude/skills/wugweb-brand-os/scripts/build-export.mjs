#!/usr/bin/env node
// Builds export/wugweb-brand-os.md: SKILL.md and every reference file in one
// document, for pasting or attaching in a tool that cannot read the folder.
//
// Plain Node, no dependencies, no Claude tooling.
//
// Usage:
//   node scripts/build-export.mjs            build the export
//   node scripts/build-export.mjs --check    exit 1 if the export is out of date
//
// The standing rules block is copied from docs/skills/STANDING-RULES.md in the
// repo at build time. It is never edited by hand. If that file is not found
// (the skill was copied out of the repo) the export says so and omits the block.

import { readFileSync, writeFileSync, readdirSync, statSync, existsSync, mkdirSync } from 'node:fs';
import { dirname, join, relative, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const skillDir = resolve(here, '..');
const outFile = join(skillDir, 'export', 'wugweb-brand-os.md');
const rulesPath = resolve(skillDir, '..', '..', '..', 'docs', 'skills', 'STANDING-RULES.md');
const check = process.argv.includes('--check');

function walk(dir) {
  const out = [];
  for (const name of readdirSync(dir).sort()) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) out.push(...walk(p));
    else if (name.endsWith('.md')) out.push(p);
  }
  return out;
}

function stripFrontmatter(text) {
  if (!text.startsWith('---')) return text;
  const end = text.indexOf('\n---', 3);
  return end === -1 ? text : text.slice(end + 4).replace(/^\n+/, '');
}

function posix(p) {
  return p.split(sep).join('/');
}

const skillText = readFileSync(join(skillDir, 'SKILL.md'), 'utf8');
const version = (skillText.match(/^version:\s*(.+)$/m) || [])[1] || 'unknown';

// Reference order: brand files first, then Visual OS, in a fixed order.
const refRoot = join(skillDir, 'references');
const order = [
  'identity-and-positioning.md',
  'brand-strategy.md',
  'values-and-principles.md',
  'audience.md',
  'messaging.md',
  'vocabulary.md',
  'brand-facts.md',
  'review-gates.md',
  'source-map.md',
  'tooling.md',
  'visual-os/art-direction.md',
  'visual-os/colour-type-photo-motion.md',
  'visual-os/metaphors.md',
  'visual-os/objects-and-components.md',
  'visual-os/formats-and-campaigns.md',
  'visual-os/references-and-patterns.md',
  'visual-os/judging-a-visual.md',
];
const found = walk(refRoot).map((p) => posix(relative(refRoot, p)));
const missing = order.filter((f) => !found.includes(f));
const extra = found.filter((f) => !order.includes(f));
if (missing.length || extra.length) {
  console.error('Reference files do not match the build order.');
  if (missing.length) console.error('  missing:', missing.join(', '));
  if (extra.length) console.error('  not in the build order:', extra.join(', '));
  process.exit(1);
}

const parts = [];
parts.push(`# wugweb-brand-os: single-file export

Version ${version}. Built from the skill folder by scripts/build-export.mjs. Do not edit by hand: change the source files and rebuild.

This one document holds the whole skill: the main instructions, then every reference file. Paste it or attach it in any tool. Read the first section first. A reference file is named in the main instructions; look for its heading below when the question needs it.

Contents: the owner's standing rules (copied), the main instructions, then ${order.length} reference files.
`);

if (existsSync(rulesPath)) {
  parts.push(`---

# Standing rules (copied from docs/skills/STANDING-RULES.md, do not edit here)

${readFileSync(rulesPath, 'utf8').replace(/^# .*\n+/, '').trim()}
`);
} else {
  parts.push(`---

# Standing rules

The standing rules file (docs/skills/STANDING-RULES.md) was not found when this export was built. Ask the owner for it. Until you have it, apply these without exception: invent nothing, change nothing without the owner's approval of that exact change, never crop or re-encode existing media, British English, sentence case, and no em or en dashes in visible copy.
`);
}

parts.push(`---

# Main instructions (SKILL.md)

${stripFrontmatter(skillText).trim()}
`);

for (const f of order) {
  const text = readFileSync(join(refRoot, f), 'utf8').trim();
  parts.push(`---

<!-- references/${f} -->

${text}
`);
}

const built = parts.join('\n').replace(/\n{3,}/g, '\n\n').trimEnd() + '\n';

if (check) {
  const current = existsSync(outFile) ? readFileSync(outFile, 'utf8') : '';
  if (current !== built) {
    console.error('export/wugweb-brand-os.md is out of date. Run: node scripts/build-export.mjs');
    process.exit(1);
  }
  console.log('export is up to date');
} else {
  mkdirSync(dirname(outFile), { recursive: true });
  writeFileSync(outFile, built);
  const words = built.split(/\s+/).filter(Boolean).length;
  console.log(`wrote ${posix(relative(process.cwd(), outFile))} (${words} words, ${order.length} reference files)`);
}
