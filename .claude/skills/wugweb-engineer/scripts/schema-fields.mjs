#!/usr/bin/env node
// List declared top-level fields per Sanity type, and with --data, compare with stored keys.
//
//   node schema-fields.mjs --schema sanity/schemaTypes [--type caseStudy] [--data <backup.json>] [--json]
//
// The parse is textual: it reads the type's name and the name of each element in its top-level
// fields array. Elements with no name (a spread or a helper call) are listed as unresolved;
// check those by hand before calling a stored key undeclared.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { args, SYSTEM_KEYS, fail } from './lib.mjs';

// Walk source, skipping strings and comments, yielding [index, char, depth].
function* walk(src) {
  let depth = 0;
  for (let i = 0; i < src.length; i++) {
    const c = src[i];
    if (c === '/' && src[i + 1] === '/') { while (i < src.length && src[i] !== '\n') i++; continue; }
    if (c === '/' && src[i + 1] === '*') { i = src.indexOf('*/', i + 2); if (i < 0) return; i++; continue; }
    if (c === '"' || c === "'" || c === '`') {
      const q = c; const start = i;
      for (i++; i < src.length && src[i] !== q; i++) if (src[i] === '\\') i++;
      yield [start, 'str', depth, src.slice(start + 1, i)];
      continue;
    }
    if ('([{'.includes(c)) { yield [i, c, depth]; depth++; continue; }
    if (')]}'.includes(c)) { depth--; yield [i, c, depth]; continue; }
    yield [i, c, depth];
  }
}

export function parseType(src) {
  const toks = [...walk(src)];
  const names = []; // [tokIndex, depth, value]
  for (let k = 0; k < toks.length; k++) {
    const [i, c, d, v] = toks[k];
    if (c !== 'str') continue;
    const before = src.slice(Math.max(0, i - 12), i);
    if (/\bname\s*:\s*$/.test(before)) names.push([k, d, v]);
  }
  if (!names.length) return null;
  const minD = Math.min(...names.map((n) => n[1]));
  const typeName = names.find((n) => n[1] === minD)[2];
  // fields arrays: '[' token preceded by "fields:"; take the shallowest.
  const arrays = toks.map((t, k) => [t, k]).filter(([t]) => t[1] === '[' && /\bfields\s*:\s*$/.test(src.slice(Math.max(0, t[0] - 12), t[0])));
  if (!arrays.length) return { type: typeName, fields: [], unresolved: 0, refs: [] };
  const top = arrays.reduce((m, x) => (x[0][2] < m[0][2] ? x : m));
  const base = top[0][2];
  const fields = []; let unresolved = 0; const refs = [];
  let elemStart = top[1] + 1; let k = top[1] + 1;
  const flush = (end) => {
    const inElem = names.filter((n) => n[0] >= elemStart && n[0] < end);
    const hasContent = toks.slice(elemStart, end).some((t) => !/^\s$/.test(t[1]) && t[1] !== ',');
    if (inElem.length) { const md = Math.min(...inElem.map((n) => n[1])); fields.push(inElem.find((n) => n[1] === md)[2]); }
    else if (hasContent) {
      const text = src.slice(toks[elemStart][0], toks[end][0]);
      const m = /\.\.\.\s*([A-Za-z_$][\w$]*)/.exec(text) || /^\s*([A-Za-z_$][\w$]*)\s*$/.exec(text);
      if (m) refs.push(m[1]); else unresolved++;
    }
  };
  for (; k < toks.length; k++) {
    const t = toks[k];
    if (t[1] === ']' && t[2] === base) { flush(k); break; }
    if (t[1] === ',' && t[2] === base + 1) { flush(k); elemStart = k + 1; }
  }
  return { type: typeName, fields, unresolved, refs };
}

// Helper fields: export const x = defineField({ name: 'y', ... }) in a file with no defineType.
export function readHelpers(dir) {
  const map = {};
  for (const f of fs.readdirSync(dir).filter((f) => /\.(ts|js|mjs)$/.test(f))) {
    const src = fs.readFileSync(path.join(dir, f), 'utf8');
    for (const m of src.matchAll(/export\s+const\s+([A-Za-z_$][\w$]*)\s*=\s*defineField\(\s*\{[\s\S]*?\bname\s*:\s*['"]([\w]+)['"]/g)) map[m[1]] = m[2];
  }
  return map;
}

export function readSchema(dir) {
  const out = {};
  const helpers = readHelpers(dir);
  for (const f of fs.readdirSync(dir).filter((f) => /\.(ts|js|mjs)$/.test(f)).sort()) {
    const src = fs.readFileSync(path.join(dir, f), 'utf8');
    if (f === 'index.ts' || (!/defineType\(|type\s*:\s*['"]document['"]/.test(src) && /export\s+const\s+\w+\s*=\s*defineField\(/.test(src))) continue;
    const p = parseType(src);
    if (!p || !p.type) continue;
    for (const r of p.refs) { if (helpers[r]) p.fields.push(helpers[r]); else p.unresolved++; }
    out[p.type] = { type: p.type, fields: p.fields, unresolved: p.unresolved, file: f };
  }
  return out;
}

export function compare(declared, docs) {
  const held = {};
  for (const d of docs) for (const k of Object.keys(d)) if (!SYSTEM_KEYS.has(k)) held[k] = (held[k] || 0) + 1;
  const decl = new Set(declared.fields);
  return {
    documents: docs.length,
    undeclared: Object.entries(held).filter(([k]) => !decl.has(k)).sort((a, b) => b[1] - a[1]).map(([key, count]) => ({ key, count })),
    unfilled: declared.fields.filter((f) => !held[f]),
    unresolved: declared.unresolved,
  };
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const a = args();
  const dir = typeof a.schema === 'string' ? a.schema : 'sanity/schemaTypes';
  if (!fs.existsSync(dir)) fail('schema folder not found: ' + dir);
  const schema = readSchema(dir);
  const types = typeof a.type === 'string' ? [a.type] : Object.keys(schema);
  if (typeof a.data === 'string') {
    const b = JSON.parse(fs.readFileSync(a.data, 'utf8'));
    const t = typeof a.type === 'string' ? a.type : [...new Set(b.docs.map((d) => d._type))][0];
    if (!schema[t]) fail('type not found in schema: ' + t);
    const r = compare(schema[t], b.docs.filter((d) => d._type === t));
    if (a.json) { console.log(JSON.stringify(r, null, 1)); process.exit(0); }
    console.log(`${t}: ${r.documents} documents, ${schema[t].fields.length} declared fields, ${r.unresolved} unresolved elements`);
    console.log(`stored but not declared (${r.undeclared.length}): ` + (r.undeclared.map((u) => `${u.key} (${u.count})`).join(', ') || 'none'));
    console.log(`declared but filled in no document (${r.unfilled.length}): ` + (r.unfilled.join(', ') || 'none'));
  } else {
    if (a.json) { console.log(JSON.stringify(Object.fromEntries(types.map((t) => [t, schema[t]])), null, 1)); process.exit(0); }
    for (const t of types) {
      const s = schema[t];
      if (!s) { console.log(`${t}: not found`); continue; }
      console.log(`${t} (${s.file}): ${s.fields.length} fields${s.unresolved ? `, ${s.unresolved} unresolved` : ''}: ${s.fields.join(', ')}`);
    }
  }
}
