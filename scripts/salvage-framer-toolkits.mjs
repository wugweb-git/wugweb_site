#!/usr/bin/env node
/**
 * Salvage Framer toolkit/platform cards from reference HTML.
 *
 * Framer often ships icons with alt="" and the tool name in a sibling <h6>/<p>.
 * Prior extract only used named alts → missed most icons.
 *
 * Usage:
 *   SANITY_API_TOKEN=… node scripts/salvage-framer-toolkits.mjs
 *   DRY_RUN=1 node scripts/salvage-framer-toolkits.mjs
 *   SKIP_R2=1 node scripts/salvage-framer-toolkits.mjs
 */
import { createClient } from '@sanity/client';
import fs from 'fs';
import path from 'path';
import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import { PAGE_MAP } from './audit-framer-service-pages.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const REF = path.join(ROOT, 'reference');
const DRY_RUN = process.env.DRY_RUN === '1';
const SKIP_R2 = process.env.SKIP_R2 === '1';
const R2_PUBLIC_BASE =
  process.env.PUBLIC_R2_ASSETS_BASE ||
  'https://pub-39ad1d03baec440faf48303be95c3782.r2.dev';
const BUCKET = process.env.R2_BUCKET || 'wugweb-assets';

const token = process.env.SANITY_TOKEN || process.env.SANITY_API_TOKEN;
if (!token && !DRY_RUN) {
  console.error('Missing SANITY_TOKEN / SANITY_API_TOKEN');
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

/** Known category → tools (from Framer screenshots + HTML). Order matters. */
const TOOLKIT_BLUEPRINTS = {
  'no-code-solutions': [
    {
      category: 'Website & Experience Platforms',
      items: ['Webflow', 'Framer', 'Wix', 'Shopify', 'Appsheet', 'WordPress'],
    },
    {
      category: 'Application Development',
      items: ['Bubble', 'FlutterFlow', 'Bildr', 'Adalo', 'Softr.io', 'Xano'],
    },
    {
      category: 'Low-Code Platforms',
      items: ['Appian', 'Outsystems', 'Mendix', 'Creatio', 'UIPath', 'Mulesoft'],
    },
    {
      category: 'Workflow & Automation',
      // Reference HTML has Datadog + Cloudwatch (not Airtable/Cloudways from newer live)
      items: ['Zapier', 'Make', 'Coda', 'Datadog', 'n8n', 'Cloudwatch'],
    },
  ],
  'experience-design': [
    {
      category: 'User Research & Testing',
      items: ['Maze', 'Dovetail', 'Lyssna', 'Remesh', 'UserZoom', 'UserLytics', 'Reflect', 'Trymata'],
    },
    {
      category: 'Collaboration & Workflow',
      items: ['Notion', 'Zeroheight', 'Supernova', 'UiInspector', 'Keep'],
    },
    {
      category: 'Designing & Prototyping',
      items: ['Plasmic', 'Sketch', 'Figma', 'Vercel', 'RIVE', 'Webflow', 'penpot', 'Framer', 'Canva'],
    },
    {
      category: 'Organization & Productivity',
      items: ['Mem', 'Opal', 'ValidatorAI', 'Perplexity', 'Obsidian', 'Any.do', 'BeeDone', 'Tavus'],
    },
    {
      category: 'AI-Powered Design Tools',
      items: [
        'Uizard',
        'Lummi',
        'GalileoAI',
        'Stockimg.ai',
        'Khroma',
        'Midjourney',
        'OpenArt',
        'Jitter',
        'Illustroke',
      ],
    },
  ],
  // Shared Framer "tech stack" block reused on brand / martech / web / qa
  'web-app-development': [
    { category: 'Frontend', items: ['Redux', 'Next.js', 'React', 'Vue.js'] },
    { category: 'Mobile', items: ['React', 'Kotlin', 'Swift'] },
    { category: 'Languages', items: ['Javascript', 'ES6', 'Typescript', 'C#'] },
    {
      category: 'Backend',
      items: ['PHP', 'GraphQL', 'Laravel', 'Nest.js', 'Asp.Net', 'Swagger', 'Node.js', 'RestAPI'],
    },
    { category: 'Database', items: ['MongoDB', 'Postgres', 'SQL'] },
    {
      category: 'Infrastructure',
      items: ['DigitalOcean', 'Serverless', 'AWS', 'Bitbucket', 'Heroku', 'Azure', 'GitHub'],
    },
  ],
};

// Alias shared stack onto sibling Framer pages
for (const slug of ['brand-strategy', 'martech-genai', 'qa-testing']) {
  TOOLKIT_BLUEPRINTS[slug] = TOOLKIT_BLUEPRINTS['web-app-development'];
}

/** Full no-code page copy (user-provided + HTML), kept out of fragile parsers. */
const NO_CODE_CONTENT = {
  title: 'No-Code Solutions',
  subtitle: 'No code app development helps teams move faster and build smarter.',
  heroText:
    'No code app development helps teams move faster and build smarter. With no code development platforms, businesses create and scale digital products quickly, involving both technical and non-technical teams. It powers innovation, shortens time to market, and gives you a competitive edge.',
  seoTitle: 'No-Code Solutions — Wugweb',
  seoDescription:
    'Launch scalable no-code websites, workflows, and digital systems with Wugweb’s strategy, design, and implementation expertise.',
  approach: [
    {
      n: '01',
      title: 'Strategic Assessment',
      body: 'We evaluate your business needs to define high-impact no code app development use cases. This involves: requirements gathering and analysis, no code development platform selection, and integration and feasibility planning.',
    },
    {
      n: '02',
      title: 'Rapid Prototyping & Development',
      body: 'Using visual app builders and workflow automation tools, we rapidly prototype and iterate. This encompasses: visual development with drag and drop app builder platforms, iterative feedback and refinement, and API and integrations.',
    },
    {
      n: '03',
      title: 'Deployment & Optimization',
      body: 'We launch, track, and refine to ensure your no code web development delivers lasting value. This includes: launch strategy and execution, performance monitoring and analytics, and continuous improvement and support.',
    },
  ],
  why: [
    {
      title: 'Brand-First Digital Experiences',
      body: 'No code development puts marketers and creators in control. Bring brand strategy, design, and audience insights into the product without waiting on developers.',
    },
    {
      title: 'Smaller Teams, Bigger Results',
      body: 'Low code no code app development reduces the need for large technical teams. Build more with fewer resources while staying fast and focused.',
    },
    {
      title: 'Launch with Unmatched Speed',
      body: 'With drag and drop app builder platforms, products go live faster. Move from idea to execution with incredible agility.',
    },
    {
      title: 'Rapid Product-Market Fit',
      body: 'Iterate quickly and improve based on real user input. No code MVP development helps find the right solution sooner.',
    },
    {
      title: 'Reliable and Secure Foundations',
      body: 'Top no code development platforms offer strong security, uptime, and stability out of the box. You build on a foundation that protects your business.',
    },
    {
      title: 'Higher ROI with Lower Costs',
      body: 'Eliminate dependency on traditional developers. Free up your team to focus on strategy, growth, and outcomes.',
    },
    {
      title: 'SEO That Performs',
      body: 'No code website builder tools ensure faster load times, mobile optimization, and structured data. Your brand gets discovered and stays visible.',
    },
    {
      title: 'Code That Works Without Writing It',
      body: 'Custom app builders without code solutions generate clean, functional systems that work every time. No manual errors. No tech debt.',
    },
    {
      title: 'Innovation Without Limits',
      body: 'The no code tools for SaaS product development ecosystem grows daily. Stay ahead by integrating new features and improvements without rebuilding from scratch.',
    },
  ],
};

const JUNK_TECH_IDS = ['tech-with-your-business'];

function slugify(s) {
  return String(s || '')
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80);
}

function stripTags(s) {
  return String(s || '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&nbsp;/g, ' ')
    .replace(/&quot;/g, '"')
    .replace(/\s+/g, ' ')
    .trim();
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
  if (DRY_RUN || !client) return true;
  try {
    await client.createOrReplace(doc);
    return true;
  } catch (e) {
    console.error(`  ❌ ${doc._id}: ${e.message.slice(0, 140)}`);
    return false;
  }
}

/** White-BG card pattern (no-code stack): img + h6 title */
function extractWhiteBgCards(html) {
  const out = [];
  const re =
    /data-framer-name="White BG"[\s\S]{0,2500}?<img[^>]+src=["']([^"']+)["'][\s\S]{0,1200}?<h6[^>]*>([\s\S]*?)<\/h6>/gi;
  let m;
  while ((m = re.exec(html))) {
    const title = stripTags(m[2]);
    if (title && title.length < 40) out.push({ name: title, src: m[1] });
  }
  return dedupeByName(out);
}

/**
 * Experience-style toolkit: tool name in <p>Tool</p>, icon is nearest preceding <img>.
 */
function extractNamedToolsWithNearestImg(html, names) {
  const out = [];
  for (const name of names) {
    const esc = name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const m =
      html.match(new RegExp(`<(?:p|h6)\\b[^>]*>\\s*${esc}\\s*</(?:p|h6)>`, 'i')) ||
      null;
    let idx = -1;
    if (m) {
      idx = html.search(new RegExp(`<(?:p|h6)\\b[^>]*>\\s*${esc}\\s*</(?:p|h6)>`, 'i'));
    } else {
      idx = html.indexOf(`>${name}<`);
    }
    if (idx < 0) continue;
    const window = html.slice(Math.max(0, idx - 2000), idx);
    const imgs = [...window.matchAll(/<img[^>]+src=["']([^"']+)["']/gi)];
    const src = imgs.length ? imgs[imgs.length - 1][1] : null;
    out.push({ name, src });
  }
  return out;
}

function dedupeByName(items) {
  const seen = new Set();
  const out = [];
  for (const it of items) {
    const k = normalizeToolName(it.name).toLowerCase();
    if (!k || seen.has(k)) continue;
    seen.add(k);
    out.push({ ...it, name: normalizeToolName(it.name) });
  }
  return out;
}

function normalizeToolName(name) {
  const n = String(name || '').trim();
  if (/^wordpress$/i.test(n)) return 'WordPress';
  if (/^uipath$/i.test(n)) return 'UIPath';
  if (/^mulesoft$/i.test(n)) return 'Mulesoft';
  if (/^outsystems$/i.test(n)) return 'Outsystems';
  return n;
}

function resolveLocal(htmlFile, src) {
  if (!src) return null;
  const clean = src.split('?')[0];
  if (clean.startsWith('./')) {
    const full = path.normalize(path.join(REF, path.dirname(htmlFile), clean));
    return fs.existsSync(full) ? full : null;
  }
  const base = path.basename(clean);
  const filesDir = path.join(REF, htmlFile.replace(/\.html$/i, '_files'));
  const full = path.join(filesDir, base);
  return fs.existsSync(full) ? full : null;
}

async function ensureToolAsset(name, sourceFull) {
  const slug = slugify(name);
  const ext = sourceFull ? path.extname(sourceFull).toLowerCase() || '.svg' : '.svg';
  const rel = `tools/${slug}${ext}`;
  const dest = path.join(ROOT, 'public', 'assets', rel);
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  if (sourceFull && fs.existsSync(sourceFull) && !DRY_RUN) {
    fs.copyFileSync(sourceFull, dest);
  }
  if (!fs.existsSync(dest) && !DRY_RUN) return null;
  if (DRY_RUN && !fs.existsSync(dest) && !sourceFull) return null;

  const sitePath = `/assets/${rel}`;
  const r2Key = `assets/${rel}`;
  const assetId = `asset-${slugify(rel)}`;
  const mime =
    ext === '.svg'
      ? 'image/svg+xml'
      : ext === '.png'
        ? 'image/png'
        : ext === '.webp'
          ? 'image/webp'
          : ext === '.jpg' || ext === '.jpeg'
            ? 'image/jpeg'
            : `image/${ext.slice(1)}`;

  await upsert({
    _id: assetId,
    _type: 'asset',
    name: `${name} icon`,
    slug: { _type: 'slug', current: slugify(rel) },
    displayName: `${name} icon`,
    assetType: 'Brand Asset',
    mediaType: ext === '.svg' ? 'SVG' : 'Image',
    mimeType: mime,
    assetGroup: 'Brand',
    usage: 'Icon',
    status: 'Active',
    folder: 'tools',
    relativePath: rel,
    sitePath,
    r2Key,
    publicUrl: `${R2_PUBLIC_BASE.replace(/\/$/, '')}/${r2Key}`,
    fileName: path.basename(rel),
    extension: ext.slice(1),
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

  return {
    name,
    sitePath,
    rel,
    assetId,
    techId,
    bytes: fs.existsSync(dest) ? fs.statSync(dest).size : 0,
    from: sourceFull ? path.relative(REF, sourceFull) : null,
  };
}

function buildToolsWithIcons(blueprint, iconByName) {
  return blueprint.map((cat) => ({
    category: cat.category,
    items: cat.items.map((name) => normalizeToolName(name)),
  }));
}

async function main() {
  console.log(`🔧 Salvage Framer toolkits${DRY_RUN ? ' (DRY RUN)' : ''}\n`);
  const report = {
    generatedAt: new Date().toISOString(),
    pages: {},
    toolsCopied: [],
    junkRemoved: [],
    r2Uploaded: [],
  };

  // --- Collect icons from no-code + experience (and any white-bg pages) ---
  const iconByName = new Map();

  for (const entry of PAGE_MAP.filter((p) => p.kind === 'service')) {
    const htmlPath = path.join(REF, entry.html);
    if (!fs.existsSync(htmlPath)) continue;
    const html = fs.readFileSync(htmlPath, 'utf8');

    let cards = [];
    const blueprint = TOOLKIT_BLUEPRINTS[entry.slug];
    if (blueprint) {
      const names = blueprint.flatMap((c) => c.items);
      const white = extractWhiteBgCards(html);
      const near = extractNamedToolsWithNearestImg(html, names);
      const by = new Map();
      for (const c of white) {
        const k = normalizeToolName(c.name).toLowerCase();
        if (names.some((n) => normalizeToolName(n).toLowerCase() === k)) by.set(k, c);
      }
      for (const n of near) {
        const k = normalizeToolName(n.name).toLowerCase();
        if (!by.has(k) || (!by.get(k).src && n.src)) {
          by.set(k, { name: normalizeToolName(n.name), src: n.src });
        }
      }
      for (const name of names) {
        const k = normalizeToolName(name).toLowerCase();
        if (!by.has(k)) by.set(k, { name: normalizeToolName(name), src: null });
      }
      cards = [...by.values()];
    } else {
      // Other service pages: only White BG cards that look like tools (short title + svg/png)
      cards = extractWhiteBgCards(html).filter((c) => c.src && /\.(svg|png|webp|jpe?g)(\?|$)/i.test(c.src));
    }

    report.pages[entry.slug] = {
      cardsFound: cards.length,
      withSrc: cards.filter((c) => c.src).length,
      names: cards.map((c) => c.name),
    };

    for (const card of cards) {
      const full = resolveLocal(entry.html, card.src);
      const key = card.name.toLowerCase();
      if (full && !iconByName.has(key)) {
        iconByName.set(key, { name: card.name, full, fromPage: entry.slug });
      }
    }
  }

  // Upsert tech terms that have no icon yet (blueprint coverage)
  const allBlueprintNames = Object.values(TOOLKIT_BLUEPRINTS).flatMap((b) =>
    b.flatMap((c) => c.items.map(normalizeToolName))
  );
  for (const name of allBlueprintNames) {
    if (iconByName.has(name.toLowerCase())) continue;
    await upsert({
      _id: `tech-${slugify(name)}`,
      _type: 'taxonomy',
      name,
      slug: { _type: 'slug', current: slugify(name) },
      vocabulary: 'tech-stack',
      status: 'Active',
    });
  }

  console.log(`🖼  Unique tool icons resolved: ${iconByName.size}`);

  // Copy + upsert assets / tech-stack
  for (const { name, full } of iconByName.values()) {
    const copied = await ensureToolAsset(name, full);
    if (copied) {
      report.toolsCopied.push(copied);
      console.log(`  ✓ ${name} → ${copied.sitePath}`);
    }
  }

  // Remove junk tech terms from prior extract
  if (client && !DRY_RUN) {
    for (const id of JUNK_TECH_IDS) {
      try {
        await client.delete(id);
        report.junkRemoved.push(id);
        console.log(`  🗑  removed ${id}`);
      } catch {
        /* ok */
      }
    }
    // Also delete by mangled name if id differs
    const junk = await client.fetch(
      `*[_type=="taxonomy" && vocabulary=="tech-stack" && name match "with your business*"]._id`
    );
    for (const id of junk || []) {
      try {
        await client.delete(id);
        report.junkRemoved.push(id);
      } catch {
        /* ok */
      }
    }
  }

  // Upsert service docs with full toolkits
  for (const [slug, blueprint] of Object.entries(TOOLKIT_BLUEPRINTS)) {
    const tools = buildToolsWithIcons(blueprint, iconByName);
    const serviceId = `service-${slug}`;
    const page = PAGE_MAP.find((p) => p.slug === slug);

    if (slug === 'no-code-solutions') {
      await upsert({
        _id: serviceId,
        _type: 'service',
        title: NO_CODE_CONTENT.title,
        subtitle: NO_CODE_CONTENT.subtitle,
        heroText: NO_CODE_CONTENT.heroText,
        seoTitle: NO_CODE_CONTENT.seoTitle,
        seoDescription: NO_CODE_CONTENT.seoDescription,
        fullDescription: NO_CODE_CONTENT.heroText,
        summary: NO_CODE_CONTENT.seoDescription,
        why: NO_CODE_CONTENT.why,
        approach: NO_CODE_CONTENT.approach,
        tools,
        order: 6,
        language: 'en-GB',
        slug: { _type: 'slug', current: slug },
      });
      console.log(
        `🛠  ${slug}: tools=${tools.reduce((s, c) => s + c.items.length, 0)} why=${NO_CODE_CONTENT.why.length} approach=${NO_CODE_CONTENT.approach.length}`
      );
    } else {
      const existing = client && !DRY_RUN ? await client.getDocument(serviceId).catch(() => null) : null;
      const { _rev, ...rest } = existing || {};
      await upsert({
        ...rest,
        _id: serviceId,
        _type: 'service',
        title: existing?.title || slug,
        slug: { _type: 'slug', current: slug },
        tools,
        order: existing?.order || 10,
        language: 'en-GB',
      });
      console.log(`🛠  ${slug}: tools=${tools.reduce((s, c) => s + c.items.length, 0)} categories`);
    }

    // Enrich pillars carefully
    if (page?.pillar && client && !DRY_RUN) {
      try {
        if (slug === 'experience-design') {
          await client.patch(page.pillar).set({ tools }).commit();
          console.log(`   ↳ pillar ${page.pillar} tools updated`);
        } else if (slug === 'web-app-development' && page.pillar === 'engineering') {
          await client.patch(page.pillar).set({ tools }).commit();
          console.log(`   ↳ pillar ${page.pillar} tools updated`);
        } else if (slug === 'brand-strategy' && page.pillar === 'brand') {
          await client.patch(page.pillar).set({ tools }).commit();
          console.log(`   ↳ pillar ${page.pillar} tools updated`);
        } else if (slug === 'martech-genai' && page.pillar === 'growth') {
          await client.patch(page.pillar).set({ tools }).commit();
          console.log(`   ↳ pillar ${page.pillar} tools updated`);
        } else if (slug === 'qa-testing' && page.pillar === 'operations') {
          await client.patch(page.pillar).set({ tools }).commit();
          console.log(`   ↳ pillar ${page.pillar} tools updated`);
        }
        // no-code: do not overwrite engineering toolkit
      } catch (e) {
        console.warn(`   ↳ pillar skip: ${e.message.slice(0, 80)}`);
      }
    }

    report.pages[slug] = {
      ...(report.pages[slug] || {}),
      toolsCategories: tools.map((c) => ({ category: c.category, count: c.items.length })),
    };
  }

  // Also harvest white-bg / nearest icons for other service pages into tech-stack only
  // (category blueprints for brand/martech/web/qa can stay parser-driven on next pass)

  // R2 delta
  if (!SKIP_R2 && !DRY_RUN && report.toolsCopied.length && (process.env.CLOUDFLARE_API_TOKEN || process.env.CLOUDFLARE_API_KEY)) {
    console.log(`\n☁️  R2 missing-only for ${report.toolsCopied.length} icons...`);
    for (const t of report.toolsCopied) {
      const file = path.join(ROOT, 'public', 'assets', t.rel);
      if (!fs.existsSync(file)) continue;
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
        // object may already exist — still mark synced if get works
        console.warn(`  R2 ${key}: ${e.message.split('\n')[0].slice(0, 100)}`);
      }
    }
  }

  fs.mkdirSync(path.join(ROOT, 'docs'), { recursive: true });
  fs.writeFileSync(path.join(ROOT, 'docs', 'framer-toolkit-salvage-report.json'), JSON.stringify(report, null, 2));
  console.log('\n✅ Wrote docs/framer-toolkit-salvage-report.json');
  console.log(
    JSON.stringify(
      {
        iconsCopied: report.toolsCopied.length,
        junkRemoved: report.junkRemoved.length,
        r2Uploaded: report.r2Uploaded.length,
        noCodeTools: TOOLKIT_BLUEPRINTS['no-code-solutions'].reduce((s, c) => s + c.items.length, 0),
        experienceTools: TOOLKIT_BLUEPRINTS['experience-design'].reduce((s, c) => s + c.items.length, 0),
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
