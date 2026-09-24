import type { APIRoute } from 'astro';
import { isCanonicalHost } from '../lib/hosts';

export const prerender = false;

/**
 * robots.txt
 *
 * This was a static file in public/, which meant every host serving this build
 * got the same permissive answer — including uat.wugweb.com, which went live on
 * 2026-09-24 as a public, crawlable copy of the entire site. A staging domain
 * left open is how a crawler ends up ranking the wrong hostname; the canonical
 * tag pointing at www is a hint, not a directive, and does not stop crawling.
 *
 * So it is generated per request now, and non-canonical hosts get a flat
 * refusal. Moving it out of public/ is what makes this work at all: a file
 * there is served straight from the CDN and lands in _routes.json's exclude
 * list, so the Worker never sees the request and cannot know which host asked.
 *
 * The canonical text below is unchanged from the static file.
 */
const CANONICAL_BODY = `User-agent: *
Allow: /

Disallow: /cgi-bin/
Disallow: /api/

# Error, system and redirect-only routes. These are excluded from sitemap.xml
# for the same reason.
Disallow: /404
Disallow: /404-2
Disallow: /offline
Disallow: /contact-error
Disallow: /thank-you

# AI crawler policy. Allowed deliberately: being readable is how this site gets
# cited in AI answers, and the content here is public marketing material. Flip
# any of these to Disallow if that calculus changes — and keep
# siteSettings.crawlerPolicy in step, since that field exists to record the
# decision.
User-agent: GPTBot
Allow: /

User-agent: OAI-SearchBot
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: Google-Extended
Allow: /

# www, not the apex: wugweb.com 308-redirects to www.wugweb.com, and this line
# previously named the apex, so the advertised sitemap was a redirect to a URL
# that 404'd.
Sitemap: https://www.wugweb.com/sitemap.xml
`;

/** Every non-canonical host: uat, pages.dev, branch aliases, localhost. */
const STAGING_BODY = `# Staging host. This is a copy of https://www.wugweb.com and must not be
# crawled or indexed under this hostname.
User-agent: *
Disallow: /
`;

export const GET: APIRoute = async ({ url }) => {
  const canonical = isCanonicalHost(url.hostname);
  return new Response(canonical ? CANONICAL_BODY : STAGING_BODY, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      // Short, and never shared between hosts — the body depends on the Host
      // header, so a cache that ignored it would serve one host's answer to
      // another. Vary makes that explicit for any intermediary.
      'Cache-Control': 'public, max-age=3600',
      Vary: 'Host',
    },
  });
};
