import type { Meta, StoryObj } from '@storybook-astro/framework';
import CasePair from './CasePair.astro';
import { image, video, poster, clip, six, tiles, results, milestones, related, screens } from './story-fixtures';

/**
 * Two related images shown as a pair. Part of the case study layout on /work/preview/<slug>.
 * Spec: kits_design_system/docs/blocks/case-study.md.
 */
const meta: Meta<typeof CasePair> = {
  title: 'Case study/Pair',
  component: CasePair,
  parameters: { layout: 'padded' },
};
export default meta;

type Story = StoryObj<typeof CasePair>;

export const Default: Story = {
  args: { block: { type: 'pair', chapterId: 'ch-1', left: image(poster.abc, 'Home'), right: image(poster.gratifi, 'Rewards') } },
};

