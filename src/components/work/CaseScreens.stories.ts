import type { Meta, StoryObj } from '@storybook-astro/framework';
import CaseScreens from './CaseScreens.astro';
import { image, video, poster, clip, six, tiles, results, milestones, related, screens } from './story-fixtures';

/**
 * Every screen, grouped into chips by audience and flow, with counts and a lightbox. Part of the case study layout on /work/preview/<slug>.
 * Spec: kits_design_system/docs/blocks/case-study.md.
 */
const meta: Meta<typeof CaseScreens> = {
  title: 'Case study/All screens',
  component: CaseScreens,
  parameters: { layout: 'padded' },
};
export default meta;

type Story = StoryObj<typeof CaseScreens>;

export const Default: Story = {
  args: { block: { type: 'screens', sets: [ { audience: 'member', flows: [ { flow: 'onboarding', label: 'Onboarding', items: screens([poster.kia, poster.xsafe, poster.xstream, poster.abc], 'Onboarding') }, { flow: 'rewards', label: 'Rewards', items: screens([poster.gratifi, poster.metcred, poster.inkompass], 'Rewards') } ] }, { audience: 'admin', flows: [ { flow: 'unsorted', items: screens([poster.cartier, poster.adneto], 'Back office') } ] } ] } },
};

