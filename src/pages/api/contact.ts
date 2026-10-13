import type { APIRoute } from 'astro';
import { connect } from '../../lib/db';
import { getPreviewClient, sanityTokenFrom } from '../../lib/sanity';
import { handleContact, type ContactFields } from '../../lib/forms';

// Stores leads in Neon so they're queryable later, and mirrors each submission into a
// Sanity `contactSubmission` doc so it shows up in Studio (Editorial →
// Contact Submissions). Neon stays the structured store; Sanity is the
// admin surface.
//
// Validation (name, valid email, message ≥ MESSAGE_MIN_LENGTH), the honeypot
// and the success/failure decision live in src/lib/forms.ts (unit-tested).
// A failed check redirects to /contact-error?reason=<problems>.

export const prerender = false;

export const POST: APIRoute = async ({ request, locals, redirect }) => {
  const form = await request.formData();
  const env = locals.runtime?.env ?? {};

  const to = await handleContact(form, {
    // Mirror to Sanity so the lead is visible in Studio. Best-effort: a
    // Sanity hiccup must not lose the Neon row or fail the redirect.
    //
    // `if (token)` used to skip silently when the token was missing, which is
    // how this went unnoticed: verified in production 2026-09-25, the endpoint
    // returned its success redirect while writing NOTHING to Sanity, because
    // SANITY_SYNC_TOKEN was not bound on the Pages environment. A missing
    // binding is a misconfiguration, so it is logged at error volume.
    async saveSanity(f: ContactFields) {
      const token = sanityTokenFrom(env);
      if (!token) {
        console.error(
          'contact: Sanity mirror SKIPPED — no SANITY_SYNC_TOKEN/SANITY_TOKEN binding. ' +
          'The lead is in Neon but will not appear in Studio. Set the secret on the ' +
          'Pages environment (production AND preview).'
        );
        return;
      }
      await getPreviewClient(token).create({
        _type: 'contactSubmission',
        name: f.name,
        company: f.company,
        email: f.email,
        phone: f.phone,
        topic: f.topic,
        budget: f.budget,
        timeline: f.timeline,
        interests: f.interests,
        contactMethod: f.contactMethod,
        newsletterOptIn: f.newsletter,
        submittedAt: new Date().toISOString(),
      });
    },
    // Neon is the real structured store — unlike the Sanity mirror, a failure
    // here means the lead genuinely isn't captured anywhere, so it gets a real
    // error state instead of a /thank-you that quietly lies.
    async saveNeon(f: ContactFields) {
      const client = await connect(env).catch(() => null);
      if (!client) {
        console.error('contact: Neon connection failed');
        return false;
      }
      try {
        await client.query(
          `insert into contact_submissions
             (name, company, interests, topic, budget, email, phone, contact_method, newsletter_opt_in)
           values ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
          [f.name, f.company, f.interests, f.topic, f.budget, f.email, f.phone, f.contactMethod, f.newsletter]
        );
        return true;
      } catch (e) {
        console.error('contact: Neon write failed', e);
        return false;
      } finally {
        client.release();
      }
    },
  });

  return redirect(to);
};
