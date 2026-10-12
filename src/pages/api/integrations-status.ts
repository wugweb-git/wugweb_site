import type { APIRoute } from 'astro';
import { studioCorsHeaders } from '../../lib/studio-cors';

export const prerender = false;

/**
 * GET /api/integrations-status — what each known host ACTUALLY serves, read
 * from its live HTML. A fixed host list (no user-supplied URL, so no SSRF).
 * Three subrequests per call (free plan allows 50 per request).
 *
 * Providers load client-side only after consent, so their scripts are never in
 * this site's HTML. What the HTML does show: the provider config block,
 * verification tags, noindex, and any third-party tag a DIFFERENT build (the
 * old Framer site) hardcodes.
 */
const HOSTS = ['www.wugweb.com', 'wugweb.pages.dev', 'uat.wugweb.com'];

function inspect(html: string) {
  const config = html.match(/<script id="wugweb-integrations" type="application\/json">([^<]*)<\/script>/);
  let providers: string[] = [];
  try {
    providers = config ? Object.keys(JSON.parse(config[1])) : [];
  } catch {
    providers = [];
  }
  return {
    servesThisSite: /\/_astro\//.test(html),
    framer: /<meta[^>]+name="generator"[^>]+Framer/i.test(html),
    noindex: /<meta[^>]+name="robots"[^>]+noindex/i.test(html),
    configuredProviders: providers,
    verification: {
      google: /name="google-site-verification"/.test(html),
      bing: /name="msvalidate\.01"/.test(html),
      yandex: /name="yandex-verification"/.test(html),
    },
    hardcodedTags: {
      googleTag: /googletagmanager\.com\/(gtag\/js|gtm\.js)/.test(html),
      clarity: /clarity\.ms\/tag/.test(html),
      hotjar: /static\.hotjar\.com/.test(html),
      yandex: /mc\.yandex\.ru\/metrika/.test(html),
    },
  };
}

export const GET: APIRoute = async ({ request }) => {
  const headers = { ...studioCorsHeaders(request), 'Cache-Control': 'private, max-age=60' };
  const hosts = await Promise.all(
    HOSTS.map(async (host) => {
      const ctrl = new AbortController();
      const timer = setTimeout(() => ctrl.abort(), 5_000);
      try {
        const res = await fetch(`https://${host}/`, { redirect: 'follow', signal: ctrl.signal, headers: { 'User-Agent': 'wugweb-integrations-check' } });
        const html = await res.text();
        return { host, status: res.status, finalUrl: res.url, ...inspect(html) };
      } catch (e) {
        return { host, status: null, error: String((e as Error)?.name === 'AbortError' ? 'timeout' : e) };
      } finally {
        clearTimeout(timer);
      }
    }),
  );
  return Response.json({ ok: true, checkedAt: new Date().toISOString(), hosts }, { headers });
};
