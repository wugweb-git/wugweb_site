import type { APIRoute } from 'astro';
import { connect } from '../../lib/db';

// Same Hyperdrive + pg pattern as /api/personalize.ts. Stores leads in
// Neon so they're queryable later (this is the "basic admin feature"
// from way back — viewing leads means querying this table directly for
// now; no admin UI built for it yet).

export const prerender = false;

export const POST: APIRoute = async ({ request, locals, redirect }) => {
  const form = await request.formData();

  const name = form.get('name')?.toString() ?? '';
  const company = form.get('company')?.toString() ?? '';
  const interests = form.getAll('interests').map(String);
  const topic = form.get('topic')?.toString() ?? '';
  const budget = form.get('budget')?.toString() ?? '';
  const contactMethod = form.get('contactMethod')?.toString() ?? '';
  const newsletter = form.get('newsletter') === 'yes';

  const client = await connect(locals.runtime.env);

  try {
    await client.query(
      `insert into contact_submissions
         (name, company, interests, topic, budget, contact_method, newsletter_opt_in)
       values ($1, $2, $3, $4, $5, $6, $7)`,
      [name, company, interests, topic, budget, contactMethod, newsletter]
    );
  } finally {
    await client.end();
  }

  // No confirmation page built yet — redirects home. A real "thanks,
  // we'll be in touch" page is a quick follow-up, not built here.
  return redirect('/?submitted=1');
};
