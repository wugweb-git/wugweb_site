import type { Meta, StoryObj } from '@storybook-astro/framework';
import CasePoints from './CasePoints.astro';
import { image, video, poster, clip, six, tiles, results, milestones, related, screens } from './story-fixtures';

/**
 * Three to four short points under a chapter, each with an optional group label and title. Part of the case study layout on /work/preview/<slug>.
 * Spec: kits_design_system/docs/blocks/case-study.md.
 */
const meta: Meta<typeof CasePoints> = {
  title: 'Case study/Points',
  component: CasePoints,
  parameters: { layout: 'padded' },
};
export default meta;

type Story = StoryObj<typeof CasePoints>;

export const Default: Story = {
  args: { block: { type: 'points', chapterId: 'ch-1', items: tiles } },
};

