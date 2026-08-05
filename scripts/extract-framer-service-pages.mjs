#!/usr/bin/env node
/**
 * Extract Framer service/about audit → Sanity services + tech-stack + local tool icons.
 *
 * Usage:
 *   SANITY_API_TOKEN=... node scripts/extract-framer-service-pages.mjs
 *   DRY_RUN=1 node scripts/extract-framer-service-pages.mjs
 *   SKIP_R2=1 node scripts/extract-framer-service-pages.mjs
 */
import { createClient } from '@sanity/client';
import { createHash } from 'crypto';
import fs from 'fs';
import path from 'path';
import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import {
  PAGE_MAP,
  auditPage,
  plainText,
  collectNamedMedia,
} from './audit-framer-service-pages.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const DRY_RUN = process.env.DRY_RUN === '1';
const SKIP_R2 = process.env.SKIP_R2 === '1';
const R2_PUBLIC_BASE =
  process.env.PUBLIC_R2_ASSETS_BASE ||
  'https://pub-39ad1d03baec440faf48303be95c3782.r2.dev';
const BUCKET = process.env.R2_BUCKET || 'wugweb-assets';

const token = process.env.SANITY_TOKEN || process.env.SANITY_API_TOKEN;
if (!token) {
  console.error('Missing SANITY_TOKEN / SANITY_API_TOKEN');
  process.exit(1);
}

const client = createClient({
  projectId: 'splvhmk1',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token,
  useCdn: false,
});

function slugify(s) {
  return String(s || '')
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80);
}

function run(cmd, args) {
  return new Promise((resolve, reject) => {
    const child = spawn(cmd, args, { cwd: ROOT, stdio: ['ignore', 'pipe', 'pipe'] });
    let stdout = '';
    let stderr = '';
    child.stdout.on('data', (d) => (stdout += d));
    child.stderr.on('data', (d) => (stderr += d));
    child.on('close', (code) => {
      if (code === 0) resolve({ stdout, stderr });
      else reject(new Error(`${cmd} ${args.join(' ')}\n${stderr || stdout}`));
    });
  });
}

async function upsert(doc) {
  if (DRY_RUN) return true;
  try {
    await client.createOrReplace(doc);
    return true;
  } catch (e) {
    console.error(`  ❌ ${doc._id}: ${e.message.slice(0, 140)}`);
    return false;
  }
}

function processFromChips(chips) {
  if (!chips?.length) return undefined;
  // Experience page known phase grouping
  const phases = [
    { phase: 'Discovery', steps: ['Kick-off meeting', 'Competitor analysis', 'User interview', 'Brain storming'] },
    { phase: 'Ideation', steps: ['User journey', 'Sitemap', 'Wireframes & prototyping', 'Usability testing'] },
    { phase: 'Prototyping & Testing', steps: ['Analysing results', 'Look and feel drafts', 'Design concept', 'Final UI design'] },
    { phase: 'UI Design', steps: ['Final UI design', 'Handover meeting'] },
  ];
  const found = phases
    .map((p) => ({
      phase: p.phase,
      steps: p.steps.filter((s) => chips.includes(s)),
    }))
    .filter((p) => p.steps.length);
  return found.length ? found : [{ phase: 'Process', steps: chips }];
}

function parseAboutValues(plain) {
  const items = [];
  const re = /0(\d)\s+(Bold|Adaptive|Distinct|Start Smart, Start Small)\s+([^.]+(?:\.[^0]|[^0])*?)(?=\s+icon label|\s+0\d\s+|$)/gi;
  // simpler split
  const marks = ['Bold', 'Adaptive', 'Distinct', 'Start Smart, Start Small'];
  for (const title of marks) {
    const i = plain.indexOf(title);
    if (i < 0) continue;
    const after = plain.slice(i + title.length).trim();
    const body = after.split(/\s+icon label|\s+Culture |\s+We Create|\s+Booking /)[0].trim().slice(0, 200);
    items.push({ title, body });
  }
  // dedupe
  const seen = new Set();
  return items.filter((x) => {
    if (seen.has(x.title)) return false;
    seen.add(x.title);
    return true;
  });
}

async function ensureToolAsset(name, sourceFull) {
  const slug = slugify(name);
  const rel = `tools/${slug}${path.extname(sourceFull) || '.svg'}`;
  const dest = path.join(ROOT, 'public', 'assets', rel);
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  if (!fs.existsSync(dest) && sourceFull && fs.existsSync(sourceFull)) {
    if (!DRY_RUN) fs.copyFileSync(sourceFull, dest);
  }
  if (!fs.existsSync(dest) && DRY_RUN) return null;
  if (!fs.existsSync(dest)) return null;

  const sitePath = `/assets/${rel}`;
  const r2Key = `assets/${rel}`;
  const assetId = `asset-${slugify(rel)}`;
  const ext = path.extname(rel).slice(1);
  await upsert({
    _id: assetId,
    _type: 'asset',
    name: `${name} icon`,
    slug: { _type: 'slug', current: slugify(rel) },
    displayName: `${name} icon`,
    assetType: 'Brand Asset',
    mediaType: ext === 'svg' ? 'SVG' : 'Image',
    mimeType: ext === 'svg' ? 'image/svg+xml' : `image/${ext}`,
    assetGroup: 'Brand',
    usage: 'Icon',
    status: 'Active',
    folder: 'tools',
    relativePath: rel,
    sitePath,
    r2Key,
    publicUrl: `${R2_PUBLIC_BASE.replace(/\/$/, '')}/${r2Key}`,
    fileName: path.basename(rel),
    extension: ext,
    ownerType: 'Internal',
    localExists: true,
    r2Synced: false,
  });

  const techId = `tech-${slug}`;
  await upsert({
    _id: techId,
    _type: 'taxonomy',
    name,
    slug: { _type: 'slug', current: slug },
    vocabulary: 'tech-stack',
    status: 'Active',
    iconPath: sitePath,
    linkedAsset: { _type: 'reference', _ref: assetId },
  });

  return { sitePath, rel, assetId, techId, bytes: fs.statSync(dest).size };
}

async function main() {
  console.log(`🚀 Extract Framer services${DRY_RUN ? ' (DRY RUN)' : ''}\n`);
  const audits = PAGE_MAP.map(auditPage);
  const report = {
    generatedAt: new Date().toISOString(),
    services: [],
    toolsCopied: [],
    about: null,
    r2Uploaded: [],
  };

  // Build alt → full path map across all pages for tool icons
  const iconByAlt = new Map();
  for (const entry of PAGE_MAP) {
    const htmlPath = path.join(ROOT, 'reference', entry.html);
    if (!fs.existsSync(htmlPath)) continue;
    const html = fs.readFileSync(htmlPath, 'utf8');
    for (const m of collectNamedMedia(entry.html, html)) {
      if (/\.svg$/i.test(m.ext) || /\.png$/i.test(m.ext)) {
        iconByAlt.set(m.alt.toLowerCase(), m);
      }
    }
  }

  for (const page of audits) {
    if (page.error) {
      console.log(`⏭  ${page.slug}: ${page.error}`);
      continue;
    }

    if (page.kind === 'about') {
      const html = fs.readFileSync(path.join(ROOT, 'reference', page.html), 'utf8');
      const plain = plainText(html);
      const values = parseAboutValues(plain);
      const hero =
        plain.match(/About Us\s+(.+?)\s+Years of experience/i)?.[1]?.trim() ||
        page.seo?.description ||
        '';
      const doc = {
        _id: 'about',
        _type: 'singletonPage',
        pageId: 'about',
        title: hero.slice(0, 200) || page.seo?.title || 'About',
        seoTitle: page.seo?.title || undefined,
        seoDescription: page.seo?.description || undefined,
        subtitle: values.map((v) => v.title).join(' · ') || undefined,
      };
      // Store why-like values in body as portable? Keep simple — patch known fields only
      console.log(`📄 about SEO + title (${values.length} values)`);
      await upsert(doc);
      report.about = { seo: page.seo, values, hero: hero.slice(0, 160) };
      continue;
    }

    if (page.kind === 'services-index') {
      // Patch services singleton if exists
      const why = (page.why?.items || []).map((w) => ({
        title: w.title,
        body: w.body || page.why.intro || '',
      }));
      await upsert({
        _id: 'services',
        _type: 'singletonPage',
        pageId: 'services',
        title: page.seo?.title || 'Services',
        seoTitle: page.seo?.title || undefined,
        seoDescription: page.seo?.description || undefined,
        subtitle: page.why?.intro?.slice(0, 180) || undefined,
      });
      console.log(`📄 services index SEO (why cards ${why.length} — stored on singleton subtitle)`);
      report.services.push({ slug: 'services', seo: page.seo, whyCount: why.length });
      continue;
    }

    // Service page
    const why = (page.why?.items || []).map((w) => ({
      title: w.title,
      body: w.body || '',
    }));
    const tools = page.toolkit?.categories || [];
    const approach = (page.approach?.steps || []).map((s, i) => ({
      n: s.n || String(i + 1).padStart(2, '0'),
      title: s.title,
      body: s.body || '',
    }));
    const process = processFromChips(page.approach?.processFlat);

    // Copy tool icons for named tools
    for (const cat of tools) {
      for (const tool of cat.items) {
        const hit =
          iconByAlt.get(tool.toLowerCase()) ||
          iconByAlt.get(tool.toLowerCase().replace(/\./g, '')) ||
          (tool === 'WordPress' ? iconByAlt.get('wordpress') : null);
        if (hit) {
          const copied = await ensureToolAsset(tool, hit.full);
          if (copied) report.toolsCopied.push({ tool, ...copied, from: hit.relFromRef });
        } else {
          // Still upsert tech term without icon
          await upsert({
            _id: `tech-${slugify(tool)}`,
            _type: 'taxonomy',
            name: tool,
            slug: { _type: 'slug', current: slugify(tool) },
            vocabulary: 'tech-stack',
            category: cat.category,
            status: 'Active',
          });
        }
      }
    }

    const serviceId = `service-${page.slug}`;
    const html = fs.readFileSync(path.join(ROOT, 'reference', page.html), 'utf8');
    const plain = plainText(html);
    // Hero: first H1-ish — use seo title cleaned
    const title =
      page.seo?.title?.replace(/\s*—\s*Wugweb.*$/i, '').trim() ||
      page.seo?.ogTitle?.replace(/\s*—\s*Wugweb.*$/i, '').trim() ||
      page.slug;
    const heroMatch = plain.match(
      new RegExp(`${title.split(/[&]/)[0].trim()}[\\s\\S]{0,40}?([A-Z][^.]{20,160}\\.)`)
    );

    const doc = {
      _id: serviceId,
      _type: 'service',
      title: title.replace(/\s+Services$/i, '').trim() || title,
      slug: { _type: 'slug', current: page.slug },
      subtitle: heroMatch?.[1]?.trim()?.slice(0, 120) || undefined,
      heroText: page.why?.intro || undefined,
      fullDescription: page.seo?.description || undefined,
      summary: page.seo?.description?.slice(0, 200) || undefined,
      seoTitle: page.seo?.title || undefined,
      seoDescription: page.seo?.description || undefined,
      why: why.length ? why : undefined,
      tools: tools.length ? tools : undefined,
      approach: approach.length ? approach : undefined,
      process: process || undefined,
      order:
        {
          'brand-strategy': 1,
          'experience-design': 2,
          'martech-genai': 3,
          'web-app-development': 4,
          'qa-testing': 5,
          'no-code-solutions': 6,
        }[page.slug] || 10,
      language: 'en-GB',
    };

    // Remove undefined keys
    for (const k of Object.keys(doc)) {
      if (doc[k] === undefined) delete doc[k];
    }

    console.log(
      `🛠  ${page.slug}: why=${why.length} tools=${tools.reduce((s, c) => s + c.items.length, 0)} approach=${approach.length}`
    );
    await upsert(doc);

    // Also patch pillar service if mapping exists (enrich without replacing id)
    if (page.pillar && (why.length || tools.length || approach.length)) {
      const pillarPatch = {};
      if (why.length) pillarPatch.why = why;
      // Prefer richer toolkit (more categories) when multiple Framer pages map to one pillar
      if (tools.length) pillarPatch.tools = tools;
      if (approach.length && approach.length <= 8) pillarPatch.approach = approach;
      if (process) pillarPatch.process = process;
      if (page.seo?.description) {
        pillarPatch.seoDescription = page.seo.description;
        pillarPatch.seoTitle = page.seo.title;
      }
      if (!DRY_RUN && Object.keys(pillarPatch).length) {
        try {
          const existing = await client.getDocument(page.pillar).catch(() => null);
          if (existing?.tools?.length > (tools?.length || 0) && pillarPatch.tools) {
            delete pillarPatch.tools; // keep richer existing toolkit
          }
          if (existing?.approach?.length >= 3 && (approach?.length || 0) < 3) {
            delete pillarPatch.approach;
          }
          // no-code should not overwrite engineering approach/tools from web-app
          if (page.slug === 'no-code-solutions' && page.pillar === 'engineering') {
            delete pillarPatch.tools;
            delete pillarPatch.approach;
            delete pillarPatch.why;
            delete pillarPatch.process;
          }
          // web-app Framer "Why us" reuses brand bento copy — keep pillar why from hardcoded/frontend
          if (page.slug === 'web-app-development' && page.pillar === 'engineering') {
            delete pillarPatch.why;
          }
          if (Object.keys(pillarPatch).length) {
            await client.patch(page.pillar).set(pillarPatch).commit();
            console.log(`   ↳ enriched pillar ${page.pillar}`);
          }
        } catch (e) {
          console.warn(`   ↳ pillar patch skip: ${e.message.slice(0, 80)}`);
        }
      }
    }

    report.services.push({
      slug: page.slug,
      serviceId,
      pillar: page.pillar,
      why: why.length,
      tools: tools.reduce((s, c) => s + c.items.length, 0),
      approach: approach.length,
      seo: page.seo,
      gaps: page.gaps,
    });
  }

  // R2 delta for new tool icons
  if (!SKIP_R2 && !DRY_RUN && report.toolsCopied.length && (process.env.CLOUDFLARE_API_TOKEN || process.env.CLOUDFLARE_API_KEY)) {
    console.log(`\n☁️  Uploading ${report.toolsCopied.length} tool icons to R2 (missing-only)...`);
    for (const t of report.toolsCopied) {
      const file = path.join(ROOT, 'public', 'assets', t.rel);
      const key = `assets/${t.rel}`;
      try {
        await run('npx', [
          'wrangler',
          'r2',
          'object',
          'put',
          `${BUCKET}/${key}`,
          '--file',
          file,
          '--content-type',
          path.extname(file) === '.svg' ? 'image/svg+xml' : 'image/png',
          '--remote',
        ]);
        await client.patch(t.assetId).set({ r2Synced: true }).commit().catch(() => {});
        report.r2Uploaded.push(key);
      } catch (e) {
        console.warn(`  R2 fail ${key}: ${e.message.split('\n')[0]}`);
      }
    }
  }

  fs.writeFileSync(path.join(ROOT, 'docs', 'framer-service-extract-report.json'), JSON.stringify(report, null, 2));
  console.log('\n✅ Wrote docs/framer-service-extract-report.json');
  console.log(
    JSON.stringify(
      {
        services: report.services.length,
        toolsCopied: report.toolsCopied.length,
        r2Uploaded: report.r2Uploaded.length,
        about: !!report.about,
      },
      null,
      2
    )
  );
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
