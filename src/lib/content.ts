import type { APIRoute } from 'astro';
import { connect } from './db';

/**
 * Content query helpers for the Neon content store.
 *
 * Each returns typed data matching the shape the frontend expects —
 * same structure as the old Sanity GROQ queries but served from Neon.
 *
 * Usage in an Astro page:
 *   import { getSiteSettings, getServices } from '../lib/content';
 *   import { connect } from '../lib/db';
 *   const client = connect(locals.runtime.env);
 *   const settings = await getSiteSettings(client);
 *   await client.end();
 */

interface NeonClient {
  query: (sql: string, params?: unknown[]) => Promise<{ rows: unknown[] }>;
}

/** Fetch a single content item by type. Returns the data field as-is or null. */
export async function getByType(client: NeonClient, contentType: string): Promise<Record<string, unknown> | null> {
  const res = await client.query(
    `select data from content_items where content_type = $1 and status = 'published' limit 1`,
    [contentType]
  );
  return (res.rows[0]?.data as Record<string, unknown>) ?? null;
}

/** Fetch all content items of a type, ordered by data->>'order' */
export async function getAllByType(client: NeonClient, contentType: string): Promise<Record<string, unknown>[]> {
  const res = await client.query(
    `select id, data from content_items
     where content_type = $1 and status = 'published'
     order by data->>'order' asc nulls last`,
    [contentType]
  );
  return res.rows.map((r: any) => ({ id: r.id, ...r.data }));
}

/** Fetch a single content item by slug (id). */
export async function getBySlug(client: NeonClient, contentType: string, slug: string): Promise<Record<string, unknown> | null> {
  const res = await client.query(
    `select data from content_items
     where content_type = $1 and id = $2 and status = 'published'
     limit 1`,
    [contentType, slug]
  );
  return (res.rows[0]?.data as Record<string, unknown>) ?? null;
}

/** Get sync log summary (latest entry per entity type) */
export async function getSyncSummary(client: NeonClient): Promise<Record<string, unknown>[]> {
  const res = await client.query(
    `select distinct on (entity_type) entity_type, status, entity_count, completed_at, error_message
     from sync_log
     order by entity_type, completed_at desc nulls last`
  );
  return res.rows;
}
