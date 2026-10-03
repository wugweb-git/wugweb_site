import { useMemo, useState, useEffect, useCallback, useRef } from 'react';
import {
  Box,
  Button,
  Card,
  Checkbox,
  Flex,
  MenuDivider,
  MenuItem,
  Popover,
  Select,
  Stack,
  Text,
  TextInput,
  Tooltip,
} from '@sanity/ui';
import {
  ArrowDownIcon,
  ArrowUpIcon,
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  CloseIcon,
  CopyIcon,
  DownloadIcon,
  EllipsisHorizontalIcon,
  LaunchIcon,
  PinIcon,
  SearchIcon,
  StarIcon,
  TrashIcon,
} from '@sanity/icons';
import { useTable, createColumnHelper, flexRender, createCoreRowModel, createSortedRowModel, type SortingState, type ColumnVisibilityState } from '@tanstack/react-table';
import { loadLS, saveLS } from '../lib/localState';
import { patchFields } from '../lib/docActions';
import { EditableCell } from './EditableCell';
import { compareStrings, truncate } from '../lib/format';
import { toCSV, downloadCSV, copyText } from '../lib/csv';
import { seoScore } from '../lib/health';
import { SeoBadge, StatusBadge, Thumb, AuthorAvatar, UpdatedTime, PublishState, EmptyState, RowSkeleton } from './ui';
import type { Row, ColumnDef, BulkAction } from '../lib/types';

interface SavedView {
  id: string;
  name: string;
  filters: Record<string, string>;
  facets?: Record<string, string>;
  groupBy?: string;
  sort?: SortingState;
}

const VIEWS_KEY = 'wugweb.dataTable.views';
const VIS_KEY = 'wugweb.dataTable.visible';
const DENSITY_KEY = 'wugweb.dataTable.density';
const FAV_KEY = 'wugweb.dataTable.favs';
const GROUP_KEY = 'wugweb.dataTable.groupBy';
const EMPTY = '__empty__';

type DisplayItem =
  | { type: 'group'; key: string; label: string; count: number; collapsed: boolean; continued?: boolean; ids: string[] }
  | { type: 'row'; row: Row };

function cellValue(row: Row, c: ColumnDef): string {
  const v = c.value ? c.value(row) : (row as any)[c.key];
  if (v === null || v === undefined || v === '') return '';
  if (typeof v === 'boolean') return v ? 'Yes' : 'No';
  return String(v);
}

function compareValues(a: string, b: string): number {
  const na = Number(a);
  const nb = Number(b);
  if (a !== '' && b !== '' && Number.isFinite(na) && Number.isFinite(nb)) return na - nb;
  if (a === '' && b !== '') return 1; // empties last
  if (b === '' && a !== '') return -1;
  return a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' });
}

export interface DataTableProps {
  rows: Row[];
  columns: ColumnDef[];
  loading?: boolean;
  error?: string | null;
  tableKey: string;
  /** Optional click handler for a row (e.g. pane-router edit intent). */
  onRowClick?: (row: Row) => void;
  getRowUrl?: (row: Row) => string;
  getRowThumb?: (row: Row) => string | null;
  getRowTitle?: (row: Row) => string;
  getRowSubtitle?: (row: Row) => string;
  bulkActions?: BulkAction[];
  onReload?: () => void;
  emptyTitle?: string;
  emptyBody?: string;
  toolbarTitle?: string;
  client: any;
}

function defaultSort(cols: ColumnDef[]): SortingState {
  // sensible default: first pinned text column asc
  const c = cols.find((x) => !x.hiddenByDefault);
  return c ? [{ id: c.key, desc: false }] : [];
}

export function DataTable({
  rows: rowsProp,
  columns,
  loading,
  error,
  tableKey,
  onRowClick,
  getRowUrl,
  getRowThumb,
  getRowTitle,
  getRowSubtitle,
  bulkActions,
  onReload,
  emptyTitle = 'No rows',
  emptyBody,
  toolbarTitle,
  client,
}: DataTableProps) {
  const [sorting, setSorting] = useState<SortingState>(() => defaultSort(columns));
  const [visible, setVisible] = useState<ColumnVisibilityState>(() => {
    const saved = loadLS<Record<string, boolean>>(`${VIS_KEY}.${tableKey}`, {});
    return columns.reduce<Record<string, boolean>>((acc, c) => {
      acc[c.key] = saved[c.key] ?? !c.hiddenByDefault;
      return acc;
    }, {});
  });
  const [q, setQ] = useState('');
  const [filters, setFilters] = useState<Record<string, string>>({});
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [views, setViews] = useState<SavedView[]>(() => loadLS<SavedView[]>(VIEWS_KEY, []));
  const [activeView, setActiveView] = useState<string | null>(null);
  const [viewName, setViewName] = useState('');
  const [density, setDensity] = useState<'comfortable' | 'compact'>(() => loadLS<'comfortable' | 'compact'>(DENSITY_KEY, 'comfortable'));
  const [page, setPage] = useState(0);
  const [toast, setToast] = useState<string | null>(null);
  const [favs, setFavs] = useState<string[]>(() => loadLS<string[]>(FAV_KEY, []));
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const colWidths = useRef<Record<string, number>>({});
  const [overrides, setOverrides] = useState<Record<string, Record<string, unknown>>>({});
  const [facets, setFacets] = useState<Record<string, string>>({});
  const [groupBy, setGroupBy] = useState<string>(() => {
    const saved = loadLS<string>(`${GROUP_KEY}.${tableKey}`, '');
    return columns.some((c) => c.key === saved && c.groupable) ? saved : '';
  });
  const [collapsed, setCollapsed] = useState<Set<string>>(new Set());

  // Fresh data from the server replaces any optimistic edits.
  useEffect(() => setOverrides({}), [rowsProp]);
  const rows = useMemo(
    () => rowsProp.map((r) => (overrides[r._id] ? ({ ...r, ...overrides[r._id] } as Row) : r)),
    [rowsProp, overrides]
  );

  const notify = useCallback((msg: string) => {
    setToast(msg);
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), 2200);
  }, []);

  const saveCell = useCallback(
    async (row: Row, key: string, value: string) => {
      const col = columns.find((c) => c.key === key);
      const field = col?.edit?.field ?? key;
      setOverrides((o) => ({ ...o, [row._id]: { ...o[row._id], [key]: value === '' ? undefined : value } }));
      try {
        await patchFields(client, row._id, { [field]: value });
        notify(`Saved ${col?.label ?? key}`);
      } catch (e: any) {
        setOverrides((o) => {
          const cur = { ...o[row._id] };
          delete cur[key];
          return { ...o, [row._id]: cur };
        });
        notify(`Save failed: ${e?.message || 'unknown error'}`);
        throw e;
      }
    },
    [client, columns, notify]
  );

  // ── Column defs → TanStack columns ──
  const tanColumns = useMemo(() => {
    const helper = createColumnHelper<any, any>();
    return columns.map((c) =>
      helper.accessor(
        (row) => (row as any)[c.key],
        {
          id: c.key,
          header: c.label,
          enableSorting: c.sortable !== false,
          enablePinning: c.pinned,
          cell: (info: any) => {
            const row = info.row.original as Row;
            return c.render ? c.render(row) : <Text size={1} muted>{truncate(String((row as any)[c.key] ?? '—'))}</Text>;
          },
        } as any
      )
    ) as any[];
  }, [columns]);

  const table = useTable<any, any>({
    data: rows,
    columns: tanColumns,
    state: { sorting, columnVisibility: visible },
    onSortingChange: setSorting,
    onColumnVisibilityChange: setVisible,
    getCoreRowModel: createCoreRowModel(),
    getSortedRowModel: createSortedRowModel(),
    getRowId: (row: any) => (row as any)._id,
  } as any);

  // ── Filter → sort → group → paginate (client-side over the full rows) ──
  const filtered = useMemo(() => {
    let out = rows;
    const needle = q.trim().toLowerCase();
    if (needle) {
      out = out.filter((row) =>
        columns.some((c) => cellValue(row, c).toLowerCase().includes(needle))
      );
    }
    for (const [k, v] of Object.entries(filters)) {
      if (!v) continue;
      out = out.filter((row) => {
        const cell = row[k];
        if (Array.isArray(cell)) return cell.some((x) => String(x).toLowerCase().includes(v.toLowerCase()));
        return String(cell ?? '').toLowerCase().includes(v.toLowerCase());
      });
    }
    for (const [k, v] of Object.entries(facets)) {
      if (!v) continue;
      const col = columns.find((c) => c.key === k);
      if (!col) continue;
      out = out.filter((row) => {
        const val = cellValue(row, col);
        return v === EMPTY ? val === '' : val === v;
      });
    }
    return out;
  }, [rows, q, filters, facets, columns]);

  const sorted = useMemo(() => {
    const s0 = sorting[0];
    const col = s0 && columns.find((c) => c.key === s0.id);
    if (!s0 || !col) return filtered;
    const dir = s0.desc ? -1 : 1;
    return [...filtered].sort((a, b) => dir * compareValues(cellValue(a, col), cellValue(b, col)));
  }, [filtered, sorting, columns]);

  const groupCol = useMemo(() => columns.find((c) => c.key === groupBy && c.groupable), [columns, groupBy]);

  const items = useMemo<DisplayItem[]>(() => {
    if (!groupCol) return sorted.map((row) => ({ type: 'row', row }));
    const buckets = new Map<string, Row[]>();
    for (const row of sorted) {
      const key = cellValue(row, groupCol);
      buckets.set(key, [...(buckets.get(key) ?? []), row]);
    }
    const keys = [...buckets.keys()].sort((a, b) => compareValues(a, b));
    const out: DisplayItem[] = [];
    for (const key of keys) {
      const groupRows = buckets.get(key)!;
      const isCollapsed = collapsed.has(key);
      out.push({ type: 'group', key, label: key || '(empty)', count: groupRows.length, collapsed: isCollapsed, ids: groupRows.map((r) => r._id) });
      if (!isCollapsed) groupRows.forEach((row) => out.push({ type: 'row', row }));
    }
    return out;
  }, [sorted, groupCol, collapsed]);

  useEffect(() => setPage(0), [q, filters, facets, groupBy, rowsProp]);

  const pageSize = groupCol ? 100 : density === 'compact' ? 50 : 25;
  const totalPages = Math.max(1, Math.ceil(items.length / pageSize));
  const pageItems = useMemo<DisplayItem[]>(() => {
    const slice = items.slice(page * pageSize, (page + 1) * pageSize);
    if (groupCol && slice[0]?.type === 'row') {
      // page starts mid-group: repeat the group header for context
      const key = cellValue(slice[0].row, groupCol);
      const head = items.find((it) => it.type === 'group' && it.key === key);
      if (head && head.type === 'group') return [{ ...head, continued: true }, ...slice];
    }
    return slice;
  }, [items, page, pageSize, groupCol]);
  const pageRows = useMemo(
    () => pageItems.filter((it): it is { type: 'row'; row: Row } => it.type === 'row').map((it) => it.row),
    [pageItems]
  );

  // Dropdown filter options (value → count), built from all rows.
  const facetOptions = useMemo(() => {
    const out: Record<string, { value: string; count: number }[]> = {};
    for (const c of columns.filter((x) => x.filter)) {
      const counts = new Map<string, number>();
      for (const row of rows) {
        const v = cellValue(row, c) || EMPTY;
        counts.set(v, (counts.get(v) ?? 0) + 1);
      }
      out[c.key] = [...counts.entries()]
        .map(([value, count]) => ({ value, count }))
        .sort((a, b) => (a.value === EMPTY ? 1 : b.value === EMPTY ? -1 : compareValues(a.value, b.value)));
    }
    return out;
  }, [rows, columns]);

  // Choices for editable selects / combos: configured options + values already in the data.
  const editOptions = useMemo(() => {
    const out: Record<string, string[]> = {};
    for (const c of columns.filter((x) => x.edit)) {
      const set = new Set<string>(c.edit!.options ?? []);
      if (c.edit!.kind !== 'select') {
        for (const row of rows) {
          const v = (row as any)[c.key];
          if (typeof v === 'string' && v) set.add(v);
        }
      }
      out[c.key] = [...set];
    }
    return out;
  }, [rows, columns]);

  const activeFilterCount = Object.values(facets).filter(Boolean).length + Object.values(filters).filter(Boolean).length + (q.trim() ? 1 : 0);

  // ── Selection ──
  const pageIds = pageRows.map((r) => r._id);
  const allOnPageSelected = pageIds.length > 0 && pageIds.every((id) => selected.has(id));
  const toggleAll = () => {
    if (allOnPageSelected) {
      const next = new Set(selected);
      pageIds.forEach((id) => next.delete(id));
      setSelected(next);
    } else {
      const next = new Set(selected);
      pageIds.forEach((id) => next.add(id));
      setSelected(next);
    }
  };
  const toggleRow = (id: string) => {
    const next = new Set(selected);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSelected(next);
  };
  const clearSelection = () => setSelected(new Set());
  const toggleGroup = (ids: string[]) => {
    const next = new Set(selected);
    const all = ids.every((id) => next.has(id));
    ids.forEach((id) => (all ? next.delete(id) : next.add(id)));
    setSelected(next);
  };
  const toggleCollapsed = (key: string) =>
    setCollapsed((cur) => {
      const next = new Set(cur);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });

  const runBulk = async (action: BulkAction, value?: string) => {
    if (!selected.size) return;
    if (action.options && !window.confirm(`${action.label} → ${value ? `"${value}"` : '(empty)'} on ${selected.size} document${selected.size === 1 ? '' : 's'}?`)) return;
    if (action.confirm && !window.confirm(action.confirm)) return;
    try {
      const didReload = await action.run([...selected], client, value);
      if (didReload && onReload) onReload();
      notify(`${action.label}${value !== undefined ? ` → ${value || '(empty)'}` : ''}: ${selected.size}`);
      clearSelection();
    } catch (e: any) {
      notify(`Action failed: ${e?.message || 'unknown error'}`);
    }
  };

  const runSingleAction = async (action: BulkAction, row: Row) => {
    if (action.confirm && !window.confirm(action.confirm)) return;
    try {
      const didReload = await action.run([row._id], client);
      if (didReload && onReload) onReload();
      notify(`${action.label}: 1`);
      setSelected((current) => {
        const next = new Set(current);
        next.delete(row._id);
        return next;
      });
    } catch (e: any) {
      notify(`Action failed: ${e?.message || 'unknown error'}`);
    }
  };

  // ── Column resize ──
  const startResize = (e: React.MouseEvent, key: string) => {
    e.preventDefault();
    e.stopPropagation();
    const startX = e.clientX;
    const startW = colWidths.current[key] ?? columns.find((c) => c.key === key)?.width ?? 160;
    const onMove = (ev: MouseEvent) => {
      colWidths.current[key] = Math.max(80, startW + (ev.clientX - startX));
      const th = document.getElementById(`dt-th-${tableKey}-${key}`);
      if (th) th.style.width = `${colWidths.current[key]}px`;
    };
    const onUp = () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
    };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
  };

  const changeGroup = (key: string) => {
    setGroupBy(key);
    setCollapsed(new Set());
    saveLS(`${GROUP_KEY}.${tableKey}`, key);
  };

  // ── Views ──
  const applyView = (v: SavedView) => {
    setFilters(v.filters || {});
    setFacets(v.facets || {});
    changeGroup(v.groupBy || '');
    if (v.sort) setSorting(v.sort);
    setActiveView(v.id);
  };

  // ── Export ──
  const exportCSV = () => {
    const visibleCols = columns.filter((c) => visible[c.key] !== false);
    downloadCSV(`${tableKey}.csv`, toCSV(filtered, visibleCols.map((c) => ({ key: c.key, label: c.label }))));
    notify('Exported CSV');
  };

  const copy = async (text: string, label: string) => {
    await copyText(text);
    notify(`Copied ${label}`);
  };

  const toggleFav = (id: string) => {
    const next = favs.includes(id) ? favs.filter((f) => f !== id) : [...favs, id];
    setFavs(next);
    saveLS(FAV_KEY, next);
  };

  // ── Keyboard: ⌘K focuses search ──
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        document.getElementById(`dt-search-${tableKey}`)?.focus();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [tableKey]);

  const filterableColumns = columns.filter((c) => !c.hiddenByDefault);

  return (
    <Card tone="default" padding={[2, 3]}>
      <style>{`
        .wugweb-dt-focusable:focus-visible {
          outline: 2px solid var(--card-focus-ring-color, #4c9aff);
          outline-offset: -2px;
        }
      `}</style>
      {toast && (
        <Box style={{ position: 'fixed', bottom: 24, right: 24, zIndex: 100 }} role="status" aria-live="polite">
          <Card tone="primary" padding={3} radius={2} shadow={2}>
            <Text size={1}>{toast}</Text>
          </Card>
        </Box>
      )}

      {/* Toolbar */}
      <Flex gap={2} align="center" wrap="wrap" paddingBottom={3}>
        {toolbarTitle && (
          <Text size={2} weight="semibold" muted style={{ marginRight: 'auto' }}>
            {toolbarTitle}
          </Text>
        )}
        <TextInput
          id={`dt-search-${tableKey}`}
          aria-label="Search table"
          icon={SearchIcon}
          placeholder="Search… (⌘K)"
          value={q}
          onChange={(e) => setQ(e.currentTarget.value)}
          style={{ maxWidth: 240, width: '100%' }}
        />

        {columns.some((c) => c.groupable) && (
          <Select aria-label="Group by" value={groupCol ? groupBy : ''} onChange={(e) => changeGroup(e.currentTarget.value)}>
            <option value="">No grouping</option>
            {columns.filter((c) => c.groupable).map((c) => (
              <option key={c.key} value={c.key}>Group by {c.label.toLowerCase()}</option>
            ))}
          </Select>
        )}

        <Popover
          content={
            <Card padding={2} radius={2} style={{ maxHeight: 320, overflow: 'auto', minWidth: 200 }}>
              <Stack space={1}>
                <Text size={1} weight="semibold" muted style={{ padding: '0 4px 6px' }}>Columns</Text>
                {columns.map((c) => (
                  <label key={c.key} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '4px 8px' }}>
                    <Checkbox
                      checked={visible[c.key] !== false}
                      onChange={() => {
                        const next = { ...visible, [c.key]: visible[c.key] === false };
                        setVisible(next);
                        saveLS(`${VIS_KEY}.${tableKey}`, next);
                      }}
                    />
                    <Text size={1}>{c.label}</Text>
                  </label>
                ))}
              </Stack>
            </Card>
          }
          placement="bottom-end"
        >
          <Button mode="ghost" text="Columns" icon={ChevronDownIcon} />
        </Popover>

        <Select
          aria-label="Row density"
          value={density}
          onChange={(e) => { setDensity(e.currentTarget.value as any); saveLS(DENSITY_KEY, e.currentTarget.value); }}
        >
          <option value="comfortable">Comfortable</option>
          <option value="compact">Compact</option>
        </Select>

        <Popover
          content={
            <Card padding={2} radius={2} style={{ minWidth: 260 }}>
              <Stack space={2}>
                <Text size={1} weight="semibold" muted>Saved views</Text>
                {views.length === 0 && <Text size={1} muted>No saved views yet.</Text>}
                {views.map((v) => (
                  <Flex key={v.id} align="center" gap={2}>
                    <Button
                      text={v.name}
                      mode={activeView === v.id ? 'default' : 'ghost'}
                      onClick={() => applyView(v)}
                      style={{ flex: 1 }}
                    />
                    <Button
                      mode="ghost"
                      icon={TrashIcon}
                      aria-label="Delete view"
                      onClick={() => {
                        const next = views.filter((x) => x.id !== v.id);
                        setViews(next);
                        saveLS(VIEWS_KEY, next);
                      }}
                    />
                  </Flex>
                ))}
                <MenuDivider />
                <Flex gap={2}>
                  <TextInput
                    placeholder="View name"
                    value={viewName}
                    onChange={(e) => setViewName(e.currentTarget.value)}
                    style={{ flex: 1 }}
                  />
                  <Button
                    mode="default"
                    text="Save"
                    disabled={!viewName.trim()}
                    onClick={() => {
                      const v: SavedView = { id: `${Date.now()}`, name: viewName.trim(), filters, facets, groupBy, sort: sorting };
                      const next = [...views, v];
                      setViews(next);
                      saveLS(VIEWS_KEY, next);
                      setViewName('');
                      setActiveView(v.id);
                      notify('View saved');
                    }}
                  />
                </Flex>
              </Stack>
            </Card>
          }
          placement="bottom-end"
        >
          <Button mode="ghost" text="Views" icon={StarIcon} />
        </Popover>

        <Popover
          content={
            <Card padding={3} radius={2} style={{ minWidth: 280 }}>
              <Stack space={3}>
                <Text size={1} weight="semibold" muted>Quick filters</Text>
                {filterableColumns.map((c) => (
                  <Stack key={c.key} space={1}>
                    <Text size={1} muted>{c.label}</Text>
                    <TextInput
                      value={filters[c.key] ?? ''}
                      placeholder={`Filter by ${c.label.toLowerCase()}…`}
                      onChange={(e) => setFilters((f) => ({ ...f, [c.key]: e.currentTarget.value }))}
                    />
                  </Stack>
                ))}
              </Stack>
            </Card>
          }
          placement="bottom-end"
        >
          <Button mode="ghost" text="Filters" icon={ChevronDownIcon} />
        </Popover>

        <Button mode="ghost" text="Export" icon={DownloadIcon} onClick={exportCSV} />
      </Flex>

      {/* Dropdown filters + group controls */}
      {(columns.some((c) => c.filter) || groupCol) && (
        <Flex gap={2} align="center" wrap="wrap" paddingBottom={3}>
          {columns.filter((c) => c.filter).map((c) => (
            <Select
              key={c.key}
              aria-label={`Filter by ${c.label}`}
              value={facets[c.key] ?? ''}
              onChange={(e) => { const v = e.currentTarget.value; setFacets((f) => ({ ...f, [c.key]: v })); }}
              style={{ minWidth: 150 }}
            >
              <option value="">{c.label}: all</option>
              {(facetOptions[c.key] ?? []).map((o) => (
                <option key={o.value} value={o.value}>{o.value === EMPTY ? '(empty)' : o.value} ({o.count})</option>
              ))}
            </Select>
          ))}
          {groupCol && (
            <>
              <Button mode="ghost" fontSize={1} text="Collapse all" onClick={() => setCollapsed(new Set(items.flatMap((i) => (i.type === 'group' ? [i.key] : []))))} />
              <Button mode="ghost" fontSize={1} text="Expand all" onClick={() => setCollapsed(new Set())} />
            </>
          )}
          {activeFilterCount > 0 && (
            <Button mode="ghost" tone="critical" fontSize={1} icon={CloseIcon} text={`Clear filters (${activeFilterCount})`} onClick={() => { setQ(''); setFilters({}); setFacets({}); }} />
          )}
        </Flex>
      )}

      {/* Bulk bar */}
      {selected.size > 0 && (
        <Card tone="positive" padding={2} radius={2} marginBottom={2}>
          <Flex align="center" gap={2} wrap="wrap">
            <Text size={1} weight="semibold">{selected.size} selected</Text>
            <Box flex={1} />
            {bulkActions?.map((a) =>
              a.options ? (
                <Select
                  key={a.id}
                  aria-label={a.label}
                  value=""
                  onChange={(e) => {
                    const v = e.currentTarget.value;
                    if (v) runBulk(a, v === '__clear__' ? '' : v);
                  }}
                  style={{ minWidth: 150 }}
                >
                  <option value="">{a.label}…</option>
                  {a.options.map((o) => (
                    <option key={o} value={o}>{o}</option>
                  ))}
                  <option value="__clear__">(clear)</option>
                </Select>
              ) : (
                <Button
                  key={a.id}
                  text={a.label}
                  icon={a.icon}
                  tone={a.danger ? 'critical' : 'default'}
                  mode="ghost"
                  onClick={() => runBulk(a)}
                />
              )
            )}
            <Button text="Clear" mode="ghost" icon={CloseIcon} onClick={clearSelection} />
          </Flex>
        </Card>
      )}

      {/* Table */}
      <Card border radius={2} overflow="hidden">
        {loading ? (
          <RowSkeleton cols={columns.length} />
        ) : error ? (
          <Card padding={4} tone="critical">
            <Text size={1} weight="medium">{error}</Text>
            <Button text="Retry" mode="ghost" onClick={onReload} style={{ marginTop: 8 }} />
          </Card>
        ) : filtered.length === 0 ? (
          <EmptyState title={emptyTitle} body={emptyBody} />
        ) : (
          <div style={{ overflow: 'auto', maxHeight: 'calc(100vh - 240px)' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: density === 'compact' ? 12 : 13, fontFamily: 'Inter, system-ui, sans-serif' }}>
              <thead>
                {table.getHeaderGroups().map((hg: any) => (
                  <tr key={hg.id} style={{ background: 'var(--card-muted-bg-color, #f1f3f5)', position: 'sticky', top: 0, zIndex: 2 }}>
                    <th style={{ width: 36, padding: '8px 12px', borderBottom: '1px solid var(--card-border-color, #e1e3e6)' }}>
                      <Checkbox aria-label="Select all rows on this page" checked={allOnPageSelected} onChange={toggleAll} />
                    </th>
                    {hg.headers.map((header: any) => {
                      const c = columns.find((x) => x.key === header.id);
                      const canSort = header.column && typeof header.column.getCanSort === 'function' ? header.column.getCanSort() : Boolean(c?.sortable !== false);
                      const sorted = header.column && typeof header.column.getIsSorted === 'function' ? header.column.getIsSorted() : false;
                      const doSort = () => {
                        if (!canSort) return;
                        if (header.column && typeof header.column.toggleSorting === 'function') {
                          header.column.toggleSorting();
                        } else {
                          setSorting((old) => {
                            const isDesc = old.find((x) => x.id === header.id)?.desc;
                            return [{ id: header.id, desc: !isDesc }];
                          });
                        }
                      };
                      return (
                        <th
                          key={header.id}
                          id={`dt-th-${tableKey}-${header.id}`}
                          className={canSort ? 'wugweb-dt-focusable' : undefined}
                          role={canSort ? 'button' : undefined}
                          tabIndex={canSort ? 0 : undefined}
                          aria-sort={sorted === 'asc' ? 'ascending' : sorted === 'desc' ? 'descending' : canSort ? 'none' : undefined}
                          style={{
                            width: colWidths.current[header.id] ?? c?.width ?? 160,
                            padding: '8px 12px',
                            borderBottom: '1px solid var(--card-border-color, #e1e3e6)',
                            fontWeight: 600,
                            whiteSpace: 'nowrap',
                            position: 'relative',
                            userSelect: 'none',
                            cursor: canSort ? 'pointer' : 'default',
                          }}
                          onClick={doSort}
                          onKeyDown={(e) => {
                            if (!canSort) return;
                            if (e.key === 'Enter' || e.key === ' ') {
                              e.preventDefault();
                              doSort();
                            }
                          }}
                        >
                          <Flex align="center" gap={1}>
                            <span>{flexRender(header.column.columnDef.header, header.getContext())}</span>
                            {sorted === 'asc' && <ArrowUpIcon fontSize={12} />}
                            {sorted === 'desc' && <ArrowDownIcon fontSize={12} />}
                          </Flex>
                          <Box
                            onMouseDown={(e) => startResize(e, header.id)}
                            style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: 6, cursor: 'col-resize', zIndex: 3 }}
                          />
                        </th>
                      );
                    })}
                    <th style={{ width: 96, padding: '8px 12px', borderBottom: '1px solid var(--card-border-color, #e1e3e6)' }} />
                  </tr>
                ))}
              </thead>
              <tbody>
                {pageItems.map((item) => {
                  if (item.type === 'group') {
                    const allSelected = item.ids.length > 0 && item.ids.every((id) => selected.has(id));
                    const colCount = columns.filter((c) => !c.pinned && c.key !== 'title' && visible[c.key] !== false).length + 3;
                    return (
                      <tr key={`g:${item.key}:${item.continued ? 'c' : 'h'}`} style={{ background: 'var(--card-muted-bg-color, #f1f3f5)', borderBottom: '1px solid var(--card-border-color, #e1e3e6)' }}>
                        <td style={{ padding: '6px 12px' }}>
                          <Checkbox aria-label={`Select all in ${item.label}`} checked={allSelected} onChange={() => toggleGroup(item.ids)} />
                        </td>
                        <td colSpan={colCount - 1} style={{ padding: '6px 12px' }}>
                          <button
                            type="button"
                            onClick={() => toggleCollapsed(item.key)}
                            aria-expanded={!item.collapsed}
                            style={{ all: 'unset', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 13, fontWeight: 600 }}
                          >
                            {item.collapsed ? <ChevronRightIcon /> : <ChevronDownIcon />}
                            <span>{item.label}</span>
                            <span style={{ fontWeight: 400, color: 'var(--card-muted-fg-color, #6e7683)' }}>
                              {item.count}{item.continued ? ' · continued' : ''}
                            </span>
                          </button>
                        </td>
                      </tr>
                    );
                  }
                  const row = item.row;
                  const url = getRowUrl?.(row);
                  const title = getRowTitle?.(row) ?? String(row.title ?? row.name ?? row._id);
                  const sub = getRowSubtitle?.(row);
                  const thumb = getRowThumb?.(row);
                  const isSelected = selected.has(row._id);
                  const isFav = favs.includes(row._id);
                  const activateRow = () => (onRowClick ? onRowClick(row) : toggleRow(row._id));
                  return (
                    <tr
                      key={row._id}
                      className="wugweb-dt-focusable"
                      role="button"
                      tabIndex={0}
                      aria-label={`Open ${title}`}
                      onClick={activateRow}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          activateRow();
                        }
                      }}
                      style={{
                        borderBottom: '1px solid var(--card-border-color, #eee)',
                        background: isSelected ? 'var(--card-selected-bg-color, #e8f4ff)' : 'transparent',
                        cursor: 'pointer',
                        transition: 'background 120ms ease',
                      }}
                      onMouseEnter={(e) => { if (!isSelected) (e.currentTarget as HTMLTableRowElement).style.background = 'var(--card-muted-bg-color, #f6f8fa)'; }}
                      onMouseLeave={(e) => { if (!isSelected) (e.currentTarget as HTMLTableRowElement).style.background = 'transparent'; }}
                    >
                      <td style={{ padding: '8px 12px' }} onClick={(e) => e.stopPropagation()}>
                        <Checkbox aria-label={`Select ${title}`} checked={isSelected} onChange={() => toggleRow(row._id)} onClick={(e) => e.stopPropagation()} />
                      </td>

                      {/* Title cell: thumb + title + subtitle */}
                      <td style={{ padding: density === 'compact' ? '6px 12px' : '10px 12px', minWidth: 220 }}>
                        <Flex gap={2} align="center">
                          {thumb && (
                            <Box style={{ width: 36, height: 36, borderRadius: 6, overflow: 'hidden', flexShrink: 0, background: 'var(--card-muted-bg-color, #eee)' }}>
                              <img src={thumb} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            </Box>
                          )}
                          <div style={{ minWidth: 0 }}>
                            <div style={{ fontSize: density === 'compact' ? 12 : 13, fontWeight: 600, lineHeight: 1.35, overflowWrap: 'anywhere' }}>
                              {url ? <a href={url} style={{ color: 'inherit', textDecoration: 'none' }}>{title}</a> : title}
                            </div>
                            {sub && (
                              <div style={{ fontSize: 11, lineHeight: 1.35, marginTop: 2, color: 'var(--card-muted-fg-color, #6e7683)', overflowWrap: 'anywhere' }}>
                                {sub}
                              </div>
                            )}
                          </div>
                        </Flex>
                      </td>

                      {/* Remaining columns — rendered directly from column config rather than
                          table.getRow(id).getVisibleCells(), which is unreliable across
                          @tanstack/react-table versions in this setup. */}
                      {(() => {
                        return columns
                          .filter((c) => !c.pinned && c.key !== 'title' && visible[c.key] !== false)
                          .map((c) => (
                            <td key={c.key} style={{ padding: density === 'compact' ? '6px 12px' : '10px 12px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: c.edit ? 260 : 200 }}>
                              {c.edit ? (
                                <EditableCell row={row} column={c} options={editOptions[c.key] ?? []} onSave={saveCell} />
                              ) : c.render ? (
                                c.render(row)
                              ) : (
                                <Text size={1} muted>{truncate(String((row as any)[c.key] ?? '—'))}</Text>
                              )}
                            </td>
                          ));
                      })()}

                      {/* Hover actions / context */}
                      <td style={{ padding: '6px 12px', whiteSpace: 'nowrap' }}>
                        <Flex gap={1} align="center" justify="flex-end">
                          <Tooltip content={isFav ? 'Unfavorite' : 'Favorite'}>
                            <Button mode="ghost" icon={isFav ? StarIcon : undefined} aria-label="Favorite"
                              onClick={(e) => { e.stopPropagation(); toggleFav(row._id); }}
                            />
                          </Tooltip>
                          <Popover
                            content={
                              <Card padding={1} radius={2} style={{ minWidth: 200 }}>
                                <Stack space={1}>
                                  <MenuItem text="Open" icon={LaunchIcon} onClick={() => { if (url) window.open(url, '_blank'); }} />
                                  <MenuItem text="Copy ID" icon={CopyIcon} onClick={() => copy(row._id, 'ID')} />
                                  <MenuItem text="Copy slug" icon={CopyIcon} onClick={() => copy(String(row.slug ?? ''), 'slug')} />
                                  <MenuItem text={isFav ? 'Unpin' : 'Pin'} icon={PinIcon} onClick={() => toggleFav(row._id)} />
                                  <MenuDivider />
                                  {bulkActions?.filter((a) => ['delete', 'duplicate', 'publish', 'unpublish', 'archive'].includes(a.id)).map((a) => (
                                    <MenuItem
                                      key={a.id}
                                      text={a.label}
                                      tone={a.danger ? 'critical' : 'default'}
                                      icon={a.icon}
                                      onClick={() => runSingleAction(a, row)}
                                    />
                                  ))}
                                  <MenuDivider />
                                  <MenuItem text="Export row" icon={DownloadIcon} onClick={() => {
                                    const cols = columns.filter((c) => visible[c.key] !== false);
                                    downloadCSV(`${row._id}.csv`, toCSV([row], cols.map((c) => ({ key: c.key, label: c.label }))));
                                  }} />
                                </Stack>
                              </Card>
                            }
                            placement="bottom-end"
                          >
                            <Button mode="ghost" icon={EllipsisHorizontalIcon} aria-label="Row actions" />
                          </Popover>
                        </Flex>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      {/* Pagination */}
      {filtered.length > 0 && (
        <Flex align="center" justify="space-between" paddingTop={3}>
          <Text size={1} muted>
            {filtered.length} rows{groupCol ? ` in ${items.filter((i) => i.type === 'group').length} groups` : ''} · page {page + 1} of {totalPages}
          </Text>
          <Flex gap={1}>
            <Button mode="ghost" icon={ChevronLeftIcon} aria-label="Previous page" disabled={page === 0} onClick={() => setPage((p) => Math.max(0, p - 1))} />
            <Button mode="ghost" icon={ChevronRightIcon} aria-label="Next page" disabled={page >= totalPages - 1} onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))} />
          </Flex>
        </Flex>
      )}
    </Card>
  );
}
