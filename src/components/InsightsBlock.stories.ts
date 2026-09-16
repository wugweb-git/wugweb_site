import type { Meta, StoryObj } from '@storybook-astro/framework';
import InsightsBlock, { type InsightPost } from './InsightsBlock.astro';

/**
 * The single blog teaser block — used on the homepage, every service page
 * (filtered to that pillar), and as the global fallback in `BaseLayout`.
 * There must never be more than one of these on a page (deploy gate,
 * 2026-09-16).
 */
const meta: Meta<typeof InsightsBlock> = {
  title: 'Blocks/Insights',
  component: InsightsBlock,
  parameters: { layout: 'padded' },
};
export default meta;

type Story = StoryObj<typeof InsightsBlock>;

const posts: InsightPost[] = [
  { slug: 'design-systems-that-scale', title: 'Design systems that actually scale', excerpt: 'What separates a token library from a tool teams reach for on a deadline.', category: 'Design', coverPath: 'blog/design-systems.jpg', readingTime: 6, author: { name: 'Arjun Mehta' } },
  { slug: 'brand-architecture-101', title: 'Brand architecture, plainly explained', excerpt: 'A field guide to house-of-brands versus branded-house, with real examples.', category: 'Brand', coverPath: 'blog/brand-architecture.jpg', readingTime: 4, author: { name: 'Priya Nair' } },
  { slug: 'growth-loops-vs-funnels', title: 'Growth loops vs. funnels', excerpt: 'Why the funnel framing quietly caps how big a product can get.', category: 'Growth', coverPath: 'blog/growth-loops.jpg', readingTime: 5, author: { name: 'Kabir Rao' } },
];

export const Default: Story = {
  args: {
    eyebrow: 'Insights',
    heading: 'Thoughts on design, product, and strategy',
    posts,
  },
};

export const ServiceFiltered: Story = {
  name: 'Filtered to a service pillar',
  args: {
    heading: 'Experience thinking from the team',
    ctaLabel: 'Visit our Blog',
    posts: posts.slice(0, 2),
  },
};

export const Empty: Story = {
  name: 'Empty (renders nothing upstream)',
  args: { posts: [] },
};
