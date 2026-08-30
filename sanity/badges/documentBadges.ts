import { DocumentBadgeDescription, DocumentBadgeProps } from 'sanity';

// ── 1. SEO Health Badge ──
export function SeoHealthBadge(props: DocumentBadgeProps): DocumentBadgeDescription | null {
  const { published, draft, type } = props;
  if (!['post', 'caseStudy', 'service', 'singletonPage'].includes(type)) {
    return null;
  }

  const doc = draft || published;
  if (!doc) return null;

  const hasTitle = Boolean(doc.seoTitle || doc.title);
  const desc = String(doc.seoDescription || '').trim();
  const hasDesc = desc.length >= 40;

  if (hasTitle && hasDesc) {
    return {
      label: 'SEO Ready',
      title: 'SEO title and description are well-configured',
      color: 'success',
    };
  }

  if (hasTitle && desc.length > 0) {
    return {
      label: 'Short SEO Desc',
      title: 'SEO description is under 40 characters — consider expanding for better search visibility',
      color: 'warning',
    };
  }

  return {
    label: 'Needs SEO',
    title: 'Missing SEO description',
    color: 'danger',
  };
}

// ── 2. Reading Time & Word Count Badge ──
export function ReadingTimeBadge(props: DocumentBadgeProps): DocumentBadgeDescription | null {
  const { published, draft, type } = props;
  if (type !== 'post') return null;

  const doc = draft || published;
  if (!doc || !Array.isArray(doc.body)) return null;

  // Calculate words from portable text blocks
  let wordCount = 0;
  doc.body.forEach((b: any) => {
    if (b._type === 'block' && Array.isArray(b.children)) {
      b.children.forEach((c: any) => {
        const text = String(c.text || '').trim();
        if (text) {
          wordCount += text.split(/\s+/).filter(Boolean).length;
        }
      });
    }
  });

  if (wordCount === 0) return null;

  const minutes = Math.max(1, Math.ceil(wordCount / 200));

  return {
    label: `${minutes} min read (${wordCount} words)`,
    title: `Estimated reading time based on 200 wpm standard: ${wordCount} words`,
    color: 'primary',
  };
}

// ── 3. R2 Media Asset Badge ──
export function MediaStatusBadge(props: DocumentBadgeProps): DocumentBadgeDescription | null {
  const { published, draft, type } = props;
  if (!['post', 'caseStudy', 'service'].includes(type)) return null;

  const doc = draft || published;
  if (!doc) return null;

  const hasR2Path = Boolean(doc.coverPath || doc.thumbnailPath || doc.heroPath);
  const hasCdnImage = Boolean(doc.coverImage);

  if (hasR2Path) {
    return {
      label: 'R2 Media',
      title: 'Cover media is mapped to Cloudflare R2 / local asset registry',
      color: 'success',
    };
  }

  if (hasCdnImage) {
    return {
      label: 'Sanity CDN Media',
      title: 'Cover image is uploaded directly to Sanity Asset CDN',
      color: 'primary',
    };
  }

  return {
    label: 'No Cover Media',
    title: 'No cover media or path is assigned to this document',
    color: 'warning',
  };
}
