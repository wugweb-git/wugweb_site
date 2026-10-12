/**
 * Voice tool — every post, case study, page and service with its voice rule
 * issues, a "has voice issues" filter, and the matched text per field.
 *
 * Read-only: one GROQ query when the tool opens. With a draft guide it still
 * runs, clearly labelled as a preview, so the guide can be tuned before it is
 * approved; validation warnings and badges stay off until then.
 */
import { useEffect, useMemo, useState } from 'react';
import { useClient } from 'sanity';
import { IntentLink } from 'sanity/router';
import { Box, Button, Card, Checkbox, Flex, Spinner, Stack, Text } from '@sanity/ui';
import { documentVoice, isGuideActive, VOICE_DISCLAIMER, VOICE_FIELDS, type FieldVoiceResult } from '../lib/voice';
import { useVoiceGuide } from '../lib/useVoiceGuide';

const TYPES = Object.keys(VOICE_FIELDS);
const FIELDS = [...new Set(Object.values(VOICE_FIELDS).flat())];
const QUERY = `*[_type in $types && !(_id in path("drafts.**"))] | order(_type asc, title asc) {
  _id, _type, ${FIELDS.join(', ')}
}`;

interface Row {
  _id: string;
  _type: string;
  title?: string;
  results: FieldVoiceResult[];
  issues: number;
}

export function VoiceTool() {
  const client = useClient({ apiVersion: '2026-01-01' });
  const guide = useVoiceGuide();
  const [docs, setDocs] = useState<Record<string, unknown>[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [onlyIssues, setOnlyIssues] = useState(true);
  const [open, setOpen] = useState<Record<string, boolean>>({});

  useEffect(() => {
    client.fetch(QUERY, { types: TYPES }).then(setDocs).catch((e) => setError(String(e?.message ?? e)));
  }, [client]);

  const rows: Row[] = useMemo(() => {
    if (!docs || !guide) return [];
    return docs.map((d) => {
      const results = documentVoice(d, String(d._type), guide);
      return { _id: String(d._id), _type: String(d._type), title: d.title as string, results, issues: results.reduce((n, r) => n + r.failed.length, 0) };
    });
  }, [docs, guide]);

  const shown = onlyIssues ? rows.filter((r) => r.issues > 0) : rows;

  return (
    <Box padding={4}>
      <Stack space={4}>
        <Text size={3} weight="bold">Voice</Text>
        <Card padding={3} radius={2} tone={isGuideActive(guide) ? 'primary' : 'caution'} border>
          <Text size={1}>
            {VOICE_DISCLAIMER}{' '}
            {!guide
              ? 'No voice guide found in Site Settings → Brand voice.'
              : isGuideActive(guide)
                ? 'Guide approved — field warnings and badges are on.'
                : 'Guide is a DRAFT — this is a preview. Field warnings and badges stay off until it is approved.'}
          </Text>
        </Card>

        {error ? <Text size={1}>Could not load documents: {error}</Text> : null}
        {!docs && !error ? <Spinner /> : null}

        {docs && guide ? (
          <>
            <Flex align="center" gap={2}>
              <Checkbox id="voice-only-issues" checked={onlyIssues} onChange={() => setOnlyIssues((v) => !v)} />
              <Text size={1}>
                <label htmlFor="voice-only-issues">Has voice issues</label> — {rows.filter((r) => r.issues > 0).length} of {rows.length} documents
              </Text>
            </Flex>
            <Stack space={2}>
              {shown.map((r) => (
                <Card key={r._id} padding={3} radius={2} border>
                  <Flex align="center" gap={3}>
                    <Box flex={1}>
                      <Text size={1}>
                        <IntentLink intent="edit" params={{ id: r._id, type: r._type }}>{r.title || r._id}</IntentLink>
                        <span style={{ opacity: 0.6 }}> · {r._type}</span>
                      </Text>
                    </Box>
                    <Text size={1} weight="semibold">{r.issues ? `${r.issues} issue${r.issues === 1 ? '' : 's'}` : 'OK'}</Text>
                    {r.issues ? (
                      <Button mode="ghost" fontSize={1} padding={2} text={open[r._id] ? 'Hide' : 'Show'} onClick={() => setOpen((o) => ({ ...o, [r._id]: !o[r._id] }))} />
                    ) : null}
                  </Flex>
                  {open[r._id] ? (
                    <Stack space={3} marginTop={3}>
                      {r.results.map((fr) => (
                        <Stack key={fr.field} space={2}>
                          <Text size={1} weight="semibold">
                            <IntentLink intent="edit" params={{ id: r._id, type: r._type, path: fr.field }}>{fr.field}</IntentLink>
                          </Text>
                          {fr.failed.map((c) => (
                            <Box key={c.id} paddingLeft={2}>
                              <Text size={1}>{c.label} — <span style={{ opacity: 0.7 }}>{c.hint}</span></Text>
                              {c.matches.map((m, i) => (
                                <Text key={i} size={1} muted style={{ marginTop: 2 }}>• {m}</Text>
                              ))}
                            </Box>
                          ))}
                        </Stack>
                      ))}
                    </Stack>
                  ) : null}
                </Card>
              ))}
            </Stack>
          </>
        ) : null}
      </Stack>
    </Box>
  );
}
