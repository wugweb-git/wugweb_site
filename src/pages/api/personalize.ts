import type { APIRoute } from 'astro';
import { connect } from '../../lib/db';

// Cloudflare + Neon officially recommend Hyperdrive + a normal Postgres
// driver (this uses `pg`) over Neon's own HTTP/WebSocket driver — it
// gives you connection pooling at the edge and normal SQL/ORM tooling.
// One connection per request; always close it, even on error, or you
// leak connections against the free tier's 100K queries/day.
// Connection resolution (Hyperdrive, else DATABASE_URL) lives in lib/db.

export const GET: APIRoute = async ({ locals }) => {
  const visitorId = locals.visitorId;

  const client = await connect(locals.runtime.env);

  try {
    const { rows } = await client.query(
      `select segment, preferences from visitor_profiles where visitor_id = $1`,
      [visitorId]
    );
    return new Response(JSON.stringify(rows[0] ?? null), {
      headers: { 'content-type': 'application/json' },
    });
  } finally {
    client.release();
  }
};

export const POST: APIRoute = async ({ request, locals }) => {
  const visitorId = locals.visitorId;
  const body = (await request.json().catch(() => ({}))) as Record<string, unknown>;

  const client = await connect(locals.runtime.env);

  try {
    await client.query(
      `insert into visitor_profiles (visitor_id, segment, preferences, updated_at)
       values ($1, $2, $3, now())
       on conflict (visitor_id)
       do update set
         segment = excluded.segment,
         preferences = excluded.preferences,
         updated_at = now()`,
      [visitorId, body.segment ?? null, JSON.stringify(body.preferences ?? {})]
    );
    return new Response(null, { status: 204 });
  } finally {
    client.release();
  }
};
