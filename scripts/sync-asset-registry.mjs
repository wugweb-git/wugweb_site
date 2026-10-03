#!/usr/bin/env node
/**
 * Sync Sanity asset registry for every file under public/assets,
 * then upload only keys missing from R2.
 *
 * Path map:
 *   public/assets/<rel> ↔ /assets/<rel> ↔ R2 assets/<rel>
 *
 * Usage:
 *   SANITY_API_TOKEN=... node scripts/sync-asset-registry.mjs
 *   SKIP_R2=1 node scripts/sync-asset-registry.mjs
 *   DRY_RUN=1 node scripts/sync-asset-registry.mjs
 */
import { createClient } from '@sanity/client';
import { spawn } from 'child_process';
import { createHash } from 'crypto';
import { createReadStream, promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { splitAssetFields } from './lib/asset-fields.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const LOCAL_ROOT = path.join(ROOT, 'public', 'assets');
const DRY_RUN = process.env.DRY_RUN === '1';
const SKIP_R2 = process.env.SKIP_R2 === '1';
const BUCKET = process.env.R2_BUCKET || 'wugweb-assets';
const R2_PUBLIC_BASE =
  process.env.PUBLIC_R2_ASSETS_BASE ||
  'https://pub-39ad1d03baec440faf48303be95c3782.r2.dev';
const CONCURRENCY = Number(process.env.R2_UPLOAD_CONCURRENCY || 4);

const FREE_STORAGE_BYTES = 10 * 1024 ** 3;
const SOFT_STORAGE_CEILING = 9.5 * 1024 ** 3;
const SOFT_CLASS_A_CEILING = 100_000;

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

const MIME = {
  '.mp4': 'video/mp4',
  '.webm': 'video/webm',
  '.mov': 'video/quicktime',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.json': 'application/json',
  '.pdf': 'application/pdf',
  '.mp3': 'audio/mpeg',
  '.wav': 'audio/wav',
};

function slugify(s) {
  return String(s || '')
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 96) || 'asset';
}

async function walk(dir) {
  const out = [];
  const entries = await fs.readdir(dir, { withFileTypes: true });
  for (const ent of entries) {
    const full = path.join(dir, ent.name);
    if (ent.isDirectory()) out.push(...(await walk(full)));
    else if (ent.isFile() && !ent.name.startsWith('.')) out.push(full);
  }
  return out;
}

function mediaTypeFromExt(ext) {
  const e = ext.toLowerCase();
  if (['.mp4', '.webm', '.mov'].includes(e)) return 'Video';
  if (e === '.svg') return 'SVG';
  if (['.mp3', '.wav'].includes(e)) return 'Audio';
  return 'Image';
}

function assetGroupFromRel(rel) {
  const top = rel.split('/')[0];
  const map = {
    work: 'Work',
    services: 'Services',
    more: 'More',
    blog: 'Blog',
    framer: 'Framer',
    logos: 'Brand',
    tools: 'Brand',
    platforms: 'Brand',
  };
  return map[top] || 'Brand';
}

function usageFromFileName(fileName) {
  const n = fileName.toLowerCase();
  if (n.includes('thumb')) return 'Thumbnail';
  if (n.includes('cover')) return 'Cover';
  if (n.includes('logo')) return 'Logo';
  if (n.includes('icon')) return 'Icon';
  if (n.includes('about')) return 'About';
  if (n.includes('hero') || n === 'home.mp4') return 'Hero';
  return 'Gallery';
}

function assetTypeFromGroup(group) {
  if (group === 'Blog') return 'Blog Asset';
  if (group === 'Work') return 'Client Asset';
  if (group === 'Services') return 'Service Asset';
  if (group === 'Brand') return 'Brand Asset';
  return 'Shared Asset';
}

function sha256file(filePath) {
  return new Promise((resolve, reject) => {
    const hash = createHash('sha256');
    const stream = createReadStream(filePath);
    stream.on('data', (d) => hash.update(d));
    stream.on('error', reject);
    stream.on('end', () => resolve(hash.digest('hex')));
  });
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

async function mapPool(items, limit, fn) {
  const results = new Array(items.length);
  let i = 0;
  async function worker() {
    while (i < items.length) {
      const idx = i++;
      results[idx] = await fn(items[idx], idx);
    }
  }
  await Promise.all(Array.from({ length: Math.min(limit, items.length) }, () => worker()));
  return results;
}

async function listR2Keys() {
  // Prefer existing manifest; fall back to wrangler list if present
  const manifestPath = path.join(ROOT, 'docs', 'r2-asset-map.json');
  const keys = new Set();
  try {
    const man = JSON.parse(await fs.readFile(manifestPath, 'utf8'));
    for (const o of man.objects || []) if (o.r2Key) keys.add(o.r2Key);
  } catch {}

  try {
    const { stdout } = await run('npx', [
      'wrangler',
      'r2',
      'object',
      'list',
      BUCKET,
      '--prefix',
      'assets/',
      '--remote',
      '--json',
    ]);
    const parsed = JSON.parse(stdout);
    const objects = Array.isArray(parsed) ? parsed : parsed.objects || parsed.result || [];
    for (const o of objects) {
      const k = o.key || o.Key || o.name;
      if (k) keys.add(k);
    }
  } catch (e) {
    console.warn('  (wrangler list unavailable, using manifest only)', e.message.slice(0, 80));
  }
  return keys;
}

async function main() {
  console.log(`🚀 Asset registry sync${DRY_RUN ? ' (DRY RUN)' : ''}`);
  const files = await walk(LOCAL_ROOT);
  console.log(`Local files: ${files.length}`);

  const posts = await client.fetch(`*[_type=="post"]{_id, "slug": slug.current}`);
  const caseStudies = await client.fetch(
    `*[_type=="caseStudy"]{_id, "slug": slug.current, title}`
  );
  const postBySlug = new Map(posts.map((p) => [p.slug, p._id]));
  const csBySlug = new Map(caseStudies.map((c) => [c.slug, c._id]));

  const existingAssets = await client.fetch(
    `*[_type=="asset"]{_id, relativePath, sitePath, r2Key, status}`
  );
  const byPath = new Map(
    existingAssets.filter((a) => a.relativePath).map((a) => [a.relativePath, a])
  );

  let upserted = 0;
  let linked = 0;
  const localRels = new Set();
  const jobs = [];

  for (const file of files) {
    const rel = path.relative(LOCAL_ROOT, file).split(path.sep).join('/');
    localRels.add(rel);
    const ext = path.extname(file);
    const fileName = path.basename(file);
    const sitePath = `/assets/${rel}`;
    const r2Key = `assets/${rel}`;
    const publicUrl = `${R2_PUBLIC_BASE.replace(/\/$/, '')}/${r2Key}`;
    const group = assetGroupFromRel(rel);
    const usage = usageFromFileName(fileName);
    const st = await fs.stat(file);
    jobs.push({ file, rel, r2Key, sitePath, size: st.size, contentType: MIME[ext.toLowerCase()] || 'application/octet-stream' });

    const id = `asset-${slugify(rel)}`;
    const doc = {
      _id: id,
      _type: 'asset',
      name: fileName,
      slug: { _type: 'slug', current: slugify(rel) },
      displayName: fileName,
      assetType: assetTypeFromGroup(group),
      mediaType: mediaTypeFromExt(ext),
      mimeType: MIME[ext.toLowerCase()] || undefined,
      assetGroup: group,
      usage,
      status: 'Active',
      folder: path.dirname(rel) === '.' ? '' : path.dirname(rel),
      relativePath: rel,
      sitePath,
      r2Key,
      publicUrl,
      fileName,
      extension: ext.replace(/^\./, ''),
      ownerType: 'Internal',
      localExists: true,
    };

    // Content links
    if (rel.startsWith('blog/')) {
      const base = path.basename(rel, ext);
      const postId = postBySlug.get(base);
      if (postId) {
        doc.linkedPost = { _type: 'reference', _ref: postId };
        linked++;
      }
    }
    if (rel.startsWith('work/')) {
      const folder = rel.split('/')[1];
      if (folder && csBySlug.has(folder)) {
        doc.linkedCaseStudy = { _type: 'reference', _ref: csBySlug.get(folder) };
        linked++;
      }
    }
    if (rel.startsWith('framer/')) {
      const folder = rel.split('/')[1];
      if (folder && csBySlug.has(folder)) {
        doc.linkedCaseStudy = { _type: 'reference', _ref: csBySlug.get(folder) };
        linked++;
      }
    }

    // Preserve r2Synced if already true on existing
    const prev = byPath.get(rel);
    if (prev?.r2Key) {
      /* keep */
    }

    if (!DRY_RUN) {
      // File facts are refreshed every run; editorial fields (alt, group,
      // status, usage, links…) are only SEEDED on a new doc and never
      // overwritten — see scripts/lib/asset-fields.mjs. This used to be a
      // createOrReplace, which wiped every Studio edit on each run.
      const { facts, editorial } = splitAssetFields(doc);
      const existing = existingAssets.find((a) => a.relativePath === rel || a._id === id);

      // Id migration: copy the old doc across first, so its human edits and
      // r2Synced survive the move. The facts patch below then corrects the
      // path fields that changed.
      if (existing && existing._id !== id) {
        const full = await client.getDocument(existing._id).catch(() => null);
        if (full) {
          const { _id, _type, _rev, _createdAt, _updatedAt, ...kept } = full;
          await client.createIfNotExists({ _id: id, _type: 'asset' });
          await client.patch(id).setIfMissing(kept).commit();
          if (!existing._id.startsWith('drafts.')) {
            await client.delete(existing._id).catch(() => {});
          }
        }
      }

      await client.createIfNotExists({ _id: id, _type: 'asset', ...facts, ...editorial });
      await client.patch(id).set(facts).setIfMissing(editorial).commit();
      upserted++;
      if (upserted % 40 === 0) console.log(`  upserted ${upserted}...`);
    } else {
      upserted++;
    }
  }

  // Archive stale asset docs whose files are gone
  let archived = 0;
  if (!DRY_RUN) {
    for (const a of existingAssets) {
      if (!a.relativePath) continue;
      if (localRels.has(a.relativePath)) continue;
      // hyphen/underscore variant check
      const alt = a.relativePath.includes('_')
        ? a.relativePath.replace(/_/g, '-')
        : a.relativePath.replace(/-/g, '_');
      if (localRels.has(alt)) {
        await client
          .patch(a._id)
          .set({ relativePath: alt, sitePath: `/assets/${alt}`, r2Key: `assets/${alt}`, status: 'Active', localExists: true })
          .commit()
          .catch(() => {});
        continue;
      }
      await client.patch(a._id).set({ status: 'Archived', localExists: false }).commit().catch(() => {});
      archived++;
    }
  }

  console.log(`Upserted: ${upserted}, linked hints: ${linked}, archived: ${archived}`);

  // R2 delta
  let uploaded = 0;
  let skipped = 0;
  let failed = 0;
  const uploadedObjects = [];

  if (!SKIP_R2 && !DRY_RUN) {
    if (!process.env.CLOUDFLARE_API_TOKEN && !process.env.CLOUDFLARE_API_KEY) {
      console.warn('No CLOUDFLARE_API_TOKEN — skipping R2 upload');
    } else {
      console.log('\n☁️  Diffing R2...');
      const remoteKeys = await listR2Keys();
      const missing = jobs.filter((j) => !remoteKeys.has(j.r2Key));
      const missingBytes = missing.reduce((s, j) => s + j.size, 0);
      console.log(`Missing on R2: ${missing.length} (${(missingBytes / 1024 ** 2).toFixed(1)} MiB)`);

      if (missingBytes > SOFT_STORAGE_CEILING) {
        console.error('ABORT: projected upload exceeds R2 soft storage ceiling');
        process.exit(2);
      }
      if (missing.length > SOFT_CLASS_A_CEILING) {
        console.error('ABORT: too many Class A puts');
        process.exit(2);
      }

      await mapPool(missing, CONCURRENCY, async (job, idx) => {
        try {
          await run('npx', [
            'wrangler',
            'r2',
            'object',
            'put',
            `${BUCKET}/${job.r2Key}`,
            '--file',
            job.file,
            '--content-type',
            job.contentType,
            '--remote',
          ]);
          const hash = await sha256file(job.file);
          uploadedObjects.push({
            localPath: `public/assets/${job.rel}`,
            sitePath: job.sitePath,
            r2Key: job.r2Key,
            bytes: job.size,
            contentType: job.contentType,
            sha256: hash,
          });
          await client
            .patch(`asset-${slugify(job.rel)}`)
            .set({ r2Synced: true, localExists: true })
            .commit()
            .catch(() => {});
          uploaded++;
          if ((idx + 1) % 10 === 0 || idx === missing.length - 1) {
            console.log(`  uploaded ${idx + 1}/${missing.length}`);
          }
        } catch (e) {
          failed++;
          console.error(`  FAIL ${job.r2Key}: ${e.message.split('\n')[0]}`);
        }
      });
      skipped = jobs.length - missing.length;
    }
  } else {
    console.log('Skipping R2 (SKIP_R2 or DRY_RUN)');
  }

  // Mark already-on-R2 assets as synced
  if (!DRY_RUN && !SKIP_R2) {
    const remoteKeys = await listR2Keys().catch(() => new Set());
    for (const job of jobs) {
      if (remoteKeys.has(job.r2Key) || uploadedObjects.some((o) => o.r2Key === job.r2Key)) {
        await client
          .patch(`asset-${slugify(job.rel)}`)
          .set({ r2Synced: true })
          .commit()
          .catch(() => {});
      }
    }
  }

  // Refresh / merge r2 map
  const manifestPath = path.join(ROOT, 'docs', 'r2-asset-map.json');
  let existingMap = { objects: [] };
  try {
    existingMap = JSON.parse(await fs.readFile(manifestPath, 'utf8'));
  } catch {}
  const byKey = new Map((existingMap.objects || []).map((o) => [o.r2Key, o]));
  for (const o of uploadedObjects) byKey.set(o.r2Key, o);
  const allObjects = [...byKey.values()].sort((a, b) => a.r2Key.localeCompare(b.r2Key));
  const usedBytes = allObjects.reduce((s, o) => s + (o.bytes || 0), 0);

  if (!DRY_RUN) {
    await fs.writeFile(
      manifestPath,
      JSON.stringify(
        {
          bucket: BUCKET,
          uploadedAt: new Date().toISOString(),
          keyPrefix: 'assets',
          pathMapping: {
            local: 'public/assets/<path>',
            r2Key: 'assets/<path>',
            sitePath: '/assets/<path>',
          },
          freeTier: {
            storageGiB: 10,
            classA: 1_000_000,
            usedStorageBytes: usedBytes,
            lastDeltaPuts: uploaded,
          },
          counts: { objects: allObjects.length, deltaUploaded: uploaded, deltaFailed: failed },
          objects: allObjects,
        },
        null,
        2
      )
    );
  }

  const report = {
    generatedAt: new Date().toISOString(),
    local: files.length,
    sanityUpserted: upserted,
    linked,
    archived,
    r2: { skippedExisting: skipped, uploaded, failed },
    freeTier: {
      usedStorageBytes: usedBytes,
      softCeilingBytes: SOFT_STORAGE_CEILING,
      freeBytes: FREE_STORAGE_BYTES,
    },
  };
  await fs.mkdir(path.join(ROOT, 'docs'), { recursive: true });
  await fs.writeFile(path.join(ROOT, 'docs', 'asset-registry-report.json'), JSON.stringify(report, null, 2));
  console.log('\n✅ Report:', report);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
