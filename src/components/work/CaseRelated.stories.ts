import type { Meta, StoryObj } from '@storybook-astro/framework';
import CaseRelated from './CaseRelated.astro';
import { image, video, poster, clip, six, tiles, results, milestones, related, screens } from './story-fixtures';

/**
 * Other case studies to read next. Also renders the single next block. Part of the case study layout on /work/preview/<slug>.
 * Spec: kits_design_system/docs/blocks/case-study.md.
 */
const meta: Meta<typeof CaseRelated> = {
  title: 'Case study/Related',
  component: CaseRelated,
  parameters: { layout: 'padded' },
};
export default meta;

type Story = StoryObj<typeof CaseRelated>;

export const Default: Story = {
  args: { block: { type: 'related', items: related } },
};

export const Next: Story = {
  args: { block: { type: 'next', item: related[0] } },
};
