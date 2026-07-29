import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'person',
  title: 'Person',
  type: 'document',
  fields: [
    defineField({ name: 'name', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'slug', type: 'slug', options: { source: 'name' } }),
    defineField({ name: 'photo', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'role', type: 'string' }),
    defineField({ name: 'bio', type: 'text', rows: 3 }),
    defineField({ name: 'email', type: 'string' }),
    defineField({ name: 'socialLinks', type: 'array', of: [{ type: 'object', fields: [
      { name: 'platform', type: 'string', options: { list: ['LinkedIn', 'Twitter/X', 'GitHub', 'Dribbble'] } },
      { name: 'url', type: 'url' },
    ]}]}),
    defineField({ name: 'order', type: 'number' }),

    // ── Sync (hidden, auto-managed) ──
    defineField({ name: 'neonSynced', type: 'boolean', readOnly: true, hidden: true, initialValue: false }),
    defineField({ name: 'neonSyncedAt', type: 'datetime', readOnly: true, hidden: true }),
  ],
  preview: { select: { title: 'name', subtitle: 'role', media: 'photo' } },
});
