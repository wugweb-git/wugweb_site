import { defineType, defineField } from 'sanity';
import { ownerField } from './ownerField';
import { R2AssetInput } from '../components/R2AssetInput';

const uniqueSlugValidation = (rule: any) =>
  rule.required().custom(async (slug: { current?: string } | undefined, context: any) => {
    if (!slug?.current) return true;
    const client = context.getClient({ apiVersion: '2026-01-01' });
    const id = String(context.document?._id || '').replace(/^drafts\./, '');
    const duplicateCount = await client.fetch(
      'count(*[_type == "post" && slug.current == $slug && _id != $id && _id != $draftId])',
      { slug: slug.current, id, draftId: `drafts.${id}` },
    );
    return duplicateCount === 0 || 'This post slug is already used by another post.';
  });

export default defineType({
  name: 'post',
  title: 'Blog Post',
  type: 'document',
  groups: [
    { name: 'content', title: 'Content', default: true },
    { name: 'meta', title: 'Meta' },
    { name: 'seo', title: 'SEO' },
    { name: 'relations', title: 'Relations' },
  ],
  fields: [
    defineField({ name: 'title', type: 'string', validation: (r) => r.required(), group: 'content' }),
    defineField({
      name: 'slug', type: 'slug', options: { source: 'title' }, group: 'content',
      validation: (r) => r.required().custom(async (value: any, ctx: any) => {
        if (!value?.current) return true;
        const client = ctx.getClient({ apiVersion: '2026-01-01' });
        const id = ctx.document?._id?.replace('drafts.', '') ?? '';
        const count = await client.fetch(
          `count(*[_type == $type && slug.current == $slug && _id != $id && !(_id in path("drafts.**"))])`,
          { type: ctx.document?._type, slug: value.current, id },
        );
        return count === 0 || `Slug "${value.current}" is already used by another published post`;
      }),
    }),
    defineField({ name: 'coverImage', type: 'image', options: { hotspot: true }, description: 'Featured image (Sanity CDN — prefer coverPath for R2)', group: 'content',
      validation: (r) => r.warning('Recommended — shown as hero and in post listings'),
    }),
    defineField({
      name: 'coverPath',
      type: 'string',
      description: 'R2/local path e.g. /assets/… when cover is not in Sanity CDN',
      components: { input: R2AssetInput },
      group: 'content',
    }),
    defineField({ name: 'excerpt', type: 'text', rows: 2, description: 'Short summary shown in blog listings. Keep under 160 characters for SEO.', group: 'content',
      validation: (r) => r.warning('Recommended — shown in blog listing cards and social previews'),
    }),
    defineField({ name: 'author', type: 'reference', to: [{ type: 'person' }], group: 'content',
      validation: (r) => r.warning('Recommended — author byline shown on post page'),
    }),
    { ...ownerField, group: 'meta' },
    defineField({ name: 'body', type: 'blockContent', title: 'Content', description: 'Main blog post body. Use headings (H2/H3) to structure sections.', group: 'content' }),
    defineField({ name: 'category', type: 'string', options: { list: [
      'SEO', 'Performance Marketing', 'Content', 'Brand & Strategy', 'Digital Transformation', 'Experience Design', 'Web & App Development',
      'AI & Automation', 'Data & Analytics', 'MarTech', 'Infrastructure & DevOps', 'Consulting', 'Operations', 'Development / Server', 'Misc',
    ] }, group: 'meta' }),
    defineField({ name: 'tags', type: 'array', of: [{ type: 'string' }], options: { layout: 'tags' }, description: 'Add tags from the master list or type new ones', group: 'meta' }),
    defineField({ name: 'readingTime', type: 'number', description: 'Minutes to read — auto-calculated if left empty', group: 'meta' }),
    defineField({ name: 'publishedAt', type: 'datetime', group: 'meta' }),
    defineField({ name: 'featured', type: 'boolean', initialValue: false, description: 'Featured posts appear first in listings', group: 'meta' }),
    defineField({ name: 'language', type: 'string', options: { list: ['en-GB', 'en-US', 'fr', 'de', 'es'] }, initialValue: 'en-GB', group: 'meta' }),
    defineField({ name: 'seoTitle', type: 'string', description: 'Overrides the <title> tag. Defaults to the post title.', group: 'seo' }),
    defineField({ name: 'seoDescription', type: 'text', rows: 2, description: 'Meta description for search results. 150-160 characters recommended.', group: 'seo' }),
    defineField({ name: 'ogImage', type: 'image', description: 'Social sharing image (1200×630px recommended)', group: 'seo' }),
    // ── SEO, added 2026-09-24 ──
    // Only the fields a template reads today. focusKeyword, searchIntent,
    // aiSummary, keyTakeaways, faqs and schemaType are designed in
    // docs/schema-template-section-component-level.md §1 but are deliberately
    // NOT added yet — they need a JSON-LD renderer and a visible answer block,
    // and singletonPage already proved what happens when fields ship ahead of
    // their consumer: fourteen of them rendered nothing for a day.
    defineField({
      name: 'ogImagePath', type: 'string', group: 'seo',
      title: 'OG Image (R2 path)',
      description: 'Matches the path convention used by coverPath/thumbnailPath. Takes precedence over ogImage.',
    }),
    defineField({ name: 'ogTitle', type: 'string', group: 'seo', description: 'Optional. Social copy is a different job from SERP copy — empty reuses seoTitle.' }),
    defineField({ name: 'ogDescription', type: 'text', rows: 2, group: 'seo', description: 'Optional. Empty reuses seoDescription.' }),
    defineField({
      name: 'noIndex', type: 'boolean', initialValue: false, group: 'seo',
      title: 'Hide from search engines',
      description: 'Emits <meta name="robots" content="noindex, follow"> and suppresses the canonical tag. Must also exclude the page from sitemap.xml when that lands.',
    }),
    defineField({
      name: 'canonicalUrl', type: 'string', group: 'seo',
      title: 'Canonical URL',
      description: 'Leave empty for self-canonical. Set when this post duplicates or syndicates another URL (e.g. a Medium cross-post that should not compete with the original).',
      validation: (r) => r.custom((value: any) =>
        !value || String(value).startsWith('/') || 'Must be a site-relative path starting with /'),
    }),

    // ── Relations ──
    defineField({ name: 'relatedPosts', type: 'array', of: [{ type: 'reference', to: [{ type: 'post' }] }], description: 'Other posts readers should see', group: 'relations' }),
    defineField({ name: 'syndicatedTo', type: 'array', of: [{ type: 'string' }], options: { list: ['Medium', 'LinkedIn', 'Dev.to', 'Hashnode'] }, description: 'Platforms this post was cross-posted to (mirrors Notion \'Published At\')', group: 'relations' }),

    // ── Sync ──
    defineField({ name: 'neonSynced', type: 'boolean', readOnly: true, hidden: true, initialValue: false }),
    defineField({ name: 'neonSyncedAt', type: 'datetime', readOnly: true, hidden: true }),
  ],
  orderings: [
    { name: 'publishedAtDesc', title: 'Publish date', by: [{ field: 'publishedAt', direction: 'desc' }] },
    { name: 'titleAsc', title: 'Title A-Z', by: [{ field: 'title', direction: 'asc' }] },
    { name: 'createdAtDesc', title: 'Recently created', by: [{ field: '_createdAt', direction: 'desc' }] },
  ],
  preview: {
    select: { title: 'title', subtitle: 'category', media: 'coverImage', date: 'publishedAt', featured: 'featured', author: 'author.name', readingTime: 'readingTime', seoDesc: 'seoDescription', ogImage: 'ogImage' },
    prepare: ({ title, subtitle, media, date, featured, author, readingTime, seoDesc, ogImage }: any) => {
      const badge = featured ? ' ⭐' : '';
      const dateStr = date ? new Date(date).toLocaleDateString() : '';
      const parts = [];
      if (subtitle) parts.push(String(subtitle).replace(/&/g, 'and'));
      if (author) parts.push(author);
      if (readingTime) parts.push(`${readingTime} min`);
      if (dateStr) parts.push(dateStr);
      let health = 'OK';
      if (!seoDesc && !ogImage) health = 'SEO metadata missing';
      else if (!ogImage) health = 'OG image missing';
      return { title: (title || 'Untitled') + badge, subtitle: parts.join(' · ') || health, media };
    },
  },
});
