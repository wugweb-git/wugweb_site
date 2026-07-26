import { defineMiddleware } from 'astro:middleware';

const COOKIE_NAME = 'visitor_id';
const ONE_YEAR = 60 * 60 * 24 * 365;

export const onRequest = defineMiddleware(async (context, next) => {
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
  return next();
});
