import type { Meta, StoryObj } from '@storybook-astro/framework';
import CaseTimeline from './CaseTimeline.astro';
import { image, video, poster, clip, six, tiles, results, milestones, related, screens } from './story-fixtures';

/**
 * The project in dated steps. Part of the case study layout on /work/preview/<slug>.
 * Spec: kits_design_system/docs/blocks/case-study.md.
 */
const meta: Meta<typeof CaseTimeline> = {
  title: 'Case study/Timeline',
  component: CaseTimeline,
  parameters: { layout: 'padded' },
};
export default meta;

type Story = StoryObj<typeof CaseTimeline>;

export const Default: Story = {
  args: { block: { type: 'timeline', chapterId: 'ch-1', items: milestones } },
};

