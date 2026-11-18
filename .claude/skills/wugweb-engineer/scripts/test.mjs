#!/usr/bin/env node
// Offline tests: the plan, the apply guards, the schema parse, the script scan and the
// standing-rules copy. No network. Exit 1 on any failure.
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildPlan, table, withKeys } from './plan-patch.mjs';
import { buildMutations, chunk } from './apply-plan.mjs';
import { parseType, compare, readSchema } from './schema-fields.mjs';
import { classify } from './scan-scripts.mjs';
import { rulesBlock, render } from './build.mjs';
import { hashDocs, typesInQuery, canon, token, TOKEN_NAME, repoRoot } from './lib.mjs';

const dir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
let fail = 0;
const t = (ok, msg) => { console.log((ok ? 'pass  ' : 'FAIL  ') + msg); if (!ok) fail++; };
const throws = (fn) => { try { fn(); return false; } catch { return true; } };

// Fixture: four posts, one already right, one draft.
const docs = [
  { _id: 'post-a', _rev: 'r1', _type: 'post', schemaType: 'TechArticle', title: 'A' },
  { _id: 'drafts.post-a', _rev: 'r2', _type: 'post', schemaType: 'TechArticle', title: 'A' },
  { _id: 'post-b', _rev: 'r3', _type: 'post', schemaType: 'BlogPosting', title: 'B' },
  { _id: 'post-c', _rev: 'r4', _type: 'post', title: 'C' },
];
const backup = { docs, sha256: hashDocs(docs) };

const plan = buildPlan(backup, 'b.json', { field: 'schemaType', set: 'BlogPosting' });
t(plan.counts.change === 3 && plan.counts.noChange === 1, 'set plan: 3 to change, 1 already right');
t(plan.items.find((i) => i._id === 'drafts.post-a') && !plan.items.find((i) => i._id === 'drafts.post-a').noChange, 'set plan keeps the draft');
t(plan.backupSha256 === backup.sha256, 'plan carries the backup hash');
t(/\| post-a \| schemaType \| TechArticle \| BlogPosting \|/.test(table(plan)), 'table shows current -> proposed');

t(throws(() => buildPlan(backup, 'b.json', { field: '_id', set: 'x' })), 'refuses a system field');
t(throws(() => buildPlan(backup, 'b.json', { field: 'seo.title', set: 'x' })), 'refuses a nested path');
t(throws(() => buildPlan(backup, 'b.json', { field: 'schemaType', set: 'x', unset: true })), 'refuses two modes at once');
t(throws(() => buildPlan({ docs: [{ _id: 'x' }] }, 'b.json', { field: 'title', set: 'x' })), 'refuses a document without _rev');

const unset = buildPlan(backup, 'b.json', { field: 'schemaType', unset: true });
t(unset.counts.change === 3 && unset.items.find((i) => i._id === 'post-c').noChange, 'unset plan skips documents without the field');

// Undo: current state after the change, restore from the old backup.
const after = docs.map((d, i) => ({ ...d, _rev: 'n' + i, schemaType: 'BlogPosting' }));
const undo = buildPlan({ docs: after }, 'now.json', { field: 'schemaType', restore: backup, restoreFile: 'b.json' });
t(undo.items.find((i) => i._id === 'post-a').proposed === 'TechArticle' && undo.items.find((i) => i._id === 'post-a')._rev === 'n0', 'undo restores the old value with the current revision');
t(undo.items.find((i) => i._id === 'post-c').op === 'unset', 'undo unsets a field the old backup did not have');

// Per-document values (item G shape: each service gets its own faqs list).
const svc = { docs: [
  { _id: 'service-brand', _rev: 's1', _type: 'service' },
  { _id: 'drafts.service-brand', _rev: 's2', _type: 'service' },
  { _id: 'service-growth', _rev: 's3', _type: 'service' },
] };
const vplan = buildPlan(svc, 's.json', { field: 'faqs', values: { 'service-brand': [{ q: 'Do you design logos only?', a: 'No.' }] } });
const brand = vplan.items.find((i) => i._id === 'service-brand');
t(vplan.counts.change === 2 && vplan.items.find((i) => i._id === 'service-growth').noChange, 'values plan: draft takes the published value, others left alone');
t(Array.isArray(brand.proposed) && /^[0-9a-f]{12}$/.test(brand.proposed[0]._key), 'values plan adds a stable _key to array objects');
t(withKeys([{ q: 'a' }])[0]._key === withKeys([{ q: 'a' }])[0]._key && withKeys([{ _key: 'k', q: 'a' }])[0]._key === 'k', 'keys are stable and existing keys are kept');
t(throws(() => buildPlan(svc, 's.json', { field: 'faqs', values: [] })), 'values must be an object');

const muts = buildMutations(plan);
t(muts.length === 3 && muts.every((m) => Object.keys(m)[0] === 'patch' && m.patch.ifRevisionID), 'apply builds guarded patches only');
t(muts.every((m) => Object.keys(m.patch.set).join() === 'schemaType'), 'apply touches the one field');
const bad = JSON.parse(JSON.stringify(plan)); bad.items[0].op = 'delete';
t(throws(() => buildMutations(bad)), 'apply refuses a delete op');
const other = JSON.parse(JSON.stringify(plan)); other.items[0].field = 'title';
t(throws(() => buildMutations(other)), 'apply refuses another field');
t(throws(() => buildMutations({ ...plan, kind: 'x' })), 'apply refuses a non-plan file');
t(chunk(Array.from({ length: 120 }), 50).map((c) => c.length).join() === '50,50,20', 'batches of 50');

t(TOKEN_NAME === 'SANITY_SYNC_TOKEN' && token({ SANITY_SYNC_TOKEN: 'x' }) === 'x' && token({ SANITY_TOKEN: 'x', SANITY_API_TOKEN: 'y' }) === '', 'token reads SANITY_SYNC_TOKEN only');
t(hashDocs([{ b: 1, a: 2 }]) === hashDocs([{ a: 2, b: 1 }]) && canon({ b: 1, a: 2 }) === '{"a":2,"b":1}', 'hash ignores key order');
t(typesInQuery('*[_type in ["post", "contactSubmission"]]').includes('contactSubmission'), 'query type scan sees _type in [...]');

// Schema parse.
const src = `import {defineType, defineField} from 'sanity'
export default defineType({
  name: 'post', type: 'document', groups: [{ name: 'seo', title: 'SEO' }],
  fields: [
    defineField({ name: 'title', type: 'string' }),
    { name: 'tags', type: 'array', of: [{ type: 'object', fields: [{ name: 'inner', type: 'string' }] }] },
    ...ownerFields,
    defineField({ name: 'seoTitle', type: 'string', group: 'seo' }), // a comment with name: 'fake'
  ],
  orderings: [{ name: 'byTitle', by: [] }],
})`;
const p = parseType(src);
t(p.type === 'post' && p.fields.join() === 'title,tags,seoTitle', 'schema parse reads top-level fields only');
t(p.unresolved === 0 && p.refs.join() === 'ownerFields', 'schema parse records a spread for helper lookup');
{
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'wd-schema-'));
  fs.writeFileSync(path.join(tmp, 'ownerField.ts'), "import { defineField } from 'sanity';\nexport const ownerFields = defineField({ name: 'owner', type: 'string' });\n");
  fs.writeFileSync(path.join(tmp, 'post.ts'), src);
  const s = readSchema(tmp);
  t(!s.owner && s.post.fields.includes('owner') && s.post.unresolved === 0, 'schema read resolves a helper field and skips the helper file');
}
const c = compare(p, [{ _id: 'x', _type: 'post', title: 'a', aiSummary: 's' }, { _id: 'y', _type: 'post', aiSummary: 't' }]);
t(c.undeclared.length === 1 && c.undeclared[0].key === 'aiSummary' && c.undeclared[0].count === 2, 'compare finds a stored key the schema lacks');
t(c.unfilled.join() === 'tags,seoTitle', 'compare finds declared fields no document fills');

// Script scan.
t(classify('a.mjs', "const WRITE = process.env.WRITE === '1'; await client.patch(id).commit()").status === 'dry run by default', 'scan: WRITE=1 is dry run by default');
t(classify('b.mjs', "const DRY_RUN = process.env.DRY_RUN === '1'; await client.createOrReplace(d)").status === 'writes by default', 'scan: DRY_RUN=1 means writes by default');
t(classify('c.mjs', 'await client.createOrReplace(d)').status === 'writes with no switch', 'scan: no switch');
t(classify('d.mjs', '// Run by the OWNER, not Claude.\nawait fetch(u, { method: "DELETE" })').status === 'owner only', 'scan: owner only');
t(classify('e.mjs', 'const r = await client.fetch(q); console.log(r)').status === 'read only', 'scan: read only');

// Backup guard for personal data: run the script with a contactSubmission query inside the repo.
const { spawnSync } = await import('node:child_process');
if (repoRoot(dir)) {
  const r = spawnSync(process.execPath, [path.join(dir, 'scripts', 'backup.mjs'), '--query', '*[_type == "contactSubmission"]', '--label', 'x'], { cwd: dir, encoding: 'utf8' });
  t(r.status !== 0 && /personal data/.test(r.stderr), 'backup refuses personal data inside the repo before any network call');
} else console.log('skip  personal-data guard: not inside the site repo');
const r2 = spawnSync(process.execPath, [path.join(dir, 'scripts', 'apply-plan.mjs'), '--plan', path.join(os.tmpdir(), 'missing.plan.json')], { cwd: dir, encoding: 'utf8' });
t(r2.status !== 0, 'apply stops on a missing plan');

// Examples: the shipped plan files match what the scripts make from the shipped backups.
for (const [b, opts] of [['posts-schematype.backup.json', { field: 'schemaType', set: 'BlogPosting' }], ['service-faqs.backup.json', { field: 'faqs', values: JSON.parse(fs.readFileSync(path.join(dir, 'examples', 'service-faqs.values.json'), 'utf8')), valuesFile: 'service-faqs.values.json' }]]) {
  const bk = JSON.parse(fs.readFileSync(path.join(dir, 'examples', b), 'utf8'));
  const shipped = JSON.parse(fs.readFileSync(path.join(dir, 'examples', b + '.plan.json'), 'utf8'));
  const made = buildPlan(bk, b, opts);
  t(bk.sha256 === hashDocs(bk.docs) && canon(JSON.parse(JSON.stringify(made.items))) === canon(shipped.items), `example ${b}: hash holds and the plan matches`);
}

// Standing-rules copy.
let rules = null;
try { rules = rulesBlock(); } catch { /* outside the repo */ }
if (rules) {
  const agents = fs.readFileSync(path.join(dir, 'AGENTS.md'), 'utf8');
  t(agents.includes(rules), 'standing rules: AGENTS.md carries the home file unchanged');
  t(agents === render('agents'), 'standing rules: AGENTS.md is fresh');
  t(fs.readFileSync(path.join(dir, 'export', 'wugweb-engineer.md'), 'utf8').includes(rules), 'standing rules: export carries the home file unchanged');
  t(fs.readFileSync(path.join(dir, 'export', 'wugweb-engineer.md'), 'utf8') === render('export'), 'standing rules: export is fresh');
} else console.log('skip  standing rules: home file not found (outside the repo)');

console.log(fail ? `\n${fail} failed` : '\nall passed');
process.exit(fail ? 1 : 0);
