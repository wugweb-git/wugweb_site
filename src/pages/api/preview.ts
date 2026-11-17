import type { APIRoute } from 'astro';
import { safeEqual } from '../../lib/indexnow';
import { MIN_TOKEN_LENGTH } from '../../lib/bearer';
import { isSafeBackPath } from '../../lib/forms';

/**
 * GET /api/preview?secret=<PREVIEW_SECRET>&slug=/work/xxx
 *
 * Turns on draft preview for this browser for one hour, then sends the
 * visitor to `slug` on this site.
 *
 * The secret is PREVIEW_SECRET, a random 32+ char value that only opens
 * preview. The Sanity read token never travels in a URL or a cookie: the
 * cookie is just a flag, and the middleware supplies the server-side token
 * (SANITY_TOKEN / SANITY_SYNC_TOKEN) to pages while the flag is set.
 */
export const prerender = false;

export const PREVIEW_COOKIE = '__sanity_preview';

export const GET: APIRoute = async ({ request, redirect, cookies, locals }) => {
  const url = new URL(request.url);
  const expected = (locals as any)?.runtime?.env?.PREVIEW_SECRET;
  if (typeof expected !== 'string' || expected.length < MIN_TOKEN_LENGTH) {
    return new Response('Preview is not configured', { status: 503 });
  }
  if (!safeEqual(url.searchParams.get('secret') ?? '', expected)) {
    return new Response('Invalid preview secret', { status: 401 });
  }

  const slug = url.searchParams.get('slug');
  const target = isSafeBackPath(slug) ? slug : '/';

  cookies.set(PREVIEW_COOKIE, '1', {
    path: '/',
    httpOnly: true,
    sameSite: 'lax',
    secure: true,
    maxAge: 60 * 60, // 1 hour
  });

  return redirect(target);
};

/** POST /api/preview: turn preview off and go home. */
export const POST: APIRoute = async ({ redirect, cookies }) => {
  cookies.delete(PREVIEW_COOKIE, { path: '/' });
  return redirect('/');
};
