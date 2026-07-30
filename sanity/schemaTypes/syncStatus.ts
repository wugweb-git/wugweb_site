import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'syncStatus',
  title: 'Sync Status',
  type: 'document',
  readOnly: true,
  fields: [
    defineField({ name: 'source', type: 'string', options: { list: ['notion', 'sanity-cms', 'neon-db'] } }),
    defineField({ name: 'target', type: 'string', options: { list: ['notion', 'sanity', 'neon', 'frontend'] } }),
    defineField({ name: 'status', type: 'string', options: { list: ['synced', 'pending', 'error', 'disabled'] } }),
    defineField({ name: 'lastSyncedAt', type: 'datetime' }),
    defineField({ name: 'entityType', type: 'string', description: 'e.g. caseStudy, post, person' }),
    defineField({ name: 'entityCount', type: 'number', description: 'Count of entities synced' }),
    defineField({ name: 'errorMessage', type: 'text', rows: 2 }),
    defineField({ name: 'notes', type: 'text', rows: 2 }),
  ],
  orderings: [
    { name: 'createdAtDesc', title: 'Latest first', by: [{ field: '_createdAt', direction: 'desc' }] },
  ],
  preview: {
    select: { title: 'source', subtitle: 'status', entityType: 'entityType' },
    prepare: ({ title, subtitle, entityType }: any) => ({
      title: `${title || 'Unknown'} → ${entityType || '?'}`,
      subtitle: subtitle || '',
    }),
  },
});
