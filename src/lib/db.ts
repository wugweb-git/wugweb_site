import { Pool } from '@neondatabase/serverless';

/**
 * Resolves a Postgres connection string for the API routes.
 *
 * Uses @neondatabase/serverless — WebSocket-based driver that works
 * natively on Cloudflare Workers (pg uses raw TCP which is blocked).
 *
 * Priority:
 * 1. env.HYPERDRIVE.connectionString
 * 2. env.DATABASE_URL
 * 3. throw Error
 */
let cachedPool: Pool | null = null;

export function connectionStringFrom(env: Record<string, unknown>): string {
  const hyperdrive = env.HYPERDRIVE as { connectionString?: string } | undefined;
  if (hyperdrive?.connectionString) return hyperdrive.connectionString;

  const url = env.DATABASE_URL as string | undefined;
  if (url) return url;

  throw new Error(
    'No database connection available: neither the HYPERDRIVE binding nor DATABASE_URL is set.'
  );
}

/** Returns a singleton pool for the request. */
export function getPool(env: Record<string, unknown>): Pool {
  if (!cachedPool) {
    cachedPool = new Pool({ connectionString: connectionStringFrom(env) });
  }
  return cachedPool;
}

/** Opens a connected client from the pool. Callers must release it. */
export async function connect(env: Record<string, unknown>) {
  const pool = getPool(env);
  return pool.connect();
}
