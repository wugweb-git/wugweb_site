import { useCallback, useEffect, useState } from 'react';
import { Box, Card, Flex, Grid, Stack, Text, Badge, Button, Tooltip } from '@sanity/ui';
import { AddIcon, ComposeIcon, SearchIcon, UploadIcon } from '@sanity/icons';
import { useClient } from 'sanity';
import { seoScore, seoLevel } from '../lib/health';
import { relativeTime, plural } from '../lib/format';
import { EmptyState } from '../components/ui';

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
      client.fetch(`*[_type in ["post","caseStudy","service","client","person","asset","engagement","testimonial","taxonomy"]] | group by _type { _type, count }`),
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

export function DashboardTool() {
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
      setError(e?.message || 'Failed to load dashboard');
    } finally {
      setLoading(false);
    }
  }, [client]);

  useEffect(() => { load(); }, [load]);

  if (loading) {
    return <Box padding={4}><Text muted>Loading dashboard…</Text></Box>;
  }
  if (error || !data) {
    return <Box padding={4}><Text style={{ color: '#e54f30' }}>{error}</Text><Button text="Retry" mode="ghost" onClick={load} style={{ marginTop: 8 }} /></Box>;
  }

  const totalDocs = Object.values(data.counts).reduce((a, b) => a + b, 0);
  const missingSeoPct = totalDocs ? Math.round((data.missingSeo / totalDocs) * 100) : 0;

  const quickActions = [
    { label: 'New Blog Post', icon: ComposeIcon, onClick: () => { window.location.hash = '#/structure/intent/create/type=post;template=post'; } },
    { label: 'New Case Study', icon: AddIcon, onClick: () => { window.location.hash = '#/structure/intent/create/type=caseStudy;template=caseStudy'; } },
    { label: 'New Client', icon: AddIcon, onClick: () => { window.location.hash = '#/structure/intent/create/type=client;template=client'; } },
    { label: 'Open Tables', icon: SearchIcon, onClick: () => { window.location.hash = '#/tables'; } },
  ];

  return (
    <Card tone="default" padding={[2, 3]} style={{ minHeight: '100%' }}>
      <Flex align="center" gap={3} paddingBottom={4}>
        <Box flex={1}>
          <Text size={3} weight="semibold">Operations Dashboard</Text>
          <Text size={1} muted>Website health · content audit · publishing queue</Text>
        </Box>
        <Button text="Refresh" mode="ghost" onClick={load} />
      </Flex>

      {/* Website Health */}
      <Text size={2} weight="semibold" muted style={{ margin: '16px 0 8px' }}>Website Health</Text>
      <Grid columns={[2, 3, 5]} gap={2}>
        <StatCard label="Total documents" value={totalDocs} tone="primary" />
        <StatCard label="Drafts" value={data.drafts} tone="caution" />
        <StatCard label="Missing SEO" value={data.missingSeo} tone={missingSeoPct > 20 ? 'critical' : 'caution'} />
        <StatCard label="Missing cover" value={data.missingCover} tone="caution" />
        <StatCard label="Sync errors" value={data.syncErrors} tone={data.syncErrors > 0 ? 'critical' : 'positive'} />
        <StatCard label="Media (missing path)" value={data.mediaMissingPath} tone="caution" />
        <StatCard label="Media (archived)" value={data.mediaArchived} tone="default" />
        <StatCard label="Published today" value={data.publishedToday} tone="positive" />
        <StatCard label="Scheduled posts" value={data.scheduled} tone="caution" />
        <StatCard label="Updated (7d)" value={data.updatedRecent} tone="default" />
      </Grid>

      {/* Content Audit */}
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

      {/* Quick Actions */}
      <Text size={2} weight="semibold" muted style={{ margin: '24px 0 8px' }}>Quick actions</Text>
      <Flex gap={2} wrap="wrap">
        {quickActions.map((a) => (
          <Button key={a.label} text={a.label} icon={a.icon} mode="ghost" onClick={a.onClick} />
        ))}
      </Flex>

      {/* Sync status strip */}
      <Text size={2} weight="semibold" muted style={{ margin: '24px 0 8px' }}>System status</Text>
      <Flex gap={2} wrap="wrap">
        <Badge tone={data.syncErrors > 0 ? 'critical' : 'positive'}>{data.syncErrors > 0 ? `${data.syncErrors} sync error(s)` : 'All syncs healthy'}</Badge>
        <Badge tone={data.scheduled > 0 ? 'caution' : 'default'}>{data.scheduled > 0 ? `${data.scheduled} scheduled` : 'No scheduled posts'}</Badge>
      </Flex>
    </Card>
  );
}

export default DashboardTool;
