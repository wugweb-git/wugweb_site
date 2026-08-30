import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useClient } from 'sanity';
import {
  Card,
  Flex,
  Stack,
  Text,
  TextInput,
  Select,
  Grid,
  Box,
  Badge,
  Button,
  Spinner,
  useToast,
  Dialog,
  TextArea,
} from '@sanity/ui';
import {
  CopyIcon,
  SearchIcon,
  DocumentTextIcon,
  CheckmarkIcon,
  DownloadIcon,
  ComposeIcon,
} from '@sanity/icons';
import { StudioErrorBoundary } from '../components/StudioErrorBoundary';

interface ArticleItem {
  _id: string;
  _type: string;
  title?: string;
  slug?: string;
  category?: string;
  excerpt?: string;
  publishedAt?: string;
  authorName?: string;
  body?: any[];
  _updatedAt?: string;
}

function blocksToMarkdown(blocks: any[], title?: string): string {
  if (!Array.isArray(blocks)) return '';
  const lines: string[] = [];
  if (title) lines.push(`# ${title}\n`);

  for (const b of blocks) {
    if (!b) continue;
    if (b._type === 'block') {
      const markDefs = b.markDefs || [];
      let text = (b.children || [])
        .map((child: any) => {
          let t = child.text || '';
          if (!child.marks || child.marks.length === 0) return t;
          for (const m of child.marks) {
            if (m === 'strong') t = `**${t}**`;
            else if (m === 'em') t = `*${t}*`;
            else if (m === 'code') t = `\`${t}\``;
            else if (m === 'strike-through') t = `~~${t}~~`;
            else if (m === 'highlight') t = `<mark>${t}</mark>`;
            else {
              const def = markDefs.find((d: any) => d?._key === m);
              if (def && def._type === 'link') {
                t = `[${t}](${def.href || '#'})`;
              }
            }
          }
          return t;
        })
        .join('');

      if (!text.trim()) continue;

      if (b.listItem === 'bullet') lines.push(`- ${text}`);
      else if (b.listItem === 'number') lines.push(`1. ${text}`);
      else if (b.style === 'h1') lines.push(`# ${text}\n`);
      else if (b.style === 'h2') lines.push(`## ${text}\n`);
      else if (b.style === 'h3') lines.push(`### ${text}\n`);
      else if (b.style === 'blockquote') lines.push(`> ${text}\n`);
      else lines.push(`${text}\n`);
    } else if (b._type === 'code') {
      lines.push(`\`\`\`${b.language || ''}\n${b.code || ''}\n\`\`\`\n`);
    } else if (b._type === 'callout') {
      lines.push(`> [!${(b.type || 'NOTE').toUpperCase()}]\n> **${b.title || ''}**\n> ${b.text || ''}\n`);
    }
  }
  return lines.join('\n').replace(/\n{3,}/g, '\n\n').trim();
}

function countWords(blocks: any[]): number {
  if (!Array.isArray(blocks)) return 0;
  let words = 0;
  for (const b of blocks) {
    if (b._type === 'block' && Array.isArray(b.children)) {
      for (const c of b.children) {
        const text = String(c.text || '').trim();
        if (text) words += text.split(/\s+/).filter(Boolean).length;
      }
    }
  }
  return words;
}

function ArticleExportContent() {
  const client = useClient({ apiVersion: '2026-01-01' });
  const toast = useToast();
  const [articles, setArticles] = useState<ArticleItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [typeFilter, setTypeFilter] = useState('post');
  const [searchQuery, setSearchQuery] = useState('');
  const [previewArticle, setPreviewArticle] = useState<ArticleItem | null>(null);

  const loadArticles = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await client.fetch<ArticleItem[]>(
        `*[_type == $type && !(_id in path("drafts.**"))] | order(_updatedAt desc) [0...300] {
          _id, _type, title, "slug": slug.current, category, excerpt, publishedAt,
          "authorName": author->name, body, _updatedAt
        }`,
        { type: typeFilter }
      );
      setArticles(data || []);
    } catch (err: any) {
      setError(err?.message || 'Failed to load articles');
    } finally {
      setLoading(false);
    }
  }, [client, typeFilter]);

  useEffect(() => {
    loadArticles();
  }, [loadArticles]);

  const filteredArticles = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return articles;
    return articles.filter((a) =>
      [a.title, a.slug, a.category, a.authorName, a.excerpt]
        .some((f) => String(f || '').toLowerCase().includes(q))
    );
  }, [articles, searchQuery]);

  const handleCopyMarkdown = async (item: ArticleItem) => {
    const md = blocksToMarkdown(item.body || [], item.title);
    try {
      await navigator.clipboard.writeText(md);
      toast.push({
        status: 'success',
        title: `Copied "${item.title || 'Article'}" as Markdown!`,
      });
    } catch {
      toast.push({
        status: 'error',
        title: 'Failed to copy to clipboard.',
      });
    }
  };

  return (
    <Card padding={[2, 3, 4]} tone="default" style={{ minHeight: '100%' }}>
      <Stack space={4}>
        <Flex justify="space-between" align="center" wrap="wrap" gap={3}>
          <Stack space={1}>
            <Text size={3} weight="bold">Copy Article & Content Exporter</Text>
            <Text size={1} muted>
              One-click Markdown export, word count stats & portable text inspection
            </Text>
          </Stack>
          <Button text="Refresh" mode="ghost" onClick={loadArticles} />
        </Flex>

        {/* Filter Controls */}
        <Flex gap={2} wrap="wrap" align="center">
          <Select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.currentTarget.value)}
            style={{ minWidth: 150 }}
          >
            <option value="post">Blog Posts</option>
            <option value="caseStudy">Case Studies</option>
            <option value="service">Services</option>
            <option value="singletonPage">Pages</option>
          </Select>
          <Box flex={1}>
            <TextInput
              icon={SearchIcon}
              placeholder="Search by title, slug or category…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.currentTarget.value)}
            />
          </Box>
          <Text size={1} muted>
            Showing {filteredArticles.length} of {articles.length} items
          </Text>
        </Flex>

        {/* Articles Table */}
        {loading ? (
          <Card padding={5} style={{ textAlign: 'center' }}>
            <Spinner size={2} />
            <Text size={1} muted style={{ marginTop: 8 }}>Loading content…</Text>
          </Card>
        ) : error ? (
          <Card padding={4} tone="critical" radius={2}>
            <Text size={1}>{error}</Text>
          </Card>
        ) : filteredArticles.length === 0 ? (
          <Card padding={5} tone="transparent" border radius={2} style={{ textAlign: 'center' }}>
            <Text size={2} muted>No content items found</Text>
          </Card>
        ) : (
          <Card border radius={2} overflow="hidden">
            <div style={{ overflow: 'auto', maxHeight: 'calc(100vh - 240px)' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                <thead>
                  <tr style={{ background: 'var(--card-muted-bg-color, #191919)', position: 'sticky', top: 0, zIndex: 2 }}>
                    <th style={{ padding: '10px 12px', textAlign: 'left', borderBottom: '1px solid var(--card-border-color, #2b2b2b)' }}>Title & Slug</th>
                    <th style={{ padding: '10px 12px', textAlign: 'left', borderBottom: '1px solid var(--card-border-color, #2b2b2b)' }}>Category</th>
                    <th style={{ padding: '10px 12px', textAlign: 'center', borderBottom: '1px solid var(--card-border-color, #2b2b2b)' }}>Words</th>
                    <th style={{ padding: '10px 12px', textAlign: 'center', borderBottom: '1px solid var(--card-border-color, #2b2b2b)' }}>Read Time</th>
                    <th style={{ padding: '10px 12px', textAlign: 'right', borderBottom: '1px solid var(--card-border-color, #2b2b2b)', width: 200 }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredArticles.map((item) => {
                    const words = countWords(item.body || []);
                    const readTime = Math.max(1, Math.ceil(words / 200));
                    return (
                      <tr key={item._id} style={{ borderBottom: '1px solid var(--card-border-color, #222)' }}>
                        <td style={{ padding: '10px 12px' }}>
                          <Text size={1} weight="semibold">{item.title || item._id}</Text>
                          {item.slug && <Text size={0} muted>@{item.slug}</Text>}
                        </td>
                        <td style={{ padding: '10px 12px' }}>
                          {item.category ? (
                            <Badge tone="default" fontSize={0}>{item.category}</Badge>
                          ) : (
                            <Text size={0} muted>—</Text>
                          )}
                        </td>
                        <td style={{ padding: '10px 12px', textAlign: 'center' }}>
                          <Text size={1}>{words}</Text>
                        </td>
                        <td style={{ padding: '10px 12px', textAlign: 'center' }}>
                          <Badge tone={words > 0 ? 'positive' : 'caution'} fontSize={0}>
                            {words > 0 ? `${readTime}m` : '0m'}
                          </Badge>
                        </td>
                        <td style={{ padding: '10px 12px', textAlign: 'right' }}>
                          <Flex gap={1} justify="flex-end">
                            <Button
                              text="Preview"
                              mode="ghost"
                              fontSize={1}
                              padding={2}
                              onClick={() => setPreviewArticle(item)}
                            />
                            <Button
                              text="Copy MD"
                              icon={CopyIcon}
                              tone="primary"
                              mode="default"
                              fontSize={1}
                              padding={2}
                              onClick={() => handleCopyMarkdown(item)}
                            />
                          </Flex>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </Card>
        )}

        {/* Modal Dialog for Article Markdown Preview */}
        {previewArticle && (
          <Dialog
            id="article-preview-dialog"
            header={`Article Preview: ${previewArticle.title || previewArticle._id}`}
            onClose={() => setPreviewArticle(null)}
            width={3}
            zOffset={10000}
          >
            <Box padding={4}>
              <Stack space={3}>
                <TextArea
                  readOnly
                  rows={16}
                  value={blocksToMarkdown(previewArticle.body || [], previewArticle.title)}
                  style={{ fontFamily: 'monospace', fontSize: 12 }}
                />
                <Flex justify="space-between" align="center">
                  <Text size={1} muted>
                    {countWords(previewArticle.body || [])} words · ~{Math.ceil(countWords(previewArticle.body || []) / 200)} min read
                  </Text>
                  <Flex gap={2}>
                    <Button text="Close" mode="ghost" onClick={() => setPreviewArticle(null)} />
                    <Button
                      text="Copy Markdown"
                      tone="primary"
                      icon={CopyIcon}
                      onClick={() => {
                        handleCopyMarkdown(previewArticle);
                        setPreviewArticle(null);
                      }}
                    />
                  </Flex>
                </Flex>
              </Stack>
            </Box>
          </Dialog>
        )}
      </Stack>
    </Card>
  );
}

export function ArticleExportTool() {
  return (
    <StudioErrorBoundary toolTitle="Copy Article & Exporter">
      <ArticleExportContent />
    </StudioErrorBoundary>
  );
}

export default ArticleExportTool;
