/**
 * Public integration ID formats, for Studio validation. Keep in step with
 * ID_PATTERNS in src/lib/integrations.ts — src/lib/integrations.test.ts fails
 * if the two copies differ.
 */
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

const EXAMPLES: Record<IdField, string> = {
  ga4MeasurementId: 'G-XXXXXXXXXX',
  gtmContainerId: 'GTM-XXXXXXX',
  yandexMetricaId: 'a number, e.g. 12345678',
  clarityId: '10 lowercase letters/digits',
  hotjarId: 'a number, e.g. 1234567',
  googleSiteVerification: 'the content="…" value only',
  bingSiteVerification: '32 hex characters (msvalidate.01 content)',
  yandexVerification: '16 hex characters (yandex-verification content)',
};

/** Sanity custom validator: empty is fine; anything else must match. */
export const idValidator = (field: IdField) => (value: unknown): true | string => {
  if (value == null || value === '') return true;
  const v = String(value).trim();
  if (/[<>"]/.test(v)) return 'Paste only the ID or the content value, not the whole tag.';
  if (/^(sk|key|secret|token)[_-]/i.test(v) || v.length > 100) return 'This looks like a key or secret. Never paste API keys or secrets here.';
  return ID_PATTERNS[field].test(v) || `Expected ${EXAMPLES[field]}.`;
};
