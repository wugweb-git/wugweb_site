import { test } from 'node:test';
import assert from 'node:assert/strict';
import { duplicateWarning, withSeoDuplicateWarnings, DUP_QUERY } from './seoFieldRules.ts';

test('duplicate warning: names the clashing document and type', async () => {
  const msg = await duplicateWarning('seoTitle', 'UX Audits | Wugweb', 'doc1', async () => [{ _type: 'post', title: 'Old audit post' }]);
  assert.equal(typeof msg, 'string');
  assert.match(String(msg), /Same SEO title as “Old audit post” \(post\)/);
});

test('duplicate warning: lowercases the value it looks up and passes the id', async () => {
  let seen: any[] = [];
  await duplicateWarning('seoDescription', '  Mixed Case  ', 'abc', async (...args) => { seen = args; return []; });
  assert.deepEqual(seen, ['seoDescription', 'mixed case', 'abc']);
});

test('duplicate warning: summarises more than two clashes', async () => {
  const msg = await duplicateWarning('seoTitle', 'x', 'id', async () => [{ _type: 'a', title: '1' }, { _type: 'b', title: '2' }, { _type: 'c', title: '3' }]);
  assert.match(String(msg), /and 1 more/);
});

test('duplicate warning: no match, empty value, or a failed lookup → no warning', async () => {
  assert.equal(await duplicateWarning('seoTitle', 'unique', 'id', async () => []), true);
  assert.equal(await duplicateWarning('seoTitle', '   ', 'id', async () => [{ _type: 'post' }]), true);
  assert.equal(await duplicateWarning('seoTitle', 'x', 'id', async () => { throw new Error('offline'); }), true);
});

test('query excludes drafts and the document itself, case-insensitively', () => {
  const q = DUP_QUERY('seoTitle');
  assert.match(q, /!\(_id in path\("drafts\.\*\*"\)\)/);
  assert.match(q, /!\(_id in \[\$id, "drafts\." \+ \$id\]\)/);
  assert.match(q, /lower\(seoTitle\) == \$v/);
});

test('wrapper keeps existing rules and adds exactly one warning rule', () => {
  const required = (r: any) => r.required();
  const types = withSeoDuplicateWarnings([
    { name: 'post', fields: [{ name: 'seoTitle', validation: required }, { name: 'title' }] },
    { name: 'client', fields: [{ name: 'seoTitle' }] },
  ]);
  const calls: string[] = [];
  const rule: any = { required: () => (calls.push('required'), 'R'), custom: () => ({ warning: () => (calls.push('warning'), 'W') }) };
  assert.deepEqual(types[0].fields![0].validation(rule), ['R', 'W']);
  assert.deepEqual(calls, ['required', 'warning']);
  assert.equal(types[0].fields![1].validation, undefined, 'other fields untouched');
  assert.equal(types[1].fields![0].validation, undefined, 'other types untouched');
});
