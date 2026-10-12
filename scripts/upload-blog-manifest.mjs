#!/usr/bin/env node
/**
 * Upload the blog image manifest to R2. Additive only: never overwrites an existing key,
 * never deletes anything (including the old objects of rows sourced from the bucket).
 *
 *   node scripts/upload-blog-manifest.mjs <manifest.csv> <uploads-dir>
 *
 * Per row: download source_url (or read <uploads-dir>/<name> for notion-file-block rows),
 * `wrangler r2 object put wugweb-assets/<r2_key> --remote`, then GET the public URL and
 * require 200. Keeps going on failure; writes backups/blog-r2-upload-results.csv.
 */
import { readFileSync, writeFileSync, mkdirSync, mkdtempSync, existsSync } from 'node:fs';
import { spawn } from 'node:child_process';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const [manifest, uploads] = process.argv.slice(2);
if (!manifest || !uploads) { console.error('usage: upload-blog-manifest.mjs <manifest.csv> <uploads-dir>'); process.exit(1); }
const BUCKET = 'wugweb-assets';
const PUB = 'https://pub-39ad1d03baec440faf48303be95c3782.r2.dev';
const CONCURRENCY = 5;
const MAX_TOTAL_BYTES = 500 * 1024 * 1024; // hard stop far below Rule 2 (9.5 GiB soft ceiling)
const MIME = { png: 'image/png', jpg: 'image/jpeg', jpeg: 'image/jpeg', webp: 'image/webp', gif: 'image/gif', svg: 'image/svg+xml', avif: 'image/avif' };

function parseCsv(text) {
  const rows = []; let row = [], cur = '', q = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (q) { if (c === '"' && text[i + 1] === '"') { cur += '"'; i++; } else if (c === '"') q = false; else cur += c; }
    else if (c === '"') q = true;
    else if (c === ',') { row.push(cur); cur = ''; }
    else if (c === '\n' || c === '\r') { if (c === '\r' && text[i + 1] === '\n') i++; row.push(cur); cur = ''; if (row.length > 1 || row[0]) rows.push(row); row = []; }
    else cur += c;
  }
  if (cur || row.length) { row.push(cur); rows.push(row); }
  const [h, ...rest] = rows;
  return rest.map((r) => Object.fromEntries(h.map((k, i) => [k, r[i] ?? ''])));
}
const run = (cmd, args) => new Promise((res, rej) => {
  const p = spawn(cmd, args, { cwd: ROOT, stdio: ['ignore', 'pipe', 'pipe'] });
  let out = ''; p.stdout.on('data', (d) => (out += d)); p.stderr.on('data', (d) => (out += d));
  p.on('close', (code) => (code === 0 ? res(out) : rej(new Error(out.trim().split('\n').pop() || `exit ${code}`))));
});
const pubUrl = (key) => `${PUB}/${key.split('/').map(encodeURIComponent).join('/')}`;
const status = async (key) => (await fetch(pubUrl(key), { headers: { Range: 'bytes=0-0' } })).status;

const rows = parseCsv(readFileSync(manifest, 'utf8'));
const tmp = mkdtempSync(path.join(tmpdir(), 'blog-r2-'));
const results = []; let total = 0, done = 0;

async function one(r, i) {
  const res = { ...r, result: '', note: '' };
  try {
    const key = r.r2_key;
    if ((await status(key)) < 300) { res.result = 'skipped-exists'; return res; }
    let file, type = '';
    if (r.source_url.startsWith('notion-file-block://')) {
      const name = new URL(r.source_url.replace('notion-file-block://', 'https://x/')).searchParams.get('name');
      file = path.join(uploads, name); if (!existsSync(file)) throw new Error(`missing local file ${name}`);
      type = MIME[name.split('.').pop().toLowerCase()] || 'application/octet-stream';
    } else {
      const resp = await fetch(r.source_url, { headers: { 'User-Agent': 'Mozilla/5.0 (wugweb-r2-import)', Accept: 'image/*,*/*' }, redirect: 'follow' });
      if (!resp.ok) throw new Error(`download ${resp.status}`);
      const buf = Buffer.from(await resp.arrayBuffer());
      if (!buf.length) throw new Error('empty download');
      total += buf.length; if (total > MAX_TOTAL_BYTES) throw new Error('batch byte ceiling reached');
      const ct = (resp.headers.get('content-type') || '').split(';')[0].trim();
      const extType = MIME[key.split('.').pop().toLowerCase()];
      type = ct.startsWith('image/') ? ct : extType || 'application/octet-stream';
      if (extType && ct.startsWith('image/') && ct !== extType) res.note = `served ${ct}, key ext says ${extType}`;
      file = path.join(tmp, `${i}-${key.split('/').pop()}`); writeFileSync(file, buf);
    }
    await run('npx', ['wrangler', 'r2', 'object', 'put', `${BUCKET}/${key}`, '--file', file, '--content-type', type, '--remote']);
    const s = await status(key);
    if (s !== 200 && s !== 206) throw new Error(`verify ${s}`);
    res.result = 'ok';
  } catch (e) { res.result = 'FAILED'; res.note = String(e.message).slice(0, 200); }
  finally { done++; if (done % 20 === 0) console.log(`${done}/${rows.length}`); }
  return res;
}

let next = 0;
await Promise.all(Array.from({ length: CONCURRENCY }, async () => {
  while (next < rows.length) { const i = next++; results[i] = await one(rows[i], i); }
}));

mkdirSync(path.join(ROOT, 'backups'), { recursive: true });
const q = (s) => `"${String(s ?? '').replace(/"/g, '""')}"`;
writeFileSync(path.join(ROOT, 'backups', 'blog-r2-upload-results.csv'),
  ['post,field,source_url,r2_key,result,note', ...results.map((r) => [r.post, r.field, r.source_url.slice(0, 160), r.r2_key, r.result, r.note].map(q).join(','))].join('\n') + '\n');
const c = {}; for (const r of results) c[r.result] = (c[r.result] || 0) + 1;
console.log('DONE', JSON.stringify(c), `downloaded ${(total / 1048576).toFixed(1)} MiB`);
for (const r of results.filter((x) => x.result === 'FAILED')) console.log('FAILED', r.post, r.field, r.r2_key, '-', r.note);
