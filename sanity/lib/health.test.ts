import { test } from 'node:test';
import assert from 'node:assert/strict';
import { seoChecks, buildDuplicateIndex, checksSummary, bodyText } from './health.ts';

const para = (text: string, style = 'normal') => ({ _type: 'block', style, children: [{ _type: 'span', text }] });
const longText = Array.from({ length: 320 }, (_, i) => `word${i}`).join(' ');
const desc = 'x'.repeat(140);
const title = 'A perfectly reasonable page title here';

const good = {
  _type: 'post',
  title,
  slug: 'a-reasonable-slug',
  seoDescription: desc,
  excerpt: 'Different excerpt text',
  body: [para('Intro', 'h2'), para(longText)],
};
const get = (checks: ReturnType<typeof seoChecks>, id: string) => checks.find((c) => c.id === id);

test('a clean post passes every check', () => {
  const s = checksSummary(seoChecks(good, buildDuplicateIndex([good])));
  assert.equal(s.failed.length, 0, JSON.stringify(s.failed));
});

test('unknown types produce no checks', () => {
  assert.deepEqual(seoChecks({ _type: 'client', title: 'x' }), []);
});

test('title and description length bounds', () => {
  assert.equal(get(seoChecks({ ...good, title: 'short' }), 'title-length')?.pass, false);
  assert.equal(get(seoChecks({ ...good, title: 'x'.repeat(61) }), 'title-length')?.pass, false);
  assert.equal(get(seoChecks({ ...good, seoDescription: 'x'.repeat(119) }), 'description-length')?.pass, false);
  assert.equal(get(seoChecks({ ...good, seoDescription: 'x'.repeat(161) }), 'description-length')?.pass, false);
  assert.equal(get(seoChecks({ ...good, seoDescription: 'x'.repeat(160) }), 'description-length')?.pass, true);
});

test('seoTitle wins over title; excerpt is the description fallback on posts', () => {
  assert.equal(get(seoChecks({ ...good, seoTitle: 'short' }), 'title-length')?.pass, false);
  assert.equal(get(seoChecks({ ...good, seoDescription: undefined, excerpt: 'y'.repeat(130) }), 'description-length')?.pass, true);
});

test('slug rules', () => {
  const slugPass = (slug: string) => get(seoChecks({ ...good, slug }), 'slug')?.pass;
  assert.equal(slugPass('ok-slug'), true);
  assert.equal(slugPass('Not-Lower'), false);
  assert.equal(slugPass('double--hyphen'), false);
  assert.equal(slugPass('post-title-2'), false);
  assert.equal(slugPass('a'.repeat(75)), false);
  assert.equal(slugPass('the-best-of-the-and-for-the-web'), false);
});

test('singletonPage has no slug check (no slug field)', () => {
  assert.equal(get(seoChecks({ _type: 'singletonPage', title, seoDescription: desc }), 'slug'), undefined);
});

test('post word count warns under 300, other types do not check it', () => {
  assert.equal(get(seoChecks({ ...good, body: [para('Intro', 'h2'), para('too short')] }), 'body-words')?.pass, false);
  assert.equal(get(seoChecks({ _type: 'service', title, body: [para('hi')] }), 'body-words'), undefined);
});

test('headings: needs one, at most one H1', () => {
  assert.equal(get(seoChecks({ ...good, body: [para(longText)] }), 'headings')?.pass, false);
  assert.equal(get(seoChecks({ ...good, body: [para('a', 'h1'), para('b', 'h1'), para(longText)] }), 'headings')?.pass, false);
  assert.equal(get(seoChecks({ ...good, body: [para('a', 'h1'), para(longText)] }), 'headings')?.pass, true);
});

test('alt text on image and mediaUrl blocks', () => {
  const body = [para('H', 'h2'), para(longText), { _type: 'image', alt: 'ok' }, { _type: 'mediaUrl', url: '/a.png', alt: '' }];
  const c = get(seoChecks({ ...good, body }), 'alt-text');
  assert.equal(c?.pass, false);
  assert.match(c!.hint, /1 of 2/);
  assert.equal(get(seoChecks(good), 'alt-text'), undefined);
});

test('caseStudy reads bodyContent, not body', () => {
  const body = [{ _type: 'mediaUrl', url: '/a.png' }];
  assert.equal(get(seoChecks({ _type: 'caseStudy', title, slug: 'a-case', bodyContent: body }), 'alt-text')?.pass, false);
  assert.equal(get(seoChecks({ _type: 'caseStudy', title, slug: 'a-case', body }), 'alt-text'), undefined);
});

test('focus keyword only on singletonPage, only when set', () => {
  assert.equal(get(seoChecks({ ...good, focusKeyword: 'zzz' }), 'focus-keyword'), undefined);
  const page = { _type: 'singletonPage', title: 'Product design studio in London', seoDescription: 'x'.repeat(130), body: [para('Product design is what we do'), para('more')] };
  assert.equal(get(seoChecks({ ...page, focusKeyword: 'product design' }), 'focus-keyword')?.pass, false); // not in description
  assert.equal(get(seoChecks({ ...page, seoDescription: 'Product design '.padEnd(130, 'x'), focusKeyword: 'product design' }), 'focus-keyword')?.pass, true);
  assert.equal(get(seoChecks(page), 'focus-keyword'), undefined);
});

test('description must differ from title and excerpt', () => {
  assert.equal(get(seoChecks({ ...good, seoDescription: good.title }), 'description-distinct')?.pass, false);
  assert.equal(get(seoChecks({ ...good, seoDescription: good.excerpt }), 'description-distinct')?.pass, false);
  // fallback description (excerpt) is not flagged against itself
  assert.equal(get(seoChecks({ ...good, seoDescription: undefined }), 'description-distinct')?.pass, true);
});

test('duplicates across documents of the same type', () => {
  const a = { ...good, seoTitle: 'Same Title', seoDescription: 'Same description' };
  const b = { ...good, _id: 'b', seoTitle: 'same  title', seoDescription: 'Other' };
  const idx = buildDuplicateIndex([a, b]);
  assert.equal(get(seoChecks(a, idx), 'dup-seo-title')?.pass, false);
  assert.equal(get(seoChecks(a, idx), 'dup-seo-description')?.pass, true);
  assert.equal(get(seoChecks(a), 'dup-seo-title'), undefined); // no index, no check
});

test('bodyText ignores non-text blocks', () => {
  assert.equal(bodyText([para('one'), { _type: 'image' }, para('two')]), 'one two');
  assert.equal(bodyText(null), '');
});

test('headings check is skipped for a page with an empty body, kept for posts', () => {
  assert.equal(get(seoChecks({ _type: 'singletonPage', title }), 'headings'), undefined);
  assert.equal(get(seoChecks({ _type: 'post', title, body: [] }), 'headings')?.pass, false);
});
