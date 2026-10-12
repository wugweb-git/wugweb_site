/**
 * Third-party integrations — pure: no DOM, no network, no Astro. The browser
 * loaders live in analytics.ts; this decides WHAT may load and WHY NOT.
 *
 * IDs come from siteSettings (group "Integrations"). They are public
 * identifiers, never secrets. Two gates, unchanged from the GA4-only version:
 *   1. HOST    — canonical host only (src/lib/hosts.ts).
 *   2. CONSENT — the banner's analytics category; reject means no request.
 * Every provider sits behind both. A provider with no ID never loads.
 *
 * Keep ID_PATTERNS in step with sanity/lib/integrationIds.ts — the test
 * suite fails if the two copies differ.
 */
import { isCanonicalHost } from './hosts.ts';

export const FALLBACK_GA4_ID = 'G-W5WJ1PMTKD';

export const ID_PATTERNS = {
  ga4MeasurementId: /^G-[A-Z0-9]{4,15}$/,
  gtmContainerId: /^GTM-[A-Z0-9]{4,10}$/,
  yandexMetricaId: /^\d{5,12}$/,
  clarityId: /^[a-z0-9]{8,14}$/,
  hotjarId: /^\d{5,10}$/,
  googleSiteVerification: /^[A-Za-z0-9_-]{20,90}$/,
  bingSiteVerification: /^[A-Fa-f0-9]{32}$/,
  yandexVerification: /^[a-f0-9]{16}$/,
} as const;

export type IdField = keyof typeof ID_PATTERNS;

export function isValidId(field: IdField, value: unknown): boolean {
  return typeof value === 'string' && ID_PATTERNS[field].test(value.trim());
}

export interface IntegrationIds {
  ga4?: string;
  gtm?: string;
  yandex?: string;
  clarity?: string;
  hotjar?: string;
  googleVerification?: string;
  bingVerification?: string;
  yandexVerification?: string;
}

/** siteSettings → validated IDs. GA4 falls back to the long-standing ID when
 *  the field is empty, invalid, or settings failed to load, so behaviour does
 *  not change. Any other invalid ID is dropped rather than emitted. */
export function resolveIds(settings: Record<string, unknown> | null | undefined): IntegrationIds {
  const s = settings ?? {};
  const pick = (field: IdField) => (isValidId(field, s[field]) ? String(s[field]).trim() : undefined);
  return {
    ga4: pick('ga4MeasurementId') ?? FALLBACK_GA4_ID,
    gtm: pick('gtmContainerId'),
    yandex: pick('yandexMetricaId'),
    clarity: pick('clarityId'),
    hotjar: pick('hotjarId'),
    googleVerification: pick('googleSiteVerification'),
    bingVerification: pick('bingSiteVerification'),
    yandexVerification: pick('yandexVerification'),
  };
}

export type ProviderKey = 'ga4' | 'gtm' | 'yandex' | 'clarity' | 'hotjar';
export type ConsentCategory = 'analytics';

/** Registry: every provider, its ID slot and the consent category it needs.
 *  The banner has necessary / functional / analytics; all five are analytics.
 *  Note: a GTM container can inject marketing tags too — what it fires is
 *  configured in GTM, outside this site's consent gate. */
export const PROVIDERS: ReadonlyArray<{ key: ProviderKey; consent: ConsentCategory; label: string }> = [
  { key: 'ga4', consent: 'analytics', label: 'Google Analytics 4' },
  { key: 'gtm', consent: 'analytics', label: 'Google Tag Manager' },
  { key: 'yandex', consent: 'analytics', label: 'Yandex Metrica' },
  { key: 'clarity', consent: 'analytics', label: 'Microsoft Clarity' },
  { key: 'hotjar', consent: 'analytics', label: 'Hotjar' },
];

export interface GateResult {
  load: Array<{ key: ProviderKey; id: string }>;
  skipped: Array<{ key: ProviderKey; reason: string }>;
}

/**
 * Which providers may load right now. Pure, so the gates are unit-tested.
 * GA4 + GTM both set would double-count page views when the container also
 * fires GA4, so GTM is NOT loaded in that case and the reason is reported.
 */
export function gateProviders(ids: IntegrationIds, ctx: { hostname: string; consent: Partial<Record<ConsentCategory, boolean>> }): GateResult {
  const result: GateResult = { load: [], skipped: [] };
  const canonical = isCanonicalHost(ctx.hostname);
  for (const p of PROVIDERS) {
    const id = ids[p.key];
    if (!id) {
      result.skipped.push({ key: p.key, reason: 'no ID set' });
    } else if (!canonical) {
      result.skipped.push({ key: p.key, reason: `not the canonical host (${ctx.hostname})` });
    } else if (!ctx.consent[p.consent]) {
      result.skipped.push({ key: p.key, reason: `no ${p.consent} consent` });
    } else if (p.key === 'gtm' && ids.ga4) {
      result.skipped.push({ key: p.key, reason: 'GA4 is also set — loading both double-counts page views. Remove one.' });
    } else {
      result.load.push({ key: p.key, id });
    }
  }
  return result;
}

/** Verification <meta> tags — canonical host only, so a staging copy can
 *  never verify itself in Search Console / Bing / Yandex. */
export function verificationTags(ids: IntegrationIds, hostname: string): Array<{ name: string; content: string }> {
  if (!isCanonicalHost(hostname)) return [];
  const tags: Array<{ name: string; content: string }> = [];
  if (ids.googleVerification) tags.push({ name: 'google-site-verification', content: ids.googleVerification });
  if (ids.bingVerification) tags.push({ name: 'msvalidate.01', content: ids.bingVerification });
  if (ids.yandexVerification) tags.push({ name: 'yandex-verification', content: ids.yandexVerification });
  return tags;
}

/** The provider IDs the browser needs (verification tokens stay server-side). */
export function clientConfig(ids: IntegrationIds): Partial<Record<ProviderKey, string>> {
  const out: Partial<Record<ProviderKey, string>> = {};
  for (const p of PROVIDERS) if (ids[p.key]) out[p.key] = ids[p.key];
  return out;
}
