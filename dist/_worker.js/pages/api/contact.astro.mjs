globalThis.process ??= {}; globalThis.process.env ??= {};
import { C as Client } from '../../chunks/index_Cq0SGyc6.mjs';
export { renderers } from '../../renderers.mjs';

const prerender = false;
const POST = async ({ request, locals, redirect }) => {
  const { HYPERDRIVE } = locals.runtime.env;
  const form = await request.formData();
  const name = form.get("name")?.toString() ?? "";
  const company = form.get("company")?.toString() ?? "";
  const interests = form.getAll("interests").map(String);
  const topic = form.get("topic")?.toString() ?? "";
  const budget = form.get("budget")?.toString() ?? "";
  const contactMethod = form.get("contactMethod")?.toString() ?? "";
  const newsletter = form.get("newsletter") === "yes";
  const client = new Client({ connectionString: HYPERDRIVE.connectionString });
  await client.connect();
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
  return redirect("/?submitted=1");
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
