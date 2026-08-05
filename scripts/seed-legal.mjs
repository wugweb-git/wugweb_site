import { createClient } from '@sanity/client';
import fs from 'fs';

const env = fs.readFileSync('.env', 'utf8');
for (const line of env.split('\n')) {
  const m = line.match(/^([^#=]+)=(.*)$/);
  if (m) process.env[m[1].trim()] = m[2].trim();
}

const c = createClient({
  projectId: 'splvhmk1', dataset: 'production', apiVersion: '2024-01-01',
  token: process.env.SANITY_TOKEN, useCdn: false,
});

// Parse .astro legal pages: extract h2 + p + li content blocks in order
function parseLegal(file) {
  const html = fs.readFileSync(file, 'utf8');
  // strip the frontmatter (---...---)
  const body = html.replace(/^---[\s\S]*?---/, '');
  // Extract content between <section> tags
  const section = body.match(/<section class="wrap legal">([\s\S]*?)<\/section>/);
  const content = section ? section[1] : body;
  // Parse blocks: h2, p, ul>li
  const blocks = [];
  const h2re = /<h2[^>]*>([\s\S]*?)<\/h2>/g;
  const pre = /<p[^>]*>([\s\S]*?)<\/p>/g;
  const ulre = /<ul[^>]*>([\s\S]*?)<\/ul>/g;
  // walk sequentially
  const all = [];
  const h2Matches = [...content.matchAll(h2re)];
  const pMatches = [...content.matchAll(pre)];
  const ulMatches = [...content.matchAll(ulre)];
  h2Matches.forEach(m => all.push({ pos: m.index, type: 'h2', text: strip(m[1]) }));
  pMatches.forEach(m => all.push({ pos: m.index, type: 'p', text: strip(m[1]) }));
  ulMatches.forEach(m => {
    const items = [...m[1].matchAll(/<li[^>]*>([\s\S]*?)<\/li>/g)].map(x => strip(x[1]));
    all.push({ pos: m.index, type: 'ul', items });
  });
  all.sort((a, b) => a.pos - b.pos);
  return all;
}

function strip(s) {
  return s.replace(/<[^>]+>/g, '').replace(/&amp;/g, '&').replace(/&nbsp;/g, ' ').trim();
}

function toPortableText(blocks) {
  const out = [];
  for (const b of blocks) {
    if (b.type === 'h2') {
      out.push({ _type: 'block', style: 'h2', _key: 'k' + out.length, children: [{ _type: 'span', marks: [], text: b.text }], markDefs: [] });
    } else if (b.type === 'p') {
      out.push({ _type: 'block', style: 'normal', _key: 'k' + out.length, children: [{ _type: 'span', marks: [], text: b.text }], markDefs: [] });
    } else if (b.type === 'ul') {
      for (const item of b.items) {
        out.push({ _type: 'block', style: 'normal', _key: 'k' + out.length, listItem: 'bullet', level: 1, children: [{ _type: 'span', marks: [], text: item }], markDefs: [] });
      }
    }
  }
  return out;
}

const PAGES = {
  'privacy-policy': 'src/pages/privacy-policy.astro',
  'refund-policy': 'src/pages/refund-policy.astro',
  'terms-of-use': 'src/pages/termsofuse.astro',
};

for (const [pageId, file] of Object.entries(PAGES)) {
  const blocks = parseLegal(file);
  const pt = toPortableText(blocks);
  const docId = pageId;
  await c.patch(docId).set({ body: pt }).commit();
  console.log(`seeded ${pageId}: ${pt.length} portable text blocks`);
}
console.log('DONE');
