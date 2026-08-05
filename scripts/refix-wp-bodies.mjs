#!/usr/bin/env node
/**
 * Re-import the 8 VC-builder WordPress posts that lost content on first
 * import. Uses an improved HTML→portable-text converter that handles
 * Uncode/VC builder markup (text inside divs/spans, data-preserver-spaces).
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

function stripTags(s) {
  return (s || '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
    .replace(/&#8217;/g, "'").replace(/&#8216;/g, "'").replace(/&#8220;/g, '"').replace(/&#8221;/g, '"')
    .replace(/&#8211;/g, '–').replace(/&#8212;/g, '—')
    .replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ').trim();
}

function guessHeading(html) {
  const m = html.match(/<(h[1-6])[^>]*>([\s\S]*?)<\/\1>/);
  return m ? stripTags(m[2]) : '';
}

/**
 * Convert VC-builder HTML to portable text.
 * Strategy: walk the DOM-ish structure via regex, extracting:
 *  - headings (h1-h6)
 *  - <ul>/<ol>/<li> lists
 *  - text inside divs/spans (data-preserver-spaces) — treat each
 *    text-bearing div as a paragraph
 *  - blockquotes
 * Then normalize into h2/normal/bullet blocks.
 */
function vcHtmlToBlocks(html) {
  const blocks = [];
  let key = 0;

  // 1. Headings (map to h2)
  for (const m of html.matchAll(/<h([1-6])[^>]*>([\s\S]*?)<\/h\1>/g)) {
    const text = stripTags(m[2]);
    if (text) blocks.push({ style: 'h2', text });
  }

  // 2. Lists
  for (const m of html.matchAll(/<(ul|ol)[^>]*>([\s\S]*?)<\/\1>/g)) {
    for (const li of m[2].matchAll(/<li[^>]*>([\s\S]*?)<\/li>/g)) {
      const text = stripTags(li[1]);
      if (text) blocks.push({ style: 'li', text, ordered: m[1] === 'ol' });
    }
  }

  // 3. Blockquotes
  for (const m of html.matchAll(/<blockquote[^>]*>([\s\S]*?)<\/blockquote>/g)) {
    const text = stripTags(m[1]);
    if (text) blocks.push({ style: 'quote', text });
  }

  // 4. Paragraph-like text: <p>, <div class="text-lead">, and
  //    divs containing data-preserver-spaces spans (the VC content spans)
  //    Collect all text nodes, then chunk by block boundaries.
  // Simpler robust approach: strip ALL tags, split on double-newlines.
  const textOnly = html
    .replace(/<img[^>]*>/g, ' [img] ')
    .replace(/<a[^>]*href="([^"]*)"[^>]*>([\s\S]*?)<\/a>/g, (_, href, inner) => `[${stripTags(inner)}](${href})`)
    .replace(/<[^>]+>/g, '\n')
    .replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
    .replace(/&#8217;/g, "'").replace(/&#8216;/g, "'").replace(/&#8220;/g, '"').replace(/&#8221;/g, '"')
    .replace(/&#8211;/g, '–').replace(/&#8212;/g, '—')
    .replace(/&nbsp;/g, ' ')
    .split('\n')
    .map(s => s.replace(/\s+/g, ' ').trim())
    .filter(Boolean);

  // Also handle [text](url) link markers
  const paras = [];
  let cur = '';
  for (const line of textOnly) {
    // merge consecutive short lines into one paragraph
    if (line.startsWith('[img]')) {
      if (cur) { paras.push(cur); cur = ''; }
      continue; // drop images from text body (media mapped separately)
    }
    if (line.match(/^\[.*\]\(https?:\/\/[^)]+\)$/)) {
      if (cur) { paras.push(cur); cur = ''; }
      paras.push(line);
      continue;
    }
    cur = cur ? cur + ' ' + line : line;
  }
  if (cur) paras.push(cur);

  // Filter out heading text that's already a block (avoid duplication)
  const headingTexts = new Set(blocks.filter(b => b.style === 'h2').map(b => b.text.toLowerCase()));
  for (const para of paras) {
    const lower = para.toLowerCase();
    // skip if it's exactly a heading
    if (headingTexts.has(lower)) continue;
    // skip nav/structural junk
    if (para.length < 2) continue;
    if (/^(home|about|services|works|blog|contact|let's talk|skip to content|menu)$/i.test(para)) continue;
    blocks.push({ style: 'p', text: para });
  }

  // Build portable text preserving order — headings first, then content
  // (VC layout is heading-then-content, so approximate order by scanning)
  // Reorder: do a single pass over the original HTML, emitting blocks in
  // document order is complex; acceptable approximation: headings in order
  // interleaved with paragraphs found after each heading.
  const out = [];
  const headingBlocks = blocks.filter(b => b.style === 'h2');
  const contentBlocks = blocks.filter(b => b.style !== 'h2');
  // interleave: for each heading, take following paragraphs until next heading
  // Simpler: alternate — heading, then paragraphs that appeared before next heading
  // We'll do a crude pass: push headings and paragraphs in the order they
  // were found in the ORIGINAL html by searching positions.
  const positions = [];
  const hRe = /<h[1-6][^>]*>([\s\S]*?)<\/h[1-6]>/g;
  let lastEnd = 0; let hMatch;
  const segs = [];
  while ((hMatch = hRe.exec(html)) !== null) {
    segs.push({ type: 'h', text: stripTags(hMatch[1]), pos: hMatch.index });
    lastEnd = hMatch.index + hMatch[0].length;
  }
  // paragraphs between headings
  // Rebuild in document order using the textOnly lines approach
  // — but we already have blocks; just order by searching each block's text
  // position in the stripped text.
  const stripped = stripTags(html).toLowerCase();
  const ordered = [...blocks].sort((a, b) => {
    const ia = stripped.indexOf(a.text.toLowerCase());
    const ib = stripped.indexOf(b.text.toLowerCase());
    return (ia === -1 ? 9999 : ia) - (ib === -1 ? 9999 : ib);
  });

  for (const b of ordered) {
    if (b.style === 'h2') {
      out.push({ _type: 'block', _key: 'w' + key++, style: 'h2', children: [{ _type: 'span', marks: [], text: b.text }], markDefs: [] });
    } else if (b.style === 'li') {
      out.push({ _type: 'block', _key: 'w' + key++, style: 'normal', listItem: b.ordered ? 'number' : 'bullet', level: 1, children: [{ _type: 'span', marks: [], text: b.text }], markDefs: [] });
    } else if (b.style === 'quote') {
      out.push({ _type: 'block', _key: 'w' + key++, style: 'blockquote', children: [{ _type: 'span', marks: [], text: b.text }], markDefs: [] });
    } else {
      out.push({ _type: 'block', _key: 'w' + key++, style: 'normal', children: [{ _type: 'span', marks: [], text: b.text }], markDefs: [] });
    }
  }
  return out;
}

// The 8 VC posts to re-import
const VC_SLUGS = [
  'top-10-design-tools-that-will-simplify-your-design-process',
  'the-incredible-power-of-zero-ui-technology',
  'use-this-easy-checklist-to-ensure-a-smooth-design-handoff',
  'a-guide-to-evaluating-design-projects',
  'stop-using-dribbble-behance-to-find-practical-design-inspiration',
  'how-visual-design-contributes-to-an-engaging-ux-2',
  'how-exactly-do-product-manager-and-ux-designer-collaborate',
  'is-the-ability-to-code-essential-to-succeed-as-a-designer',
];

async function main() {
  let updated = 0;
  for (const p of posts) {
    if (!VC_SLUGS.includes(p.slug)) continue;
    const body = vcHtmlToBlocks(p.bodyHtml || '');
    console.log(`${p.slug} -> ${body.length} blocks`);
    const doc = await c.fetch('*[_type=="post" && slug.current == $s][0]._id', { s: p.slug }).catch(() => null);
    if (!doc) { console.log(`  NOT FOUND, skip`); continue; }
    await c.patch(doc).set({ body, excerpt: (p.excerpt || '').slice(0, 300) }).commit();
    updated++;
  }
  console.log(`\nRe-imported ${updated} VC posts with full bodies`);
}

main().catch(e => { console.error(e); process.exit(1); });
