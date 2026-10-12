import { test } from 'node:test';
import assert from 'node:assert/strict';
import { ID_PATTERNS, FALLBACK_GA4_ID, isValidId, resolveIds, gateProviders, verificationTags, clientConfig } from './integrations.ts';
import { ID_PATTERNS as STUDIO_PATTERNS } from '../../sanity/lib/integrationIds.ts';
import { planSubmission, indexNowPing, urlsFromPayload, urlForDoc, safeEqual, isValidIndexNowKey, MAX_URLS_PER_CALL } from './indexnow.ts';
import { shouldLog, cleanReferrer, createNotFoundLogger, DAILY_ROW_CAP, ROWS_PER_LOG, type D1Like } from './not-found.ts';

const CANON = 'www.wugweb.com';
const allIds = { ga4: 'G-ABC1234', gtm: 'GTM-ABC123', yandex: '12345678', clarity: 'abcd1234ef', hotjar: '1234567' };

// ── ID validators ──
test('ID validators accept real formats and reject junk', () => {
  const good: Record<string, string> = {
    ga4MeasurementId: 'G-W5WJ1PMTKD', gtmContainerId: 'GTM-ABC123', yandexMetricaId: '98765432', clarityId: 'abcd1234ef',
    hotjarId: '1234567', googleSiteVerification: 'AbC-123_xyzAbC-123_xyz0', bingSiteVerification: '0123456789ABCDEF0123456789ABCDEF', yandexVerification: '0123456789abcdef',
  };
  for (const [f, v] of Object.entries(good)) assert.equal(isValidId(f as any, v), true, f);
  assert.equal(isValidId('ga4MeasurementId', 'UA-12345-1'), false);
  assert.equal(isValidId('gtmContainerId', 'G-ABC1234'), false);
  assert.equal(isValidId('hotjarId', '12ab'), false);
  assert.equal(isValidId('googleSiteVerification', '<meta name="google-site-verification" content="x">'), false);
  assert.equal(isValidId('ga4MeasurementId', undefined), false);
});

test('Studio and site ID patterns are identical (drift guard)', () => {
  assert.deepEqual(Object.keys(STUDIO_PATTERNS).sort(), Object.keys(ID_PATTERNS).sort());
  for (const k of Object.keys(ID_PATTERNS) as Array<keyof typeof ID_PATTERNS>) {
    assert.equal(STUDIO_PATTERNS[k].source, ID_PATTERNS[k].source, k);
  }
});

test('resolveIds: GA4 falls back when empty, invalid or settings missing; invalid others dropped', () => {
  assert.equal(resolveIds(null).ga4, FALLBACK_GA4_ID);
  assert.equal(resolveIds({ ga4MeasurementId: '' }).ga4, FALLBACK_GA4_ID);
  assert.equal(resolveIds({ ga4MeasurementId: 'nonsense' }).ga4, FALLBACK_GA4_ID);
  assert.equal(resolveIds({ ga4MeasurementId: 'G-NEW12345' }).ga4, 'G-NEW12345');
  assert.equal(resolveIds({ hotjarId: 'abc' }).hotjar, undefined);
});

// ── Provider registry gating ──
test('nothing loads off the canonical host', () => {
  for (const host of ['wugweb.pages.dev', 'uat.wugweb.com', 'localhost', 'abc123.wugweb.pages.dev']) {
    const r = gateProviders(allIds, { hostname: host, consent: { analytics: true } });
    assert.equal(r.load.length, 0, host);
  }
});

test('nothing loads without analytics consent (reject = no request)', () => {
  assert.equal(gateProviders(allIds, { hostname: CANON, consent: { analytics: false } }).load.length, 0);
  assert.equal(gateProviders(allIds, { hostname: CANON, consent: {} }).load.length, 0);
});

test('a provider with no ID never loads', () => {
  const r = gateProviders({ ga4: 'G-ABC1234' }, { hostname: CANON, consent: { analytics: true } });
  assert.deepEqual(r.load.map((p) => p.key), ['ga4']);
});

test('GA4 + GTM together: GTM is skipped with the reason reported', () => {
  const r = gateProviders(allIds, { hostname: CANON, consent: { analytics: true } });
  assert.deepEqual(r.load.map((p) => p.key), ['ga4', 'yandex', 'clarity', 'hotjar']);
  assert.match(r.skipped.find((s) => s.key === 'gtm')!.reason, /double-counts/);
});

test('both canonical hosts are allowed', () => {
  assert.equal(gateProviders({ ga4: 'G-ABC1234' }, { hostname: 'wugweb.com', consent: { analytics: true } }).load.length, 1);
});

test('clientConfig carries provider IDs only, never verification tokens', () => {
  const cfg = clientConfig({ ...allIds, googleVerification: 'secret-ish-but-public-token-0000' });
  assert.deepEqual(Object.keys(cfg).sort(), ['clarity', 'ga4', 'gtm', 'hotjar', 'yandex']);
});

// ── Verification tags ──
test('verification tags render on the canonical host only', () => {
  const ids = { googleVerification: 'AbC-123_xyzAbC-123_xyz0', bingVerification: '0123456789ABCDEF0123456789ABCDEF', yandexVerification: '0123456789abcdef' };
  assert.deepEqual(verificationTags(ids, CANON).map((t) => t.name), ['google-site-verification', 'msvalidate.01', 'yandex-verification']);
  assert.deepEqual(verificationTags(ids, 'wugweb.pages.dev'), []);
  assert.deepEqual(verificationTags({}, CANON), []);
});

// ── IndexNow ──
test('IndexNow: caps at 100 URLs per call', () => {
  const urls = Array.from({ length: 150 }, (_, i) => `https://${CANON}/blog/p-${i}`);
  const r = planSubmission(urls, CANON, new Map());
  assert.equal(r.submit.length, MAX_URLS_PER_CALL);
  assert.equal(r.dropped.overCap.length, 50);
});

test('IndexNow: dedupes, drops off-host and non-https URLs', () => {
  const r = planSubmission([`https://${CANON}/a`, `https://${CANON}/a`, 'https://evil.example/a', `http://${CANON}/b`, 'not a url'], CANON, new Map());
  assert.deepEqual(r.submit, [`https://${CANON}/a`]);
  assert.equal(r.dropped.offHost.length, 3);
});

test('IndexNow: debounce skips URLs pinged in the last 10 minutes, and only after a 200/202', async () => {
  const recent = new Map<string, number>();
  const calls: any[] = [];
  const ok = async (_u: any, init: any) => { calls.push(JSON.parse(init.body)); return new Response(null, { status: 202 }); };
  const first = await indexNowPing([`https://${CANON}/x`], { key: 'abcd1234', host: CANON, recent, fetchImpl: ok as any, now: 1_000 });
  assert.equal(first.status, 202);
  assert.equal(calls[0].keyLocation, `https://${CANON}/abcd1234.txt`);
  const second = await indexNowPing([`https://${CANON}/x`], { key: 'abcd1234', host: CANON, recent, fetchImpl: ok as any, now: 2_000 });
  assert.equal(second.status, null, 'debounced: no call');
  assert.equal(calls.length, 1);
  // a rejected ping is not debounced, so it can be retried
  const recent2 = new Map<string, number>();
  const bad = async () => new Response(null, { status: 403 });
  await indexNowPing([`https://${CANON}/y`], { key: 'abcd1234', host: CANON, recent: recent2, fetchImpl: bad as any, now: 1 });
  assert.equal(recent2.size, 0);
});

test('IndexNow: webhook payload → URLs', () => {
  const o = `https://${CANON}`;
  assert.equal(urlForDoc({ _type: 'post', slug: { current: 'hi' } }, o), `${o}/blog/hi`);
  assert.equal(urlForDoc({ _type: 'caseStudy', slug: 'acme' }, o), `${o}/work/acme`);
  assert.equal(urlForDoc({ _type: 'singletonPage', route: '/about' }, o), `${o}/about`);
  assert.equal(urlForDoc({ _type: 'asset', slug: 'x' }, o), null);
  assert.deepEqual(urlsFromPayload({ urls: ['a', 1, 'b'] }, o), ['a', 'b']);
  assert.deepEqual(urlsFromPayload([{ _type: 'post', slug: 'a' }, { _type: 'service', slug: 'b' }], o), [`${o}/blog/a`, `${o}/services/b`]);
});

test('IndexNow: key format and constant-time secret compare', () => {
  assert.equal(isValidIndexNowKey('abcd1234'), true);
  assert.equal(isValidIndexNowKey('short'), false);
  assert.equal(isValidIndexNowKey('has space here'), false);
  assert.equal(safeEqual('Bearer abc', 'Bearer abc'), true);
  assert.equal(safeEqual('Bearer abc', 'Bearer abd'), false);
  assert.equal(safeEqual('Bearer abc', 'Bearer ab'), false);
});

// ── 404 monitor ──
const UA = 'Mozilla/5.0 (Macintosh) Safari/605';

test('404 filter: ignores bots, assets, scan probes, reserved and long paths', () => {
  assert.equal(shouldLog('/old-page', UA), true);
  assert.equal(shouldLog('/old-page', 'Googlebot/2.1'), false);
  assert.equal(shouldLog('/old-page', null), false, 'no user agent');
  for (const p of ['/x.png', '/wp-admin', '/wp-login.php', '/.env', '/index.php', '/.git/config', '/api/x', '/assets/a', '/_astro/x.js']) {
    assert.equal(shouldLog(p, UA), false, p);
  }
  assert.equal(shouldLog('/' + 'a'.repeat(201), UA), false);
});

test('404 referrer keeps origin + path only', () => {
  assert.equal(cleanReferrer('https://google.com/search?q=secret'), 'https://google.com/search');
  assert.equal(cleanReferrer('javascript:alert(1)'), null);
  assert.equal(cleanReferrer(null), null);
});

/** Minimal in-memory D1 fake covering the statements the logger uses. */
function fakeD1() {
  const rows = new Map<string, { count: number; last_seen: number; last_referrer: string | null }>();
  const budget = new Map<string, number>();
  let rowsWritten = 0;
  const stmt = (sql: string) => ({
    bind: (...v: any[]) => ({
      _sql: sql, _v: v,
      async first() { return sql.startsWith('SELECT n') ? (budget.has(v[0]) ? { n: budget.get(v[0])! } : null) : null; },
      async run() {
        if (sql.startsWith('DELETE')) { let n = 0; for (const [k, r] of rows) if (r.last_seen < v[0]) { rows.delete(k); n++; } rowsWritten += n; return { meta: { changes: n } }; }
        if (sql.startsWith('UPDATE write_budget')) { budget.set(v[1], (budget.get(v[1]) ?? 0) + v[0]); return { meta: { changes: 1 } }; }
        return { meta: { changes: 0 } };
      },
    }),
  });
  const db: D1Like & { rows: typeof rows; budget: typeof budget; written: () => number } = {
    prepare: stmt as any,
    async batch(stmts: any[]) {
      for (const s of stmts) {
        if (s._sql.includes('INTO not_found')) {
          const [path, t, ref] = s._v; const r = rows.get(path);
          rows.set(path, { count: (r?.count ?? 0) + 1, last_seen: t, last_referrer: ref ?? r?.last_referrer ?? null });
          rowsWritten++;
        } else if (s._sql.includes('INTO write_budget')) {
          budget.set(s._v[0], (budget.get(s._v[0]) ?? 0) + s._v[1]); rowsWritten++;
        }
      }
      return [];
    },
    rows, budget, written: () => rowsWritten,
  } as any;
  return db;
}

test('404 monitor: logs, counts and keeps the referrer', async () => {
  let now = Date.UTC(2026, 9, 13, 12);
  const db = fakeD1();
  const log = createNotFoundLogger({ now: () => now });
  assert.equal(await log(db, '/old-page?x=1', 'https://example.org/a?q=1', UA), 'logged');
  now += 61_000;
  assert.equal(await log(db, '/old-page/', null, UA), 'logged');
  const r = db.rows.get('/old-page')!;
  assert.equal(r.count, 2);
  assert.equal(r.last_referrer, 'https://example.org/a', 'a later hit with no referrer keeps the last one');
});

test('404 monitor: same path deduped within a minute (one write per instance per minute)', async () => {
  let now = Date.UTC(2026, 9, 13, 12);
  const db = fakeD1();
  const log = createNotFoundLogger({ now: () => now });
  assert.equal(await log(db, '/scan-me', null, UA), 'logged');
  for (let i = 0; i < 50; i++) { now += 500; assert.equal(await log(db, '/scan-me', null, UA), 'deduped'); }
  assert.equal(db.rows.get('/scan-me')!.count, 1);
});

test('404 monitor: stops for the day once the 20k row budget is used, resumes next UTC day', async () => {
  let now = Date.UTC(2026, 9, 13, 12);
  const db = fakeD1();
  db.budget.set('2026-10-13', DAILY_ROW_CAP - ROWS_PER_LOG + 1); // one more log would exceed the cap
  const log = createNotFoundLogger({ now: () => now });
  assert.equal(await log(db, '/a', null, UA), 'capped');
  assert.equal(await log(db, '/b', null, UA), 'capped', 'cap is remembered in memory — no further reads');
  assert.equal(db.rows.size, 0);
  now = Date.UTC(2026, 9, 14, 0, 0, 1);
  assert.equal(await log(db, '/a', null, UA), 'logged');
});

test('404 monitor: prunes rows older than 90 days, once per day, and counts the deletes', async () => {
  const now = Date.UTC(2026, 9, 13, 12);
  const db = fakeD1();
  db.rows.set('/ancient', { count: 3, last_seen: now - 91 * 86_400_000, last_referrer: null });
  db.rows.set('/recent', { count: 1, last_seen: now - 5 * 86_400_000, last_referrer: null });
  const log = createNotFoundLogger({ now: () => now });
  await log(db, '/new', null, UA);
  assert.equal(db.rows.has('/ancient'), false);
  assert.equal(db.rows.has('/recent'), true);
  assert.equal(db.budget.get('2026-10-13'), ROWS_PER_LOG + 1, 'the deleted row counts against the budget');
});

test('404 monitor: a failing database returns "error", never throws', async () => {
  const broken = { prepare: () => ({ bind: () => ({ first: async () => { throw new Error('d1 down'); }, run: async () => ({}) }) }), batch: async () => [] } as any;
  const log = createNotFoundLogger();
  assert.equal(await log(broken, '/x', null, UA), 'error');
  assert.equal(await log(null, '/x', null, UA), 'filtered');
});
