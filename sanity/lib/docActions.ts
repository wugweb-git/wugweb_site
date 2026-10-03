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
  const failures: string[] = [];

  for (const id of ids) {
    try {
      await client.delete(id);
    } catch (error: any) {
      const message = error?.message || `Failed to delete ${id}`;
      failures.push(message);
      continue;
    }

    if (!id.startsWith('drafts.')) {
      try {
        await client.delete(`drafts.${id}`);
      } catch {
        // Ignore missing draft counterparts after successful published delete.
      }
    }
  }

  if (failures.length > 0) {
    throw new Error(failures[0]);
  }

  return true;
}

/** Export selected rows as CSV (client-side). */
export function exportRowsCSV(filename: string, rows: Record<string, unknown>[], cols: { key: string; label: string }[]): void {
  downloadCSV(filename, toCSV(rows, cols));
}


/**
 * Set (or clear, when the value is '') fields on a document. Patches both the
 * published doc and its draft when both exist, so the Studio never shows a
 * stale draft over the edit.
 */
export async function patchFields(
  client: SanityClient,
  id: string,
  fields: Record<string, unknown>
): Promise<void> {
  const baseId = id.replace(/^drafts\./, '');
  const docs = (await client.getDocuments([baseId, `drafts.${baseId}`])).filter(Boolean) as { _id: string }[];
  if (!docs.length) throw new Error(`Document ${baseId} not found`);
  const set: Record<string, unknown> = {};
  const unset: string[] = [];
  for (const [k, v] of Object.entries(fields)) {
    if (v === '' || v === null || v === undefined) unset.push(k);
    else set[k] = v;
  }
  const tx = client.transaction();
  for (const d of docs) {
    tx.patch(d._id, {
      ...(Object.keys(set).length ? { set } : {}),
      ...(unset.length ? { unset } : {}),
    });
  }
  await tx.commit();
}

/** Bulk-set one field on many documents (published + drafts), in chunks. */
export async function setFieldDocs(
  client: SanityClient,
  ids: string[],
  field: string,
  value: string
): Promise<boolean> {
  const baseIds = [...new Set(ids.map((i) => i.replace(/^drafts\./, '')))];
  for (let i = 0; i < baseIds.length; i += 50) {
    const chunk = baseIds.slice(i, i + 50);
    const docs = (await client.getDocuments(chunk.flatMap((id) => [id, `drafts.${id}`]))).filter(Boolean) as { _id: string }[];
    const tx = client.transaction();
    for (const d of docs) {
      tx.patch(d._id, value === '' ? { unset: [field] } : { set: { [field]: value } });
    }
    await tx.commit();
  }
  return true;
}
