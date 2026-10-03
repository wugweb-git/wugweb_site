import { useEffect, useId, useRef, useState } from 'react';
import type { ColumnDef, Row } from '../lib/types';

const BORDER = 'var(--card-border-color, rgba(128,128,128,0.35))';
const MUTED = 'var(--card-muted-fg-color, #6e7683)';

interface EditableCellProps {
  row: Row;
  column: ColumnDef;
  /** Choices (configured options plus any distinct values already in the column). */
  options: string[];
  onSave: (row: Row, key: string, value: string) => Promise<void>;
}

const baseField: React.CSSProperties = {
  width: '100%',
  boxSizing: 'border-box',
  font: 'inherit',
  fontSize: 13,
  lineHeight: 1.4,
  color: 'inherit',
  background: 'transparent',
  border: '1px solid transparent',
  borderRadius: 4,
  padding: '3px 6px',
  margin: 0,
};

/**
 * In-place editor for a table cell. Selects save on change; text/combo save on
 * Enter or blur and cancel on Escape. All events stop propagating so the row's
 * own click/keyboard handlers (open document, toggle selection) don't fire.
 */
export function EditableCell({ row, column, options, onSave }: EditableCellProps) {
  const edit = column.edit!;
  const raw = row[column.key];
  const current = raw === null || raw === undefined ? '' : String(raw);
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(current);
  const [state, setState] = useState<'idle' | 'saving' | 'error'>('idle');
  const cancelled = useRef(false);
  const listId = useId();
  const who = String(row.name ?? row._id);

  useEffect(() => {
    if (!editing) setDraft(current);
  }, [current, editing]);

  const commit = async (next: string) => {
    const value = next.trim();
    if (value === current) return;
    setState('saving');
    try {
      await onSave(row, column.key, value);
      setState('idle');
    } catch {
      setState('error');
    }
  };

  const stop = (e: React.SyntheticEvent) => e.stopPropagation();
  const errorColor = 'var(--card-badge-critical-dot-color, #d32f2f)';
  const idleBorder = state === 'error' ? errorColor : 'transparent';
  const hoverOn = (e: React.MouseEvent<HTMLElement>) => { if (state !== 'error') e.currentTarget.style.borderColor = BORDER; };
  const hoverOff = (e: React.MouseEvent<HTMLElement>) => { if (state !== 'error') e.currentTarget.style.borderColor = 'transparent'; };
  const opacity = state === 'saving' ? 0.55 : 1;

  if (edit.kind === 'select') {
    const choices = !current || options.includes(current) ? options : [current, ...options];
    return (
      <select
        aria-label={`${column.label} for ${who}`}
        value={current}
        disabled={state === 'saving'}
        onClick={stop}
        onKeyDown={stop}
        onChange={(e) => commit(e.currentTarget.value)}
        style={{ ...baseField, cursor: 'pointer', opacity, borderColor: idleBorder }}
        onMouseEnter={hoverOn}
        onMouseLeave={hoverOff}
      >
        <option value="">—</option>
        {choices.map((o) => (
          <option key={o} value={o}>{o}</option>
        ))}
      </select>
    );
  }

  if (!editing) {
    return (
      <button
        type="button"
        aria-label={`Edit ${column.label} for ${who}`}
        title={current || `Add ${column.label.toLowerCase()}`}
        onClick={(e) => { stop(e); cancelled.current = false; setEditing(true); }}
        onKeyDown={stop}
        onMouseEnter={hoverOn}
        onMouseLeave={hoverOff}
        style={{
          ...baseField,
          textAlign: 'left',
          cursor: 'text',
          opacity,
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          color: current ? 'inherit' : MUTED,
          borderColor: idleBorder,
        }}
      >
        {current || `Add ${column.label.toLowerCase()}…`}
      </button>
    );
  }

  return (
    <>
      <input
        autoFocus
        type="text"
        list={edit.kind === 'combo' ? listId : undefined}
        value={draft}
        aria-label={`${column.label} for ${who}`}
        onClick={stop}
        onChange={(e) => setDraft(e.currentTarget.value)}
        onBlur={() => {
          setEditing(false);
          if (!cancelled.current) commit(draft);
        }}
        onKeyDown={(e) => {
          e.stopPropagation();
          if (e.key === 'Enter') e.currentTarget.blur();
          if (e.key === 'Escape') { cancelled.current = true; setDraft(current); e.currentTarget.blur(); }
        }}
        style={{ ...baseField, borderColor: 'var(--card-focus-ring-color, #2276fc)', minWidth: 140 }}
      />
      {edit.kind === 'combo' && (
        <datalist id={listId}>
          {options.map((o) => (
            <option key={o} value={o} />
          ))}
        </datalist>
      )}
    </>
  );
}
