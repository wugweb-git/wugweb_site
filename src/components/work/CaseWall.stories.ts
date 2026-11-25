import type { Meta, StoryObj } from '@storybook-astro/framework';
import CaseWall from './CaseWall.astro';
import { image, video, poster, clip, six, tiles, results, milestones, related, screens } from './story-fixtures';

/**
 * A dense wall of many small images, for logos, patterns or applications. Part of the case study layout on /work/preview/<slug>.
 * Spec: kits_design_system/docs/blocks/case-study.md.
 */
const meta: Meta<typeof CaseWall> = {
  title: 'Case study/Wall',
  component: CaseWall,
  parameters: { layout: 'padded' },
};
export default meta;

type Story = StoryObj<typeof CaseWall>;

export const Default: Story = {
  args: { block: { type: 'wall', chapterId: 'ch-1', items: [...six, ...six] } },
};

