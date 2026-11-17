import { test } from 'node:test';
import assert from 'node:assert/strict';
import { parseCaseBody, mediaKind, META_KEYS, type CaseBody } from './case-body.ts';

// Fixtures marked "cut from" are short excerpts of real Body Content as synced
// to the CMS (read-only fetch, 2026-11-17), lines kept as written, tabs
// included. Fixtures marked "synthetic" are hand-written to exercise the v2
// grammar and say nothing about any client.

const R2 = 'https://pub-39ad1d03baec440faf48303be95c3782.r2.dev/assets';

const parse = (md: string): CaseBody => {
  const b = parseCaseBody(md);
  assert.ok(b, 'body parses');
  return b;
};
const titles = (b: CaseBody) => b.sections.map((s) => s.title);

test('empty bodies return null', () => {
  assert.equal(parseCaseBody(null), null);
  assert.equal(parseCaseBody(undefined), null);
  assert.equal(parseCaseBody('  \n\t\n'), null);
});

// Cut from: cartier-redesigning-the-career-website-where-passion-meets-excellence
const CARTIER = [
  '## Redesigning Cartier’s Career Website',
  '**Subtitle:** Blending iconic luxury aesthetics with a modern, mobile-first candidate journey.',
  '**Category:** Brand & Strategy, Experience Design',
  '**Tags:** Luxury, Talent Brand, Interactive Job Posts',
  '**Partner:** Publicis Sapient',
  '**Client:** Cartier',
  '**Industry:** Luxury',
  '**About (Context)**',
  'Cartier, a French luxury Maison within Richemont, is synonymous with open-mindedness and curiosity, seeing beauty in everything.',
  '## **Challenges**',
  'Cartier’s career site needed to better reflect its brand and values:',
  '1. **Dated Digital Presence**: The site lacked luxury and visual impact.',
  '\t---',
  '\t## **Solutions**',
  '1. **Luxury-Aligned Visual Design**: Reflected Cartier’s prestige and craftsmanship.',
  '## Media',
  `![Client logo](${R2}/work/cartier-careers/client-logo-jrot.png)`,
  `![Cover Image](${R2}/work/cartier-careers/cover-image-qrw0.jpg)`,
  `![Challenge Image 1](${R2}/work/cartier-careers/challenge-image-1-xrsy.jpg)`,
  `![Solution Image 1](${R2}/work/cartier-careers/solution-image-1-xrct.jpg)`,
  `![Styles Image 1](${R2}/work/cartier-careers/styles-image-1-5rfo.png)`,
  `![Styles Image 2](${R2}/work/cartier-careers/styles-image-2-8h8t.png)`,
  `![Conclusion Image 1](${R2}/work/crafting-digital-authority-the-adneto-website-showcase/conclusion-image-2-74t5.jpg)`,
  `- About Video URL: ${R2}/work/cartier-careers/cartier-about.mp4`,
  '## Sanity site copy',
  'The long-form copy as published on the site.',
  '### About',
  'Cartier, a French luxury Maison within Richemont, is synonymous with open-mindedness and curiosity, seeing beauty in everything.',
  '### Challenges',
  'The redesign of Cartier’s Career Website specifically addressed several critical pain points to better attract and engage top talent',
  '**Uninspiring & Dated Design**',
  'The previous website failed to adequately reflect Cartier’s luxurious brand image, struggling to capture the attention of potential candidates.',
  '**Static Job Postings**',
  'Traditional, un-interactive job postings hindered meaningful candidate engagement, offering little beyond basic role descriptions.',
  '### Solutions',
  'The redesign implemented a comprehensive strategy focusing on elevating the candidate experience through captivating design, compelling content, and seamless functionality.',
  '**Mobile-First Experience**',
  'Fully optimized for all devices to ensure easy navigation and application on the go.',
  '### Conclusion',
  'The strategic redesign of Cartier’s Career Website yielded significant positive outcomes, enhancing its position as a leading employer in the luxury sector',
  '**Boosted Employer Brand**',
  'The new website strengthened Cartier’s presence in the luxury talent market.',
].join('\n');

test('rich body with site copy: the long copy wins', () => {
  const b = parse(CARTIER);
  assert.deepEqual(titles(b), ['About', 'Challenges', 'Solutions', 'Conclusion']);
  const ch = b.sections[1];
  assert.match(ch.lead || '', /^The redesign of Cartier/);
  assert.deepEqual(ch.tiles.map((t) => t.title), ['Uninspiring & Dated Design', 'Static Job Postings']);
  // Nothing from the short copy leaks in.
  assert.ok(!b.sections.some((s) => s.tiles.some((t) => /Dated Digital Presence/.test(t.title || ''))));
  assert.ok(!b.sections.some((s) => s.paras.some((p) => /long-form copy as published/.test(p))));
});

test('rich body: meta, subtitle, tags and v1 media routing', () => {
  const b = parse(CARTIER);
  assert.equal(b.subtitle, 'Blending iconic luxury aesthetics with a modern, mobile-first candidate journey.');
  assert.deepEqual(b.tags, ['Luxury', 'Talent Brand', 'Interactive Job Posts']);
  assert.deepEqual(b.meta.map((m) => [m.key, m.value]), [
    ['Category', 'Brand & Strategy, Experience Design'], ['Partner', 'Publicis Sapient'], ['Client', 'Cartier'], ['Industry', 'Luxury'],
  ]);
  assert.match(b.cover?.url || '', /cover-image-qrw0\.jpg$/);
  assert.equal(b.cover?.kind, 'cover');
  const [about, challenges, solutions, conclusion] = b.sections;
  assert.deepEqual(about.styles.map((m) => m.kind), ['styles', 'styles'], 'styles sit in About');
  assert.ok(about.media.some((m) => m.video && /cartier-about\.mp4$/.test(m.url)), 'About video routed to About');
  assert.match(challenges.media[0].url, /challenge-image-1/);
  assert.equal(challenges.media[0].kind, 'challenge');
  assert.match(solutions.media[0].url, /solution-image-1/);
  assert.equal(conclusion.media.length, 0, 'image from another case study folder is filtered');
  assert.ok(![...b.sections.flatMap((s) => s.media), ...b.closing].some((m) => /client-logo/.test(m.url)), 'client logo never renders');
  assert.deepEqual(b.results, []);
  assert.deepEqual(b.links, {});
  assert.equal(b.accent, undefined);
});

test('ownFolder option overrides the majority guess', () => {
  const b = parseCaseBody(CARTIER, { ownFolder: 'crafting-digital-authority-the-adneto-website-showcase' });
  assert.ok(b);
  assert.equal(b.cover, undefined, 'cover from another folder is now the borrowed one');
  assert.match(b.sections[3].media[0].url, /conclusion-image-2-74t5/);
});

// Cut from: labelly-immutable-product-verification-via-blockchain-integration
const LABELLY = [
  '## Labelly: Immutable Product Verification via Blockchain Integration',
  '**Subtitle:** Positioning blockchain as a consumer-friendly standard for product truth.',
  '**Partner:** None',
  '**Client:** Labelly',
  '**Team:** Vedanshu Srivastava,',
  '### **Challenges**',
  '- **Counterfeit Proliferation**',
  '\tReplacing duplicable QR codes with immutable proof.',
  '- **Web3 Adoption Barriers**',
  '\tSimplifying blockchain for non-technical users.',
  '\t### **Solutions**',
  '- **Blockchain Verification Engine**',
  '\tImplemented Ethereum-based product identity logic.',
  '\t### **Impact**',
  '- **Brand Protection at Scale**',
  '\tEliminated counterfeit ambiguity.',
  '\t### **Strategic Insights & Design Philosophy**',
  '- **Trust is a Utility**',
  '\tVerification is the product.',
  '-',
].join('\n');

test('thin tab-indented body: indented headings are chapters, not tiles', () => {
  const b = parse(LABELLY);
  assert.deepEqual(titles(b), ['Challenges', 'Solutions', 'Impact', 'Strategic Insights & Design Philosophy']);
  assert.ok(!b.sections.some((s) => s.paras.some((p) => p.includes('###'))));
  assert.deepEqual(b.sections[0].tiles, [
    { group: undefined, title: 'Counterfeit Proliferation', text: 'Replacing duplicable QR codes with immutable proof.' },
    { group: undefined, title: 'Web3 Adoption Barriers', text: 'Simplifying blockchain for non-technical users.' },
  ]);
  assert.deepEqual(b.sections[3].tiles.map((t) => t.title), ['Trust is a Utility'], 'a lone "-" is skipped');
  assert.deepEqual(b.meta.map((m) => m.key), ['Client', 'Team'], 'Partner: None is dropped');
});

// Cut from: sbs-transit-engineering-the-future-of-multimodal-urban-mobility
const SBS = [
  '### **About (Context)**',
  'SBS Transit is a leading public transport operator in Singapore, serving millions of commuters daily.',
  '### **Challenges**',
  '- **Data Fragmentation**',
  '\tConsolidating live data from buses, trains, and cycling systems into one interface.',
  '- **Legacy Performance Constraints**',
  '\tOvercoming latency and accuracy issues in traditional transit apps.',
  '### **Impact**',
  '- **Operational Efficiency Gains**',
  '\tAccelerated feature deployment by 40% post-migration.',
].join('\n');

test('two-line items merge into one point; "(Context)" is dropped from the title', () => {
  const b = parse(SBS);
  assert.deepEqual(titles(b), ['About', 'Challenges', 'Impact']);
  assert.match(b.sections[0].lead || '', /^SBS Transit is/);
  assert.deepEqual(b.sections[1].tiles.map((t) => [t.title, t.text]), [
    ['Data Fragmentation', 'Consolidating live data from buses, trains, and cycling systems into one interface.'],
    ['Legacy Performance Constraints', 'Overcoming latency and accuracy issues in traditional transit apps.'],
  ]);
  assert.deepEqual(b.sections[1].paras, []);
  assert.equal(b.sections[2].tiles[0].text, 'Accelerated feature deployment by 40% post-migration.');
});

test('synthetic: a following indented "- sub" item is not swallowed', () => {
  const b = parse(['### Points', '- **Title only**', '\t- Sub item one', '- **Second**', '\tIts description.'].join('\n'));
  assert.deepEqual(b.sections[0].tiles.map((t) => [t.title, t.text]), [
    [undefined, 'Title only'], [undefined, 'Sub item one'], ['Second', 'Its description.'],
  ]);
});

// Cut from: demystifying-finance-crafting-the-ux-for-aditya-birla-capital-s-credit-score-tool
const ABC = [
  '## Sanity site copy',
  'The long-form copy as published on the site.',
  '### Challenges',
  'Several key challenges surfaced early in the process, guiding the UX decisions and overall product direction.',
  '#### Trust and Transparency',
  'The UX needed to establish immediate credibility, given the high-stakes nature and sensitivity of personal credit scores and financial data.',
  '#### Seamless Integration',
  'Ensuring that the design seamlessly integrated the complex, raw technical data provided by Experian into a clean, easy-to-understand consumer format.',
].join('\n');

test('#### point titles lose their # run', () => {
  const b = parse(ABC);
  assert.deepEqual(b.sections[0].tiles.map((t) => t.title), ['Trust and Transparency', 'Seamless Integration']);
  assert.match(b.sections[0].lead || '', /^Several key challenges/);
});

// Cut from: airtel-xsafe-securing-homes-with-intuitive-digital-experiences
const XSAFE = [
  '## Sanity site copy',
  '### Solutions',
  'At Wugweb, in strategic collaboration with Dentsu Webchutney, we engineered the Airtel Xsafe website with an unwavering focus on clarity, trust, and conversion optimization.',
  '**Immersive Visual Storytelling:**',
  'Visually rich hero sections and detailed product pages highlight the core value of home security.',
  '**Simplified Feature Communication**',
  'Complex specs are translated into benefits using icons, infographics, and comparison tables.',
].join('\n');

test('a trailing colon inside a bold title is dropped and the point kept', () => {
  const b = parse(XSAFE);
  const s = b.sections[0];
  assert.deepEqual(s.tiles.map((t) => t.title), ['Immersive Visual Storytelling', 'Simplified Feature Communication']);
  assert.deepEqual(s.paras, []);
});

test('synthetic: trailing colon on a lead stays prose; numbered "Title: text" stays a point', () => {
  const b = parse(['### Challenges', 'Launching a new product required trust and clarity:', '1. **Trust**: Users needed confidence.', '8.'].join('\n'));
  assert.equal(b.sections[0].lead, 'Launching a new product required trust and clarity:');
  assert.deepEqual(b.sections[0].tiles, [{ group: undefined, title: 'Trust', text: 'Users needed confidence.' }]);
});

// Cut from: valyu-ai-empowering-indias-workforce-with-on-demand-earned-wages
const VALYU = [
  '## [VALYU.ai](http://valyu.ai/) title line',
  '**Subtitle:** Redefining financial health with instant access to accrued earnings.',
  '**Partner:** None',
  '**Client:** [VALYU.ai](http://valyu.ai/)',
  '**Industry:** Fintech, HRTech',
  '### **About (Context)**',
  '[VALYU.ai](http://valyu.ai/) ventured into the salary solution space.',
].join('\n');

test('raw markdown link in meta: value kept, text and href parsed', () => {
  const b = parse(VALYU);
  const client = b.meta.find((m) => m.key === 'Client');
  assert.ok(client);
  assert.equal(client.value, '[VALYU.ai](http://valyu.ai/)', 'value is unchanged for the current template');
  assert.equal(client.text, 'VALYU.ai');
  assert.deepEqual(client.links, [{ text: 'VALYU.ai', href: 'http://valyu.ai/' }]);
  assert.deepEqual(b.meta.find((m) => m.key === 'Industry')?.links, []);
});

// Synthetic v2 sample (not a client body).
const V2 = [
  '## Example project: member portal',
  '**Subtitle:** One portal to apply, one back office to run every programme.',
  '**Client:** [Example Org](https://example.org)',
  '**Year:** 2022',
  '**Live:** https://example.org/portal',
  '**App Store:** [Example app](https://apps.example.com/app/1)',
  '**Awards:** Shortlist, Example Awards 2023',
  '**Accent:** #EA1828',
  '**Results:**',
  '- 42% | fewer support tickets | Internal helpdesk report, Jan to Jun 2026 | as of 2026-07',
  '- 3 | programmes on one portal',
  `![Cover](${R2}/work/example/cover.jpg)`,
  `![Client logo](${R2}/work/example/logo.png)`,
  '### Members apply in one guided flow',
  'Layout: rail',
  'A member finds a programme and applies in five short sections.',
  '*For members*',
  '- **Prefill first**: Details fill in before the member types anything.',
  `![Screens: Member 1, Portal home](${R2}/work/example/m1.png)`,
  '- **Track it afterwards**: Every application shows its status.',
  `![Screens: Member 2, Application start](${R2}/work/example/m2.png)`,
  `- Loop: ${R2}/work/example/flow.mp4`,
  '- Website: https://example.org',
  '### Screens',
  `![Web: Dashboard 1](${R2}/work/example/d1.png)`,
  `![Styles: Board](${R2}/work/example/styles.png)`,
  '### What members said',
  '> "It took ten minutes instead of a morning."',
  '> Sample Person, Member, Example Org',
  '| Before | After |',
  '|---|---|',
  '| Paper forms | One portal |',
  '| Weeks | Days |',
  '### How it shipped',
  '2021-03: Discovery',
  '2021-09: First release',
  '- 2022-01: Back office live',
  '### Results',
  'What changed after launch.',
  '- 2x | faster approvals | Ops dashboard | as of 2023-01',
  '## Media',
  `![Section: Screens | Web: Dashboard 2](${R2}/work/example/d2.png)`,
  `![Mystery shot](${R2}/work/example/x.png)`,
].join('\n');

test('v2: meta allowlist, presence links, accent and Results meta block', () => {
  const b = parse(V2);
  assert.deepEqual(b.meta.map((m) => m.key), ['Client', 'Year']);
  for (const m of b.meta) assert.ok(META_KEYS.includes(m.key), `${m.key} is allowlisted`);
  assert.deepEqual(b.links, {
    Live: { value: 'https://example.org/portal', text: 'https://example.org/portal', href: 'https://example.org/portal' },
    'App Store': { value: '[Example app](https://apps.example.com/app/1)', text: 'Example app', href: 'https://apps.example.com/app/1' },
    Awards: { value: 'Shortlist, Example Awards 2023', text: 'Shortlist, Example Awards 2023' },
  });
  assert.equal(b.accent, '#EA1828');
  assert.deepEqual(b.results, [
    { value: '42%', what: 'fewer support tickets', source: 'Internal helpdesk report, Jan to Jun 2026', asOf: '2026-07' },
    { value: '3', what: 'programmes on one portal' },
    { value: '2x', what: 'faster approvals', source: 'Ops dashboard', asOf: '2023-01' },
  ]);
  assert.match(b.cover?.url || '', /cover\.jpg$/);
});

test('v2: in-section media keeps body order; Layout hint, groups and points', () => {
  const b = parse(V2);
  const s = b.sections[0];
  assert.equal(s.title, 'Members apply in one guided flow');
  assert.equal(s.layoutHint, 'rail');
  assert.equal(s.lead, 'A member finds a programme and applies in five short sections.');
  assert.deepEqual(s.tiles.map((t) => [t.group, t.title]), [
    ['For members', 'Prefill first'], ['For members', 'Track it afterwards'], ['For members', 'Website'],
  ], 'a link that is not a media file stays a point');
  assert.deepEqual(s.media.map((m) => [m.kind, m.caption, m.video]), [
    ['screen', 'Member 1, Portal home', false], ['screen', 'Member 2, Application start', false], ['loop', undefined, true],
  ]);
});

test('v2: a media-only chapter survives; Section: prefix routes; styles go to styles', () => {
  const b = parse(V2);
  const screens = b.sections.find((s) => s.title === 'Screens');
  assert.ok(screens, 'media-only chapter is kept');
  assert.deepEqual(screens.media.map((m) => [m.kind, m.caption]), [['web', 'Dashboard 1'], ['web', 'Dashboard 2']]);
  assert.deepEqual(screens.styles.map((m) => m.kind), ['styles']);
  assert.deepEqual(b.closing.map((m) => [m.kind, m.caption]), [['figure', 'Mystery shot']], 'unknown label: figure, label as caption');
});

test('v2: quotes, tables, milestones and the Results chapter', () => {
  const b = parse(V2);
  const said = b.sections.find((s) => s.title === 'What members said');
  assert.ok(said);
  assert.deepEqual(said.quotes, [{ text: '"It took ten minutes instead of a morning."', by: 'Sample Person, Member, Example Org' }]);
  assert.deepEqual(said.tables, [{ head: ['Before', 'After'], rows: [['Paper forms', 'One portal'], ['Weeks', 'Days']] }]);
  assert.deepEqual(said.tiles, [], 'table rows never become tiles');
  const shipped = b.sections.find((s) => s.title === 'How it shipped');
  assert.ok(shipped);
  assert.deepEqual(shipped.milestones, [
    { date: '2021-03', text: 'Discovery' }, { date: '2021-09', text: 'First release' }, { date: '2022-01', text: 'Back office live' },
  ]);
  assert.deepEqual(shipped.tiles, [], 'milestones are detected before the titled-point heuristic');
  const results = b.sections.find((s) => s.title === 'Results');
  assert.ok(results);
  assert.equal(results.lead, 'What changed after launch.');
  assert.deepEqual(results.tiles, [], 'result lines leave the chapter');
});

test('synthetic: fewer than three dated lines stay ordinary text', () => {
  const b = parse(['### History', '2021: Founded', 'The team started small and grew over the following years.'].join('\n'));
  assert.deepEqual(b.sections[0].milestones, []);
  assert.equal(b.sections[0].tiles[0].title, '2021: Founded');
});

test('synthetic: several **Key:** pairs on one line', () => {
  const b = parse('**Industry:** Retail **Year:** 2024 **Live:** https://example.com\n### A\nText.');
  assert.deepEqual(b.meta.map((m) => [m.key, m.value]), [['Industry', 'Retail'], ['Year', '2024']]);
  assert.equal(b.links.Live?.href, 'https://example.com');
});

test('synthetic: a bad Accent value is ignored', () => {
  assert.equal(parse('**Accent:** red\n### A\nText.').accent, undefined);
  assert.equal(parse('**Accent:** 0af\n### A\nText.').accent, '#0af');
});

test('mediaKind: kinds from labels, video by extension, v1 slot labels', () => {
  assert.deepEqual(mediaKind('Hero'), { kind: 'cover' });
  assert.deepEqual(mediaKind('Flow: Checkout 3'), { kind: 'screen', caption: 'Checkout 3' });
  assert.deepEqual(mediaKind('Mood board'), { kind: 'styles' });
  assert.deepEqual(mediaKind('Mark: Monogram'), { kind: 'logo', caption: 'Monogram' });
  assert.deepEqual(mediaKind('Colour'), { kind: 'colour' });
  assert.deepEqual(mediaKind('Design Philosophy Image 2'), { kind: 'philosophy' });
  assert.deepEqual(mediaKind('DP'), { kind: 'philosophy' });
  assert.deepEqual(mediaKind('Filler Image'), { kind: 'conclusion' });
  assert.deepEqual(mediaKind('Thumbnail Video', 'https://x.test/a.mp4'), { kind: 'video' });
  assert.deepEqual(mediaKind('Loop: Intro', 'https://x.test/a.mp4'), { kind: 'loop', caption: 'Intro' });
  assert.deepEqual(mediaKind('Gallery'), { kind: 'figure' });
  assert.deepEqual(mediaKind(''), { kind: 'figure' });
  assert.deepEqual(mediaKind('Night shot of the store'), { kind: 'figure', caption: 'Night shot of the store' });
});

test('skill fixture (synthetic): examples/fixture-v1-thin-body.md', async () => {
  const { readFileSync } = await import('node:fs');
  const md = readFileSync(new URL('../../.claude/skills/wugweb-work/examples/fixture-v1-thin-body.md', import.meta.url), 'utf8');
  const b = parse(md);
  assert.deepEqual(titles(b), ['About', 'Challenges', 'Solutions']);
  assert.deepEqual(b.sections[1].tiles.map((t) => [t.title, t.text]), [
    ['Manual design', 'Brands designed labels by hand in generic tools.'],
    ['Slow printing', 'Orders took weeks to arrive and the program was hard.'],
  ]);
  const client = b.meta.find((m) => m.key === 'Client');
  assert.deepEqual(client?.links, [{ text: 'Labelly', href: 'http://labelly.io/' }]);
});

test('synthetic: a ## heading after a chapter is a chapter; before it, a title line', () => {
  const b = parse(['## Title line', '**Client:** Example', '### About', 'Intro text.', '\t---', '\t## **Solutions**', '1. **One**: First.'].join('\n'));
  assert.deepEqual(titles(b), ['About', 'Solutions']);
  assert.deepEqual(b.sections[0].paras, [], 'the --- rule is skipped');
  assert.deepEqual(b.meta.map((m) => m.key), ['Client']);
});
