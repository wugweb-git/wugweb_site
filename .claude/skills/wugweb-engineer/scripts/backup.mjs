#!/usr/bin/env node
// Query Sanity and write a hashed backup. Reads only.
//
//   node backup.mjs --query '<groq>' --label <name> [--out <dir>] [--print] [--public] [--ids-from <result.json>]
//
// --print      read and report only; writes no file
// --out        folder for the backup (default: <repo>/backups)
// --public     with no SANITY_SYNC_TOKEN, read the public CDN (published only, no drafts) instead of stopping
// --ids-from   a result or plan file; its document ids are passed to the query as $ids
//
// Refuses to overwrite a file. Refuses personal or secret data types (contactSubmission, platformProfile, person) inside the repo,
// because the repo is public and backups/ is tracked. The guard reads the query text before the read and the
// _type of every fetched document after it, so a query by id list, *[] or _type match cannot get past it.
// --print goes through the same guard: for those types it shows ids, types and counts, never content.
import fs from 'node:fs';
import path from 'node:path';
import { args, repoRoot, readEnv, query, token, hashDocs, stamp, backupRefusal, printLines, fail } from './lib.mjs';

const a = args();
if (!a.query || a.query === true) fail('give --query "<groq>"');
const label = typeof a.label === 'string' ? a.label.replace(/[^\w.-]+/g, '-') : 'backup';
const root = repoRoot();
const outDir = path.resolve(typeof a.out === 'string' ? a.out : path.join(root || '.', 'backups'));

const insideRepo = !!root && (outDir + path.sep).startsWith(root + path.sep);
// First line of defence, before any network call: the query text.
const early = a.print ? null : backupRefusal(a.query, [], insideRepo);
if (early) fail(early);

const params = {};
if (typeof a['ids-from'] === 'string') {
  const j = JSON.parse(fs.readFileSync(a['ids-from'], 'utf8'));
  params.ids = j.written || (j.items || []).map((i) => i._id) || [];
}

const env = readEnv(root);
const publicRead = a.public === true && !token(env);
if (publicRead) console.log('public read: published documents only, no drafts');
const result = await query(env, a.query, params, { publicRead: a.public === true });
const docs = Array.isArray(result) ? result : result == null ? [] : [result];
const drafts = docs.filter((d) => String(d._id || '').startsWith('drafts.')).length;
console.log(`count ${docs.length} (${docs.length - drafts} published, ${drafts} drafts)`);

if (a.print) {
  for (const line of printLines(a.query, docs)) console.log(line);
  process.exit(0);
}

// Second line: the _type of what was fetched.
const refusal = backupRefusal(a.query, docs, insideRepo);
if (refusal) fail(refusal + '; nothing written');

fs.mkdirSync(outDir, { recursive: true });
const file = path.join(outDir, `${label}-${stamp()}.json`);
if (fs.existsSync(file)) fail('backup exists: ' + file);
const sha = hashDocs(docs);
fs.writeFileSync(file, JSON.stringify({ takenAt: new Date().toISOString(), query: a.query, params, ...(publicRead ? { publicRead: true } : {}), count: docs.length, sha256: sha, docs }, null, 1), { flag: 'wx' });
console.log(`backup ${path.relative(process.cwd(), file)} sha256 ${sha.slice(0, 12)}`);
