import { useState } from 'react';
import type { DocumentActionDescription, DocumentActionProps } from 'sanity';
import { IntentLink } from 'sanity/router';
import { Box, Card, Stack, Text } from '@sanity/ui';
import { documentVoice, isGuideActive, VOICE_DISCLAIMER, VOICE_FIELDS } from '../lib/voice';
import { useVoiceGuide } from '../lib/useVoiceGuide';

/** "Check voice" — lists every rule match in this document, linked to its field. */
export function CheckVoiceAction(props: DocumentActionProps): DocumentActionDescription | null {
  const guide = useVoiceGuide();
  const [open, setOpen] = useState(false);
  if (!VOICE_FIELDS[props.type]) return null;

  const status = guide?.status; // read before isGuideActive narrows `guide`
  const active = isGuideActive(guide);
  const doc = (props.draft || props.published) as Record<string, unknown> | null;
  const results = active ? documentVoice(doc, props.type, guide) : [];
  const id = String(props.id).replace(/^drafts\./, '');

  const content = !active ? (
    <Text size={1}>
      The brand voice guide is {status ? `“${status}”` : 'not set up'}. Checks run once it is Approved in
      Site Settings → Brand voice.
    </Text>
  ) : results.length === 0 ? (
    <Text size={1}>No voice rule issues in this document.</Text>
  ) : (
    <Stack space={4}>
      {results.map((r) => (
        <Card key={r.field} padding={3} radius={2} tone="caution" border>
          <Stack space={3}>
            <Text size={1} weight="semibold">
              <IntentLink intent="edit" params={{ id, type: props.type, path: r.field }}>
                {r.field} — jump to field
              </IntentLink>
            </Text>
            {r.failed.map((c) => (
              <Box key={c.id}>
                <Text size={1} weight="medium">{c.label}</Text>
                <Text size={1} muted>{c.hint}</Text>
                {c.matches.map((m, i) => (
                  <Text key={i} size={1} style={{ marginTop: 4 }}>• {m}</Text>
                ))}
              </Box>
            ))}
          </Stack>
        </Card>
      ))}
    </Stack>
  );

  return {
    label: 'Check voice',
    onHandle: () => setOpen(true),
    dialog: open
      ? {
          type: 'dialog',
          header: `Voice check — ${VOICE_DISCLAIMER}`,
          onClose: () => setOpen(false),
          content,
        }
      : null,
  };
}
