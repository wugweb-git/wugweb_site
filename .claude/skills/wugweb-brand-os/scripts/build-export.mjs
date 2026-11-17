#!/usr/bin/env node
// wugweb-brand-os: build-export.mjs
// Builds export/wugweb-brand-os.md: SKILL.md plus every reference file in one
// document, to paste or attach in GPT, Cursor or any other tool.
// Also checks the skill's own files. Plain Node, no packages.
// Usage: node scripts/build-export.mjs [--check]
//   --check  run the checks only and write nothing

import { readFileSync, writeFileSync, mkdirSync, readdirSync, statSync, existsSync } from 'node:fs';
import { dirname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const read = (p) => readFileSync(join(ROOT, p), 'utf8');

const listMd = (dir) => {
  const out = [];
  const abs = join(ROOT, dir);
  if (!existsSync(abs)) return out;
  for (const f of readdirSync(abs).sort()) {
    const p = join(abs, f);
    if (statSync(p).isDirectory()) continue;
    if (f.endsWith('.md')) out.push(`${dir}/${f}`);
  }
  return out;
};

export function build() {
  const skill = read('SKILL.md');
  const version = (skill.match(/version:\s*"([^"]+)"/) || [])[1] || 'unknown';
  const body = skill.replace(/^---\n[\s\S]*?\n---\n/, '').trim();
  const files = [...listMd('references'), ...listMd('references/visual-os'), ...listMd('examples')];
  const rulesPath = join(ROOT, '..', '..', '..', 'docs', 'skills', 'STANDING-RULES.md');
  const rules = existsSync(rulesPath)
    ? readFileSync(rulesPath, 'utf8').replace(/^# .*\n+/, '').trim()
    : 'The standing rules file (docs/skills/STANDING-RULES.md) was not found when this export was built. Ask the owner for it.';
  const parts = [
    `<!-- wugweb-brand-os ${version}. Built by scripts/build-export.mjs. Do not edit; edit the source files. -->`,
    '',
    '# Standing rules (copied from docs/skills/STANDING-RULES.md; read first, they win)',
    '',
    rules,
    '',
    '---',
    '',
    body,
  ];
  for (const f of files) parts.push('', '---', '', `<!-- ${f} -->`, '', read(f).trim());
  return { text: parts.join('\n') + '\n', files };
}

export function check() {
  const problems = [];
  const skill = read('SKILL.md');
  const fm = skill.match(/^---\n([\s\S]*?)\n---\n/);
  if (!fm) problems.push('SKILL.md: no frontmatter');
  else {
    if (!/^name:\s*wugweb-brand-os$/m.test(fm[1])) problems.push('SKILL.md: name is not wugweb-brand-os');
    if (!/^description:/m.test(fm[1])) problems.push('SKILL.md: no description');
    if (/^version:/m.test(fm[1])) problems.push('SKILL.md: version must sit under metadata');
    const body = skill.slice(fm[0].length);
    const words = body.split(/\s+/).filter((w) => /[A-Za-z0-9]/.test(w)).length;
    if (words < 1500 || words > 2000) problems.push(`SKILL.md: body is ${words} words, wanted 1,500 to 2,000`);
    for (const m of new Set(body.match(/`((?:references|scripts|evals)\/[^`\s]+\.[a-z]+)`/g) || [])) {
      const p = m.slice(1, -1);
      if (!existsSync(join(ROOT, p))) problems.push(`SKILL.md names a missing file: ${p}`);
    }
  }
  const walk = (d, acc = []) => {
    for (const f of readdirSync(d)) {
      const p = join(d, f);
      if (statSync(p).isDirectory()) { if (f !== 'node_modules') walk(p, acc); }
      else if (/\.(md|mjs|json)$/.test(f)) acc.push(p);
    }
    return acc;
  };
  for (const p of walk(ROOT)) {
    const rel = relative(ROOT, p);
    const txt = readFileSync(p, 'utf8');
    const dashes = (txt.match(new RegExp(String.fromCharCode(91, 0x2014, 0x2013, 93), "g")) || []).length;
    if (dashes) problems.push(`${rel}: ${dashes} em or en dashes`);
    if (rel.endsWith('.md') && !rel.startsWith('export')) {
      // No token values: a hex colour or a CSS custom property means a value leaked in from kits.
      const hex = txt.match(/#[0-9a-fA-F]{6}\b/g);
      if (hex) problems.push(`${rel}: colour value ${hex[0]} (values live in wugweb-kits)`);
      const tok = txt.match(/--[a-z]+-[a-z0-9-]+/g);
      if (tok) problems.push(`${rel}: token name ${tok[0]} (tokens live in wugweb-kits)`);
      // Vendor and helper names belong in references/tooling.md only.
      if (rel !== 'references/tooling.md' && rel !== 'CHANGELOG.md') {
        const vendor = txt.match(/\b(brightdata|brand-voice:|marketing:|skill-creator|theme-factory)\b/);
        if (vendor) problems.push(`${rel}: names a helper (${vendor[0]}); helpers belong in references/tooling.md`);
      }
    }
  }
  try {
    const e = JSON.parse(read('evals/evals.json'));
    if (!e.evals.every((x) => x.id && x.prompt && Array.isArray(x.expected) && x.status)) {
      problems.push('evals/evals.json: an eval is missing id, prompt, expected or status');
    }
  } catch (err) {
    problems.push(`evals/evals.json: ${err.message}`);
  }
  return problems;
}

const isMain = process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1];
if (isMain) {
  const problems = check();
  for (const p of problems) console.log(`FAIL  ${p}`);
  if (!process.argv.includes('--check')) {
    const { text, files } = build();
    mkdirSync(join(ROOT, 'export'), { recursive: true });
    writeFileSync(join(ROOT, 'export', 'wugweb-brand-os.md'), text);
    console.log(`export/wugweb-brand-os.md written: SKILL.md plus ${files.length} files, ${text.split('\n').length} lines`);
  }
  console.log(problems.length ? `${problems.length} problems` : 'checks passed');
  process.exit(problems.length ? 1 : 0);
}
