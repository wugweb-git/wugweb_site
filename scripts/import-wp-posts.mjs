#!/usr/bin/env node
/**
 * Import WordPress blog posts (from extract) into Sanity as `post` docs.
 * - Body HTML → portable text (h2/h3 → h2, p → normal, ul/ol → bullet/number,
 *   img → imagePath note (stored as text marker in body), links → link marks)
 * - coverPath set from the media map
 * - Category inferred from post date/content
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

const posts = JSON.parse(fs.readFileSync('/Users/abcom/Documents/GitHub/wugweb_site/notion-data/wp-posts-extract.json', 'utf8'));

// HTML → portable text
function htmlToBlocks(html) {
  const blocks = [];
  let key = 0;
  // Split by headings / paragraphs / lists
  const re = /<(h[1-6]|p|ul|ol|blockquote)[^>]*>([\s\S]*?)<\/\1>/g;
  let m;
  while ((m = re.exec(html)) !== null) {
    const tag = m[1];
    let inner = m[2];
    if (tag === 'ul' || tag === 'ol') {
      const items = [...inner.matchAll(/<li[^>]*>([\s\S]*?)<\/li>/g)].map(x => x[1]);
      for (const it of items) {
        const text = stripTags(it);
        if (!text.trim()) continue;
        blocks.push({
          _type: 'block', _key: 'w' + key++,
          style: 'normal', listItem: tag === 'ol' ? 'number' : 'bullet', level: 1,
          children: [{ _type: 'span', marks: [], text: text.trim() }], markDefs: [],
        });
      }
      continue;
    }
    // images inside paragraphs → skip (stored separately via media map)
    inner = inner.replace(/<img[^>]*>/g, '');
    // links → extract href
    const links = [...inner.matchAll(/<a[^>]*href="([^"]*)"[^>]*>([\s\S]*?)<\/a>/g)];
    let text = stripTags(inner).trim();
    if (!text) continue;
    const children = [];
    let lastIdx = 0;
    const sorted = links.sort((a, b) => a.index - b.index);
    for (const l of sorted) {
      const before = stripTags(inner.slice(lastIdx, l.index));
      if (before.trim()) children.push({ _type: 'span', marks: [], text: before.trim() });
      children.push({ _type: 'span', marks: ['link'], text: stripTags(l[2]).trim() });
      lastIdx = l.index + l[0].length;
    }
    const after = stripTags(inner.slice(lastIdx));
    if (after.trim()) children.push({ _type: 'span', marks: [], text: after.trim() });
    const style = tag === 'h1' || tag === 'h2' || tag === 'h3' ? 'h2' : 'normal';
    const markDefs = children.some(ch => ch.marks.includes('link'))
      ? [{ _key: 'link', _type: 'link', href: links[0]?.[1] || '' }]
      : [];
    // rewrite marks to reference the def key
    const finalChildren = children.map(ch => ({
      ...ch,
      marks: ch.marks.includes('link') ? ['link'] : [],
    }));
    blocks.push({
      _type: 'block', _key: 'w' + key++,
      style, children: finalChildren, markDefs,
    });
  }
  return blocks;
}

function stripTags(s) {
  return (s || '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
    .replace(/&#8217;/g, "'").replace(/&#8216;/g, "'").replace(/&#8220;/g, '"').replace(/&#8221;/g, '"')
    .replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ').trim();
}

function slugify(s) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

// Category guess from title
function guessCategory(title) {
  const t = title.toLowerCase();
  if (t.includes('design tool') || t.includes('figma') || t.includes('adobe')) return 'Tools';
  if (t.includes('ux') || t.includes('user experience') || t.includes('design')) return 'UX Design';
  if (t.includes('brand')) return 'Brand & Strategy';
  if (t.includes('ai') || t.includes('chatbot')) return 'AI & Automation';
  if (t.includes('seo') || t.includes('sitemap')) return 'SEO';
  return 'Design';
}

async function main() {
  let created = 0, skipped = 0, failed = 0;
  const existing = await c.fetch('*[_type=="post"]{"slug": slug.current}');
  const have = new Set(existing.map(r => r.slug));

  for (const p of posts) {
    const slug = p.slug && p.slug !== 'auto-draft' ? p.slug : slugify(p.title);
    if (!slug || have.has(slug)) { skipped++; console.log(`skip (exists): ${slug}`); continue; }

    const body = htmlToBlocks(p.bodyHtml || '');
    const doc = {
      _type: 'post',
      title: p.title,
      slug: { _type: 'slug', current: slug },
      publishedAt: p.date || null,
      excerpt: (p.excerpt || '').slice(0, 300),
      body,
      coverPath: p.cover || null,
      category: guessCategory(p.title),
      readingTime: Math.max(1, Math.round(((p.bodyHtml || '').replace(/<[^>]+>/g, ' ').length) / 900)),
      featured: false,
      // owner set per governance (agency default)
      owner: 'wugweb',
      seoTitle: p.title,
      seoDescription: (p.excerpt || '').slice(0, 160) || p.title,
    };
    // link media images stored in post body? Store mediaPaths array (schema may not have it; use tags for now)
    try {
      await c.create(doc);
      created++;
      console.log(`created: ${slug}`);
    } catch (e) {
      failed++;
      console.error(`FAIL ${slug}: ${e.message}`);
    }
  }
  console.log(`\nDONE created=${created} skipped=${skipped} failed=${failed}`);
}

main().catch(e => { console.error(e); process.exit(1); });
