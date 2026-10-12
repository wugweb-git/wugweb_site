/**
 * 404 monitor — logic only. D1 is injected (binding NOT_FOUND_DB, database
 * wugweb-404), so every safeguard is unit-tested with a fake.
 *
 * Free-tier safeguards (owner-specified, 2026-10-13):
 *   1. A daily budget of 20,000 ROWS WRITTEN, tracked in write_budget. Each
 *      logged 404 costs 2 rows (the path upsert + the counter), so at most
 *      ~10,000 404s/day are recorded; after that, logging stops until the next
 *      UTC day. Free D1 allows 100,000 rows written/day, so this is ≤ 20%.
 *   2. In-memory dedupe: one path is written at most once per minute per
 *      Worker instance, so a scan hammering one path costs one write.
 *   3. Ignored: bots, assets, scanner probes (wp-admin, .env, .php…), reserved
 *      paths, and anything longer than 200 characters.
 *   4. Rows hold path, count, last-seen and last-referrer only (no IP, no UA).
 *      Rows older than 90 days are pruned, at most once a day per instance.
 * Never throws: monitoring must not be able to break a page.
 */

export const DAILY_ROW_CAP = 20_000;
export const ROWS_PER_LOG = 2;
export const DEDUPE_MS = 60_000;
export const RETENTION_MS = 90 * 24 * 60 * 60_000;
export const MAX_PATH_LENGTH = 200;

const BOT_RE = /bot|crawl|spider|slurp|curl|wget|python|httpclient|go-http|java\/|headless|lighthouse|scan|monitor|facebookexternalhit|axios|node-fetch|okhttp|libwww|preview/i;
const ASSET_RE = /\.(png|jpe?g|gif|webp|avif|svg|ico|bmp|css|js|mjs|map|woff2?|ttf|otf|eot|mp4|webm|mov|mp3|wav|pdf|zip|gz|xml|txt|json|webmanifest)$/i;
const SCAN_RE = /(^|\/)(wp-(admin|login|content|includes|json)|wordpress|xmlrpc|phpmyadmin|pma|cgi-bin|vendor\/phpunit|actuator|boaform|owa|ecp|autodiscover|hnap1)(\/|$)|\.(php\d?|asp|aspx|jsp|cgi|env|git|svn|sql|bak|old|ini|ya?ml|log|ds_store)(\/|$)|\/\.(env|git|aws|ssh|htaccess|htpasswd|vscode)/i;
const RESERVED_RE = /^\/(api|assets|_astro)(\/|$)/i;

/** Should this 404 be recorded at all? */
export function shouldLog(path: string, userAgent: string | null | undefined): boolean {
  if (!path || path.length > MAX_PATH_LENGTH) return false;
  if (!userAgent || BOT_RE.test(userAgent)) return false;
  if (RESERVED_RE.test(path) || ASSET_RE.test(path) || SCAN_RE.test(path)) return false;
  return true;
}

/** Referrer reduced to origin + path (no query, which can carry tokens), ≤ 300 chars. */
export function cleanReferrer(ref: string | null | undefined): string | null {
  if (!ref) return null;
  try {
    const u = new URL(ref);
    if (u.protocol !== 'http:' && u.protocol !== 'https:') return null;
    return `${u.origin}${u.pathname}`.slice(0, 300);
  } catch {
    return null;
  }
}

const utcDay = (ms: number) => new Date(ms).toISOString().slice(0, 10);

/** The slice of the D1 API used here. */
export interface D1Like {
  prepare(sql: string): {
    bind(...values: unknown[]): {
      first<T = Record<string, unknown>>(): Promise<T | null>;
      run(): Promise<{ meta?: { changes?: number } }>;
    };
  };
  batch(statements: unknown[]): Promise<unknown[]>;
}

export type LogOutcome = 'logged' | 'filtered' | 'deduped' | 'capped' | 'error';

export function createNotFoundLogger(opts: { now?: () => number; cap?: number } = {}) {
  const now = opts.now ?? (() => Date.now());
  const cap = opts.cap ?? DAILY_ROW_CAP;
  const recent = new Map<string, number>();
  let cappedDay: string | null = null;
  let prunedDay: string | null = null;

  return async function log(db: D1Like | null | undefined, rawPath: string, referrer: string | null, userAgent: string | null): Promise<LogOutcome> {
    if (!db) return 'filtered';
    const path = (rawPath.split(/[?#]/)[0] || '/').replace(/\/+$/, '') || '/';
    if (!shouldLog(path, userAgent)) return 'filtered';

    const t = now();
    const last = recent.get(path);
    if (last !== undefined && t - last < DEDUPE_MS) return 'deduped';

    const day = utcDay(t);
    if (cappedDay === day) return 'capped';

    try {
      const row = await db.prepare('SELECT n FROM write_budget WHERE day = ?').bind(day).first<{ n: number }>();
      const used = Number(row?.n ?? 0);
      if (used + ROWS_PER_LOG > cap) {
        cappedDay = day;
        return 'capped';
      }

      await db.batch([
        db.prepare(
          `INSERT INTO not_found (path, count, last_seen, last_referrer) VALUES (?, 1, ?, ?)
           ON CONFLICT(path) DO UPDATE SET count = count + 1, last_seen = excluded.last_seen,
             last_referrer = COALESCE(excluded.last_referrer, not_found.last_referrer)`,
        ).bind(path, t, cleanReferrer(referrer)),
        db.prepare(
          `INSERT INTO write_budget (day, n) VALUES (?, ?) ON CONFLICT(day) DO UPDATE SET n = n + ?`,
        ).bind(day, ROWS_PER_LOG, ROWS_PER_LOG),
      ]);

      if (recent.size > 5_000) recent.clear(); // bound memory
      recent.set(path, t);

      // 90-day retention, at most once per day per instance. Deleted rows are
      // rows written too, so they count against the same budget.
      if (prunedDay !== day) {
        prunedDay = day;
        const res = await db.prepare('DELETE FROM not_found WHERE last_seen < ?').bind(t - RETENTION_MS).run();
        const deleted = Number(res?.meta?.changes ?? 0);
        if (deleted > 0) {
          await db.prepare('UPDATE write_budget SET n = n + ? WHERE day = ?').bind(deleted, day).run();
        }
      }
      return 'logged';
    } catch {
      return 'error';
    }
  };
}
