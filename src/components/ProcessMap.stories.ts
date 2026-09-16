import type { Meta, StoryObj } from '@storybook-astro/framework';
import ProcessMap, { type ProcessPhase } from './ProcessMap.astro';

/**
 * "How we work" orbital map, one per service pillar. Spec:
 * `kits_design_system/docs/blocks/process-map.md`.
 *
 * Interaction to check in the canvas: hover a hub or step chip to light its
 * phase and the edges touching it; move the pointer near an edge to feel the
 * spring pull the curve toward it (desktop ≥900px — below that it collapses
 * to the vertical `.pm-run` rail).
 */
const meta: Meta<typeof ProcessMap> = {
  title: 'Blocks/Process Map',
  component: ProcessMap,
  parameters: { layout: 'fullscreen' },
};
export default meta;

type Story = StoryObj<typeof ProcessMap>;

const experiencePhases: ProcessPhase[] = [
  { name: 'Discovery', outcome: 'Shared problem definition', steps: ['Stakeholder interviews', 'Usage audit', 'Opportunity map'] },
  { name: 'Research', outcome: 'Validated user insight', steps: ['Field studies', 'Journey mapping', 'Synthesis workshop'] },
  { name: 'Architecture', outcome: 'Information structure', steps: ['IA models', 'Flow diagrams', 'Content model'] },
  { name: 'Build', outcome: 'Working product surface', steps: ['Prototyping', 'UI systemisation', 'Dev handoff'] },
  { name: 'Scale', outcome: 'Measured, iterated release', steps: ['Usability testing', 'Rollout plan', 'Instrumentation'] },
];

export const Experience: Story = {
  args: {
    eyebrow: 'How we work',
    heading: 'Our Experience Framework',
    lede: 'Five phases, one continuous thread from research to shipped product.',
    phases: experiencePhases,
    shape: 'wave',
  },
};

export const Ascending: Story = {
  args: {
    heading: 'Our Strategy Framework',
    phases: experiencePhases.slice(0, 4),
    shape: 'ascending',
  },
};

export const WithLoop: Story = {
  name: 'With return loop',
  args: {
    heading: 'Our Growth Framework',
    phases: experiencePhases,
    shape: 'zigzag',
    loopTo: 0,
    loopLabel: 'Compound',
  },
};

export const LowSensitivity: Story = {
  name: 'Springs — low sensitivity',
  args: {
    heading: 'Springs — tuned down',
    phases: experiencePhases.slice(0, 3),
    shape: 'line',
    sensitivity: 0.15,
    returnSpeed: 0.2,
    oscillation: 0.2,
  },
};
