import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'siteScript',
  title: 'Script & Integration Code',
  type: 'document',
  groups: [
    { name: 'details', title: 'Script Details' },
    { name: 'code', title: 'Code & Source' },
    { name: 'execution', title: 'Execution Rules' },
  ],
  fields: [
    defineField({
      name: 'name',
      title: 'Script Name',
      type: 'string',
      validation: (r) => r.required(),
      group: 'details',
    }),
    defineField({
      name: 'slug',
      title: 'Identifier Slug',
      type: 'slug',
      options: { source: 'name' },
      validation: (r) => r.required(),
      group: 'details',
    }),
    defineField({
      name: 'scriptType',
      title: 'Integration Type',
      type: 'string',
      options: {
        list: [
          { title: 'Google Tag Manager (GTM)', value: 'gtm' },
          { title: 'Google Analytics (GA4)', value: 'ga4' },
          { title: 'Meta / Facebook Pixel', value: 'meta-pixel' },
          { title: 'PostHog / Mixpanel Analytics', value: 'analytics' },
          { title: 'Hotjar / Clarity Heatmap', value: 'heatmap' },
          { title: 'Custom JavaScript Injection', value: 'custom-js' },
          { title: 'Custom CSS Injection', value: 'custom-css' },
          { title: 'Third-party Embed Snippet', value: 'embed' },
        ],
      },
      validation: (r) => r.required(),
      group: 'details',
    }),
    defineField({
      name: 'placement',
      title: 'Execution Placement',
      type: 'string',
      options: {
        list: [
          { title: '<head> Section', value: 'head' },
          { title: '<body> Start (after <body> tag)', value: 'bodyStart' },
          { title: '<body> End (before </body> tag)', value: 'bodyEnd' },
        ],
      },
      initialValue: 'head',
      validation: (r) => r.required(),
      group: 'execution',
    }),
    defineField({
      name: 'enabled',
      title: 'Active / Enabled',
      type: 'boolean',
      initialValue: true,
      group: 'execution',
    }),
    defineField({
      name: 'environment',
      title: 'Target Environment',
      type: 'string',
      options: {
        list: [
          { title: 'All Environments', value: 'all' },
          { title: 'Production Only', value: 'production' },
          { title: 'Staging / Preview Only', value: 'staging' },
        ],
      },
      initialValue: 'all',
      group: 'execution',
    }),
    defineField({
      name: 'priority',
      title: 'Execution Priority Order',
      type: 'number',
      description: 'Lower numbers execute first (e.g. 10 before 100)',
      initialValue: 50,
      group: 'execution',
    }),
    defineField({
      name: 'src',
      title: 'External Script URL (src)',
      type: 'url',
      description: 'e.g. https://www.googletagmanager.com/gtag/js?id=G-XXXXX',
      group: 'code',
    }),
    defineField({
      name: 'codeSnippet',
      title: 'Inline Code Snippet',
      type: 'text',
      rows: 8,
      description: 'Inline JavaScript, HTML script tag, or CSS snippet',
      group: 'code',
    }),
    defineField({
      name: 'trackingId',
      title: 'Measurement / Tracking ID',
      type: 'string',
      description: 'e.g. GTM-XXXXXX, G-XXXXXXX, or Pixel ID',
      group: 'code',
    }),
    defineField({
      name: 'description',
      title: 'Notes & Purpose',
      type: 'text',
      rows: 2,
      group: 'details',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      scriptType: 'scriptType',
      placement: 'placement',
      enabled: 'enabled',
    },
    prepare: ({ title, scriptType, placement, enabled }) => ({
      title: `${enabled ? '🟢' : '⚪'} ${title || 'Untitled Script'}`,
      subtitle: `${scriptType || 'script'} · ${placement || 'head'} · ${enabled ? 'Active' : 'Disabled'}`,
    }),
  },
});
