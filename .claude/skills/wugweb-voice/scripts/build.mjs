#!/usr/bin/env node
// wugweb-voice: build.mjs
// Builds export/wugweb-voice.md: one file to paste or attach in GPT, Cursor or any
// other tool. Leaves out references/corpus.md (it points at private writing) and
// references/tooling.md (tool wiring). Plain Node, no packages.

import { readFileSync, writeFileSync, mkdirSync, readdirSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const read = (p) => readFileSync(join(ROOT, p), 'utf8');

export const INCLUDED = [
  'references/voice.md',
  'references/modes.md',
  'references/words.md',
  'references/handoff.md',
  'references/blind-test.md',
];

export function build() {
  const skill = read('SKILL.md');
  const version = (skill.match(/version:\s*"([^"]+)"/) || [])[1] || 'unknown';
  const body = skill.replace(/^---\n[\s\S]*?\n---\n/, '').trim();
  const parts = [
    `<!-- wugweb-voice ${version}. Built by scripts/build.mjs. Do not edit; edit the source files. -->`,
    '',
    body,
  ];
  for (const f of INCLUDED) parts.push('', '---', '', `<!-- ${f} -->`, '', read(f).trim());
  const exDir = join(ROOT, 'examples');
  if (existsSync(exDir)) {
    for (const f of readdirSync(exDir).filter((x) => x.endsWith('.md')).sort()) {
      parts.push('', '---', '', `<!-- examples/${f} -->`, '', read(`examples/${f}`).trim());
    }
  }
  const out = parts.join('\n') + '\n';
  mkdirSync(join(ROOT, 'export'), { recursive: true });
  writeFileSync(join(ROOT, 'export', 'wugweb-voice.md'), out);
  return out;
}

const isMain = process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1];
if (isMain) {
  const out = build();
  console.log(`export/wugweb-voice.md written: ${out.split('\n').length} lines, ${Buffer.byteLength(out)} bytes`);
}
