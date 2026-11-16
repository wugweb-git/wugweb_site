import { SanityClient } from 'sanity';
import { downloadCSV, toCSV } from './csv';

/**
 * Document actions for bulk bars + row context menus.
 * All client-side via the Sanity client (free-tier safe).
 */

const baseOf = (id: string) => id.replace(/^drafts\./, '');

/**
 * Types that must exist once per key (a page per pageId, one site settings,
 * a section per sectionId, ...). Duplicating them makes a clash, so it is refused.
 */
export const SINGLETON_TYPES = new Set(['siteSettings', 'singletonPage', 'pageSection', 'syncStatus', 'contactSubmission']);

/**
 * Fields that identify a document to the site or to a sync (Notion ids, page
 * and section keys). A copy must not carry them, or two docs answer to one key.
 */
const IDENTITY_FIELDS = ['externalId', 'pageId', 'sectionId', 'menuId', 'profileId', 'credentialId', 'canonicalUrl', 'legacySlugs'];

/**
 * Duplicate documents as NEW DRAFTS. Nothing goes live until someone
 * publishes the copy. Reads the draft when there is one, so a draft-only
 * row duplicates too.
 */
export async function duplicateDocs(client: SanityClient, ids: string[]): Promise<boolean> {
  const bases = [...new Set(ids.map(baseOf))];
  let made = 0;
  const refused: string[] = [];

  for (const base of bases) {
    const [draft, published] = await client.getDocuments([`drafts.${base}`, base]);
    const doc = (draft || published) as any;
    if (!doc) continue;
    if (SINGLETON_TYPES.has(doc._type)) { refused.push(doc._type); continue; }

    const { _id, _rev, _createdAt, _updatedAt, _type, ...rest } = doc;
    for (const f of IDENTITY_FIELDS) delete rest[f];

    const copy: Record<string, unknown> = { _type, ...rest };
    const copySuffix = ' (Copy)';
    if (typeof rest.title === 'string') copy.title = `${rest.title}${copySuffix}`;
    if (typeof rest.name === 'string') copy.name = `${rest.name}${copySuffix}`;
    if (typeof rest.displayName === 'string') copy.displayName = `${rest.displayName}${copySuffix}`;

    const suffix = Math.random().toString(36).substring(2, 6);
    if (rest.slug && typeof rest.slug === 'object') {
      const currentSlug = typeof rest.slug.current === 'string' ? rest.slug.current : 'copy';
      copy.slug = { ...rest.slug, current: `${currentSlug}-copy-${suffix}` };
    }

    await client.create({ ...copy, _id: `drafts.${base}-copy-${suffix}` } as any);
    made++;
  }

  if (!made && refused.length) throw new Error(`${refused[0]} documents cannot be duplicated`);
  if (!made) throw new Error('Nothing to duplicate');
  return true;
}

/**
 * Publish: for each row, if a draft exists, copy it over the published doc
 * and remove the draft in ONE transaction. Rows arrive with published ids
 * (fetchDocs merges drafts), so the draft is looked up from the base id.
 * Throws when no row had a draft, so the table never reports a fake success.
 */
export async function publishDocs(client: SanityClient, ids: string[]): Promise<boolean> {
  const bases = [...new Set(ids.map(baseOf))];
  const drafts = (await client.getDocuments(bases.map((b) => `drafts.${b}`))).filter(Boolean) as any[];
  if (!drafts.length) throw new Error('No unpublished changes to publish');

  const tx = client.transaction();
  for (const draft of drafts) {
    const { _id, _rev, _createdAt, _updatedAt, ...content } = draft;
    tx.createOrReplace({ ...content, _id: baseOf(_id) });
    tx.delete(_id);
  }
  await tx.commit();
  return true;
}

/** Unpublish: move each published doc to a draft, in one transaction. */
export async function unpublishDocs(client: SanityClient, ids: string[]): Promise<boolean> {
  const bases = [...new Set(ids.map(baseOf))];
  const published = (await client.getDocuments(bases)).filter(Boolean) as any[];
  if (!published.length) throw new Error('Nothing published to unpublish');

  const drafts = (await client.getDocuments(bases.map((b) => `drafts.${b}`))).filter(Boolean) as any[];
  const hasDraft = new Set(drafts.map((d) => baseOf(d._id)));

  const tx = client.transaction();
  for (const doc of published) {
    // Keep an existing draft (newer edits); otherwise the published content becomes the draft.
    if (!hasDraft.has(doc._id)) {
      const { _id, _rev, _createdAt, _updatedAt, ...content } = doc;
      tx.create({ ...content, _id: `drafts.${_id}` });
    }
    tx.delete(doc._id);
  }
  await tx.commit();
  return true;
}

/** Archive: set status to 'Archived' on docs that have a status field. */
export async function archiveDocs(client: SanityClient, ids: string[]): Promise<boolean> {
  const bases = [...new Set(ids.map(baseOf))];
  const docs = (await client.getDocuments(bases.flatMap((b) => [b, `drafts.${b}`]))).filter(Boolean) as any[];
  const withStatus = docs.filter((d) => 'status' in d && d._type !== 'experiment');
  if (!withStatus.length) throw new Error('These documents have no status to archive');

  const tx = client.transaction();
  for (const d of withStatus) tx.patch(d._id, { set: { status: 'Archived' } });
  await tx.commit();
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
