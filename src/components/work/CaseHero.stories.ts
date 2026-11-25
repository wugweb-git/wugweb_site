import type { Meta, StoryObj } from '@storybook-astro/framework';
import CaseHero from './CaseHero.astro';
import { image, video, poster, clip, six, tiles, results, milestones, related, screens } from './story-fixtures';

/**
 * The top of a case study: title, client, industry, the cover at its own ratio and the hero meta keys. Part of the case study layout on /work/preview/<slug>.
 * Spec: kits_design_system/docs/blocks/case-study.md.
 */
const meta: Meta<typeof CaseHero> = {
  title: 'Case study/Hero',
  component: CaseHero,
  parameters: { layout: 'padded' },
};
export default meta;

type Story = StoryObj<typeof CaseHero>;

export const Default: Story = {
  args: { block: { type: 'hero', title: 'A clearer path through a crowded dashboard', subtitle: 'Redesigning the member dashboard so the main task takes four steps, not nine.', clientName: 'Sample Client', industry: 'Fintech', cover: image(poster.kia, 'Cover', 'cover'), meta: [ { key: 'Year', value: '2026', text: '2026', links: [] }, { key: 'Timeline', value: '12 weeks', text: '12 weeks', links: [] }, { key: 'Platform', value: 'Web and mobile', text: 'Web and mobile', links: [] } ], tags: ['Product design', 'Research'] } },
};

