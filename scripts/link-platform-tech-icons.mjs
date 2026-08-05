#!/usr/bin/env node
/**
 * Link platform/tool icons from reference HTML (alt+src) to taxonomy.
 * Prefer existing public/assets; copy identified reference SVGs into
 * public/assets/tools|platforms only when missing.
 *
 * Usage:
 *   SANITY_API_TOKEN=... node scripts/link-platform-tech-icons.mjs
 */
import { createClient } from '@sanity/client';
import { createHash } from 'crypto';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const DRY_RUN = process.env.DRY_RUN === '1';
const R2_PUBLIC_BASE =
  process.env.PUBLIC_R2_ASSETS_BASE ||
  'https://pub-39ad1d03baec440faf48303be95c3782.r2.dev';

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

function resolveReferenceSrc(htmlFile, src) {
  if (!src.startsWith('./')) return null;
  const dir = path.dirname(path.join(ROOT, 'reference', htmlFile));
  const full = path.normalize(path.join(dir, src));
  return fs.existsSync(full) ? full : null;
}

/** Collect short SVG alt→file maps from reference HTML. */
function collectAltIcons() {
  const htmlFiles = fs.readdirSync(path.join(ROOT, 'reference')).filter((f) => f.endsWith('.html'));
  /** @type {Map<string, {alt:string, src:string, file:string, full:string}>} */
  const map = new Map();
  for (const hf of htmlFiles) {
    const html = fs.readFileSync(path.join(ROOT, 'reference', hf), 'utf8');
    for (const m of html.matchAll(/<img[^>]*>/gi)) {
      const tag = m[0];
      const alt = ((tag.match(/alt=["']([^"']*)["']/i) || [])[1] || '').trim();
      const src = ((tag.match(/src=["']([^"']*)["']/i) || [])[1] || '').trim();
      if (!alt || alt.length > 40 || !/\.svg$/i.test(src)) continue;
      const full = resolveReferenceSrc(hf, src);
      if (!full) continue;
      const key = alt.toLowerCase();
      if (!map.has(key)) map.set(key, { alt, src, file: hf, full });
    }
  }
  return map;
}

function findExistingLocal(slug) {
  const candidates = [
    `tools/${slug}.svg`,
    `tools/${slug}.png`,
    `platforms/${slug}.svg`,
    `platforms/${slug}.png`,
    `logos/${slug}.svg`,
    `logos/${slug}.png`,
  ];
  for (const rel of candidates) {
    const full = path.join(ROOT, 'public', 'assets', rel);
    if (fs.existsSync(full)) return rel;
  }
  return null;
}

async function main() {
  const altIcons = collectAltIcons();
  console.log(`Found ${altIcons.size} named SVG icons in reference HTML`);

  const terms = await client.fetch(
    `*[_type=="taxonomy" && vocabulary in ["tech-stack","platform"]]{_id, name, vocabulary, "slug": slug.current, iconPath}`
  );

  const manifest = { generatedAt: new Date().toISOString(), matched: [], missing: [] };
  fs.mkdirSync(path.join(ROOT, 'public', 'assets', 'tools'), { recursive: true });
  fs.mkdirSync(path.join(ROOT, 'public', 'assets', 'platforms'), { recursive: true });

  for (const term of terms) {
    const slug = term.slug || slugify(term.name);
    const folder = term.vocabulary === 'platform' ? 'platforms' : 'tools';

    let rel = findExistingLocal(slug);
    let source = rel ? 'existing-local' : null;

    if (!rel) {
      const hit =
        altIcons.get(term.name.toLowerCase()) ||
        altIcons.get(slug.replace(/-/g, ' ')) ||
        [...altIcons.values()].find((v) => slugify(v.alt) === slug);
      if (hit) {
        const destRel = `${folder}/${slug}.svg`;
        const dest = path.join(ROOT, 'public', 'assets', destRel);
        if (!DRY_RUN) {
          fs.copyFileSync(hit.full, dest);
        }
        rel = destRel;
        source = `reference:${hit.file}`;
      }
    }

    if (!rel) {
      manifest.missing.push({ name: term.name, vocabulary: term.vocabulary, slug });
      continue;
    }

    const sitePath = `/assets/${rel}`;
    const r2Key = `assets/${rel}`;
    const publicUrl = `${R2_PUBLIC_BASE.replace(/\/$/, '')}/${r2Key}`;
    const assetId = `asset-${slugify(rel)}`;

    if (!DRY_RUN) {
      const ext = path.extname(rel).slice(1);
      await client.createOrReplace({
        _id: assetId,
        _type: 'asset',
        name: `${term.name} icon`,
        slug: { _type: 'slug', current: slugify(rel) },
        displayName: `${term.name} icon`,
        assetType: 'Brand Asset',
        mediaType: ext === 'svg' ? 'SVG' : 'Image',
        mimeType: ext === 'svg' ? 'image/svg+xml' : `image/${ext}`,
        assetGroup: 'Brand',
        usage: 'Icon',
        status: 'Active',
        folder: path.dirname(rel),
        relativePath: rel,
        sitePath,
        r2Key,
        publicUrl,
        fileName: path.basename(rel),
        extension: ext,
        ownerType: 'Internal',
        localExists: true,
        r2Synced: false,
      });

      await client
        .patch(term._id)
        .set({
          iconPath: sitePath,
          linkedAsset: { _type: 'reference', _ref: assetId },
        })
        .commit();
    }

    manifest.matched.push({
      name: term.name,
      vocabulary: term.vocabulary,
      slug,
      iconPath: sitePath,
      source,
      sha256: createHash('sha256')
        .update(fs.readFileSync(path.join(ROOT, 'public', 'assets', rel)))
        .digest('hex'),
    });
    console.log(`  ✓ ${term.vocabulary}/${term.name} → ${sitePath}`);
  }

  fs.mkdirSync(path.join(ROOT, 'docs'), { recursive: true });
  fs.writeFileSync(
    path.join(ROOT, 'docs', 'platform-tech-icon-map.json'),
    JSON.stringify(manifest, null, 2)
  );
  console.log(`\nMatched ${manifest.matched.length}, missing ${manifest.missing.length}`);
  console.log('Wrote docs/platform-tech-icon-map.json');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
