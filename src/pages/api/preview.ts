import type { APIRoute } from 'astro';

/**
 * GET /api/preview?slug=/work/xxx&token=sk...
 *
 * Sets a preview session cookie so pages can load draft content.
 * Called from Sanity Studio preview links.
 */
export const prerender = false;

export const GET: APIRoute = async ({ request, redirect, cookies }) => {
  const url = new URL(request.url);
  const slug = url.searchParams.get('slug') || '/';
  const token = url.searchParams.get('token');

  if (!token || !token.startsWith('sk')) {
    return new Response('Missing or invalid preview token', { status: 401 });
  }

  // Set a preview session cookie — visible to Astro pages
  cookies.set('__sanity_preview', token, {
    path: '/',
    httpOnly: true,
    sameSite: 'lax',
    secure: true,
    maxAge: 60 * 60, // 1 hour
  });

  return redirect(slug);
};

/**
 * GET /api/preview/exit — clear the preview cookie and redirect.
 */
export const POST: APIRoute = async ({ redirect, cookies }) => {
  cookies.delete('__sanity_preview', { path: '/' });
  return redirect('/');
};
