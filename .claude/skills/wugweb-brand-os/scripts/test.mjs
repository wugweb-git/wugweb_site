#!/usr/bin/env node
// wugweb-brand-os: test.mjs
// Self-test on the skill's own files. Plain Node 18 or later. No packages. No network.
//   node scripts/test.mjs
// Exit 0 when every check passes, 1 when any fails.

import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join, relative } from 'node:path';
import { ROOT, HOME_RULES, sources, outputs } from './build.mjs';

const read = (p) => readFileSync(join(ROOT, p), 'utf8');
let fail = 0;
const check = (ok, msg) => {
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${msg}`);
  if (!ok) fail++;
};

// 1. Frontmatter, against the Agent Skills format and the Claude app limits.
const skill = read('SKILL.md');
const fm = (skill.match(/^---\n([\s\S]*?)\n---\n/) || [])[1] || '';
const { name, description, version, body } = sources();
check(name === 'wugweb-brand-os', 'name is wugweb-brand-os and matches the folder');
check(/^[a-z0-9]+(-[a-z0-9]+)*$/.test(name) && name.length <= 64 && !/claude|anthropic/.test(name), 'name is kebab-case, 64 characters or fewer, no reserved words');
check(description.length >= 1 && description.length <= 1024, `description is ${description.length} characters (limit 1,024)`);
check(/This skill should be used when/.test(description), 'description is third person with "This skill should be used when"');
check((description.match(/'[^']+'/g) || []).length >= 5, 'description quotes at least five trigger phrases');
check(!/^version:/m.test(fm) && /metadata:[\s\S]*version:/.test(fm), 'version sits under metadata, not at the top level');
const allowed = ['name', 'description', 'license', 'compatibility', 'metadata', 'allowed-tools'];
const keys = fm.split('\n').filter((l) => /^[a-z-]+:/.test(l)).map((l) => l.split(':')[0]);
check(keys.every((k) => allowed.includes(k)), `frontmatter keys are portable (${keys.join(', ')})`);

// 2. Body length by the shared method: drop fenced code, count tokens with a letter or digit.
const words = body.replace(/```[\s\S]*?```/g, ' ').split(/\s+/).filter((w) => /[A-Za-z0-9]/.test(w)).length;
check(words >= 1500 && words <= 2000, `SKILL.md body is ${words} words (1,500 to 2,000)`);
check(!/\b(you|your|you're|yourself)\b/i.test(body.replace(/`[^`]*`/g, '')), 'SKILL.md body has no second person');
check(body.includes(`Version ${version}`), `SKILL.md status names version ${version}`);

// 3. Every file the body names exists.
for (const m of new Set(body.match(/`((?:references|scripts|evals|examples)\/[^`\s]+\.[a-z]+)`/g) || [])) {
  const p = m.slice(1, -1);
  check(existsSync(join(ROOT, p)), `named file exists: ${p}`);
}

// 4. House rules on the skill's own files.
const walk = (d, acc = []) => {
  for (const f of readdirSync(d)) {
    const p = join(d, f);
    if (statSync(p).isDirectory()) { if (f !== 'node_modules') walk(p, acc); }
    else if (/\.(md|mjs|json|yaml|mdc)$/.test(f)) acc.push(p);
  }
  return acc;
};
const dash = new RegExp(String.fromCharCode(91, 0x2014, 0x2013, 93));
const generated = new Set(Object.keys(outputs()));
for (const p of walk(ROOT)) {
  const rel = relative(ROOT, p);
  const txt = readFileSync(p, 'utf8');
  check(!dash.test(txt), `no em or en dashes in ${rel}`);
  if (rel.endsWith('.md') && !generated.has(rel)) {
    check(!/#[0-9a-fA-F]{6}\b/.test(txt), `no colour value in ${rel} (values live in wugweb-kits)`);
    check(!/--[a-z]+-[a-z0-9-]+/.test(txt), `no token name in ${rel} (tokens live in wugweb-kits)`);
    if (!['references/tooling.md', 'CHANGELOG.md', 'README.md'].includes(rel)) {
      check(!/\b(brightdata|brand-voice:|marketing:|skill-creator|theme-factory)\b/.test(txt), `no helper named in ${rel} (helpers belong in references/tooling.md)`);
    }
  }
}

// 5. One home for the media rules: they live in docs/skills/STANDING-RULES.md only.
const hand = walk(ROOT).map((p) => relative(ROOT, p)).filter((r) => r.endsWith('.md') && !generated.has(r) && r !== 'CHANGELOG.md');
const restated = hand.filter((r) => /resized only with its aspect ratio|never cropped or re-encoded|No sound on any media/.test(read(r)));
check(restated.length === 0, `media rules are not restated in the skill${restated.length ? ': ' + restated.join(', ') : ''}`);

// 5b. One home for the colour and logo rules inside the skill. SKILL.md carries a short copy on purpose.
const homes = [
  [/Yellow is a reservation, not an emphasis level/, 'references/visual-os/colour-type-photo-motion.md'],
  [/lockup is two-tone, and two-tone titles mirror it/, 'references/visual-os/art-direction.md'],
];
for (const [re, home] of homes) {
  const found = hand.filter((r) => r !== 'SKILL.md' && r !== 'README.md' && re.test(read(r)));
  check(found.length === 1 && found[0] === home, `one home for "${re.source}" in ${home}${found.length !== 1 ? ' (found in ' + found.join(', ') + ')' : ''}`);
}

// 6. Generated files are fresh and carry the standing rules and the version.
check(existsSync(HOME_RULES), 'docs/skills/STANDING-RULES.md is present');
for (const [rel, content] of Object.entries(outputs())) {
  const full = join(ROOT, rel);
  check(existsSync(full) && readFileSync(full, 'utf8') === content, `${rel} is fresh (run node scripts/build.mjs)`);
}
const agents = read('AGENTS.md');
const rules = readFileSync(HOME_RULES, 'utf8').replace(/^# .*\n+/, '').trim();
check(agents.includes(rules), 'AGENTS.md carries the standing-rules block unchanged');
check(read('references/standing-rules.md').includes(readFileSync(HOME_RULES, 'utf8').trim()), 'references/standing-rules.md is a byte copy of docs/skills/STANDING-RULES.md');
const dangling = hand.filter((r) => !['references/tooling.md', 'README.md'].includes(r) && /`docs\/skills\/STANDING-RULES\.md`/.test(read(r).replace(/marked copy of the owner's standing rules from `docs\/skills\/STANDING-RULES\.md`/, '')));
check(dangling.length === 0, `hand-written files point to references/standing-rules.md, which travels with the skill${dangling.length ? ': ' + dangling.join(', ') : ''}`);
check(agents.includes(`v${version}`) && read(`export/${name}.md`).includes(`v${version}`), `AGENTS.md and the export carry v${version}`);

// 7. metadata.json agrees with SKILL.md.
const meta = JSON.parse(read('metadata.json'));
check(meta.version === version, `metadata.json version ${meta.version} equals SKILL.md ${version}`);
check(Array.isArray(meta.relatedSkills) && meta.relatedSkills.length > 0, 'metadata.json names related skills');

// 8. README and the changelog name the current version.
check(read('README.md').includes(`Version ${version}`), `README.md names version ${version}`);
check(read('CHANGELOG.md').includes(`## ${version}`), `CHANGELOG.md has an entry for ${version}`);

// 9. Evals parse and are complete.
let evals = null;
try { evals = JSON.parse(read('evals/evals.json')); } catch { evals = null; }
check(!!evals, 'evals/evals.json parses');
check(!!evals && evals.evals.every((x) => x.id && x.prompt && Array.isArray(x.expected) && x.expected.length && x.status), 'every eval has id, prompt, expected and status');
check(!!evals && new Set(evals.evals.map((x) => x.id)).size === evals.evals.length, 'eval ids are unique');

console.log(fail ? `\n${fail} failed` : '\nall passed');
process.exit(fail ? 1 : 0);
