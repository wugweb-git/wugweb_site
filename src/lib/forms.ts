/**
 * Contact + newsletter form handling — pure. The stores (Sanity, Neon) are
 * injected, so validation and the success/failure decision unit-test with
 * plain `node --test` (see forms.test.ts). The API routes only wire env.
 *
 * Each handler returns the path to redirect to. CSRF is not handled here:
 * Astro's origin check rejects cross-site POSTs before the route runs.
 */

export const MESSAGE_MIN_LENGTH = 20;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const isValidEmail = (email: string): boolean => EMAIL_RE.test(email);

export type ContactProblem = 'missing-name' | 'invalid-email' | 'message-too-short';

/** Every problem, in form order, so the visitor can fix them in one go. */
export function contactProblems(fields: { name: string; email: string; message: string }): ContactProblem[] {
  const out: ContactProblem[] = [];
  if (!fields.name.trim()) out.push('missing-name');
  if (!isValidEmail(fields.email.trim())) out.push('invalid-email');
  if (fields.message.trim().length < MESSAGE_MIN_LENGTH) out.push('message-too-short');
  return out;
}

export interface ContactFields {
  name: string;
  company: string;
  email: string;
  phone: string;
  /** The "message" textarea — the form posts it as `topic`. */
  topic: string;
  budget: string;
  timeline: string;
  interests: string[];
  contactMethod: string;
  newsletter: boolean;
}

const str = (form: FormData, key: string) => form.get(key)?.toString() ?? '';

export function readContact(form: FormData): ContactFields {
  return {
    name: str(form, 'name').trim(),
    company: str(form, 'company'),
    email: str(form, 'email').trim(),
    phone: str(form, 'phone'),
    topic: str(form, 'topic'),
    budget: str(form, 'budget'),
    timeline: str(form, 'timeline'),
    interests: form.getAll('interests').map(String),
    contactMethod: str(form, 'contactMethod'),
    newsletter: form.get('newsletter') === 'yes',
  };
}

export interface ContactDeps {
  /** Best-effort Studio mirror; may throw, never fails the submission. */
  saveSanity(fields: ContactFields): Promise<void>;
  /** The real store. true only if the row was written. */
  saveNeon(fields: ContactFields): Promise<boolean>;
}

export async function handleContact(form: FormData, deps: ContactDeps): Promise<string> {
  // Honeypot: silently drop bot submissions that fill the hidden field.
  if (str(form, 'website')) return '/thank-you';

  const fields = readContact(form);
  const problems = contactProblems({ name: fields.name, email: fields.email, message: fields.topic });
  if (problems.length) return `/contact-error?reason=${problems.join(',')}`;

  try {
    await deps.saveSanity(fields);
  } catch (e) {
    console.error('contact: Sanity mirror failed', e);
  }
  return (await deps.saveNeon(fields)) ? '/thank-you' : '/contact-error';
}

export interface SubscribeDeps {
  /** true only if the store accepted the data. Must not throw, but a throw counts as false. */
  saveSanity(email: string): Promise<boolean>;
  saveNeon(email: string): Promise<boolean>;
  /** Same-origin path the form was posted from, for the retry link. */
  back?: string | null;
}

/** A path on this site, not `//host` or a full URL — safe to put in a link. */
export const isSafeBackPath = (p: unknown): p is string =>
  typeof p === 'string' && p.startsWith('/') && !p.startsWith('//') && !p.includes('\\');

export async function handleSubscribe(form: FormData, deps: SubscribeDeps): Promise<string> {
  // Honeypot — silently accept so bots think they succeeded.
  if (str(form, 'website')) return '/thank-you';

  const email = str(form, 'email').trim();
  if (!email || !isValidEmail(email)) return '/footer/subscription?error=invalid-email';

  // Both stores are tried; success needs at least one to have accepted it.
  const safe = (p: Promise<boolean>) => p.then((ok) => ok === true, () => false);
  const [sanityOk, neonOk] = await Promise.all([safe(deps.saveSanity(email)), safe(deps.saveNeon(email))]);
  if (sanityOk || neonOk) return '/footer/subscription?subscribed=1';

  console.error('subscribe: no store accepted the email (Sanity and Neon both failed)');
  const back = isSafeBackPath(deps.back) ? `&back=${encodeURIComponent(deps.back)}` : '';
  return `/contact-error?reason=subscribe-failed${back}`;
}

/** Copy for /contact-error, keyed by reason. Unknown or missing → the server-error copy. */
export const FIELD_PROBLEM_TEXT: Record<ContactProblem, string> = {
  'missing-name': 'Add your name.',
  'invalid-email': 'Add a valid email address so we can reply.',
  'message-too-short': `Tell us a little more: the message needs at least ${MESSAGE_MIN_LENGTH} characters.`,
};

export function parseContactProblems(reason: string | null | undefined): ContactProblem[] {
  return String(reason ?? '')
    .split(',')
    .filter((r): r is ContactProblem => r in FIELD_PROBLEM_TEXT);
}
