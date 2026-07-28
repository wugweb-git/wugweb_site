import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'contactSubmission',
  title: 'Contact Submission',
  type: 'document',
  readOnly: true,
  groups: [
    { name: 'details', title: 'Details' },
    { name: 'preferences', title: 'Preferences' },
  ],
  fields: [
    defineField({ name: 'name', type: 'string', group: 'details' }),
    defineField({ name: 'company', type: 'string', group: 'details' }),
    defineField({ name: 'email', type: 'string', group: 'details' }),
    defineField({ name: 'phone', type: 'string', group: 'details' }),
    defineField({ name: 'topic', type: 'string', group: 'details' }),
    defineField({ name: 'budget', type: 'string', group: 'preferences' }),
    defineField({ name: 'interests', type: 'array', of: [{ type: 'string' }], options: { layout: 'tags' }, group: 'preferences' }),
    defineField({ name: 'contactMethod', type: 'string', options: { list: ['email', 'phone', 'any'] }, group: 'preferences' }),
    defineField({ name: 'newsletterOptIn', type: 'boolean', group: 'preferences' }),
    defineField({ name: 'submittedAt', type: 'datetime', initialValue: () => new Date().toISOString(), group: 'details' }),
  ],
  orderings: [{ name: 'submittedAtDesc', title: 'Latest first', by: [{ field: 'submittedAt', direction: 'desc' }] }],
  preview: { select: { title: 'name', subtitle: 'company', media: 'email' } },
});
