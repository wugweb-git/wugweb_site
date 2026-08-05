// Shared row/column types for tables, lists, search, and dashboard.

export type { ReactNode } from 'react';

export interface Row {
  _id: string;
  _type: string;
  [k: string]: unknown;
}

export interface ColumnDef {
  key: string;
  label: string;
  /** Default column width in px. */
  width?: number;
  /** Pin left by default (sticky). */
  pinned?: boolean;
  /** Hide by default (opt-in). */
  hiddenByDefault?: boolean;
  /** Disable sorting for this column. */
  sortable?: boolean;
  /** Custom cell renderer (receives the full row). */
  render?: (row: Row) => React.ReactNode;
}

export interface BulkAction {
  id: string;
  label: string;
  icon?: React.ReactNode;
  /** Return true to trigger a reload after completion. */
  run: (ids: string[], client: any) => Promise<boolean> | boolean;
  danger?: boolean;
  confirm?: string;
}

export interface TableConfig {
  /** Unique id used for saved-view persistence + pane wiring. */
  key: string;
  /** Sanity document type this table reads. */
  type: string;
  title: string;
  query: string;
  columns: ColumnDef[];
  /** Where the row title lives (for the primary title cell). */
  titleField?: string;
  /** Extra per-row thumb URL (derived in config from row fields). */
  getThumb?: (row: Row) => string | null;
  getTitle?: (row: Row) => string;
  getSubtitle?: (row: Row) => string;
  /** Open a row: default is edit pane via router. Provide to override. */
  getRowUrl?: (row: Row) => string;
}
