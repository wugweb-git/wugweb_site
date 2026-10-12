/**
 * Native Sanity validation WARNINGS for brand voice. Never blocks publishing.
 *
 * The guide is loaded once per Studio session and cached for 5 minutes, shared
 * with the badge, action, tool and field help. No guide, a draft guide, or a
 * failed fetch all produce NO warnings — never noise, never an error.
 */
import { isGuideActive, voiceChecks, voiceSummary, type VoiceGuide } from './voice.ts';

export const GUIDE_QUERY = `*[_type == "siteSettings" && !(_id in path("drafts.**"))][0]{
  status, persona, audience, toneWords, writingPrinciples, doList, dontList,
  preferredTerms[]{use, insteadOf}, bannedWords, spelling, readingLevelMax,
  maxSentenceWords, sampleGood, sampleBad
}`;

const TTL_MS = 5 * 60_000;
type Loader = () => Promise<VoiceGuide | null | undefined>;

let cache: { guide: VoiceGuide | null; at: number } | null = null;
let inflight: Promise<VoiceGuide | null> | null = null;

export function getCachedGuide(load: Loader, now = Date.now()): Promise<VoiceGuide | null> {
  if (cache && now - cache.at < TTL_MS) return Promise.resolve(cache.guide);
  if (!inflight) {
    inflight = Promise.resolve()
      .then(load)
      .then((g) => g ?? null)
      .catch(() => null) // a failed fetch means no warnings, not an error
      .then((guide) => {
        cache = { guide, at: Date.now() };
        return guide;
      })
      .finally(() => {
        inflight = null;
      });
  }
  return inflight;
}

/** Test seam. */
export function resetGuideCache(): void {
  cache = null;
  inflight = null;
}

/** Pure core: `true` (no warning) or a message saying what matched and the fix. Never throws. */
export async function voiceValidate(value: unknown, load: Loader): Promise<true | string> {
  try {
    if (value == null || value === '' || (Array.isArray(value) && value.length === 0)) return true;
    const guide = await getCachedGuide(load);
    if (!isGuideActive(guide)) return true;
    const failed = voiceChecks(value, guide).filter((c) => !c.pass);
    return failed.length ? voiceSummary(failed) : true;
  } catch {
    return true;
  }
}

/** A Sanity rule: warning level only, so it shows on the field and never blocks publish. */
export function voiceRule(rule: any): any {
  return rule
    .custom((value: unknown, ctx: any) =>
      voiceValidate(value, () => ctx.getClient({ apiVersion: '2026-01-01' }).fetch(GUIDE_QUERY)),
    )
    .warning();
}
