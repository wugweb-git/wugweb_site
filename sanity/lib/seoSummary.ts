/**
 * Pure helpers behind the Tables SEO columns (moved from the SEO tool):
 * the "Checks passed" summary and the derived row fields. No React, no client.
 */
import { seoChecks, checksSummary, type AltLookup, type DuplicateIndex, type SeoCheck } from './health.ts';
import { countWords, readTimeMinutes, BODY_FIELD } from './markdown.ts';

export const SEO_TABLE_TYPES = new Set(['post', 'caseStudy', 'service', 'singletonPage']);

export type ChecksState = 'Has failing checks' | 'All checks pass' | 'No checks';

export interface ChecksResult {
  passed: number;
  total: number;
  failed: SeoCheck[];
  state: ChecksState;
  /** "9/10", or "—" when no check applies to the type. */
  label: string;
}

export function summarizeChecks(row: Record<string, unknown>, dupes?: DuplicateIndex, alts?: AltLookup): ChecksResult {
  const s = checksSummary(seoChecks(row, dupes, alts));
  const state: ChecksState = s.total === 0 ? 'No checks' : s.failed.length ? 'Has failing checks' : 'All checks pass';
  return { ...s, state, label: s.total ? `${s.passed}/${s.total}` : '—' };
}

/** SeoTool's "Missing SEO" rule: no description, or one of 20 characters or fewer. */
export const isMissingSeo = (row: Record<string, unknown>): boolean => {
  const d = row.seoDescription;
  return !(typeof d === 'string' && d.trim().length > 20);
};

/** The fields enrichRows() adds to every row. */
export interface SeoRowFields {
  __checks: ChecksResult;
  __checksState: ChecksState;
  __seoMissing: 'Missing SEO' | 'Has SEO description';
  __words: number;
  __readTime: number;
}

/**
 * Adds the derived fields the SEO columns read. `__checksState` is a plain
 * string so the existing facet filter, quick filter, search, sort and CSV all
 * work on it without special cases.
 */
export function enrichRows<T extends Record<string, unknown>>(rows: T[], dupes?: DuplicateIndex, alts?: AltLookup): Array<T & SeoRowFields> {
  return rows.map((row) => {
    const checks = summarizeChecks(row, dupes, alts);
    const field = BODY_FIELD[String(row._type)] ?? 'body';
    const words = countWords((row[field] as any[]) || []);
    return {
      ...row,
      __checks: checks,
      __checksState: checks.state,
      __seoMissing: isMissingSeo(row) ? ('Missing SEO' as const) : ('Has SEO description' as const),
      __words: words,
      __readTime: readTimeMinutes(words),
    };
  });
}
