#!/usr/bin/env node
// Query Sanity and write a hashed backup. Reads only.
//
//   node backup.mjs --query '<groq>' --label <name> [--out <dir>] [--print] [--ids-from <result.json>]
//
// --print      read and report only; writes no file
// --out        folder for the backup (default: <repo>/backups)
// --ids-from   a result or plan file; its document ids are passed to the query as $ids
//
// Refuses to overwrite a file. Refuses personal or secret data types (contactSubmission, platformProfile, person) inside the repo,
// because the repo is public and backups/ is tracked.
import fs from 'node:fs';
import path from 'node:path';
import { args, repoRoot, readEnv, query, hashDocs, stamp, typesInQuery, PERSONAL_TYPES, fail } from './lib.mjs';

const a = args();
if (!a.query || a.query === true) fail('give --query "<groq>"');
const label = typeof a.label === 'string' ? a.label.replace(/[^\w.-]+/g, '-') : 'backup';
const root = repoRoot();
const outDir = path.resolve(typeof a.out === 'string' ? a.out : path.join(root || '.', 'backups'));

const personal = typesInQuery(a.query).filter((t) => PERSONAL_TYPES.has(t));
const insideRepo = root && (outDir + path.sep).startsWith(root + path.sep);
if (personal.length && insideRepo && !a.print) fail(`${personal.join(', ')} holds personal data; give --out outside the repo`);

const params = {};
if (typeof a['ids-from'] === 'string') {
  const j = JSON.parse(fs.readFileSync(a['ids-from'], 'utf8'));
  params.ids = j.written || (j.items || []).map((i) => i._id) || [];
}

const env = readEnv(root);
const result = await query(env, a.query, params);
const docs = Array.isArray(result) ? result : result == null ? [] : [result];
const drafts = docs.filter((d) => String(d._id || '').startsWith('drafts.')).length;
console.log(`count ${docs.length} (${docs.length - drafts} published, ${drafts} drafts)`);

if (a.print) {
  for (const d of docs.slice(0, 10)) console.log(JSON.stringify(d).slice(0, 200));
  process.exit(0);
}

fs.mkdirSync(outDir, { recursive: true });
const file = path.join(outDir, `${label}-${stamp()}.json`);
if (fs.existsSync(file)) fail('backup exists: ' + file);
const sha = hashDocs(docs);
fs.writeFileSync(file, JSON.stringify({ takenAt: new Date().toISOString(), query: a.query, params, count: docs.length, sha256: sha, docs }, null, 1), { flag: 'wx' });
console.log(`backup ${path.relative(process.cwd(), file)} sha256 ${sha.slice(0, 12)}`);
