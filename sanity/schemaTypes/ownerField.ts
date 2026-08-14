import { defineField } from 'sanity';

/** Governance owner — not Author. See governance.md */
export const ownerField = defineField({
  name: 'owner',
  type: 'string',
  title: 'Owner',
  description: 'Governance owner (IP / multi-brand). Not the same as Author. See governance.md',
  options: {
    list: [
      { title: 'Vedanshu (personal)', value: 'vedanshu' },
      { title: 'Wugweb (agency)', value: 'wugweb' },
      { title: 'Both (shared)', value: 'both' },
      { title: 'None (unassigned)', value: 'none' },
    ],
  },
  initialValue: 'wugweb',
});
