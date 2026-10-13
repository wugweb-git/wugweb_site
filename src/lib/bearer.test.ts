import { test } from 'node:test';
import assert from 'node:assert/strict';
import { checkBearer, MIN_TOKEN_LENGTH } from './bearer.ts';

const TOKEN = 'a'.repeat(MIN_TOKEN_LENGTH) + '-xyz';

test('correct bearer token → ok', () => {
  assert.equal(checkBearer(`Bearer ${TOKEN}`, TOKEN), 'ok');
  assert.equal(checkBearer(`bearer ${TOKEN}`, TOKEN), 'ok'); // scheme is case-insensitive
});

test('missing, empty or malformed header → denied', () => {
  for (const h of [null, undefined, '', 'Bearer', 'Bearer ', TOKEN, `Basic ${TOKEN}`, `Bearer ${TOKEN} extra`]) {
    assert.equal(checkBearer(h, TOKEN), 'denied', String(h));
  }
});

test('wrong token → denied (including prefix and different length)', () => {
  assert.equal(checkBearer(`Bearer ${TOKEN}x`, TOKEN), 'denied');
  assert.equal(checkBearer(`Bearer ${TOKEN.slice(0, -1)}`, TOKEN), 'denied');
  assert.equal(checkBearer(`Bearer ${'b'.repeat(TOKEN.length)}`, TOKEN), 'denied');
});

test('fails closed when the server token is unset or too short', () => {
  for (const expected of [undefined, null, '', 'short-token']) {
    assert.equal(checkBearer('Bearer short-token', expected), 'unconfigured');
    assert.equal(checkBearer(`Bearer ${TOKEN}`, expected), 'unconfigured');
  }
});
