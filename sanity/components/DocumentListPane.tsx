import { useCallback, useEffect, useState } from 'react';
import { Box, Card, Flex, Text } from '@sanity/ui';
import { AddIcon } from '@sanity/icons';
import { useClient } from 'sanity';
import { usePaneRouter } from 'sanity/structure';
import { DataTable } from './DataTable';
import { TABLE_MAP } from '../lib/tableConfigs';
import { fetchDocs } from '../lib/groq';
import { duplicateDocs, publishDocs, unpublishDocs, archiveDocs, deleteDocs } from '../lib/docActions';
import type { Row } from '../lib/types';

interface DocumentListPaneProps {
  /** Sanity pane props — options carries our schemaType/tableKey. */
  id?: string;
  options?: Record<string, unknown>;
  child?: unknown;
  childItemId?: string;
  isActive?: boolean;
  isSelected?: boolean;
  itemId?: string;
  paneKey?: string;
  urlParams?: Record<string, string | undefined> | undefined;
}

/**
 * Custom document-list pane: renders the DataTable for a schema type
 * instead of Sanity's native list. Row click opens the editor pane via
 * pane-router intent navigation.
 */
export function DocumentListPane(props: DocumentListPaneProps) {
  const { options } = props;
  const schemaType = typeof options?.schemaType === 'string' ? options.schemaType : undefined;
  const tableKey = typeof options?.tableKey === 'string' ? options.tableKey : undefined;
  const client = useClient({ apiVersion: '2024-01-01' });
  const paneRouter = usePaneRouter();
  const config = TABLE_MAP[tableKey ?? schemaType ?? ''];

  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [reloadKey, setReloadKey] = useState(0);

  const load = useCallback(async () => {
    if (!config) {
      setError(`No table config for schema "${schemaType}"`);
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const data = await fetchDocs(client, config.query);
      setRows(data);
    } catch (e: any) {
      setError(e?.message || 'Failed to load');
      setRows([]);
    } finally {
      setLoading(false);
    }
  }, [client, config, schemaType]);

  useEffect(() => {
    load();
  }, [load, reloadKey]);

  if (!config) {
    return (
      <Box padding={4}>
        <Text muted>Unknown schema type: {schemaType}</Text>
      </Box>
    );
  }

  const openRow = (row: Row) => paneRouter.navigateIntent('edit', { id: row._id, type: config.type });
  const newDoc = () => paneRouter.navigateIntent('new', { type: config.type });

  return (
    <Card tone="default" padding={[2, 3]} style={{ minHeight: '100%' }}>
      <Flex align="center" gap={2} paddingBottom={3}>
        <Box flex={1}>
          <Text size={2} weight="semibold">{config.title}</Text>
          <Text size={1} muted>{rows.length} documents</Text>
        </Box>
        <ButtonNew onClick={newDoc} />
      </Flex>

      <DataTable
        rows={rows}
        columns={config.columns}
        loading={loading}
        error={error}
        tableKey={config.key}
        onRowClick={openRow}
        getRowThumb={config.getThumb}
        getRowTitle={config.getTitle}
        getRowSubtitle={config.getSubtitle}
        onReload={() => setReloadKey((k) => k + 1)}
        bulkActions={[
          { id: 'duplicate', label: 'Duplicate', run: (ids) => duplicateDocs(client, ids) },
          { id: 'publish', label: 'Publish', run: (ids) => publishDocs(client, ids) },
          { id: 'unpublish', label: 'Unpublish', run: (ids) => unpublishDocs(client, ids) },
          { id: 'archive', label: 'Archive', run: (ids) => archiveDocs(client, ids) },
          { id: 'delete', label: 'Delete', danger: true, confirm: 'Delete selected documents?', run: (ids) => deleteDocs(client, ids) },
        ]}
        client={client}
      />
    </Card>
  );
}

function ButtonNew({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        padding: '6px 12px',
        borderRadius: 6,
        border: '1px solid var(--card-border-color, #e1e3e6)',
        background: 'var(--card-muted-bg-color, #f1f3f5)',
        cursor: 'pointer',
        fontSize: 13,
        fontWeight: 600,
      }}
    >
      <AddIcon />
      New
    </button>
  );
}
