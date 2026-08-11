import { useCallback, useEffect, useMemo, useState } from 'react';
import { Box, Card, Flex, Stack, Text, Badge, Button, TextInput } from '@sanity/ui';
import { SearchIcon, StarIcon, TrashIcon } from '@sanity/icons';
import { useClient } from 'sanity';
import { fetchDocs } from '../lib/groq';
import { loadLS, saveLS } from '../lib/localState';
import { EmptyState, RowSkeleton } from '../components/ui';
import type { Row } from '../lib/types';

interface SavedSearch {
  id: string;
  name: string;
  query: string;
}

const SAVED_KEY = 'wugweb.search.saved';
const RECENT_KEY = 'wugweb.search.recent';

export function SearchTool() {
  const client = useClient({ apiVersion: '2024-01-01' });
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Row[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searched, setSearched] = useState(false);
  const [saved, setSaved] = useState<SavedSearch[]>(() => loadLS<SavedSearch[]>(SAVED_KEY, []));
  const [recent, setRecent] = useState<string[]>(() => loadLS<string[]>(RECENT_KEY, []));

  const run = useCallback(async (raw: string) => {
    const q = raw.trim();
    if (!q) return;
    setLoading(true);
    setError(null);
    try {
      const parts = q.split(/\s+/);
      const type = parts.find((p) => p.startsWith('type:'))?.split(':')[1];
      const title = parts.find((p) => p.startsWith('title:'))?.split(':').slice(1).join(':');
      const slug = parts.find((p) => p.startsWith('slug:'))?.split(':').slice(1).join(':');
      const category = parts.find((p) => p.startsWith('category:'))?.split(':').slice(1).join(':');
      const clientTerm = parts.find((p) => p.startsWith('client:'))?.split(':').slice(1).join(':');
      const status = parts.find((p) => p.startsWith('status:'))?.split(':').slice(1).join(':');
      const author = parts.find((p) => p.startsWith('author:'))?.split(':').slice(1).join(':');
      const updated = parts.find((p) => p.startsWith('updated:'))?.split(':').slice(1).join(':');
      const plain = parts.filter((p) => !p.includes(':')).join(' ');

      const typeFilter = type ? `&& _type == "${type}"` : '';
      const titleFilter = title ? `&& title match "${title}*"` : '';
      const slugFilter = slug ? `&& slug.current match "${slug}*"` : '';
      const categoryFilter = category ? `&& category match "${category}*"` : '';
      const clientFilter = clientTerm ? `&& client match "${clientTerm}*"` : '';
      const statusFilter = status ? `&& status == "${status}"` : '';
      const authorFilter = author ? `&& author->name match "${author}*"` : '';
      const updatedFilter = updated ? `&& _updatedAt >= dateTime(now() - ${updated}*86400000)` : '';
      const plainFilter = plain ? `&& (title match "${plain}*" || name match "${plain}*" || _type match "${plain}*")` : '';

      const groq = `*[_type in ["post","caseStudy","service","client","person","asset","engagement","testimonial","taxonomy","platformProfile","industry"] ${typeFilter}${titleFilter}${slugFilter}${categoryFilter}${clientFilter}${statusFilter}${authorFilter}${updatedFilter}${plainFilter}][0...200] {
        _id, _type, _updatedAt, title, name, "slug": slug.current, category, status, client, author->name, publishedAt
      }`;

      const data = await fetchDocs(client, groq);
      setResults(data);
      setSearched(true);
      setRecent((r) => [raw, ...r.filter((x) => x !== raw)].slice(0, 8));
      saveLS(RECENT_KEY, [raw, ...recent.filter((x) => x !== raw)].slice(0, 8));
    } catch (e: any) {
      setError(e?.message || 'Search failed');
      setResults([]);
      setSearched(true);
    } finally {
      setLoading(false);
    }
  }, [client, recent]);

  const saveCurrent = () => {
    const name = prompt('Name this search:') || query;
    const next = [...saved, { id: `${Date.now()}`, name, query }];
    setSaved(next);
    saveLS(SAVED_KEY, next);
  };

  const removeSaved = (id: string) => {
    const next = saved.filter((s) => s.id !== id);
    setSaved(next);
    saveLS(SAVED_KEY, next);
  };

  const fieldHelp = useMemo(() => (
    ['title:', 'slug:', 'category:', 'client:', 'status:', 'author:', 'updated:', 'type:'].map((f) => f.slice(0, -1))
  ), []);

  return (
    <Card tone="default" padding={[2, 3]} style={{ minHeight: '100%' }}>
      <Stack space={3}>
        <Box>
          <Text size={3} weight="semibold">Advanced Search</Text>
          <Text size={1} muted>Field-scoped query builder — e.g. <code>title:ux category:seo author:vedanshu</code></Text>
        </Box>

        <Flex gap={2} align="center" wrap="wrap">
          <TextInput
            icon={SearchIcon}
            placeholder="title:… slug:… category:… client:… status:… author:… updated:7 type:post"
            value={query}
            onChange={(e) => setQuery(e.currentTarget.value)}
            onKeyDown={(e) => e.key === 'Enter' && run(query)}
            style={{ flex: 1, minWidth: 320 }}
          />
          <Button text="Search" mode="default" onClick={() => run(query)} />
          <Button text="Save" mode="ghost" icon={StarIcon} disabled={!query.trim()} onClick={saveCurrent} />
        </Flex>

        <Flex gap={1} wrap="wrap">
          {fieldHelp.map((f) => (
            <Badge key={f} tone="default" fontSize={1} mode="outline">{f}:</Badge>
          ))}
        </Flex>

        {saved.length > 0 && (
          <Flex gap={1} wrap="wrap" align="center">
            <Text size={1} muted>Saved:</Text>
            {saved.map((s) => (
              <Flex key={s.id} gap={1} align="center">
                <Button text={s.name} mode="ghost" onClick={() => { setQuery(s.query); run(s.query); }} />
                <Button mode="ghost" icon={TrashIcon} aria-label="Delete saved search" onClick={() => removeSaved(s.id)} />
              </Flex>
            ))}
          </Flex>
        )}

        {recent.length > 0 && (
          <Flex gap={1} wrap="wrap" align="center">
            <Text size={1} muted>Recent:</Text>
            {recent.map((r) => (
              <Button key={r} text={r} mode="ghost" fontSize={1} onClick={() => { setQuery(r); run(r); }} />
            ))}
          </Flex>
        )}

        {loading ? (
          <RowSkeleton cols={4} />
        ) : error ? (
          <Box padding={4}><Text style={{ color: '#e54f30' }}>{error}</Text></Box>
        ) : searched ? (
          results.length === 0 ? (
            <EmptyState title="No results" body="Try broadening your search or removing field scopes." />
          ) : (
            <Card border radius={2} overflow="hidden">
              <Box padding={2}><Text size={1} muted>{results.length} results</Text></Box>
              <div style={{ overflow: 'auto', maxHeight: 'calc(100vh - 320px)' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13, fontFamily: 'Inter, system-ui, sans-serif' }}>
                  <thead>
                    <tr style={{ background: 'var(--card-muted-bg-color, #f1f3f5)', position: 'sticky', top: 0 }}>
                      {['Title', 'Type', 'Slug', 'Category', 'Status', 'Updated'].map((h) => (
                        <th key={h} style={{ padding: '8px 12px', textAlign: 'left', borderBottom: '1px solid var(--card-border-color, #e1e3e6)', fontWeight: 600, whiteSpace: 'nowrap' }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {results.map((r) => (
                      <tr key={r._id} style={{ borderBottom: '1px solid var(--card-border-color, #eee)', cursor: 'pointer' }}
                        onClick={() => { window.location.hash = `#/structure/intent/edit/id=${r._id};type=${r._type}`; }}>
                        <td style={{ padding: '8px 12px' }}><Text size={1} weight="semibold">{String(r.title || r.name || r._id)}</Text></td>
                        <td style={{ padding: '8px 12px' }}><Badge tone="primary" mode="outline" fontSize={1}>{r._type}</Badge></td>
                        <td style={{ padding: '8px 12px' }}><Text size={1} muted>@{String(r.slug ?? '')}</Text></td>
                        <td style={{ padding: '8px 12px' }}><Text size={1} muted>{String(r.category ?? '—')}</Text></td>
                        <td style={{ padding: '8px 12px' }}><Text size={1} muted>{String(r.status ?? '—')}</Text></td>
                        <td style={{ padding: '8px 12px' }}><Text size={1} muted>{String(r._updatedAt ?? '—').slice(0, 10)}</Text></td>
                      </tr>
                    ))}
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

export default SearchTool;
