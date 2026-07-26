import { defineType, defineField } from 'sanity';

// One doc per pageId. Enforce "singleton" behavior in the desk structure
// (deskStructure.ts) — filter to these 4 fixed pageIds and hide "create new".
export default defineType({
  name: 'singletonPage',
  title: 'Page',
  type: 'document',
  fields: [
    defineField({
      name: 'pageId',
      type: 'string',
      readOnly: true,
      options: { list: ['home', 'about', 'faq', 'contact'] },
      validation: (r) => r.required(),
    }),
    defineField({ name: 'title', type: 'string' }),
    defineField({ name: 'seoDescription', type: 'text' }),
    defineField({ name: 'body', type: 'array', of: [{ type: 'block' }, { type: 'image' }] }),
    // Simple reusable array for repeated small items — FAQ question/answer
    // pairs and the Impact page's CSR activities both use this shape
    // rather than each getting a bespoke schema.
    defineField({
      name: 'items',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', type: 'string' },
            { name: 'text', type: 'text' },
          ],
        },
      ],
    }),
  ],
  preview: { select: { title: 'title', subtitle: 'pageId' } },
});
