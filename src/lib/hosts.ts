/**
 * The hosts this site is allowed to BE, as opposed to the hosts it merely
 * answers on.
 *
 * One build serves several: the canonical pair, uat.wugweb.com, the pages.dev
 * project domain, per-branch aliases, and localhost. Everything but the
 * canonical pair is a copy — same content, same URLs, different hostname —
 * which is a duplicate-content problem the moment a crawler finds it.
 *
 * Shared by `src/lib/analytics.ts` (which must not report staging traffic into
 * the production GA4 property), `BaseLayout` (robots meta) and `robots.txt`.
 * One list, because these three drifting apart is how a staging domain ends up
 * indexed or a staging session ends up in an analytics report.
 */
export const CANONICAL_HOSTS = ['wugweb.com', 'www.wugweb.com'];

export function isCanonicalHost(hostname: string): boolean {
  return CANONICAL_HOSTS.includes(hostname);
}
