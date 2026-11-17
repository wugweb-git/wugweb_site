#!/usr/bin/env node
// wugweb-voice: test.mjs
// Tests the check script, the export and the skill's own files. Plain Node.
// Usage: node scripts/test.mjs

import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { dirname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import { check, samplesInUse } from './check.mjs';
import { build } from './build.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const read = (p) => readFileSync(join(ROOT, p), 'utf8');
let failed = 0;
const t = (name, ok, detail = '') => {
  console.log(`${ok ? 'pass' : 'FAIL'}  ${name}${!ok && detail ? `\n      ${detail}` : ''}`);
  if (!ok) failed++;
};

// 1. Off-voice fixture
const off = check(read('evals/fixtures/off-voice.md'), { mode: 'case-study' });
const rules = off.flags.map((f) => f.rule);
const found = off.flags.map((f) => f.found.toLowerCase());
t('flags the em dash', off.flags.some((f) => f.rule.startsWith('V-03') && f.found.includes('\u2014')));
t('flags the hyphen range "3-5" as "3 to 5"', off.flags.some((f) => f.found === '3-5' && f.proposed === '3 to 5'));
t('flags the spaced hyphen', off.flags.filter((f) => f.rule.startsWith('V-03')).length >= 2);
for (const w of ['organize', 'customize', 'color', 'program']) t(`flags US spelling "${w}"`, found.includes(w));
t('flags heading case', rules.some((r) => r.startsWith('V-02')));
t('"robust" is a question, not a flag', off.questions.some((q) => q.found.toLowerCase() === 'robust') && !found.includes('robust'));
t('lists 40% as a fact', off.facts.some((f) => f.text === '40%'));
t('lists the quote as a fact', off.facts.some((f) => f.kind === 'quote' && f.text.includes('changed everything')));
t('lists "every" as a scope word', off.facts.some((f) => f.text.toLowerCase() === 'every'));
t('confidence low with no samples', off.confidence.level === 'low');
t('result needs revision', off.result === 'needs revision');

// 2. Clean fixture
const clean = check(read('evals/fixtures/clean.md'), { mode: 'case-study' });
t('clean fixture has no flags', clean.flags.length === 0, JSON.stringify(clean.flags));
t('clean result is mechanical only', clean.result.includes('mechanical part only'));

// 3. Corpus is empty, so every mode is low
const counts = samplesInUse();
t('corpus has no samples in use', Object.keys(counts).length === 0, JSON.stringify(counts));

// 4. Skill's own files: no em or en dashes, headings in sentence case
const files = [];
const walk = (d) => {
  for (const f of readdirSync(d)) {
    const p = join(d, f);
    if (statSync(p).isDirectory()) { if (!['fixtures', 'node_modules'].includes(f) && !existsSync(join(p, 'prompt.md'))) walk(p); }
    else if (/\.(md|mjs|json)$/.test(f)) files.push(p);
  }
};
walk(ROOT);
for (const p of files) {
  const rel = relative(ROOT, p);
  const txt = readFileSync(p, 'utf8');
  const dashes = (txt.match(/[\u2014\u2013]/g) || []).length;
  // check.mjs and test.mjs hold the dash characters as escapes, not literals
  t(`no em or en dashes in ${rel}`, dashes === 0, `${dashes} found`);
  if (rel.endsWith('.md') && !rel.startsWith('export')) {
    const h = check(txt).flags.filter((f) => f.rule.startsWith('V-02'));
    t(`sentence case headings in ${rel}`, h.length === 0, h.map((f) => f.found).join(' | '));
  }
}

// 5. SKILL.md shape
const skill = read('SKILL.md');
const fm = skill.match(/^---\n([\s\S]*?)\n---\n/);
t('frontmatter present', !!fm);
t('frontmatter has name', /^name:\s*wugweb-voice$/m.test(fm?.[1] || ''));
t('frontmatter has a third-person description', /description:\s*"Holds /.test(fm?.[1] || ''));
t('version under metadata, not top level', /metadata:[\s\S]*version:/.test(fm?.[1] || '') && !/^version:/m.test(fm?.[1] || ''));
const body = skill.slice(fm[0].length);
const words = body.replace(/```[\s\S]*?```/g, ' ').split(/\s+/).filter((w) => /[A-Za-z0-9]/.test(w)).length;
t(`SKILL.md body is 1,500 to 2,000 words (${words})`, words >= 1500 && words <= 2000);
for (const m of new Set(skill.match(/`((?:references|scripts|examples|evals|export)\/[^`\s]+)`/g) || [])) {
  const p = m.slice(1, -1);
  if (p === 'export/wugweb-voice.md') continue;
  t(`named file exists: ${p}`, existsSync(join(ROOT, p)));
}

// 6. Evals
let evals;
try { evals = JSON.parse(read('evals/evals.json')); } catch (e) { evals = null; }
t('evals.json parses', !!evals);
t('every eval has id, prompt, expected, status',
  !!evals && evals.evals.every((e) => e.id && e.prompt && Array.isArray(e.expected) && e.status));

// 7. Export
const exp = build();
t('export built', exp.length > 1000);
t('export leaves out the corpus ledger', !exp.includes('# Calibration corpus'));
t('export leaves out tooling', !exp.includes('# Tooling'));
t('export carries the voice check', exp.includes('## The voice check'));
{
  const home = join(ROOT, '..', '..', '..', 'docs', 'skills', 'STANDING-RULES.md');
  const copy = readFileSync(join(ROOT, 'references', 'standing-rules.md'), 'utf8');
  t('export carries the marked copy of the standing rules', exp.includes('MARKED COPY'));
  if (existsSync(home)) t('standing-rules copy matches the home file', copy.endsWith(readFileSync(home, 'utf8')));
}
t('export has no em or en dashes', !/[\u2014\u2013]/.test(exp));

console.log(failed ? `\n${failed} failed` : '\nall passed');
process.exit(failed ? 1 : 0);
