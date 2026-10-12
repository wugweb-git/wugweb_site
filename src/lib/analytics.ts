/**
 * Google Analytics 4.
 *
 * Two gates, both of which must pass before a single byte of gtag is fetched.
 *
 * 1. HOST. The measurement ID belongs to a stream declared as
 *    `https://www.wugweb.com`, and per instruction it is wugweb.com only.
 *    Every other host this build runs on — wugweb.pages.dev, uat.wugweb.com,
 *    the uat branch alias, per-branch previews, localhost — is excluded.
 *    Staging traffic in a production property is not a small annoyance: it
 *    inflates sessions, poisons conversion rates, and cannot be retroactively
 *    removed from GA4.
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

import { isCanonicalHost } from './hosts';
import { FALLBACK_GA4_ID, gateProviders, type ProviderKey } from './integrations';

/*
 * More providers (2026-10-13): GTM, Yandex Metrica, Microsoft Clarity and
 * Hotjar, each loading only when its ID is set in siteSettings → Integrations,
 * and each behind the SAME two gates as GA4 — the host gate in initAnalytics()
 * and the analytics-consent event. Which providers may load is decided by the
 * pure gateProviders() in integrations.ts (unit-tested); this file only knows
 * how to load each one. GA4's events and data-gtag-event handling are unchanged.
 */

const loadedProviders = new Set<ProviderKey>();

/**
 * Fire a GA4 event.
 *
 * Safe to call from anywhere at any time. Before consent, on a staging host,
 * or with an ad blocker present, `gtag` simply does not exist and this drops
 * the event. Dropping is correct — an event queued through a refusal would be
 * consent theatre of exactly the kind finding 16 described.
 */
export function trackEvent(name: string, params: Record<string, unknown> = {}) {
  const g = (window as any).gtag;
  if (typeof g !== 'function') return;
  g('event', name, params);
}

/**
 * Conversions, keyed off the URL the server redirected to.
 *
 * Both forms on this site are plain `method="POST"` submissions, not fetch —
 * the browser navigates away on submit. Tracking the submit click would race
 * that navigation and lose events. The redirect target is the honest signal:
 * it is reached only when the server actually accepted the submission.
 *
 * /thank-you            ← api/contact success (and the subscribe honeypot path)
 * /contact-error        ← api/contact failure. Worth an event: it is the only
 *                         way a broken form shows up in analytics rather than
 *                         as silence that looks like nobody was interested.
 * /footer/subscription?subscribed=1  ← api/subscribe real success
 *
 * GA4 recommended event names are used where one fits (generate_lead,
 * sign_up), because those get first-class treatment in the UI.
 */
function trackPageConversions() {
  const { pathname, search } = window.location;

  if (pathname === '/thank-you') {
    trackEvent('generate_lead', { form: 'contact' });
  } else if (pathname === '/contact-error') {
    trackEvent('form_error', { form: 'contact' });
  } else if (pathname === '/footer/subscription' && new URLSearchParams(search).get('subscribed') === '1') {
    trackEvent('sign_up', { method: 'newsletter' });
  }
}

/**
 * Declarative click tracking: `data-gtag-event="name"` on any element, with
 * optional `data-gtag-*` attributes becoming event parameters.
 *
 *   <a href="https://wa.me/…" data-gtag-event="whatsapp_click" data-gtag-location="contact">
 *
 * One delegated listener on the document, so markup added later still works
 * and no page needs to import anything. `closest()` means a click on an icon
 * inside the link still resolves to the link.
 */
function bindClickTracking() {
  document.addEventListener('click', (e) => {
    const el = (e.target as HTMLElement | null)?.closest<HTMLElement>('[data-gtag-event]');
    if (!el) return;
    const name = el.dataset.gtagEvent;
    if (!name) return;
    const params: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(el.dataset)) {
      if (key === 'gtagEvent' || !key.startsWith('gtag') || value === undefined) continue;
      // dataset gives us gtagLocation → location
      const param = key.slice(4).replace(/^[A-Z]/, (c) => c.toLowerCase());
      params[param] = value;
    }
    trackEvent(name, params);
  });
}

function loadGtag(measurementId: string) {

  const w = window as any;
  w.dataLayer = w.dataLayer || [];
  // Must be a real function declaration, not an arrow: gtag forwards its
  // `arguments` object, which an arrow function does not have.
  function gtag(..._args: any[]) { w.dataLayer.push(arguments); }
  w.gtag = gtag;

  gtag('js', new Date());
  gtag('config', measurementId, {
    // Opt into GA4's DebugView from a URL, so the tag can be verified against
    // the live property without guessing. ?ga_debug=1
    ...(new URLSearchParams(window.location.search).get('ga_debug') === '1'
      ? { debug_mode: true }
      : {}),
  });

  const s = document.createElement('script');
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
  document.head.appendChild(s);

  // Only now can events land. Running these inside loadGtag rather than at
  // init means a visitor who accepts consent WHILE sitting on /thank-you still
  // has their conversion counted, instead of it being dropped a second earlier.
  trackPageConversions();
  bindClickTracking();
}

function addScript(src: string) {
  const s = document.createElement('script');
  s.async = true;
  s.src = src;
  document.head.appendChild(s);
}

/** Google Tag Manager. No <noscript> iframe: that would load without consent. */
function loadGtm(containerId: string) {
  const w = window as any;
  w.dataLayer = w.dataLayer || [];
  w.dataLayer.push({ 'gtm.start': Date.now(), event: 'gtm.js' });
  addScript(`https://www.googletagmanager.com/gtm.js?id=${encodeURIComponent(containerId)}`);
}

function loadYandexMetrica(counterId: string) {
  const w = window as any;
  w.ym = w.ym || function (...args: unknown[]) { (w.ym.a = w.ym.a || []).push(args); };
  w.ym.l = Date.now();
  addScript('https://mc.yandex.ru/metrika/tag.js');
  w.ym(Number(counterId), 'init', { clickmap: true, trackLinks: true, accurateTrackBounce: true });
}

function loadClarity(projectId: string) {
  const w = window as any;
  w.clarity = w.clarity || function (...args: unknown[]) { (w.clarity.q = w.clarity.q || []).push(args); };
  addScript(`https://www.clarity.ms/tag/${encodeURIComponent(projectId)}`);
}

function loadHotjar(siteId: string) {
  const w = window as any;
  w.hj = w.hj || function (...args: unknown[]) { (w.hj.q = w.hj.q || []).push(args); };
  w._hjSettings = { hjid: Number(siteId), hjsv: 6 };
  addScript(`https://static.hotjar.com/c/hotjar-${encodeURIComponent(siteId)}.js?sv=6`);
}

const LOADERS: Record<ProviderKey, (id: string) => void> = {
  ga4: loadGtag,
  gtm: loadGtm,
  yandex: loadYandexMetrica,
  clarity: loadClarity,
  hotjar: loadHotjar,
};

/** IDs rendered by BaseLayout (canonical host only). If the block is missing
 *  or unreadable, fall back to GA4 alone — exactly the previous behaviour. */
function readConfig(): Partial<Record<ProviderKey, string>> {
  try {
    const el = document.getElementById('wugweb-integrations');
    const parsed = el ? JSON.parse(el.textContent || '{}') : null;
    return parsed && typeof parsed === 'object' ? parsed : { ga4: FALLBACK_GA4_ID };
  } catch {
    return { ga4: FALLBACK_GA4_ID };
  }
}

function loadAllowedProviders() {
  const { load, skipped } = gateProviders(readConfig(), {
    hostname: window.location.hostname,
    consent: { analytics: true }, // this runs only on the analytics-consent event
  });
  for (const { key, id } of load) {
    if (loadedProviders.has(key)) continue;
    loadedProviders.add(key);
    LOADERS[key](id);
  }
  const gtm = skipped.find((s) => s.key === 'gtm' && s.reason.startsWith('GA4'));
  if (gtm) console.warn(`[analytics] GTM not loaded: ${gtm.reason}`);
}

export function initAnalytics() {
  if (typeof window === 'undefined') return;
  if (!isCanonicalHost(window.location.hostname)) return;

  // BaseLayout fires this on a fresh accept AND on load when consent was
  // already stored, so both paths are covered by the one listener.
  window.addEventListener('wugweb-analytics-allowed', loadAllowedProviders);
}
