import { defineMiddleware } from 'astro:middleware';

const COOKIE_NAME = 'visitor_id';
const PREVIEW_COOKIE = '__sanity_preview';
const ONE_YEAR = 60 * 60 * 24 * 365;

export const onRequest = defineMiddleware(async (context, next) => {
  // Skip cookie logic during prerendering (no real request)
  if (context.request) {
    let visitorId = context.cookies.get(COOKIE_NAME)?.value;

    if (!visitorId) {
      visitorId = crypto.randomUUID(); // available globally in the Workers runtime
      context.cookies.set(COOKIE_NAME, visitorId, {
        path: '/',
        maxAge: ONE_YEAR,
        httpOnly: true,
        sameSite: 'lax',
        secure: true,
      });
    }

    context.locals.visitorId = visitorId;

    // Expose the Sanity preview token (set by /api/preview) so pages can
    // use getPreviewClient(token) to load draft content. Never leak it
    // to the client — keep it in locals only.
    const previewToken = context.cookies.get(PREVIEW_COOKIE)?.value;
    if (previewToken?.startsWith('sk')) {
      context.locals.previewToken = previewToken;
    }
  }

  return next();
});
