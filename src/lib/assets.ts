/**
 * Media / asset URL helpers.
 *
 * Path mapping (canonical):
 *   local:   public/assets/<path>
 *   site:    /assets/<path>
 *
 * Audited 2026-09-23 end-to-end: every path-bearing field across every
 * content type (caseStudy.thumbnailPath/coverPath/galleryPaths,
 * client.logoPath, industry.iconPath, person.photoPath, post.coverPath,
 * service.coverPath/galleryPaths, singletonPage.heroPath/mediaPaths,
 * taxonomy.iconPath, testimonial.photoPath) was pulled directly from
 * Sanity -- 421 unique /assets/ paths -- and checked against
 * public/assets on disk. 420/421 already existed and serve fine as
 * relative paths; the 1 real miss (a stray "about_message.mp4" vs. the
 * actual "about-message.mp4" file, in singletonPage c1b044cd's
 * mediaPaths) was a typo'd CMS field, fixed at the source in Sanity, not
 * here.
 *
 * There is no live "broken asset links" problem in the CMS-referenced
 * paths as of this audit. An earlier pass this session wrongly concluded
 * ~400 paths were broken and routed them to R2 / a legacy wugweb.online
 * host -- that was regex noise from grepping whole raw document JSON
 * (which also matches stale/unrelated fields), not the actual rendered
 * fields. Don't repeat that mistake: if you need to re-audit, pull the
 * named path fields per type (as above), not a blob regex over `*`.
 *
 * wrangler.jsonc still has PUBLIC_R2_ASSETS_BASE / PUBLIC_USE_R2_ASSETS /
 * PUBLIC_LEGACY_ASSETS_BASE vars from an earlier R2 migration attempt.
 * They are dead: `import.meta.env.PUBLIC_*` is a Vite BUILD-TIME
 * replacement from .env files, not from Worker runtime vars, and nothing
 * in src/ reads them via locals.runtime.env either. Safe to delete
 * whenever someone gets to it; assetUrl() below no longer references them.
 */
function normalizeAssetPath(input: string): string {
  const trimmed = input.trim();
  if (!trimmed) return '/assets/';
  if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) return trimmed;
  const withSlash = trimmed.startsWith('/') ? trimmed : `/${trimmed}`;
  if (withSlash.startsWith('/assets/')) return withSlash;
  return `/assets/${withSlash.replace(/^\/+/, '')}`;
}

export type AssetUrlOptions = {
  /** Unused -- kept so existing call sites compile unchanged. */
  preferR2?: boolean;
};

export function assetUrl(path: string, _opts: AssetUrlOptions = {}): string {
  const sitePath = normalizeAssetPath(path);
  return sitePath;
}

export function r2KeyFromSitePath(path: string): string {
  const sitePath = normalizeAssetPath(path);
  return sitePath.replace(/^\//, '');
}

/** Prefer path fields (R2/local) over Sanity CDN image objects. */
export function resolveMediaUrl(pathField?: string | null): string {
  if (!pathField) return '';
  return assetUrl(pathField);
}

export const R2_ASSETS = {
  bucket: 'wugweb-assets',
  keyPrefix: 'assets',
} as const;
