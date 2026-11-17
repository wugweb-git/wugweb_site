import { defineMiddleware } from 'astro:middleware';
import { isReservedPath, matchRedirect, normalizePath, type RedirectHit } from './lib/redirects';
import { buildRuleSet, loadRedirectRules, type RuleSet } from './lib/redirect-rules';
import { createNotFoundLogger } from './lib/not-found';
import { sanityTokenFrom } from './lib/sanity';

// One logger per Worker instance: holds the per-path dedupe and daily-cap state.
const logNotFound = createNotFoundLogger();

const PREVIEW_COOKIE = '__sanity_preview';

/** Seconds a rendered page is served from the edge cache. */
const EDGE_TTL_S = 60;

/**
 * The `visitor_id` cookie was removed on 2026-09-25 — the remaining half of
 * audit finding 16, "tracking cookie set before consent".
 *
 * It was a random UUID minted on EVERY request with a one-year lifetime,
 * before the visitor had been asked anything. Its only reader was
 * /api/personalize, which had zero callers anywhere in the frontend — grepped,
 * not assumed. So it was a persistent identifier carrying real consent
 * exposure in exchange for no product behaviour at all.
 *
 * The other half of finding 16 is already fixed: GA now loads only on consent
 * (src/lib/analytics.ts), so the banner controls something real.
 *
 * If visitor personalisation is ever built, it needs a cookie set AFTER
 * consent — read the consent state first, then mint. Do not restore this block
 * as it was. The `visitor_profiles` table in Neon is left alone; Neon is
 * user-controlled and dropping a table is not a code change.
 */

/** True when the route itself did not resolve: a 404 (slug pages rewrite to /404), or a
 *  "not found" redirect to /404. */
function isNotFound(response: Response, origin: string): boolean {
  if (response.status === 404) return true;
  if (response.status >= 300 && response.status < 400) {
    const location = response.headers.get('Location');
    if (!location) return false;
    try {
      return normalizePath(new URL(location, origin).pathname) === '/404';
    } catch {
      return false;
    }
  }
  return false;
}

/** Built by hand rather than with Response.redirect(): that returns immutable
 *  headers, and the security-header loop below must still be able to set them. */
function redirectResponse(hit: RedirectHit, url: URL, method: string): Response {
  if (hit.status === 410) {
    const body = method === 'HEAD' ? null
      : '<!doctype html><meta charset="utf-8"><title>410 Gone</title><h1>Gone</h1><p>This page has been removed.</p>';
    return new Response(body, { status: 410, headers: { 'Content-Type': 'text/html; charset=utf-8' } });
  }
  // Absolute URL from the incoming origin, so it is correct on every host.
  return new Response(null, { status: hit.status, headers: { Location: new URL(hit.location!, url.origin).href } });
}

/** REDIRECTS_MOCK is a local testing hook (JSON of { redirects, pages }). It is
 *  honoured ONLY on localhost / 127.0.0.1, so it can never affect a real host
 *  even if the variable were set on the Pages project. */
async function rulesFor(context: Parameters<Parameters<typeof defineMiddleware>[0]>[0], url: URL): Promise<RuleSet> {
  const mock = (context.locals as any)?.runtime?.env?.REDIRECTS_MOCK as string | undefined;
  if (mock && (url.hostname === 'localhost' || url.hostname === '127.0.0.1')) {
    try {
      return buildRuleSet(JSON.parse(mock));
    } catch {
      return buildRuleSet(null);
    }
  }
  return loadRedirectRules();
}

export const onRequest = defineMiddleware(async (context, next) => {
  // ── Redirects ──
  // GET/HEAD only. Reserved paths (/api, /assets, /_astro, sitemap, robots)
  // are skipped BEFORE anything is loaded, so they are never slowed.
  const url = new URL(context.request.url);
  const method = context.request.method;
  const redirectsApply = !context.isPrerendered
    && (method === 'GET' || method === 'HEAD')
    && !isReservedPath(url.pathname);
  const previewOn = !context.isPrerendered && context.cookies.get(PREVIEW_COOKIE)?.value === '1';

  // ── Edge cache ──
  // Anonymous GETs of pages are cached per colo for EDGE_TTL_S through the
  // Workers Cache API (free; Pages does not edge-cache Function output from
  // headers alone). Same freshness as cachedFetch: a Studio edit shows within
  // a minute. Never used for preview, /api or anything reserved.
  const runtime = (context.locals as any)?.runtime;
  const edgeCache: Cache | undefined = (globalThis as any).caches?.default;
  const cacheable = !!edgeCache && redirectsApply && method === 'GET' && !previewOn;
  const cacheKey = cacheable ? new Request(url.href, { method: 'GET' }) : null;
  if (cacheKey) {
    const hit = await edgeCache!.match(cacheKey).catch(() => undefined);
    // A response from cache.match() has immutable headers, and the pipeline
    // after middleware still writes to them (cookies, headers), which threw
    // and turned every cache hit into an empty 500 (2026-11-17). Hand back a
    // copy with mutable headers instead of the cached object itself.
    if (hit) return new Response(hit.body, { status: hit.status, statusText: hit.statusText, headers: new Headers(hit.headers) });
  }

  const rules = redirectsApply ? await rulesFor(context, url) : null;

  // A page's own httpStatus (301/302/410 on its singletonPage) governs its own
  // route, so it applies before the page renders.
  if (rules) {
    const pageHit = matchRedirect(rules.pages, url.pathname, url.search);
    if (pageHit) return withSecurityHeaders(redirectResponse(pageHit, url, method));
  }

  // Skip cookie logic during prerendering (no real request)
  if (context.request) {
    // /api/preview sets a flag cookie (never a token). While it is set, pages
    // get the server-side Sanity read token through locals so they can load
    // drafts. The token stays on the server.
    if (previewOn) {
      const token = sanityTokenFrom((context.locals as any)?.runtime?.env);
      if (token) context.locals.previewToken = token;
    }
  }

  let response = await next();

  // Redirect documents apply only when the route did not resolve, so a rule
  // can never shadow a live page.
  if (rules && isNotFound(response, url.origin)) {
    const hit = matchRedirect(rules.redirects, url.pathname, url.search);
    if (hit) {
      await response.body?.cancel().catch(() => {});
      response = redirectResponse(hit, url, method);
    }
  }

  // 404 monitor (D1, production binding only). Logged only if no redirect
  // rescued the request, and off the response path via waitUntil, so it can
  // never delay or break a page. Filters, dedupe and the daily cap live in
  // src/lib/not-found.ts.
  if (!context.isPrerendered && method === 'GET' && url.pathname !== '/404' && isNotFound(response, url.origin)) {
    const runtime = (context.locals as any)?.runtime;
    const db = runtime?.env?.NOT_FOUND_DB;
    if (db) {
      const task = logNotFound(db, url.pathname, context.request.headers.get('referer'), context.request.headers.get('user-agent'));
      if (typeof runtime?.ctx?.waitUntil === 'function') runtime.ctx.waitUntil(task);
      else task.catch(() => {});
    }
  }

  response = withSecurityHeaders(response);

  const isHtml = (response.headers.get('Content-Type') || '').includes('text/html');
  if (previewOn && isHtml) {
    // Draft content must never be stored by a browser or proxy.
    response.headers.set('Cache-Control', 'private, no-store');
  } else if (cacheKey && isHtml && response.status === 200
    && !response.headers.has('Set-Cookie') && !response.headers.has('Cache-Control')) {
    response.headers.set('Cache-Control', `public, max-age=0, s-maxage=${EDGE_TTL_S}`);
    const put = edgeCache!.put(cacheKey, response.clone()).catch(() => {});
    if (typeof runtime?.ctx?.waitUntil === 'function') runtime.ctx.waitUntil(put);
  }

  return response;
});

function withSecurityHeaders(response: Response): Response {

  // Security headers for server-rendered responses.
  //
  // public/_headers does NOT cover these. Cloudflare Pages applies that file to
  // static assets only; every HTML page here is generated by the SSR Worker, so
  // it went out with no security headers at all. Verified in production: the
  // same headers were present on /assets/og/default.jpg and absent on /faq.
  //
  // Kept byte-identical to the /* block in public/_headers so the two surfaces
  // cannot drift apart. Content-Security-Policy is deliberately absent from
  // both — see the note in that file.
  const SECURITY_HEADERS: Record<string, string> = {
    'X-Content-Type-Options': 'nosniff',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'X-Frame-Options': 'SAMEORIGIN',
    'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), payment=(), usb=(), interest-cohort=()',
    'Strict-Transport-Security': 'max-age=31536000',
  };
  for (const [name, value] of Object.entries(SECURITY_HEADERS)) {
    // Do not clobber a header a route set for itself.
    if (!response.headers.has(name)) response.headers.set(name, value);
  }

  return response;
}
