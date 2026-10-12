import type { APIRoute } from 'astro';
import { DAILY_ROW_CAP, RETENTION_MS } from '../../lib/not-found';
import { studioCorsHeaders } from '../../lib/studio-cors';

export const prerender = false;

/**
 * GET /api/not-found-report — top 404s for the Studio Integrations tool.
 * Read-only. Paths and referrers only (no IP, no user agent). Two small D1
 * reads per call, against a free allowance of 5M rows read/day.
 */
export const GET: APIRoute = async ({ request, locals }) => {
  const headers = { ...studioCorsHeaders(request), 'Cache-Control': 'private, max-age=60' };
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
