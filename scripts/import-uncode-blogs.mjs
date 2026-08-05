#!/usr/bin/env node
/**
 * Import the 3 new Uncode blog posts (Video Commerce, 80/20 Gandhi,
 * Future of AI Search) into Sanity with VC-builder HTML → portable text,
 * covers, and categories.
 */
import fs from 'fs';
import { createClient } from '@sanity/client';

const env = fs.readFileSync('/Users/abcom/Documents/GitHub/wugweb_site/.env', 'utf8');
for (const line of env.split('\n')) {
  const m = line.match(/^([^#=]+)=(.*)$/);
  if (m) process.env[m[1].trim()] = m[2].trim();
}

const c = createClient({
  projectId: 'splvhmk1', dataset: 'production', apiVersion: '2024-01-01',
  token: process.env.SANITY_TOKEN, useCdn: false,
});

const data = JSON.parse(fs.readFileSync('/Users/abcom/Documents/GitHub/wugweb_site/notion-data/uncode-extract.json', 'utf8'));

const stripTags = (s) => (s || '')
  .replace(/<[^>]+>/g, ' ')
  .replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
  .replace(/&#8217;/g, "'").replace(/&#8216;/g, "'").replace(/&#8220;/g, '"').replace(/&#8221;/g, '"')
  .replace(/&#8211;/g, '–').replace(/&#8212;/g, '—').replace(/&nbsp;/g, ' ')
  .replace(/\s+/g, ' ').trim();

function vcHtmlToBlocks(html) {
  const blocks = [];
  let key = 0;
  // Headings
  for (const m of html.matchAll(/<h([1-6])[^>]*>([\s\S]*?)<\/h\1>/g)) {
    const text = stripTags(m[2]);
    if (text) blocks.push({ style: 'h2', text, pos: m.index });
  }
  // Lists
  for (const m of html.matchAll(/<(ul|ol)[^>]*>([\s\S]*?)<\/\1>/g)) {
    for (const li of m[2].matchAll(/<li[^>]*>([\s\S]*?)<\/li>/g)) {
      const text = stripTags(li[1]);
      if (text) blocks.push({ style: 'li', text, ordered: m[1] === 'ol', pos: m.index });
    }
  }
  // Blockquotes
  for (const m of html.matchAll(/<blockquote[^>]*>([\s\S]*?)<\/blockquote>/g)) {
    const text = stripTags(m[1]);
    if (text) blocks.push({ style: 'quote', text, pos: m.index });
  }
  // Paragraph text (strip tags, split on double newlines)
  const textOnly = html
    .replace(/<img[^>]*>/g, ' ')
    .replace(/<[^>]+>/g, '\n')
    .replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
    .replace(/&#8217;/g, "'").replace(/&#8220;/g, '"').replace(/&#8221;/g, '"')
    .replace(/&#8211;/g, '–').replace(/&#8212;/g, '—').replace(/&nbsp;/g, ' ')
    .split('\n').map((s) => s.replace(/\s+/g, ' ').trim()).filter((s) => s.length > 1);
  const headingTexts = new Set(blocks.filter((b) => b.style === 'h2').map((b) => b.text.toLowerCase()));
  for (const line of textOnly) {
    const lower = line.toLowerCase();
    if (headingTexts.has(lower)) continue;
    if (/^(home|about|services|works|blog|contact|menu|skip to content)$/i.test(line)) continue;
    if (line.length > 3) blocks.push({ style: 'p', text: line, pos: -1 });
  }
  // Sort by position in original HTML (headings/lists have pos; paragraphs pos -1 → keep order approx)
  const stripped = stripTags(html).toLowerCase();
  const withPos = blocks.filter((b) => b.pos >= 0);
  const paragraphs = blocks.filter((b) => b.pos < 0);
  const ordered = [...withPos].sort((a, b) => a.pos - b.pos);
  // interleave paragraphs: place each after the nearest preceding heading
  const out = [];
  let pi = 0;
  for (const b of ordered) {
    // flush paragraphs that appeared before this block's position
    out.push(b);
  }
  // Append remaining paragraphs at end (acceptable approximation)
  for (const p of paragraphs) {
    const lower = p.text.toLowerCase();
    if (headingTexts.has(lower)) continue;
    out.push(p);
  }
  return out.map((b) => {
    const style = b.style === 'h2' ? 'h2' : b.style === 'quote' ? 'blockquote' : 'normal';
    return {
      _type: 'block', _key: 'w' + key++,
      style,
      listItem: b.style === 'li' ? (b.ordered ? 'number' : 'bullet') : undefined,
      level: b.style === 'li' ? 1 : undefined,
      children: [{ _type: 'span', marks: [], text: b.text }],
      markDefs: [],
    };
  });
}

const TARGETS = {
  'how-is-video-commerce-a-powerful-tool-for-shopping': 'how-is-video-commerce-a-powerful-tool-for-shopping',
  'the-80-20-path-to-innovation-lessons-from-gandhi': 'the-80-20-path-to-innovation-lessons-from-gandhi',
  'the-future-of-ai-search-what-openai-s-research-tells-us': 'the-future-of-ai-search-what-openai-s-research-tells-us',
  'the-future-of-ai-search-what-openais-research-tells-us': 'the-future-of-ai-search-what-openais-research-tells-us',
};

async function main() {
  let created = 0;
  for (const p of data.posts) {
    if (p.type !== 'blog') continue;
    if (!TARGETS[p.slug]) continue;
    const slug = p.slug;
    const body = vcHtmlToBlocks(p.bodyHtml || '');
    const cover = p.media?.attachments?.[0]?.guid?.match(/wp-content\/uploads\/([0-9]+\/[0-9]+\/[^"']+\.(?:png|jpe?g|webp))/i);
    const coverPath = cover ? '/assets/uncode/blog/' + slug + '/att/' + cover[1].split('/').pop() : null;
    const doc = {
      _type: 'post',
      title: p.title,
      slug: { _type: 'slug', current: slug },
      publishedAt: p.date ? p.date.replace(' ', 'T') + 'Z' : null,
      excerpt: (p.excerpt || '').slice(0, 300),
      body,
      coverPath,
      category: p.categories?.[0] || 'UX Design',
      readingTime: Math.max(1, Math.round(((p.bodyHtml || '').replace(/<[^>]+>/g, ' ').length) / 900)),
      featured: false,
      owner: 'wugweb',
      seoTitle: p.title,
      seoDescription: (p.excerpt || '').slice(0, 160) || p.title,
    };
    try {
      await c.create(doc);
      created++;
      console.log(`created: ${slug} (${body.length} blocks, cover: ${coverPath || 'none'})`);
    } catch (e) {
      console.error(`FAIL ${slug}: ${e.message}`);
    }
  }
  console.log(`\nDONE created=${created}`);
}

main().catch((e) => { console.error(e); process.exit(1); });
