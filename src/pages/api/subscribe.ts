import type { APIRoute } from 'astro';
import { connect } from '../../lib/db';
import { sanityClient } from '../../lib/sanity';

// Newsletter subscribe. Mirrors the /api/contact pattern: Neon is the
// structured store (contact_submissions.newsletter_opt_in = true), Sanity
// gets a best-effort contactSubmission doc so it shows up in Studio.

export const prerender = false;

export const POST: APIRoute = async ({ request, locals, redirect }) => {
  const form = await request.formData();

  // Honeypot — silently accept so bots think they succeeded.
  if (form.get('website')?.toString()) {
    return redirect('/thank-you');
  }

  const email = form.get('email')?.toString()?.trim() ?? '';

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return redirect('/footer/subscription?error=invalid-email');
  }

  const submissionDoc = {
    _type: 'contactSubmission',
    name: '',
    company: 'Newsletter',
    email,
    newsletterOptIn: true,
    submittedAt: new Date().toISOString(),
  };
  try {
    await sanityClient.create(submissionDoc);
  } catch (e) {
    console.error('subscribe: Sanity mirror failed', e);
  }

  // Best-effort Neon write — never fail the user's redirect on a DB hiccup.
  const client = await connect(locals.runtime.env).catch(() => null);

  if (client) {
    try {
      await client.query(
        `insert into contact_submissions
           (name, company, email, interests, topic, budget, contact_method, newsletter_opt_in)
         values ($1, $2, $3, $4, $5, $6, $7, $8)`,
        ['', 'Newsletter', email, [], 'Newsletter subscription', null, 'Email', true]
      );
    } catch (e) {
      console.error('subscribe: Neon write failed', e);
    } finally {
      await client.end().catch(() => {});
    }
  }

  return redirect('/footer/subscription?subscribed=1');
};
