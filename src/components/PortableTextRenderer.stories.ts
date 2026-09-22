import type { Meta, StoryObj } from '@storybook-astro/framework';
import PortableTextRenderer from './PortableTextRenderer.astro';

/**
 * Renders Sanity Portable Text — used on blog/case-study detail pages and
 * legal pages. Fixtures below are plain-text blocks (no Sanity image refs),
 * since a story shouldn't depend on a live Sanity connection to render.
 */
const meta: Meta<typeof PortableTextRenderer> = {
  title: 'Components/Portable Text Renderer',
  component: PortableTextRenderer,
  parameters: { layout: 'padded' },
};
export default meta;

type Story = StoryObj<typeof PortableTextRenderer>;

const richValue = [
  {
    _type: 'block',
    style: 'h2',
    children: [{ _type: 'span', text: 'Why structured content wins' }],
  },
  {
    _type: 'block',
    style: 'normal',
    children: [
      { _type: 'span', text: 'A ' },
      { _type: 'span', text: 'design system', marks: ['strong'] },
      { _type: 'span', text: ' is only as good as the ' },
      { _type: 'span', text: 'content model', marks: ['em'] },
      { _type: 'span', text: ' underneath it.' },
    ],
  },
  {
    _type: 'block',
    style: 'normal',
    listItem: 'bullet',
    children: [{ _type: 'span', text: 'Separate structure from presentation' }],
  },
  {
    _type: 'block',
    style: 'normal',
    listItem: 'bullet',
    children: [{ _type: 'span', text: 'Reference, don’t duplicate' }],
  },
  {
    _type: 'block',
    style: 'blockquote',
    children: [{ _type: 'span', text: 'Content that outlives the template it was written for.' }],
  },
];

export const Default: Story = {
  args: { value: richValue },
};

export const Empty: Story = {
  args: { value: [] },
};

/**
 * All four callout types + a code block. Exercises the token mapping fixed
 * 2026-09-22 — every colour here should resolve to a real global.css token
 * (--color-blue / --color-feedback-success / --color-feedback-error /
 * --color-accent-primary), not an invented literal.
 */
export const CalloutsAndCode: Story = {
  name: 'Callouts & code',
  args: {
    value: [
      { _type: 'callout', type: 'info', title: 'Info', text: 'A neutral note worth calling out.' },
      { _type: 'callout', type: 'success', title: 'Success', text: 'This worked as intended.' },
      { _type: 'callout', type: 'warning', title: 'Warning', text: 'Something needs attention before shipping.' },
      { _type: 'callout', type: 'quote', title: 'Quote', text: 'A pulled quote, given the accent treatment.' },
      { _type: 'code', language: 'ts', code: "export function initFaq(): void {\n  // ...\n}" },
    ],
  },
};
