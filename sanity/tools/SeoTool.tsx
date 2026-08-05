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

export function SeoTool() {
  const client = useClient({ apiVersion: '2024-01-01' });
  const [activeType, setActiveType] = useState('post');
  const [rows, setRows] = useState<SeoRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [q, setQ] = useState('');
  const [busy, setBusy] = useState<Set<string>>(new Set());

  const config = TYPES.find((t) => t.type === activeType)!;

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchDocs(client, config.query);
      setRows(data as SeoRow[]);
    } catch (e: any) {
      setError(e?.message || 'Failed to load');
      setRows([]);
    } finally {
      setLoading(false);
    }
  }, [client, config]);

  useEffect(() => { load(); }, [load]);

  const generate = async (row: SeoRow) => {
    setBusy((s) => new Set(s).add(row._id));
    try {
      const meta = generateMeta(row);
      await client.patch(row._id).set(meta).commit();
      await load();
    } catch (e: any) {
      alert(`Failed to generate: ${e?.message || 'unknown'}`);
    } finally {
      setBusy((s) => { const n = new Set(s); n.delete(row._id); return n; });
    }
  };

  const filtered = rows.filter((r) => {
    const needle = q.trim().toLowerCase();
    if (!needle) return true;
    return [r.title, r.pageId, r.slug, r.seoDescription].some((f) => String(f ?? '').toLowerCase().includes(needle));
  });

  return (
    <Card tone="default" padding={[2, 3]} style={{ minHeight: '100%' }}>
      <Flex align="center" gap={2} paddingBottom={3} wrap="wrap">
        <Box flex={1}>
          <Text size={3} weight="semibold">SEO Manager</Text>
          <Text size={1} muted>Per-document SEO health · one-screen review · generate meta</Text>
        </Box>
        <TextInput icon={SearchIcon} placeholder="Search title/slug/desc…" value={q} onChange={(e) => setQ(e.currentTarget.value)} style={{ maxWidth: 240 }} />
        <Flex gap={1}>
          {TYPES.map((t) => (
            <Button key={t.type} text={t.label} mode={activeType === t.type ? 'default' : 'ghost'} onClick={() => setActiveType(t.type)} />
          ))}
        </Flex>
      </Flex>

      {loading ? (
        <RowSkeleton cols={6} />
      ) : error ? (
        <Box padding={4}><Text style={{ color: '#e54f30' }}>{error}</Text><Button text="Retry" mode="ghost" onClick={load} style={{ marginTop: 8 }} /></Box>
      ) : filtered.length === 0 ? (
        <EmptyState title="No documents" />
      ) : (
        <Card border radius={2} overflow="hidden">
          <div style={{ overflow: 'auto', maxHeight: 'calc(100vh - 200px)' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13, fontFamily: 'Inter, system-ui, sans-serif' }}>
              <thead>
                <tr style={{ background: 'var(--card-muted-bg-color, #f1f3f5)', position: 'sticky', top: 0 }}>
                  {['Document', 'Score', 'Meta title', 'Meta desc', 'OG', 'Schema', 'Actions'].map((h) => (
                    <th key={h} style={{ padding: '8px 12px', textAlign: 'left', borderBottom: '1px solid var(--card-border-color, #e1e3e6)', fontWeight: 600, whiteSpace: 'nowrap' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((row) => {
                  const score = seoScore(row);
                  const { label, severity } = seoLevel(score);
                  const hasDesc = Boolean(row.seoDescription);
                  const hasOg = Boolean(row.ogImage);
                  const hasSchema = Boolean(row.seoTitle);
                  const tone = severity === 'good' ? 'positive' : severity === 'warn' ? 'caution' : 'critical';
                  return (
                    <tr key={row._id} style={{ borderBottom: '1px solid var(--card-border-color, #eee)' }}>
                      <td style={{ padding: '8px 12px' }}>
                        <Text size={1} weight="semibold">{String(row.title ?? row.pageId ?? row._id)}</Text>
                        <Text size={0} muted>@{String(row.slug ?? row.pageId ?? '')}</Text>
                      </td>
                      <td style={{ padding: '8px 12px' }}>
                        <Tooltip content={`${label}`} placement="top">
                          <Badge tone={tone}>{score}</Badge>
                        </Tooltip>
                      </td>
                      <td style={{ padding: '8px 12px' }}>{hasSchema ? <Badge tone="positive">✓</Badge> : <Badge tone="critical">✕</Badge>}</td>
                      <td style={{ padding: '8px 12px' }}>{hasDesc ? <Badge tone="positive">✓</Badge> : <Badge tone="critical">✕</Badge>}</td>
                      <td style={{ padding: '8px 12px' }}>{hasOg ? <Badge tone="positive">✓</Badge> : <Badge tone="caution">⚠</Badge>}</td>
                      <td style={{ padding: '8px 12px' }}>{hasSchema ? <Badge tone="positive">✓</Badge> : <Badge tone="caution">—</Badge>}</td>
                      <td style={{ padding: '8px 12px', whiteSpace: 'nowrap' }}>
                        <Flex gap={1}>
                          <Button mode="ghost" text="Edit" icon={ComposeIcon} onClick={() => window.open(`/intent/edit/id=${row._id};type=${row._type}`, '_blank')} />
                          <Button
                            mode="ghost"
                            text="Generate"
                            icon={SparklesIcon}
                            disabled={busy.has(row._id)}
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

export default SeoTool;
