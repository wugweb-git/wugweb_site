// Shared helpers for wugweb-engineer. Plain Node 18 or later, no packages.
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';

export const SKILL_DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
export const PROJECT = 'splvhmk1';
export const DATASET = 'production';
export const API = 'v2025-02-19';
export const SYSTEM_KEYS = new Set(['_id', '_type', '_rev', '_createdAt', '_updatedAt', '_key', '_system', '_originalId']);
export const PERSONAL_TYPES = new Set(['contactSubmission', 'platformProfile', 'person']);

// Finds the site repo root: the nearest folder above cwd (or the skill) holding package.json and sanity/.
export function repoRoot(start = process.cwd()) {
  for (const s of [start, SKILL_DIR]) {
    let d = path.resolve(s);
    for (;;) {
      if (fs.existsSync(path.join(d, 'package.json')) && fs.existsSync(path.join(d, 'sanity'))) return d;
      const up = path.dirname(d);
      if (up === d) break;
      d = up;
    }
  }
  return null;
}

export function args(argv = process.argv.slice(2)) {
  const out = { _: [] };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a.startsWith('--')) {
      const k = a.slice(2);
      const next = argv[i + 1];
      if (next === undefined || next.startsWith('--')) out[k] = true;
      else { out[k] = next; i++; }
    } else out._.push(a);
  }
  return out;
}

export function readEnv(root) {
  const env = { ...process.env };
  const f = root && path.join(root, '.env');
  if (f && fs.existsSync(f)) {
    for (const line of fs.readFileSync(f, 'utf8').split('\n')) {
      const m = /^([A-Z0-9_]+)=(.*)$/.exec(line.trim());
      if (m && env[m[1]] === undefined) env[m[1]] = m[2].trim().replace(/^["']|["']$/g, '');
    }
  }
  return env;
}

// One name per use (docs/skills/SECRETS.md): the Sanity editor token is SANITY_SYNC_TOKEN.
export const TOKEN_NAME = 'SANITY_SYNC_TOKEN';
export function token(env) {
  return env[TOKEN_NAME] || '';
}

// Canonical JSON (sorted keys) so a hash does not depend on key order.
export function canon(v) {
  if (Array.isArray(v)) return '[' + v.map(canon).join(',') + ']';
  if (v && typeof v === 'object') return '{' + Object.keys(v).sort().map((k) => JSON.stringify(k) + ':' + canon(v[k])).join(',') + '}';
  return JSON.stringify(v === undefined ? null : v);
}
export const sha256 = (s) => crypto.createHash('sha256').update(s).digest('hex');
export const hashDocs = (docs) => sha256(canon(docs));
export const stamp = () => new Date().toISOString().replace(/[:.]/g, '-');
export const same = (a, b) => canon(a) === canon(b);

// Types named in a GROQ query by _type == "x" or _type in [...]
export function typesInQuery(q) {
  const t = new Set();
  for (const m of q.matchAll(/_type\s*==\s*["']([\w.-]+)["']/g)) t.add(m[1]);
  for (const m of q.matchAll(/_type\s+in\s*\[([^\]]*)\]/g)) for (const n of m[1].matchAll(/["']([\w.-]+)["']/g)) t.add(n[1]);
  return [...t];
}

// Guarded types named in the query text or held by the fetched documents. The text alone misses
// a query by id list, *[] or _type match, so the documents are checked too.
export function guardedTypes(q, docs = []) {
  const t = new Set(typesInQuery(q).filter((x) => PERSONAL_TYPES.has(x)));
  for (const d of docs) if (d && PERSONAL_TYPES.has(d._type)) t.add(d._type);
  return [...t];
}
const untyped = (docs) => docs.filter((d) => !d || typeof d !== 'object' || typeof d._type !== 'string').length;

// Why a backup may not be written, or null. Inside the repo it refuses guarded types and any
// result whose _type cannot be read (a projection or a bare value), since that cannot be checked.
export function backupRefusal(q, docs, insideRepo) {
  if (!insideRepo) return null;
  const g = guardedTypes(q, docs);
  if (g.length) return `${g.join(', ')} holds personal data; give --out outside the repo`;
  const n = untyped(docs);
  if (n) return `${n} fetched ${n === 1 ? 'result has' : 'results have'} no _type, so the guard cannot check them; back up whole documents (no projection) or give --out outside the repo`;
  return null;
}

// The lines --print shows. The same guard as a backup: when a guarded type is named or fetched,
// or a result has no _type, it shows ids, types and counts only, never content.
export function printLines(q, docs, limit = 10) {
  const plain = docs.filter((d) => typeof d === 'number' || typeof d === 'boolean');
  const rest = docs.filter((d) => !plain.includes(d));
  const g = guardedTypes(q, docs);
  if (!g.length && !untyped(rest)) return docs.slice(0, limit).map((d) => JSON.stringify(d).slice(0, 200));
  const by = {};
  for (const d of rest) { const k = (d && typeof d === 'object' && typeof d._type === 'string') ? d._type : '(no _type)'; by[k] = (by[k] || 0) + 1; }
  const out = [`content withheld (${g.length ? g.join(', ') + ' is guarded' : 'a result has no _type'}): ids, types and counts only`];
  out.push('by type: ' + (Object.entries(by).map(([k, n]) => `${k} ${n}`).join(', ') || 'none'));
  for (const d of rest.slice(0, limit)) out.push(JSON.stringify({ _id: d && typeof d === 'object' && typeof d._id === 'string' ? d._id : null, _type: d && typeof d === 'object' && typeof d._type === 'string' ? d._type : null }));
  if (!g.length) for (const d of plain.slice(0, limit)) out.push(JSON.stringify(d));
  return out;
}

// The host a read uses: the API with a token, the public CDN only when the caller opts in, else null.
export function readHost(tk, { publicRead = false } = {}) {
  if (tk) return `${PROJECT}.api.sanity.io`;
  return publicRead ? `${PROJECT}.apicdn.sanity.io` : null;
}

// With no token a read stops with exit code 2. { publicRead: true } opts in to the public CDN,
// which returns published documents only (no drafts).
export async function query(env, groq, params = {}, opts = {}) {
  const tk = token(env);
  const host = readHost(tk, opts);
  if (!host) fail(`set ${TOKEN_NAME} in your environment or the repo's .env. Without it a read misses drafts; a published-only read from the public CDN needs an explicit opt-in (backup.mjs --public).`, 2);
  const u = new URL(`https://${host}/${API}/data/query/${DATASET}`);
  u.searchParams.set('query', groq);
  u.searchParams.set('perspective', 'raw');
  for (const [k, v] of Object.entries(params)) u.searchParams.set('$' + k, JSON.stringify(v));
  const r = await fetch(u, { headers: tk ? { Authorization: 'Bearer ' + tk } : {} });
  const j = await r.json().catch(() => ({}));
  if (!r.ok) throw new Error(`Sanity query failed (${r.status}): ${j.error?.description || j.message || r.statusText}`);
  return j.result;
}

export async function mutate(env, mutations) {
  const tk = token(env);
  if (!tk) { console.error(`Set ${TOKEN_NAME} in your environment or the repo's .env.`); process.exit(2); }
  const u = `https://${PROJECT}.api.sanity.io/${API}/data/mutate/${DATASET}?returnIds=true&visibility=sync`;
  const r = await fetch(u, { method: 'POST', headers: { Authorization: 'Bearer ' + tk, 'Content-Type': 'application/json' }, body: JSON.stringify({ mutations }) });
  const j = await r.json().catch(() => ({}));
  return { ok: r.ok, status: r.status, body: j };
}

export function fail(msg, code = 1) {
  console.error('stop: ' + msg);
  process.exit(code);
}

export function mdCell(v) {
  if (v === undefined) return '(empty)';
  const s = typeof v === 'string' ? v : JSON.stringify(v);
  const t = s.length > 60 ? s.slice(0, 57) + '...' : s;
  return t.replace(/\|/g, '\\|').replace(/\n/g, ' ');
}
