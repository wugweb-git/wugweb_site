#!/usr/bin/env node
/**
 * Upload public/assets → R2 bucket with path-mapped keys.
 *
 * Mapping rule:
 *   local:  public/assets/<rel>
 *   r2 key: assets/<rel>
 *   site path remains: /assets/<rel>
 *
 * Free-tier guards (hard abort):
 *   - Total upload size must stay under 9.5 GiB of the 10 GiB free storage
 *   - Object count (Class A puts) must stay under 100k of the 1M free Class A
 *
 * Usage:
 *   CLOUDFLARE_API_TOKEN=... node scripts/upload-assets-to-r2.mjs
 *   DRY_RUN=1 node scripts/upload-assets-to-r2.mjs
 */
import { spawn } from 'child_process';
import { createHash } from 'crypto';
import { createReadStream, promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const LOCAL_ROOT = path.join(ROOT, 'public', 'assets');
const BUCKET = process.env.R2_BUCKET || 'wugweb-assets';
const KEY_PREFIX = 'assets'; // maps /assets/... ↔ assets/...
const CONCURRENCY = Number(process.env.R2_UPLOAD_CONCURRENCY || 6);
const DRY_RUN = process.env.DRY_RUN === '1';

const FREE_STORAGE_BYTES = 10 * 1024 ** 3;
const SOFT_STORAGE_CEILING = 9.5 * 1024 ** 3;
const FREE_CLASS_A = 1_000_000;
const SOFT_CLASS_A_CEILING = 100_000;

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

function contentType(filePath) {
  return MIME[path.extname(filePath).toLowerCase()] || 'application/octet-stream';
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

async function main() {
  if (!process.env.CLOUDFLARE_API_TOKEN && !process.env.CLOUDFLARE_API_KEY) {
    console.error('Missing CLOUDFLARE_API_TOKEN');
    process.exit(1);
  }

  const files = await walk(LOCAL_ROOT);
  let totalBytes = 0;
  const jobs = [];
  for (const file of files) {
    const st = await fs.stat(file);
    totalBytes += st.size;
    const rel = path.relative(LOCAL_ROOT, file).split(path.sep).join('/');
    const key = `${KEY_PREFIX}/${rel}`;
    const sitePath = `/${KEY_PREFIX}/${rel}`;
    jobs.push({ file, rel, key, sitePath, size: st.size, contentType: contentType(file) });
  }

  console.log(`Bucket: ${BUCKET}`);
  console.log(`Files: ${jobs.length}`);
  console.log(`Bytes: ${totalBytes} (${(totalBytes / 1024 ** 2).toFixed(1)} MiB)`);
  console.log(`Free storage: 10 GiB | soft ceiling: 9.5 GiB`);
  console.log(`Class A puts: ${jobs.length} / free ${FREE_CLASS_A}`);

  if (totalBytes > SOFT_STORAGE_CEILING) {
    console.error('ABORT: upload would exceed R2 free-tier soft storage ceiling (9.5 GiB)');
    process.exit(2);
  }
  if (jobs.length > SOFT_CLASS_A_CEILING) {
    console.error('ABORT: too many Class A puts for free-tier soft ceiling');
    process.exit(2);
  }
  if (totalBytes > FREE_STORAGE_BYTES || jobs.length > FREE_CLASS_A) {
    console.error('ABORT: would exceed hard free-tier limits');
    process.exit(2);
  }

  if (DRY_RUN) {
    console.log('DRY_RUN=1 — no uploads');
    console.log(jobs.slice(0, 5));
    return;
  }

  let ok = 0;
  let fail = 0;
  const mapping = [];

  await mapPool(jobs, CONCURRENCY, async (job, idx) => {
    const args = [
      'wrangler',
      'r2',
      'object',
      'put',
      `${BUCKET}/${job.key}`,
      '--file',
      job.file,
      '--content-type',
      job.contentType,
      '--remote',
    ];
    try {
      await run('npx', args);
      const hash = await sha256file(job.file);
      mapping.push({
        localPath: `public/assets/${job.rel}`,
        sitePath: job.sitePath,
        r2Key: job.key,
        bytes: job.size,
        contentType: job.contentType,
        sha256: hash,
      });
      ok++;
      if ((idx + 1) % 20 === 0 || idx === jobs.length - 1) {
        console.log(`Uploaded ${idx + 1}/${jobs.length} (ok=${ok} fail=${fail})`);
      }
    } catch (e) {
      fail++;
      console.error(`FAIL ${job.key}: ${e.message.split('\n')[0]}`);
    }
  });

  mapping.sort((a, b) => a.r2Key.localeCompare(b.r2Key));
  const outDir = path.join(ROOT, 'docs');
  await fs.mkdir(outDir, { recursive: true });
  const manifest = {
    bucket: BUCKET,
    uploadedAt: new Date().toISOString(),
    keyPrefix: KEY_PREFIX,
    pathMapping: {
      local: 'public/assets/<path>',
      r2Key: 'assets/<path>',
      sitePath: '/assets/<path>',
      note: 'Site paths stay /assets/... ; R2 keys mirror that without the leading slash.',
    },
    freeTier: {
      storageGiB: 10,
      classA: 1_000_000,
      classB: 10_000_000,
      usedStorageBytes: totalBytes,
      usedClassAPuts: ok,
    },
    counts: { attempted: jobs.length, ok, fail },
    objects: mapping,
  };
  const manifestPath = path.join(outDir, 'r2-asset-map.json');
  await fs.writeFile(manifestPath, JSON.stringify(manifest, null, 2));
  console.log(`Wrote ${manifestPath}`);
  console.log(`Done. ok=${ok} fail=${fail}`);
  if (fail) process.exit(1);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
