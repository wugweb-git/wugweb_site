import { test } from 'node:test';
import assert from 'node:assert/strict';
import { toRel } from './assetUsage.ts';
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
  // A clean post has its own share image (social-card check, 2026-10-13).
  ogImagePath: '/assets/og/post.jpg',
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

test('cover alt reads asset.alt via the cover path', () => {
  const alts = new Map([[toRel('/assets/blog/a.jpg')!, 'A desk with a laptop']]);
  assert.equal(get(seoChecks({ ...good, coverPath: '/assets/blog/a.jpg' }, undefined, alts), 'cover-alt')?.pass, true);
  assert.equal(get(seoChecks({ ...good, coverPath: 'assets/blog/a.jpg' }, undefined, alts), 'cover-alt')?.pass, true); // path spelling differs
  assert.equal(get(seoChecks({ ...good, coverPath: '/assets/blog/b.jpg' }, undefined, alts), 'cover-alt')?.pass, false);
});

test('cover alt is skipped without a lookup, for videos, or with no cover', () => {
  const alts = new Map<string, string>();
  assert.equal(get(seoChecks({ ...good, coverPath: '/assets/blog/a.jpg' }), 'cover-alt'), undefined);
  assert.equal(get(seoChecks({ ...good, coverPath: '/assets/work/a.mp4' }, undefined, alts), 'cover-alt'), undefined);
  assert.equal(get(seoChecks(good, undefined, alts), 'cover-alt'), undefined);
  assert.equal(get(seoChecks({ _type: 'singletonPage', title, coverPath: '/assets/a.jpg' }, undefined, alts), 'cover-alt'), undefined);
});

// ── Social card (2026-10-13) ──
test('social card: own image, title and description', () => {
  assert.equal(get(seoChecks(good), 'social-card')?.pass, true);
  const noImg = { ...good, ogImagePath: undefined };
  assert.equal(get(seoChecks(noImg), 'social-card')?.pass, false);
  assert.match(get(seoChecks(noImg), 'social-card')!.hint, /falls back to the site default/);
  assert.equal(get(seoChecks({ ...noImg, coverPath: '/assets/blog/x/cover.jpg' }), 'social-card')?.pass, true, 'post falls back to its cover');
  assert.equal(get(seoChecks({ ...noImg, ogImage: { asset: { _ref: 'image-1' } } }), 'social-card')?.pass, true);
});

test('social card: case study cover counts only if it is an image; services always warn', () => {
  const cs = { _type: 'caseStudy', title, slug: 'cs', seoDescription: desc, summary: 's', bodyContent: [para(longText)] };
  assert.equal(get(seoChecks({ ...cs, coverPath: '/assets/work/x/cover.webp' }), 'social-card')?.pass, true);
  assert.equal(get(seoChecks({ ...cs, coverPath: '/assets/work/x/cover.mp4' }), 'social-card')?.pass, false, 'a video cover is not a share image');
  const svc = { _type: 'service', title, slug: 'svc', seoDescription: desc, ogImagePath: '/assets/og/x.jpg' };
  assert.match(get(seoChecks(svc), 'social-card')!.hint, /service template always uses the site default/);
});

// ── Keyword stuffing (2026-10-13) ──
test('keyword stuffing: flags over 3% of the body and repeats in the title', () => {
  const page = (focusKeyword: string, bodyText: string, t = title) => ({ _type: 'singletonPage', title: t, seoDescription: desc, focusKeyword, body: [para(bodyText)] });
  // 4 uses of a 2-word keyword in ~400 words = 8/404 ≈ 2%, under the 3% line.
  const natural = Array.from({ length: 400 }, (_, i) => (i % 100 === 0 ? 'design systems' : `w${i}`)).join(' ');
  assert.equal(get(seoChecks(page('design systems', natural)), 'keyword-stuffing')?.pass, true, '4 uses in ~400 words (≈2%) is fine');
  const stuffed = Array.from({ length: 100 }, (_, i) => (i % 5 === 0 ? 'design systems' : `w${i}`)).join(' ');
  const r = get(seoChecks(page('design systems', stuffed)), 'keyword-stuffing')!;
  assert.equal(r.pass, false);
  assert.match(r.hint, /over 3%/);
  assert.equal(get(seoChecks(page('design', 'clean body text here', 'Design and design and Design')), 'keyword-stuffing')?.pass, false, 'title repeat');
  assert.equal(get(seoChecks({ ...page('', natural) }), 'keyword-stuffing'), undefined, 'no focus keyword, no check');
});
