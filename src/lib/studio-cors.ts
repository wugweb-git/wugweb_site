/** CORS for read-only endpoints the Sanity Studio calls. Exact origins only. */
const STUDIO_ORIGINS = new Set(['https://wugweb.sanity.studio', 'http://localhost:3333']);

export function studioCorsHeaders(request: Request): Record<string, string> {
  const origin = request.headers.get('Origin') ?? '';
  return STUDIO_ORIGINS.has(origin) ? { 'Access-Control-Allow-Origin': origin, Vary: 'Origin' } : { Vary: 'Origin' };
}
