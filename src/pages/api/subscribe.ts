import type { APIRoute } from 'astro';
import { connect } from '../../lib/db';
import { getPreviewClient, sanityTokenFrom } from '../../lib/sanity';
import { handleSubscribe } from '../../lib/forms';

// Newsletter subscribe. Mirrors the /api/contact pattern: Neon is the
// structured store (contact_submissions.newsletter_opt_in = true), Sanity
// gets a contactSubmission doc so it shows up in Studio.
//
// Until 2026-10-13 this always redirected to "subscribed": the Sanity write
// used the token-less CDN client (so it always failed) and the Neon write was
// best-effort. Now success needs at least one store to accept the email;
// otherwise the visitor gets /contact-error?reason=subscribe-failed with a
// retry link. Logic and tests: src/lib/forms.ts.

export const prerender = false;

/** Path of the page the form was posted from, if it is on this site. */
function backPath(request: Request): string | null {
  try {
    const ref = new URL(request.headers.get('Referer') ?? '');
    return ref.origin === new URL(request.url).origin ? ref.pathname : null;
  } catch {
    return null;
  }
}

export const POST: APIRoute = async ({ request, locals, redirect }) => {
  const form = await request.formData();
  const env = locals.runtime?.env ?? {};

  const to = await handleSubscribe(form, {
    back: backPath(request),
    async saveSanity(email) {
      const token = sanityTokenFrom(env);
      if (!token) {
        console.error('subscribe: Sanity write SKIPPED — no SANITY_SYNC_TOKEN/SANITY_TOKEN binding.');
        return false;
      }
      try {
        await getPreviewClient(token).create({
          _type: 'contactSubmission',
          name: '',
          company: 'Newsletter',
          email,
          newsletterOptIn: true,
          submittedAt: new Date().toISOString(),
        });
        return true;
      } catch (e) {
        console.error('subscribe: Sanity write failed', e);
        return false;
      }
    },
    async saveNeon(email) {
      const client = await connect(env).catch(() => null);
      if (!client) {
        console.error('subscribe: Neon connection failed');
        return false;
      }
      try {
        await client.query(
          `insert into contact_submissions
             (name, company, email, interests, topic, budget, contact_method, newsletter_opt_in)
           values ($1, $2, $3, $4, $5, $6, $7, $8)`,
          ['', 'Newsletter', email, [], 'Newsletter subscription', null, 'Email', true]
        );
        return true;
      } catch (e) {
        console.error('subscribe: Neon write failed', e);
        return false;
      } finally {
        client.release();
      }
    },
  });

  return redirect(to);
};
