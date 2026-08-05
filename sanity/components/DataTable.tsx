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
import { compareStrings, truncate } from '../lib/format';
import { toCSV, downloadCSV, copyText } from '../lib/csv';
import { seoScore } from '../lib/health';
import { SeoBadge, StatusBadge, Thumb, AuthorAvatar, UpdatedTime, PublishState, EmptyState, RowSkeleton } from './ui';
import type { Row, ColumnDef, BulkAction } from '../lib/types';

interface SavedView {
  id: string;
  name: string;
  filters: Record<string, string>;
  sort?: SortingState;
}

const VIEWS_KEY = 'wugweb.dataTable.views';
const VIS_KEY = 'wugweb.dataTable.visible';
const DENSITY_KEY = 'wugweb.dataTable.density';
const FAV_KEY = 'wugweb.dataTable.favs';

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
  rows,
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

  const notify = useCallback((msg: string) => {
    setToast(msg);
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), 2200);
  }, []);

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

  // ── Filter + paginate (client-side over the full rows) ──
  const filtered = useMemo(() => {
    let out = rows;
    const needle = q.trim().toLowerCase();
    if (needle) {
      out = out.filter((row) =>
        columns.some((c) => String(row[c.key] ?? '').toLowerCase().includes(needle))
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
    return out;
  }, [rows, q, filters, columns]);

  useEffect(() => setPage(0), [q, filters, rows]);

  const pageSize = density === 'compact' ? 50 : 25;
  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const pageRows = filtered.slice(page * pageSize, (page + 1) * pageSize);

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

  const runBulk = async (action: BulkAction) => {
    if (!selected.size) return;
    if (action.confirm && !window.confirm(action.confirm)) return;
    try {
      const didReload = await action.run([...selected], client);
      if (didReload && onReload) onReload();
      notify(`${action.label}: ${selected.size}`);
      clearSelection();
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

  // ── Views ──
  const applyView = (v: SavedView) => {
    setFilters(v.filters || {});
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
      {toast && (
        <Box style={{ position: 'fixed', bottom: 24, right: 24, zIndex: 100 }}>
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
          icon={SearchIcon}
          placeholder="Search… (⌘K)"
          value={q}
          onChange={(e) => setQ(e.currentTarget.value)}
          style={{ maxWidth: 240, width: '100%' }}
        />

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
                      const v: SavedView = { id: `${Date.now()}`, name: viewName.trim(), filters, sort: sorting };
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

      {/* Bulk bar */}
      {selected.size > 0 && (
        <Card tone="positive" padding={2} radius={2} marginBottom={2}>
          <Flex align="center" gap={2} wrap="wrap">
            <Text size={1} weight="semibold">{selected.size} selected</Text>
            <Box flex={1} />
            {bulkActions?.map((a) => (
              <Button
                key={a.id}
                text={a.label}
                icon={a.icon}
                tone={a.danger ? 'critical' : 'default'}
                mode="ghost"
                onClick={() => runBulk(a)}
              />
            ))}
            <Button text="Clear" mode="ghost" icon={CloseIcon} onClick={clearSelection} />
          </Flex>
        </Card>
      )}

      {/* Table */}
      <Card border radius={2} overflow="hidden">
        {loading ? (
          <RowSkeleton cols={columns.length} />
        ) : error ? (
          <Box padding={4}>
            <Text size={1} style={{ color: 'var(--card-bad-fg-color, #e54f30)' }}>{error}</Text>
            <Button text="Retry" mode="ghost" onClick={onReload} style={{ marginTop: 8 }} />
          </Box>
        ) : filtered.length === 0 ? (
          <EmptyState title={emptyTitle} body={emptyBody} />
        ) : (
          <div style={{ overflow: 'auto', maxHeight: 'calc(100vh - 240px)' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: density === 'compact' ? 12 : 13, fontFamily: 'Inter, system-ui, sans-serif' }}>
              <thead>
                {table.getHeaderGroups().map((hg: any) => (
                  <tr key={hg.id} style={{ background: 'var(--card-muted-bg-color, #f1f3f5)', position: 'sticky', top: 0, zIndex: 2 }}>
                    <th style={{ width: 36, padding: '8px 12px', borderBottom: '1px solid var(--card-border-color, #e1e3e6)' }}>
                      <Checkbox checked={allOnPageSelected} onChange={toggleAll} />
                    </th>
                    {hg.headers.map((header: any) => {
                      const c = columns.find((x) => x.key === header.id);
                      const canSort = header.column.getCanSort();
                      const sorted = header.column.getIsSorted();
                      return (
                        <th
                          key={header.id}
                          id={`dt-th-${tableKey}-${header.id}`}
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
                          onClick={() => canSort && header.column.toggleSorting()}
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
                {pageRows.map((row: Row, ri: number) => {
                  const url = getRowUrl?.(row);
                  const title = getRowTitle?.(row) ?? String(row.title ?? row.name ?? row._id);
                  const sub = getRowSubtitle?.(row);
                  const thumb = getRowThumb?.(row);
                  const isSelected = selected.has(row._id);
                  const isFav = favs.includes(row._id);
                  return (
                    <tr
                      key={row._id}
                      onClick={() => (onRowClick ? onRowClick(row) : toggleRow(row._id))}
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
                        <Checkbox checked={isSelected} onChange={() => toggleRow(row._id)} onClick={(e) => e.stopPropagation()} />
                      </td>

                      {/* Title cell: thumb + title + subtitle */}
                      <td style={{ padding: density === 'compact' ? '6px 12px' : '10px 12px', minWidth: 220 }}>
                        <Flex gap={2} align="center">
                          {thumb && (
                            <Box style={{ width: 36, height: 36, borderRadius: 6, overflow: 'hidden', flexShrink: 0, background: 'var(--card-muted-bg-color, #eee)' }}>
                              <img src={thumb} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            </Box>
                          )}
                          <Stack space={0}>
                            <Text size={1} weight="semibold" style={{ lineHeight: 1.3 }}>
                              {url ? <a href={url} style={{ color: 'inherit', textDecoration: 'none' }}>{title}</a> : title}
                            </Text>
                            {sub && <Text size={0} muted>{sub}</Text>}
                          </Stack>
                        </Flex>
                      </td>

                      {/* Remaining columns */}
                      {(() => {
                        const cells: any[] = table.getRow(row._id)?.getVisibleCells() ?? [];
                        return cells
                          .filter((cell) => cell.column.id !== 'title')
                          .map((cell) => (
                            <td key={cell.id} style={{ padding: density === 'compact' ? '6px 12px' : '10px 12px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: 200 }}>
                              {flexRender(cell.column.columnDef.cell, cell.getContext())}
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
            {filtered.length} rows · page {page + 1} of {totalPages}
          </Text>
          <Flex gap={1}>
            <Button mode="ghost" icon={ChevronLeftIcon} disabled={page === 0} onClick={() => setPage((p) => Math.max(0, p - 1))} />
            <Button mode="ghost" icon={ChevronRightIcon} disabled={page >= totalPages - 1} onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))} />
          </Flex>
        </Flex>
      )}
    </Card>
  );
}
