import type { Meta, StoryObj } from '@storybook-astro/framework';
import PostCard from './PostCard.astro';
import { poster } from './work/story-fixtures';

/**
 * The one blog card: cover, topic, title, two line excerpt and byline. Used on
 * /blog and every teaser. Below 768px a `row` card collapses to a compact row.
 */
const meta: Meta<typeof PostCard> = {
  title: 'Components/Post Card',
  component: PostCard,
  parameters: { layout: 'padded' },
};
export default meta;

type Story = StoryObj<typeof PostCard>;

const card = {
  slug: 'sample-post',
  title: 'How a clear brief saves a month of rework',
  excerpt: 'A short, specific brief is the cheapest thing you can fix before a project starts. Here is what goes in it.',
  topic: 'Strategy',
  topicSlug: 'strategy',
  publishedAt: '2026-11-10',
  readingTime: 5,
  author: { name: 'Wugweb Design' },
  coverUrl: poster.adtech,
  coverAlt: 'Sample cover',
  accent: 'var(--color-yellow)',
  pillar: 'strategy',
  initials: 'WD',
};

export const Default: Story = { args: { card } };
export const Row: Story = { args: { card, row: true } };
