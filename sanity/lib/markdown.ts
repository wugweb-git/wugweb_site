/**
 * Portable text → Markdown, word count and read time. Extracted unchanged from
 * the Copy & Export tool (tools/ArticleExportTool.tsx, deleted 2026-10-13) for
 * the Tables row menu and bulk bar. Pure: no React, no Sanity client.
 */

export function blocksToMarkdown(blocks: any[], title?: string): string {
  if (!Array.isArray(blocks)) return title ? `# ${title}` : '';
  const lines: string[] = [];
  if (title) lines.push(`# ${title}\n`);

  for (const b of blocks) {
    if (!b) continue;
    if (b._type === 'block') {
      const markDefs = b.markDefs || [];
      const text = (b.children || [])
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
              if (def && def._type === 'link') t = `[${t}](${def.href || '#'})`;
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

export function countWords(blocks: any[]): number {
  if (!Array.isArray(blocks)) return 0;
  let words = 0;
  for (const b of blocks) {
    if (b?._type === 'block' && Array.isArray(b.children)) {
      for (const c of b.children) {
        const text = String(c?.text || '').trim();
        if (text) words += text.split(/\s+/).filter(Boolean).length;
      }
    }
  }
  return words;
}

/** Minutes at 200 words/minute, minimum 1 — the export tool's formula. 0 for an empty body. */
export const readTimeMinutes = (words: number): number => (words > 0 ? Math.max(1, Math.ceil(words / 200)) : 0);

/** Where the main portable text lives per type. Case studies keep theirs in bodyContent. */
export const BODY_FIELD: Record<string, string> = {
  post: 'body',
  service: 'body',
  singletonPage: 'body',
  caseStudy: 'bodyContent',
};

/** A document's title + body as Markdown. */
export function docToMarkdown(row: Record<string, unknown>): string {
  const field = BODY_FIELD[String(row._type)] ?? 'body';
  const title = String(row.title || row.pageId || row.name || row._id || '');
  return blocksToMarkdown((row[field] as any[]) || [], title);
}

/** A safe file name for a downloaded .md file. */
export function markdownFileName(row: Record<string, unknown>): string {
  const base = String(row.slug || row.pageId || row.title || row._id || 'document')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80);
  return `${base || 'document'}.md`;
}
