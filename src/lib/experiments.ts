import { sanityClient } from './sanity';

export interface ExperimentVariant {
  id: string;
  name?: string;
  weight?: number;
}

export interface Experiment {
  _id: string;
  name: string;
  status: 'draft' | 'running' | 'paused' | 'concluded';
  variants: ExperimentVariant[];
  appliesTo: string;
  caseStudySlugs?: string[];
  winner?: string;
}

const experimentQuery = `*[_type == "experiment" && appliesTo == $appliesTo && status == "running" && $slug in caseStudySlugs][0]{
  _id, name, status, variants, appliesTo, caseStudySlugs, winner
}`;

export async function getRunningCaseStudyExperiment(slug: string): Promise<Experiment | null> {
  try {
    return await sanityClient.fetch(experimentQuery, { appliesTo: 'case-study-template', slug });
  } catch {
    return null;
  }
}

/**
 * Deterministic-ish weighted pick for a fresh visitor, or reuse of an
 * existing cookie value when it's still a valid variant on this experiment.
 * Cookie invalidation (renamed/removed variants) falls back to a fresh pick
 * rather than sticking to a variant id that no longer exists.
 */
export function pickVariant(experiment: Experiment, existingCookieValue?: string): string {
  const variants = experiment.variants || [];
  if (variants.length === 0) return 'control';

  if (existingCookieValue && variants.some((v) => v.id === existingCookieValue)) {
    return existingCookieValue;
  }

  const totalWeight = variants.reduce((sum, v) => sum + (v.weight ?? 0), 0);
  if (totalWeight <= 0) return variants[0].id;

  const rand = Math.random() * totalWeight;
  let cumulative = 0;
  for (const v of variants) {
    cumulative += v.weight ?? 0;
    if (rand < cumulative) return v.id;
  }
  return variants[variants.length - 1].id;
}
