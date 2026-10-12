import { useEffect, useState } from 'react';
import { useClient } from 'sanity';
import type { VoiceGuide } from './voice';
import { getCachedGuide, GUIDE_QUERY } from './voiceValidation';

/** The brand-voice guide, from the shared 5-minute cache. null until loaded,
 *  and null for good if there is no guide or the fetch fails. */
export function useVoiceGuide(): VoiceGuide | null {
  const client = useClient({ apiVersion: '2026-01-01' });
  const [guide, setGuide] = useState<VoiceGuide | null>(null);
  useEffect(() => {
    let alive = true;
    getCachedGuide(() => client.fetch(GUIDE_QUERY)).then((g) => {
      if (alive) setGuide(g);
    });
    return () => {
      alive = false;
    };
  }, [client]);
  return guide;
}
