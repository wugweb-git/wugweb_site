/**
 * Attaches brand-voice checks to the target fields of post, caseStudy,
 * singletonPage and service — in ONE place, so the schema files themselves
 * are not edited and this is trivial to remove.
 *
 *   - validation: the field's existing rules are kept, and a voice WARNING
 *     rule is appended (never blocks publishing).
 *   - description: title / excerpt / summary get "write it like this / not
 *     like this" examples, drawn from the guide, ONLY once it is approved.
 */
import { isGuideActive, VOICE_FIELDS, VOICE_HELP_FIELDS } from './voice';
import { voiceRule } from './voiceValidation';
import { useVoiceGuide } from './useVoiceGuide';

function VoiceHelp({ base }: { base?: unknown }) {
  const guide = useVoiceGuide();
  const good = isGuideActive(guide) ? (guide.sampleGood ?? []).find((s) => s?.trim()) : undefined;
  const bad = isGuideActive(guide) ? (guide.sampleBad ?? []).find((s) => s?.trim()) : undefined;
  return (
    <span>
      {typeof base === 'string' ? base : null}
      {good ? <span style={{ display: 'block', marginTop: 4 }}>Write it like this: “{good}”</span> : null}
      {bad ? <span style={{ display: 'block' }}>Not like this: “{bad}”</span> : null}
    </span>
  );
}

function withVoiceRule(existing: unknown) {
  return (rule: any) => {
    const base = typeof existing === 'function' ? existing(rule) : existing;
    const list = base == null ? [] : Array.isArray(base) ? base : [base];
    return [...list, voiceRule(rule)];
  };
}

/** Returns the schema types with voice checks attached. Reports what it touched. */
export function withVoice<T extends { name: string; fields?: any[] }>(types: T[]): T[] {
  return types.map((type) => {
    const targets = VOICE_FIELDS[type.name];
    if (!targets || !Array.isArray(type.fields)) return type;
    return {
      ...type,
      fields: type.fields.map((field: any) => {
        if (!targets.includes(field?.name)) return field;
        const next = { ...field, validation: withVoiceRule(field.validation) };
        if (VOICE_HELP_FIELDS.has(field.name) && (field.description == null || typeof field.description === 'string')) {
          next.description = <VoiceHelp base={field.description} />;
        }
        return next;
      }),
    };
  });
}
