/**
 * Live duplicate warnings on seoTitle / seoDescription — native Sanity
 * validation at WARNING level, so they show on the field as the editor types
 * and never block publishing.
 *
 * Checked across all four content types (a page and a post with the same
 * title compete with each other in search too), against published documents,
 * case-insensitively, excluding the document itself. Attached centrally in
 * schemaTypes/index.ts, like the voice rules — no schema file is edited.
 */

export const DUP_TYPES = ['post', 'caseStudy', 'singletonPage', 'service'];
export const DUP_FIELDS = ['seoTitle', 'seoDescription'] as const;
type DupField = (typeof DUP_FIELDS)[number];

export interface DupMatch {
  _type: string;
  title?: string;
}

type Fetcher = (field: DupField, value: string, id: string) => Promise<DupMatch[]>;

const LABEL: Record<DupField, string> = { seoTitle: 'SEO title', seoDescription: 'SEO description' };

/** Pure core: `true` (no warning) or a message naming the clash. Never throws. */
export async function duplicateWarning(field: DupField, value: unknown, id: string, fetchMatches: Fetcher): Promise<true | string> {
  const v = typeof value === 'string' ? value.trim() : '';
  if (!v) return true;
  try {
    const matches = await fetchMatches(field, v.toLowerCase(), id);
    if (!matches?.length) return true;
    const named = matches.slice(0, 2).map((m) => `“${m.title || 'Untitled'}” (${m._type})`).join(', ');
    const more = matches.length > 2 ? ` and ${matches.length - 2} more` : '';
    return `Same ${LABEL[field]} as ${named}${more}. Make it unique so the pages don't compete in search.`;
  } catch {
    return true; // a failed lookup is not a reason to warn
  }
}

export const DUP_QUERY = (field: DupField) =>
  `*[_type in $types && !(_id in path("drafts.**")) && !(_id in [$id, "drafts." + $id]) && lower(${field}) == $v][0...3]{ _type, title }`;

function dupRule(field: DupField) {
  return (rule: any) =>
    rule
      .custom((value: unknown, ctx: any) => {
        const id = String(ctx.document?._id ?? '').replace(/^drafts\./, '');
        return duplicateWarning(field, value, id, (f, v, docId) =>
          ctx.getClient({ apiVersion: '2026-01-01' }).fetch(DUP_QUERY(f), { types: DUP_TYPES, v, id: docId }),
        );
      })
      .warning();
}

function append(existing: unknown, extra: (rule: any) => any) {
  return (rule: any) => {
    const base = typeof existing === 'function' ? existing(rule) : existing;
    const list = base == null ? [] : Array.isArray(base) ? base : [base];
    return [...list, extra(rule)];
  };
}

/** Returns the schema types with duplicate warnings on seoTitle/seoDescription. */
export function withSeoDuplicateWarnings<T extends { name: string; fields?: any[] }>(types: T[]): T[] {
  return types.map((type) => {
    if (!DUP_TYPES.includes(type.name) || !Array.isArray(type.fields)) return type;
    return {
      ...type,
      fields: type.fields.map((f: any) =>
        (DUP_FIELDS as readonly string[]).includes(f?.name) ? { ...f, validation: append(f.validation, dupRule(f.name)) } : f,
      ),
    };
  });
}
