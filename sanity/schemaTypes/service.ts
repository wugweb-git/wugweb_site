import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'service',
  title: 'Service',
  type: 'document',
  fields: [
    defineField({ name: 'title', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'slug', type: 'slug', options: { source: 'title' }, validation: (r) => r.required() }),
    defineField({ name: 'language', type: 'string', options: { list: ['en-GB', 'en-US', 'fr', 'de', 'es'] }, initialValue: 'en-GB' }),
    defineField({ name: 'summary', type: 'text', rows: 2 }),
    defineField({ name: 'fullDescription', title: 'Full Description', type: 'text', rows: 3 }),
    defineField({ name: 'icon', type: 'image', description: 'Service icon or symbol' }),
    defineField({ name: 'coverImage', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'order', type: 'number' }),
    defineField({ name: 'seoTitle', type: 'string' }),
    defineField({ name: 'seoDescription', type: 'text', rows: 2 }),
    defineField({ name: 'ogImage', type: 'image' }),
    defineField({ name: 'body', type: 'blockContent', title: 'Content' }),
    defineField({ name: 'caseStudies', title: 'Related Case Studies', type: 'array', of: [{ type: 'reference', to: [{ type: 'caseStudy' }] }] }),
    defineField({ name: 'faqs', type: 'array', of: [{ type: 'object', fields: [
      { name: 'question', type: 'string' },
      { name: 'answer', type: 'text', rows: 3 },
    ]}]}),
  ],
  preview: { select: { title: 'title', media: 'icon' } },
});
