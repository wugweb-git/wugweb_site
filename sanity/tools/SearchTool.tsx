import { useCallback, useEffect, useMemo, useState } from 'react';
import { Box, Card, Flex, Stack, Text, Badge, Button, TextInput } from '@sanity/ui';
import { SearchIcon, StarIcon, TrashIcon } from '@sanity/icons';
import { useClient } from 'sanity';
import { fetchDocs } from '../lib/groq';
import { loadLS, saveLS } from '../lib/localState';
import { EmptyState, RowSkeleton } from '../components/ui';
import type { Row } from '../lib/types';

import { StudioErrorBoundary } from '../components/StudioErrorBoundary';

interface SavedSearch {
  id: string;
  name: string;
  query: string;
}

const SAVED_KEY = 'wugweb.search.saved';
const RECENT_KEY = 'wugweb.search.recent';

/** Escape a value for safe interpolation inside a GROQ string literal. */
function escapeGroq(v: string): string {
  return v.replace(/\\/g, '\\\\').replace(/"/g, '\\"');
}

function SearchToolContent() {
  const client = useClient({ apiVersion: '2024-01-01' });
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Row[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searched, setSearched] = useState(false);
  const [recent, setRecent] = useState<string[]>(() => loadLS<string[]>(RECENT_KEY, []));

  const run = useCallback(async (raw: string) => {
    const q = raw.trim();
    if (!q) return;
    setLoading(true);
    setError(null);
    try {
      const parts = q.split(/\s+/);
      let type = '';
      let title = '';
      let slug = '';
      let category = '';
      let clientTerm = '';
      let status = '';
      let author = '';
      let updated = '';
      const plainParts: string[] = [];

      for (const p of parts) {
        if (p.includes(':')) {
          const [k, v] = p.split(':');
          const kl = k.toLowerCase();
          if (kl === 'type') type = v;
          else if (kl === 'title') title = v;
          else if (kl === 'slug') slug = v;
          else if (kl === 'cat' || kl === 'category') category = v;
          else if (kl === 'client') clientTerm = v;
          else if (kl === 'status') status = v;
          else if (kl === 'author') author = v;
          else if (kl === 'updated' || kl === 'recent') updated = v;
        } else {
          plainParts.push(p);
        }
      }

      const plain = plainParts.join(' ');
      const updatedNum = updated.replace(/[^0-9]/g, ''); // numeric only — used unquoted in arithmetic
      const typeFilter = type ? `&& _type == "${escapeGroq(type)}"` : '';
      const titleFilter = title ? `&& title match "${escapeGroq(title)}*"` : '';
      const slugFilter = slug ? `&& slug.current match "${escapeGroq(slug)}*"` : '';
      const categoryFilter = category ? `&& category match "${escapeGroq(category)}*"` : '';
      const clientFilter = clientTerm ? `&& client match "${escapeGroq(clientTerm)}*"` : '';
      const statusFilter = status ? `&& status == "${escapeGroq(status)}"` : '';
      const authorFilter = author ? `&& author->name match "${escapeGroq(author)}*"` : '';
      const updatedFilter = updatedNum ? `&& _updatedAt >= dateTime(now() - ${updatedNum}*86400000)` : '';
      const plainFilter = plain ? `&& (title match "${escapeGroq(plain)}*" || name match "${escapeGroq(plain)}*" || _type match "${escapeGroq(plain)}*")` : '';

      const groq = `*[_type in ["post","caseStudy","service","client","person","asset","engagement","testimonial","taxonomy","platformProfile","industry"] ${typeFilter}${titleFilter}${slugFilter}${categoryFilter}${clientFilter}${statusFilter}${authorFilter}${updatedFilter}${plainFilter}][0...200] {
        _id, _type, _updatedAt, title, name, "slug": slug.current, category, status, client, author->name, publishedAt
      }`;

      const data = await fetchDocs(client, groq);
      setResults((data as Row[]) || []);
      setSearched(true);
      const nextRecent = [q, ...recent.filter((x) => x !== q)].slice(0, 8);
      setRecent(nextRecent);
      saveLS(RECENT_KEY, nextRecent);
    } catch (e: any) {
      setError(e?.message || 'Search failed');
      setResults([]);
    } finally {
      setLoading(false);
    }
  }, [client, recent]);

  return (
    <Card tone="default" padding={[2, 3]} style={{ minHeight: '100%' }}>
      <style>{`
        .wugweb-dt-focusable:focus-visible {
          outline: 2px solid var(--card-focus-ring-color, #4c9aff);
          outline-offset: -2px;
        }
      `}</style>
      <Stack space={4}>
        <Box>
          <Text size={3} weight="semibold">Advanced Multi-Field Search</Text>
          <Text size={1} muted>Search across all schemas using prefix filters: <code>type:post</code> <code>category:Strategy</code> <code>author:Vedanshu</code></Text>
        </Box>

        <Flex gap={2}>
          <TextInput
            aria-label="Search all content"
            icon={SearchIcon}
            placeholder="Search… (e.g. type:post strategy)"
            value={query}
            onChange={(e) => setQuery(e.currentTarget.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') run(query); }}
            style={{ flex: 1 }}
          />
          <Button text="Search" mode="default" onClick={() => run(query)} />
        </Flex>

        {recent.length > 0 && (
          <Flex gap={1} align="center" wrap="wrap">
            <Text size={0} muted style={{ marginRight: 4 }}>Recent:</Text>
            {recent.map((r) => (
              <Button key={r} text={r} mode="ghost" fontSize={0} padding={2} onClick={() => { setQuery(r); run(r); }} />
            ))}
          </Flex>
        )}

        {loading ? (
          <RowSkeleton cols={5} />
        ) : error ? (
          <Box padding={4}><Text style={{ color: '#e54f30' }}>{error}</Text></Box>
        ) : searched ? (
          results.length === 0 ? (
            <EmptyState title="No matching documents" body="Try broadening search terms." />
          ) : (
            <Card border radius={2} overflow="hidden">
              <div style={{ overflow: 'auto', maxHeight: 'calc(100vh - 280px)' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13, fontFamily: 'Inter, system-ui, sans-serif' }}>
                  <thead>
                    <tr style={{ background: 'var(--card-muted-bg-color, #f1f3f5)', position: 'sticky', top: 0 }}>
                      {['Title', 'Type', 'Slug', 'Category', 'Status', 'Updated'].map((h) => (
                        <th key={h} style={{ padding: '8px 12px', textAlign: 'left', borderBottom: '1px solid var(--card-border-color, #e1e3e6)', fontWeight: 600, whiteSpace: 'nowrap' }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {results.map((r) => {
                      const openRow = () => { window.location.hash = `#/structure/intent/edit/id=${r._id};type=${r._type}`; };
                      const rowTitle = String(r.title || r.name || r._id);
                      return (
                      <tr key={r._id} className="wugweb-dt-focusable" role="button" tabIndex={0} aria-label={`Open ${rowTitle}`}
                        style={{ borderBottom: '1px solid var(--card-border-color, #eee)', cursor: 'pointer' }}
                        onClick={openRow}
                        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openRow(); } }}>
                        <td style={{ padding: '8px 12px' }}><Text size={1} weight="semibold">{rowTitle}</Text></td>
                        <td style={{ padding: '8px 12px' }}><Badge tone="primary" mode="outline" fontSize={1}>{r._type}</Badge></td>
                        <td style={{ padding: '8px 12px' }}><Text size={1} muted>@{String(r.slug ?? '')}</Text></td>
                        <td style={{ padding: '8px 12px' }}><Text size={1} muted>{String(r.category ?? '—')}</Text></td>
                        <td style={{ padding: '8px 12px' }}><Text size={1} muted>{String(r.status ?? '—')}</Text></td>
                        <td style={{ padding: '8px 12px' }}><Text size={1} muted>{String(r._updatedAt ?? '—').slice(0, 10)}</Text></td>
                      </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </Card>
          )
        ) : (
          <EmptyState title="Run a search" body="Combine field prefixes with plain terms. Click a result to open it." />
        )}
      </Stack>
    </Card>
  );
}

export function SearchTool() {
  return (
    <StudioErrorBoundary toolTitle="Advanced Search">
      <SearchToolContent />
    </StudioErrorBoundary>
  );
}

export default SearchTool;
