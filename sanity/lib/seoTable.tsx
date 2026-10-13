/**
 * SEO + Markdown features for the Tables tool and desk list panes, folded in
 * from the retired SEO and Copy & Export tabs (2026-10-13).
 *
 * Extra Sanity API calls when a Posts / Case Studies / Services / Pages table
 * opens, on top of the table's own one query:
 *   - duplicate index for that type: 1 small query ({seoTitle, seoDescription})
 *   - asset alt lookup: 1 query, shared by all four types
 * Both are cached for 5 minutes, so switching tables or re-opening one within
 * that window costs nothing. Free plan: 250k API requests/month.
 */
import { useEffect, useMemo, useState } from 'react';
import { Badge, Box, Button, Card, Flex, Popover, Stack, Text, useClickOutsideEvent } from '@sanity/ui';
import { SparklesIcon } from '@sanity/icons';
import { buildDuplicateIndex, type AltLookup, type DuplicateIndex } from './health';
import { toRel } from './assetUsage';
import { enrichRows, SEO_TABLE_TYPES, type ChecksResult } from './seoSummary';
import { docToMarkdown } from './markdown';
import { autoMetaDocs, AUTO_META_CONFIRM } from './autoMeta';
import type { BulkAction, ColumnDef, Row, TableConfig } from './types';

const TTL_MS = 5 * 60_000;
let altCache: { at: number; value: AltLookup } | null = null;
const dupeCache = new Map<string, { at: number; value: DuplicateIndex }>();

/** Drop the cached duplicate index after a write that changes SEO fields. */
export function invalidateSeoCache(type: string): void {
  dupeCache.delete(type);
}

async function loadAlts(client: any): Promise<AltLookup | undefined> {
  if (altCache && Date.now() - altCache.at < TTL_MS) return altCache.value;
  try {
    const assets = await client.fetch(`*[_type=="asset" && mediaType=="Image" && defined(alt) && alt!=""]{ relativePath, sitePath, alt }`);
    const m: AltLookup = new Map();
    for (const a of assets || []) for (const k of [toRel(a.relativePath), toRel(a.sitePath)]) if (k) m.set(k, String(a.alt));
    altCache = { at: Date.now(), value: m };
    return m;
  } catch {
    return undefined; // the cover-alt check is then skipped, never reported as failing
  }
}

async function loadDupes(client: any, type: string): Promise<DuplicateIndex | undefined> {
  const hit = dupeCache.get(type);
  if (hit && Date.now() - hit.at < TTL_MS) return hit.value;
  try {
    const all = await client.fetch(`*[_type==$t && !(_id in path("drafts.**"))]{ seoTitle, seoDescription }`, { t: type });
    const value = buildDuplicateIndex(all || []);
    dupeCache.set(type, { at: Date.now(), value });
    return value;
  } catch {
    return undefined; // duplicate checks are then skipped, never reported as passing
  }
}

/** Rows plus __checks / __checksState / __seoMissing / __words / __readTime. A no-op for other types. */
export function useSeoEnrichment(rows: Row[], seoType: string | undefined, client: any): Row[] {
  const [ctx, setCtx] = useState<{ dupes?: DuplicateIndex; alts?: AltLookup }>({});
  useEffect(() => {
    if (!seoType) return;
    let alive = true;
    setCtx({});
    Promise.all([loadDupes(client, seoType), loadAlts(client)]).then(([dupes, alts]) => {
      if (alive) setCtx({ dupes, alts });
    });
    return () => {
      alive = false;
    };
  }, [seoType, client]);
  return useMemo(() => (seoType ? enrichRows(rows, ctx.dupes, ctx.alts) : rows), [rows, seoType, ctx]);
}

/** "9/10 ▸" — click to see which checks fail and why. */
function ChecksCell({ result }: { result?: ChecksResult }) {
  const [open, setOpen] = useState(false);
  const [buttonEl, setButtonEl] = useState<HTMLElement | null>(null);
  const [popoverEl, setPopoverEl] = useState<HTMLElement | null>(null);
  useClickOutsideEvent(open ? () => setOpen(false) : undefined, () => [buttonEl, popoverEl]);
  if (!result || result.total === 0) return <Text size={1} muted>—</Text>;
  const tone = result.failed.length === 0 ? 'positive' : result.failed.some((c) => c.severity === 'bad') ? 'critical' : 'caution';
  return (
    <Popover
      open={open}
      portal
      placement="bottom-start"
      ref={setPopoverEl}
      content={
        <Card padding={3} radius={2} style={{ maxWidth: 420 }} onClick={(e) => e.stopPropagation()}>
          {result.failed.length === 0 ? (
            <Text size={1} muted>All {result.total} checks pass.</Text>
          ) : (
            <Stack space={2}>
              {result.failed.map((c) => (
                <Flex key={c.id} gap={2} align="flex-start">
                  <Badge tone={c.severity === 'bad' ? 'critical' : 'caution'} fontSize={0}>{c.severity === 'bad' ? 'Fix' : 'Warn'}</Badge>
                  <Box flex={1}><Text size={1}><strong>{c.label}.</strong> {c.hint}</Text></Box>
                </Flex>
              ))}
            </Stack>
          )}
        </Card>
      }
    >
      <Button
        ref={setButtonEl}
        mode="bleed"
        padding={1}
        fontSize={1}
        tone={tone}
        aria-expanded={open}
        aria-label={`Checks passed ${result.label}. Show failing checks`}
        text={`${result.label} ${open ? '▾' : '▸'}`}
        onClick={(e) => {
          e.stopPropagation();
          setOpen((o) => !o);
        }}
      />
    </Popover>
  );
}

/** The columns added to the four content tables. */
export const SEO_COLUMNS: ColumnDef[] = [
  { key: 'seoDescription', label: 'SEO description', width: 260, edit: { kind: 'text' } },
  {
    key: '__checksState',
    label: 'Checks passed',
    width: 120,
    filter: true,
    render: (row) => <ChecksCell result={row.__checks as ChecksResult | undefined} />,
  },
  {
    key: '__seoMissing',
    label: 'Missing SEO',
    width: 140,
    hiddenByDefault: true,
    filter: true,
    render: (row) => <Text size={1} muted>{String(row.__seoMissing ?? '—')}</Text>,
  },
  { key: '__words', label: 'Words', width: 80, hiddenByDefault: true, render: (row) => <Text size={1} muted>{String(row.__words ?? 0)}</Text> },
  {
    key: '__readTime',
    label: 'Read time',
    width: 90,
    hiddenByDefault: true,
    render: (row) => <Text size={1} muted>{row.__readTime ? `${row.__readTime}m` : '—'}</Text>,
  },
];

/** Props a table needs for the SEO + Markdown features. Empty for other types. */
export function seoTableProps(config: TableConfig | undefined, client: any): {
  seoType?: string;
  getMarkdown?: (row: Row) => string;
  bulkActions: BulkAction[];
} {
  if (!config || !SEO_TABLE_TYPES.has(config.type)) return { bulkActions: [] };
  const type = config.type;
  return {
    seoType: type,
    getMarkdown: (row) => docToMarkdown(row),
    bulkActions: [
      {
        id: 'autoMeta',
        label: 'Auto Meta',
        icon: <SparklesIcon />,
        confirm: AUTO_META_CONFIRM,
        run: async (ids: string[]) => {
          const ok = await autoMetaDocs(client, ids);
          invalidateSeoCache(type);
          return ok;
        },
      },
    ],
  };
}
