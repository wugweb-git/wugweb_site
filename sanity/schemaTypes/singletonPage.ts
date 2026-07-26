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
  ],
  preview: { select: { title: 'title', subtitle: 'pageId' } },
});
