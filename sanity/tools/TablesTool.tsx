import { useCallback, useEffect, useState } from 'react';
import { Box, Card, Flex, Select, Text } from '@sanity/ui';
import { useClient } from 'sanity';
import { DataTable } from '../components/DataTable';
import { TABLE_CONFIGS, TABLE_MAP } from '../lib/tableConfigs';
import { fetchDocs } from '../lib/groq';
import { duplicateDocs, publishDocs, unpublishDocs, archiveDocs, deleteDocs } from '../lib/docActions';
import type { Row } from '../lib/types';
import { seoTableProps } from '../lib/seoTable';

const TABLE_KEYS = TABLE_CONFIGS.map((t) => t.key);

/**
 * Tables tool — all document types as spreadsheet views.
 * Rebuilt on the reusable DataTable. One-shot GROQ fetch + manual Refresh
 * (free-tier safe, no live subscriptions).
 */
export function TablesTool() {
  const client = useClient({ apiVersion: '2026-01-01' });
  const [active, setActive] = useState<string>('post');
  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [reloadKey, setReloadKey] = useState(0);

  const config = TABLE_MAP[active];
  const seo = seoTableProps(config, client);

  const load = useCallback(async () => {
    if (!config) return;
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
  }, [client, config]);

  useEffect(() => {
    load();
  }, [load, reloadKey]);

  return (
    <Card tone="default" padding={[2, 3]}>
      <Flex align="center" gap={3} wrap="wrap" paddingBottom={3}>
        <Box>
          <Text size={3} weight="semibold">Tables</Text>
          <Text size={1} muted>All document types as data grids. One-shot load (free-tier safe).</Text>
        </Box>
        <Box flex={1} />
        <Select aria-label="Choose document type" value={active} onChange={(e) => setActive(e.currentTarget.value)} style={{ minWidth: 220 }}>
          {TABLE_CONFIGS.map((t) => (
            <option key={t.key} value={t.key}>{t.title}</option>
          ))}
        </Select>
      </Flex>

      <DataTable
        rows={rows}
        columns={config?.columns ?? []}
        loading={loading}
        error={error}
        tableKey={config?.key ?? active}
        getRowThumb={config?.getThumb}
        getRowTitle={config?.getTitle}
        getRowSubtitle={config?.getSubtitle}
        onReload={() => setReloadKey((k) => k + 1)}
        toolbarTitle={`${config?.title ?? active}`}
        seoType={seo.seoType}
        getMarkdown={seo.getMarkdown}
        bulkActions={[
          ...seo.bulkActions,
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

export default TablesTool;
