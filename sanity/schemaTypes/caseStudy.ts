import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'caseStudy',
  title: 'Case Study',
  type: 'document',
  fields: [
    defineField({ name: 'title', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'slug', type: 'slug', options: { source: 'title' }, validation: (r) => r.required() }),
    defineField({ name: 'language', type: 'string', options: { list: ['en-GB', 'en-US', 'fr', 'de', 'es'] }, initialValue: 'en-GB' }),
    defineField({ name: 'client', type: 'string' }),
    defineField({ name: 'summary', type: 'text', rows: 2 }),
    defineField({ name: 'tags', type: 'array', of: [{ type: 'string' }], options: { layout: 'tags' } }),
    defineField({ name: 'services', title: 'Related Services', type: 'array', of: [{ type: 'reference', to: [{ type: 'service' }] }] }),
    defineField({ name: 'coverImage', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'gallery', type: 'array', of: [{ type: 'image', options: { hotspot: true }, fields: [
      { name: 'alt', type: 'string' },
      { name: 'caption', type: 'string' },
    ]}]}),
    defineField({ name: 'results', type: 'array', of: [{ type: 'object', fields: [
      { name: 'metric', type: 'string', description: 'e.g. "150%"' },
      { name: 'label', type: 'string', description: 'e.g. "Increase in conversions"' },
    ]}]}),
    defineField({ name: 'publishedAt', type: 'datetime' }),
    defineField({ name: 'featured', type: 'boolean', initialValue: false }),
    defineField({ name: 'seoTitle', type: 'string' }),
    defineField({ name: 'seoDescription', type: 'text', rows: 2 }),
    defineField({ name: 'ogImage', type: 'image' }),
    defineField({ name: 'body', type: 'blockContent' }),
  ],
  orderings: [{ name: 'publishedAtDesc', title: 'Publish date', by: [{ field: 'publishedAt', direction: 'desc' }] }],
  preview: { select: { title: 'title', subtitle: 'client', media: 'coverImage' } },
});
