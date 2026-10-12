import { cachedFetch } from './sanity';

/**
 * Alt text for media that is rendered by path (cover, thumbnail, hero, gallery).
 *
 * The alt lives on the `asset` document, matched by relativePath / sitePath, so
 * it is written once and follows the file everywhere it is used. Same
 * normalisation as `toRel` in sanity/lib/assetUsage.ts (kept as a copy because
 * the Studio and the site are separate builds).
 *
 * Callers pass their own fallback (the existing alt or the page title), so an
 * asset with no alt, or a failed lookup, renders exactly as it did before.
 */
export type AltMap = Map<string, string>;

export function toRel(value: unknown): string | null {
  if (typeof value !== 'string') return null;
  let v = value.trim();
  if (!v || v.length > 600) return null;
  if (/^https?:\/\//i.test(v)) {
    try {
      v = new URL(v).pathname;
    } catch {
      return null;
    }
  }
  v = v.split(/[?#]/)[0];
  try {
    v = decodeURIComponent(v);
  } catch {
    /* keep raw */
  }
  v = v.replace(/^\/+/, '').replace(/^assets\//, '');
  return v || null;
}

const ALT_QUERY = `*[_type == "asset" && defined(alt) && alt != "" && !(_id in path("drafts.**"))]{ relativePath, sitePath, alt }`;

/** One cached query (60 s, shared in-flight). Never throws: a failure is an empty map. */
export async function loadAssetAlts(): Promise<AltMap> {
  const map: AltMap = new Map();
  try {
    const rows = await cachedFetch<{ relativePath?: string; sitePath?: string; alt: string }[]>(ALT_QUERY);
    for (const r of rows || []) {
      for (const k of [toRel(r.relativePath), toRel(r.sitePath)]) if (k) map.set(k, r.alt.trim());
    }
  } catch {
    /* fall back to caller-supplied alt */
  }
  return map;
}

export function altFor(map: AltMap, path: string | null | undefined, fallback: string): string {
  const k = toRel(path);
  return (k && map.get(k)) || fallback;
}
