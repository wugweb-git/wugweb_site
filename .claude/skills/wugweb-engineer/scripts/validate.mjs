#!/usr/bin/env node
// Structural checks for the skill: frontmatter, description, body length and voice, references,
// dashes, and that the exports are fresh. Exit 1 on any error.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { render, OUTPUTS, HOME } from './build.mjs';

const dir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const read = (p) => fs.readFileSync(path.join(dir, p), 'utf8');
let errors = 0; let checks = 0;
const check = (ok, msg) => { checks++; console.log((ok ? 'ok    ' : 'ERROR ') + msg); if (!ok) errors++; };

const skill = read('SKILL.md');
const fm = /^---\n([\s\S]*?)\n---\n/.exec(skill);
check(!!fm, 'SKILL.md has frontmatter');
const front = fm ? fm[1] : '';
check(/^name: wugweb-engineer$/m.test(front), 'name is wugweb-engineer and matches the folder');
const desc = (/^description: "((?:[^"\\]|\\.)*)"$/m.exec(front) || [])[1] || '';
check(desc.startsWith('This skill should be used when'), 'description is in the third person');
check(desc.length > 0 && desc.length <= 1024, `description is 1 to 1,024 characters (${desc.length})`);
check((desc.match(/\\"[^"\\]+\\"/g) || []).length >= 8, 'description quotes at least 8 trigger phrases');
check(/version:\s*"\d+\.\d+\.\d+"/.test(front), 'version is set');
check(/^license: MIT$/m.test(front), 'licence is set');
const version = (/version:\s*"([\d.]+)"/.exec(front) || [])[1];
const meta = JSON.parse(read('metadata.json'));
check(meta.version === version, `metadata.json version matches SKILL.md (${meta.version})`);
for (const k of ['organization', 'date', 'abstract', 'status', 'relatedSkills', 'references']) check(meta[k] !== undefined, `metadata.json has ${k}`);
check(fs.existsSync(path.join(dir, 'README.md')), 'README.md exists');
const log = read('CHANGELOG.md');
check(log.includes(`## ${version} `), `CHANGELOG.md has an entry for ${version}`);

const body = skill.slice(fm ? fm[0].length : 0);
const prose = body.replace(/```[\s\S]*?```/g, ' ');
const words = prose.split(/\s+/).filter((w) => /[A-Za-z0-9]/.test(w)).length;
check(words >= 1500 && words <= 2000, `body is 1,500 to 2,000 words (${words})`);
const second = prose.match(/\b(you|your|yours|yourself)\b/gi) || [];
check(second.length === 0, `body has no second person (${second.length})`);

const named = [...new Set([...skill.matchAll(/`((?:references|scripts|evals|examples)\/[\w./-]*)`/g)].map((m) => m[1]))];
for (const n of named) {
  if (n.startsWith('evals') && !fs.existsSync(path.join(dir, 'evals'))) { console.log(`skip  named file ${n}: not in an installed package`); continue; }
  check(fs.existsSync(path.join(dir, n.replace(/\/$/, ''))), `named file exists: ${n}`);
}
for (const f of fs.readdirSync(path.join(dir, 'references'))) check(skill.includes(`references/${f}`), `reference is named in SKILL.md: ${f}`);

const files = ['SKILL.md', 'CHANGELOG.md', 'README.md', 'metadata.json', ...fs.readdirSync(path.join(dir, 'references')).map((f) => 'references/' + f), ...fs.readdirSync(path.join(dir, 'examples')).map((f) => 'examples/' + f)];
for (const f of files) check(!/[–—]/.test(read(f)), `no em or en dashes in ${f}`);

if (!fs.existsSync(HOME)) {
  console.log('skip  generated files: docs/skills/STANDING-RULES.md not found (outside the site repo); run inside the repo to check freshness');
  for (const [file] of OUTPUTS) check(fs.existsSync(path.join(dir, file)), `${file} exists`);
} else try {
  for (const [file, kind] of OUTPUTS) check(fs.existsSync(path.join(dir, file)) && read(file) === render(kind), `${file} is fresh (run scripts/build.mjs)`);
  const gpt = /```\n([\s\S]*?)\n```/.exec(read('adapters/chatgpt/instructions.md'))[1];
  check(gpt.length <= 8000, `custom GPT instruction block is 8,000 characters or fewer (${gpt.length})`);
} catch (e) { check(false, 'generated files: ' + e.message); }

// Secrets standard: scripts read the one name per use and hold no key.
for (const f of fs.readdirSync(path.join(dir, 'scripts')).filter((f) => f.endsWith('.mjs') && !['validate.mjs', 'test.mjs'].includes(f))) {
  const src = read('scripts/' + f);
  check(!/env\.(SANITY_TOKEN|SANITY_API_TOKEN|NOTION_TOKEN)\b|\[['"](SANITY_TOKEN|SANITY_API_TOKEN|NOTION_TOKEN)['"]\]/.test(src), `${f} reads no alias token name`);
  check(!/\bsk[A-Za-z0-9]{20,}|secret_[A-Za-z0-9]{20,}|ntn_[A-Za-z0-9]{20,}/.test(src), `${f} holds no key`);
}

const hasEvals = fs.existsSync(path.join(dir, 'evals'));
const cases = hasEvals ? fs.readdirSync(path.join(dir, 'evals')).filter((c) => fs.existsSync(path.join(dir, 'evals', c, 'case.yaml'))) : [];
if (hasEvals) check(cases.length >= 5, `at least 5 test cases (${cases.length})`);
else console.log('skip  test cases: no evals/ folder (an installed .skill package leaves them out)');
for (const c of cases) {
  const g = path.join(dir, 'evals', c, 'graders');
  check(fs.existsSync(path.join(dir, 'evals', c, 'prompt.md')) && fs.existsSync(g) && fs.readdirSync(g).length > 0, `case ${c} has a prompt and graders`);
}

console.log(`\nwugweb-engineer: ${checks} checks, ${errors} errors. Body ${words} words.`);
process.exit(errors ? 1 : 0);
