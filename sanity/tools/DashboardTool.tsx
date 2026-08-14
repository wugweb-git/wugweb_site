import { useCallback, useEffect, useState } from 'react';
import { Box, Card, Flex, Grid, Stack, Text, Badge, Button, Tooltip } from '@sanity/ui';
import { AddIcon, ComposeIcon, SearchIcon, UploadIcon } from '@sanity/icons';
import { useClient } from 'sanity';
import { seoScore, seoLevel } from '../lib/health';
import { relativeTime, plural } from '../lib/format';
import { EmptyState } from '../components/ui';
import { StudioErrorBoundary } from '../components/StudioErrorBoundary';

interface DashboardData {
  counts: Record<string, number>;
  drafts: number;
  missingSeo: number;
  missingCover: number;
  publishedToday: number;
  scheduled: number;
  updatedRecent: number;
  syncErrors: number;
  mediaMissingPath: number;
  mediaArchived: number;
  contentTypes: { _type: string; count: number }[];
}

async function loadDashboard(client: any): Promise<DashboardData> {
  const [counts, drafts, missingSeo, missingCover, publishedToday, scheduled, updatedRecent, syncErrors, mediaMissingPath, mediaArchived, contentTypes] =
    await Promise.all([
      client.fetch(`{
        "caseStudy": count(*[_type=="caseStudy"]),
        "post": count(*[_type=="post"]),
        "service": count(*[_type=="service"]),
        "client": count(*[_type=="client"]),
        "person": count(*[_type=="person"]),
        "asset": count(*[_type=="asset"]),
        "engagement": count(*[_type=="engagement"]),
        "testimonial": count(*[_type=="testimonial"]),
        "taxonomy": count(*[_type=="taxonomy"]),
        "contactSubmission": count(*[_type=="contactSubmission"])
      }`),
      client.fetch(`count(*[_id in path("drafts.**")])`),
      client.fetch(`count(*[_type in ["post","caseStudy","service","singletonPage"] && !defined(seoDescription)])`),
      client.fetch(`count(*[_type in ["post","caseStudy"] && !defined(coverImage) && !defined(coverPath)])`),
      client.fetch(`count(*[_type=="post" && dateTime(publishedAt) >= dateTime(now() - 86400000)])`),
      client.fetch(`count(*[_type=="post" && dateTime(publishedAt) > now()])`),
      client.fetch(`count(*[_type=="post" && _updatedAt >= dateTime(now() - 604800000)])`),
      client.fetch(`count(*[_type=="syncStatus" && status=="error"])`),
      client.fetch(`count(*[_type=="asset" && !defined(relativePath) && !defined(sitePath) && !defined(r2Key)])`),
      client.fetch(`count(*[_type=="asset" && status=="Archived"])`),
      client.fetch(`{
        "post": count(*[_type=="post"]),
        "caseStudy": count(*[_type=="caseStudy"]),
        "service": count(*[_type=="service"]),
        "client": count(*[_type=="client"]),
        "person": count(*[_type=="person"]),
        "asset": count(*[_type=="asset"]),
        "engagement": count(*[_type=="engagement"]),
        "testimonial": count(*[_type=="testimonial"]),
        "taxonomy": count(*[_type=="taxonomy"])
      }`).then((res: Record<string, number>) => Object.entries(res || {}).map(([_type, count]) => ({ _type, count }))),
    ]);
  return {
    counts: counts ?? {},
    drafts: drafts ?? 0,
    missingSeo: missingSeo ?? 0,
    missingCover: missingCover ?? 0,
    publishedToday: publishedToday ?? 0,
    scheduled: scheduled ?? 0,
    updatedRecent: updatedRecent ?? 0,
    syncErrors: syncErrors ?? 0,
    mediaMissingPath: mediaMissingPath ?? 0,
    mediaArchived: mediaArchived ?? 0,
    contentTypes: contentTypes ?? [],
  };
}

function StatCard({ label, value, tone = 'default', onClick }: { label: string; value: number; tone?: 'default' | 'positive' | 'caution' | 'critical' | 'primary'; onClick?: () => void }) {
  return (
    <Card border radius={2} padding={3} as={onClick ? 'button' : 'div'} onClick={onClick} style={{ textAlign: 'left', cursor: onClick ? 'pointer' : 'default', transition: 'transform 120ms ease, border-color 120ms ease' }}
      onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'; }}
      onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.transform = 'none'; }}
    >
      <Stack space={2}>
        <Text size={1} muted>{label}</Text>
        <Text size={4} weight="bold" style={{ color: tone === 'critical' ? '#e54f30' : tone === 'positive' ? '#1f9d61' : tone === 'caution' ? '#b7791f' : tone === 'primary' ? 'var(--card-primary-fg-color, #4c9aff)' : 'inherit' }}>{value}</Text>
      </Stack>
    </Card>
  );
}

function DashboardToolContent() {
  const client = useClient({ apiVersion: '2024-01-01' });
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      setData(await loadDashboard(client));
    } catch (e: any) {
      setError(e?.message || 'Failed to load dashboard statistics.');
    } finally {
      setLoading(false);
    }
  }, [client]);

  useEffect(() => { load(); }, [load]);

  if (loading) {
    return <Card padding={5} style={{ textAlign: 'center' }}><Text size={2} muted>Loading Studio Dashboard…</Text></Card>;
  }
  if (error || !data) {
    return <Card padding={4} tone="critical" radius={2} margin={4}><Stack space={3}><Text size={2} weight="bold">Dashboard Error</Text><Text size={1}>{error || 'No data available.'}</Text><Button text="Retry" mode="ghost" onClick={load} style={{ alignSelf: 'flex-start' }} /></Stack></Card>;
  }

  const navIntent = (type: string) => { window.location.hash = `#/structure/${type}`; };
  const quickActions = [
    { label: 'New Post', icon: ComposeIcon, onClick: () => { window.location.hash = '#/structure/intent/create/type=post'; } },
    { label: 'New Case Study', icon: ComposeIcon, onClick: () => { window.location.hash = '#/structure/intent/create/type=caseStudy'; } },
    { label: 'Upload Asset', icon: UploadIcon, onClick: () => { window.location.hash = '#/structure/intent/create/type=brandAsset'; } },
    { label: 'SEO Manager', icon: SearchIcon, onClick: () => { window.location.hash = '#/seo'; } },
  ];

  return (
    <Card padding={[3, 4, 5]} tone="default">
      <Flex align="center" justify="space-between" marginBottom={4}>
        <Stack space={1}>
          <Text size={3} weight="bold">Website Back-Office Dashboard</Text>
          <Text size={1} muted>Health audit, content volume & operational metrics</Text>
        </Stack>
        <Button text="Refresh" mode="ghost" onClick={load} />
      </Flex>

      <Grid columns={[2, 3, 4]} gap={3}>
        <StatCard label="Total Posts" value={data.counts.post || 0} onClick={() => navIntent('post')} />
        <StatCard label="Case Studies" value={data.counts.caseStudy || 0} onClick={() => navIntent('caseStudy')} />
        <StatCard label="Clients" value={data.counts.client || 0} onClick={() => navIntent('client')} />
        <StatCard label="Assets" value={data.counts.asset || 0} onClick={() => navIntent('brandAsset')} />
        <StatCard label="Drafts (Unpublished)" value={data.drafts} tone="caution" onClick={() => navIntent('post')} />
        <StatCard label="Missing SEO Meta" value={data.missingSeo} tone={data.missingSeo > 0 ? 'caution' : 'positive'} onClick={() => { window.location.hash = '#/seo'; }} />
        <StatCard label="Missing Covers" value={data.missingCover} tone={data.missingCover > 0 ? 'caution' : 'positive'} />
        <StatCard label="Published today" value={data.publishedToday} tone="positive" />
        <StatCard label="Scheduled posts" value={data.scheduled} tone="caution" />
        <StatCard label="Updated (7d)" value={data.updatedRecent} tone="default" />
      </Grid>

      <Text size={2} weight="semibold" muted style={{ margin: '24px 0 8px' }}>Content by type</Text>
      <Grid columns={[2, 3, 4]} gap={2}>
        {data.contentTypes.map((c) => (
          <Card key={c._type} border radius={2} padding={3}>
            <Stack space={1}>
              <Text size={1} muted>{c._type}</Text>
              <Text size={3} weight="semibold">{c.count}</Text>
            </Stack>
          </Card>
        ))}
      </Grid>

      <Text size={2} weight="semibold" muted style={{ margin: '24px 0 8px' }}>Quick actions</Text>
      <Flex gap={2} wrap="wrap">
        {quickActions.map((a) => (
          <Button key={a.label} text={a.label} icon={a.icon} mode="ghost" onClick={a.onClick} />
        ))}
      </Flex>

      <Text size={2} weight="semibold" muted style={{ margin: '24px 0 8px' }}>System status</Text>
      <Flex gap={2} wrap="wrap">
        <Badge tone={data.syncErrors > 0 ? 'critical' : 'positive'}>{data.syncErrors > 0 ? `${data.syncErrors} sync error(s)` : 'All syncs healthy'}</Badge>
        <Badge tone={data.scheduled > 0 ? 'caution' : 'default'}>{data.scheduled > 0 ? `${data.scheduled} scheduled` : 'No scheduled posts'}</Badge>
      </Flex>
    </Card>
  );
}

export function DashboardTool() {
  return (
    <StudioErrorBoundary toolTitle="Dashboard">
      <DashboardToolContent />
    </StudioErrorBoundary>
  );
}

export default DashboardTool;
