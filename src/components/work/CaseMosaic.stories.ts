import type { Meta, StoryObj } from '@storybook-astro/framework';
import CaseMosaic from './CaseMosaic.astro';
import { image, video, poster, clip, six, tiles, results, milestones, related, screens } from './story-fixtures';

/**
 * A mosaic of mixed images that keeps every file at its own ratio. Part of the case study layout on /work/preview/<slug>.
 * Spec: kits_design_system/docs/blocks/case-study.md.
 */
const meta: Meta<typeof CaseMosaic> = {
  title: 'Case study/Mosaic',
  component: CaseMosaic,
  parameters: { layout: 'padded' },
};
export default meta;

type Story = StoryObj<typeof CaseMosaic>;

export const Default: Story = {
  args: { block: { type: 'mosaic', chapterId: 'ch-1', items: six } },
};

