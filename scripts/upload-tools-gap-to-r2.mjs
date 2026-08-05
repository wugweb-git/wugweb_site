#!/usr/bin/env node
/**
 * One-off: upload the `tools/*` gap (81 icons) to R2 that were salvaged
 * after the last full r2-asset-map.json run. Appends to the map manifest.
 *
 * Usage: CLOUDFLARE_API_TOKEN=... node scripts/upload-tools-gap-to-r2.mjs
 *        DRY_RUN=1 node scripts/upload-tools-gap-to-r2.mjs
 */
import { spawn } from 'child_process';
import { createHash } from 'crypto';
import { createReadStream, promises as fs } from 'fs';
import fsSync from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const BUCKET = process.env.R2_BUCKET || 'wugweb-assets';
const DRY_RUN = process.env.DRY_RUN === '1';

const MIME = {
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
  '.mp4': 'video/mp4',
  '.webm': 'video/webm',
  '.mov': 'video/quicktime',
};

function contentType(filePath) {
  return MIME[path.extname(filePath).toLowerCase()] || 'application/octet-stream';
}

function walk(dir, base) {
  const out = [];
  for (const e of fsSync.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) out.push(...walk(full, base));
    else out.push(path.relative(base, full).split(path.sep).join('/'));
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

async function main() {
  if (!process.env.CLOUDFLARE_API_TOKEN) {
    console.error('Missing CLOUDFLARE_API_TOKEN');
    process.exit(1);
  }

  const manifestPath = path.join(ROOT, 'docs', 'r2-asset-map.json');
  const manifest = JSON.parse(await fs.readFile(manifestPath, 'utf8'));
  const uploaded = new Set(manifest.objects.map((o) => o.r2Key));

  const local = walk(path.join(ROOT, 'public', 'assets'), path.join(ROOT, 'public', 'assets'));
  const missing = local.filter((f) => !uploaded.has(`assets/${f}`));
  console.log(`Gap files: ${missing.length}`);

  if (!missing.length) {
    console.log('Nothing to upload — map is up to date.');
    return;
  }

  let totalBytes = 0;
  const jobs = missing.map((rel) => {
    const file = path.join(ROOT, 'public', 'assets', rel);
    const size = fsSync.statSync(file).size;
    totalBytes += size;
    return {
      file,
      rel,
      key: `assets/${rel}`,
      sitePath: `/assets/${rel}`,
      size,
      contentType: contentType(file),
    };
  });

  console.log(`Bytes: ${totalBytes} (${(totalBytes / 1024 ** 2).toFixed(2)} MiB)`);
  console.log(`Class A puts: ${jobs.length} / free ${1_000_000}`);
  if (totalBytes > 9.5 * 1024 ** 3 || jobs.length > 100_000) {
    console.error('ABORT: free-tier soft ceiling exceeded');
    process.exit(2);
  }

  if (DRY_RUN) {
    console.log('DRY_RUN=1 — no uploads');
    return;
  }

  let ok = 0;
  let fail = 0;
  const CONCURRENCY = Number(process.env.R2_UPLOAD_CONCURRENCY || 6);

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

  await mapPool(jobs, CONCURRENCY, async (job, idx) => {
    const args = [
      'wrangler', 'r2', 'object', 'put',
      `${BUCKET}/${job.key}`, '--file', job.file,
      '--content-type', job.contentType, '--remote',
    ];
    try {
      await run('npx', args);
      const hash = await sha256file(job.file);
      manifest.objects.push({
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

  manifest.objects.sort((a, b) => a.r2Key.localeCompare(b.r2Key));
  manifest.uploadedAt = new Date().toISOString();
  manifest.counts = {
    attempted: manifest.objects.length,
    ok: manifest.objects.length,
    fail,
  };
  manifest.freeTier = {
    ...manifest.freeTier,
    usedClassAPuts: manifest.objects.length,
  };
  await fs.writeFile(manifestPath, JSON.stringify(manifest, null, 2));
  console.log(`Wrote ${manifestPath}`);
  console.log(`Done. ok=${ok} fail=${fail}`);
  if (fail) process.exit(1);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
