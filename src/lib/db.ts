import { Client } from 'pg';

/**
 * Resolves a Postgres connection for the API routes.
 *
 * Hyperdrive is the preferred path — it pools connections at the edge, which
 * matters on a per-request runtime where every invocation would otherwise open
 * a fresh connection to Neon. But the Hyperdrive binding is not provisioned
 * yet (see wrangler.jsonc), and the routes used to read `HYPERDRIVE.connectionString`
 * unconditionally, so every call threw a TypeError and returned a 500.
 *
 * So: use Hyperdrive when it's bound, otherwise fall back to the plain
 * DATABASE_URL that is already set on the Pages project. Once Hyperdrive is
 * provisioned this picks it up with no code change.
 */
export function connectionStringFrom(env: Record<string, unknown>): string {
  const hyperdrive = env.HYPERDRIVE as { connectionString?: string } | undefined;
  if (hyperdrive?.connectionString) return hyperdrive.connectionString;

  const url = env.DATABASE_URL as string | undefined;
  if (url) return url;

  throw new Error(
    'No database connection available: neither the HYPERDRIVE binding nor DATABASE_URL is set.'
  );
}

/** Opens a connected client. Callers must `end()` it, even on error. */
export async function connect(env: Record<string, unknown>): Promise<Client> {
  const client = new Client({ connectionString: connectionStringFrom(env) });
  await client.connect();
  return client;
}
