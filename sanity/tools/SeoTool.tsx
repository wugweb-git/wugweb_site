/**
 * SUPERSEDED (2026-10-13) by the Tables tool: SEO description, Completeness
 * and Checks passed columns, the "Has failing checks" / "Missing SEO"
 * filters, and Auto Meta in each row's menu and the bulk bar. No longer
 * registered in sanity.config.ts; kept until the owner confirms the Tables
 * cover everything it did.
 */
import { Fragment, useCallback, useEffect, useRef, useState } from 'react';
import { Box, Card, Flex, Grid, Stack, Text, Badge, Button, Tooltip, TextInput } from '@sanity/ui';
import { ComposeIcon, SearchIcon, SparklesIcon } from '@sanity/icons';
import { useClient } from 'sanity';
import { seoScore, seoLevel, seoChecks, checksSummary, type AltLookup, buildDuplicateIndex, COMPLETENESS_HELP, type DuplicateIndex } from '../lib/health';
import { EmptyState, RowSkeleton } from '../components/ui';
import { toRel } from '../lib/assetUsage';
import { fetchDocs } from '../lib/groq';
import { StudioErrorBoundary } from '../components/StudioErrorBoundary';
import type { Row } from '../lib/types';
import { generateMeta } from '../lib/autoMeta';

interface SeoRow extends Row {
  seoDescription?: string;
  ogImage?: unknown;
  body?: unknown;
  excerpt?: string;
  summary?: string;
  bodyContent?: unknown;
  focusKeyword?: string;
}

const PAGE_SIZE = 100;

const TYPES: { type: string; label: string; query: string; totalQuery: string }[] = [
  {
    type: 'post',
    label: 'Blog Posts',
    query: `*[_type=="post" && !(_id in path("drafts.**"))] | order(_updatedAt desc) [$from...$to] { _id, _type, title, "slug": slug.current, seoTitle, seoDescription, ogImage, ogImagePath, ogTitle, ogDescription, coverPath, coverImage, excerpt, body }`,
    totalQuery: `count(*[_type=="post" && !(_id in path("drafts.**"))])`,
  },
  {
    type: 'caseStudy',
    label: 'Case Studies',
    query: `*[_type=="caseStudy" && !(_id in path("drafts.**"))] | order(_updatedAt desc) [$from...$to] { _id, _type, title, "slug": slug.current, seoTitle, seoDescription, ogImage, ogImagePath, ogTitle, ogDescription, coverPath, summary, bodyContent }`,
    totalQuery: `count(*[_type=="caseStudy" && !(_id in path("drafts.**"))])`,
  },
  {
    type: 'service',
    label: 'Services',
    query: `*[_type=="service" && !(_id in path("drafts.**"))] | order(_updatedAt desc) [$from...$to] { _id, _type, title, "slug": slug.current, seoTitle, seoDescription, ogImage, coverPath, summary, heroText, body }`,
    totalQuery: `count(*[_type=="service" && !(_id in path("drafts.**"))])`,
  },
  {
    type: 'singletonPage',
    label: 'Pages',
    query: `*[_type=="singletonPage" && !(_id in path("drafts.**"))] | order(_updatedAt desc) [$from...$to] { _id, _type, title, pageId, seoTitle, seoDescription, ogImage, ogImagePath, ogTitle, ogDescription, focusKeyword, body }`,
    totalQuery: `count(*[_type=="singletonPage" && !(_id in path("drafts.**"))])`,
  },
];

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
  const [onlyFailing, setOnlyFailing] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [dupes, setDupes] = useState<DuplicateIndex | undefined>(undefined);
  // One query per type, cached until Refresh / Auto Meta. Duplicates need every doc of the type, not just this page.
  const [alts, setAlts] = useState<AltLookup | undefined>(undefined);
  const altCache = useRef<AltLookup | null>(null);
  const dupeCache = useRef(new Map<string, DuplicateIndex>());

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
      try {
        if (!altCache.current) {
          const assets = await client.fetch<{ relativePath?: string; sitePath?: string; alt?: string }[]>(
            `*[_type=="asset" && mediaType=="Image" && defined(alt) && alt!=""]{ relativePath, sitePath, alt }`,
          );
          const m: AltLookup = new Map();
          for (const a of assets || []) for (const k of [toRel(a.relativePath), toRel(a.sitePath)]) if (k) m.set(k, String(a.alt));
          altCache.current = m;
        }
        setAlts(altCache.current);
      } catch {
        setAlts(undefined); // cover-alt check is skipped rather than reported as failing
      }
      try {
        let idx = dupeCache.current.get(activeType);
        if (!idx) {
          const all = await client.fetch<Record<string, unknown>[]>(
            `*[_type==$t && !(_id in path("drafts.**"))]{ seoTitle, seoDescription }`,
            { t: activeType },
          );
          idx = buildDuplicateIndex(all || []);
          dupeCache.current.set(activeType, idx);
        }
        setDupes(idx);
      } catch {
        setDupes(undefined); // duplicate checks are skipped rather than reported as passing
      }
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
      dupeCache.current.delete(activeType);
      setRows((arr) =>
        arr.map((r) => (r._id === row._id ? { ...r, seoTitle, seoDescription } : r))
      );
    } catch (e: any) {
      alert(`Auto-generate failed: ${e?.message || 'Unknown error'}`);
    }
  };

  const checksFor = (r: SeoRow) => checksSummary(seoChecks(r as any, dupes, alts));
  const filtered = rows.filter((r) => {
    if (onlyFailing && checksFor(r).failed.length === 0) return false;
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
        <Button text="Refresh" mode="ghost" onClick={() => { dupeCache.current.clear(); altCache.current = null; load(page); }} />
      </Flex>
      <Card padding={3} marginBottom={3} radius={2} tone="caution" border>
        <Text size={1}>
          <strong>Completeness</strong> only checks that fields are filled — it does not measure ranking quality. <strong>Checks</strong> are simple rules
          (length, slug, alt text, duplicates). Neither is a real SEO score.
        </Text>
      </Card>

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
          <Button
            text={onlyFailing ? 'Showing: Has failing checks' : 'Filter: Has failing checks'}
            tone={onlyFailing ? 'critical' : 'default'}
            mode={onlyFailing ? 'default' : 'ghost'}
            onClick={() => setOnlyFailing(!onlyFailing)}
          />
          <Box flex={1} />
          <Text size={1} muted>
            Showing {rows.length} of {total} · page {page + 1}/{totalPages}
          </Text>
        </Flex>

      {loading ? (
        <RowSkeleton cols={5} />
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
                  <th style={{ padding: '8px 12px', textAlign: 'center', borderBottom: '1px solid var(--card-border-color, #2b2b2b)', width: 130 }}>
                    <Tooltip content={<Box padding={2}><Text size={1}>{COMPLETENESS_HELP}</Text></Box>} placement="top"><span>Completeness</span></Tooltip>
                  </th>
                  <th style={{ padding: '8px 12px', textAlign: 'center', borderBottom: '1px solid var(--card-border-color, #2b2b2b)', width: 120 }}>
                    <Tooltip content={<Box padding={2}><Text size={1}>Rule-based content checks that apply to this document type.</Text></Box>} placement="top"><span>Checks passed</span></Tooltip>
                  </th>
                  <th style={{ padding: '8px 12px', textAlign: 'right', borderBottom: '1px solid var(--card-border-color, #2b2b2b)', width: 140 }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((row) => {
                  const score = seoScore(row as any);
                  const level = seoLevel(score);
                  const checks = checksFor(row);
                  const open = expanded === row._id;
                  return (
                    <Fragment key={row._id}>
                    <tr style={{ borderBottom: '1px solid var(--card-border-color, #222)' }}>
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
                      <td style={{ padding: '10px 12px', textAlign: 'center' }}>
                        <Button
                          mode="bleed"
                          padding={1}
                          fontSize={1}
                          aria-expanded={open}
                          aria-label={`Show checks for ${String(row.title || row._id)}`}
                          disabled={checks.total === 0}
                          onClick={() => setExpanded(open ? null : row._id)}
                          text={checks.total ? `${checks.passed}/${checks.total} ${open ? '▾' : '▸'}` : '—'}
                          tone={checks.total === 0 ? 'default' : checks.failed.length === 0 ? 'positive' : checks.failed.some((c) => c.severity === 'bad') ? 'critical' : 'caution'}
                        />
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
                    {open && (
                      <tr style={{ borderBottom: '1px solid var(--card-border-color, #222)', background: 'var(--card-muted-bg-color, #191919)' }}>
                        <td colSpan={5} style={{ padding: '10px 12px' }}>
                          {checks.failed.length === 0 ? (
                            <Text size={1} muted>All {checks.total} checks pass.</Text>
                          ) : (
                            <Stack space={2}>
                              {checks.failed.map((c) => (
                                <Flex key={c.id} gap={2} align="flex-start">
                                  <Badge tone={c.severity === 'bad' ? 'critical' : 'caution'} fontSize={0}>{c.severity === 'bad' ? 'Fix' : 'Warn'}</Badge>
                                  <Text size={1}><strong>{c.label}.</strong> {c.hint}</Text>
                                </Flex>
                              ))}
                            </Stack>
                          )}
                        </td>
                      </tr>
                    )}
                    </Fragment>
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
