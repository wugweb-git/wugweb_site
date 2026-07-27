import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'post',
  title: 'Blog Post',
  type: 'document',
  fields: [
    defineField({ name: 'title', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'slug', type: 'slug', options: { source: 'title' }, validation: (r) => r.required() }),
    defineField({ name: 'language', type: 'string', options: { list: ['en-GB', 'en-US', 'fr', 'de', 'es'] }, initialValue: 'en-GB' }),
    defineField({ name: 'author', type: 'reference', to: [{ type: 'person' }] }),
    defineField({ name: 'excerpt', type: 'text', rows: 2 }),
    defineField({ name: 'coverImage', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'tags', type: 'array', of: [{ type: 'string' }], options: { layout: 'tags' } }),
    defineField({ name: 'category', type: 'string', options: { list: ['Design', 'Development', 'MarTech', 'Strategy', 'AI'] } }),
    defineField({ name: 'readingTime', type: 'number', description: 'Minutes to read' }),
    defineField({ name: 'publishedAt', type: 'datetime' }),
    defineField({ name: 'featured', type: 'boolean', initialValue: false }),
    defineField({ name: 'seoTitle', type: 'string' }),
    defineField({ name: 'seoDescription', type: 'text', rows: 2 }),
    defineField({ name: 'ogImage', type: 'image' }),
    defineField({ name: 'body', type: 'blockContent', title: 'Content' }),
  ],
  orderings: [{ name: 'publishedAtDesc', title: 'Publish date', by: [{ field: 'publishedAt', direction: 'desc' }] }],
  preview: { select: { title: 'title', subtitle: 'publishedAt', media: 'coverImage' } },
});
