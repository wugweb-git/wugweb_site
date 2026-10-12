import { test } from 'node:test';
import assert from 'node:assert/strict';
import { voiceChecks, flattenPortableText, documentVoice, fleschKincaidGrade, isGuideActive, type VoiceGuide } from './voice.ts';
import { voiceValidate, resetGuideCache } from './voiceValidation.ts';

const guide: VoiceGuide = {
  status: 'approved',
  bannedWords: ['synergy', 'world-class', 'cutting edge'],
  preferredTerms: [{ use: 'people', insteadOf: 'users' }],
  spelling: 'en-GB',
  readingLevelMax: 10,
  maxSentenceWords: 12,
};
const failed = (text: unknown, g = guide) => voiceChecks(text, g).filter((c) => !c.pass);
const byId = (text: unknown, id: string, g = guide) => voiceChecks(text, g).find((c) => c.id === id)!;

// ── Rules ──
test('banned words: whole word, case-insensitive, phrases', () => {
  const c = byId('We bring Synergy and a CUTTING EDGE approach. Synergistic is fine.', 'banned');
  assert.equal(c.pass, false);
  assert.deepEqual(c.matches.map((m) => m.toLowerCase()).sort(), ['cutting edge', 'synergy']);
  assert.equal(byId('A world-class team.', 'banned').pass, false, 'hyphenated term matches');
  assert.equal(byId('A worldclass team.', 'banned').pass, true);
});

test('preferred terms', () => {
  const c = byId('Our users love it.', 'preferred-terms');
  assert.equal(c.pass, false);
  assert.match(c.matches[0], /users.*people/);
});

test('long sentences over maxSentenceWords', () => {
  const c = byId('One two three four five six seven eight nine ten eleven twelve thirteen. Short one.', 'sentence-length');
  assert.equal(c.pass, false);
  assert.equal(c.matches.length, 1);
});

test('reading level only on 30+ words', () => {
  assert.equal(byId('Interdisciplinary operationalisation.', 'reading-level').pass, true, 'too short to grade');
  const dense = Array(6).fill('Organisational transformation necessitates comprehensive interdisciplinary collaboration.').join(' ');
  assert.ok(fleschKincaidGrade(dense) > 10);
  assert.equal(byId(dense, 'reading-level').pass, false);
});

test('passive voice heuristic over 20%, only on 5+ sentences', () => {
  const passive = 'The site was built fast. The app was designed well. Tests were written. We ship. We measure.';
  assert.equal(byId(passive, 'passive').pass, false);
  assert.equal(byId('The site was built fast. We ship.', 'passive').pass, true, 'under 5 sentences is not scored');
});

test('spelling variant en-GB flags US forms, and vice versa', () => {
  const gb = byId('We optimize the color and behavior. We analyze it.', 'spelling');
  assert.equal(gb.pass, false);
  assert.deepEqual(gb.matches.map((m) => m.toLowerCase()).sort(), ['analyze', 'behavior', 'color', 'optimize']);
  assert.equal(byId('We optimise the colour and behaviour.', 'spelling').pass, true);
  const us = byId('We optimise the colour.', 'spelling', { ...guide, spelling: 'en-US' });
  assert.deepEqual(us.matches.map((m) => m.toLowerCase()).sort(), ['colour', 'optimise']);
});

test('repeated sentence openers (3 in a row)', () => {
  assert.equal(byId('We plan. We build. We ship.', 'openers').pass, false);
  assert.equal(byId('We plan. Then we build. We ship.', 'openers').pass, true);
});

test('exclamation marks and ALL-CAPS words', () => {
  assert.equal(byId('This is great!', 'exclamation').pass, false);
  const caps = byId('A REALLY bold claim using HTML and WCAG.', 'caps');
  assert.deepEqual(caps.matches, ['REALLY'], 'acronyms are allowed');
});

test('clean copy passes every rule', () => {
  assert.deepEqual(failed('We help teams ship clear products. People notice.'), []);
});

// ── Flattener ──
test('portable text flattener keeps prose, skips code and tables', () => {
  const body = [
    { _type: 'block', children: [{ _type: 'span', text: 'Hello ' }, { _type: 'span', text: 'world.' }] },
    { _type: 'codeBlock', code: 'const synergy = 1;' },
    { _type: 'comparisonTable', rows: [{ cells: ['synergy'] }] },
    { _type: 'table', rows: [{ cells: ['synergy'] }] },
    { _type: 'callout', text: 'A callout line.' },
    { _type: 'quoteBlock', quote: 'A quote.', author: 'Someone' },
    { _type: 'twoColumns', left: [{ _type: 'block', children: [{ text: 'Left col.' }] }] },
  ];
  const text = flattenPortableText(body);
  assert.equal(text, 'Hello world.\nA callout line.\nA quote.\nLeft col.');
  assert.ok(!/synergy/.test(text), 'code and tables are skipped');
  assert.equal(byId(body, 'banned').pass, true, 'banned word inside code is not flagged');
});

test('flattener handles strings and empties', () => {
  assert.equal(flattenPortableText('plain'), 'plain');
  assert.equal(flattenPortableText(null), '');
  assert.equal(flattenPortableText([]), '');
});

test('documentVoice reports only failing fields', () => {
  const r = documentVoice({ title: 'Synergy wins', excerpt: 'Fine copy.' }, 'post', guide);
  assert.deepEqual(r.map((x) => x.field), ['title']);
  assert.deepEqual(documentVoice({ title: 'x' }, 'unknownType', guide), []);
});

// ── Validation helper ──
test('validation: guide missing → no warning', async () => {
  resetGuideCache();
  assert.equal(await voiceValidate('Synergy!', async () => null), true);
});

test('validation: draft guide → no warning', async () => {
  resetGuideCache();
  assert.equal(await voiceValidate('Synergy!', async () => ({ ...guide, status: 'draft' })), true);
  assert.equal(isGuideActive({ ...guide, status: 'draft' }), false);
});

test('validation: fetch failure → no warning, never throws', async () => {
  resetGuideCache();
  assert.equal(await voiceValidate('Synergy!', async () => { throw new Error('network down'); }), true);
});

test('validation: approved guide → message says what matched and the fix', async () => {
  resetGuideCache();
  const msg = await voiceValidate('Synergy for users!', async () => guide);
  assert.equal(typeof msg, 'string');
  assert.match(String(msg), /Banned words: “Synergy”/);
  assert.match(String(msg), /Remove or rephrase/);
  assert.match(String(msg), /users.*people/);
});

test('validation: guide is cached (loader called once within TTL)', async () => {
  resetGuideCache();
  let calls = 0;
  const load = async () => { calls++; return guide; };
  await voiceValidate('a', load);
  await voiceValidate('b', load);
  assert.equal(calls, 1);
});

test('validation: empty value → no warning', async () => {
  resetGuideCache();
  assert.equal(await voiceValidate('', async () => guide), true);
  assert.equal(await voiceValidate([], async () => guide), true);
});
