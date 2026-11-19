#!/usr/bin/env node
// Structure check for this skill. Plain Node, no packages, reads only.
//
//   node scripts/validate.mjs
//
// It checks what makes the folder a complete, portable skill: the frontmatter,
// the name, the description, the version in every place it is stated, the parts
// of the package, that every file SKILL.md points at exists, that the evals
// parse, and that the hand-written files hold no em or en dash. It does not
// judge the rules themselves; scripts/test.mjs and the evals do that.

import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { dirname, join, basename, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const NAME = basename(ROOT);
let errors = 0; let warnings = 0; let checks = 0;
const ok = (label, pass, detail = '', warn = false) => {
  checks++;
  if (pass) return console.log(`ok    ${label}`);
  if (warn) { warnings++; return console.log(`WARN  ${label}${detail ? `  (${detail})` : ''}`); }
  errors++; console.log(`FAIL  ${label}${detail ? `  (${detail})` : ''}`);
};
const read = (p) => readFileSync(join(ROOT, p), 'utf8');
const has = (p) => existsSync(join(ROOT, p));

const skill = read('SKILL.md');
const fmMatch = skill.match(/^---\n([\s\S]*?)\n---\n/);
ok('SKILL.md has YAML frontmatter', !!fmMatch);
const fm = fmMatch ? fmMatch[1] : '';
const body = fmMatch ? skill.slice(fmMatch[0].length) : skill;
const field = (k) => { const m = fm.match(new RegExp(`^${k}:\\s*(.*)$`, 'm')); return m ? m[1].trim().replace(/^"(.*)"$/, '$1').replace(/\\"/g, '"') : ''; };
const name = field('name');
const description = field('description');
const version = (fm.match(/^\s+version:\s*"?([^"\n]+)"?/m) || [])[1] || '';

ok('name equals the folder name', name === NAME, `"${name}" in ${NAME}/`);
ok('name is lowercase letters, digits and hyphens, 64 characters or fewer', /^[a-z0-9]+(-[a-z0-9]+)*$/.test(name) && name.length <= 64, name);
ok('description is present and 1,024 characters or fewer', description.length > 0 && description.length <= 1024, `${description.length} characters`);
ok('description says when to use the skill', /should be used when|use (it|this) (when|for)/i.test(description), '', true);
ok('licence line in the frontmatter', !!field('license'));
ok('version under metadata, in the form x.y.z', /^\d+\.\d+\.\d+$/.test(version), version);

const words = body.split(/\s+/).filter(Boolean).length;
ok('SKILL.md body is under 5,000 words', words < 5000, `${words} words`);
ok('SKILL.md is under 500 lines', skill.split('\n').length < 500, `${skill.split('\n').length} lines`, true);

for (const part of ['README.md', 'CHANGELOG.md', 'LICENSE', 'LESSONS.md', 'metadata.json', 'AGENTS.md', 'references', 'evals', 'scripts/build.mjs', 'scripts/test.mjs', 'export', 'adapters/cursor', 'adapters/chatgpt', 'agents/openai.yaml']) {
  ok(`has ${part}`, has(part));
}

let meta = {};
try { meta = JSON.parse(read('metadata.json')); ok('metadata.json parses', true); } catch (e) { ok('metadata.json parses', false, e.message); }
ok('metadata.json version equals SKILL.md', meta.version === version, `${meta.version} and ${version}`);
ok(`CHANGELOG.md has an entry for ${version}`, has('CHANGELOG.md') && read('CHANGELOG.md').includes(version));
if (has('README.md')) {
  const readme = read('README.md');
  const stated = [...readme.matchAll(/\bversion (\d+\.\d+\.\d+)/gi)].map((m) => m[1]);
  ok('every version stated in README.md is the current one', stated.every((v) => v === version), stated.join(', '));
  for (const h of ['What it does', 'What is in the package', 'Install', 'Run', 'Licence']) ok(`README.md has a "${h}" section`, new RegExp(`^## ${h}`, 'mi').test(readme), '', true);
}

// Every file SKILL.md points at exists.
const pointers = [...new Set((skill.match(/`((?:references|scripts|examples|evals|export|adapters|agents)\/[^`\s*<>]+)`/g) || []).map((p) => p.slice(1, -1)))];
const missing = pointers.filter((p) => !has(p));
ok(`every file SKILL.md points at exists (${pointers.length})`, missing.length === 0, missing.join(', '));

// Every reference file is reachable from SKILL.md or from another reference.
const walk = (dir) => readdirSync(join(ROOT, dir), { withFileTypes: true }).flatMap((e) => (e.isDirectory() ? walk(join(dir, e.name)) : [join(dir, e.name)]));
const refs = has('references') ? walk('references').filter((f) => f.endsWith('.md')) : [];
const allText = skill + refs.map((f) => read(f)).join('\n') + (has('README.md') ? read('README.md') : '');
const orphans = refs.filter((f) => !allText.includes(basename(f)));
ok(`every reference file is named somewhere (${refs.length})`, orphans.length === 0, orphans.join(', '), true);

// Evals parse and hold at least three cases.
let cases = 0; let badEvals = [];
if (has('evals')) {
  for (const f of walk('evals').filter((x) => x.endsWith('.json'))) {
    try { const j = JSON.parse(read(f)); const list = Array.isArray(j) ? j : Array.isArray(j.evals) ? j.evals : Array.isArray(j.cases) ? j.cases : [j]; cases += list.length; } catch (e) { badEvals.push(`${f}: ${e.message}`); }
  }
  const dirs = readdirSync(join(ROOT, 'evals'), { withFileTypes: true }).filter((e) => e.isDirectory() && e.name !== 'fixtures').length;
  cases = Math.max(cases, dirs);
}
ok('eval files parse', badEvals.length === 0, badEvals.join('; '));
ok('at least three eval cases', cases >= 3, `${cases} found`);

// No em or en dash in the files a person wrote.
const hand = ['SKILL.md', 'README.md', 'LESSONS.md', ...refs].filter(has);
const DASH = new RegExp('[' + String.fromCharCode(0x2013, 0x2014) + ']');
const dashed = hand.filter((f) => DASH.test(read(f)));
ok('no em or en dash in the hand-written files', dashed.length === 0, dashed.join(', '));

// Generated files are not older than their sources.
if (has('AGENTS.md')) {
  const newestSource = Math.max(...['SKILL.md', ...refs].map((f) => statSync(join(ROOT, f)).mtimeMs));
  ok('AGENTS.md is not older than its sources', statSync(join(ROOT, 'AGENTS.md')).mtimeMs >= newestSource - 2000, 'run scripts/build.mjs', true);
}

console.log(`\n${NAME} ${version}: ${checks} checks, ${errors} errors, ${warnings} warnings. Body ${words} words, ${refs.length} reference files, ${cases} eval cases.`);
process.exit(errors ? 1 : 0);
