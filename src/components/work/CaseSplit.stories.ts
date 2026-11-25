import type { Meta, StoryObj } from '@storybook-astro/framework';
import CaseSplit from './CaseSplit.astro';
import { image, video, poster, clip, six, tiles, results, milestones, related, screens } from './story-fixtures';

/**
 * Two images side by side, one beside the other on wide screens and stacked on phones. Part of the case study layout on /work/preview/<slug>.
 * Spec: kits_design_system/docs/blocks/case-study.md.
 */
const meta: Meta<typeof CaseSplit> = {
  title: 'Case study/Split',
  component: CaseSplit,
  parameters: { layout: 'padded' },
};
export default meta;

type Story = StoryObj<typeof CaseSplit>;

export const Default: Story = {
  args: { block: { type: 'split', chapterId: 'ch-1', left: image(poster.xsafe, 'Before', 'before'), right: image(poster.xstream, 'After', 'after') } },
};

