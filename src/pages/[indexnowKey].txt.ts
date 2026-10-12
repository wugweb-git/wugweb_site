import type { APIRoute } from 'astro';
import { isValidIndexNowKey } from '../lib/indexnow';

export const prerender = false;

/**
 * IndexNow key file: GET /<key>.txt returns the key, proving this host owns
 * it. The key lives in Cloudflare env (INDEXNOW_KEY), not in Sanity. Any other
 * /<something>.txt falls through to a plain 404. Static .txt files in public/
 * (robots, llms, ai-context, security) are served before this route runs.
 */
export const GET: APIRoute = ({ params, locals }) => {
  const key = (locals as any).runtime?.env?.INDEXNOW_KEY;
  if (isValidIndexNowKey(key) && params.indexnowKey === key) {
    return new Response(key, { headers: { 'Content-Type': 'text/plain; charset=utf-8', 'Cache-Control': 'public, max-age=3600' } });
  }
  return new Response('Not found', { status: 404, headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
