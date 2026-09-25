import type { APIRoute } from 'astro';
import { connect } from '../../lib/db';
import { getPreviewClient } from '../../lib/sanity';

// Stores leads in Neon so they're queryable later, and mirrors each submission into a
// Sanity `contactSubmission` doc so it shows up in Studio (Editorial →
// Contact Submissions). Neon stays the structured store; Sanity is the
// admin surface.

export const prerender = false;

export const POST: APIRoute = async ({ request, locals, redirect }) => {
  const form = await request.formData();

  // Honeypot: silently drop bot submissions that fill the hidden field.
  if (form.get('website')?.toString()) {
    return redirect('/thank-you');
  }

  const name = form.get('name')?.toString() ?? '';
  const company = form.get('company')?.toString() ?? '';
  const interests = form.getAll('interests').map(String);
  const topic = form.get('topic')?.toString() ?? '';
  const budget = form.get('budget')?.toString() ?? '';
  const timeline = form.get('timeline')?.toString() ?? '';
  // Without these the form captured a lead with no way to reply to it.
  const email = form.get('email')?.toString() ?? '';
  const phone = form.get('phone')?.toString() ?? '';
  const contactMethod = form.get('contactMethod')?.toString() ?? '';
  const newsletter = form.get('newsletter') === 'yes';

  // Mirror to Sanity so the lead is visible in Studio. Best-effort: a
  // Sanity hiccup must not lose the Neon row or fail the redirect.
  const submissionDoc = {
    _type: 'contactSubmission',
    name,
    company,
    email,
    phone,
    topic,
    budget,
    timeline,
    interests,
    contactMethod,
    newsletterOptIn: newsletter,
    submittedAt: new Date().toISOString(),
  };
  //
  // `if (token)` used to skip silently when the token was missing, which is
  // how this went unnoticed: verified in production 2026-09-25, the endpoint
  // returned its success redirect while writing NOTHING to Sanity, because
  // SANITY_SYNC_TOKEN is not bound on the Pages environment. Every submission
  // since the feature shipped reached Neon and never reached the Studio, and
  // nothing anywhere said so — `contactSubmission` sitting at 0 documents read
  // as "no enquiries yet" rather than "the mirror is off".
  //
  // A missing binding is a misconfiguration, not a normal condition, so it is
  // logged at the same volume as a thrown error. Still best-effort: a Sanity
  // problem must not lose the Neon row or fail the visitor's redirect.
  try {
    const token = locals.runtime?.env?.SANITY_SYNC_TOKEN || locals.runtime?.env?.SANITY_TOKEN || (import.meta.env as any)?.SANITY_TOKEN;
    if (!token) {
      console.error(
        'contact: Sanity mirror SKIPPED — no SANITY_SYNC_TOKEN/SANITY_TOKEN binding. ' +
        'The lead is in Neon but will not appear in Studio. Set the secret on the ' +
        'Pages environment (production AND preview).'
      );
    } else {
      const writeClient = getPreviewClient(token);
      await writeClient.create(submissionDoc);
    }
  } catch (e) {
    console.error('contact: Sanity mirror failed', e);
  }

  // Neon is the real structured store (see file header) — unlike the
  // Sanity mirror above, a failure here means the lead genuinely isn't
  // captured anywhere, so it gets a real error state instead of a
  // redirect to /thank-you that quietly lies about what happened.
  const client = await connect(locals.runtime.env).catch(() => null);

  if (!client) {
    console.error('contact: Neon connection failed');
    return redirect('/contact-error');
  }

  try {
    await client.query(
      `insert into contact_submissions
         (name, company, interests, topic, budget, email, phone, contact_method, newsletter_opt_in)
       values ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
      [name, company, interests, topic, budget, email, phone, contactMethod, newsletter]
    );
  } catch (e) {
    console.error('contact: Neon write failed', e);
    return redirect('/contact-error');
  } finally {
    client.release();
  }

  return redirect('/thank-you');
};
