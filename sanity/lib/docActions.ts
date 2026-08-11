import { SanityClient } from 'sanity';
import { downloadCSV, toCSV } from './csv';

/**
 * Document actions for bulk bars + row context menus.
 * All client-side via the Sanity client (free-tier safe).
 */

/** Duplicate documents safely across any schema type. */
export async function duplicateDocs(client: SanityClient, ids: string[]): Promise<boolean> {
  const drafts = ids.filter((id) => id.startsWith('drafts.'));
  const published = ids.filter((id) => !id.startsWith('drafts.'));
  const toDuplicate = [...drafts, ...published];

  for (const id of toDuplicate) {
    const doc = await client.getDocument(id);
    if (!doc) continue;
    const { _id, _rev, _createdAt, _updatedAt, _type, ...rest } = doc as any;

    const copySuffix = ` (Copy)`;
    const patchObj: Record<string, unknown> = { _type, ...rest };

    if (typeof rest.title === 'string') patchObj.title = `${rest.title}${copySuffix}`;
    if (typeof rest.name === 'string') patchObj.name = `${rest.name}${copySuffix}`;
    if (typeof rest.displayName === 'string') patchObj.displayName = `${rest.displayName}${copySuffix}`;

    if (rest.slug && typeof rest.slug === 'object') {
      const currentSlug = typeof rest.slug.current === 'string' ? rest.slug.current : 'copy';
      const uniqueSuffix = Math.random().toString(36).substring(2, 6);
      patchObj.slug = {
        ...rest.slug,
        current: `${currentSlug}-copy-${uniqueSuffix}`,
      };
    }

    await client.create(patchObj as any);
  }
  return true;
}

/** Publish a draft (create/replace published doc without internal revision metadata). */
export async function publishDocs(client: SanityClient, ids: string[]): Promise<boolean> {
  for (const id of ids) {
    if (!id.startsWith('drafts.')) continue;
    const pubId = id.slice('drafts.'.length);
    const draft = await client.getDocument(id);
    if (!draft) continue;

    // Strip internal revision metadata so createOrReplace succeeds without 409 conflict
    const { _id, _rev, _createdAt, _updatedAt, ...content } = draft as any;
    await client.createOrReplace({ ...content, _id: pubId });
    await client.delete(id); // remove draft
  }
  return true;
}

/** Unpublish (move published document → draft). */
export async function unpublishDocs(client: SanityClient, ids: string[]): Promise<boolean> {
  for (const id of ids) {
    if (id.startsWith('drafts.')) continue;
    const doc = await client.getDocument(id);
    if (!doc) continue;

    // Strip internal revision metadata before replacing draft
    const { _id, _rev, _createdAt, _updatedAt, ...content } = doc as any;
    await client.createOrReplace({ ...content, _id: `drafts.${id}` });
    await client.delete(id);
  }
  return true;
}

/** Archive: set soft status field if present. */
export async function archiveDocs(client: SanityClient, ids: string[]): Promise<boolean> {
  for (const id of ids) {
    const doc = await client.getDocument(id);
    if (!doc) continue;
    const patch: Record<string, unknown> = {};
    if ('status' in doc) patch.status = 'Archived';
    if (Object.keys(patch).length > 0) {
      await client.patch(id).set(patch).commit();
    }
  }
  return true;
}

/** Hard delete with pre-confirm handled by caller. */
export async function deleteDocs(client: SanityClient, ids: string[]): Promise<boolean> {
  for (const id of ids) {
    await client.delete(id).catch(() => {});
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
