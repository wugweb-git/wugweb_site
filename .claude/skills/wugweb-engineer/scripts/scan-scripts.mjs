#!/usr/bin/env node
// Classify the site's scripts by how they write. Reads files only.
//
//   node scan-scripts.mjs [--dir scripts] [--json]
//
// A word scan, not a verdict: it reads each file's header and looks for write calls and switches.
// Read a script's code before running it, whatever this prints.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { args } from './lib.mjs';

const WRITE_CALL = /\.commit\(|\.patch\(|\.createOrReplace\(|\.createIfNotExists\(|\.create\(|\.delete\(|data\/mutate|PutObjectCommand|DeleteObjectCommand|DeleteObjectsCommand|CopyObjectCommand|r2 object (put|delete)|wrangler r2|aws s3 (cp|rm|sync)|INSERT INTO|DROP TABLE|DELETE FROM|UPDATE \w+ SET|writeFileSync|ffmpeg|sharp\(/i;
const DELETE_CALL = /\.delete\(|DeleteObject|DROP TABLE|DELETE FROM|aws s3 rm|r2 object delete|method:\s*['"]DELETE|['"]r2['"],\s*['"]object['"],\s*['"]delete/i;
const MEDIA_CALL = /ffmpeg|sharp\([^)]*\)[\s\S]{0,200}\.(toFile|png|jpeg|webp)\(/i;
const UPLOAD_CALL = /PutObjectCommand|CopyObjectCommand|aws s3 (cp|sync)|r2 object put|['"]r2['"],\s*['"]object['"],\s*['"]put|method:\s*['"]PUT/i;
const REMOTE_WRITE = /mutate\/production|method:\s*['"](DELETE|PUT)|['"]r2['"],\s*['"]object['"]|\.commit\(|\.patch\(|\.createOrReplace\(|\.createIfNotExists\(|\.create\(|\.delete\(|data\/mutate|PutObjectCommand|DeleteObject|CopyObjectCommand|r2 object|aws s3 (cp|rm|sync)|INSERT INTO|DROP TABLE|DELETE FROM|UPDATE \w+ SET|api\.notion\.com\/v1\/pages\/[^'"`]*['"`][^;]*method:\s*['"]PATCH/i;

export function classify(name, src) {
  const head = src.split('\n').slice(0, 30).join('\n');
  const ownerOnly = /run by the owner/i.test(head);
  const saysReadOnly = /report-only|read-only audit|read-only\b|plan only|\bread-only\)/i.test(head) && !/WRITE=1|APPLY=1|--apply/.test(head);
  const remote = REMOTE_WRITE.test(src);
  const deletes = DELETE_CALL.test(src);
  const uploads = UPLOAD_CALL.test(src);
  const makesMedia = MEDIA_CALL.test(src);
  let sw = 'none';
  if (/process\.env\.WRITE\s*===?\s*['"]1['"]/.test(src)) sw = 'WRITE=1 writes';
  else if (/process\.env\.APPLY/.test(src)) sw = 'APPLY=1 writes';
  else if (/['"]--apply['"]/.test(src)) sw = '--apply writes';
  else if (/process\.env\.DRY_RUN\s*===?\s*['"]1['"]/.test(src)) sw = 'DRY_RUN=1 reads; default writes';
  let status;
  if (ownerOnly) status = 'owner only';
  else if (!remote) status = WRITE_CALL.test(src) ? 'local files only' : 'read only';
  else if (sw === 'none') status = 'writes with no switch';
  else if (sw.startsWith('DRY_RUN')) status = 'writes by default';
  else status = 'dry run by default';
  if (makesMedia && status !== 'owner only') status += '; makes media files';
  if (saysReadOnly && remote && status !== 'owner only') status += ' (header says read-only; check)';
  return { script: name, status, switch: sw, deletes, uploads, makesMedia };
}

export function scan(dir) {
  return fs.readdirSync(dir)
    .filter((f) => /\.(mjs|cjs|js|sh)$/.test(f) && fs.statSync(path.join(dir, f)).isFile())
    .sort()
    .map((f) => classify(f, fs.readFileSync(path.join(dir, f), 'utf8')));
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const a = args();
  const dir = typeof a.dir === 'string' ? a.dir : 'scripts';
  const rows = scan(dir);
  if (a.json) { console.log(JSON.stringify(rows, null, 1)); process.exit(0); }
  console.log('| Script | Scan says | Switch | Deletes | Uploads |\n|---|---|---|---|---|');
  for (const r of rows) console.log(`| \`${r.script}\` | ${r.status} | ${r.switch} | ${r.deletes ? 'yes' : ''} | ${r.uploads ? 'yes' : ''} |`);
  const by = {};
  for (const r of rows) by[r.status] = (by[r.status] || 0) + 1;
  console.log('\n' + Object.entries(by).map(([k, n]) => `${k}: ${n}`).join('; '));
}
