import type { APIRoute } from 'astro';
import { indexNowPing, isValidIndexNowKey, safeEqual, urlsFromPayload } from '../../lib/indexnow';

export const prerender = false;

/**
 * POST /api/indexnow — for a Sanity webhook on publish.
 *
 *   Authorization: Bearer <INDEXNOW_WEBHOOK_SECRET>     (Cloudflare env, never Sanity)
 *   Body: the published document ({_type, slug, route}), an array of them, or {urls: [...]}
 *
 * Submits at most 100 URLs per call, same host only, and skips any URL already
 * pinged in the last 10 minutes on this Worker instance. Never submits to Google.
 * Unconfigured (no key or secret) it answers 503 and does nothing.
 */
const recent = new Map<string, number>();
const CANONICAL_ORIGIN = 'https://www.wugweb.com';

export const POST: APIRoute = async ({ request, locals }) => {
  const env = (locals as any).runtime?.env ?? {};
  const key = env.INDEXNOW_KEY;
  const secret = env.INDEXNOW_WEBHOOK_SECRET;
  if (!isValidIndexNowKey(key) || typeof secret !== 'string' || secret.length < 16) {
    return Response.json({ ok: false, error: 'IndexNow is not configured' }, { status: 503 });
  }

  const auth = request.headers.get('Authorization') ?? '';
  if (!safeEqual(auth, `Bearer ${secret}`)) {
    return Response.json({ ok: false, error: 'Unauthorized' }, { status: 401 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, error: 'Body must be JSON' }, { status: 400 });
  }

  const urls = urlsFromPayload(body, CANONICAL_ORIGIN);
  try {
    const result = await indexNowPing(urls, { key, host: new URL(CANONICAL_ORIGIN).hostname, recent });
    return Response.json({
      ok: result.status === null || result.status === 200 || result.status === 202,
      indexNowStatus: result.status,
      submitted: result.submit.length,
      skipped: {
        offHost: result.dropped.offHost.length,
        debounced: result.dropped.debounced.length,
        overCap: result.dropped.overCap.length,
      },
    });
  } catch {
    return Response.json({ ok: false, error: 'IndexNow request failed' }, { status: 502 });
  }
};
