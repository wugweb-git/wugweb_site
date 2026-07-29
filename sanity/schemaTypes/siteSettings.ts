import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({ name: 'siteTitle', title: 'Site Title', type: 'string', description: 'Default SEO title suffix, e.g. Wugweb — Digital Experience Agency' }),
    defineField({ name: 'seoDescription', title: 'Default SEO Description', type: 'text', rows: 2 }),
    defineField({ name: 'ogImage', title: 'Default OG Image', type: 'image' }),
    defineField({ name: 'favicon', title: 'Favicon', type: 'image' }),
    defineField({ name: 'language', title: 'Default Language', type: 'string', options: { list: ['en-GB', 'en-US'] }, initialValue: 'en-GB' }),
    defineField({ name: 'copyright', title: 'Copyright Text', type: 'string' }),
    defineField({
      name: 'socialLinks',
      title: 'Social Links',
      type: 'array',
      of: [{ type: 'object', fields: [
        { name: 'platform', type: 'string', options: { list: ['Twitter/X', 'LinkedIn', 'Instagram', 'GitHub', 'Dribbble'] } },
        { name: 'url', type: 'url' },
      ]}],
    }),
    defineField({ name: 'contactEmail', title: 'Contact Email', type: 'string' }),
    defineField({ name: 'companyName', title: 'Company Name', type: 'string' }),

    // ── Sync (hidden, auto-managed) ──
    defineField({ name: 'neonSynced', type: 'boolean', readOnly: true, hidden: true, initialValue: false }),
    defineField({ name: 'neonSyncedAt', type: 'datetime', readOnly: true, hidden: true }),
  ],
  preview: { select: { title: 'siteTitle' } },
});
