import { useCallback, useEffect, useMemo, useState } from 'react';
import { Box, Card, Flex, Grid, Stack, Text, Badge, Button, Select, TextInput } from '@sanity/ui';
import { SearchIcon } from '@sanity/icons';
import { useClient } from 'sanity';
import { fetchDocs } from '../lib/groq';
import { formatBytes, plural } from '../lib/format';
import { EmptyState, RowSkeleton } from '../components/ui';
import type { Row } from '../lib/types';

interface AssetRow extends Row {
  name?: string;
  displayName?: string;
  assetGroup?: string;
  mediaType?: string;
  status?: string;
  usage?: string;
  relativePath?: string;
  sitePath?: string;
  r2Key?: string;
  localExists?: boolean;
  r2Synced?: boolean;
  fileName?: string;
  extension?: string;
  linkedCaseStudy?: string;
  linkedClient?: string;
  linkedService?: string;
  linkedPost?: string;
}

const QUERY = `{
  "assets": *[_type=="asset"][0...240] {
    _id, _type, _updatedAt, name, displayName, "slug": slug.current, assetType, mediaType, assetGroup,
    usage, status, folder, relativePath, sitePath, r2Key, publicUrl, fileName, extension,
    localExists, r2Synced, "linkedCaseStudy": linkedCaseStudy->title, "linkedClient": linkedClient->name,
    "linkedService": linkedService->title, "linkedPost": linkedPost->title, linkedPageId
  },
  "total": count(*[_type=="asset"])
}`;

export function MediaTool() {
  const client = useClient({ apiVersion: '2026-01-01' });
  const [rows, setRows] = useState<AssetRow[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [filter, setFilter] = useState<'all' | 'unused' | 'missingAlt' | 'duplicates' | 'oversized' | 'archived'>('all');
  const [q, setQ] = useState('');
  const [group, setGroup] = useState<'all' | 'Work' | 'Services' | 'More' | 'Brand' | 'Blog' | 'Framer'>('all');

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchDocs(client, QUERY) as any;
      setRows(data?.assets ?? []);
      setTotal(data?.total ?? 0);
    } catch (e: any) {
      setError(e?.message || 'Failed to load');
      setRows([]);
    } finally {
      setLoading(false);
    }
  }, [client]);

  useEffect(() => { load(); }, [load]);

  const stats = useMemo(() => {
    const unused = rows.filter((r) => !r.linkedCaseStudy && !r.linkedClient && !r.linkedService && !r.linkedPost && !r.linkedPageId);
    const missingAlt = rows.filter((r) => (r.mediaType === 'Image' || r.mediaType === 'SVG') && !r.usage);
    const byKey = new Map<string, AssetRow[]>();
    rows.forEach((r) => {
      const k = `${r.name ?? ''}|${r.extension ?? ''}`.toLowerCase();
      if (!k) return;
      byKey.set(k, [...(byKey.get(k) ?? []), r]);
    });
    const duplicates = [...byKey.values()].filter((g) => g.length > 1);
    const oversized = rows.filter((r) => r.localExists && (r.assetType === 'Client Asset' || r.assetType === 'Brand Asset'));
    return { total: rows.length, unused: unused.length, missingAlt: missingAlt.length, duplicates: duplicates.length, oversized: oversized.length };
  }, [rows]);

  const filtered = useMemo(() => {
    let out = rows;
    if (group !== 'all') out = out.filter((r) => r.assetGroup === group);
    const needle = q.trim().toLowerCase();
    if (needle) out = out.filter((r) => [r.name, r.displayName, r.relativePath, r.sitePath, r.r2Key].some((f) => String(f ?? '').toLowerCase().includes(needle)));
    switch (filter) {
      case 'unused': out = out.filter((r) => !r.linkedCaseStudy && !r.linkedClient && !r.linkedService && !r.linkedPost && !r.linkedPageId); break;
      case 'missingAlt': out = out.filter((r) => (r.mediaType === 'Image' || r.mediaType === 'SVG') && !r.usage); break;
      case 'duplicates': {
        const byKey = new Map<string, string[]>();
        rows.forEach((r) => { const k = `${r.name}|${r.extension}`.toLowerCase(); byKey.set(k, [...(byKey.get(k) ?? []), r._id]); });
        const dupIds = new Set([...byKey.values()].filter((g) => g.length > 1).flat());
        out = out.filter((r) => dupIds.has(r._id)); break;
      }
      case 'oversized': out = out.filter((r) => r.localExists && (r.assetType === 'Client Asset' || r.assetType === 'Brand Asset')); break;
      case 'archived': out = out.filter((r) => r.status === 'Archived'); break;
      default: break;
    }
    return out;
  }, [rows, group, q, filter]);

  const filterChips: { key: typeof filter; label: string }[] = [
    { key: 'all', label: `All (${stats.total})` },
    { key: 'unused', label: `Unused (${stats.unused})` },
    { key: 'missingAlt', label: `Missing alt (${stats.missingAlt})` },
    { key: 'duplicates', label: `Duplicates (${stats.duplicates})` },
    { key: 'oversized', label: `Oversized (${stats.oversized})` },
    { key: 'archived', label: 'Archived' },
  ];

  return (
    <Card tone="default" padding={[2, 3]} style={{ minHeight: '100%' }}>
      <Flex align="center" gap={2} paddingBottom={3} wrap="wrap">
        <Box flex={1}>
          <Text size={3} weight="semibold">Media Library</Text>
          <Text size={1} muted>
            {rows.length < total
              ? `Showing ${rows.length} of ${total} assets · use filters to narrow`
              : `${total} assets`}
            {' · filters for unused, duplicates, missing alt'}
          </Text>
        </Box>
        <TextInput icon={SearchIcon} placeholder="Search name/path…" value={q} onChange={(e) => setQ(e.currentTarget.value)} style={{ maxWidth: 240 }} />
        <Select value={group} onChange={(e) => setGroup(e.currentTarget.value as any)} style={{ maxWidth: 140 }}>
          <option value="all">All groups</option>
          <option value="Work">Work</option>
          <option value="Services">Services</option>
          <option value="More">More</option>
          <option value="Brand">Brand</option>
          <option value="Blog">Blog</option>
          <option value="Framer">Framer</option>
        </Select>
        <Select value={view} onChange={(e) => setView(e.currentTarget.value as any)} style={{ maxWidth: 110 }}>
          <option value="grid">Grid</option>
          <option value="list">List</option>
        </Select>
        <Button text="Refresh" mode="ghost" onClick={load} />
      </Flex>

      {/* Filter chips */}
      <Flex gap={1} wrap="wrap" paddingBottom={3}>
        {filterChips.map((c) => (
          <Button key={c.key} text={c.label} mode={filter === c.key ? 'default' : 'ghost'} onClick={() => setFilter(c.key)} />
        ))}
      </Flex>

      {loading ? (
        <RowSkeleton cols={4} />
      ) : error ? (
        <Card padding={4} tone="critical"><Text weight="medium">{error}</Text><Button text="Retry" mode="ghost" onClick={load} style={{ marginTop: 8 }} /></Card>
      ) : filtered.length === 0 ? (
        <EmptyState title="No assets match" />
      ) : view === 'grid' ? (
        <Grid columns={[2, 3, 4, 5, 6]} gap={2}>
          {filtered.slice(0, 240).map((r) => {
            const ext = String(r.extension ?? '').toLowerCase();
            const isImg = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'].includes(ext);
            const url = String(r.publicUrl || (r.sitePath ? `https://wugweb.pages.dev${r.sitePath}` : ''));
            return (
              <Card key={r._id} border radius={2} overflow="hidden" style={{ cursor: 'pointer' }} onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--card-focus-ring-color, #4c9aff)'; }} onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = ''; }}>
                <Box style={{ height: 90, background: 'var(--card-muted-bg-color, #f1f3f5)', display: 'grid', placeItems: 'center' }}>
                  {isImg && url ? (
                    <img src={url} alt={String((r.name ?? '') as any)} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  ) : (
                    <Text size={2} muted>{ext || '📄'}</Text>
                  )}
                </Box>
                <Box padding={2}>
                  <Text size={1} weight="semibold" style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{r.displayName || r.name}</Text>
                  <Flex gap={1} wrap="wrap" marginTop={1}>
                    {r.assetGroup && <Badge tone="default" fontSize={0}>{r.assetGroup}</Badge>}
                    {r.status === 'Archived' && <Badge tone="critical" fontSize={0}>Archived</Badge>}
                  </Flex>
                </Box>
              </Card>
            );
          })}
        </Grid>
      ) : (
        <Card border radius={2} overflow="hidden">
          <div style={{ overflow: 'auto', maxHeight: 'calc(100vh - 220px)' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13, fontFamily: 'Inter, system-ui, sans-serif' }}>
              <thead>
                <tr style={{ background: 'var(--card-muted-bg-color, #f1f3f5)', position: 'sticky', top: 0 }}>
                  {['Name', 'Group', 'Type', 'Status', 'Usage', 'Path', 'Links'].map((h) => (
                    <th key={h} style={{ padding: '8px 12px', textAlign: 'left', borderBottom: '1px solid var(--card-border-color, #e1e3e6)', fontWeight: 600, whiteSpace: 'nowrap' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((r) => (
                  <tr key={r._id} style={{ borderBottom: '1px solid var(--card-border-color, #eee)' }}>
                    <td style={{ padding: '8px 12px' }}><Text size={1} weight="semibold">{r.displayName || r.name}</Text></td>
                    <td style={{ padding: '8px 12px' }}><Text size={1} muted>{r.assetGroup || '—'}</Text></td>
                    <td style={{ padding: '8px 12px' }}><Text size={1} muted>{r.mediaType || '—'}</Text></td>
                    <td style={{ padding: '8px 12px' }}>{r.status === 'Archived' ? <Badge tone="critical">Archived</Badge> : <Badge tone="positive">Active</Badge>}</td>
                    <td style={{ padding: '8px 12px' }}><Text size={1} muted>{r.usage || '—'}</Text></td>
                    <td style={{ padding: '8px 12px' }}><Text size={1} muted style={{ fontFamily: 'monospace' }}>{r.relativePath || r.r2Key || '—'}</Text></td>
                    <td style={{ padding: '8px 12px' }}>
                      <Flex gap={1} wrap="wrap">
                        {r.linkedCaseStudy && <Badge tone="primary" fontSize={0}>CS</Badge>}
                        {r.linkedClient && <Badge tone="primary" fontSize={0}>CL</Badge>}
                        {r.linkedService && <Badge tone="primary" fontSize={0}>SV</Badge>}
                        {r.linkedPost && <Badge tone="primary" fontSize={0}>PO</Badge>}
                        {!r.linkedCaseStudy && !r.linkedClient && !r.linkedService && !r.linkedPost && !r.linkedPageId && <Text size={0} muted>Unused</Text>}
                      </Flex>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}
    </Card>
  );
}

export default MediaTool;
