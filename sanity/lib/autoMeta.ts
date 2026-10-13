/**
 * "Auto Meta" — moved from tools/SeoTool.tsx (behaviour unchanged).
 * Fills seoTitle / seoDescription ONLY where they are empty: an existing
 * value is always kept. Title is cut to 60 chars, description to 160.
 */

export interface MetaSource {
  title?: unknown;
  pageId?: unknown;
  seoTitle?: unknown;
  seoDescription?: unknown;
  body?: unknown;
  excerpt?: unknown;
  summary?: unknown;
}

export function generateMeta(row: MetaSource): { seoTitle: string; seoDescription: string } {
  const base = String(row.title ?? row.pageId ?? '');
  const bodyText = [row.body, row.excerpt, row.summary]
    .map((b) => (Array.isArray(b) ? (b as any[]).map((blk) => (blk?.children || []).map((c: any) => c.text || '').join('')).join(' ') : String((b as any) ?? '')))
    .join(' ')
    .replace(/\s+/g, ' ')
    .trim();
  const seoTitle = String(row.seoTitle || (base.length > 60 ? base.slice(0, 57) + '…' : base));
  const seoDescription = String(
    row.seoDescription ||
    (bodyText.length > 160 ? bodyText.slice(0, 157) + '…' : bodyText || 'Wugweb — Digital Experience Agency')
  );
  return { seoTitle, seoDescription };
}

/** Bulk Auto Meta: one read, then one transaction. Returns true so the table reloads. */
export async function autoMetaDocs(client: any, ids: string[]): Promise<boolean> {
  if (!ids.length) return false;
  const docs: Array<MetaSource & { _id: string }> = await client.fetch(
    `*[_id in $ids]{ _id, title, pageId, seoTitle, seoDescription, body, excerpt, summary }`,
    { ids },
  );
  const tx = client.transaction();
  for (const d of docs) tx.patch(d._id, { set: generateMeta(d) });
  await tx.commit();
  return true;
}

export const AUTO_META_CONFIRM =
  'Auto Meta fills the SEO title and SEO description where they are EMPTY, from the title and body. Existing values are kept. Continue?';
