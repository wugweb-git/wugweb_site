import { useCallback, useEffect, useState } from 'react';
import { Box, Card, Flex, Grid, Stack, Text, Badge, Button } from '@sanity/ui';
import { ComposeIcon, SearchIcon, UploadIcon } from '@sanity/icons';
import { useClient } from 'sanity';
import { useRouter } from 'sanity/router';
import { seoLevel } from '../lib/health';
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
  // Single batched GROQ fetch instead of 11 parallel requests (free-tier API credit savings)
  const d = await client.fetch(`{
    "post":              count(*[_type=="post"            && !(_id in path("drafts.**"))]),
    "caseStudy":         count(*[_type=="caseStudy"       && !(_id in path("drafts.**"))]),
    "service":           count(*[_type=="service"         && !(_id in path("drafts.**"))]),
    "client":            count(*[_type=="client"          && !(_id in path("drafts.**"))]),
    "person":            count(*[_type=="person"          && !(_id in path("drafts.**"))]),
    "asset":             count(*[_type=="asset"           && !(_id in path("drafts.**"))]),
    "engagement":        count(*[_type=="engagement"      && !(_id in path("drafts.**"))]),
    "testimonial":       count(*[_type=="testimonial"     && !(_id in path("drafts.**"))]),
    "taxonomy":          count(*[_type=="taxonomy"        && !(_id in path("drafts.**"))]),
    "contactSubmission": count(*[_type=="contactSubmission"]),
    "drafts":            count(*[_id in path("drafts.**")]),
    "missingSeo":        count(*[_type in ["post","caseStudy","service","singletonPage"] && !(_id in path("drafts.**")) && !defined(seoDescription)]),
    "missingCover":      count(*[_type in ["post","caseStudy"] && !(_id in path("drafts.**")) && !defined(coverImage) && !defined(coverPath)]),
    "publishedToday":    count(*[_type=="post" && !(_id in path("drafts.**")) && dateTime(publishedAt) >= dateTime(now() - 86400)]),
    "scheduled":         count(*[_type=="post" && !(_id in path("drafts.**")) && dateTime(publishedAt) > now()]),
    "updatedRecent":     count(*[_type=="post" && !(_id in path("drafts.**")) && _updatedAt >= dateTime(now() - 604800)]),
    "syncErrors":        count(*[_type=="syncStatus" && status=="error"]),
    "mediaMissingPath":  count(*[_type=="asset" && !defined(relativePath) && !defined(sitePath) && !defined(r2Key)]),
    "mediaArchived":     count(*[_type=="asset" && status=="Archived"])
  }`);
  const counts: Record<string, number> = {
    post: d.post ?? 0, caseStudy: d.caseStudy ?? 0, service: d.service ?? 0,
    client: d.client ?? 0, person: d.person ?? 0, asset: d.asset ?? 0,
    engagement: d.engagement ?? 0, testimonial: d.testimonial ?? 0,
    taxonomy: d.taxonomy ?? 0, contactSubmission: d.contactSubmission ?? 0,
  };
  return {
    counts,
    drafts:           d.drafts          ?? 0,
    missingSeo:       d.missingSeo      ?? 0,
    missingCover:     d.missingCover    ?? 0,
    publishedToday:   d.publishedToday  ?? 0,
    scheduled:        d.scheduled       ?? 0,
    updatedRecent:    d.updatedRecent   ?? 0,
    syncErrors:       d.syncErrors      ?? 0,
    mediaMissingPath: d.mediaMissingPath ?? 0,
    mediaArchived:    d.mediaArchived    ?? 0,
    contentTypes: Object.entries(counts)
      .filter(([, v]) => v > 0)
      .map(([_type, count]) => ({ _type, count })),
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
        <Text size={4} weight="bold" style={{ color: tone === 'critical' ? 'var(--card-bad-fg-color, #e54f30)' : tone === 'positive' ? 'var(--card-positive-fg-color, #1f9d61)' : tone === 'caution' ? 'var(--card-caution-fg-color, #b7791f)' : tone === 'primary' ? 'var(--card-primary-fg-color, #4c9aff)' : 'inherit' }}>{value}</Text>
      </Stack>
    </Card>
  );
}

function DashboardToolContent() {
  const client = useClient({ apiVersion: '2026-01-01' });
  const { navigateUrl } = useRouter();
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

  const nav = (path: string) => navigateUrl({ path });
  const quickActions = [
    { label: 'New Post',       icon: ComposeIcon,  onClick: () => nav('/structure/intent/create/type=post') },
    { label: 'New Case Study', icon: ComposeIcon,  onClick: () => nav('/structure/intent/create/type=caseStudy') },
    { label: 'Upload Asset',   icon: UploadIcon,   onClick: () => nav('/structure/intent/create/type=brandAsset') },
    // The SEO tool was folded into Tables (2026-10-13): Checks passed / SEO description columns.
    { label: 'SEO in Tables',  icon: SearchIcon,   onClick: () => nav('/tables') },
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
        <StatCard label="Blog Posts"          value={data.counts.post       || 0} onClick={() => nav('/structure/post')} />
        <StatCard label="Case Studies"        value={data.counts.caseStudy  || 0} onClick={() => nav('/structure/caseStudy')} />
        <StatCard label="Clients"             value={data.counts.client     || 0} onClick={() => nav('/structure/client')} />
        <StatCard label="Assets"              value={data.counts.asset      || 0} onClick={() => nav('/structure/asset')} />
        <StatCard label="Drafts Needing Review" value={data.drafts}          tone="caution" onClick={() => nav('/structure')} />
        <StatCard label="Missing SEO Meta"    value={data.missingSeo}       tone={data.missingSeo > 0 ? 'caution' : 'positive'} onClick={() => nav('/tables')} />
        <StatCard label="Missing Covers"      value={data.missingCover}     tone={data.missingCover > 0 ? 'caution' : 'positive'} />
        <StatCard label="Published Today"     value={data.publishedToday}   tone="positive" />
        <StatCard label="Scheduled Posts"     value={data.scheduled}        tone="caution" />
        <StatCard label="Updated (7 days)"    value={data.updatedRecent}    tone="default" />
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
