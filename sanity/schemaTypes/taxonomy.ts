import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'taxonomy',
  title: 'Taxonomy Term',
  type: 'document',
  groups: [
    { name: 'details', title: 'Details' },
    { name: 'hierarchy', title: 'Hierarchy' },
    { name: 'media', title: 'Media' },
  ],
  fields: [
    defineField({ name: 'name', type: 'string', validation: (r) => r.required(), group: 'details' }),
    defineField({ name: 'slug', type: 'slug', options: { source: 'name' }, validation: (r) => r.required(), group: 'details' }),
    defineField({
      name: 'vocabulary',
      type: 'string',
      description: 'Master vocabulary under Global Settings',
      options: {
        list: [
          { title: 'Platform', value: 'platform' },
          { title: 'Tech stack / Tool', value: 'tech-stack' },
          { title: 'Tag', value: 'tag' },
          { title: 'Asset type', value: 'asset-type' },
          { title: 'Content type', value: 'content-type' },
          { title: 'Team / Department', value: 'team-department' },
          { title: 'Country', value: 'country' },
          { title: 'Sub-service', value: 'sub-service' },
          { title: 'Publishing platform (legacy)', value: 'publishing-platform' },
        ],
      },
      group: 'details',
    }),
    defineField({ name: 'description', type: 'text', rows: 2, group: 'details' }),
    defineField({ name: 'category', type: 'string', description: 'Category within vocabulary (e.g. Frontend, Portfolio)', group: 'details' }),
    defineField({ name: 'status', type: 'string', description: 'Active / Testing / Deprecated etc.', group: 'details' }),
    defineField({ name: 'website', type: 'url', description: 'Official site (platforms/tools)', group: 'details' }),
    defineField({ name: 'externalId', type: 'string', description: 'Stable ID from Notion master (e.g. Platform ID, ATY-1)', group: 'details' }),
    defineField({ name: 'meta', type: 'text', rows: 3, description: 'Extra structured notes (JSON or free text)', group: 'details' }),
    defineField({ name: 'parent', type: 'reference', to: [{ type: 'taxonomy' }], description: 'Parent term (for hierarchy)', group: 'hierarchy' }),
    defineField({ name: 'order', type: 'number', group: 'hierarchy' }),
    defineField({ name: 'icon', type: 'string', description: 'Emoji or icon identifier', group: 'details' }),
    defineField({ name: 'color', type: 'string', description: 'Hex colour e.g. #FFBE1A', group: 'details' }),
    defineField({ name: 'iconPath', type: 'string', description: 'Local/R2 path e.g. /assets/tools/figma.svg', group: 'media' }),
    defineField({ name: 'linkedAsset', type: 'reference', to: [{ type: 'asset' }], group: 'media' }),

    // ── Sync (hidden, auto-managed) ──
    defineField({ name: 'neonSynced', type: 'boolean', readOnly: true, hidden: true, initialValue: false }),
    defineField({ name: 'neonSyncedAt', type: 'datetime', readOnly: true, hidden: true }),
  ],
  orderings: [
    { name: 'vocabOrder', title: 'Vocabulary + Order', by: [{ field: 'vocabulary', direction: 'asc' }, { field: 'order', direction: 'asc' }] },
    { name: 'nameAsc', title: 'Name A-Z', by: [{ field: 'name', direction: 'asc' }] },
  ],
  preview: {
    select: { title: 'name', subtitle: 'vocabulary', icon: 'icon', category: 'category' },
    prepare: ({ title, subtitle, icon, category }: any) => ({
      title: title || 'Unnamed Term',
      subtitle: `${icon || ''} ${String(subtitle || '').replace(/&/g, 'and')}${category ? ' · ' + category : ''}`.trim(),
    }),
  },
});
