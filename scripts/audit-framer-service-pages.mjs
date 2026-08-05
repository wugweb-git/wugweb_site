#!/usr/bin/env node
/**
 * Audit Framer service/about HTML under reference/ → docs/framer-service-audit.json
 * Also used as a library by extract-framer-service-pages.mjs
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const REF = path.join(ROOT, 'reference');

export const PAGE_MAP = [
  {
    slug: 'services',
    url: 'https://lucky-subtasks-379995.framer.app/services',
    html: 'Digital Experience Services — Wugweb.html',
    kind: 'services-index',
  },
  {
    slug: 'brand-strategy',
    url: 'https://lucky-subtasks-379995.framer.app/services/brand-strategy',
    html: 'Brand Strategy Services — Wugweb.html',
    kind: 'service',
    pillar: 'brand',
  },
  {
    slug: 'experience-design',
    url: 'https://lucky-subtasks-379995.framer.app/services/experience-design',
    html: 'Experience Design Services — Wugweb.html',
    kind: 'service',
    pillar: 'experience',
  },
  {
    slug: 'martech-genai',
    url: 'https://lucky-subtasks-379995.framer.app/services/martech-genai',
    html: 'Martech and GenAI Services — Wugweb.html',
    kind: 'service',
    pillar: 'growth',
  },
  {
    slug: 'web-app-development',
    url: 'https://lucky-subtasks-379995.framer.app/services/web-app-development',
    html: 'Web and App Development Services — Wugweb.html',
    kind: 'service',
    pillar: 'engineering',
  },
  {
    slug: 'qa-testing',
    url: 'https://lucky-subtasks-379995.framer.app/services/qa-testing',
    html: 'QA and Testing Services — Wugweb.html',
    kind: 'service',
    pillar: 'operations',
  },
  {
    slug: 'no-code-solutions',
    url: 'https://lucky-subtasks-379995.framer.app/services/no-code-solutions',
    html: 'No-Code Solutions — Wugweb.html',
    kind: 'service',
    pillar: 'engineering',
  },
  {
    slug: 'about',
    url: 'https://lucky-subtasks-379995.framer.app/about',
    html: 'About Wugweb — Wugweb.html',
    kind: 'about',
  },
];

export function plainText(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&nbsp;/g, ' ')
    .replace(/&#\d+;/g, ' ')
    .replace(/&quot;/g, '"')
    .replace(/\s+/g, ' ')
    .trim();
}

export function meta(html, name) {
  const re1 = new RegExp(`name=["']${name}["'][^>]*content=["']([^"']*)["']`, 'i');
  const re2 = new RegExp(`content=["']([^"']*)["'][^>]*name=["']${name}["']`, 'i');
  const re3 = new RegExp(`property=["']${name}["'][^>]*content=["']([^"']*)["']`, 'i');
  const re4 = new RegExp(`content=["']([^"']*)["'][^>]*property=["']${name}["']`, 'i');
  return (html.match(re1) || html.match(re2) || html.match(re3) || html.match(re4) || [])[1] || '';
}

export function titleTag(html) {
  return ((html.match(/<title[^>]*>([^<]*)/i) || [])[1] || '').replace(/&amp;/g, '&').trim();
}

export function collectNamedMedia(htmlFile, html) {
  const out = [];
  const filesDir = path.join(REF, htmlFile.replace(/\.html$/, '_files'));
  for (const m of html.matchAll(/<img[^>]*>/gi)) {
    const tag = m[0];
    const alt = ((tag.match(/alt=["']([^"']*)["']/i) || [])[1] || '').trim();
    const src = ((tag.match(/src=["']([^"']*)["']/i) || [])[1] || '').trim();
    if (!src || !alt || alt.length > 40) continue;
    let full = null;
    if (src.startsWith('./')) {
      full = path.normalize(path.join(path.dirname(path.join(REF, htmlFile)), src));
    } else if (fs.existsSync(path.join(filesDir, path.basename(src.split('?')[0])))) {
      full = path.join(filesDir, path.basename(src.split('?')[0]));
    }
    if (full && fs.existsSync(full)) {
      out.push({
        alt,
        src,
        full,
        ext: path.extname(full).toLowerCase(),
        relFromRef: path.relative(REF, full),
      });
    }
  }
  // dedupe by alt
  const seen = new Set();
  return out.filter((x) => {
    const k = x.alt.toLowerCase();
    if (seen.has(k)) return false;
    seen.add(k);
    return true;
  });
}

function decodeEntities(s) {
  return String(s || '')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, ' ');
}

function stripTags(s) {
  return decodeEntities(String(s || '').replace(/<[^>]+>/g, ' '))
    .replace(/\s+/g, ' ')
    .trim();
}

/** Locate Framer <h2> blocks by visible text (animation spans hide raw "Why us?"). */
export function findH2Sections(html) {
  const out = [];
  const re = /<h2\b[^>]*>([\s\S]*?)<\/h2>/gi;
  let m;
  while ((m = re.exec(html))) {
    const title = stripTags(m[1]);
    if (title) out.push({ title, start: m.index, end: m.index + m[0].length });
  }
  return out;
}

export function htmlBetweenH2(html, startTitle, endTitles) {
  const h2s = findH2Sections(html);
  const start = h2s.find((h) => h.title === startTitle || h.title.startsWith(startTitle));
  if (!start) return '';
  let end = html.length;
  for (const h of h2s) {
    if (h.start <= start.start) continue;
    if (endTitles.some((t) => h.title === t || h.title.startsWith(t)) && h.start < end) {
      end = h.start;
    }
  }
  return html.slice(start.end, end);
}

const NOISE_HEADINGS = new Set([
  '#',
  'CTA BUTTON',
  'icon label',
  'icon',
  'Learn More',
  'Get in Touch',
  'Contact Us',
]);

/**
 * Prefer structured Framer HTML (h6 title + following p body) over plain-text heuristics.
 */
export function parseWhyUsHtml(html) {
  const region =
    htmlBetweenH2(html, 'Why us?', [
      'Our Approach',
      'How we do it',
      'Our Design Toolkit',
      'Smart Tools',
      'Frequently asked questions',
      'What we can do',
    ]) ||
    htmlBetweenH2(html, 'Why Choose Wugweb', [
      'Our Approach',
      'Our QA',
      'What we can do',
      'The tools of the trade',
      'Frequently asked questions',
    ]);
  if (!region) return null;
  const blocks = [];
  const tagRe = /<(h[1-6]|p)\b[^>]*>([\s\S]*?)<\/\1>/gi;
  let m;
  while ((m = tagRe.exec(region))) {
    const text = stripTags(m[2]);
    if (!text || NOISE_HEADINGS.has(text)) continue;
    if (/^\d{2}$/.test(text) || text === '#') continue;
    blocks.push({ tag: m[1].toLowerCase(), text });
  }
  let intro = '';
  const items = [];
  for (let i = 0; i < blocks.length; i++) {
    const b = blocks[i];
    if (b.tag === 'p' && !intro && items.length === 0 && b.text.length > 40) {
      intro = b.text;
      continue;
    }
    if (/^h[1-6]$/.test(b.tag) && b.text.length >= 8 && b.text.length < 90) {
      const next = blocks[i + 1];
      const body = next && next.tag === 'p' && !/^\d{2}$/.test(next.text) ? next.text : '';
      if (body) i += 1;
      items.push({ title: b.text, body });
    }
  }
  if (!items.length) return null;
  return { intro, items };
}

const APPROACH_STOP_TITLES = new Set([
  'Frontend',
  'Mobile',
  'Backend',
  'Infrastructure',
  'Languages',
  'Database',
  'Delegating, Planning, and Tracking',
  "Wugweb's MarTech & GenAI Process",
  'Smart tools. Smarter marketing.',
  'The 9 Monumental Benefits of No Code Application Development',
  "Wugweb's Trusted No-Code Platform Stack",
  'Wugweb’s Trusted No-Code Platform Stack',
  'Website & Experience Platforms',
  'Application Development',
  'Low-Code Platforms',
  'Workflow & Automation',
  'Work That Leads with Clarity and Delivers with Impact',
  'Our Development Philosophy: Engineering Digital Transformation',
]);

export function parseApproachHtml(html) {
  const region =
    htmlBetweenH2(html, 'Our Approach', [
      'How we do it',
      'Our Design Toolkit',
      'Smart Tools',
      'Frequently asked questions',
      'Why us?',
      'The 9 Monumental Benefits',
      "Wugweb's Trusted No-Code",
      'Wugweb’s Trusted No-Code',
    ]) ||
    htmlBetweenH2(html, 'Our No-Code Development Methodology', [
      'Frequently asked questions',
      'Our Design Toolkit',
      'Why us?',
      'The 9 Monumental Benefits',
      "Wugweb's Trusted No-Code",
      'Wugweb’s Trusted No-Code',
    ]) ||
    htmlBetweenH2(html, 'Methodology:', [
      'Frequently asked questions',
      'The 9 Monumental Benefits',
      "Wugweb's Trusted No-Code",
      'Wugweb’s Trusted No-Code',
    ]) ||
    htmlBetweenH2(html, 'Our QA & Testing Philosophy', [
      'What we can do',
      'The tools of the trade',
      'Frequently asked questions',
    ]);
  if (!region) return null;
  const blocks = [];
  const tagRe = /<(h[1-6]|p)\b[^>]*>([\s\S]*?)<\/\1>/gi;
  let m;
  while ((m = tagRe.exec(region))) {
    const text = stripTags(m[2]);
    if (!text || NOISE_HEADINGS.has(text)) continue;
    if (text === '#') continue;
    blocks.push({ tag: m[1].toLowerCase(), text });
  }
  let intro = '';
  const steps = [];
  let n = 0;
  for (let i = 0; i < blocks.length; i++) {
    const b = blocks[i];
    if (/^\d{2}$/.test(b.text)) {
      // number marker before title
      continue;
    }
    if (APPROACH_STOP_TITLES.has(b.text) || /^Smart tools/i.test(b.text)) break;
    if (b.tag === 'p' && !intro && steps.length === 0 && b.text.length > 40) {
      intro = b.text;
      continue;
    }
    if (/^h[1-6]$/.test(b.tag) && b.text.length >= 6 && b.text.length < 100) {
      // Skip tool/platform names mistaken as approach headings
      if (/^(Webflow|Framer|Wix|Shopify|Bubble|FlutterFlow|Zapier|Softr)/i.test(b.text)) break;
      n += 1;
      const next = blocks[i + 1];
      const body = next && next.tag === 'p' && !/^\d{2}$/.test(next.text) ? next.text : '';
      if (body) i += 1;
      steps.push({ n: String(n).padStart(2, '0'), title: b.text, body });
      if (steps.length >= 8) break;
    }
  }

  // Process chips under "How we do it"
  const how = htmlBetweenH2(html, 'How we do it', [
    'Our Design Toolkit',
    'Smart Tools',
    'Frequently asked questions',
    'Our Approach',
  ]);
  const processFlat = [];
  if (how) {
    const known = [
      'Kick-off meeting',
      'Competitor analysis',
      'User interview',
      'Brain storming',
      'User journey',
      'Sitemap',
      'Wireframes & prototyping',
      'Usability testing',
      'Analysing results',
      'Look and feel drafts',
      'Design concept',
      'Final UI design',
      'Handover meeting',
    ];
    for (const k of known) {
      if (how.includes(k)) processFlat.push(k);
    }
  }

  if (!steps.length && !processFlat.length) return null;
  return { intro, steps, processFlat };
}

export function parseToolkitHtml(html) {
  const region =
    htmlBetweenH2(html, 'Our Design Toolkit', ['Frequently asked questions', 'Why us?', 'How we do it']) ||
    htmlBetweenH2(html, 'Smart Tools for Smarter Decisions', [
      'Frequently asked questions',
      'Why us?',
      'Our Approach',
    ]) ||
    htmlBetweenH2(html, 'Smart tools. Smarter marketing.', [
      'Frequently asked questions',
      'Why us?',
      'Our Approach',
    ]) ||
    htmlBetweenH2(html, 'The tools of the trade', ['Frequently asked questions', 'Why us?', 'What we can do']) ||
    htmlBetweenH2(html, 'Built With the Best', [
      'Frequently asked questions',
      'Why us?',
      'Our Approach',
      'Partner with',
    ]);
  if (!region) return null;
  const cats = [];
  // Pattern: tool name <p>s then category <h6>
  const parts = [];
  const tagRe = /<(h[1-6]|p)\b[^>]*>([\s\S]*?)<\/\1>/gi;
  let m;
  while ((m = tagRe.exec(region))) {
    const text = stripTags(m[2]);
    if (!text || NOISE_HEADINGS.has(text)) continue;
    parts.push({ tag: m[1].toLowerCase(), text });
  }
  let bucket = [];
  for (const p of parts) {
    if (/^h[1-6]$/.test(p.tag) && p.text.length < 48 && bucket.length) {
      cats.push({
        category: p.text,
        items: unique(
          bucket.filter(
            (w) =>
              w.length > 1 &&
              w.length < 28 &&
              !/^(Our|Design|Toolkit|Wugweb|From|full-stack|Redux)$/i.test(w)
          )
        ),
      });
      bucket = [];
      continue;
    }
    if (p.tag === 'p' && p.text.length < 28 && !/^[.#]/.test(p.text) && p.text.length > 1) {
      // skip long intro paragraphs
      if (p.text.split(/\s+/).length <= 3) bucket.push(p.text);
    }
  }
  // No-code: h6 may be missing; fall back to known names in region
  if (!cats.length) {
    const nocode = parseNoCodeTools(stripTags(region));
    if (nocode.categories.length) return nocode;
    return null;
  }
  return { intro: '', categories: cats.filter((c) => c.items.length) };
}

/** Parse Why us? cards: intro + numbered title/body pairs */
export function parseWhyUs(plain) {
  const markers = ['Why us?', 'Why Wugweb?', 'Why Wugweb'];
  let start = -1;
  let marker = '';
  for (const m of markers) {
    const i = plain.indexOf(m);
    if (i >= 0 && (start < 0 || i < start)) {
      start = i;
      marker = m;
    }
  }
  if (start < 0) return { intro: '', items: [] };
  const endMarkers = [
    'How we do it',
    'Our Approach',
    'Our Design Toolkit',
    'Design Toolkit',
    'Frequently asked',
    'What we can do',
    'Work That Leads',
    'CTA BUTTON',
  ];
  let end = plain.length;
  for (const e of endMarkers) {
    const i = plain.indexOf(e, start + marker.length);
    if (i > start && i < end) end = i;
  }
  const region = plain.slice(start + marker.length, end).trim();
  // Split on 01 02 03… patterns
  const parts = region.split(/\s(?=\d{2}\s+[A-Z])/);
  let intro = '';
  const items = [];
  for (const part of parts) {
    const m = part.match(/^(\d{2})\s+(.+)$/);
    if (!m) {
      if (!intro) intro = part.trim();
      continue;
    }
    const n = m[1];
    const rest = m[2].trim();
    // Title is roughly first sentence-ish capitalized chunk before body
    // Prefer: Title then body — title often Title Case until period or long lowercase run
    let title = rest;
    let body = '';
    const sent = rest.match(/^(.{8,80}?)([.!?])\s+(.+)$/);
    if (sent) {
      title = (sent[1] + sent[2]).trim();
      body = sent[3].trim();
    } else {
      // split after ~4-8 words of Title Case
      const words = rest.split(/\s+/);
      let cut = Math.min(6, words.length);
      for (let i = 2; i < Math.min(10, words.length); i++) {
        if (/^[a-z]/.test(words[i]) && words[i].length > 3) {
          cut = i;
          break;
        }
      }
      title = words.slice(0, cut).join(' ');
      body = words.slice(cut).join(' ');
    }
    items.push({ n, title: title.replace(/\.$/, ''), body });
  }
  // Also catch non-numbered title blocks after intro (services index style)
  if (items.length === 0 && intro) {
    const blocks = intro.split(/\s(?=[A-Z][a-z]+(?:\s[A-Z][a-z]+){1,4}\s)/).filter(Boolean);
    if (blocks.length >= 2) {
      const first = blocks.shift();
      for (const b of blocks.slice(0, 6)) {
        const words = b.trim().split(/\s+/);
        items.push({
          title: words.slice(0, 4).join(' '),
          body: words.slice(4).join(' '),
        });
      }
      intro = first;
    }
  }
  return { intro, items: items.filter((x) => x.title && x.title.length > 3) };
}

/** Known toolkit category labels as they appear after tool names in Framer plain text */
const TOOL_CATEGORIES = [
  'User Research & Testing',
  'Collaboration & Workflow',
  'Designing & Prototyping',
  'Organization & Productivity',
  'AI-Powered Design Tools',
  'Frontend',
  'Backend',
  'Infra',
  'Analytics',
  'Automation',
  'No-code',
  'No-Code',
];

export function parseToolkit(plain) {
  const starts = [
    'Our Design Toolkit',
    'Design Toolkit',
    'our tech stack enables',
    'Wugweb leverages a diverse toolkit',
    'Toolkit',
  ];
  let start = -1;
  for (const s of starts) {
    const i = plain.toLowerCase().indexOf(s.toLowerCase());
    if (i >= 0) {
      start = i;
      break;
    }
  }
  if (start < 0) {
    return parseNoCodeTools(plain);
  }
  let end = plain.length;
  for (const e of ['Frequently asked', 'FAQ', 'Related', 'Work That Leads', 'Contact us', 'Why us?']) {
    const i = plain.indexOf(e, start + 20);
    if (i > start && i < end) end = i;
  }
  let region = plain.slice(start, end);
  const after =
    region.match(/experiences\.\s+(.+)$/i) ||
    region.match(/business\.\s+(.+)$/i) ||
    region.match(/technologies[^.]*\.\s+(.+)$/i) ||
    region.match(/enables[\s\S]{0,80}?that evolve with your business\.\s+(.+)$/i);
  if (after) region = after[1];

  const extraCats = ['Frontend', 'Mobile', 'Backend', 'Infra', 'Cloud', 'DevOps'];
  const allCats = [...TOOL_CATEGORIES, ...extraCats];

  const cats = [];
  let remaining = region;
  const orderedCats = [];
  for (const cat of allCats) {
    const idx = remaining.indexOf(` ${cat} `) >= 0 ? remaining.indexOf(` ${cat} `) : remaining.indexOf(cat);
    // Prefer category as trailing label: tools then Category
    const re = new RegExp(`(?:^|\\s)${cat.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}(?:\\s|$)`);
    const m = remaining.match(re);
    if (m && m.index != null) orderedCats.push({ cat, idx: m.index });
  }
  orderedCats.sort((a, b) => a.idx - b.idx);

  if (orderedCats.length === 0) {
    return parseNoCodeTools(plain);
  }

  let prev = 0;
  for (let i = 0; i < orderedCats.length; i++) {
    const { cat, idx } = orderedCats[i];
    const chunk = remaining.slice(prev, idx).trim();
    const items = chunk
      .split(/\s+/)
      .map((w) => w.replace(/[^A-Za-z0-9./_+-]/g, ''))
      .filter(
        (w) =>
          w.length > 1 &&
          w.length < 28 &&
          !/^(Our|Design|Toolkit|Wugweb|leverages|a|diverse|of|industry|leading|technologies|like|and|to|craft|exceptional|user|experiences|From|full-stack|development|CMS|integration|tech|stack|enables|scalable|web|applications|performance-driven|apps|that|evolve|with|your|business|Redux)$/i.test(
            w
          )
      );
    // Include Redux etc - remove Redux from stop list... actually Redux is a tool. Fix stop list.
    if (items.length) cats.push({ category: cat, items: unique(items) });
    prev = idx + cat.length;
  }
  return { intro: '', categories: cats };
}

function parseNoCodeTools(plain) {
  const names = ['Webflow', 'Framer', 'Wix', 'Shopify', 'Appsheet', 'Wordpress', 'WordPress', 'Bubble', 'FlutterFlow'];
  const items = [];
  for (const n of names) {
    if (plain.includes(n)) items.push(n === 'Wordpress' ? 'WordPress' : n);
  }
  return {
    intro: '',
    categories: items.length ? [{ category: 'No-code platforms', items: unique(items) }] : [],
  };
}

function unique(arr) {
  const s = new Set();
  const out = [];
  for (const x of arr) {
    const k = x.toLowerCase();
    if (s.has(k)) continue;
    s.add(k);
    out.push(x);
  }
  return out;
}

export function parseApproach(plain) {
  const markers = ['How we do it', 'Our Approach', 'Methodology:', 'Our No-Code Development Methodology'];
  let start = -1;
  let marker = '';
  for (const m of markers) {
    const i = plain.indexOf(m);
    if (i >= 0 && (start < 0 || i < start)) {
      start = i;
      marker = m;
    }
  }
  if (start < 0) return { intro: '', steps: [], processFlat: [] };
  let end = plain.length;
  for (const e of ['Our Design Toolkit', 'Design Toolkit', 'Frequently asked', 'Why us?', 'What we can do']) {
    const i = plain.indexOf(e, start + marker.length);
    if (i > start && i < end) end = i;
  }
  const region = plain.slice(start + marker.length, end).trim();

  // Numbered methodology (no-code): 01 Title body 02 Title body
  const numbered = [];
  const parts = region.split(/\s(?=\d{2}\s+[A-Z])/);
  let intro = '';
  for (const part of parts) {
    const m = part.match(/^(\d{2})\s+(.+)$/);
    if (!m) {
      if (!intro) intro = part.trim();
      continue;
    }
    const rest = m[2].trim();
    const words = rest.split(/\s+/);
    let cut = Math.min(5, words.length);
    for (let i = 2; i < Math.min(8, words.length); i++) {
      if (/^[a-z]/.test(words[i]) && words[i].length > 2) {
        cut = i;
        break;
      }
    }
    numbered.push({
      n: m[1],
      title: words.slice(0, cut).join(' '),
      body: words.slice(cut).join(' '),
    });
  }

  // Flat process chips (experience "How we do it"): list of short phrases
  const processFlat = [];
  if (numbered.length === 0) {
    const chipRegion = region.replace(/^The process model[\s\S]*?:/, '').trim();
    // Known chips from experience page
    const known = [
      'Kick-off meeting',
      'Competitor analysis',
      'User interview',
      'Brain storming',
      'User journey',
      'Sitemap',
      'Wireframes & prototyping',
      'Usability testing',
      'Analysing results',
      'Look and feel drafts',
      'Design concept',
      'Final UI design',
      'Handover meeting',
    ];
    for (const k of known) {
      if (region.includes(k)) processFlat.push(k);
    }
    intro = chipRegion.slice(0, 280);
  }

  // # Title style approach cards
  const hashSteps = [];
  for (const m of region.matchAll(/#\s+([A-Z][^#]{10,120}?)(?=\s#|\s*$)/g)) {
    const text = m[1].trim();
    const words = text.split(/\s+/);
    hashSteps.push({
      title: words.slice(0, 5).join(' '),
      body: words.slice(5).join(' '),
    });
  }

  return {
    intro,
    steps: numbered.length ? numbered : hashSteps.slice(0, 8),
    processFlat,
  };
}

export function parseSeo(html) {
  return {
    title: titleTag(html),
    description: meta(html, 'description'),
    ogTitle: meta(html, 'og:title'),
    ogDescription: meta(html, 'og:description'),
  };
}

export function auditPage(entry) {
  const htmlPath = path.join(REF, entry.html);
  if (!fs.existsSync(htmlPath)) {
    return { ...entry, error: 'missing_html', gaps: ['html file missing'] };
  }
  const html = fs.readFileSync(htmlPath, 'utf8');
  const plain = plainText(html);
  const seo = parseSeo(html);
  const why = parseWhyUsHtml(html) || parseWhyUs(plain);
  const toolkit = parseToolkitHtml(html) || parseToolkit(plain);
  const approach = parseApproachHtml(html) || parseApproach(plain);
  const media = collectNamedMedia(entry.html, html);
  const gaps = [];
  if (!why.items.length && !why.intro) gaps.push('why_us_empty');
  if (!toolkit.categories.length) gaps.push('toolkit_empty');
  if (!approach.steps.length && !approach.processFlat.length) gaps.push('approach_empty');
  if (!seo.description) gaps.push('seo_description_missing');

  return {
    ...entry,
    seo,
    why,
    toolkit,
    approach,
    namedMedia: media.map((m) => ({
      alt: m.alt,
      ext: m.ext,
      relFromRef: m.relFromRef,
    })),
    namedMediaCount: media.length,
    plainLength: plain.length,
    gaps,
  };
}

function main() {
  const pages = PAGE_MAP.map(auditPage);
  const report = {
    generatedAt: new Date().toISOString(),
    source: 'reference/*.html',
    pages,
    summary: {
      pageCount: pages.length,
      withWhy: pages.filter((p) => p.why?.items?.length).length,
      withToolkit: pages.filter((p) => p.toolkit?.categories?.length).length,
      withApproach: pages.filter((p) => p.approach?.steps?.length || p.approach?.processFlat?.length).length,
      namedMediaTotal: pages.reduce((s, p) => s + (p.namedMediaCount || 0), 0),
    },
  };
  fs.mkdirSync(path.join(ROOT, 'docs'), { recursive: true });
  fs.writeFileSync(path.join(ROOT, 'docs', 'framer-service-audit.json'), JSON.stringify(report, null, 2));
  console.log(JSON.stringify(report.summary, null, 2));
  for (const p of pages) {
    console.log(
      `- ${p.slug}: why=${p.why?.items?.length || 0} tools=${p.toolkit?.categories?.reduce((s, c) => s + c.items.length, 0) || 0} approach=${p.approach?.steps?.length || 0} chips=${p.approach?.processFlat?.length || 0} media=${p.namedMediaCount || 0} gaps=${(p.gaps || []).join(',') || 'none'}`
    );
  }
}

const isMain = process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (isMain) main();
