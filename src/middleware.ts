import { defineMiddleware } from 'astro:middleware';
import { isReservedPath, matchRedirect, normalizePath, type RedirectHit } from './lib/redirects';
import { buildRuleSet, loadRedirectRules, type RuleSet } from './lib/redirect-rules';

const PREVIEW_COOKIE = '__sanity_preview';

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

/** True when the route itself did not resolve: a 404, or the site's own
 *  "not found" redirect to /404 (blog, services and work slug pages do that). */
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
  const rules = redirectsApply ? await rulesFor(context, url) : null;

  // A page's own httpStatus (301/302/410 on its singletonPage) governs its own
  // route, so it applies before the page renders.
  if (rules) {
    const pageHit = matchRedirect(rules.pages, url.pathname, url.search);
    if (pageHit) return withSecurityHeaders(redirectResponse(pageHit, url, method));
  }

  // Skip cookie logic during prerendering (no real request)
  if (context.request) {
    // Expose the Sanity preview token (set by /api/preview) so pages can
    // use getPreviewClient(token) to load draft content. Never leak it
    // to the client — keep it in locals only.
    const previewToken = context.cookies.get(PREVIEW_COOKIE)?.value;
    if (previewToken?.startsWith('sk')) {
      context.locals.previewToken = previewToken;
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

  return withSecurityHeaders(response);
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
