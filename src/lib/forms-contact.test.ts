import { test } from 'node:test';
import assert from 'node:assert/strict';
import { contactProblems, handleContact, MESSAGE_MIN_LENGTH, parseContactProblems, type ContactDeps, type ContactFields } from './forms.ts';

const MESSAGE = 'We need a new onboarding flow for our app.';
const valid = { name: 'Asha', email: 'asha@example.com', topic: MESSAGE };

const form = (fields: Record<string, string | string[]>) => {
  const f = new FormData();
  for (const [k, v] of Object.entries(fields)) for (const x of [v].flat()) f.append(k, x);
  return f;
};

function deps(neon: boolean, sanity: 'ok' | 'throw' = 'ok') {
  const saved = { sanity: [] as ContactFields[], neon: [] as ContactFields[] };
  const d: ContactDeps = {
    async saveSanity(f) {
      saved.sanity.push(f);
      if (sanity === 'throw') throw new Error('boom');
    },
    async saveNeon(f) {
      saved.neon.push(f);
      return neon;
    },
  };
  return { d, saved };
}

test('valid submission saved → /thank-you', async () => {
  const { d, saved } = deps(true);
  assert.equal(await handleContact(form({ ...valid, interests: ['Brand', 'Growth'], newsletter: 'yes' }), d), '/thank-you');
  assert.equal(saved.neon.length, 1);
  assert.deepEqual(saved.neon[0].interests, ['Brand', 'Growth']);
  assert.equal(saved.neon[0].newsletter, true);
});

test('Neon fails → /contact-error (no reason)', async () => {
  assert.equal(await handleContact(form(valid), deps(false).d), '/contact-error');
});

test('Sanity mirror throwing does not fail the submission', async () => {
  assert.equal(await handleContact(form(valid), deps(true, 'throw').d), '/thank-you');
});

test('missing name', async () => {
  const { d, saved } = deps(true);
  assert.equal(await handleContact(form({ ...valid, name: '  ' }), d), '/contact-error?reason=missing-name');
  assert.deepEqual(saved, { sanity: [], neon: [] });
});

test('invalid email', async () => {
  for (const email of ['', 'nope', 'a@b', 'a b@c.co']) {
    assert.equal(await handleContact(form({ ...valid, email }), deps(true).d), '/contact-error?reason=invalid-email');
  }
});

test('message too short or missing', async () => {
  for (const topic of ['', 'hi', 'x'.repeat(MESSAGE_MIN_LENGTH - 1), `  ${'x'.repeat(MESSAGE_MIN_LENGTH - 1)}  `]) {
    assert.equal(await handleContact(form({ ...valid, topic }), deps(true).d), '/contact-error?reason=message-too-short');
  }
  assert.equal(await handleContact(form({ ...valid, topic: 'x'.repeat(MESSAGE_MIN_LENGTH) }), deps(true).d), '/thank-you');
});

test('every problem is reported, in form order, and nothing is saved', async () => {
  const { d, saved } = deps(true);
  assert.equal(await handleContact(form({}), d), '/contact-error?reason=missing-name,invalid-email,message-too-short');
  assert.deepEqual(saved, { sanity: [], neon: [] });
});

test('honeypot wins over validation: /thank-you, nothing saved', async () => {
  const { d, saved } = deps(true);
  assert.equal(await handleContact(form({ website: 'spam' }), d), '/thank-you');
  assert.deepEqual(saved, { sanity: [], neon: [] });
});

test('contactProblems / parseContactProblems round-trip, junk ignored', () => {
  const p = contactProblems({ name: '', email: 'x', message: '' });
  assert.deepEqual(parseContactProblems(p.join(',')), p);
  assert.deepEqual(parseContactProblems('missing-name,<script>,subscribe-failed'), ['missing-name']);
  assert.deepEqual(parseContactProblems(null), []);
});
