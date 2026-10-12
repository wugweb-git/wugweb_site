import React, { useEffect, useRef, useState } from 'react';
import { Stack, Text, TextInput, useToast } from '@sanity/ui';
import { friendly } from './AssetUsagePanel';

interface Props {
  assetId: string;
  alt?: string;
  client: any;
  /** Called with the saved value so the parent list can update without a refetch. */
  onSaved: (alt: string) => void;
  /** Compact = list cell (no label/help). */
  compact?: boolean;
  disabled?: boolean;
}

/** Edits `asset.alt` on the published doc. Saves on blur / Enter, guarded by ifRevisionId. */
export function AssetAltField({ assetId, alt = '', client, onSaved, compact, disabled }: Props) {
  const toast = useToast();
  const toastRef = useRef(toast);
  toastRef.current = toast;
  const [value, setValue] = useState(alt);
  const [saving, setSaving] = useState(false);
  useEffect(() => setValue(alt), [alt, assetId]);

  const save = async () => {
    const next = value.trim();
    if (next === (alt || '').trim() || saving) return;
    setSaving(true);
    try {
      const doc = await client.getDocument(assetId);
      if (!doc) throw new Error('That asset no longer exists.');
      const p = client.patch(assetId).ifRevisionId(doc._rev);
      await (next ? p.set({ alt: next }) : p.unset(['alt'])).commit();
      setValue(next);
      onSaved(next);
      toastRef.current.push({ status: 'success', title: next ? 'Alt saved' : 'Alt cleared' });
    } catch (e: any) {
      setValue(alt);
      toastRef.current.push({ status: 'error', title: 'Could not save alt', description: friendly(e) });
    } finally {
      setSaving(false);
    }
  };

  const len = value.trim().length;
  const outOfRange = len > 0 && (len < 5 || len > 125);
  const input = (
    <TextInput
      fontSize={compact ? 0 : 1}
      padding={compact ? 2 : 3}
      value={value}
      disabled={disabled || saving}
      placeholder={compact ? 'Add alt…' : 'What the image shows'}
      aria-label="Alt text"
      onChange={(e) => setValue(e.currentTarget.value)}
      onBlur={save}
      onKeyDown={(e) => {
        if (e.key === 'Enter') (e.currentTarget as HTMLInputElement).blur();
      }}
      onClick={compact ? (e) => e.stopPropagation() : undefined}
    />
  );
  if (compact) return input;
  return (
    <Stack space={2}>
      <Text size={1} weight="bold">Alt text</Text>
      {input}
      <Text size={0} muted>
        {outOfRange ? `${len} characters; aim for 5–125. ` : ''}
        What the image shows, for screen readers and search. Leave empty for decorative images and videos.
      </Text>
    </Stack>
  );
}

export default AssetAltField;
