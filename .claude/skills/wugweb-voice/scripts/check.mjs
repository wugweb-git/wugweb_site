#!/usr/bin/env node
// wugweb-voice: check.mjs
// Read-only. The mechanical part of the voice check (SKILL.md, steps 1, 2 and the
// confidence rule). Lists facts to trace, flags dashes, US spellings, heading case and
// confirmed banned words, reports candidate words as questions, and gives confidence
// from the corpus ledger. Plain Node, no packages. Writes to stdout only.
//
// Usage:
//   node scripts/check.mjs <file.md | -> [--mode <key>] [--json]
// Exit code: 0 when nothing is flagged, 1 when something is, 2 on bad input.

import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const ref = (f) => readFileSync(join(ROOT, 'references', f), 'utf8');

// ------------------------------------------------------------ lists from words.md
export function fencedBlock(md, info) {
  const m = md.match(new RegExp('```' + info + '\\n([\\s\\S]*?)```'));
  if (!m) return [];
  return m[1].split('\n').map((l) => l.trim()).filter(Boolean);
}

export function loadLists() {
  const words = ref('words.md');
  const spelling = {};
  for (const line of fencedBlock(words, 'spelling')) {
    const [us, gb] = line.split('=').map((s) => s.trim().toLowerCase());
    if (us && gb) spelling[us] = gb;
  }
  return {
    spelling,
    bannedConfirmed: fencedBlock(words, 'banned-confirmed').map((w) => w.toLowerCase()),
    bannedCandidate: fencedBlock(words, 'banned-candidate').map((w) => w.toLowerCase()),
    properNouns: new Set(fencedBlock(words, 'proper-nouns')),
  };
}

// ------------------------------------------------------------ corpus and confidence
export function samplesInUse() {
  const corpus = ref('corpus.md');
  const section = corpus.split(/^## Samples\s*$/m)[1]?.split(/^## /m)[0] ?? '';
  const counts = {};
  for (const line of section.split('\n')) {
    if (!line.startsWith('|') || /^\|\s*(ID|-)/.test(line)) continue;
    const cells = line.split('|').slice(1, -1).map((c) => c.trim());
    if (cells.length < 8) continue;
    const mode = cells[3];
    const status = cells[7].toLowerCase();
    const edit = (cells[10] || '').toLowerCase();
    const held = (cells[12] || '').toLowerCase();
    if (status === 'in use' && edit === 'unedited' && held !== 'yes') counts[mode] = (counts[mode] || 0) + 1;
  }
  return counts;
}

export function confidence(mode) {
  const n = samplesInUse()[mode] || 0;
  if (!mode) return { level: 'low', reason: 'no mode given, so no samples can be counted' };
  if (n < 3) return { level: 'low', reason: `${n} unedited sample(s) in use for mode "${mode}"; fewer than three` };
  return { level: 'medium at most', reason: `${n} unedited samples in use for mode "${mode}". Medium only if the features held steady when the last sample was added; high also needs confirmed rules and a blind test that did not detect the drafts. The script cannot see those; a reader decides.` };
}

// ------------------------------------------------------------ text preparation
// Code is not visible copy: fenced blocks and inline code are blanked, keeping line numbers.
export function stripCode(text) {
  let inFence = false;
  return text.split('\n').map((line) => {
    if (/^\s*```/.test(line)) { inFence = !inFence; return ''; }
    if (inFence) return '';
    return line.replace(/`[^`]*`/g, (m) => ' '.repeat(m.length));
  });
}

const escapeRe = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

// ------------------------------------------------------------ the check
export function check(text, { mode } = {}) {
  const lists = loadLists();
  const lines = stripCode(text);
  const flags = [];
  const questions = [];
  const facts = [];
  const add = (arr, line, rule, label, found, proposed, note) =>
    arr.push({ line, rule, label, found, proposed, note });

  lines.forEach((raw, i) => {
    const n = i + 1;
    if (!raw.trim()) return;

    // Dashes (V-03)
    for (const m of raw.matchAll(/[\u2014\u2013]/g)) {
      const ctx = raw.slice(Math.max(0, m.index - 20), m.index + 21).trim();
      add(flags, n, 'V-03 no em or en dashes', 'confirmed', ctx,
        /\d\s*[\u2013\u2014]\s*\d/.test(ctx) ? 'write the range out ("3 to 5")' : 'rewrite as two sentences, a comma or a colon');
    }
    if (/\S \- \S/.test(raw) && !/^\s*[-*] /.test(raw.replace(/\S \- \S/, ''))) {
      for (const m of raw.matchAll(/\S \- \S/g)) {
        add(flags, n, 'V-03 no em or en dashes', 'confirmed', raw.slice(Math.max(0, m.index - 15), m.index + 18).trim(),
          'a spaced hyphen reads as a dash; rewrite');
      }
    }

    // Hyphen ranges such as "3-5" (V-03: ranges are written out). Dates are skipped.
    for (const m of raw.matchAll(/(?<![\d-])\d{1,3}-\d{1,3}(?![\d-])/g)) {
      const [a, b] = m[0].split('-');
      add(flags, n, 'V-03 ranges written out', 'confirmed', m[0], `${a} to ${b}`);
    }

    // Spelling (V-01)
    for (const [us, gb] of Object.entries(lists.spelling)) {
      const re = new RegExp(`\\b${escapeRe(us)}\\b`, 'gi');
      for (const m of raw.matchAll(re)) {
        add(flags, n, 'V-01 British English', 'confirmed', m[0], gb,
          us === 'program' || us === 'programs' ? 'keep "program" for software code' : undefined);
      }
    }

    // Banned words: confirmed are flags, candidates are questions (V-05)
    for (const w of lists.bannedConfirmed) {
      const re = new RegExp(`\\b${escapeRe(w)}\\w*\\b`, 'gi');
      for (const m of raw.matchAll(re)) add(flags, n, 'V-05 no filler words', 'confirmed', m[0], 'cut or say the plain thing');
    }
    for (const w of lists.bannedCandidate) {
      const re = new RegExp(`\\b${escapeRe(w)}\\w*\\b`, 'gi');
      for (const m of raw.matchAll(re)) add(questions, n, 'V-05 candidate word', 'candidate', m[0], undefined,
        'on the candidate list, not ruled on; ask the owner, do not flag');
    }

    // Heading case (V-02): Markdown headings only
    const h = raw.match(/^\s{0,3}#{1,6}\s+(.*)$/);
    if (h) {
      const words = h[1].replace(/[()[\]"“”'‘’,.;!?]/g, ' ').split(/\s+/).filter(Boolean);
      const caps = words.slice(1).filter((w) => {
        const bare = w.replace(/:$/, '');
        if (!/^[A-Z]/.test(bare)) return false;
        if (bare === 'I') return false;
        if (/^[A-Z0-9]{2,}s?$/.test(bare)) return false; // acronyms
        if (/\d/.test(bare)) return false;
        if (lists.properNouns.has(bare)) return false;
        return true;
      });
      if (caps.length) add(flags, n, 'V-02 sentence case', 'confirmed', h[1].trim(),
        'lower case: ' + caps.join(', '), 'heuristic; a proper noun not in words.md can trip it');
    }

    // Facts to trace (step 1). Listed, never flagged here: tracing needs the sources.
    for (const m of raw.matchAll(/(?:[£$€₹]\s?)?\b\d(?:[\d,.]*\d)?(?:\s?%|\s?percent\b|(?:x|k|mb|gb|px|ms)\b)?/gi)) {
      if (/^#{1,6}$/.test(m[0])) continue;
      facts.push({ line: n, kind: 'number', text: m[0].trim() });
    }
    for (const m of raw.matchAll(/[“"]([^”"]{2,})[”"]/g)) facts.push({ line: n, kind: 'quote', text: m[1] });
    for (const m of raw.matchAll(/\b(all|every|only|never|always|none|no one)\b/gi)) {
      facts.push({ line: n, kind: 'scope word', text: m[0] });
    }
  });

  const conf = confidence(mode);
  const result = flags.length ? 'needs revision' : 'pass (mechanical part only)';
  return {
    result,
    note: 'Mechanical part only. Steps 3 to 6 of the voice check (trace, mode, client words, voice rules) need a reader. Voice not calibrated: no observed rules yet.',
    mode: mode || null,
    confidence: conf,
    flags,
    questions,
    facts,
  };
}

// ------------------------------------------------------------ report
export function formatReport(r) {
  const out = [];
  out.push(`Result: ${r.result}`);
  out.push(`Confidence: ${r.confidence.level} (${r.confidence.reason})`);
  out.push(r.note, '');
  out.push(`Flags (${r.flags.length})`);
  for (const f of r.flags) out.push(`  line ${f.line}  ${f.rule} [${f.label}]  "${f.found}" → ${f.proposed}${f.note ? `  (${f.note})` : ''}`);
  out.push('', `Questions for the owner (${r.questions.length})`);
  for (const q of r.questions) out.push(`  line ${q.line}  "${q.found}": ${q.note}`);
  out.push('', `Facts to trace before and after any rewrite (${r.facts.length})`);
  for (const f of r.facts) out.push(`  line ${f.line}  ${f.kind}: ${f.text}`);
  return out.join('\n');
}

// ------------------------------------------------------------ CLI
const isMain = process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1];
if (isMain) {
  const args = process.argv.slice(2);
  const json = args.includes('--json');
  const mi = args.indexOf('--mode');
  const mode = mi >= 0 ? args[mi + 1] : undefined;
  const file = args.find((a, i) => !a.startsWith('--') && (mi < 0 || i !== mi + 1));
  if (!file) { console.error('Usage: node scripts/check.mjs <file.md | -> [--mode <key>] [--json]'); process.exit(2); }
  let text;
  try { text = readFileSync(file === '-' ? 0 : file, 'utf8'); }
  catch (e) { console.error(`Cannot read ${file}: ${e.message}`); process.exit(2); }
  const r = check(text, { mode });
  console.log(json ? JSON.stringify(r, null, 2) : formatReport(r));
  process.exit(r.flags.length ? 1 : 0);
}
