import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'taxonomy',
  title: 'Taxonomy Term',
  type: 'document',
  groups: [
    { name: 'details', title: 'Details' },
    { name: 'hierarchy', title: 'Hierarchy' },
  ],
  fields: [
    defineField({ name: 'name', type: 'string', validation: (r) => r.required(), group: 'details' }),
    defineField({ name: 'slug', type: 'slug', options: { source: 'name' }, validation: (r) => r.required(), group: 'details' }),
    defineField({ name: 'vocabulary', type: 'string', description: 'e.g. "service-type", "capability", "methodology", "tool-category"', group: 'details' }),
    defineField({ name: 'description', type: 'text', rows: 2, group: 'details' }),
    defineField({ name: 'parent', type: 'reference', to: [{ type: 'taxonomy' }], description: 'Parent term (for hierarchy)', group: 'hierarchy' }),
    defineField({ name: 'order', type: 'number', group: 'hierarchy' }),
    defineField({ name: 'icon', type: 'string', description: 'Emoji or icon identifier', group: 'details' }),
    defineField({ name: 'color', type: 'string', description: 'Hex colour e.g. #FFBE1A', group: 'details' }),

    // ── Sync (hidden, auto-managed) ──
    defineField({ name: 'neonSynced', type: 'boolean', readOnly: true, hidden: true, initialValue: false }),
    defineField({ name: 'neonSyncedAt', type: 'datetime', readOnly: true, hidden: true }),
  ],
  orderings: [
    { name: 'vocabOrder', title: 'Vocabulary + Order', by: [{ field: 'vocabulary', direction: 'asc' }, { field: 'order', direction: 'asc' }] },
    { name: 'nameAsc', title: 'Name A-Z', by: [{ field: 'name', direction: 'asc' }] },
  ],
  preview: {
    select: { title: 'name', subtitle: 'vocabulary', icon: 'icon' },
    prepare: ({ title, subtitle, icon }: any) => ({
      title: title || 'Unnamed Term',
      subtitle: `${icon || ''} ${String(subtitle || '').replace(/&/g, 'and')}`.trim(),
    }),
  },
});
