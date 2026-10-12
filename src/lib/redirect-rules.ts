/**
 * Loads redirect rules from Sanity for the middleware. The matching itself is
 * pure and lives in redirects.ts.
 *
 * Free-tier safe (governance.md Rule 1):
 *   - One GROQ query through the CDN host (sanityClient has useCdn: true).
 *   - Cached in module memory for 60 s, so a request does not cost a Sanity
 *     call; concurrent misses share one in-flight fetch.
 *   - Bounded: a slow fetch is abandoned after 1.5 s.
 *   - Never throws. A failed or slow fetch yields no rules, and the failure is
 *     cached for the same 60 s so an outage is not retried on every request.
 */
import { sanityClient } from './sanity';
import { compileRules, type RedirectRule } from './redirects';

const TTL_MS = 60_000;
const FETCH_TIMEOUT_MS = 1_500;

// Published only. 410 needs no destination; 301/302 need redirectTo.
const QUERY = `{
  "redirects": *[_type == "redirect" && !(_id in path("drafts.**")) && enabled != false]
    | order(_createdAt asc) { source, destination, statusCode },
  "pages": *[_type == "singletonPage" && !(_id in path("drafts.**"))
    && httpStatus in ["301", "302", "410"] && defined(route)
    && (httpStatus == "410" || defined(redirectTo))] { route, httpStatus, redirectTo }
}`;

type Compiled = ReturnType<typeof compileRules>;

export interface RuleSet {
  /** From `redirect` docs — applied only when the route itself did not resolve. */
  redirects: Compiled;
  /** From `singletonPage.httpStatus` — the page's own instruction for its route. */
  pages: Compiled;
}

interface RawRules {
  redirects?: Array<{ source?: string; destination?: string; statusCode?: number; status?: number; enabled?: boolean }>;
  pages?: Array<{ route?: string; httpStatus?: string; redirectTo?: string }>;
}

export function buildRuleSet(raw: RawRules | null | undefined): RuleSet {
  const redirects: RedirectRule[] = (raw?.redirects ?? []).map((r) => ({
    source: r.source ?? '',
    destination: r.destination ?? null,
    status: Number(r.statusCode ?? r.status),
    enabled: r.enabled,
  }));
  const pages: RedirectRule[] = (raw?.pages ?? []).map((p) => ({
    source: p.route ?? '',
    destination: p.redirectTo ?? null,
    status: Number(p.httpStatus),
  }));
  return { redirects: compileRules(redirects), pages: compileRules(pages) };
}

const EMPTY: RuleSet = buildRuleSet(null);
let cache: { set: RuleSet; expiresAt: number } | null = null;
let inflight: Promise<RuleSet> | null = null;

async function fetchRules(): Promise<RuleSet> {
  let timer: ReturnType<typeof setTimeout> | undefined;
  try {
    const timeout = new Promise<null>((resolve) => {
      timer = setTimeout(() => resolve(null), FETCH_TIMEOUT_MS);
    });
    const raw = await Promise.race([sanityClient.fetch<RawRules>(QUERY), timeout]);
    return raw ? buildRuleSet(raw) : EMPTY;
  } catch {
    return EMPTY;
  } finally {
    if (timer) clearTimeout(timer);
  }
}

export async function loadRedirectRules(now = Date.now()): Promise<RuleSet> {
  if (cache && cache.expiresAt > now) return cache.set;
  if (!inflight) {
    inflight = fetchRules()
      .then((set) => {
        cache = { set, expiresAt: Date.now() + TTL_MS };
        return set;
      })
      .catch(() => EMPTY)
      .finally(() => {
        inflight = null;
      });
  }
  return inflight;
}
