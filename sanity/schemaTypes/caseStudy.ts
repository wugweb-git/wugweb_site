import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'caseStudy',
  title: 'Case Study',
  type: 'document',
  groups: [
    { name: 'overview', title: 'Overview' },
    { name: 'content', title: 'Content' },
    { name: 'results', title: 'Results' },
    { name: 'seo', title: 'SEO' },
  ],
  fields: [
    // ── Overview ──
    defineField({ name: 'title', type: 'string', validation: (r) => r.required(), group: 'overview' }),
    defineField({ name: 'slug', type: 'slug', options: { source: 'title' }, validation: (r) => r.required(), group: 'overview' }),
    defineField({ name: 'language', type: 'string', options: { list: ['en-GB', 'en-US', 'fr', 'de', 'es'] }, initialValue: 'en-GB', group: 'overview' }),
    defineField({ name: 'client', type: 'string', group: 'overview' }),
    defineField({ name: 'summary', type: 'text', rows: 2, description: 'Short card description', group: 'overview' }),
    defineField({ name: 'about', type: 'text', rows: 3, description: 'Longer about section for the detail page', group: 'overview' }),
    defineField({ name: 'tags', type: 'array', of: [{ type: 'string' }], options: { layout: 'tags' }, group: 'overview' }),
    defineField({ name: 'disciplines', type: 'array', of: [{ type: 'string' }], options: { layout: 'tags' }, description: 'e.g. UX Design, Strategy, Development', group: 'overview' }),
    defineField({ name: 'industry', type: 'string', group: 'overview' }),
    defineField({ name: 'timeline', type: 'string', description: 'e.g. "2022" or "Q3 2023"', group: 'overview' }),
    defineField({ name: 'team', type: 'array', of: [{ type: 'string' }], options: { layout: 'tags' }, description: 'Partner organisations or team names', group: 'overview' }),
    defineField({ name: 'services', title: 'Related Services', type: 'array', of: [{ type: 'reference', to: [{ type: 'service' }] }], group: 'overview' }),

    // ── Content ──
    defineField({ name: 'coverImage', type: 'image', options: { hotspot: true }, group: 'content' }),
    defineField({ name: 'gallery', type: 'array', of: [{ type: 'image', options: { hotspot: true }, fields: [
      { name: 'alt', type: 'string' },
      { name: 'caption', type: 'string' },
    ]}], group: 'content' }),
    defineField({
      name: 'challenges', type: 'array', of: [{ type: 'object', fields: [
        { name: 'title', type: 'string' },
        { name: 'body', type: 'text', rows: 3 },
      ]}], group: 'content',
    }),
    defineField({
      name: 'solutions', type: 'array', of: [{ type: 'object', fields: [
        { name: 'title', type: 'string' },
        { name: 'body', type: 'text', rows: 3 },
      ]}], group: 'content',
    }),
    defineField({ name: 'body', type: 'blockContent', title: 'Full Body Content', group: 'content' }),

    // ── Results ──
    defineField({
      name: 'impact', type: 'array', of: [{ type: 'object', fields: [
        { name: 'title', type: 'string' },
        { name: 'body', type: 'text', rows: 3 },
      ]}], group: 'results',
    }),
    defineField({ name: 'results', type: 'array', of: [{ type: 'object', fields: [
      { name: 'metric', type: 'string', description: 'e.g. "150%"' },
      { name: 'label', type: 'string', description: 'e.g. "Increase in conversions"' },
    ]}]}),
    defineField({ name: 'publishedAt', type: 'datetime', group: 'results' }),
    defineField({ name: 'featured', type: 'boolean', initialValue: false, group: 'results' }),

    // ── SEO ──
    defineField({ name: 'seoTitle', type: 'string', group: 'seo' }),
    defineField({ name: 'seoDescription', type: 'text', rows: 2, group: 'seo' }),
    defineField({ name: 'ogImage', type: 'image', group: 'seo' }),
  ],
  orderings: [{ name: 'publishedAtDesc', title: 'Publish date', by: [{ field: 'publishedAt', direction: 'desc' }] }],
  preview: { select: { title: 'title', subtitle: 'client', media: 'coverImage' } },
});
