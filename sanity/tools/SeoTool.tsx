import { useCallback, useEffect, useState } from 'react';
import { Box, Card, Flex, Grid, Stack, Text, Badge, Button, Tooltip, TextInput } from '@sanity/ui';
import { ComposeIcon, SearchIcon, SparklesIcon } from '@sanity/icons';
import { useClient } from 'sanity';
import { seoScore, seoLevel } from '../lib/health';
import { EmptyState, RowSkeleton } from '../components/ui';
import { fetchDocs } from '../lib/groq';
import type { Row } from '../lib/types';

interface SeoRow extends Row {
  seoDescription?: string;
  ogImage?: unknown;
  body?: unknown;
  excerpt?: string;
  summary?: string;
}

const TYPES: { type: string; label: string; query: string }[] = [
  {
    type: 'post',
    label: 'Blog Posts',
    query: `*[_type=="post"][0...1000] { _id, _type, title, "slug": slug.current, seoTitle, seoDescription, ogImage, excerpt, body }`,
  },
  {
    type: 'caseStudy',
    label: 'Case Studies',
    query: `*[_type=="caseStudy"][0...1000] { _id, _type, title, "slug": slug.current, seoTitle, seoDescription, ogImage, summary, body }`,
  },
  {
    type: 'service',
    label: 'Services',
    query: `*[_type=="service"][0...1000] { _id, _type, title, "slug": slug.current, seoTitle, seoDescription, ogImage, summary, heroText, body }`,
  },
  {
    type: 'singletonPage',
    label: 'Pages',
    query: `*[_type=="singletonPage"][0...500] { _id, _type, title, pageId, seoTitle, seoDescription, ogImage, body }`,
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
  const client = useClient({ apiVersion: '2024-01-01' });
  const [activeType, setActiveType] = useState('post');
  const [rows, setRows] = useState<SeoRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [q, setQ] = useState('');
  const [onlyMissing, setOnlyMissing] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const spec = TYPES.find((t) => t.type === activeType) || TYPES[0];
      const data = await client.fetch<SeoRow[]>(spec.query);
      setRows(data || []);
    } catch (e: any) {
      setError(e?.message || 'Failed to fetch SEO metadata.');
    } finally {
      setLoading(false);
    }
  }, [client, activeType]);

  useEffect(() => {
    load();
  }, [load]);

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

  return (
    <Card tone="default" padding={[2, 3]} style={{ minHeight: '100%' }}>
      <Flex align="center" justify="space-between" paddingBottom={4}>
        <Stack space={1}>
          <Text size={3} weight="bold">SEO & Social Metadata Manager</Text>
          <Text size={1} muted>Audit metadata quality across all content types</Text>
        </Stack>
        <Button text="Refresh" mode="ghost" onClick={load} />
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
                <tr style={{ background: 'var(--card-muted-bg-color, #f1f3f5)', position: 'sticky', top: 0, zIndex: 2 }}>
                  <th style={{ padding: '8px 12px', textAlign: 'left', borderBottom: '1px solid var(--card-border-color, #e1e3e6)' }}>Document Title</th>
                  <th style={{ padding: '8px 12px', textAlign: 'left', borderBottom: '1px solid var(--card-border-color, #e1e3e6)' }}>SEO Description</th>
                  <th style={{ padding: '8px 12px', textAlign: 'center', borderBottom: '1px solid var(--card-border-color, #e1e3e6)', width: 100 }}>Score</th>
                  <th style={{ padding: '8px 12px', textAlign: 'right', borderBottom: '1px solid var(--card-border-color, #e1e3e6)', width: 140 }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((row) => {
                  const score = seoScore(row as any);
                  const level = seoLevel(score);
                  return (
                    <tr key={row._id} style={{ borderBottom: '1px solid var(--card-border-color, #f1f3f5)' }}>
                      <td style={{ padding: '10px 12px' }}>
                        <Text size={1} weight="semibold">{String(row.title || row._id)}</Text>
                        {row.slug && <Text size={0} muted>@{row.slug}</Text>}
                      </td>
                      <td style={{ padding: '10px 12px', color: row.seoDescription ? 'inherit' : 'var(--card-muted-fg-color, #888)' }}>
                        {row.seoDescription || '— Missing SEO description —'}
                      </td>
                      <td style={{ padding: '10px 12px', textAlign: 'center' }}>
                        <Badge tone={level === 'good' ? 'positive' : level === 'warn' ? 'caution' : 'critical'}>
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
