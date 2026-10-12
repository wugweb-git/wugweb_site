/**
 * IndexNow — tells Bing, Yandex, Seznam and Naver that URLs changed.
 * Pure: the network call is injected, so batching, the cap and the debounce
 * are unit-tested without hitting anything.
 *
 * Never submits to Google: Google does not take IndexNow, and relies on
 * sitemap.xml plus Search Console instead.
 *
 * Dormant until DNS cutover. IndexNow only accepts URLs whose host also serves
 * the key file (/<key>.txt), and www.wugweb.com still serves the old Framer
 * build, so submissions are rejected until DNS moves — the same deliberate
 * state as GA4.
 */

export const INDEXNOW_ENDPOINT = 'https://api.indexnow.org/indexnow';
export const MAX_URLS_PER_CALL = 100;
export const DEBOUNCE_MS = 10 * 60_000;

/** Only real content routes; anything else in a webhook payload is ignored. */
export function urlForDoc(doc: Record<string, any> | null | undefined, origin: string): string | null {
  if (!doc) return null;
  const slug = typeof doc.slug === 'string' ? doc.slug : doc.slug?.current;
  const base = origin.replace(/\/+$/, '');
  switch (doc._type) {
    case 'post':
      return slug ? `${base}/blog/${slug}` : null;
    case 'caseStudy':
      return slug ? `${base}/work/${slug}` : null;
    case 'service':
      return slug ? `${base}/services/${slug}` : null;
    case 'singletonPage':
      return typeof doc.route === 'string' && doc.route.startsWith('/') ? `${base}${doc.route === '/' ? '/' : doc.route}` : null;
    default:
      return null;
  }
}

/** Webhook body → URL list. Accepts {urls: [...]}, one doc, or an array of docs. */
export function urlsFromPayload(body: unknown, origin: string): string[] {
  if (!body || typeof body !== 'object') return [];
  const b = body as any;
  if (Array.isArray(b.urls)) return b.urls.filter((u: unknown) => typeof u === 'string');
  const docs = Array.isArray(b) ? b : [b];
  return docs.map((d) => urlForDoc(d, origin)).filter((u): u is string => Boolean(u));
}

export interface PlanResult {
  submit: string[];
  dropped: { offHost: string[]; debounced: string[]; overCap: string[] };
}

/**
 * Decide what to send: same host only, deduped, not pinged within
 * DEBOUNCE_MS (per Worker instance — `recent` is in-memory), capped at 100.
 */
export function planSubmission(urls: string[], host: string, recent: Map<string, number>, now = Date.now()): PlanResult {
  const offHost: string[] = [];
  const debounced: string[] = [];
  const fresh: string[] = [];
  const seen = new Set<string>();
  for (const raw of urls) {
    let u: URL;
    try {
      u = new URL(raw);
    } catch {
      offHost.push(raw);
      continue;
    }
    if (u.hostname !== host || u.protocol !== 'https:') {
      offHost.push(raw);
      continue;
    }
    const href = u.href;
    if (seen.has(href)) continue;
    seen.add(href);
    const last = recent.get(href);
    if (last !== undefined && now - last < DEBOUNCE_MS) {
      debounced.push(href);
      continue;
    }
    fresh.push(href);
  }
  return {
    submit: fresh.slice(0, MAX_URLS_PER_CALL),
    dropped: { offHost, debounced, overCap: fresh.slice(MAX_URLS_PER_CALL) },
  };
}

export interface PingOptions {
  key: string;
  host: string; // e.g. www.wugweb.com
  recent: Map<string, number>;
  fetchImpl?: typeof fetch;
  now?: number;
}

export async function indexNowPing(urls: string[], opts: PingOptions): Promise<PlanResult & { status: number | null }> {
  const now = opts.now ?? Date.now();
  const plan = planSubmission(urls, opts.host, opts.recent, now);
  if (!plan.submit.length) return { ...plan, status: null };
  const res = await (opts.fetchImpl ?? fetch)(INDEXNOW_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify({
      host: opts.host,
      key: opts.key,
      keyLocation: `https://${opts.host}/${opts.key}.txt`,
      urlList: plan.submit,
    }),
  });
  // 200/202 = accepted. Only then are the URLs debounced.
  if (res.status === 200 || res.status === 202) for (const u of plan.submit) opts.recent.set(u, now);
  return { ...plan, status: res.status };
}

/** IndexNow keys: 8–128 chars of a-z, A-Z, 0-9 and '-'. */
export const isValidIndexNowKey = (key: unknown): key is string =>
  typeof key === 'string' && /^[A-Za-z0-9-]{8,128}$/.test(key);

/** Constant-time string compare for the webhook secret. */
export function safeEqual(a: string, b: string): boolean {
  if (typeof a !== 'string' || typeof b !== 'string' || a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}
