import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'brandAsset',
  title: 'Brand Asset & Icon',
  type: 'document',
  groups: [
    { name: 'details', title: 'Asset Details' },
    { name: 'media', title: 'Media & Code' },
    { name: 'usage', title: 'Usage & Specs' },
  ],
  fields: [
    defineField({
      name: 'name',
      title: 'Asset Name',
      type: 'string',
      validation: (r) => r.required(),
      group: 'details',
    }),
    defineField({
      name: 'slug',
      title: 'Slug / Identifier',
      type: 'slug',
      options: { source: 'name' },
      validation: (r) => r.required(),
      group: 'details',
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Logo Lockup', value: 'logo-lockup' },
          { title: 'Logo Mark / Icon', value: 'logo-mark' },
          { title: 'Favicon', value: 'favicon' },
          { title: 'Social OG Image', value: 'social-og' },
          { title: 'Vector Icon / Toolkit SVG', value: 'vector-icon' },
          { title: 'Device Mockup / Backdrop', value: 'device-graphic' },
          { title: 'UI Texture / Grain', value: 'ui-texture' },
        ],
      },
      validation: (r) => r.required(),
      group: 'details',
    }),
    defineField({
      name: 'variant',
      title: 'Variant / Theme',
      type: 'string',
      options: {
        list: [
          { title: 'Default / Universal', value: 'default' },
          { title: 'Dark Mode (Light on Dark)', value: 'dark' },
          { title: 'Light Mode (Dark on Light)', value: 'light' },
          { title: 'Monochrome Ash', value: 'monochrome' },
          { title: 'Yellow Accent', value: 'yellow' },
        ],
      },
      initialValue: 'default',
      group: 'details',
    }),
    defineField({
      name: 'file',
      title: 'Upload File',
      type: 'file',
      group: 'media',
    }),
    defineField({
      name: 'image',
      title: 'Preview Image',
      type: 'image',
      options: { hotspot: true },
      group: 'media',
    }),
    defineField({
      name: 'svgContent',
      title: 'Inline SVG Code',
      type: 'text',
      rows: 6,
      description: 'Raw SVG markup for direct inline rendering',
      group: 'media',
    }),
    defineField({
      name: 'path',
      title: 'Local / R2 Asset Path',
      type: 'string',
      description: 'e.g. /brand/logo-large.svg or assets/brand/logo.png',
      group: 'media',
    }),
    defineField({
      name: 'dimensions',
      title: 'Dimensions / Ratio',
      type: 'string',
      description: 'e.g. 149x54 or 16:9',
      group: 'usage',
    }),
    defineField({
      name: 'usageNotes',
      title: 'Usage Guidelines & Placement',
      type: 'text',
      rows: 3,
      group: 'usage',
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'Active', value: 'Active' },
          { title: 'Deprecated', value: 'Deprecated' },
          { title: 'Draft', value: 'Draft' },
        ],
      },
      initialValue: 'Active',
      group: 'details',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      category: 'category',
      variant: 'variant',
      media: 'image',
    },
    prepare: ({ title, category, variant, media }) => ({
      title: title || 'Untitled Brand Asset',
      subtitle: `${category || 'Asset'} · ${variant || 'default'}`,
      media,
    }),
  },
});
