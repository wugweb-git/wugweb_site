import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'service',
  title: 'Service',
  type: 'document',
  groups: [
    { name: 'overview', title: 'Overview', default: true },
    { name: 'capabilities', title: 'Capabilities' },
    { name: 'approach', title: 'Approach' },
    { name: 'content', title: 'Content' },
    { name: 'faq', title: 'FAQ' },
    { name: 'seo', title: 'SEO' },
    { name: 'relations', title: 'Relations' },
  ],
  fields: [
    // ── Overview ──
    defineField({ name: 'title', type: 'string', validation: (r) => r.required(), group: 'overview' }),
    defineField({ name: 'slug', type: 'slug', options: { source: 'title' }, validation: (r) => r.required(), group: 'overview' }),
    defineField({ name: 'subtitle', type: 'string', description: 'Short tagline shown in hero section', group: 'overview' }),
    defineField({ name: 'heroText', type: 'text', rows: 3, description: 'Main hero body text', group: 'overview' }),
    defineField({ name: 'summary', type: 'text', rows: 2, description: 'Card description for service listings', group: 'overview' }),
    defineField({ name: 'fullDescription', type: 'text', rows: 4, description: 'Detailed description for the service page', group: 'overview' }),
    defineField({ name: 'tags', type: 'array', of: [{ type: 'string' }], options: { layout: 'tags' }, group: 'overview' }),
    defineField({ name: 'icon', type: 'image', description: 'Service icon', group: 'overview' }),
    defineField({ name: 'coverImage', type: 'image', options: { hotspot: true }, group: 'overview' }),
    defineField({ name: 'coverPath', type: 'string', description: 'R2/local cover path e.g. /assets/services/…', group: 'overview' }),
    defineField({ name: 'galleryPaths', type: 'array', of: [{ type: 'string' }], description: 'Service gallery media under /assets/…', group: 'content' }),
    defineField({ name: 'order', type: 'number', hidden: true, group: 'overview' }),
    defineField({ name: 'language', type: 'string', options: { list: ['en-GB', 'en-US'] }, initialValue: 'en-GB', group: 'overview' }),

    // ── Capabilities ──
    defineField({
      name: 'capabilities', type: 'array', group: 'capabilities', description: 'Capability groups shown on the service page',
      of: [{ type: 'object', fields: [
        { name: 'n', type: 'string', title: 'Number (e.g. "01")' },
        { name: 'title', type: 'string' },
        { name: 'items', type: 'array', of: [{ type: 'string' }] },
      ]}],
    }),

    // ── Approach ──
    defineField({
      name: 'approach', type: 'array', group: 'approach',
      of: [{ type: 'object', fields: [
        { name: 'n', type: 'string', title: 'Number (e.g. "01")' },
        { name: 'title', type: 'string' },
        { name: 'body', type: 'text', rows: 3 },
      ]}],
    }),
    defineField({
      name: 'process', type: 'array', group: 'approach',
      of: [{ type: 'object', fields: [
        { name: 'phase', type: 'string' },
        { name: 'steps', type: 'array', of: [{ type: 'string' }] },
      ]}],
    }),

    // ── Content ──
    defineField({
      name: 'tools', type: 'array', group: 'content',
      of: [{ type: 'object', fields: [
        { name: 'category', type: 'string' },
        { name: 'items', type: 'array', of: [{ type: 'string' }] },
      ]}],
    }),
    defineField({
      name: 'why', title: 'Why Wugweb', type: 'array', group: 'content',
      of: [{ type: 'object', fields: [
        { name: 'title', type: 'string' },
        { name: 'body', type: 'text', rows: 3 },
      ]}],
    }),
    defineField({ name: 'body', type: 'blockContent', title: 'Additional Content', group: 'content' }),
    defineField({ name: 'caseStudies', title: 'Related Case Studies', type: 'array', of: [{ type: 'reference', to: [{ type: 'caseStudy' }] }], group: 'content' }),

    // ── FAQ ──
    defineField({
      name: 'faqs', type: 'array', group: 'faq',
      of: [{ type: 'object', fields: [
        { name: 'q', type: 'string', title: 'Question' },
        { name: 'a', type: 'text', rows: 4, title: 'Answer' },
      ]}],
    }),

    // ── SEO ──
    defineField({ name: 'seoTitle', type: 'string', group: 'seo' }),
    defineField({ name: 'seoDescription', type: 'text', rows: 2, group: 'seo' }),
    defineField({ name: 'ogImage', type: 'image', group: 'seo' }),

    // ── Relations ──
    defineField({ name: 'relatedPosts', type: 'array', of: [{ type: 'reference', to: [{ type: 'post' }] }], description: 'Blog posts about this service', group: 'relations' }),
    defineField({ name: 'relatedServices', type: 'array', of: [{ type: 'reference', to: [{ type: 'service' }] }], description: 'Other services to explore', group: 'relations' }),

    // ── Sync ──
    defineField({ name: 'neonSynced', type: 'boolean', readOnly: true, hidden: true, initialValue: false }),
    defineField({ name: 'neonSyncedAt', type: 'datetime', readOnly: true, hidden: true }),
  ],
  orderings: [
    { name: 'orderAsc', title: 'Display order', by: [{ field: 'order', direction: 'asc' }] },
    { name: 'titleAsc', title: 'Title A-Z', by: [{ field: 'title', direction: 'asc' }] },
  ],
  preview: {
    select: { title: 'title', subtitle: 'subtitle', media: 'icon', tags: 'tags', seoDesc: 'seoDescription' },
    prepare: ({ title, subtitle, media, tags, seoDesc }: any) => {
      const parts = [];
      if (subtitle) parts.push(String(subtitle).replace(/&/g, 'and').substring(0, 60));
      if (tags && tags.length) parts.push(tags.slice(0, 2).join(', '));
      let health = '✅';
      if (!seoDesc) health = '⚠️ SEO';
      return {
        title: title || 'Untitled',
        subtitle: parts.join(' · ') || health,
        media,
      };
    },
  },
});
