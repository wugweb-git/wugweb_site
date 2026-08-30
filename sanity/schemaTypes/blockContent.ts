import { defineType } from 'sanity';
import {
  CtaPreview,
  StatsPreview,
  AccordionPreview,
  VideoPreview,
  CodePreview,
  TwoColumnsPreview,
  LogoCloudPreview,
  CalloutPreview,
  QuoteBlockPreview,
  ComparisonTablePreview,
} from '../components/BlockPreviews';
import {
  LaunchIcon,
  BarChartIcon,
  HelpCircleIcon,
  PlayIcon,
  ImageIcon,
  CodeBlockIcon,
  SplitHorizontalIcon,
  ImagesIcon,
  InfoOutlineIcon,
  StarIcon,
  ThListIcon,
  LinkIcon,
  DocumentIcon,
} from '@sanity/icons';

// Modular content blocks — same flexibility as Framer CMS
export const blockContent = defineType({
  name: 'blockContent',
  title: 'Content Blocks',
  type: 'array',
  of: [
    {
      type: 'block',
      title: 'Rich Text',
      styles: [
        { title: 'Normal', value: 'normal' },
        { title: 'H2', value: 'h2' },
        { title: 'H3', value: 'h3' },
        { title: 'H4', value: 'h4' },
        { title: 'Quote', value: 'blockquote' },
      ],
      marks: {
        decorators: [
          { title: 'Bold', value: 'strong' },
          { title: 'Italic', value: 'em' },
          { title: 'Code', value: 'code' },
          { title: 'Underline', value: 'underline' },
          { title: 'Strike', value: 'strike-through' },
          {
            title: 'Highlight',
            value: 'highlight',
            icon: () => '🟡',
          },
        ],
        annotations: [
          {
            name: 'link',
            title: 'External Link',
            type: 'object',
            icon: LinkIcon,
            fields: [
              { name: 'href', type: 'url', title: 'URL' },
              { name: 'blank', type: 'boolean', title: 'Open in new tab', initialValue: true },
            ],
          },
          {
            name: 'internalLink',
            title: 'Internal Document Link',
            type: 'object',
            icon: DocumentIcon,
            fields: [
              {
                name: 'reference',
                type: 'reference',
                title: 'Reference Document',
                to: [
                  { type: 'post' },
                  { type: 'caseStudy' },
                  { type: 'service' },
                  { type: 'singletonPage' },
                ],
              },
            ],
          },
        ],
      },
    },
    {
      type: 'image',
      title: 'Image',
      options: { hotspot: true },
      icon: ImageIcon,
      fields: [
        { name: 'alt', type: 'string', title: 'Alt text' },
        { name: 'caption', type: 'string', title: 'Caption' },
      ],
    },
    { type: 'callout', title: 'Callout / Alert', icon: InfoOutlineIcon },
    { type: 'quoteBlock', title: 'Quote / Testimonial', icon: StarIcon },
    { type: 'comparisonTable', title: 'Comparison Table', icon: ThListIcon },
    { type: 'table', title: 'Data Table', icon: ThListIcon },
    { type: 'video', title: 'Video', icon: PlayIcon },
    { type: 'mediaUrl', title: 'Media URL', icon: ImageIcon },
    { type: 'cta', title: 'Call to Action', icon: LaunchIcon },
    { type: 'stats', title: 'Stats Row', icon: BarChartIcon },
    { type: 'accordion', title: 'Accordion / FAQ', icon: HelpCircleIcon },
    { type: 'logoCloud', title: 'Logo Cloud', icon: ImagesIcon },
    { type: 'code', title: 'Code Block', icon: CodeBlockIcon },
    { type: 'twoColumns', title: 'Two Columns', icon: SplitHorizontalIcon },
  ],
});

export const callout = defineType({
  name: 'callout',
  title: 'Callout / Alert',
  type: 'object',
  icon: InfoOutlineIcon,
  components: {
    preview: CalloutPreview,
  },
  fields: [
    {
      name: 'type',
      title: 'Callout Type',
      type: 'string',
      options: {
        list: [
          { title: 'Info (Blue)', value: 'info' },
          { title: 'Tip (Green)', value: 'tip' },
          { title: 'Warning (Orange)', value: 'warning' },
          { title: 'Success (Green)', value: 'success' },
          { title: 'Quote (Gold)', value: 'quote' },
        ],
      },
      initialValue: 'info',
    },
    { name: 'title', title: 'Title / Heading', type: 'string' },
    { name: 'text', title: 'Callout Body Text', type: 'text', rows: 3 },
  ],
  preview: {
    select: { type: 'type', title: 'title', text: 'text' },
  },
});

export const quoteBlock = defineType({
  name: 'quoteBlock',
  title: 'Quote / Testimonial',
  type: 'object',
  icon: StarIcon,
  components: {
    preview: QuoteBlockPreview,
  },
  fields: [
    { name: 'quote', title: 'Quote Text', type: 'text', rows: 3, validation: (r) => r.required() },
    { name: 'author', title: 'Author Name', type: 'string' },
    { name: 'role', title: 'Author Role / Title', type: 'string' },
    { name: 'company', title: 'Company / Organization', type: 'string' },
    { name: 'avatar', title: 'Author Avatar', type: 'image', options: { hotspot: true } },
  ],
  preview: {
    select: { title: 'quote', subtitle: 'author', media: 'avatar' },
  },
});

export const comparisonTable = defineType({
  name: 'comparisonTable',
  title: 'Comparison / Key-Value Table',
  type: 'object',
  icon: ThListIcon,
  components: {
    preview: ComparisonTablePreview,
  },
  fields: [
    { name: 'title', title: 'Table Title', type: 'string' },
    {
      name: 'columns',
      title: 'Column Headers',
      type: 'array',
      of: [{ type: 'string' }],
      initialValue: ['Feature', 'Standard', 'Advanced'],
      validation: (r) => r.min(2).max(4),
    },
    {
      name: 'rows',
      title: 'Table Rows',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'feature', type: 'string', title: 'Row Item / Feature' },
            { name: 'col1', type: 'string', title: 'Column 1 Value' },
            { name: 'col2', type: 'string', title: 'Column 2 Value' },
            { name: 'col3', type: 'string', title: 'Column 3 Value' },
          ],
        },
      ],
    },
  ],
  preview: {
    select: { title: 'title', columns: 'columns', rows: 'rows' },
  },
});

export const cta = defineType({
  name: 'cta',
  title: 'Call to Action',
  type: 'object',
  icon: LaunchIcon,
  components: {
    preview: CtaPreview,
  },
  fields: [
    { name: 'heading', type: 'string' },
    { name: 'body', type: 'text', rows: 2 },
    { name: 'buttonText', type: 'string', initialValue: 'Get in Touch' },
    { name: 'buttonUrl', type: 'string', initialValue: '/contact-us' },
  ],
  preview: {
    select: { heading: 'heading', buttonText: 'buttonText', body: 'body' },
  },
});

export const stats = defineType({
  name: 'stats',
  title: 'Stats Row',
  type: 'object',
  icon: BarChartIcon,
  components: {
    preview: StatsPreview,
  },
  fields: [
    {
      name: 'items',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'number', type: 'string', title: 'Stat (e.g. "150+")' },
            { name: 'label', type: 'string' },
            { name: 'description', type: 'text', rows: 2 },
          ],
        },
      ],
      validation: (r) => r.max(4),
    },
  ],
  preview: {
    select: { items: 'items' },
  },
});

export const accordion = defineType({
  name: 'accordion',
  title: 'Accordion / FAQ',
  type: 'object',
  icon: HelpCircleIcon,
  components: {
    preview: AccordionPreview,
  },
  fields: [
    { name: 'title', type: 'string' },
    {
      name: 'items',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'question', type: 'string' },
            { name: 'answer', type: 'text', rows: 3 },
          ],
        },
      ],
    },
  ],
  preview: {
    select: { title: 'title', items: 'items' },
  },
});

export const logoCloud = defineType({
  name: 'logoCloud',
  title: 'Logo Cloud',
  type: 'object',
  icon: ImagesIcon,
  components: {
    preview: LogoCloudPreview,
  },
  fields: [
    { name: 'title', type: 'string' },
    {
      name: 'logos',
      type: 'array',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            { name: 'alt', type: 'string' },
            { name: 'link', type: 'url' },
          ],
        },
      ],
    },
  ],
  preview: {
    select: { title: 'title', logos: 'logos' },
  },
});

export const mediaUrl = defineType({
  name: 'mediaUrl',
  title: 'Media URL',
  type: 'object',
  icon: ImageIcon,
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
  name: 'video',
  title: 'Video',
  type: 'object',
  icon: PlayIcon,
  components: {
    preview: VideoPreview,
  },
  fields: [
    { name: 'url', type: 'url', title: 'Video URL', description: 'YouTube, Vimeo, or direct MP4 URL' },
    { name: 'poster', type: 'image', title: 'Poster Image' },
    { name: 'caption', type: 'string' },
    { name: 'autoplay', type: 'boolean', initialValue: false },
    { name: 'muted', type: 'boolean', initialValue: true },
    { name: 'loop', type: 'boolean', initialValue: false },
  ],
  preview: {
    select: { url: 'url', caption: 'caption', autoplay: 'autoplay', loop: 'loop' },
  },
});

export const codeBlock = defineType({
  name: 'code',
  title: 'Code Block',
  type: 'object',
  icon: CodeBlockIcon,
  components: {
    preview: CodePreview,
  },
  fields: [
    {
      name: 'language',
      type: 'string',
      options: { list: ['JavaScript', 'TypeScript', 'Python', 'CSS', 'HTML', 'SQL', 'Bash', 'JSON', 'Other'] },
    },
    { name: 'code', type: 'text', rows: 8, title: 'Code' },
  ],
  preview: {
    select: { language: 'language', code: 'code' },
  },
});

export const twoColumns = defineType({
  name: 'twoColumns',
  title: 'Two Columns',
  type: 'object',
  icon: SplitHorizontalIcon,
  components: {
    preview: TwoColumnsPreview,
  },
  fields: [
    { name: 'left', type: 'blockContent', title: 'Left Column' },
    { name: 'right', type: 'blockContent', title: 'Right Column' },
    { name: 'layout', type: 'string', options: { list: ['50/50', '60/40', '40/60'] }, initialValue: '50/50' },
  ],
  preview: {
    select: { layout: 'layout' },
  },
});
