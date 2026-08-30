import React, { useState, useCallback } from 'react';
import { DocumentActionDescription, DocumentActionProps, useClient } from 'sanity';
import {
  CopyIcon,
  DocumentTextIcon,
  CheckmarkIcon,
  CodeBlockIcon,
  ShareIcon,
  DocumentsIcon,
} from '@sanity/icons';
import {
  Dialog,
  Box,
  Stack,
  Text,
  TextArea,
  Flex,
  Button,
  Card,
  Badge,
  useToast,
} from '@sanity/ui';

function portableTextToMarkdown(blocks: any[]): string {
  if (!Array.isArray(blocks)) return '';
  const lines: string[] = [];

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

      if (b.listItem === 'bullet') {
        lines.push(`- ${text}`);
      } else if (b.listItem === 'number') {
        lines.push(`1. ${text}`);
      } else if (b.style === 'h1') {
        lines.push(`# ${text}\n`);
      } else if (b.style === 'h2') {
        lines.push(`## ${text}\n`);
      } else if (b.style === 'h3') {
        lines.push(`### ${text}\n`);
      } else if (b.style === 'h4') {
        lines.push(`#### ${text}\n`);
      } else if (b.style === 'blockquote') {
        lines.push(`> ${text}\n`);
      } else {
        lines.push(`${text}\n`);
      }
    } else if (b._type === 'code') {
      lines.push(`\`\`\`${b.language || ''}\n${b.code || ''}\n\`\`\`\n`);
    } else if (b._type === 'callout') {
      lines.push(`> [!${(b.type || 'NOTE').toUpperCase()}]\n> **${b.title || ''}**\n> ${b.text || ''}\n`);
    } else if (b._type === 'quoteBlock') {
      lines.push(`> "${b.quote || ''}"\n> — ${b.author || ''}${b.role ? ` (${b.role})` : ''}\n`);
    } else if (b._type === 'cta') {
      lines.push(`\n---\n### ${b.heading || 'Call to Action'}\n${b.body || ''}\n[${b.buttonText || 'Get in touch'}](${b.buttonUrl || '/contact-us'})\n---\n`);
    }
  }

  return lines.join('\n').replace(/\n{3,}/g, '\n\n').trim();
}

function portableTextToPlainText(blocks: any[]): string {
  if (!Array.isArray(blocks)) return '';
  return blocks
    .map((b) => {
      if (b._type === 'block' && Array.isArray(b.children)) {
        return b.children.map((c: any) => c.text || '').join('');
      }
      if (b._type === 'code') return b.code || '';
      return '';
    })
    .filter(Boolean)
    .join('\n\n');
}

export function CopyArticleAction(props: DocumentActionProps): DocumentActionDescription | null {
  const { published, draft, type } = props;
  const doc: any = draft || published;
  const [dialogOpen, setDialogOpen] = useState(false);
  const [format, setFormat] = useState<'markdown' | 'plain' | 'json'>('markdown');
  const [copied, setCopied] = useState(false);
  const toast = useToast();

  if (!['post', 'caseStudy', 'service', 'singletonPage'].includes(type)) {
    return null;
  }

  if (!doc) return null;

  const title = String(doc.title || doc.pageId || 'Untitled');
  const bodyBlocks = Array.isArray(doc.body) ? doc.body : [];
  const markdownBody = portableTextToMarkdown(bodyBlocks);
  const plainTextBody = portableTextToPlainText(bodyBlocks);

  const frontmatter = [
    '---',
    `title: "${title.replace(/"/g, '\\"')}"`,
    doc.slug?.current ? `slug: "${doc.slug.current}"` : null,
    doc.category ? `category: "${doc.category}"` : null,
    doc.publishedAt ? `date: "${doc.publishedAt}"` : null,
    doc.excerpt ? `excerpt: "${doc.excerpt.replace(/"/g, '\\"')}"` : null,
    doc.readingTime ? `readingTime: ${doc.readingTime}` : null,
    '---',
    '',
  ]
    .filter(Boolean)
    .join('\n');

  const fullMarkdown = `${frontmatter}\n# ${title}\n\n${markdownBody}`;

  const wordCount = plainTextBody.split(/\s+/).filter(Boolean).length;
  const readTime = Math.max(1, Math.ceil(wordCount / 200));

  const copyToClipboard = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      toast.push({
        status: 'success',
        title: `Copied ${label} to clipboard!`,
      });
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.push({
        status: 'error',
        title: 'Clipboard copy failed. Please select text manually.',
      });
    }
  };

  return {
    label: 'Copy Article',
    icon: CopyIcon,
    title: 'Copy article formatted as Markdown, Plain Text, or JSON',
    onHandle: () => {
      setDialogOpen(true);
    },
    dialog: dialogOpen
      ? {
          type: 'dialog',
          onClose: () => setDialogOpen(false),
          content: (
            <Box padding={4}>
              <Stack space={4}>
                <Flex justify="space-between" align="center">
                  <Stack space={1}>
                    <Text size={2} weight="bold">Copy / Export Article Content</Text>
                    <Text size={1} muted>
                      {wordCount} words · ~{readTime} min read · {bodyBlocks.length} content blocks
                    </Text>
                  </Stack>
                  <Flex gap={1}>
                    <Button
                      text="Markdown"
                      mode={format === 'markdown' ? 'default' : 'ghost'}
                      onClick={() => setFormat('markdown')}
                    />
                    <Button
                      text="Plain Text"
                      mode={format === 'plain' ? 'default' : 'ghost'}
                      onClick={() => setFormat('plain')}
                    />
                    <Button
                      text="JSON"
                      mode={format === 'json' ? 'default' : 'ghost'}
                      onClick={() => setFormat('json')}
                    />
                  </Flex>
                </Flex>

                <TextArea
                  readOnly
                  rows={14}
                  value={
                    format === 'markdown'
                      ? fullMarkdown
                      : format === 'plain'
                      ? `${title}\n\n${plainTextBody}`
                      : JSON.stringify(doc, null, 2)
                  }
                  style={{ fontFamily: 'monospace', fontSize: 12 }}
                />

                <Flex justify="space-between" align="center">
                  <Badge tone="positive" fontSize={0}>
                    READY TO COPY ({format.toUpperCase()})
                  </Badge>
                  <Flex gap={2}>
                    <Button
                      text="Close"
                      mode="ghost"
                      onClick={() => setDialogOpen(false)}
                    />
                    <Button
                      text={copied ? 'Copied! ✓' : `Copy ${format.toUpperCase()}`}
                      tone="primary"
                      mode="default"
                      icon={copied ? CheckmarkIcon : CopyIcon}
                      onClick={() => {
                        const targetText =
                          format === 'markdown'
                            ? fullMarkdown
                            : format === 'plain'
                            ? `${title}\n\n${plainTextBody}`
                            : JSON.stringify(doc, null, 2);
                        copyToClipboard(targetText, format.toUpperCase());
                      }}
                    />
                  </Flex>
                </Flex>
              </Stack>
            </Box>
          ),
        }
      : null,
  };
}
