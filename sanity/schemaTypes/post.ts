import { defineType, defineField } from 'sanity';
import { ownerField } from './ownerField';

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
    // ── Content ──
    defineField({ name: 'title', type: 'string', validation: (r) => r.required(), group: 'content' }),
    defineField({ name: 'slug', type: 'slug', options: { source: 'title' }, validation: (r) => r.required(), group: 'content' }),
    defineField({ name: 'coverImage', type: 'image', options: { hotspot: true }, description: 'Featured image (Sanity CDN — prefer coverPath for R2)', group: 'content' }),
    defineField({ name: 'coverPath', type: 'string', description: 'R2/local path e.g. /assets/… when cover is not in Sanity CDN', group: 'content' }),
    defineField({ name: 'excerpt', type: 'text', rows: 2, description: 'Short summary shown in blog listings. Keep under 160 characters for SEO.', group: 'content' }),
    defineField({ name: 'author', type: 'reference', to: [{ type: 'person' }], group: 'content' }),
    { ...ownerField, group: 'meta' },
    defineField({ name: 'body', type: 'blockContent', title: 'Content', description: 'Main blog post body. Use headings (H2/H3) to structure sections.', group: 'content' }),

    // ── Meta ──
    defineField({ name: 'category', type: 'string', options: {
      list: [
        'SEO', 'Performance Marketing', 'Content', 'Brand & Strategy',
        'Digital Transformation', 'Experience Design', 'Web & App Development',
        'AI & Automation', 'Data & Analytics', 'MarTech',
        'Infrastructure & DevOps', 'Consulting', 'Operations',
        'Development / Server', 'Misc',
      ],
    }, group: 'meta' }),
    defineField({ name: 'tags', type: 'array', of: [{ type: 'string' }], options: { layout: 'tags' }, description: 'Add tags from the master list or type new ones', group: 'meta' }),
    defineField({ name: 'readingTime', type: 'number', description: 'Minutes to read — auto-calculated if left empty', group: 'meta' }),
    defineField({ name: 'publishedAt', type: 'datetime', group: 'meta' }),
    defineField({ name: 'featured', type: 'boolean', initialValue: false, description: 'Featured posts appear first in listings', group: 'meta' }),
    defineField({ name: 'language', type: 'string', options: { list: ['en-GB', 'en-US', 'fr', 'de', 'es'] }, initialValue: 'en-GB', group: 'meta' }),

    // ── SEO ──
    defineField({ name: 'seoTitle', type: 'string', description: 'Overrides the <title> tag. Defaults to the post title.', group: 'seo' }),
    defineField({ name: 'seoDescription', type: 'text', rows: 2, description: 'Meta description for search results. 150-160 characters recommended.', group: 'seo' }),
    defineField({ name: 'ogImage', type: 'image', description: 'Social sharing image (1200×630px recommended)', group: 'seo' }),

    // ── Relations ──
    defineField({ name: 'relatedPosts', type: 'array', of: [{ type: 'reference', to: [{ type: 'post' }] }], description: 'Other posts readers should see', group: 'relations' }),

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
      let health = '✅';
      if (!seoDesc && !ogImage) health = '⚠️ SEO';
      else if (!ogImage) health = '⚠️ OG';
      return {
        title: title || 'Untitled' + badge,
        subtitle: parts.join(' · ') || health,
        media,
      };
    },
  },
});
