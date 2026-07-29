import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'singletonPage',
  title: 'Page',
  type: 'document',
  fields: [
    defineField({
      name: 'pageId', type: 'string', readOnly: true,
      options: {
        list: [
          { title: 'Home', value: 'home' },
          { title: 'About', value: 'about' },
          { title: 'FAQ', value: 'faq' },
          { title: 'Contact', value: 'contact' },
          { title: 'Privacy Policy', value: 'privacy-policy' },
          { title: 'Terms of Use', value: 'terms-of-use' },
          { title: 'Refund Policy', value: 'refund-policy' },
          { title: 'Impact', value: 'impact' },
          { title: 'Subscription', value: 'subscription' },
          { title: 'Sitemap', value: 'sitemap' },
          { title: 'Services', value: 'services' },
          { title: 'Work', value: 'work' },
          { title: 'Blog', value: 'blog' },
        ],
      },
      validation: (r) => r.required(),
    }),
    defineField({ name: 'language', type: 'string', options: { list: ['en-GB', 'en-US', 'fr', 'de', 'es'] }, initialValue: 'en-GB' }),
    defineField({ name: 'title', type: 'string', description: 'Page heading (H1)' }),
    defineField({ name: 'subtitle', type: 'string', description: 'Subtitle or tagline' }),
    defineField({ name: 'heroImage', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'seoTitle', type: 'string', description: 'Override <title> tag' }),
    defineField({ name: 'seoDescription', type: 'text', rows: 2 }),
    defineField({ name: 'ogImage', type: 'image' }),
    defineField({ name: 'body', type: 'blockContent' }),
    defineField({
      name: 'items', type: 'array',
      of: [{ type: 'object', fields: [
        { name: 'title', type: 'string' },
        { name: 'text', type: 'text', rows: 3 },
        { name: 'image', type: 'image', options: { hotspot: true } },
      ]}],
    }),

    // ── Sync (hidden, auto-managed) ──
    defineField({ name: 'neonSynced', type: 'boolean', readOnly: true, hidden: true, initialValue: false }),
    defineField({ name: 'neonSyncedAt', type: 'datetime', readOnly: true, hidden: true }),
  ],
  preview: { select: { title: 'title', subtitle: 'pageId' } },
});
