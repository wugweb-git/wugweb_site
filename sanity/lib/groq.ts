import { type SanityClient } from 'sanity';
import type { Row } from './types';

/**
 * Fetch documents with draft awareness.
 *
 * Sanity stores drafts as `drafts.<id>` and published as `<id>`. For a list
 * we fetch both, then merge so each logical document appears once:
 * - `_id` is the published id
 * - `_draftId` present when a draft exists
 * - `_draft` boolean marks "has unpublished changes"
 * - draft values win for display fields
 */
export async function fetchDocs(
  client: SanityClient,
  query: string,
  params?: Record<string, unknown>
): Promise<Row[]> {
  const data = await client.fetch<Row[]>(query, params ?? {});
  if (!Array.isArray(data)) return [];

  const byId = new Map<string, Row>();
  for (const row of data) {
    const id = String(row._id ?? '');
    if (id.startsWith('drafts.')) {
      const pubId = id.slice('drafts.'.length);
      const existing = byId.get(pubId);
      if (existing) {
        byId.set(pubId, { ...existing, ...row, _id: pubId, _draftId: id, _draft: true });
      } else {
        byId.set(pubId, { ...row, _id: pubId, _draftId: id, _draft: true });
      }
    } else {
      const existing = byId.get(id);
      if (existing && existing._draftId) {
        // published already merged; keep draft fields but keep published id
        byId.set(id, { ...row, ...existing, _id: id, _draftId: existing._draftId, _draft: true });
      } else {
        byId.set(id, { ...row, _draft: false });
      }
    }
  }
  return [...byId.values()];
}

/** Fetch a single document including draft overrides (for SEO tool detail). */
export async function fetchOne(
  client: SanityClient,
  id: string,
  query: string,
  params?: Record<string, unknown>
): Promise<Row | null> {
  const rows = await fetchDocs(client, query, { ...(params ?? {}), id });
  return rows.find((r) => r._id === id) ?? null;
}
