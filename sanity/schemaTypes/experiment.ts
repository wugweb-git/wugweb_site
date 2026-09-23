import { defineType, defineField, defineArrayMember } from 'sanity';

/**
 * Experiment — CMS-managed A/B test config.
 * v1 use case: case-study template redesign, split by slug + cookie-persisted
 * variant assignment in src/pages/work/[slug].astro.
 */
export default defineType({
  name: 'experiment',
  title: 'Experiment',
  type: 'document',
  groups: [
    { name: 'setup', title: 'Setup' },
    { name: 'targeting', title: 'Targeting' },
  ],
  fields: [
    defineField({ name: 'name', type: 'string', title: 'Name', validation: (r) => r.required(), group: 'setup' }),
    defineField({ name: 'hypothesis', type: 'text', title: 'Hypothesis', rows: 3, group: 'setup' }),
    defineField({
      name: 'status',
      type: 'string',
      title: 'Status',
      options: { list: ['draft', 'running', 'paused', 'concluded'] },
      initialValue: 'draft',
      validation: (r) => r.required(),
      group: 'setup',
    }),
    defineField({
      name: 'variants',
      type: 'array',
      title: 'Variants',
      group: 'setup',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'variant',
          fields: [
            defineField({ name: 'id', type: 'string', title: 'ID', description: 'e.g. control / treatment', validation: (r) => r.required() }),
            defineField({ name: 'name', type: 'string', title: 'Label' }),
            defineField({ name: 'weight', type: 'number', title: 'Weight', initialValue: 50, description: 'Relative traffic share' }),
          ],
          preview: { select: { title: 'name', subtitle: 'id', weight: 'weight' }, prepare: ({ title, subtitle, weight }: any) => ({ title: title || subtitle, subtitle: `${subtitle} · weight ${weight}` }) },
        }),
      ],
      validation: (r) => r.min(2).error('Need at least 2 variants'),
    }),
    defineField({
      name: 'appliesTo',
      type: 'string',
      title: 'Applies to',
      description: 'Which template/surface this experiment controls. e.g. case-study-template',
      group: 'targeting',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'caseStudySlugs',
      type: 'array',
      title: 'Case study slugs',
      description: 'Only these case-study slugs run this experiment. Leave empty to apply to none (safer default than "all").',
      of: [defineArrayMember({ type: 'string' })],
      group: 'targeting',
    }),
    defineField({ name: 'startDate', type: 'datetime', title: 'Start date', group: 'setup' }),
    defineField({ name: 'endDate', type: 'datetime', title: 'End date', group: 'setup' }),
    defineField({ name: 'winner', type: 'string', title: 'Winning variant ID', description: 'Fill in once concluded', group: 'setup' }),
  ],
  preview: {
    select: { title: 'name', status: 'status', appliesTo: 'appliesTo' },
    prepare: ({ title, status, appliesTo }: any) => ({
      title: title || 'Untitled experiment',
      subtitle: `${status || 'draft'} · ${appliesTo || '—'}`,
    }),
  },
});
