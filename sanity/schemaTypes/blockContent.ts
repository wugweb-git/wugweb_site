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
  preview: { select: { title: 'heading', subtitle: 'buttonText' } },
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
  preview: { select: { title: 'items' } },
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
  preview: { select: { title: 'title' } },
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
  preview: { select: { title: 'title' } },
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
  preview: { select: { title: 'caption', subtitle: 'url' } },
});

export const twoColumns = defineType({
  name: 'twoColumns', title: 'Two Columns', type: 'object',
  fields: [
    { name: 'left', type: 'blockContent', title: 'Left Column' },
    { name: 'right', type: 'blockContent', title: 'Right Column' },
    { name: 'layout', type: 'string', options: { list: ['50/50', '60/40', '40/60'] }, initialValue: '50/50' },
  ],
  preview: { select: { title: 'layout' } },
});
