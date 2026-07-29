import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'caseStudy',
  title: 'Case Study',
  type: 'document',
  groups: [
    { name: 'overview', title: 'Overview', default: true },
    { name: 'content', title: 'Content' },
    { name: 'results', title: 'Results' },
    { name: 'seo', title: 'SEO' },
  ],
  fields: [
    // ── Overview ──
    defineField({ name: 'title', type: 'string', validation: (r) => r.required(), group: 'overview' }),
    defineField({ name: 'subtitle', type: 'string', description: 'Short tagline shown on case study cards', group: 'overview' }),
    defineField({ name: 'slug', type: 'slug', options: { source: 'title', maxLength: 120 }, validation: (r) => r.required(), group: 'overview' }),
    defineField({ name: 'coverImage', type: 'image', options: { hotspot: true }, description: 'Hero image for the case study detail page', group: 'overview' }),
    defineField({ name: 'client', type: 'string', group: 'overview' }),
    defineField({ name: 'summary', type: 'text', rows: 2, description: 'Short description for work listing cards. 1-2 sentences.', group: 'overview' }),
    defineField({ name: 'about', type: 'text', rows: 4, description: 'Longer context section shown on the detail page', group: 'overview' }),
    defineField({ name: 'disciplines', type: 'array', of: [{ type: 'string' }], options: { layout: 'tags' }, description: 'e.g. UX Design, Strategy, Development', group: 'overview' }),
    defineField({ name: 'industry', type: 'string', group: 'overview' }),
    defineField({ name: 'timeline', type: 'string', description: 'e.g. "2022" or "Q3 2023"', group: 'overview' }),
    defineField({ name: 'partner', type: 'string', description: 'Partner agency or organisation (if any)', group: 'overview' }),
    defineField({ name: 'team', type: 'array', of: [{ type: 'string' }], options: { layout: 'tags' }, description: 'People or organisations involved', group: 'overview' }),
    defineField({ name: 'tags', type: 'array', of: [{ type: 'string' }], options: { layout: 'tags' }, group: 'overview' }),
    defineField({ name: 'services', title: 'Related Services', type: 'array', of: [{ type: 'reference', to: [{ type: 'service' }] }], group: 'overview' }),

    // ── Content ──
    defineField({ name: 'gallery', type: 'array', of: [{ type: 'image', options: { hotspot: true }, fields: [
      { name: 'alt', type: 'string' },
      { name: 'caption', type: 'string' },
    ]}], group: 'content' }),
    defineField({
      name: 'challenges', type: 'array', of: [{ type: 'object', fields: [
        { name: 'title', type: 'string', description: 'Short challenge name' },
        { name: 'body', type: 'text', rows: 3 },
      ]}], group: 'content',
    }),
    defineField({
      name: 'solutions', type: 'array', of: [{ type: 'object', fields: [
        { name: 'title', type: 'string', description: 'Short solution name' },
        { name: 'body', type: 'text', rows: 3 },
      ]}], group: 'content',
    }),
    defineField({
      name: 'designPhilosophy', type: 'text', rows: 5, description: 'Strategic insights and design philosophy — what made this project unique', group: 'content',
    }),
    defineField({ name: 'body', type: 'blockContent', title: 'Full Body Content', description: 'Rich text body with images, CTAs, stats, etc.', group: 'content' }),

    // ── Results ──
    defineField({
      name: 'impact', type: 'array', of: [{ type: 'object', fields: [
        { name: 'title', type: 'string', description: 'Short impact headline' },
        { name: 'body', type: 'text', rows: 3 },
      ]}], group: 'results',
    }),
    defineField({ name: 'results', type: 'array', of: [{ type: 'object', fields: [
      { name: 'metric', type: 'string', description: 'e.g. "150%"' },
      { name: 'label', type: 'string', description: 'e.g. "Increase in conversions"' },
    ]}]}),
    defineField({ name: 'publishedAt', type: 'datetime', group: 'results' }),
    defineField({ name: 'featured', type: 'boolean', initialValue: false, description: 'Featured case studies appear first in listings', group: 'results' }),
    defineField({ name: 'language', type: 'string', options: { list: ['en-GB', 'en-US'] }, initialValue: 'en-GB', group: 'overview' }),

    // ── SEO ──
    defineField({ name: 'seoTitle', type: 'string', description: 'Overrides the <title> tag', group: 'seo' }),
    defineField({ name: 'seoDescription', type: 'text', rows: 2, group: 'seo' }),
    defineField({ name: 'ogImage', type: 'image', description: 'Social sharing preview image', group: 'seo' }),

    // ── Sync ──
    defineField({ name: 'neonSynced', type: 'boolean', readOnly: true, hidden: true, initialValue: false }),
    defineField({ name: 'neonSyncedAt', type: 'datetime', readOnly: true, hidden: true }),
  ],
  orderings: [
    { name: 'publishedAtDesc', title: 'Publish date', by: [{ field: 'publishedAt', direction: 'desc' }] },
    { name: 'titleAsc', title: 'Title A-Z', by: [{ field: 'title', direction: 'asc' }] },
  ],
  preview: {
    select: { title: 'title', subtitle: 'client', media: 'coverImage', featured: 'featured' },
    prepare: ({ title, subtitle, media, featured }: any) => ({
      title: title || 'Untitled',
      subtitle: `${subtitle || ''}${featured ? ' ⭐' : ''}`.trim(),
      media,
    }),
  },
});
