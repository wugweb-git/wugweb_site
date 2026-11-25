import type { Meta, StoryObj } from '@storybook-astro/framework';
import CaseStats from './CaseStats.astro';
import { image, video, poster, clip, six, tiles, results, milestones, related, screens } from './story-fixtures';

/**
 * Headline numbers, each with what it measures and where it came from. Also renders the results block. Part of the case study layout on /work/preview/<slug>.
 * Spec: kits_design_system/docs/blocks/case-study.md.
 */
const meta: Meta<typeof CaseStats> = {
  title: 'Case study/Stats',
  component: CaseStats,
  parameters: { layout: 'padded' },
};
export default meta;

type Story = StoryObj<typeof CaseStats>;

export const Default: Story = {
  args: { block: { type: 'stats', items: results } },
};

export const Results: Story = {
  args: { block: { type: 'results', items: results } },
};
