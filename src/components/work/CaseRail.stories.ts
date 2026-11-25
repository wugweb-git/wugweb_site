import type { Meta, StoryObj } from '@storybook-astro/framework';
import CaseRail from './CaseRail.astro';
import { image, video, poster, clip, six, tiles, results, milestones, related, screens } from './story-fixtures';

/**
 * A horizontal rail of screens, keyboard and swipe reachable. Check the arrow keys in the canvas. Part of the case study layout on /work/preview/<slug>.
 * Spec: kits_design_system/docs/blocks/case-study.md.
 */
const meta: Meta<typeof CaseRail> = {
  title: 'Case study/Rail',
  component: CaseRail,
  parameters: { layout: 'padded' },
};
export default meta;

type Story = StoryObj<typeof CaseRail>;

export const Default: Story = {
  args: { block: { type: 'rail', chapterId: 'ch-1', flow: 'Onboarding', items: six } },
};

