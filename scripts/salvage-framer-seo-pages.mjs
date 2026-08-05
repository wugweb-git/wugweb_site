#!/usr/bin/env node
/**
 * Salvage SEO (+ light hero) from newly captured Framer HTML into Sanity singletons / services.
 */
import { createClient } from '@sanity/client';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const REF = path.join(ROOT, 'reference');
const DRY = process.env.DRY_RUN === '1';

const token = process.env.SANITY_TOKEN || process.env.SANITY_API_TOKEN;
if (!token && !DRY) {
  console.error('Missing SANITY token');
  process.exit(1);
}

const client = token
  ? createClient({
      projectId: 'splvhmk1',
      dataset: 'production',
      apiVersion: '2024-01-01',
      token,
      useCdn: false,
    })
  : null;

const PAGES = [
  { html: 'Home — Wugweb.html', pageId: 'home', kind: 'singleton' },
  { html: 'FAQ — Wugweb.html', pageId: 'faq', kind: 'singleton' },
  { html: 'Work — Wugweb.html', pageId: 'work', kind: 'singleton' },
  { html: 'Blog — Wugweb.html', pageId: 'blog', kind: 'singleton' },
  { html: 'Industries — Wugweb.html', pageId: 'industries', kind: 'singleton' },
  { html: 'Subscription — Wugweb.html', pageId: 'subscription', kind: 'singleton' },
  {
    html: 'Lead Generation Services — Wugweb.html',
    slug: 'lead-generation',
    kind: 'service',
    pillar: 'growth',
  },
];

function meta(html, name) {
  const prop = html.match(new RegExp(`<meta[^>]+(?:property|name)=["']${name}["'][^>]+content=["']([^"']*)["']`, 'i'));
  if (prop) return prop[1];
  const prop2 = html.match(new RegExp(`<meta[^>]+content=["']([^"']*)["'][^>]+(?:property|name)=["']${name}["']`, 'i'));
  return prop2 ? prop2[1] : '';
}

function titleTag(html) {
  const m = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  return m ? m[1].replace(/<[^>]+>/g, '').trim() : '';
}

function decode(s) {
  return String(s || '')
    .replace(/&amp;/g, '&')
    .replace(/&nbsp;/g, ' ')
    .replace(/&#39;/g, "'")
    .trim();
}

async function upsert(doc) {
  if (DRY) {
    console.log('DRY', doc._id, doc.seoTitle || doc.title);
    return;
  }
  await client.createOrReplace(doc);
}

async function main() {
  const report = [];
  for (const p of PAGES) {
    const full = path.join(REF, p.html);
    if (!fs.existsSync(full)) {
      report.push({ ...p, ok: false, error: 'missing html' });
      continue;
    }
    const html = fs.readFileSync(full, 'utf8');
    const seoTitle = decode(titleTag(html) || meta(html, 'og:title'));
    const seoDescription = decode(meta(html, 'description') || meta(html, 'og:description'));

    if (p.kind === 'singleton') {
      const doc = {
        _id: p.pageId,
        _type: 'singletonPage',
        pageId: p.pageId,
        title: seoTitle.slice(0, 200) || p.pageId,
        seoTitle: seoTitle || undefined,
        seoDescription: seoDescription || undefined,
      };
      await upsert(doc);
      console.log(`📄 ${p.pageId}: ${seoTitle.slice(0, 60)}`);
      report.push({ pageId: p.pageId, seoTitle, seoDescription: seoDescription.slice(0, 120), ok: true });
    } else {
      const doc = {
        _id: `service-${p.slug}`,
        _type: 'service',
        title: seoTitle.replace(/\s*—\s*Wugweb.*$/i, '').trim() || 'Lead Generation',
        slug: { _type: 'slug', current: p.slug },
        seoTitle: seoTitle || undefined,
        seoDescription: seoDescription || undefined,
        fullDescription: seoDescription || undefined,
        summary: seoDescription?.slice(0, 200) || undefined,
        order: 7,
        language: 'en-GB',
      };
      await upsert(doc);
      console.log(`🛠  ${p.slug}: ${doc.title}`);
      report.push({ slug: p.slug, seoTitle, ok: true });
    }
  }

  fs.writeFileSync(
    path.join(ROOT, 'docs', 'framer-seo-salvage-report.json'),
    JSON.stringify({ generatedAt: new Date().toISOString(), report }, null, 2)
  );
  console.log('✅ docs/framer-seo-salvage-report.json');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
