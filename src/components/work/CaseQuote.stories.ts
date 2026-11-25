import type { Meta, StoryObj } from '@storybook-astro/framework';
import CaseQuote from './CaseQuote.astro';
import { image, video, poster, clip, six, tiles, results, milestones, related, screens } from './story-fixtures';

/**
 * A pull quote with an optional attribution. Part of the case study layout on /work/preview/<slug>.
 * Spec: kits_design_system/docs/blocks/case-study.md.
 */
const meta: Meta<typeof CaseQuote> = {
  title: 'Case study/Quote',
  component: CaseQuote,
  parameters: { layout: 'padded' },
};
export default meta;

type Story = StoryObj<typeof CaseQuote>;

export const Default: Story = {
  args: { block: { type: 'quote', chapterId: 'ch-1', text: 'The new flow is the first one our members have not asked us to explain.', by: 'Head of Product, Sample Client' } },
};

