import { useCallback, useEffect, useState } from 'react';
import { Box, Card, Flex, Grid, Stack, Text, Badge, Button, Tooltip, TextInput } from '@sanity/ui';
import { ComposeIcon, SearchIcon, SparklesIcon } from '@sanity/icons';
import { useClient } from 'sanity';
import { seoScore, seoLevel } from '../lib/health';
import { EmptyState, RowSkeleton } from '../components/ui';
import { fetchDocs } from '../lib/groq';
import { StudioErrorBoundary } from '../components/StudioErrorBoundary';
import type { Row } from '../lib/types';

interface SeoRow extends Row {
  seoDescription?: string;
  ogImage?: unknown;
  body?: unknown;
  excerpt?: string;
  summary?: string;
}

const PAGE_SIZE = 100;

const TYPES: { type: string; label: string; query: string; totalQuery: string }[] = [
  {
    type: 'post',
    label: 'Blog Posts',
    query: `*[_type=="post" && !(_id in path("drafts.**"))] | order(_updatedAt desc) [$from...$to] { _id, _type, title, "slug": slug.current, seoTitle, seoDescription, ogImage, excerpt, body }`,
    totalQuery: `count(*[_type=="post" && !(_id in path("drafts.**"))])`,
  },
  {
    type: 'caseStudy',
    label: 'Case Studies',
    query: `*[_type=="caseStudy" && !(_id in path("drafts.**"))] | order(_updatedAt desc) [$from...$to] { _id, _type, title, "slug": slug.current, seoTitle, seoDescription, ogImage, summary, body }`,
    totalQuery: `count(*[_type=="caseStudy" && !(_id in path("drafts.**"))])`,
  },
  {
    type: 'service',
    label: 'Services',
    query: `*[_type=="service" && !(_id in path("drafts.**"))] | order(_updatedAt desc) [$from...$to] { _id, _type, title, "slug": slug.current, seoTitle, seoDescription, ogImage, summary, heroText, body }`,
    totalQuery: `count(*[_type=="service" && !(_id in path("drafts.**"))])`,
  },
  {
    type: 'singletonPage',
    label: 'Pages',
    query: `*[_type=="singletonPage" && !(_id in path("drafts.**"))] | order(_updatedAt desc) [$from...$to] { _id, _type, title, pageId, seoTitle, seoDescription, ogImage, body }`,
    totalQuery: `count(*[_type=="singletonPage" && !(_id in path("drafts.**"))])`,
  },
];

function generateMeta(row: SeoRow): { seoTitle: string; seoDescription: string } {
  const base = String(row.title ?? row.pageId ?? '');
  const bodyText = [row.body, row.excerpt, row.summary]
    .map((b) => (Array.isArray(b) ? (b as any[]).map((blk) => (blk?.children || []).map((c: any) => c.text || '').join('')).join(' ') : String((b as any) ?? '')))
    .join(' ')
    .replace(/\s+/g, ' ')
    .trim();
  const seoTitle = String(row.seoTitle || (base.length > 60 ? base.slice(0, 57) + '…' : base));
  const seoDescription = String(
    row.seoDescription ||
    (bodyText.length > 160 ? bodyText.slice(0, 157) + '…' : bodyText || 'Wugweb — Digital Experience Agency')
  );
  return { seoTitle, seoDescription };
}

function SeoToolContent() {
  const client = useClient({ apiVersion: '2026-01-01' });
  const [activeType, setActiveType] = useState('post');
  const [rows, setRows] = useState<SeoRow[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [q, setQ] = useState('');
  const [onlyMissing, setOnlyMissing] = useState(false);

  const load = useCallback(async (pg = page) => {
    setLoading(true);
    setError(null);
    try {
      const spec = TYPES.find((t) => t.type === activeType) || TYPES[0];
      const from = pg * PAGE_SIZE;
      const to   = from + PAGE_SIZE;
      const [data, count] = await Promise.all([
        client.fetch<SeoRow[]>(spec.query, { from, to }),
        client.fetch<number>(spec.totalQuery),
      ]);
      setRows(data || []);
      setTotal(count || 0);
    } catch (e: any) {
      setError(e?.message || 'Failed to fetch SEO metadata.');
    } finally {
      setLoading(false);
    }
  }, [client, activeType, page]);

  useEffect(() => {
    setPage(0);
    load(0);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeType]);

  const generate = async (row: SeoRow) => {
    const { seoTitle, seoDescription } = generateMeta(row);
    try {
      await client.patch(row._id).set({ seoTitle, seoDescription }).commit();
      setRows((arr) =>
        arr.map((r) => (r._id === row._id ? { ...r, seoTitle, seoDescription } : r))
      );
    } catch (e: any) {
      alert(`Auto-generate failed: ${e?.message || 'Unknown error'}`);
    }
  };

  const filtered = rows.filter((r) => {
    if (onlyMissing && r.seoDescription && r.seoDescription.length > 20) return false;
    if (q.trim()) {
      const needle = q.toLowerCase();
      const title = String(r.title || '').toLowerCase();
      const desc = String(r.seoDescription || '').toLowerCase();
      return title.includes(needle) || desc.includes(needle);
    }
    return true;
  });

  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  return (
    <Card tone="default" padding={[2, 3]} style={{ minHeight: '100%' }}>
      <Flex align="center" justify="space-between" paddingBottom={4}>
        <Stack space={1}>
          <Text size={3} weight="bold">SEO & Social Metadata Manager</Text>
          <Text size={1} muted>Audit metadata quality across all content types</Text>
        </Stack>
        <Button text="Refresh" mode="ghost" onClick={() => load(page)} />
      </Flex>

      <Flex gap={2} marginBottom={3}>
        {TYPES.map((t) => (
          <Button
            key={t.type}
            text={t.label}
            mode={activeType === t.type ? 'default' : 'ghost'}
            onClick={() => setActiveType(t.type)}
          />
        ))}
      </Flex>

        <Flex gap={2} align="center" marginBottom={3}>
          <TextInput
            icon={SearchIcon}
            placeholder="Filter documents…"
            aria-label="Filter documents"
            value={q}
            onChange={(e) => setQ(e.currentTarget.value)}
            style={{ maxWidth: 280 }}
          />
          <Button
            text={onlyMissing ? 'Showing: Missing SEO only' : 'Filter: Missing SEO'}
            tone={onlyMissing ? 'caution' : 'default'}
            mode={onlyMissing ? 'default' : 'ghost'}
            onClick={() => setOnlyMissing(!onlyMissing)}
          />
          <Box flex={1} />
          <Text size={1} muted>
            Showing {rows.length} of {total} · page {page + 1}/{totalPages}
          </Text>
        </Flex>

      {loading ? (
        <RowSkeleton cols={4} />
      ) : error ? (
        <Card padding={4} tone="critical" radius={2}>
          <Text size={1}>{error}</Text>
        </Card>
      ) : filtered.length === 0 ? (
        <EmptyState title="No documents found" body="Try adjusting search query or filters." />
      ) : (
        <Card border radius={2} overflow="hidden">
          <div style={{ overflow: 'auto', maxHeight: 'calc(100vh - 260px)' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13, fontFamily: 'Inter, system-ui, sans-serif' }}>
              <thead>
                <tr style={{ background: 'var(--card-muted-bg-color, #191919)', position: 'sticky', top: 0, zIndex: 2 }}>
                  <th style={{ padding: '8px 12px', textAlign: 'left', borderBottom: '1px solid var(--card-border-color, #2b2b2b)' }}>Document Title</th>
                  <th style={{ padding: '8px 12px', textAlign: 'left', borderBottom: '1px solid var(--card-border-color, #2b2b2b)' }}>SEO Description</th>
                  <th style={{ padding: '8px 12px', textAlign: 'center', borderBottom: '1px solid var(--card-border-color, #2b2b2b)', width: 100 }}>Score</th>
                  <th style={{ padding: '8px 12px', textAlign: 'right', borderBottom: '1px solid var(--card-border-color, #2b2b2b)', width: 140 }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((row) => {
                  const score = seoScore(row as any);
                  const level = seoLevel(score);
                  return (
                    <tr key={row._id} style={{ borderBottom: '1px solid var(--card-border-color, #222)' }}>
                      <td style={{ padding: '10px 12px' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 6, minWidth: 0 }}>
                          <Text size={1} weight="semibold" style={{ overflowWrap: 'anywhere' }}>{String(row.title || row._id)}</Text>
                          {row.slug ? <Text size={0} muted style={{ overflowWrap: 'anywhere' }}>@{String(row.slug)}</Text> : null}
                        </div>
                      </td>
                      <td style={{ padding: '10px 12px', color: row.seoDescription ? 'inherit' : 'var(--card-muted-fg-color, #888)' }}>
                        {row.seoDescription || '— Missing SEO description —'}
                      </td>
                      <td style={{ padding: '10px 12px', textAlign: 'center' }}>
                        <Badge tone={level.severity === 'good' ? 'positive' : level.severity === 'warn' ? 'caution' : 'critical'}>
                          {score}/100
                        </Badge>
                      </td>
                      <td style={{ padding: '10px 12px', textAlign: 'right' }}>
                        <Flex gap={1} justify="flex-end">
                          <Button
                            icon={SparklesIcon}
                            text="Auto Meta"
                            mode="ghost"
                            fontSize={1}
                            padding={2}
                            onClick={() => generate(row)}
                          />
                        </Flex>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* Pagination */}
      {total > PAGE_SIZE && (
        <Flex align="center" justify="space-between" paddingTop={3}>
          <Text size={1} muted>{total} total · page {page + 1} of {totalPages}</Text>
          <Flex gap={1}>
            <Button mode="ghost" text="← Prev" aria-label="Previous page" disabled={page === 0} onClick={() => { const p = page - 1; setPage(p); load(p); }} />
            <Button mode="ghost" text="Next →" aria-label="Next page" disabled={page >= totalPages - 1} onClick={() => { const p = page + 1; setPage(p); load(p); }} />
          </Flex>
        </Flex>
      )}
    </Card>
  );
}

export function SeoTool() {
  return (
    <StudioErrorBoundary toolTitle="SEO Manager">
      <SeoToolContent />
    </StudioErrorBoundary>
  );
}

export default SeoTool;
