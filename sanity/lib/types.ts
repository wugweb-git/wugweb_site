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
  /** Plain-text value used for filtering, grouping and sorting (defaults to row[key]). */
  value?: (row: Row) => string;
  /** Show a dropdown filter above the table, built from the values in this column. */
  filter?: boolean;
  /** Allow "Group by" on this column. */
  groupable?: boolean;
  /** Make the cell editable in place; saves with a patch on the document. */
  edit?: {
    kind: 'text' | 'select' | 'combo';
    /** Choices for select; suggestions for combo (extra distinct values are added automatically). */
    options?: string[];
    /** Document field to patch (defaults to the column key). */
    field?: string;
  };
}

export interface BulkAction {
  id: string;
  label: string;
  icon?: React.ReactNode;
  /** Return true to trigger a reload after completion. */
  run: (ids: string[], client: any, value?: string) => Promise<boolean> | boolean;
  /** When set, the bulk bar shows a dropdown and passes the chosen value to run(). */
  options?: string[];
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
  /** Bulk "set field" dropdowns shown when rows are selected. */
  bulkSets?: { field: string; label: string; options: string[] }[];
  /** Open a row: default is edit pane via router. Provide to override. */
  getRowUrl?: (row: Row) => string;
}
