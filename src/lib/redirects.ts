/**
 * Redirect matcher — pure. No Sanity, no Astro, no network, so it unit-tests
 * with plain `node --test` (see redirects.test.ts).
 *
 * Rules come from two places (loaded by redirect-rules.ts):
 *   - `redirect` documents:     source → destination, 301 / 302
 *   - `singletonPage` documents: route → redirectTo, 301 / 302, or 410 (gone)
 *
 * Matching:
 *   - Case-insensitive; trailing slash ignored; query string carried over.
 *   - An exact rule beats a folder rule. `/old/*` is a folder rule and matches
 *     `/old` and anything under it; among folder rules the longest prefix wins.
 *   - `/new/*` in a destination receives the part matched by `*`.
 *   - One hop only: the destination is never re-matched. A rule that resolves
 *     to the path it came from is dropped.
 *   - Disabled rules, statuses other than 301/302/410, malformed sources and
 *     reserved paths are ignored.
 */

export type RedirectStatus = 301 | 302 | 410;

export interface RedirectRule {
  source: string;
  /** Required for 301/302. Ignored for 410. A path or an absolute http(s) URL. */
  destination?: string | null;
  status: number;
  enabled?: boolean | null;
}

export interface RedirectHit {
  status: RedirectStatus;
  /** Path + query (or an absolute URL). Absent for 410. */
  location?: string;
}

interface Compiled {
  exact: Map<string, RedirectRule>;
  /** [prefix, rule], longest prefix first. */
  folders: Array<[string, RedirectRule]>;
}

/** Never redirected, and never made to wait for rules. Keep in step with the
 *  copy in sanity/schemaTypes/redirect.ts, which refuses them as sources. */
const RESERVED_PREFIXES = ['/api', '/assets', '/_astro'];
const RESERVED_EXACT = ['/sitemap.xml', '/robots.txt'];

export function isReservedPath(pathname: string): boolean {
  const p = normalizePath(pathname);
  if (RESERVED_EXACT.includes(p)) return true;
  return RESERVED_PREFIXES.some((r) => p === r || p.startsWith(`${r}/`));
}

/** Lowercase, no query or hash, no trailing slash (except the root). */
export function normalizePath(input: string): string {
  let p = String(input ?? '').trim().split(/[?#]/)[0];
  try {
    p = decodeURI(p);
  } catch {
    /* keep it as given */
  }
  p = p.toLowerCase();
  if (!p.startsWith('/')) p = `/${p}`;
  p = p.replace(/\/{2,}/g, '/');
  if (p.length > 1) p = p.replace(/\/+$/, '');
  return p;
}

const isFolder = (source: string) => source.trim().endsWith('/*');

/** A usable source: starts with "/", no query, and `*` only as a trailing "/*". */
export function isValidSource(source: string): boolean {
  const s = String(source ?? '').trim();
  if (!s.startsWith('/') || s.includes('?') || s.includes('#')) return false;
  const star = s.indexOf('*');
  return star === -1 || (isFolder(s) && star === s.length - 1);
}

function isAbsoluteUrl(s: string): boolean {
  return /^https?:\/\//i.test(s);
}

export function compileRules(rules: RedirectRule[]): Compiled {
  const exact = new Map<string, RedirectRule>();
  const folderMap = new Map<string, RedirectRule>();

  for (const rule of rules) {
    if (!rule || rule.enabled === false) continue;
    const status = Number(rule.status);
    if (status !== 301 && status !== 302 && status !== 410) continue;
    if (!isValidSource(rule.source)) continue;
    const dest = (rule.destination ?? '').trim();
    if (status !== 410 && !dest) continue;
    if (status !== 410 && !dest.startsWith('/') && !isAbsoluteUrl(dest)) continue;

    if (isFolder(rule.source)) {
      const prefix = normalizePath(rule.source.trim().slice(0, -2) || '/');
      if (isReservedPath(prefix)) continue;
      // `/old/*` → `/old/*` sends every path back to itself.
      if (status !== 410 && isFolder(dest) && normalizePath(dest.slice(0, -2) || '/') === prefix) continue;
      if (!folderMap.has(prefix)) folderMap.set(prefix, { ...rule, status }); // first wins
    } else {
      const key = normalizePath(rule.source);
      if (isReservedPath(key)) continue;
      if (status !== 410 && !isAbsoluteUrl(dest) && normalizePath(dest) === key) continue;
      if (!exact.has(key)) exact.set(key, { ...rule, status }); // first wins
    }
  }

  const folders = [...folderMap.entries()].sort((a, b) => b[0].length - a[0].length);
  return { exact, folders };
}

function withQuery(location: string, search: string): string {
  if (!search || search === '?') return location;
  const q = search.startsWith('?') ? search.slice(1) : search;
  if (!q) return location;
  const [base, hash = ''] = location.split('#');
  const joined = base.includes('?') ? `${base}&${q}` : `${base}?${q}`;
  return hash ? `${joined}#${hash}` : joined;
}

/**
 * Match one request. `pathname` is the raw request path; `search` is the raw
 * query string including "?" (or empty). Returns null when nothing applies.
 */
export function matchRedirect(compiled: Compiled, pathname: string, search = ''): RedirectHit | null {
  if (isReservedPath(pathname)) return null;
  const path = normalizePath(pathname);

  let rule: RedirectRule | undefined = compiled.exact.get(path);
  let splat = '';
  if (!rule) {
    for (const [prefix, r] of compiled.folders) {
      if (prefix === '/' || path === prefix || path.startsWith(`${prefix}/`)) {
        rule = r;
        // Keep the original casing of the remainder for the destination.
        const original = normalizePathKeepCase(pathname);
        splat = prefix === '/' ? original.slice(1) : original.slice(prefix.length + 1);
        break;
      }
    }
  }
  if (!rule) return null;

  if (rule.status === 410) return { status: 410 };

  let dest = (rule.destination ?? '').trim();
  if (isFolder(dest)) {
    const base = dest.slice(0, -1); // keep the trailing "/"
    dest = splat ? `${base}${splat}` : base.replace(/\/$/, '') || '/';
  }

  // One hop, and never back to where we started.
  if (!isAbsoluteUrl(dest) && normalizePath(dest) === path) return null;

  return { status: rule.status as RedirectStatus, location: withQuery(dest, search) };
}

/** Like normalizePath but keeps case — used only to carry a folder splat. */
function normalizePathKeepCase(input: string): string {
  let p = String(input ?? '').trim().split(/[?#]/)[0];
  try {
    p = decodeURI(p);
  } catch {
    /* keep it as given */
  }
  if (!p.startsWith('/')) p = `/${p}`;
  p = p.replace(/\/{2,}/g, '/');
  if (p.length > 1) p = p.replace(/\/+$/, '');
  return p;
}
