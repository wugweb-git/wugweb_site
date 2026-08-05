/**
 * Media / asset URL helpers.
 *
 * Path mapping (canonical):
 *   local:   public/assets/<path>
 *   site:    /assets/<path>
 *   R2 key:  assets/<path>
 *   R2 URL:  ${PUBLIC_R2_ASSETS_BASE}/assets/<path>
 *
 * By default returns the site-relative path so Pages can still serve
 * `public/assets`. Pass `{ preferR2: true }` or set `PUBLIC_USE_R2_ASSETS=1`
 * once R2 cutover is verified.
 */
const R2_BASE =
  (typeof import.meta !== 'undefined' &&
    (import.meta as ImportMeta & { env?: Record<string, string> }).env?.PUBLIC_R2_ASSETS_BASE) ||
  'https://pub-39ad1d03baec440faf48303be95c3782.r2.dev';

function normalizeAssetPath(input: string): string {
  const trimmed = input.trim();
  if (!trimmed) return '/assets/';
  if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) return trimmed;
  const withSlash = trimmed.startsWith('/') ? trimmed : `/${trimmed}`;
  if (withSlash.startsWith('/assets/')) return withSlash;
  return `/assets/${withSlash.replace(/^\/+/, '')}`;
}

export type AssetUrlOptions = {
  /** Force R2 public URL even if cutover flag is off. */
  preferR2?: boolean;
};

export function assetUrl(path: string, opts: AssetUrlOptions = {}): string {
  const sitePath = normalizeAssetPath(path);
  if (sitePath.startsWith('http://') || sitePath.startsWith('https://')) return sitePath;

  const useR2 =
    opts.preferR2 === true ||
    (typeof import.meta !== 'undefined' &&
      (import.meta as ImportMeta & { env?: Record<string, string> }).env?.PUBLIC_USE_R2_ASSETS === '1');

  if (useR2 && R2_BASE) {
    return `${R2_BASE.replace(/\/$/, '')}${sitePath}`;
  }
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
  publicBase: R2_BASE,
  keyPrefix: 'assets',
} as const;
