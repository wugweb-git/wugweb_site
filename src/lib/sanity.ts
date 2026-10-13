import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

const projectId = import.meta.env.SANITY_PROJECT_ID || 'splvhmk1';
const dataset = import.meta.env.SANITY_DATASET ?? 'production';
const apiVersion = '2026-01-01';

// Build-time client — always CDN. Pages that need draft/preview should
// create a request-scoped client using locals.runtime.env instead.
export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
});

// Create a preview-aware client. Call with a token from the request
// context (e.g. locals.runtime.env.SANITY_PREVIEW_TOKEN).
export function getPreviewClient(token?: string) {
  return createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn: false,
    token: token || undefined,
    perspective: token ? 'previewDrafts' : 'published',
  });
}

/**
 * Write token for the form routes, from the runtime env only (Pages secret;
 * `wrangler pages dev` exposes .env the same way). Never import.meta.env:
 * Vite inlines that at build time, which baked the local token into the
 * server bundle (found 2026-10-13).
 */
export const sanityTokenFrom = (env: Record<string, any> | undefined): string | undefined =>
  env?.SANITY_SYNC_TOKEN || env?.SANITY_TOKEN || undefined;

const builder = imageUrlBuilder(sanityClient);
export const urlFor = (source: any) => builder.image(source);

/**
 * Short-lived cache for the sitewide queries.
 *
 * Audit finding 5 measured TTFB peaking at 1.31 s and blamed the absence of
 * prerendering. Prerendering is the wrong fix here — it would freeze content at
 * build time, and nothing triggers a build when someone edits in the Studio, so
 * every edit would silently stop reaching the site.
 *
 * The real cost is round trips. BaseLayout alone issued four, sequentially, and
 * its own comments show the shape of the workaround: queries widened to serve
 * two consumers specifically to avoid a fifth. Those four run on EVERY page and
 * return the same bytes each time — site settings, platform profiles, global
 * sections, the industry list.
 *
 * So: cache them, briefly. On Workers, module scope survives between requests
 * inside a warm isolate, so most requests answer from memory. A miss costs
 * exactly what it costs today; nothing gets slower.
 *
 * TTL is deliberately short. A Studio edit appears within a minute rather than
 * at the next deploy, which is the property prerendering would have destroyed.
 * Per-page content (a post, a case study) is NOT cached — only the sitewide
 * queries, where staleness is uniform and brief.
 *
 * In-flight requests are shared too: a burst of concurrent requests on a cold
 * isolate makes one call, not one each.
 */
const TTL_MS = 60_000;
const cache = new Map<string, { at: number; value: Promise<any> }>();

export function cachedFetch<T = any>(query: string, params?: Record<string, unknown>): Promise<T> {
  const key = query + (params ? JSON.stringify(params) : '');
  const hit = cache.get(key);
  if (hit && Date.now() - hit.at < TTL_MS) return hit.value;

  const value = sanityClient.fetch<T>(query, params ?? {}).catch((err) => {
    // A failed fetch must not be cached, or one blip poisons a full minute.
    cache.delete(key);
    throw err;
  });
  cache.set(key, { at: Date.now(), value });
  return value;
}
