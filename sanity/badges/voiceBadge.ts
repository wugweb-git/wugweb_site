import type { DocumentBadgeDescription, DocumentBadgeProps } from 'sanity';
import { documentVoice, isGuideActive, VOICE_DISCLAIMER, VOICE_FIELDS } from '../lib/voice';
import { useVoiceGuide } from '../lib/useVoiceGuide';

/** Voice badge. Silent until the guide is approved — no noise from a draft. */
export function VoiceBadge(props: DocumentBadgeProps): DocumentBadgeDescription | null {
  const guide = useVoiceGuide();
  if (!VOICE_FIELDS[props.type] || !isGuideActive(guide)) return null;
  const results = documentVoice((props.draft || props.published) as Record<string, unknown> | null, props.type, guide);
  const issues = results.reduce((n, r) => n + r.failed.length, 0);
  if (!issues) return { label: 'Voice OK', title: `No voice rule issues. ${VOICE_DISCLAIMER}`, color: 'success' };
  return {
    label: `Voice · ${issues}`,
    title: `${issues} voice rule issue${issues === 1 ? '' : 's'} in ${results.map((r) => r.field).join(', ')}. Use "Check voice" for the matches. ${VOICE_DISCLAIMER}`,
    color: 'warning',
  };
}
