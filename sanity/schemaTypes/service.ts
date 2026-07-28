import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'service',
  title: 'Service',
  type: 'document',
  groups: [
    { name: 'overview', title: 'Overview' },
    { name: 'content', title: 'Content' },
    { name: 'capabilities', title: 'Capabilities' },
    { name: 'approach', title: 'Approach' },
    { name: 'faq', title: 'FAQ' },
    { name: 'seo', title: 'SEO' },
  ],
  fields: [
    // ── Overview ──
    defineField({ name: 'title', type: 'string', validation: (r) => r.required(), group: 'overview' }),
    defineField({ name: 'slug', type: 'slug', options: { source: 'title' }, validation: (r) => r.required(), group: 'overview' }),
    defineField({ name: 'language', type: 'string', options: { list: ['en-GB', 'en-US', 'fr', 'de', 'es'] }, initialValue: 'en-GB', group: 'overview' }),
    defineField({ name: 'subtitle', type: 'string', description: 'Short tagline shown in hero', group: 'overview' }),
    defineField({ name: 'tags', type: 'array', of: [{ type: 'string' }], options: { layout: 'tags' }, group: 'overview' }),
    defineField({ name: 'summary', type: 'text', rows: 2, description: 'Card description', group: 'overview' }),
    defineField({ name: 'heroText', type: 'text', rows: 3, description: 'Hero section body text', group: 'overview' }),
    defineField({ name: 'fullDescription', title: 'Full Description', type: 'text', rows: 3, group: 'overview' }),
    defineField({ name: 'icon', type: 'image', description: 'Service icon or symbol', group: 'overview' }),
    defineField({ name: 'coverImage', type: 'image', options: { hotspot: true }, group: 'overview' }),
    defineField({ name: 'order', type: 'number', group: 'overview' }),

    // ── Capabilities ──
    defineField({
      name: 'capabilities', type: 'array', group: 'capabilities',
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

    // ── Process (optional phase-based) ──
    defineField({
      name: 'process', type: 'array', group: 'approach',
      of: [{ type: 'object', fields: [
        { name: 'phase', type: 'string' },
        { name: 'steps', type: 'array', of: [{ type: 'string' }] },
      ]}],
    }),

    // ── Tools ──
    defineField({
      name: 'tools', type: 'array', group: 'approach',
      of: [{ type: 'object', fields: [
        { name: 'category', type: 'string' },
        { name: 'items', type: 'array', of: [{ type: 'string' }] },
      ]}],
    }),

    // ── Why Us ──
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
        { name: 'a', type: 'text', rows: 3, title: 'Answer' },
      ]}],
    }),

    // ── SEO ──
    defineField({ name: 'seoTitle', type: 'string', group: 'seo' }),
    defineField({ name: 'seoDescription', type: 'text', rows: 2, group: 'seo' }),
    defineField({ name: 'ogImage', type: 'image', group: 'seo' }),
  ],
  preview: { select: { title: 'title', subtitle: 'summary', media: 'icon' } },
});
