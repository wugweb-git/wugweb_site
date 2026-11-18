#!/usr/bin/env node
// Apply a plan made by plan-patch.mjs. Only on the owner's go for that plan.
//
//   node apply-plan.mjs --plan <file>          prints the mutations it would send; writes nothing
//   node apply-plan.mjs --plan <file> --go     sends them
//
// Sends only patch mutations with set or unset on the plan's one field, each with ifRevisionID.
// Refuses creates, deletes, replaces, other fields, a missing backup or a backup whose hash differs.
// The result log path is worked out and reserved before anything is sent; if the log already
// exists the script stops with nothing sent.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { args, repoRoot, readEnv, mutate, hashDocs, fail } from './lib.mjs';

export function buildMutations(plan) {
  if (plan.kind !== 'wugweb-engineer plan') throw new Error('not a wugweb-engineer plan');
  const field = plan.field;
  if (!field || field.startsWith('_') || !/^[A-Za-z]\w*$/.test(field)) throw new Error('plan field is not a top-level, non-system field');
  const muts = [];
  for (const i of plan.items) {
    if (i.field !== field) throw new Error(`item ${i._id} names field ${i.field}, plan names ${field}`);
    if (i.noChange) continue;
    if (!i._id || !i._rev) throw new Error(`item without _id or _rev`);
    if (i.op === 'set') muts.push({ patch: { id: i._id, ifRevisionID: i._rev, set: { [field]: i.proposed } } });
    else if (i.op === 'unset') muts.push({ patch: { id: i._id, ifRevisionID: i._rev, unset: [field] } });
    else throw new Error(`item ${i._id} has op ${i.op}; only set and unset are allowed`);
  }
  for (const m of muts) {
    const keys = Object.keys(m);
    if (keys.length !== 1 || keys[0] !== 'patch') throw new Error('only patch mutations are allowed');
    const p = m.patch;
    const extra = Object.keys(p).filter((k) => !['id', 'ifRevisionID', 'set', 'unset'].includes(k));
    if (extra.length) throw new Error('patch holds ' + extra.join(', '));
    if (p.set && Object.keys(p.set).some((k) => k !== field)) throw new Error('patch sets another field');
    if (p.unset && p.unset.some((k) => k !== field)) throw new Error('patch unsets another field');
  }
  return muts;
}

export function chunk(list, n = 50) {
  const out = [];
  for (let i = 0; i < list.length; i += n) out.push(list.slice(i, i + n));
  return out;
}

// The result log sits beside the plan: <backup>.json.plan.json gives <backup>.json.result.json.
export const resultPath = (planPath) => planPath.replace(/\.plan\.json$/, '') + '.result.json';

// Reserve the result log before any change is sent. Throws if it exists or cannot be written.
export function reserveLog(planPath, result) {
  const out = resultPath(planPath);
  if (fs.existsSync(out)) throw new Error('result log exists: ' + out + '; nothing sent. This plan was applied or started before: read that log, then take a new backup and re-plan.');
  try { fs.writeFileSync(out, JSON.stringify(result, null, 1), { flag: 'wx' }); }
  catch (e) { throw new Error('cannot write the result log ' + out + ' (' + e.code + '); nothing sent'); }
  return out;
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const a = args();
  if (typeof a.plan !== 'string') fail('give --plan <file>');
  const plan = JSON.parse(fs.readFileSync(a.plan, 'utf8'));
  const bpath = [plan.backup, path.resolve(path.dirname(a.plan), path.basename(plan.backup || ''))].find((p) => p && fs.existsSync(p));
  if (!bpath) fail('backup named in the plan not found: ' + plan.backup);
  const backup = JSON.parse(fs.readFileSync(bpath, 'utf8'));
  if (hashDocs(backup.docs) !== plan.backupSha256) fail('backup contents differ from the hash in the plan');
  let muts;
  try { muts = buildMutations(plan); } catch (e) { fail(e.message); }
  console.log(`${muts.length} patch ${muts.length === 1 ? 'mutation' : 'mutations'} on field ${plan.field}; ${plan.counts.noChange} ${plan.counts.noChange === 1 ? 'document needs' : 'documents need'} no change`);
  if (!a.go) {
    for (const m of muts.slice(0, 5)) console.log(JSON.stringify(m));
    if (muts.length > 5) console.log(`... ${muts.length - 5} more`);
    console.log('dry run: nothing sent. Add --go only after the owner says go to this plan.');
    process.exit(0);
  }
  const env = readEnv(repoRoot());
  const result = { plan: a.plan, field: plan.field, startedAt: new Date().toISOString(), written: [], clashed: [], failed: [], transactions: [] };
  let out;
  try { out = reserveLog(a.plan, result); } catch (e) { fail(e.message); }
  const save = () => fs.writeFileSync(out, JSON.stringify(result, null, 1));
  for (const batch of chunk(muts)) {
    const ids = batch.map((m) => m.patch.id);
    const r = await mutate(env, batch);
    if (r.ok) { result.written.push(...ids); result.transactions.push(r.body.transactionId); }
    else if (r.status === 409 || /revision/i.test(JSON.stringify(r.body))) result.clashed.push(...ids);
    else { result.failed.push(...ids); console.error(`batch failed (${r.status}): ${JSON.stringify(r.body).slice(0, 300)}`); }
    save();
  }
  result.finishedAt = new Date().toISOString();
  save();
  console.log(`written ${result.written.length}, clashed ${result.clashed.length}, failed ${result.failed.length}; log ${out}`);
  if (result.clashed.length) console.log('revision clash: take a new backup, re-plan and ask again for those documents.');
  process.exit(result.failed.length ? 1 : 0);
}
