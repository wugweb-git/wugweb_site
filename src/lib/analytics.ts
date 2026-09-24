/**
 * Google Analytics 4.
 *
 * Two gates, both of which must pass before a single byte of gtag is fetched.
 *
 * 1. HOST. The measurement ID belongs to a stream declared as
 *    `https://www.wugweb.com`, and per instruction it is wugweb.com only.
 *    Every other host this build runs on — wugweb.pages.dev, the uat branch
 *    alias, per-branch previews, localhost — is excluded. Staging traffic in a
 *    production property is not a small annoyance: it inflates sessions,
 *    poisons conversion rates and cannot be retroactively removed from GA4.
 *
 *    Note that www.wugweb.com currently serves the old Framer build, which
 *    carries its own copy of this tag. So this code is correct and dormant at
 *    the same time: it starts reporting the moment DNS moves, and until then it
 *    reports nothing from anywhere. That is the intended state.
 *
 * 2. CONSENT. Audit finding 16 was that the cookie banner controlled nothing —
 *    `applyScripts()` in BaseLayout dispatched `wugweb-analytics-allowed` into
 *    a void, with no listener anywhere in the codebase. This is that listener.
 *    Rejecting optional cookies now genuinely means no analytics, because the
 *    script is never requested rather than requested and asked to behave.
 *
 * Deliberately NOT using Consent Mode's "load denied, upgrade later": that
 * still fetches gtag and still pings Google on every page view. The banner
 * says reject means no tracking, so reject means no request.
 */

const MEASUREMENT_ID = 'G-W5WJ1PMTKD';

/** Hosts allowed to report. Subdomains are not implied — list them. */
const ALLOWED_HOSTS = ['wugweb.com', 'www.wugweb.com'];

let loaded = false;

function loadGtag() {
  if (loaded) return;
  loaded = true;

  const w = window as any;
  w.dataLayer = w.dataLayer || [];
  // Must be a real function declaration, not an arrow: gtag forwards its
  // `arguments` object, which an arrow function does not have.
  function gtag(..._args: any[]) { w.dataLayer.push(arguments); }
  w.gtag = gtag;

  gtag('js', new Date());
  gtag('config', MEASUREMENT_ID);

  const s = document.createElement('script');
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${MEASUREMENT_ID}`;
  document.head.appendChild(s);
}

export function initAnalytics() {
  if (typeof window === 'undefined') return;
  if (!ALLOWED_HOSTS.includes(window.location.hostname)) return;

  // BaseLayout fires this on a fresh accept AND on load when consent was
  // already stored, so both paths are covered by the one listener.
  window.addEventListener('wugweb-analytics-allowed', loadGtag);
}
