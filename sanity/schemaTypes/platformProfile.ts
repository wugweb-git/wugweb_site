import { defineType, defineField } from 'sanity';

/**
 * Presence — owned/claimed profile URLs on publishing platforms.
 * Platform catalog metadata lives on taxonomy vocabulary "platform".
 * Credentials (from Notion DP2) are Studio-only; never expose via public CDN queries.
 */
export default defineType({
  name: 'platformProfile',
  title: 'Presence',
  type: 'document',
  groups: [
    { name: 'presence', title: 'Presence' },
    { name: 'credentials', title: 'Credentials' },
    { name: 'notes', title: 'Notes' },
  ],
  fields: [
    defineField({ name: 'profileId', type: 'string', title: 'Profile ID', validation: (r) => r.required(), group: 'presence' }),
    defineField({ name: 'platform', type: 'string', title: 'Platform name', validation: (r) => r.required(), group: 'presence' }),
    defineField({
      name: 'platformRef',
      type: 'reference',
      title: 'Platform',
      to: [{ type: 'taxonomy' }],
      options: { filter: 'vocabulary == "platform"' },
      group: 'presence',
    }),
    defineField({ name: 'profileUrl', type: 'url', title: 'Profile URL', group: 'presence' }),
    defineField({
      name: 'category',
      type: 'string',
      title: 'Category',
      options: {
        list: [
          'Business Directory',
          'Social Media',
          'Professional Network',
          'Portfolio',
          'Blog Platform',
          'Tech Platform',
          'Review Platform',
          'Other',
        ],
      },
      group: 'presence',
    }),
    defineField({
      name: 'profileStatus',
      type: 'string',
      title: 'Status',
      options: { list: ['Live', 'Pending', 'Inactive', 'Claimed', 'Unclaimed'] },
      group: 'presence',
    }),
    defineField({ name: 'username', type: 'string', title: 'Username / Handle', group: 'presence' }),
    defineField({ name: 'bio', type: 'text', title: 'Bio', rows: 3, group: 'presence' }),
    defineField({
      name: 'owner',
      type: 'string',
      title: 'Owner',
      description: 'Governance owner — not the same as Author (person byline). See governance.md',
      options: { list: [
        { title: 'Vedanshu (personal)', value: 'vedanshu' },
        { title: 'Wugweb (agency)', value: 'wugweb' },
        { title: 'Both (shared)', value: 'both' },
      ] },
      group: 'presence',
    }),

    // ── Credentials (DP2) — hidden from public site ──
    defineField({ name: 'credentialId', type: 'string', title: 'Credential ID', group: 'credentials' }),
    defineField({ name: 'loginEmail', type: 'string', title: 'Login email / username', group: 'credentials' }),
    defineField({ name: 'password', type: 'string', title: 'Password', group: 'credentials' }),
    defineField({ name: 'apiKey', type: 'string', title: 'API key', group: 'credentials' }),
    defineField({ name: 'loginMethod', type: 'string', title: 'Login method', group: 'credentials' }),
    defineField({ name: 'twoFactor', type: 'string', title: '2FA', group: 'credentials' }),
    defineField({ name: 'recoveryEmail', type: 'string', title: 'Recovery email', group: 'credentials' }),
    defineField({ name: 'recoveryPhone', type: 'string', title: 'Recovery phone', group: 'credentials' }),
    defineField({ name: 'backupCodes', type: 'text', title: 'Backup codes', rows: 2, group: 'credentials' }),
    defineField({ name: 'accessLevel', type: 'string', title: 'Access level', group: 'credentials' }),
    defineField({ name: 'accountType', type: 'string', title: 'Account type', group: 'credentials' }),
    defineField({ name: 'credentialStatus', type: 'string', title: 'Credential status', group: 'credentials' }),

    defineField({ name: 'notes', type: 'text', title: 'Notes', rows: 2, group: 'notes' }),
  ],
  orderings: [
    { name: 'platformAsc', title: 'Platform A-Z', by: [{ field: 'platform', direction: 'asc' }] },
    { name: 'statusAsc', title: 'By Status', by: [{ field: 'profileStatus', direction: 'asc' }] },
  ],
  preview: {
    select: {
      title: 'platform',
      subtitle: 'profileId',
      status: 'profileStatus',
      category: 'category',
      profileUrl: 'profileUrl',
    },
    prepare: ({ title, subtitle, status, category, profileUrl }: any) => {
      const parts = [];
      if (subtitle) parts.push(subtitle);
      if (category) parts.push(category);
      if (profileUrl) parts.push(profileUrl.replace(/^https?:\/\//, '').slice(0, 40));
      const statusIcon =
        status === 'Live' ? '🟢' : status === 'Pending' ? '🟡' : status === 'Inactive' ? '🔴' : '⚪';
      return {
        title: `${statusIcon} ${title || 'Unknown Platform'}`,
        subtitle: parts.join(' · ') || 'No metadata',
      };
    },
  },
});
