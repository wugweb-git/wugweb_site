import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'platformProfile',
  title: 'Platform Profile',
  type: 'document',
  fields: [
    defineField({ name: 'profileId', type: 'string', title: 'Profile ID', validation: (r) => r.required() }),
    defineField({ name: 'platform', type: 'string', title: 'Platform', validation: (r) => r.required() }),
    defineField({ name: 'profileUrl', type: 'url', title: 'Profile URL' }),
    defineField({ name: 'category', type: 'string', title: 'Category', options: {
      list: ['Business Directory', 'Social Media', 'Professional Network', 'Portfolio', 'Blog Platform', 'Tech Platform', 'Review Platform', 'Other']
    }}),
    defineField({ name: 'profileStatus', type: 'string', title: 'Status', options: {
      list: ['Live', 'Pending', 'Inactive', 'Claimed', 'Unclaimed']
    }}),
    defineField({ name: 'username', type: 'string', title: 'Username / Handle' }),
    defineField({ name: 'bio', type: 'text', title: 'Bio', rows: 3 }),
    defineField({ name: 'assetType', type: 'string', title: 'Asset Type' }),
    defineField({ name: 'fileUrl', type: 'url', title: 'File URL / Storage Path' }),
    defineField({ name: 'notes', type: 'text', title: 'Notes', rows: 2 }),
    defineField({ name: 'attachment', type: 'string', title: 'Attachment' }),
  ],
  orderings: [
    { name: 'platformAsc', title: 'Platform A-Z', by: [{ field: 'platform', direction: 'asc' }] },
    { name: 'statusAsc', title: 'By Status', by: [{ field: 'profileStatus', direction: 'asc' }] },
  ],
  preview: {
    select: { title: 'platform', subtitle: 'profileId', status: 'profileStatus', category: 'category', profileUrl: 'profileUrl' },
    prepare: ({ title, subtitle, status, category, profileUrl }: any) => {
      const parts = [];
      if (subtitle) parts.push(subtitle);
      if (category) parts.push(category);
      const statusIcon = status === 'Live' ? '🟢' : status === 'Pending' ? '🟡' : status === 'Inactive' ? '🔴' : '⚪';
      return {
        title: `${statusIcon} ${title || 'Unknown Platform'}`,
        subtitle: parts.join(' · ') || 'No metadata',
      };
    },
  },
});