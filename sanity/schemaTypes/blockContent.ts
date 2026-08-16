import { defineType, defineField } from 'sanity';

// Modular content blocks — same flexibility as Framer CMS
export const blockContent = defineType({
  name: 'blockContent',
  title: 'Content Blocks',
  type: 'array',
  of: [
    { type: 'block', title: 'Rich Text', styles: [{ title: 'Normal', value: 'normal' }, { title: 'H2', value: 'h2' }, { title: 'H3', value: 'h3' }, { title: 'Quote', value: 'blockquote' }],
      marks: { decorators: [{ title: 'Bold', value: 'strong' }, { title: 'Italic', value: 'em' }, { title: 'Code', value: 'code' }],
        annotations: [{ name: 'link', type: 'object', fields: [{ name: 'href', type: 'url' }, { name: 'blank', type: 'boolean', title: 'Open in new tab' }] }],
      },
    },
    { type: 'image', title: 'Image', options: { hotspot: true }, fields: [
      { name: 'alt', type: 'string', title: 'Alt text' },
      { name: 'caption', type: 'string', title: 'Caption' },
    ]},
    { type: 'video', title: 'Video' },
    { type: 'mediaUrl', title: 'Media URL' },
    { type: 'cta', title: 'Call to Action' },
    { type: 'stats', title: 'Stats Row' },
    { type: 'accordion', title: 'Accordion / FAQ' },
    { type: 'logoCloud', title: 'Logo Cloud' },
    { type: 'code', title: 'Code Block' },
    { type: 'twoColumns', title: 'Two Columns' },
  ],
});

export const cta = defineType({
  name: 'cta', title: 'Call to Action', type: 'object',
  fields: [
    { name: 'heading', type: 'string' },
    { name: 'body', type: 'text', rows: 2 },
    { name: 'buttonText', type: 'string', initialValue: 'Get in Touch' },
    { name: 'buttonUrl', type: 'string', initialValue: '/contact-us' },
  ],
  preview: {
    select: { title: 'heading', subtitle: 'buttonText' },
    prepare: ({ title, subtitle }: any) => ({
      title: title || 'Call to Action',
      subtitle: subtitle ? String(subtitle).replace(/&/g, 'and') : '',
    }),
  },
});

export const stats = defineType({
  name: 'stats', title: 'Stats Row', type: 'object',
  fields: [
    { name: 'items', type: 'array', of: [{ type: 'object', fields: [
      { name: 'number', type: 'string', title: 'Stat (e.g. "150+")' },
      { name: 'label', type: 'string' },
      { name: 'description', type: 'text', rows: 2 },
    ]}], validation: (r) => r.max(4) },
  ],
  preview: {
    select: { items: 'items' },
    prepare: ({ items }: any) => ({
      title: items?.[0]?.label || items?.[0]?.number || 'Stats Row',
      subtitle: `${items?.length || 0} item${items?.length !== 1 ? 's' : ''}`,
    }),
  },
});

export const accordion = defineType({
  name: 'accordion', title: 'Accordion / FAQ', type: 'object',
  fields: [
    { name: 'title', type: 'string' },
    { name: 'items', type: 'array', of: [{ type: 'object', fields: [
      { name: 'question', type: 'string' },
      { name: 'answer', type: 'text', rows: 3 },
    ]}]},
  ],
  preview: {
    select: { title: 'title', items: 'items' },
    prepare: ({ title, items }: any) => ({
      title: title || 'Accordion / FAQ',
      subtitle: `${items?.length || 0} item${items?.length !== 1 ? 's' : ''}`,
    }),
  },
});

export const logoCloud = defineType({
  name: 'logoCloud', title: 'Logo Cloud', type: 'object',
  fields: [
    { name: 'title', type: 'string' },
    { name: 'logos', type: 'array', of: [{ type: 'image', options: { hotspot: true }, fields: [
      { name: 'alt', type: 'string' },
      { name: 'link', type: 'url' },
    ]}]},
  ],
  preview: {
    select: { title: 'title', logos: 'logos' },
    prepare: ({ title, logos }: any) => ({
      title: title || 'Logo Cloud',
      subtitle: `${logos?.length || 0} logo${logos?.length !== 1 ? 's' : ''}`,
    }),
  },
});

export const mediaUrl = defineType({
  name: 'mediaUrl', title: 'Media URL', type: 'object',
  fields: [
    { name: 'url', type: 'url', title: 'Media URL', description: 'Image or video URL (R2/local path or full URL)' },
    { name: 'caption', type: 'string', title: 'Caption' },
    { name: 'alt', type: 'string', title: 'Alt text' },
  ],
  preview: {
    select: { title: 'caption', subtitle: 'url' },
    prepare: ({ title, subtitle }: any) => ({
      title: title || 'Media',
      subtitle: subtitle ? String(subtitle).replace(/&/g, 'and') : '',
    }),
  },
});

export const video = defineType({
  name: 'video', title: 'Video', type: 'object',
  fields: [
    { name: 'url', type: 'url', title: 'Video URL', description: 'YouTube, Vimeo, or direct MP4 URL' },
    { name: 'poster', type: 'image', title: 'Poster Image' },
    { name: 'caption', type: 'string' },
    { name: 'autoplay', type: 'boolean', initialValue: false },
    { name: 'muted', type: 'boolean', initialValue: true },
    { name: 'loop', type: 'boolean', initialValue: false },
  ],
  preview: {
    select: { title: 'caption', subtitle: 'url' },
    prepare: ({ title, subtitle }: any) => ({
      title: title || 'Video',
      subtitle: subtitle ? String(subtitle).replace(/&/g, 'and') : '',
    }),
  },
});

export const codeBlock = defineType({
  name: 'code', title: 'Code Block', type: 'object',
  fields: [
    { name: 'language', type: 'string', options: { list: ['JavaScript', 'TypeScript', 'Python', 'CSS', 'HTML', 'SQL', 'Bash', 'JSON', 'Other'] } },
    { name: 'code', type: 'text', rows: 8, title: 'Code' },
  ],
  preview: {
    select: { title: 'language', subtitle: 'code' },
    prepare: ({ title, subtitle }: any) => ({
      title: title || 'Code Block',
      subtitle: subtitle ? String(subtitle).substring(0, 60) : '',
    }),
  },
});

export const twoColumns = defineType({
  name: 'twoColumns', title: 'Two Columns', type: 'object',
  fields: [
    { name: 'left', type: 'blockContent', title: 'Left Column' },
    { name: 'right', type: 'blockContent', title: 'Right Column' },
    { name: 'layout', type: 'string', options: { list: ['50/50', '60/40', '40/60'] }, initialValue: '50/50' },
  ],
  preview: {
    select: { title: 'layout' },
    prepare: ({ title }: any) => ({
      title: title || 'Two Columns',
      subtitle: title || '50/50',
    }),
  },
});
