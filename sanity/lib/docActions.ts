import { SanityClient } from 'sanity';
import { downloadCSV, toCSV } from './csv';

/**
 * Document actions for bulk bars + row context menus.
 * All client-side via the Sanity client (free-tier safe).
 */

/** Duplicate documents. Sanity appends "Copy" via slug generation; we add a suffix to be safe. */
export async function duplicateDocs(client: SanityClient, ids: string[]): Promise<boolean> {
  const drafts = ids.filter((id) => id.startsWith('drafts.'));
  const published = ids.filter((id) => !id.startsWith('drafts.'));
  const toDuplicate = [...drafts, ...published];
  for (const id of toDuplicate) {
    const doc = await client.getDocument(id);
    if (!doc) continue;
    const { _id, _rev, _createdAt, _updatedAt, _type, ...rest } = doc as any;
    await client.create({
      _type,
      ...rest,
      title: `${rest.title || 'Untitled'} (Copy)`,
      // force new slug so duplicate doesn't collide
      slug: rest.slug ? { ...rest.slug, current: `${rest.slug.current}-copy` } : undefined,
    });
  }
  return true;
}

/** Publish a draft (create the published revision by deleting the draft). */
export async function publishDocs(client: SanityClient, ids: string[]): Promise<boolean> {
  for (const id of ids) {
    if (!id.startsWith('drafts.')) continue;
    const pubId = id.slice('drafts.'.length);
    const draft = await client.getDocument(id);
    if (!draft) continue;
    // Creating the published doc from draft content effectively publishes it.
    await client.createOrReplace({ ...draft, _id: pubId });
    await client.delete(id); // remove draft
  }
  return true;
}

/** Unpublish (move published → draft). */
export async function unpublishDocs(client: SanityClient, ids: string[]): Promise<boolean> {
  for (const id of ids) {
    if (id.startsWith('drafts.')) continue;
    const doc = await client.getDocument(id);
    if (!doc) continue;
    await client.createOrReplace({ ...doc, _id: `drafts.${id}` });
    await client.delete(id);
  }
  return true;
}

/** Archive: set a soft status field (assets/engagements) or move to draft (content). */
export async function archiveDocs(client: SanityClient, ids: string[]): Promise<boolean> {
  for (const id of ids) {
    const doc = await client.getDocument(id);
    if (!doc) continue;
    const patch: Record<string, unknown> = {};
    if ('status' in doc) patch.status = 'Archived';
    await client.patch(id).set(patch).commit();
  }
  return true;
}

/** Hard delete with a pre-confirm handled by the caller (DataTable confirm). */
export async function deleteDocs(client: SanityClient, ids: string[]): Promise<boolean> {
  for (const id of ids) {
    await client.delete(id).catch(() => {});
    // also delete draft sibling if present
    if (!id.startsWith('drafts.')) {
      await client.delete(`drafts.${id}`).catch(() => {});
    }
  }
  return true;
}

/** Export selected rows as CSV (client-side). */
export function exportRowsCSV(filename: string, rows: Record<string, unknown>[], cols: { key: string; label: string }[]): void {
  downloadCSV(filename, toCSV(rows, cols));
}
