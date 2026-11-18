#!/usr/bin/env node
// Build a one-field plan from a backup. Writes nothing to Sanity.
//
//   node plan-patch.mjs --backup <file> --field <name> --set '<json value>'
//   node plan-patch.mjs --backup <file> --field <name> --unset
//   node plan-patch.mjs --backup <current backup> --field <name> --restore <older backup>
//   node plan-patch.mjs --backup <file> --field <name> --values <values.json>
//
// --values takes a JSON file of { "<document id>": <value> }, one value per document, for a change
// where each document gets its own value (for example each service page's faqs list). A draft takes
// the value of its published id. A document with no entry is left alone. Objects inside an array
// that have no _key get a stable one, made from their content, because Sanity needs it.
//
// The field is a top-level field name. Output: <backup>.plan.json and a current -> proposed table.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { args, hashDocs, same, mdCell, fail, canon, sha256 } from './lib.mjs';

export function withKeys(v) {
  if (Array.isArray(v)) return v.map((x) => (x && typeof x === 'object' && !Array.isArray(x) && !x._key ? { _key: sha256(canon(x)).slice(0, 12), ...withKeys(x) } : withKeys(x)));
  if (v && typeof v === 'object') return Object.fromEntries(Object.entries(v).map(([k, x]) => [k, withKeys(x)]));
  return v;
}

export function buildPlan(backup, backupFile, { field, set, unset, restore, restoreFile, values, valuesFile }) {
  if (!field || !/^[A-Za-z][\w]*$/.test(field) || field.startsWith('_')) throw new Error('field must be one top-level, non-system field name');
  const modes = [set !== undefined, !!unset, !!restore, !!values].filter(Boolean).length;
  if (modes !== 1) throw new Error('give exactly one of --set, --unset, --restore, --values');
  if (values && (typeof values !== 'object' || Array.isArray(values))) throw new Error('--values must be a JSON object of document id to value');
  const old = restore ? new Map(restore.docs.map((d) => [d._id, d])) : null;
  const items = [];
  for (const d of backup.docs) {
    if (!d._id || !d._rev) throw new Error('backup document without _id or _rev; back up whole documents');
    let op, proposed;
    if (restore) {
      if (!old.has(d._id)) { items.push({ _id: d._id, _rev: d._rev, field, current: d[field], proposed: d[field], noChange: true, note: 'not in the older backup' }); continue; }
      const was = old.get(d._id)[field];
      op = was === undefined ? 'unset' : 'set';
      proposed = was;
    } else if (values) {
      const pub = d._id.replace(/^drafts\./, '');
      const has = Object.prototype.hasOwnProperty.call(values, d._id) ? d._id : Object.prototype.hasOwnProperty.call(values, pub) ? pub : null;
      if (!has) { items.push({ _id: d._id, _rev: d._rev, field, current: d[field], proposed: d[field], noChange: true, note: 'no value given' }); continue; }
      op = 'set'; proposed = withKeys(values[has]);
    } else if (unset) { op = 'unset'; proposed = undefined; }
    else { op = 'set'; proposed = withKeys(set); }
    const noChange = op === 'unset' ? d[field] === undefined : same(d[field], proposed);
    items.push({ _id: d._id, _rev: d._rev, field, op, current: d[field], proposed, noChange });
  }
  return {
    kind: 'wugweb-engineer plan',
    madeAt: new Date().toISOString(),
    backup: backupFile,
    backupSha256: backup.sha256 || hashDocs(backup.docs),
    restoreFrom: restoreFile || null,
    valuesFrom: valuesFile || null,
    field,
    counts: { documents: items.length, change: items.filter((i) => !i.noChange).length, noChange: items.filter((i) => i.noChange).length },
    items,
  };
}

export function table(plan, limit = 30) {
  const ch = plan.items.filter((i) => !i.noChange);
  const rows = ch.length <= limit ? ch : ch.slice(0, 10);
  const out = ['| Document | Field | Current | Proposed |', '|---|---|---|---|'];
  for (const i of rows) out.push(`| ${i._id} | ${i.field} | ${mdCell(i.current)} | ${i.op === 'unset' ? '(removed)' : mdCell(i.proposed)} |`);
  if (ch.length > rows.length) {
    out.push(`| ... ${ch.length - rows.length} more in the plan file | | | |`);
    const by = {};
    for (const i of ch) { const k = mdCell(i.current); by[k] = (by[k] || 0) + 1; }
    out.push('', 'By current value: ' + Object.entries(by).map(([k, n]) => `${k} (${n})`).join(', '));
  }
  out.push('', `No change: ${plan.counts.noChange} ${plan.counts.noChange === 1 ? 'document already holds' : 'documents already hold'} the proposed value.`);
  return out.join('\n');
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const a = args();
  if (typeof a.backup !== 'string') fail('give --backup <file>');
  const backup = JSON.parse(fs.readFileSync(a.backup, 'utf8'));
  if (backup.sha256 && backup.sha256 !== hashDocs(backup.docs)) fail('backup hash does not match its contents');
  let set;
  if (typeof a.set === 'string') { try { set = JSON.parse(a.set); } catch { fail('--set takes a JSON value, for example \'"BlogPosting"\''); } }
  const restore = typeof a.restore === 'string' ? JSON.parse(fs.readFileSync(a.restore, 'utf8')) : null;
  const values = typeof a.values === 'string' ? JSON.parse(fs.readFileSync(a.values, 'utf8')) : null;
  let plan;
  try { plan = buildPlan(backup, a.backup, { field: a.field, set, unset: a.unset === true, restore, restoreFile: a.restore, values, valuesFile: a.values }); }
  catch (e) { fail(e.message); }
  const file = a.backup + '.plan.json';
  if (fs.existsSync(file)) fail('plan exists: ' + file);
  fs.writeFileSync(file, JSON.stringify(plan, null, 1), { flag: 'wx' });
  console.log(table(plan));
  console.log(`\nplan ${file}: ${plan.counts.change} to change, ${plan.counts.noChange} no change`);
}
