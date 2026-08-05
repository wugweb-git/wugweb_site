#!/usr/bin/env node
/**
 * Verify design tokens: locked colours (Framer S1) + Kits typography (S4).
 * Writes docs/framer-token-sync-report.json
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const CSS = path.join(ROOT, 'src', 'styles', 'global.css');
const css = fs.readFileSync(CSS, 'utf8');

const colourExpected = {
  '--color-text-primary': '#F4F4F4',
  '--color-text-secondary': '#BABABA',
  '--color-surface-page': '#050505',
  '--color-surface-elevated': '#191919',
  '--neutral-7': '#2B2B2B',
  '--color-yellow': '#FFBE1A',
};

const kitsExpected = {
  '--core-font-family-base': 'Inter Tight',
  '--core-font-family-mono': 'Fragment Mono',
  '--font-weight-regular': '400',
  '--font-weight-medium': '500',
  '--font-weight-semibold': '600',
  '--font-weight-bold': '700',
  '--font-weight-extrabold': '800',
  '--ts-display-size': '4rem',
  '--ts-h1-size': '3rem',
  '--fluid-display': 'clamp(',
  '--fluid-h1': 'clamp(',
};

function has(token, expect) {
  const re = new RegExp(`${token.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}:\\s*([^;]+);`);
  const m = css.match(re);
  if (!m) return { ok: false, found: null };
  return { ok: m[1].includes(expect), found: m[1].trim() };
}

const colourMismatches = [];
const colourMatches = [];
for (const [t, e] of Object.entries(colourExpected)) {
  const r = has(t, e);
  if (r.ok) colourMatches.push(t);
  else colourMismatches.push({ token: t, expected: e, found: r.found });
}

const typeMismatches = [];
const typeMatches = [];
for (const [t, e] of Object.entries(kitsExpected)) {
  const r = has(t, e);
  if (r.ok) typeMatches.push(t);
  else typeMismatches.push({ token: t, expected: e, found: r.found });
}

const hierarchyOk =
  /h1\s*\{[^}]*font-weight:\s*var\(--font-weight-bold\)/.test(css) &&
  /h2\s*\{[^}]*font-weight:\s*var\(--font-weight-semibold\)/.test(css) &&
  /\.t-display[\s\S]*?font-weight:\s*var\(--font-weight-extrabold\)/.test(css);

const report = {
  generatedAt: new Date().toISOString(),
  lockedLiveColoursOk: colourMismatches.length === 0,
  kitsTypographyOk: typeMismatches.length === 0 && hierarchyOk,
  colourMatches: colourMatches.length,
  colourMismatches,
  typeMatches: typeMatches.length,
  typeMismatches,
  hierarchyOk,
  note: 'Colours = Framer S1 locked live. Typography = Kits S4 weight hierarchy (user-directed 2026-08-04).',
};

fs.writeFileSync(path.join(ROOT, 'docs', 'framer-token-sync-report.json'), JSON.stringify(report, null, 2));
console.log(JSON.stringify({ lockedLiveColoursOk: report.lockedLiveColoursOk, kitsTypographyOk: report.kitsTypographyOk, typeMismatches, hierarchyOk }, null, 2));
