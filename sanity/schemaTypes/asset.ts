import { defineType, defineField } from 'sanity';
import { ownerField } from './ownerField';

export default defineType({
  name: 'asset',
  title: 'Asset',
  type: 'document',
  groups: [
    { name: 'details', title: 'Details' },
    { name: 'path', title: 'Path' },
    { name: 'links', title: 'Content links' },
  ],
  fields: [
    defineField({ name: 'name', type: 'string', validation: (r) => r.required(), group: 'details' }),
    defineField({ name: 'slug', type: 'slug', options: { source: 'name' }, validation: (r) => r.required(), group: 'details' }),
    defineField({ name: 'displayName', type: 'string', group: 'details' }),
    { ...ownerField, group: 'details' },
    defineField({ name: 'assetType', type: 'string', options: { list: ['Client Asset', 'Brand Asset', 'Shared Asset', 'Service Asset', 'Placeholder Asset', 'Page Asset', 'Blog Asset'] }, group: 'details' }),
    defineField({ name: 'mediaType', type: 'string', options: { list: ['Video', 'Image', 'SVG', 'Audio'] }, group: 'details' }),
    defineField({ name: 'mimeType', type: 'string', group: 'details' }),
    defineField({ name: 'assetGroup', type: 'string', options: { list: ['Work', 'Services', 'More', 'Brand', 'Blog', 'Framer'] }, group: 'details' }),
    defineField({
      name: 'alt', type: 'string', group: 'details',
      description: 'What the image shows, for screen readers and search. Leave empty for decorative images and videos.',
      validation: (r) => r.min(5).max(125).warning('Aim for 5–125 characters.'),
    }),
    defineField({ name: 'usage', type: 'string', description: 'e.g. Thumbnail, About, Hero, Cover, Logo', group: 'details' }),
    defineField({ name: 'status', type: 'string', options: { list: ['Active', 'Archived', 'Reserved'] }, group: 'details' }),
    defineField({ name: 'folder', type: 'string', group: 'path' }),
    defineField({ name: 'relativePath', type: 'string', description: 'Relative path from public/assets/ (same as R2 key without assets/ prefix)', group: 'path' }),
    defineField({ name: 'sitePath', type: 'string', description: 'Canonical site path e.g. /assets/work/...', group: 'path' }),
    defineField({ name: 'r2Key', type: 'string', description: 'R2 object key e.g. assets/work/...', group: 'path' }),
    defineField({ name: 'publicUrl', type: 'string', description: 'Public R2 URL (r2.dev or custom domain)', group: 'path' }),
    defineField({ name: 'fileName', type: 'string', group: 'path' }),
    defineField({ name: 'extension', type: 'string', group: 'path' }),
    defineField({ name: 'ownerType', type: 'string', options: { list: ['Client', 'Internal', 'Partner'] }, group: 'details' }),
    defineField({ name: 'ownerId', type: 'string', description: 'Legacy Notion owner id — prefer Owner field above', group: 'details' }),
    defineField({ name: 'localExists', type: 'boolean', readOnly: true, description: 'Whether file exists in public/assets/' }),
    defineField({ name: 'r2Synced', type: 'boolean', readOnly: true, description: 'Present in R2 bucket wugweb-assets' }),
    defineField({ name: 'linkedCaseStudy', type: 'reference', to: [{ type: 'caseStudy' }], group: 'links' }),
    defineField({ name: 'linkedClient', type: 'reference', to: [{ type: 'client' }], group: 'links' }),
    defineField({ name: 'linkedService', type: 'reference', to: [{ type: 'service' }], group: 'links' }),
    defineField({ name: 'linkedPost', type: 'reference', to: [{ type: 'post' }], group: 'links' }),
    defineField({ name: 'linkedPageId', type: 'string', description: 'singletonPage.pageId e.g. home, about', group: 'links' }),
    // Computed by scripts/scan-asset-usage.mjs — what ACTUALLY references this
    // file (Sanity content + site code), unlike the linked* fields above, which
    // are manual claims. Read-only: the next scan overwrites any hand edit.
    defineField({
      name: 'usedBy', title: 'Used by', type: 'array', group: 'links', readOnly: true,
      description: 'Every document field and code file that references this file. Written by the usage scan — do not edit.',
      of: [{
        type: 'object',
        name: 'assetUsage',
        fields: [
          { name: 'kind', type: 'string', options: { list: ['content', 'code'] } },
          { name: 'label', type: 'string' },
          { name: 'field', type: 'string' },
          { name: 'docId', type: 'string' },
          { name: 'docType', type: 'string' },
        ],
        preview: { select: { title: 'label', subtitle: 'field' } },
      }],
    }),
    defineField({
      name: 'usedByCount', title: 'Used by (count)', type: 'number', group: 'links', readOnly: true,
      description: '0 = nothing references this file. Empty = added since the last usage scan, so not yet known.',
    }),
  ],
  orderings: [
    { name: 'nameAsc', title: 'Name A-Z', by: [{ field: 'name', direction: 'asc' }] },
    { name: 'groupAsc', title: 'Group + Name', by: [{ field: 'assetGroup', direction: 'asc' }, { field: 'name', direction: 'asc' }] },
  ],
  preview: {
    select: { title: 'displayName', subtitle: 'assetGroup', localExists: 'localExists', mediaType: 'mediaType', status: 'status', assetType: 'assetType', relativePath: 'relativePath' },
    prepare: ({ title, subtitle, localExists, mediaType, status, assetType, relativePath }: any) => {
      const parts = [];
      if (subtitle) parts.push(String(subtitle).replace(/&/g, 'and'));
      if (mediaType) parts.push(mediaType);
      if (status) parts.push(status);
      const healthIcon = localExists ? '💾' : '☁️';
      const statusBadge = status === 'Active' ? '✅' : status === 'Archived' ? '📦' : '⚪';
      return {
        title: `${healthIcon} ${title || 'Unnamed Asset'}`,
        subtitle: parts.join(' · ') || 'No metadata',
      };
    },
  },
});
