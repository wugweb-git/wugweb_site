import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'industry',
  title: 'Industry',
  type: 'document',
  fields: [
    defineField({ name: 'name', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'slug', type: 'slug', options: { source: 'name' }, validation: (r) => r.required() }),
    defineField({ name: 'description', type: 'text', rows: 2 }),
    defineField({ name: 'order', type: 'number' }),
    defineField({ name: 'icon', type: 'string', description: 'Emoji or icon identifier' }),
    defineField({ name: 'iconPath', type: 'string', description: 'Local/R2 path e.g. /assets/industries/fintech.svg' }),
    defineField({ name: 'linkedAsset', type: 'reference', to: [{ type: 'asset' }] }),
    // Master under Global Settings (Wugweb taxonomy). Content (caseStudy.industryRef, client.industry) maps here.

    // ── Sync (hidden, auto-managed) ──
    defineField({ name: 'neonSynced', type: 'boolean', readOnly: true, hidden: true, initialValue: false }),
    defineField({ name: 'neonSyncedAt', type: 'datetime', readOnly: true, hidden: true }),
  ],
  orderings: [
    { name: 'orderAsc', title: 'Custom order', by: [{ field: 'order', direction: 'asc' }] },
    { name: 'nameAsc', title: 'Name A-Z', by: [{ field: 'name', direction: 'asc' }] },
  ],
  preview: {
    select: { title: 'name', icon: 'icon', order: 'order', description: 'description' },
    prepare: ({ title, icon, order, description }: any) => ({
      title: title || 'Unnamed Industry',
      subtitle: [order != null ? `#${order}` : null, icon || null, description || null]
        .filter(Boolean)
        .join(' · ')
        .slice(0, 80),
    }),
  },
});
