#!/usr/bin/env node
/**
 * Storybook and /kits sync check. Report only by default (exit 0); pass
 * --strict to exit 1 when anything is out of step.
 *
 * Checks:
 *   1. Every src/components/**.astro has a *.stories.ts beside it.
 *   2. Every *.stories.ts has its component beside it.
 *   3. Every token in src/lib/design-tokens.ts (the data /kits and the
 *      TokenGallery story both read) is defined in src/styles/global.css with
 *      the same hex.
 *   4. Every var(--token) used by src/pages/kits.astro is defined in
 *      global.css or declared inside kits.astro itself.
 *
 * Writes a markdown report to $GITHUB_STEP_SUMMARY when it is set.
 */
import { readdirSync, readFileSync, appendFileSync, statSync } from 'node:fs';
import { join, basename } from 'node:path';

const strict = process.argv.includes('--strict');
const root = process.cwd();

function walk(dir) {
  const out = [];
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) out.push(...walk(p));
    else out.push(p);
  }
  return out;
}

const files = walk(join(root, 'src/components'));
const components = files.filter((f) => f.endsWith('.astro'));
const stories = files.filter((f) => f.endsWith('.stories.ts'));

const compKeys = new Set(components.map((f) => f.replace(/\.astro$/, '')));
const storyKeys = new Set(stories.map((f) => f.replace(/\.stories\.ts$/, '')));

const rel = (f) => f.slice(root.length + 1);
const noStory = [...compKeys].filter((k) => !storyKeys.has(k)).map((k) => rel(k) + '.astro').sort();
const noComponent = [...storyKeys].filter((k) => !compKeys.has(k)).map((k) => rel(k) + '.stories.ts').sort();

// Tokens: design-tokens.ts vs global.css
const css = readFileSync(join(root, 'src/styles/global.css'), 'utf8');
const tokensSrc = readFileSync(join(root, 'src/lib/design-tokens.ts'), 'utf8');
const cssValue = (name) => {
  const m = css.match(new RegExp(`${name.replace(/[-]/g, '\\-')}\\s*:\\s*([^;]+);`));
  return m ? m[1].trim() : null;
};
const tokenMissing = [];
const tokenMismatch = [];
for (const m of tokensSrc.matchAll(/hex:\s*'(#[0-9a-fA-F]{3,8})'\s*,\s*token:\s*'(--[a-z0-9-]+)'/g)) {
  const [, hex, token] = m;
  const v = cssValue(token);
  if (v === null) tokenMissing.push(token);
  else if (/^#[0-9a-fA-F]{3,8}$/.test(v) && v.toLowerCase() !== hex.toLowerCase()) {
    tokenMismatch.push(`${token}: kits ${hex}, css ${v}`);
  }
}

// /kits page: var(--x) must resolve
const kits = readFileSync(join(root, 'src/pages/kits.astro'), 'utf8');
const used = new Set([...kits.matchAll(/var\(\s*(--[a-z0-9-]+)/g)].map((m) => m[1]));
const declared = new Set([...kits.matchAll(/(--[a-z0-9-]+)\s*:/g)].map((m) => m[1]));
const kitsUnknown = [...used].filter((t) => !declared.has(t) && cssValue(t) === null).sort();

const sections = [
  ['Components with no story', noStory],
  ['Stories with no component', noComponent],
  ['Tokens in design-tokens.ts missing from global.css', tokenMissing],
  ['Tokens whose hex differs from global.css', tokenMismatch],
  ['var(--token) used on /kits but defined nowhere', kitsUnknown],
];

const total = sections.reduce((n, [, l]) => n + l.length, 0);
let md = `## Storybook and /kits sync\n\n${components.length} components, ${stories.length} stories, ${used.size} tokens used on /kits.\n\n`;
md += total === 0 ? 'Everything is in step.\n' : `${total} item(s) out of step.\n`;
for (const [title, list] of sections) {
  if (!list.length) continue;
  md += `\n### ${title} (${list.length})\n\n` + list.map((x) => `- \`${x}\``).join('\n') + '\n';
}

console.log(md);
if (process.env.GITHUB_STEP_SUMMARY) appendFileSync(process.env.GITHUB_STEP_SUMMARY, md);
if (strict && total > 0) process.exit(1);
