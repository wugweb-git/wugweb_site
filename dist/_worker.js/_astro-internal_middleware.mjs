globalThis.process ??= {}; globalThis.process.env ??= {};
import { e as defineMiddleware, s as sequence } from './chunks/render-context_C24GDJnr.mjs';
import './chunks/astro-designed-error-pages_Dvcx_YkN.mjs';
import './chunks/astro/server_DXCcV6JH.mjs';

const COOKIE_NAME = "visitor_id";
const ONE_YEAR = 60 * 60 * 24 * 365;
const onRequest$2 = defineMiddleware(async (context, next) => {
  if (context.request) {
    let visitorId = context.cookies.get(COOKIE_NAME)?.value;
    if (!visitorId) {
      visitorId = crypto.randomUUID();
      context.cookies.set(COOKIE_NAME, visitorId, {
        path: "/",
        maxAge: ONE_YEAR,
        httpOnly: true,
        sameSite: "lax",
        secure: true
      });
    }
    context.locals.visitorId = visitorId;
  }
  return next();
});

const onRequest$1 = (context, next) => {
  if (context.isPrerendered) {
    context.locals.runtime ??= {
      env: process.env
    };
  }
  return next();
};

const onRequest = sequence(
	onRequest$1,
	onRequest$2
	
);

export { onRequest };
