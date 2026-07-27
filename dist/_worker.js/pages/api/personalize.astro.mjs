globalThis.process ??= {}; globalThis.process.env ??= {};
import { C as Client } from '../../chunks/index_Cq0SGyc6.mjs';
export { renderers } from '../../renderers.mjs';

const GET = async ({ locals }) => {
  const { HYPERDRIVE } = locals.runtime.env;
  const visitorId = locals.visitorId;
  const client = new Client({ connectionString: HYPERDRIVE.connectionString });
  await client.connect();
  try {
    const { rows } = await client.query(
      `select segment, preferences from visitor_profiles where visitor_id = $1`,
      [visitorId]
    );
    return new Response(JSON.stringify(rows[0] ?? null), {
      headers: { "content-type": "application/json" }
    });
  } finally {
    await client.end();
  }
};
const POST = async ({ request, locals }) => {
  const { HYPERDRIVE } = locals.runtime.env;
  const visitorId = locals.visitorId;
  const body = await request.json().catch(() => ({}));
  const client = new Client({ connectionString: HYPERDRIVE.connectionString });
  await client.connect();
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
    await client.end();
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET,
  POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
