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
 * Static routes are the union of what RENDERS (the list below, which mirrors
 * src/pages) and what Sanity says about each one. A page belongs in the sitemap
 * because it returns 200, not because a CMS document happens to exist for it —
 * /footer/reviews and /footer/cookie-policy render but have no singletonPage
 * document, and driving purely from documents silently dropped both.
 *
 * Sanity then subtracts: a document that is noIndex, or whose httpStatus is not
 * 200, is removed. A 301/302/410 must never appear in a sitemap, which is what
 * httpStatus on the document is for.
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
/** Routes that render. Mirrors src/pages; see the note above. */
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
      .fetch(`*[_type == "singletonPage" && !(_id in path("drafts.**"))]{ pageId, route, httpStatus, noIndex, _updatedAt }`)
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

  // Index the documents by the route they claim, then let them subtract from
  // and annotate the rendered routes.
  const byRoute = new Map<string, any>();
  for (const p of pages as any[]) if (p.route) byRoute.set(p.route, p);

  const staticEntries: Entry[] = STATIC_ROUTES.filter((r) => {
    const doc = byRoute.get(r);
    if (!doc) return true;                                   // renders, no document — still belongs
    if (doc.noIndex === true) return false;
    return (doc.httpStatus ?? '200') === '200';
  }).map((r) => ({ loc: r, lastmod: isoDate(byRoute.get(r)?._updatedAt) }));

  // A document may also claim a route that is not in the list above — trust it,
  // so a new page added in the Studio appears without a code change.
  for (const [route, doc] of byRoute) {
    if (STATIC_ROUTES.includes(route)) continue;
    if (doc.noIndex === true || (doc.httpStatus ?? '200') !== '200') continue;
    staticEntries.push({ loc: route, lastmod: isoDate(doc._updatedAt) });
  }

  const entries: Entry[] = [
    ...staticEntries,
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
