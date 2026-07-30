import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'asset',
  title: 'Asset',
  type: 'document',
  groups: [
    { name: 'details', title: 'Details' },
    { name: 'path', title: 'Path' },
  ],
  fields: [
    defineField({ name: 'name', type: 'string', validation: (r) => r.required(), group: 'details' }),
    defineField({ name: 'slug', type: 'slug', options: { source: 'name' }, validation: (r) => r.required(), group: 'details' }),
    defineField({ name: 'displayName', type: 'string', group: 'details' }),
    defineField({ name: 'assetType', type: 'string', options: { list: ['Client Asset', 'Brand Asset', 'Shared Asset', 'Service Asset', 'Placeholder Asset'] }, group: 'details' }),
    defineField({ name: 'mediaType', type: 'string', options: { list: ['Video', 'Image', 'SVG', 'Audio'] }, group: 'details' }),
    defineField({ name: 'mimeType', type: 'string', group: 'details' }),
    defineField({ name: 'assetGroup', type: 'string', options: { list: ['Work', 'Services', 'More'] }, group: 'details' }),
    defineField({ name: 'usage', type: 'string', description: 'e.g. Thumbnail, About, Hero', group: 'details' }),
    defineField({ name: 'status', type: 'string', options: { list: ['Active', 'Archived', 'Reserved'] }, group: 'details' }),
    defineField({ name: 'folder', type: 'string', group: 'path' }),
    defineField({ name: 'relativePath', type: 'string', description: 'Relative path from public/assets/', group: 'path' }),
    defineField({ name: 'fileName', type: 'string', group: 'path' }),
    defineField({ name: 'extension', type: 'string', group: 'path' }),
    defineField({ name: 'ownerType', type: 'string', options: { list: ['Client', 'Internal', 'Partner'] }, group: 'details' }),
    defineField({ name: 'ownerId', type: 'string', description: 'Reference to client or project', group: 'details' }),
    defineField({ name: 'localExists', type: 'boolean', readOnly: true, description: 'Whether file exists in public/assets/' }),
  ],
  orderings: [
    { name: 'nameAsc', title: 'Name A-Z', by: [{ field: 'name', direction: 'asc' }] },
    { name: 'groupAsc', title: 'Group + Name', by: [{ field: 'assetGroup', direction: 'asc' }, { field: 'name', direction: 'asc' }] },
  ],
  preview: {
    select: { title: 'displayName', subtitle: 'assetGroup', localExists: 'localExists' },
    prepare: ({ title, subtitle, localExists }: any) => ({
      title: title || 'Unnamed Asset',
      subtitle: `${String(subtitle || '').replace(/&/g, 'and')}${localExists ? ' 💾' : ''}`,
    }),
  },
});
