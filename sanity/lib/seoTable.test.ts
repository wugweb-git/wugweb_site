import { test } from 'node:test';
import assert from 'node:assert/strict';
import { blocksToMarkdown, countWords, readTimeMinutes, docToMarkdown, markdownFileName } from './markdown.ts';
import { summarizeChecks, enrichRows, isMissingSeo } from './seoSummary.ts';
import { generateMeta } from './autoMeta.ts';

const block = (text: string, extra: Record<string, unknown> = {}) => ({ _type: 'block', style: 'normal', children: [{ _type: 'span', text }], ...extra });

// ── Markdown ──
test('markdown: headings, lists, quotes, marks and links', () => {
  const md = blocksToMarkdown(
    [
      block('Intro', { style: 'h2' }),
      { _type: 'block', style: 'normal', markDefs: [{ _key: 'l1', _type: 'link', href: 'https://x.test' }], children: [
        { _type: 'span', text: 'bold', marks: ['strong'] }, { _type: 'span', text: ' and ' }, { _type: 'span', text: 'link', marks: ['l1'] },
      ] },
      block('one', { listItem: 'bullet' }),
      block('first', { listItem: 'number' }),
      block('wise words', { style: 'blockquote' }),
    ],
    'My Title',
  );
  assert.equal(md, '# My Title\n\n## Intro\n\n**bold** and [link](https://x.test)\n\n- one\n1. first\n> wise words');
});

test('markdown: code and callout blocks; empty blocks skipped', () => {
  const md = blocksToMarkdown([{ _type: 'code', language: 'js', code: 'x()' }, block('   '), { _type: 'callout', type: 'tip', title: 'Note', text: 'Hi' }]);
  assert.match(md, /```js\nx\(\)\n```/);
  assert.match(md, /> \[!TIP\]\n> \*\*Note\*\*\n> Hi/);
});

test('markdown: words and read time (200 wpm, min 1, 0 when empty)', () => {
  const body = [block(Array.from({ length: 450 }, () => 'w').join(' '))];
  assert.equal(countWords(body), 450);
  assert.equal(readTimeMinutes(450), 3);
  assert.equal(readTimeMinutes(1), 1);
  assert.equal(readTimeMinutes(0), 0);
  assert.equal(countWords(undefined as any), 0);
});

test('markdown: docToMarkdown uses bodyContent for case studies, body elsewhere', () => {
  assert.equal(docToMarkdown({ _type: 'caseStudy', title: 'CS', bodyContent: [block('from bodyContent')], body: [block('wrong')] }), '# CS\n\nfrom bodyContent');
  assert.equal(docToMarkdown({ _type: 'post', title: 'P', body: [block('hello')] }), '# P\n\nhello');
  assert.equal(docToMarkdown({ _type: 'singletonPage', pageId: 'about', body: [] }), '# about');
});

test('markdown: safe file names', () => {
  assert.equal(markdownFileName({ slug: 'My Post!' }), 'my-post.md');
  assert.equal(markdownFileName({ pageId: 'about' }), 'about.md');
  assert.equal(markdownFileName({}), 'document.md');
});

// ── Checks summary (the "Checks passed" column) ──
const desc = 'x'.repeat(140);
const goodPost = {
  _type: 'post', title: 'A perfectly reasonable page title here', slug: 'a-reasonable-slug', seoDescription: desc,
  excerpt: 'Different', ogImagePath: '/assets/og/p.jpg',
  body: [block('Intro', { style: 'h2' }), block(Array.from({ length: 320 }, (_, i) => `w${i}`).join(' '))],
};

test('checks summary: label, state and failing list', () => {
  const ok = summarizeChecks(goodPost);
  assert.equal(ok.state, 'All checks pass');
  assert.equal(ok.label, `${ok.total}/${ok.total}`);
  const bad = summarizeChecks({ ...goodPost, title: 'short', seoDescription: '' });
  assert.equal(bad.state, 'Has failing checks');
  assert.equal(bad.label, `${bad.passed}/${bad.total}`);
  assert.ok(bad.failed.some((c) => c.id === 'title-length'));
  assert.equal(summarizeChecks({ _type: 'client', title: 'x' }).state, 'No checks');
  assert.equal(summarizeChecks({ _type: 'client', title: 'x' }).label, '—');
});

test('enrichRows adds plain-string fields the table can filter and sort on', () => {
  const [row] = enrichRows([goodPost]);
  assert.equal(row.__checksState, 'All checks pass');
  assert.equal(row.__seoMissing, 'Has SEO description');
  assert.equal(row.__words, 321);
  assert.equal(row.__readTime, 2);
  assert.equal((row.__checks as any).label.includes('/'), true);
});

test('Missing SEO keeps the SEO tool rule (none, or 20 characters or fewer)', () => {
  assert.equal(isMissingSeo({}), true);
  assert.equal(isMissingSeo({ seoDescription: 'x'.repeat(20) }), true);
  assert.equal(isMissingSeo({ seoDescription: 'x'.repeat(21) }), false);
});

// ── Auto Meta (moved, behaviour unchanged) ──
test('Auto Meta keeps existing values and only fills empty ones', () => {
  assert.deepEqual(generateMeta({ title: 'T', seoTitle: 'Keep', seoDescription: 'Keep too' }), { seoTitle: 'Keep', seoDescription: 'Keep too' });
  const g = generateMeta({ title: 'x'.repeat(70), body: [block('b'.repeat(200))] });
  assert.equal(g.seoTitle.length, 58);
  assert.ok(g.seoTitle.endsWith('…'));
  assert.equal(g.seoDescription.length, 158);
  assert.equal(generateMeta({ title: 'T' }).seoDescription, 'Wugweb — Digital Experience Agency');
});
