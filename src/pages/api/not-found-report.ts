import type { APIRoute } from 'astro';
import { DAILY_ROW_CAP, RETENTION_MS } from '../../lib/not-found';
import { studioCorsHeaders } from '../../lib/studio-cors';
import { checkBearer } from '../../lib/bearer';

export const prerender = false;

/**
 * GET /api/not-found-report — top 404s. Read-only. Paths and referrers only
 * (no IP, no user agent). Two small D1 reads per call, against a free
 * allowance of 5M rows read/day.
 *
 * Private: needs `Authorization: Bearer <NOT_FOUND_REPORT_TOKEN>` (a Pages
 * secret, never in Sanity or the repo). 401 without it; 503 if the secret is
 * not set on the deployment (fails closed). Until 2026-10-13 any GET returned
 * the rows — CORS only limited browsers. No caller exists since the Studio
 * Integrations tool was removed; query it with curl or read D1 directly.
 */
export const GET: APIRoute = async ({ request, locals }) => {
  const headers = { ...studioCorsHeaders(request), 'Cache-Control': 'private, max-age=60' };
  const env = (locals as any).runtime?.env ?? {};
  const auth = checkBearer(request.headers.get('Authorization'), env.NOT_FOUND_REPORT_TOKEN);
  if (auth === 'unconfigured') return Response.json({ ok: false, error: 'Not configured' }, { status: 503, headers });
  if (auth !== 'ok') {
    return Response.json({ ok: false, error: 'Unauthorized' }, { status: 401, headers: { ...headers, 'WWW-Authenticate': 'Bearer' } });
  }
  const db = (locals as any).runtime?.env?.NOT_FOUND_DB;
  if (!db) return Response.json({ ok: false, error: 'NOT_FOUND_DB is not bound on this deployment' }, { status: 503, headers });
  try {
    const since = Date.now() - RETENTION_MS;
    const { results } = await db
      .prepare('SELECT path, count, last_seen, last_referrer FROM not_found WHERE last_seen >= ? ORDER BY count DESC, last_seen DESC LIMIT 100')
      .bind(since)
      .all();
    const day = new Date().toISOString().slice(0, 10);
    const budget = await db.prepare('SELECT n FROM write_budget WHERE day = ?').bind(day).first();
    return Response.json(
      { ok: true, rows: results ?? [], today: { day, rowsWritten: Number(budget?.n ?? 0), cap: DAILY_ROW_CAP } },
      { headers },
    );
  } catch {
    return Response.json({ ok: false, error: 'Query failed' }, { status: 500, headers });
  }
};
