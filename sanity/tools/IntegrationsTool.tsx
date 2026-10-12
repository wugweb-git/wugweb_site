/**
 * Integrations checklist — read-only.
 *   1. Which IDs are set in Site Settings → Integrations, and whether each is valid.
 *   2. What each host ACTUALLY serves (via the site's /api/integrations-status,
 *      which reads the live HTML), with warnings.
 *   3. Top 404s from the D1 monitor (/api/not-found-report).
 *
 * SITE_API is the deployed site, not www.wugweb.com: until DNS cutover that
 * host serves the old Framer build, which has none of these endpoints.
 */
import { useEffect, useState } from 'react';
import { useClient } from 'sanity';
import { Box, Card, Flex, Spinner, Stack, Text } from '@sanity/ui';
import { ID_PATTERNS, type IdField } from '../lib/integrationIds';

const SITE_API = 'https://wugweb.pages.dev';
const CANONICAL = 'www.wugweb.com';

const FIELDS: Array<{ field: IdField; label: string; kind: 'provider' | 'verification' }> = [
  { field: 'ga4MeasurementId', label: 'Google Analytics 4', kind: 'provider' },
  { field: 'gtmContainerId', label: 'Google Tag Manager', kind: 'provider' },
  { field: 'yandexMetricaId', label: 'Yandex Metrica', kind: 'provider' },
  { field: 'clarityId', label: 'Microsoft Clarity', kind: 'provider' },
  { field: 'hotjarId', label: 'Hotjar', kind: 'provider' },
  { field: 'googleSiteVerification', label: 'Google Search Console verification', kind: 'verification' },
  { field: 'bingSiteVerification', label: 'Bing verification', kind: 'verification' },
  { field: 'yandexVerification', label: 'Yandex verification', kind: 'verification' },
];

function useJson<T>(url: string): { data: T | null; error: string | null } {
  const [state, setState] = useState<{ data: T | null; error: string | null }>({ data: null, error: null });
  useEffect(() => {
    let alive = true;
    fetch(url)
      .then((r) => r.json())
      .then((data) => alive && setState({ data, error: null }))
      .catch((e) => alive && setState({ data: null, error: String(e?.message ?? e) }));
    return () => {
      alive = false;
    };
  }, [url]);
  return state;
}

const Row = ({ label, value, tone }: { label: string; value: string; tone?: 'positive' | 'caution' | 'critical' }) => (
  <Flex gap={3}>
    <Box flex={1}><Text size={1}>{label}</Text></Box>
    <Text size={1} style={{ color: tone === 'critical' ? '#e5484d' : tone === 'caution' ? '#d4a017' : tone === 'positive' ? '#30a46c' : undefined }}>{value}</Text>
  </Flex>
);

export function IntegrationsTool() {
  const client = useClient({ apiVersion: '2026-01-01' });
  const [settings, setSettings] = useState<Record<string, string> | null>(null);
  const status = useJson<any>(`${SITE_API}/api/integrations-status`);
  const report = useJson<any>(`${SITE_API}/api/not-found-report`);

  useEffect(() => {
    client
      .fetch(`*[_type == "siteSettings" && !(_id in path("drafts.**"))][0]{ ${FIELDS.map((f) => f.field).join(', ')} }`)
      .then((s) => setSettings(s ?? {}))
      .catch(() => setSettings({}));
  }, [client]);

  const warnings: string[] = [];
  const canonical = status.data?.hosts?.find((h: any) => h.host === CANONICAL);
  const anyProviderSet = settings && FIELDS.some((f) => f.kind === 'provider' && settings[f.field]);
  if (canonical?.framer || (canonical && !canonical.servesThisSite)) {
    warnings.push(`${CANONICAL} is still serving the old Framer build, not this site. Provider IDs and verification tags set here take effect only after DNS cutover.`);
  }
  if (settings?.gtmContainerId) {
    warnings.push('GTM is set, but GA4 is always active (its ID or the built-in fallback), so GTM will NOT load — loading both double-counts page views.');
  }
  for (const h of status.data?.hosts ?? []) {
    if (h.host !== CANONICAL && (h.configuredProviders?.length || Object.values(h.verification ?? {}).some(Boolean))) {
      warnings.push(`${h.host} is not the canonical host but is emitting integration tags — this should never happen.`);
    }
  }
  if (anyProviderSet && status.data && !canonical?.servesThisSite) {
    warnings.push('Providers are set, but no page on the canonical host is served by this site yet — nothing is being measured.');
  }

  return (
    <Box padding={4}>
      <Stack space={5}>
        <Text size={3} weight="bold">Integrations</Text>

        {warnings.length ? (
          <Card padding={3} radius={2} tone="caution" border>
            <Stack space={2}>{warnings.map((w, i) => <Text key={i} size={1}>⚠ {w}</Text>)}</Stack>
          </Card>
        ) : null}

        <Stack space={3}>
          <Text size={2} weight="semibold">IDs in Site Settings → Integrations</Text>
          {!settings ? <Spinner /> : FIELDS.map(({ field, label }) => {
            const v = settings[field];
            const valid = !v || ID_PATTERNS[field].test(String(v).trim());
            const shown = !v ? (field === 'ga4MeasurementId' ? 'not set — fallback G-W5WJ1PMTKD in use' : 'not set') : valid ? `${v} ✓` : `${v} — INVALID, ignored`;
            return <Row key={field} label={label} value={shown} tone={!v ? undefined : valid ? 'positive' : 'critical'} />;
          })}
        </Stack>

        <Stack space={3}>
          <Text size={2} weight="semibold">What each host serves (live HTML)</Text>
          {status.error ? <Text size={1}>Could not reach {SITE_API}: {status.error}</Text> : !status.data ? <Spinner /> : (
            status.data.hosts.map((h: any) => (
              <Card key={h.host} padding={3} radius={2} border>
                <Stack space={2}>
                  <Text size={1} weight="semibold">{h.host}{h.host === CANONICAL ? ' (canonical)' : ''}</Text>
                  {h.error ? <Text size={1}>Unreachable: {h.error}</Text> : (
                    <>
                      <Row label="Serves this site" value={h.servesThisSite ? 'yes' : h.framer ? 'no — old Framer build' : 'no'} tone={h.servesThisSite ? 'positive' : 'caution'} />
                      <Row label="Provider config emitted" value={h.configuredProviders?.length ? h.configuredProviders.join(', ') : 'none'} />
                      <Row label="Verification tags" value={Object.entries(h.verification ?? {}).filter(([, v]) => v).map(([k]) => k).join(', ') || 'none'} />
                      <Row label="Third-party tags hardcoded in HTML" value={Object.entries(h.hardcodedTags ?? {}).filter(([, v]) => v).map(([k]) => k).join(', ') || 'none'} />
                      <Row label="noindex" value={h.noindex ? 'yes' : 'no'} />
                    </>
                  )}
                </Stack>
              </Card>
            ))
          )}
          <Text size={1} muted>Providers load in the browser only after analytics consent, so their scripts never appear in this site's HTML.</Text>
        </Stack>

        <Stack space={3}>
          <Text size={2} weight="semibold">Top 404s (last 90 days)</Text>
          {report.error ? <Text size={1}>Could not load: {report.error}</Text> : !report.data ? <Spinner /> : !report.data.ok ? (
            <Text size={1}>{report.data.error}</Text>
          ) : (
            <>
              <Text size={1} muted>
                Today: {report.data.today.rowsWritten.toLocaleString()} of {report.data.today.cap.toLocaleString()} daily rows used. Bots, assets and scanner probes are not recorded.
              </Text>
              {report.data.rows.length === 0 ? <Text size={1}>No 404s recorded yet.</Text> : report.data.rows.map((r: any) => (
                <Row key={r.path} label={`${r.path}${r.last_referrer ? `  ← ${r.last_referrer}` : ''}`} value={`${r.count} · ${new Date(r.last_seen).toISOString().slice(0, 10)}`} />
              ))}
            </>
          )}
        </Stack>
      </Stack>
    </Box>
  );
}
