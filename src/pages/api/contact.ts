import type { APIRoute } from 'astro';
import { connect } from '../../lib/db';
import { sanityClient } from '../../lib/sanity';

// Same Hyperdrive + pg pattern as /api/personalize.ts. Stores leads in
// Neon so they're queryable later, and mirrors each submission into a
// Sanity `contactSubmission` doc so it shows up in Studio (Editorial →
// Contact Submissions). Neon stays the structured store; Sanity is the
// admin surface.

export const prerender = false;

export const POST: APIRoute = async ({ request, locals, redirect }) => {
  const form = await request.formData();

  const name = form.get('name')?.toString() ?? '';
  const company = form.get('company')?.toString() ?? '';
  const interests = form.getAll('interests').map(String);
  const topic = form.get('topic')?.toString() ?? '';
  const budget = form.get('budget')?.toString() ?? '';
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
    interests,
    contactMethod,
    newsletterOptIn: newsletter,
    submittedAt: new Date().toISOString(),
  };
  try {
    await sanityClient.create(submissionDoc);
  } catch (e) {
    console.error('contact: Sanity mirror failed', e);
  }

  const client = await connect(locals.runtime.env);

  try {
    await client.query(
      `insert into contact_submissions
         (name, company, interests, topic, budget, email, phone, contact_method, newsletter_opt_in)
       values ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
      [name, company, interests, topic, budget, email, phone, contactMethod, newsletter]
    );
  } finally {
    await client.end();
  }

  return redirect('/thank-you');
};
