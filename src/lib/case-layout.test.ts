// src/lib/case-layout.test.ts
//
// Run with: npm run test:case

import { test } from 'node:test';
import { strict as assert } from 'node:assert';
import { resolveLayout, slugifyChapter, type CaseDoc, type MediaManifest, type Block } from './case-layout.ts';
import type { CaseBody, Media, Section } from './case-body.ts';

function m(label: string, url: string, over: Partial<Media> = {}): Media {
  const video = /\.(mp4|webm|mov|m4v)(\?|#|$)/i.test(url);
  return { label, url, video, kind: 'figure', ...over };
}

function section(over: Partial<Section>): Section {
  return {
    title: 'Chapter',
    paras: [],
    tiles: [],
    media: [],
    styles: [],
    quotes: [],
    tables: [],
    milestones: [],
    ...over
  };
}

function body(over: Partial<CaseBody>): CaseBody {
  return {
    meta: [],
    subtitle: '',
    tags: [],
    sections: [],
    closing: [],
    results: [],
    links: {},
    ...over
  };
}

function doc(over: Partial<CaseDoc> = {}): CaseDoc {
  return { slug: 's', title: 'A case study', ...over };
}

function find<K extends Block['type']>(blocks: Block[], type: K): Extract<Block, { type: K }>[] {
  return blocks.filter(b => b.type === type) as Extract<Block, { type: K }>[];
}

test('hero is always first, carries title and tags', () => {
  const blocks = resolveLayout(body({}), undefined, doc({ title: 'Cartier', tags: ['web', 'retail'] }));
  assert.equal(blocks[0].type, 'hero');
  const hero = blocks[0] as Extract<Block, { type: 'hero' }>;
  assert.equal(hero.title, 'Cartier');
  assert.deepEqual(hero.tags, ['web', 'retail']);
});

test('summary comes after hero when present', () => {
  const blocks = resolveLayout(null, undefined, doc({ summary: 'A short promise.' }));
  assert.equal(blocks[0].type, 'hero');
  assert.equal(blocks[1].type, 'summary');
  const s = blocks[1] as Extract<Block, { type: 'summary' }>;
  assert.equal(s.text, 'A short promise.');
});

test('stats appear only when body carries 3+ metrics', () => {
  const twoMetric = body({ results: [{ value: '20%', what: 'faster' }, { value: '10%', what: 'lower cost' }] });
  const threeMetric = body({
    results: [
      { value: '20%', what: 'faster' },
      { value: '10%', what: 'lower cost' },
      { value: '3x', what: 'more submissions' }
    ]
  });
  assert.equal(find(resolveLayout(twoMetric, undefined, doc()), 'stats').length, 0);
  assert.equal(find(resolveLayout(threeMetric, undefined, doc()), 'stats').length, 1);
});

test('chapter blocks get unique ids; collisions resolve with -2, -3', () => {
  const b = body({
    sections: [
      section({ title: 'Research' }),
      section({ title: 'Research' }),
      section({ title: 'Research' })
    ]
  });
  const blocks = resolveLayout(b, undefined, doc());
  const chapters = find(blocks, 'chapter');
  assert.equal(chapters.length, 3);
  assert.deepEqual(chapters.map(c => c.id), ['research', 'research-2', 'research-3']);
});

test('reserved ids (case-study, work-cover) are never reused', () => {
  const b = body({ sections: [section({ title: 'Case study' }), section({ title: 'Work cover' })] });
  const blocks = resolveLayout(b, undefined, doc());
  const chapters = find(blocks, 'chapter');
  assert.notEqual(chapters[0].id, 'case-study');
  assert.notEqual(chapters[1].id, 'work-cover');
});

test('manifest entries with status != 200 or dupOf are skipped', () => {
  const dead = m('Dead', 'https://r2/x.jpg');
  const dupe = m('Dupe', 'https://r2/y.jpg');
  const ok = m('Hero', 'https://r2/z.jpg');
  const b = body({ sections: [section({ title: 'Design', media: [dead, dupe, ok] })] });
  const manifest: MediaManifest = {
    slug: 's', entries: [
      { url: 'https://r2/x.jpg', status: 404 },
      { url: 'https://r2/y.jpg', status: 200, dupOf: 'https://r2/z.jpg' },
      { url: 'https://r2/z.jpg', status: 200 }
    ]
  };
  const blocks = resolveLayout(b, manifest, doc());
  const figures = find(blocks, 'figure');
  assert.equal(figures.length, 1);
  assert.equal(figures[0].media.url, 'https://r2/z.jpg');
});

test('loops render before videos; videos get their own block', () => {
  const loop = m('Hover loop', 'https://r2/hover.mp4', { kind: 'loop' });
  const vid = m('Walk-through', 'https://r2/walk.mp4', { kind: 'video' });
  const b = body({ sections: [section({ title: 'Flow', media: [vid, loop] })] });
  const blocks = resolveLayout(b, undefined, doc());
  const loopIdx = blocks.findIndex(b => b.type === 'loop');
  const vidIdx = blocks.findIndex(b => b.type === 'video');
  assert.ok(loopIdx > -1 && vidIdx > -1);
  assert.ok(loopIdx < vidIdx);
});

test('rail caps at 8 screens', () => {
  const screens = Array.from({ length: 14 }, (_, i) =>
    m(`Screen ${i + 1}`, `https://r2/s${i + 1}.png`, { kind: 'screen' })
  );
  const b = body({ sections: [section({ title: 'Screens', media: screens })] });
  const blocks = resolveLayout(b, undefined, doc());
  const rails = find(blocks, 'rail');
  assert.equal(rails.length, 1);
  assert.equal(rails[0].items.length, 8);
});

test('split hint consumes two figures, the rest render as figure blocks', () => {
  const a = m('A', 'https://r2/a.png');
  const b1 = m('B', 'https://r2/b.png');
  const c = m('C', 'https://r2/c.png');
  const b = body({
    sections: [section({ title: 'Styles', media: [a, b1, c], layoutHint: 'split' })]
  });
  const blocks = resolveLayout(b, undefined, doc());
  const splits = find(blocks, 'split');
  const figs = find(blocks, 'figure');
  assert.equal(splits.length, 1);
  assert.equal(splits[0].left.url, a.url);
  assert.equal(splits[0].right.url, b1.url);
  assert.equal(figs.length, 1);
  assert.equal(figs[0].media.url, c.url);
});

test('styles pair renders as its own pair block when both urls are usable', () => {
  const colour = m('Palette', 'https://r2/pal.png');
  const type = m('Type', 'https://r2/type.png');
  const b = body({ sections: [section({ title: 'Identity', styles: [colour, type] })] });
  const blocks = resolveLayout(b, undefined, doc());
  const pairs = find(blocks, 'pair');
  assert.equal(pairs.length, 1);
  assert.equal(pairs[0].left.url, colour.url);
  assert.equal(pairs[0].right.url, type.url);
});

test('All screens block groups by audience then flow and orders by step', () => {
  const screens = [
    m('A', 'https://r2/m1.png', { kind: 'screen' }),
    m('B', 'https://r2/m2.png', { kind: 'screen' }),
    m('C', 'https://r2/a1.png', { kind: 'screen' })
  ];
  const b = body({ sections: [section({ title: 'All', media: screens })] });
  const manifest: MediaManifest = {
    slug: 's', entries: [
      { url: 'https://r2/m1.png', audience: 'member', flow: 'Signup', step: 2 },
      { url: 'https://r2/m2.png', audience: 'member', flow: 'Signup', step: 1 },
      { url: 'https://r2/a1.png', audience: 'admin', flow: 'Review', step: 1 }
    ]
  };
  const blocks = resolveLayout(b, manifest, doc());
  const screensBlock = find(blocks, 'screens')[0];
  assert.ok(screensBlock);
  assert.equal(screensBlock.sets.length, 2);
  assert.equal(screensBlock.sets[0].audience, 'member');
  assert.equal(screensBlock.sets[0].flows[0].items[0].url, 'https://r2/m2.png');
  assert.equal(screensBlock.sets[0].flows[0].items[1].url, 'https://r2/m1.png');
  assert.equal(screensBlock.sets[1].audience, 'admin');
});

test('results block includes every metric; stats is a cap at 3', () => {
  const b = body({
    results: [
      { value: '20%', what: 'faster' },
      { value: '10%', what: 'lower cost' },
      { value: '3x', what: 'more submissions' },
      { value: '94%', what: 'satisfied' }
    ]
  });
  const blocks = resolveLayout(b, undefined, doc());
  const stats = find(blocks, 'stats')[0];
  const results = find(blocks, 'results')[0];
  assert.equal(stats.items.length, 3);
  assert.equal(results.items.length, 4);
});

test('credits block carries team and specialThanks from the doc', () => {
  const blocks = resolveLayout(null, undefined, doc({
    team: ['Nadia', 'Ravi'],
    specialThanks: 'The client team',
    year: 2024,
    country: 'Singapore'
  }));
  const credits = find(blocks, 'credits')[0];
  assert.ok(credits);
  assert.equal(credits.items['Team'], 'Nadia, Ravi');
  assert.equal(credits.items['Year'], '2024');
  assert.equal(credits.items['Country'], 'Singapore');
});

test('presence block carries the links the body declares', () => {
  const b = body({
    links: {
      Live: { value: 'Live', text: 'Live', href: 'https://example.com' },
      Behance: { value: 'Behance', text: 'Behance', href: 'https://behance.net/x' }
    }
  });
  const blocks = resolveLayout(b, undefined, doc());
  const presence = find(blocks, 'presence')[0];
  assert.ok(presence);
  assert.equal(presence.links.length, 2);
});

test('related and next blocks come from doc, each appears once', () => {
  const blocks = resolveLayout(null, undefined, doc({
    related: [{ slug: 'r1', title: 'R1' }, { slug: 'r2', title: 'R2' }],
    next: { slug: 'n', title: 'N' }
  }));
  assert.equal(find(blocks, 'related').length, 1);
  assert.equal(find(blocks, 'next').length, 1);
});

test('no body: hero renders from doc fields, with summary and cover', () => {
  const blocks = resolveLayout(null, undefined, doc({
    title: 'No body',
    summary: 'Short summary.',
    coverPath: 'https://r2/cover.jpg'
  }));
  const hero = blocks[0] as Extract<Block, { type: 'hero' }>;
  assert.equal(hero.type, 'hero');
  assert.equal(hero.cover?.url, 'https://r2/cover.jpg');
  assert.equal(find(blocks, 'summary')[0].text, 'Short summary.');
});

test('slugifyChapter is stable and ASCII-ish', () => {
  assert.equal(slugifyChapter('Design philosophy', 0), 'design-philosophy');
  assert.equal(slugifyChapter('Résultats 2024', 1), 'resultats-2024');
  assert.equal(slugifyChapter('', 4), 'chapter-5');
  assert.equal(slugifyChapter('Multi    spaces  ', 2), 'multi-spaces');
});

test('every block type in the catalogue may be produced by the resolver', () => {
  // Build a body that exercises every branch.
  const screens = Array.from({ length: 3 }, (_, i) =>
    m(`S${i + 1}`, `https://r2/s${i + 1}.png`, { kind: 'screen' })
  );
  const b = body({
    subtitle: 'Sub',
    sections: [
      section({
        title: 'Chapter one',
        lead: 'Lead',
        paras: ['Para one.'],
        tiles: [{ title: 'Tile', text: 'Body' }],
        media: [
          m('Loop', 'https://r2/loop.mp4', { kind: 'loop' }),
          m('Video', 'https://r2/walk.mp4', { kind: 'video' }),
          m('Scroll', 'https://r2/long-scrollshot.png'),
          m('Fig', 'https://r2/fig.png'),
          ...screens
        ],
        styles: [m('Colour', 'https://r2/col.png'), m('Type', 'https://r2/type.png')],
        quotes: [{ text: 'Quote.', by: 'Someone' }],
        tables: [{ head: ['A'], rows: [['1']] }],
        milestones: [{ date: '2024', text: 'Kickoff' }]
      })
    ],
    closing: [],
    results: [
      { value: '1', what: 'a' }, { value: '2', what: 'b' }, { value: '3', what: 'c' }
    ],
    links: { Live: { value: 'Live', text: 'Live', href: 'https://example.com' } }
  });
  const d = doc({
    team: ['A'], related: [{ slug: 'r', title: 'R' }], next: { slug: 'n', title: 'N' }
  });
  const blocks = resolveLayout(b, undefined, d);
  const types = new Set(blocks.map(b => b.type));
  for (const want of [
    'hero', 'stats', 'chapter', 'points', 'figure', 'rail', 'pair',
    'loop', 'video', 'scrollshot', 'quote', 'table', 'timeline',
    'results', 'credits', 'presence', 'related', 'next'
  ]) {
    assert.ok(types.has(want as Block['type']), `missing block type: ${want}`);
  }
});
