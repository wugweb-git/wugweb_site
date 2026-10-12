/**
 * Brand-voice rule checks — pure functions, no network, no Sanity imports.
 *
 * These are RULE checks, not a tone judge. They catch what can be written down
 * (banned words, preferred terms, sentence length, reading grade, spelling
 * variant, shouting) and cannot tell whether copy "sounds like Wugweb". That
 * still needs a person.
 *
 * The guide lives on siteSettings (group "Brand voice"). Callers must gate on
 * isGuideActive(): a missing or draft guide produces no warnings anywhere.
 */

export const VOICE_DISCLAIMER = 'Rule checks, not a tone judge.';

export interface PreferredTerm {
  use?: string;
  insteadOf?: string;
}

export interface VoiceGuide {
  status?: string;
  persona?: string;
  audience?: string;
  toneWords?: string[];
  writingPrinciples?: string[];
  doList?: string[];
  dontList?: string[];
  preferredTerms?: PreferredTerm[];
  bannedWords?: string[];
  spelling?: 'en-GB' | 'en-US' | string;
  readingLevelMax?: number;
  maxSentenceWords?: number;
  sampleGood?: string[];
  sampleBad?: string[];
}

export interface VoiceCheck {
  id: string;
  label: string;
  pass: boolean;
  severity: 'warn' | 'bad';
  hint: string;
  matches: string[];
}

export const isGuideActive = (guide: VoiceGuide | null | undefined): guide is VoiceGuide =>
  Boolean(guide && guide.status === 'approved');

// ── Portable text → plain text ──────────────────────────────────────────────

/** Blocks whose text is not prose: skipped entirely. */
const SKIP_TYPES = new Set(['codeBlock', 'code', 'comparisonTable', 'table']);
/** Prose-bearing keys on custom blocks (callout.text, quoteBlock.quote, cta.body…). */
const PROSE_KEYS = new Set(['text', 'quote', 'body', 'question', 'answer']);

/** Flatten a string or portable text into plain text, one block per line. */
export function flattenPortableText(value: unknown): string {
  if (value == null) return '';
  if (typeof value === 'string') return value;
  const out: string[] = [];
  const walk = (node: unknown): void => {
    if (Array.isArray(node)) return node.forEach(walk);
    if (!node || typeof node !== 'object') return;
    const n = node as Record<string, unknown>;
    if (typeof n._type === 'string' && SKIP_TYPES.has(n._type)) return;
    if (n._type === 'block') {
      const text = (Array.isArray(n.children) ? n.children : [])
        .map((c) => (c && typeof c === 'object' && typeof (c as any).text === 'string' ? (c as any).text : ''))
        .join('');
      if (text.trim()) out.push(text.trim());
      return;
    }
    for (const [key, v] of Object.entries(n)) {
      if (key.startsWith('_')) continue;
      if (typeof v === 'string') {
        if (PROSE_KEYS.has(key) && v.trim()) out.push(v.trim());
      } else {
        walk(v);
      }
    }
  };
  walk(value);
  return out.join('\n');
}

// ── Text helpers ────────────────────────────────────────────────────────────

const escapeRe = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

/** Sentences: split on . ! ? and line breaks, ignoring empties. */
export function splitSentences(text: string): string[] {
  return text
    .replace(/\s+/g, ' ')
    .split(/(?<=[.!?])\s+|\n+/)
    .map((s) => s.trim())
    .filter((s) => /[a-z]/i.test(s));
}

const wordsOf = (s: string) => s.match(/[A-Za-z][A-Za-z'’-]*/g) ?? [];

/** Heuristic syllable count — vowel groups, minus a silent trailing e. */
export function syllables(word: string): number {
  const w = word.toLowerCase().replace(/[^a-z]/g, '');
  if (!w) return 0;
  if (w.length <= 3) return 1;
  const groups = w.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, '').replace(/^y/, '').match(/[aeiouy]{1,2}/g);
  return Math.max(1, groups ? groups.length : 1);
}

/** Flesch-Kincaid grade level. */
export function fleschKincaidGrade(text: string): number {
  const sentences = splitSentences(text);
  const words = wordsOf(text);
  if (!sentences.length || !words.length) return 0;
  const syl = words.reduce((n, w) => n + syllables(w), 0);
  return 0.39 * (words.length / sentences.length) + 11.8 * (syl / words.length) - 15.59;
}

const unique = (xs: string[]) => [...new Set(xs)];
const clip = (s: string, n = 90) => (s.length > n ? `${s.slice(0, n - 1)}…` : s);

// Small, deliberately conservative list. Each entry: [GB, US] word stems.
const SPELLING_PAIRS: Array<[RegExp, RegExp, string, string]> = [
  [/\bcolour/i, /\bcolor/i, 'colour', 'color'],
  [/\bbehaviour/i, /\bbehavior/i, 'behaviour', 'behavior'],
  [/\bfavour/i, /\bfavor/i, 'favour', 'favor'],
  [/\bcentre/i, /\bcenter/i, 'centre', 'center'],
  [/\bcatalogue/i, /\bcatalog\b/i, 'catalogue', 'catalog'],
  [/\banalys(e|ed|es|ing)\b/i, /\banalyz(e|ed|es|ing)\b/i, 'analyse', 'analyze'],
];
// -ise / -ize verbs, built as one rule.
const ISE_STEMS = ['optim', 'organ', 'priorit', 'custom', 'personal', 'recogn', 'minim', 'maxim', 'digit', 'standard', 'real', 'util', 'modern', 'visual', 'monet', 'categor', 'summar', 'emphas', 'special', 'author', 'stabil'];

function spellingMatches(text: string, variant: string): string[] {
  const want = variant === 'en-US' ? 'US' : 'GB';
  const found: string[] = [];
  for (const [gbRe, usRe] of SPELLING_PAIRS) {
    const bad = want === 'GB' ? usRe : gbRe;
    const good = want === 'GB' ? gbRe : usRe;
    const words = text.match(new RegExp(`${bad.source}[a-z]*`, 'gi')) ?? [];
    for (const w of words) if (!good.test(w)) found.push(w);
  }
  const iseWrong = want === 'GB' ? 'iz' : 'is';
  const stems = ISE_STEMS.join('|');
  const re = new RegExp(`\\b(?:${stems})${iseWrong}(?:e|ed|es|ing|ation|ations|er|ers)\\b`, 'gi');
  found.push(...(text.match(re) ?? []));
  return unique(found);
}

// Acronyms that are legitimately all-caps.
const CAPS_OK = new Set(['HTML', 'JSON', 'HTTP', 'HTTPS', 'WCAG', 'GDPR', 'CRUD', 'AJAX', 'YAML', 'NASA', 'ISRO', 'SEBI', 'RBI', 'UPI', 'KYC', 'SDLC', 'OKRS', 'KPIS', 'B2B', 'B2C', 'D2C', 'CSAT', 'ROAS', 'CTAS', 'APIS', 'PWAS', 'GTM',
  // Found in live copy 2026-10-13 — real acronyms, not shouting.
  'NTUC', 'HRMS', 'HDFC', 'BFSI', 'NBFC', 'FMCG', 'APAC', 'COVID', 'DMCA', 'ARIA', 'AWOL', 'IKEA', 'IDEO', 'ASOS']);

const PASSIVE_RE = /\b(am|is|are|was|were|be|been|being)\s+(?:\w+ly\s+)?(\w+ed|built|made|done|given|shown|seen|known|taken|written|driven|chosen|held|kept|led|met|paid|run|set|told|won|brought|bought|caught|found|sent|spent|thought)\b/i;

// ── Checks ──────────────────────────────────────────────────────────────────

/** Run every rule against plain text. Returns one entry per rule. */
export function voiceChecks(input: unknown, guide: VoiceGuide): VoiceCheck[] {
  const text = flattenPortableText(input);
  const checks: VoiceCheck[] = [];
  const add = (id: string, label: string, matches: string[], severity: 'warn' | 'bad', hint: string) =>
    checks.push({ id, label, pass: matches.length === 0, severity, hint, matches: matches.slice(0, 20) });

  const sentences = splitSentences(text);
  const words = wordsOf(text);

  // Banned words / phrases — whole word, case-insensitive.
  const banned: string[] = [];
  for (const w of guide.bannedWords ?? []) {
    const term = String(w ?? '').trim();
    if (!term) continue;
    const m = text.match(new RegExp(`(?<![\\w-])${escapeRe(term)}(?![\\w-])`, 'gi'));
    if (m) banned.push(...m);
  }
  add('banned', 'Banned words', unique(banned), 'bad', 'Remove or rephrase these.');

  // Preferred terms.
  const terms: string[] = [];
  for (const t of guide.preferredTerms ?? []) {
    const instead = String(t?.insteadOf ?? '').trim();
    if (!instead || !t?.use) continue;
    if (new RegExp(`(?<![\\w-])${escapeRe(instead)}(?![\\w-])`, 'i').test(text)) terms.push(`"${instead}" → "${t.use}"`);
  }
  add('preferred-terms', 'Preferred terms', terms, 'warn', 'Use the preferred term.');

  // Long sentences.
  const max = Number(guide.maxSentenceWords) || 25;
  const long = sentences.filter((s) => wordsOf(s).length > max).map((s) => `${clip(s)} (${wordsOf(s).length} words)`);
  add('sentence-length', `Sentences over ${max} words`, long, 'warn', 'Split it, or cut a clause.');

  // Reading grade — meaningless on a title, so only on 30+ words.
  const gradeMax = Number(guide.readingLevelMax) || 10;
  const grade = words.length >= 30 ? fleschKincaidGrade(text) : 0;
  add('reading-level', `Reading level over grade ${gradeMax}`, grade > gradeMax ? [`grade ${grade.toFixed(1)}`] : [], 'warn', 'Shorter sentences and plainer words bring the grade down.');

  // Passive voice — HEURISTIC (be-verb + past participle), only on 5+ sentences.
  const passive = sentences.filter((s) => PASSIVE_RE.test(s));
  const ratio = sentences.length >= 5 ? passive.length / sentences.length : 0;
  add('passive', 'Passive voice over 20% (heuristic)', ratio > 0.2 ? passive.map((s) => clip(s)) : [], 'warn', `Say who does what. ${Math.round(ratio * 100)}% of sentences look passive.`);

  // Spelling variant.
  const variant = guide.spelling === 'en-US' ? 'en-US' : 'en-GB';
  add('spelling', `Spelling (${variant})`, spellingMatches(text, variant), 'warn', variant === 'en-GB' ? 'Use British spelling, e.g. colour, optimise.' : 'Use American spelling, e.g. color, optimize.');

  // Repeated openers — same first word on 3+ sentences in a row.
  const repeats: string[] = [];
  for (let i = 0; i + 2 < sentences.length; i++) {
    const first = sentences.slice(i, i + 3).map((s) => (wordsOf(s)[0] ?? '').toLowerCase());
    if (first[0] && first.every((f) => f === first[0])) {
      repeats.push(first[0]);
      i += 2;
    }
  }
  add('openers', 'Repeated sentence openers', unique(repeats).map((w) => `"${w}…" ×3+`), 'warn', 'Vary how consecutive sentences start.');

  // Exclamation marks.
  const bangs = (text.match(/[^.!?\n]*!/g) ?? []).map((s) => clip(s.trim()));
  add('exclamation', 'Exclamation marks', bangs, 'warn', 'Let the claim carry the weight, not the punctuation.');

  // ALL-CAPS words (4+ letters, not a known acronym).
  const caps = unique((text.match(/\b[A-Z]{4,}\b/g) ?? []).filter((w) => !CAPS_OK.has(w)));
  add('caps', 'ALL-CAPS words', caps, 'warn', 'Use sentence case; reserve caps for acronyms.');

  return checks;
}

/** One-line summary of failing checks, for validation messages and badges. */
export function voiceSummary(checks: VoiceCheck[], maxItems = 3): string {
  const failed = checks.filter((c) => !c.pass);
  return failed
    .map((c) => `${c.label}: ${c.matches.slice(0, maxItems).map((m) => `“${m}”`).join(', ')}${c.matches.length > maxItems ? ` +${c.matches.length - maxItems}` : ''} — ${c.hint}`)
    .join(' · ');
}

/** The fields voice checks run on, per document type. "intro" in the brief
 *  maps to `summary` — no type has a field called intro. */
export const VOICE_FIELDS: Record<string, string[]> = {
  post: ['title', 'excerpt', 'seoTitle', 'seoDescription', 'body'],
  caseStudy: ['title', 'summary', 'seoTitle', 'seoDescription', 'bodyContent'],
  singletonPage: ['title', 'aiSummary', 'seoTitle', 'seoDescription', 'body'],
  service: ['title', 'summary', 'seoTitle', 'seoDescription', 'body'],
};
/** Fields that get "write it like this" examples once the guide is approved. */
export const VOICE_HELP_FIELDS = new Set(['title', 'excerpt', 'summary']);

export interface FieldVoiceResult {
  field: string;
  failed: VoiceCheck[];
}

/** Run checks across a document's voice fields. Only failing fields are returned. */
export function documentVoice(doc: Record<string, unknown> | null | undefined, type: string, guide: VoiceGuide): FieldVoiceResult[] {
  if (!doc) return [];
  return (VOICE_FIELDS[type] ?? [])
    .map((field) => ({ field, failed: doc[field] ? voiceChecks(doc[field], guide).filter((c) => !c.pass) : [] }))
    .filter((r) => r.failed.length > 0);
}
