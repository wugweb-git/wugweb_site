import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Box, Card, Flex, Grid, Stack, Text, Badge, Button, Select, TextInput, useToast } from '@sanity/ui';
import { SearchIcon, RefreshIcon, CopyIcon, LaunchIcon, ImagesIcon } from '@sanity/icons';
import { useClient } from 'sanity';
import { StudioErrorBoundary } from '../components/StudioErrorBoundary';

interface AssetRow {
  _id: string;
  _type: string;
  _updatedAt?: string;
  name?: string;
  displayName?: string;
  assetGroup?: string;
  mediaType?: string;
  assetType?: string;
  status?: string;
  usage?: string;
  relativePath?: string;
  sitePath?: string;
  r2Key?: string;
  publicUrl?: string;
  localExists?: boolean;
  r2Synced?: boolean;
  fileName?: string;
  extension?: string;
  linkedCaseStudy?: string;
  linkedClient?: string;
  linkedService?: string;
  linkedPost?: string;
  linkedPageId?: string;
}

const QUERY = `{
  "assets": *[_type == "asset"] | order(sitePath asc) [0...600] {
    _id, _type, _updatedAt, name, displayName, "slug": slug.current, assetType, mediaType, assetGroup,
    usage, status, folder, relativePath, sitePath, r2Key, publicUrl, fileName, extension,
    localExists, r2Synced, "linkedCaseStudy": linkedCaseStudy->title, "linkedClient": linkedClient->name,
    "linkedService": linkedService->title, "linkedPost": linkedPost->title, linkedPageId
  },
  "total": count(*[_type == "asset"])
}`;

function MediaToolContent() {
  const client = useClient({ apiVersion: '2026-01-01' });
  const toast = useToast();
  const [rows, setRows] = useState<AssetRow[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [filter, setFilter] = useState<'all' | 'unused' | 'missingAlt' | 'duplicates' | 'archived'>('all');
  const [q, setQ] = useState('');
  const [group, setGroup] = useState<string>('all');
  const [selectedAsset, setSelectedAsset] = useState<AssetRow | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await client.fetch<{ assets: AssetRow[]; total: number }>(QUERY);
      setRows(data?.assets ?? []);
      setTotal(data?.total ?? 0);
    } catch (e: any) {
      setError(e?.message || 'Failed to load media catalog');
      setRows([]);
    } finally {
      setLoading(false);
    }
  }, [client]);

  useEffect(() => {
    load();
  }, [load]);

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
    return {
      total: rows.length,
      unused: unused.length,
      missingAlt: missingAlt.length,
      duplicates: duplicates.length,
    };
  }, [rows]);

  const filtered = useMemo(() => {
    let out = rows;
    if (group !== 'all') {
      out = out.filter((r) => (r.assetGroup || '').toLowerCase() === group.toLowerCase());
    }
    const needle = q.trim().toLowerCase();
    if (needle) {
      out = out.filter((r) =>
        [r.name, r.displayName, r.relativePath, r.sitePath, r.r2Key]
          .some((f) => String(f ?? '').toLowerCase().includes(needle))
      );
    }
    switch (filter) {
      case 'unused':
        out = out.filter((r) => !r.linkedCaseStudy && !r.linkedClient && !r.linkedService && !r.linkedPost && !r.linkedPageId);
        break;
      case 'missingAlt':
        out = out.filter((r) => (r.mediaType === 'Image' || r.mediaType === 'SVG') && !r.usage);
        break;
      case 'duplicates': {
        const byKey = new Map<string, string[]>();
        rows.forEach((r) => {
          const k = `${r.name}|${r.extension}`.toLowerCase();
          byKey.set(k, [...(byKey.get(k) ?? []), r._id]);
        });
        const dupIds = new Set([...byKey.values()].filter((g) => g.length > 1).flat());
        out = out.filter((r) => dupIds.has(r._id));
        break;
      }
      case 'archived':
        out = out.filter((r) => r.status === 'Archived');
        break;
      default:
        break;
    }
    return out;
  }, [rows, group, q, filter]);

  const copyPath = (path: string) => {
    if (!path) return;
    navigator.clipboard.writeText(path);
    toast.push({
      status: 'success',
      title: 'Path copied to clipboard',
      description: path,
    });
  };

  const openDocument = (id: string) => {
    window.location.hash = `#/structure/intent/edit/id=${id};type=asset`;
  };

  return (
    <Card tone="default" padding={[2, 3, 4]} style={{ minHeight: '100%' }}>
      <Stack space={4}>
        {/* Header toolbar */}
        <Flex align="center" justify="space-between" gap={2} wrap="wrap">
          <Stack space={1}>
            <Flex align="center" gap={2}>
              <ImagesIcon style={{ fontSize: 22, color: '#ffd000' }} />
              <Text size={3} weight="bold">Cloudflare R2 Media Catalog</Text>
            </Flex>
            <Text size={1} muted>
              {rows.length < total
                ? `Showing ${rows.length} of ${total} media assets stored in R2`
                : `${total} media assets stored in R2`}
              {' · Click any asset to copy path or inspect references'}
            </Text>
          </Stack>

          <Flex gap={2} align="center" wrap="wrap">
            <Box style={{ minWidth: 200, maxWidth: 260 }}>
              <TextInput
                icon={SearchIcon}
                placeholder="Search file name or path…"
                value={q}
                onChange={(e) => setQ(e.currentTarget.value)}
              />
            </Box>
            <Select
              value={group}
              onChange={(e) => setGroup(e.currentTarget.value)}
              style={{ minWidth: 130 }}
            >
              <option value="all">All Groups ({rows.length})</option>
              <option value="Work">Work</option>
              <option value="Services">Services</option>
              <option value="More">More</option>
              <option value="Brand">Brand</option>
              <option value="Blog">Blog</option>
              <option value="Framer">Framer</option>
            </Select>
            <Select
              value={view}
              onChange={(e) => setView(e.currentTarget.value as any)}
              style={{ minWidth: 100 }}
            >
              <option value="grid">Grid View</option>
              <option value="list">List View</option>
            </Select>
            <Button text="Refresh" icon={RefreshIcon} mode="ghost" onClick={load} />
          </Flex>
        </Flex>

        {/* Filter chips */}
        <Flex gap={1} wrap="wrap">
          <Button
            text={`All (${stats.total})`}
            mode={filter === 'all' ? 'default' : 'ghost'}
            tone={filter === 'all' ? 'primary' : 'default'}
            onClick={() => setFilter('all')}
          />
          <Button
            text={`Unused (${stats.unused})`}
            mode={filter === 'unused' ? 'default' : 'ghost'}
            tone={filter === 'unused' ? 'caution' : 'default'}
            onClick={() => setFilter('unused')}
          />
          <Button
            text={`Missing Alt (${stats.missingAlt})`}
            mode={filter === 'missingAlt' ? 'default' : 'ghost'}
            tone={filter === 'missingAlt' ? 'caution' : 'default'}
            onClick={() => setFilter('missingAlt')}
          />
          <Button
            text={`Duplicates (${stats.duplicates})`}
            mode={filter === 'duplicates' ? 'default' : 'ghost'}
            tone={filter === 'duplicates' ? 'critical' : 'default'}
            onClick={() => setFilter('duplicates')}
          />
          <Button
            text="Archived"
            mode={filter === 'archived' ? 'default' : 'ghost'}
            onClick={() => setFilter('archived')}
          />
        </Flex>

        {/* Content Area */}
        {loading ? (
          <Card padding={5} style={{ textAlign: 'center' }}>
            <Text size={1} muted>Loading media assets from Cloudflare R2 catalog…</Text>
          </Card>
        ) : error ? (
          <Card padding={4} tone="critical" radius={2}>
            <Text size={1}>{error}</Text>
            <Button text="Retry" mode="ghost" onClick={load} style={{ marginTop: 8 }} />
          </Card>
        ) : filtered.length === 0 ? (
          <Card padding={5} style={{ textAlign: 'center' }}>
            <Text size={2} weight="bold">No media assets match your query</Text>
            <Text size={1} muted style={{ marginTop: 4 }}>Try clearing search keywords or selecting "All Groups".</Text>
          </Card>
        ) : view === 'grid' ? (
          <Flex gap={3} align="flex-start">
            <Grid columns={[2, 3, 4, 5, 6]} gap={2} style={{ flex: 1 }}>
              {filtered.map((r) => {
                const ext = String(r.extension || (r.name || '').split('.').pop() || '').toLowerCase();
                const isVideo = ['mp4', 'webm', 'mov'].includes(ext);
                const isImg = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg', 'avif'].includes(ext);
                const path = r.sitePath || (r.relativePath ? `/assets/${r.relativePath}` : '');
                const url = r.publicUrl || (path ? `https://wugweb.pages.dev${path}` : '');
                const isSelected = selectedAsset?._id === r._id;

                return (
                  <Card
                    key={r._id}
                    border
                    radius={2}
                    overflow="hidden"
                    style={{
                      cursor: 'pointer',
                      background: isSelected ? 'rgba(255, 208, 0, 0.08)' : '#111114',
                      borderColor: isSelected ? '#ffd000' : 'rgba(255, 255, 255, 0.08)',
                      transition: 'border-color 0.2s ease, transform 0.2s ease',
                    }}
                    onClick={() => setSelectedAsset(r)}
                  >
                    <Box style={{ height: 110, background: '#09090b', display: 'grid', placeItems: 'center', overflow: 'hidden', position: 'relative' }}>
                      {isVideo && url ? (
                        <video
                          src={url}
                          muted
                          loop
                          playsInline
                          preload="metadata"
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                          onMouseEnter={(e) => (e.currentTarget as HTMLVideoElement).play().catch(() => {})}
                          onMouseLeave={(e) => (e.currentTarget as HTMLVideoElement).pause()}
                        />
                      ) : isImg && url ? (
                        <img
                          src={url}
                          alt={r.displayName || r.name || ''}
                          loading="lazy"
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                      ) : (
                        <Text size={2} muted>{ext.toUpperCase() || 'FILE'}</Text>
                      )}
                      {isVideo && (
                        <Badge tone="caution" fontSize={0} style={{ position: 'absolute', top: 4, right: 4 }}>
                          VIDEO
                        </Badge>
                      )}
                    </Box>
                    <Box padding={2}>
                      <Text
                        size={1}
                        weight="semibold"
                        style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', color: '#f4f4f4' }}
                      >
                        {r.displayName || r.name}
                      </Text>
                      <Flex justify="space-between" align="center" marginTop={1}>
                        <Text size={0} muted style={{ fontFamily: 'monospace' }}>
                          .{ext || 'file'}
                        </Text>
                        {r.assetGroup && <Badge tone="default" fontSize={0}>{r.assetGroup}</Badge>}
                      </Flex>
                    </Box>
                  </Card>
                );
              })}
            </Grid>

            {/* Asset Details Inspector Drawer */}
            {selectedAsset && (
              <Card
                padding={3}
                border
                radius={2}
                style={{ width: 300, background: '#121215', position: 'sticky', top: 20 }}
              >
                <Stack space={3}>
                  <Flex justify="space-between" align="center">
                    <Badge tone="primary" fontSize={0}>
                      {selectedAsset.mediaType?.toUpperCase() || 'ASSET'}
                    </Badge>
                    <Button
                      text="Close"
                      mode="ghost"
                      fontSize={0}
                      padding={1}
                      onClick={() => setSelectedAsset(null)}
                    />
                  </Flex>

                  <Box style={{ height: 160, background: '#09090b', borderRadius: 6, overflow: 'hidden', display: 'grid', placeItems: 'center' }}>
                    {['mp4', 'webm', 'mov'].includes((selectedAsset.extension || '').toLowerCase()) ? (
                      <video
                        src={selectedAsset.publicUrl || `https://wugweb.pages.dev${selectedAsset.sitePath}`}
                        muted
                        loop
                        autoPlay
                        playsInline
                        style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                      />
                    ) : (
                      <img
                        src={selectedAsset.publicUrl || `https://wugweb.pages.dev${selectedAsset.sitePath}`}
                        alt=""
                        style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                      />
                    )}
                  </Box>

                  <Stack space={1}>
                    <Text size={1} weight="bold">{selectedAsset.displayName || selectedAsset.name}</Text>
                    <Text size={0} muted style={{ fontFamily: 'monospace', wordBreak: 'break-all' }}>
                      {selectedAsset.sitePath || selectedAsset.relativePath || selectedAsset.r2Key}
                    </Text>
                  </Stack>

                  <Flex gap={2}>
                    <Button
                      text="Copy Path"
                      icon={CopyIcon}
                      mode="default"
                      tone="primary"
                      onClick={() => copyPath(selectedAsset.sitePath || `/assets/${selectedAsset.relativePath}`)}
                    />
                    <Button
                      text="Edit Doc"
                      icon={LaunchIcon}
                      mode="ghost"
                      onClick={() => openDocument(selectedAsset._id)}
                    />
                  </Flex>
                </Stack>
              </Card>
            )}
          </Flex>
        ) : (
          <Card border radius={2} overflow="hidden">
            <div style={{ overflow: 'auto', maxHeight: 'calc(100vh - 240px)' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13, fontFamily: 'Inter, system-ui, sans-serif' }}>
                <thead>
                  <tr style={{ background: '#18181b', position: 'sticky', top: 0 }}>
                    {['Name', 'Group', 'Type', 'Status', 'Site Path', 'Action'].map((h) => (
                      <th key={h} style={{ padding: '8px 12px', textAlign: 'left', borderBottom: '1px solid rgba(255,255,255,0.1)', fontWeight: 600, whiteSpace: 'nowrap', color: '#aaa' }}>
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((r) => (
                    <tr key={r._id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                      <td style={{ padding: '8px 12px' }}>
                        <Text size={1} weight="semibold" style={{ color: '#fff' }}>{r.displayName || r.name}</Text>
                      </td>
                      <td style={{ padding: '8px 12px' }}><Text size={1} muted>{r.assetGroup || '—'}</Text></td>
                      <td style={{ padding: '8px 12px' }}><Text size={1} muted>{r.mediaType || '—'}</Text></td>
                      <td style={{ padding: '8px 12px' }}>
                        {r.status === 'Archived' ? <Badge tone="critical">Archived</Badge> : <Badge tone="positive">Active</Badge>}
                      </td>
                      <td style={{ padding: '8px 12px' }}>
                        <Text size={1} muted style={{ fontFamily: 'monospace' }}>{r.sitePath || r.relativePath || '—'}</Text>
                      </td>
                      <td style={{ padding: '8px 12px' }}>
                        <Button
                          text="Copy"
                          icon={CopyIcon}
                          mode="ghost"
                          fontSize={0}
                          padding={1}
                          onClick={() => copyPath(r.sitePath || `/assets/${r.relativePath}`)}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        )}
      </Stack>
    </Card>
  );
}

export function MediaTool() {
  return (
    <StudioErrorBoundary toolTitle="Media Library">
      <MediaToolContent />
    </StudioErrorBoundary>
  );
}

export default MediaTool;
