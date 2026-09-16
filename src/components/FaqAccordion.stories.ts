import type { Meta, StoryObj } from '@storybook-astro/framework';
import FaqAccordion from './FaqAccordion.astro';

/**
 * FAQ accordion (reference: fabrica.framer.media). Interaction to check in
 * the canvas: click a question — it expands, animating height from 0 to its
 * measured content height, and closes any other open card (exclusive).
 */
const meta: Meta<typeof FaqAccordion> = {
  title: 'Blocks/FAQ Accordion',
  component: FaqAccordion,
  parameters: { layout: 'padded' },
};
export default meta;

type Story = StoryObj<typeof FaqAccordion>;

const items = [
  { q: 'What does a typical engagement look like?', a: 'Most projects start with a scoped discovery sprint — a fixed-fee, fixed-timeline pass that ends in a clear go/no-go before any larger build begins.' },
  { q: 'Which industries have you worked in?', a: 'Forty-four and counting, from early-stage fintech to established D2C and SaaS brands. The framework stays the same; the specifics never do.' },
  { q: 'Do you work with in-house teams?', a: 'Yes — as an embedded extension, a second team running in parallel, or a short specialist engagement to unblock a specific phase.' },
  { q: 'How is a project priced?', a: 'Fixed-fee per phase by default. We scope before we quote, so the number you see is the number you pay.' },
];

export const Default: Story = {
  args: {
    heading: 'Frequently asked questions',
    lede: 'Everything we get asked before a project starts.',
    items,
  },
};

export const Bare: Story = {
  name: 'Bare (no heading)',
  args: { items },
};

export const SecondOpenByDefault: Story = {
  args: { items, openFirst: 1 },
};
