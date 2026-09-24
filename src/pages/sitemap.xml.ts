import type { APIRoute } from 'astro';
import { sanityClient } from '../lib/sanity';
import { siteSettingsQuery } from '../lib/queries';

export const prerender = false;

/**
 * sitemap.xml
 *
 * robots.txt has been advertising this URL while it returned 404. This is the
 * file it was pointing at.
 *
 * Routes are listed explicitly rather than derived from `singletonPage.route`,
 * because that field is populated on 0 of 14 documents — deriving from it today
 * would produce a sitemap containing only the dynamic content. Fill `route` in
 * the Studio and this list can collapse into a query.
 *
 * Deliberately absent, and why:
 *   /404, /404-2, /offline, /contact-error  error and system states
 *   /thank-you                              post-submit, no standalone value
 *   /kits                                   internal showcase, unlinked from nav
 *   /contact-v2, /footer/refund-policy      301 redirects; listing a redirect
 *                                           in a sitemap is a contradiction
 *
 * Case-study stubs are filtered the same way the industries drawer filters
 * them: a `canonicalUrl` pointing somewhere other than the document's own slug
 * means the route 301s, so it must not appear here either.
 */
const STATIC_ROUTES = [
  '/',
  '/about',
  '/services',
  '/work',
  '/blog',
  '/faq',
  '/contact-us',
  '/footer/industries',
  '/footer/impact',
  '/footer/subscription',
  '/footer/sitemap',
  '/footer/reviews',
  '/footer/cookie-policy',
  '/privacy-policy',
  '/termsofuse',
  '/refund-policy',
];

interface Entry {
  loc: string;
  lastmod?: string;
}

/** Non-ISO dates exist in the content (25 of 100 posts carry a WordPress
 *  import format). An invalid <lastmod> invalidates the entry, so drop it. */
function isoDate(value: unknown): string | undefined {
  if (typeof value !== 'string' || !value) return undefined;
  const parsed = new Date(value.includes('T') ? value : value.replace(' ', 'T') + 'Z');
  return Number.isNaN(parsed.getTime()) ? undefined : parsed.toISOString();
}

export const GET: APIRoute = async () => {
  const settings = await sanityClient.fetch(siteSettingsQuery).catch(() => null);
  const origin = (settings?.siteUrl || 'https://www.wugweb.com').replace(/\/+$/, '');
  const excluded: string[] = settings?.sitemapExcludePaths || [];

  const [pages, services, caseStudies, posts] = await Promise.all([
    // All pages, with their noIndex flag — not just the indexable ones. The
    // flag is needed to know which static routes to suppress, and a page that
    // simply has no document must still be listed, because it still renders.
    sanityClient
      .fetch(`*[_type == "singletonPage" && !(_id in path("drafts.**"))]{ pageId, noIndex, _updatedAt }`)
      .catch(() => []),
    sanityClient
      .fetch(`*[_type == "service" && defined(slug.current) && !(_id in path("drafts.**"))]{ "slug": slug.current, _updatedAt }`)
      .catch(() => []),
    sanityClient
      .fetch(`*[_type == "caseStudy" && defined(slug.current) && !(_id in path("drafts.**"))
              && noIndex != true
              && (!defined(canonicalUrl) || canonicalUrl == "/work/" + slug.current)]{
                "slug": slug.current, _updatedAt }`)
      .catch(() => []),
    sanityClient
      .fetch(`*[_type == "post" && defined(slug.current) && !(_id in path("drafts.**"))
              && noIndex != true
              && (!defined(canonicalUrl) || canonicalUrl == "/blog/" + slug.current)]{
                "slug": slug.current, _updatedAt, publishedAt }`)
      .catch(() => []),
  ]);

  // pageId → the route it actually renders at. Several differ, which is why
  // this mapping exists at all: contact → /contact-us, terms-of-use →
  // /termsofuse, impact → /footer/impact.
  const PAGE_ROUTES: Record<string, string> = {
    home: '/', about: '/about', services: '/services', work: '/work', blog: '/blog',
    faq: '/faq', contact: '/contact-us', industries: '/footer/industries',
    impact: '/footer/impact', subscription: '/footer/subscription',
    sitemap: '/footer/sitemap', reviews: '/footer/reviews',
    'cookie-policy': '/footer/cookie-policy', 'privacy-policy': '/privacy-policy',
    'terms-of-use': '/termsofuse', 'refund-policy': '/refund-policy',
  };
  const lastmodByRoute = new Map<string, string | undefined>();
  // Routes whose document exists and is explicitly noIndex. A route with no
  // document at all is NOT suppressed — it still renders, so it still belongs.
  const suppressed = new Set<string>();
  for (const p of pages as any[]) {
    const route = PAGE_ROUTES[p.pageId];
    if (!route) continue;
    if (p.noIndex === true) suppressed.add(route);
    else lastmodByRoute.set(route, isoDate(p._updatedAt));
  }

  const entries: Entry[] = [
    ...STATIC_ROUTES
      .filter((r) => !suppressed.has(r))
      .map((r) => ({ loc: r, lastmod: lastmodByRoute.get(r) })),
    ...(services as any[]).map((s) => ({ loc: `/services/${s.slug}`, lastmod: isoDate(s._updatedAt) })),
    ...(caseStudies as any[]).map((c) => ({ loc: `/work/${c.slug}`, lastmod: isoDate(c._updatedAt) })),
    ...(posts as any[]).map((p) => ({ loc: `/blog/${p.slug}`, lastmod: isoDate(p._updatedAt) || isoDate(p.publishedAt) })),
  ].filter((e) => !excluded.includes(e.loc));

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries
  .map(
    (e) =>
      `  <url><loc>${origin}${e.loc}</loc>${e.lastmod ? `<lastmod>${e.lastmod}</lastmod>` : ''}</url>`
  )
  .join('\n')}
</urlset>
`;

  return new Response(body, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      // Sitemaps are cheap to regenerate and crawlers re-fetch them often.
      'Cache-Control': 'public, max-age=3600',
    },
  });
};
