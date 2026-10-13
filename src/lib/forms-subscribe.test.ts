import { test } from 'node:test';
import assert from 'node:assert/strict';
import { handleSubscribe, isSafeBackPath, type SubscribeDeps } from './forms.ts';

const form = (fields: Record<string, string>) => {
  const f = new FormData();
  for (const [k, v] of Object.entries(fields)) f.append(k, v);
  return f;
};

/** Fake stores that record what they were asked to save. */
function deps(sanity: boolean | 'throw', neon: boolean | 'throw', back?: string | null) {
  const calls = { sanity: [] as string[], neon: [] as string[] };
  const store = (r: boolean | 'throw', log: string[]) => async (email: string) => {
    log.push(email);
    if (r === 'throw') throw new Error('boom');
    return r;
  };
  const d: SubscribeDeps = { saveSanity: store(sanity, calls.sanity), saveNeon: store(neon, calls.neon), back };
  return { d, calls };
}

test('success when both stores accept', async () => {
  const { d, calls } = deps(true, true);
  assert.equal(await handleSubscribe(form({ email: 'a@b.co' }), d), '/footer/subscription?subscribed=1');
  assert.deepEqual(calls, { sanity: ['a@b.co'], neon: ['a@b.co'] });
});

test('success when only Sanity accepts', async () => {
  assert.equal(await handleSubscribe(form({ email: 'a@b.co' }), deps(true, false).d), '/footer/subscription?subscribed=1');
});

test('success when only Neon accepts (Sanity throws)', async () => {
  assert.equal(await handleSubscribe(form({ email: 'a@b.co' }), deps('throw', true).d), '/footer/subscription?subscribed=1');
});

test('error with retry link when no store accepts', async () => {
  assert.equal(
    await handleSubscribe(form({ email: 'a@b.co' }), deps(false, false, '/blog/some-post').d),
    '/contact-error?reason=subscribe-failed&back=%2Fblog%2Fsome-post',
  );
});

test('error when both stores throw', async () => {
  assert.equal(await handleSubscribe(form({ email: 'a@b.co' }), deps('throw', 'throw').d), '/contact-error?reason=subscribe-failed');
});

test('error drops an unsafe back path', async () => {
  for (const back of ['//evil.example/x', 'https://evil.example/', '/\\evil', null, '']) {
    assert.equal(await handleSubscribe(form({ email: 'a@b.co' }), deps(false, false, back).d), '/contact-error?reason=subscribe-failed');
  }
});

test('honeypot: success redirect, nothing saved', async () => {
  const { d, calls } = deps(true, true);
  assert.equal(await handleSubscribe(form({ website: 'spam', email: 'a@b.co' }), d), '/thank-you');
  assert.deepEqual(calls, { sanity: [], neon: [] });
});

test('invalid or missing email: unchanged redirect, nothing saved', async () => {
  for (const email of ['', '   ', 'not-an-email', 'a@b', 'a b@c.co']) {
    const { d, calls } = deps(true, true);
    assert.equal(await handleSubscribe(form({ email }), d), '/footer/subscription?error=invalid-email');
    assert.deepEqual(calls, { sanity: [], neon: [] });
  }
});

test('email is trimmed before saving', async () => {
  const { d, calls } = deps(true, true);
  await handleSubscribe(form({ email: '  a@b.co ' }), d);
  assert.deepEqual(calls.neon, ['a@b.co']);
});

test('isSafeBackPath', () => {
  assert.equal(isSafeBackPath('/blog/x'), true);
  assert.equal(isSafeBackPath('//x.com'), false);
  assert.equal(isSafeBackPath('x'), false);
  assert.equal(isSafeBackPath(undefined), false);
});
