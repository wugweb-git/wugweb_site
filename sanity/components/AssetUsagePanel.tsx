import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Badge, Button, Card, Flex, Select, Stack, Text, TextInput, useToast } from '@sanity/ui';
import {
  ASSIGN_TARGETS,
  assetWritePath,
  assignedValue,
  diffTopLevel,
  randomKey,
  removeAsset,
  toRel,
  type AssignField,
  type AssetPaths,
} from '../lib/assetUsage';

const BORDER = 'var(--card-border-color, rgba(128,128,128,0.25))';
const MUTED = 'var(--card-muted-fg-color, #6e7683)';

export interface PanelAsset extends AssetPaths {
  _id: string;
  name?: string;
  displayName?: string;
}

interface UsageEntry {
  _key: string;
  _type?: string;
  kind?: 'content' | 'code';
  label?: string;
  field?: string;
  docId?: string;
  docType?: string;
}

/** What a change did, so it can be reversed. `before` holds only the fields it touched. */
export interface UndoEntry {
  title: string;
  assetId: string;
  usedByBefore: UsageEntry[];
  docs: { id: string; before: Record<string, any>; touched: string[] }[];
}

interface Props {
  asset: PanelAsset;
  client: any;
  undo: UndoEntry[];
  pushUndo: (e: UndoEntry) => void;
  popUndo: () => void;
  onChanged: () => void;
}

/** Sanity's revision-conflict error is cryptic; say what to do. */
function friendly(e: any): string {
  const m = String(e?.message || e || 'Unknown error');
  if (/revision|conflict|ifRevisionID/i.test(m)) return 'The document changed while you were working. Reload the list and try again.';
  if (/permission|unauthor|forbidden/i.test(m)) return 'You do not have permission to edit this document.';
  return m;
}

const draftId = (id: string) => `drafts.${id.replace(/^drafts\./, '')}`;
const publishedId = (id: string) => id.replace(/^drafts\./, '');

export function AssetUsagePanel({ asset, client, undo, pushUndo, popUndo, onChanged }: Props) {
  const toast = useToast();
  // Keep the latest toast in a ref so effects never re-run just because the context object changed.
  const toastRef = useRef(toast);
  toastRef.current = toast;
  const [usedBy, setUsedBy] = useState<UsageEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [confirm, setConfirm] = useState<string | null>(null);

  const [type, setType] = useState(ASSIGN_TARGETS[0].type);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<{ _id: string; label: string }[]>([]);
  const [target, setTarget] = useState<{ _id: string; label: string } | null>(null);
  const [fieldKey, setFieldKey] = useState(ASSIGN_TARGETS[0].fields[0].key);
  const [currentValue, setCurrentValue] = useState<string>('');

  const targetDef = useMemo(() => ASSIGN_TARGETS.find((t) => t.type === type) ?? ASSIGN_TARGETS[0], [type]);
  const field: AssignField = useMemo(
    () => targetDef.fields.find((f) => f.key === fieldKey) ?? targetDef.fields[0],
    [targetDef, fieldKey],
  );

  const loadUsage = useCallback(async () => {
    setLoading(true);
    try {
      const doc = await client.fetch(`*[_id == $id][0]{ usedBy }`, { id: asset._id });
      setUsedBy(Array.isArray(doc?.usedBy) ? doc.usedBy : []);
    } catch (e: any) {
      toastRef.current.push({ status: 'error', title: 'Could not load usage', description: friendly(e) });
    } finally {
      setLoading(false);
    }
  }, [client, asset._id]);

  useEffect(() => {
    setConfirm(null);
    setTarget(null);
    loadUsage();
  }, [loadUsage]);

  // Reset the field when the document type changes.
  useEffect(() => {
    setFieldKey(targetDef.fields[0].key);
    setTarget(null);
    setResults([]);
  }, [targetDef]);

  // Document search (debounced).
  useEffect(() => {
    let live = true;
    const t = setTimeout(async () => {
      try {
        const q = query.trim();
        const rows = await client.fetch(
          q
            ? `*[_type == $t && !(_id in path("drafts.**")) && coalesce(title, name, client, pageId, slug.current, "") match $q][0...10]{ _id, "label": coalesce(title, name, client, pageId, slug.current, _id) }`
            : `*[_type == $t && !(_id in path("drafts.**"))] | order(_updatedAt desc)[0...10]{ _id, "label": coalesce(title, name, client, pageId, slug.current, _id) }`,
          { t: type, q: `${q}*` },
        );
        if (live) setResults(rows ?? []);
      } catch {
        if (live) setResults([]);
      }
    }, 250);
    return () => {
      live = false;
      clearTimeout(t);
    };
  }, [client, type, query]);

  // Show what the chosen string field currently holds, so a replace is never a surprise.
  useEffect(() => {
    let live = true;
    setCurrentValue('');
    if (!target || field.kind !== 'string') return;
    client
      .getDocument(target._id)
      .then((d: any) => {
        if (live) setCurrentValue(typeof d?.[field.key] === 'string' ? d[field.key] : '');
      })
      .catch(() => {});
    return () => {
      live = false;
    };
  }, [client, target, field]);

  const grouped = useMemo(() => {
    const m = new Map<string, { docId: string; label: string; fields: string[]; docType?: string }>();
    usedBy
      .filter((u) => u.kind === 'content' && u.docId)
      .forEach((u) => {
        const g = m.get(u.docId!) ?? { docId: u.docId!, label: u.label || u.docId!, fields: [], docType: u.docType };
        if (u.field) g.fields.push(u.field);
        m.set(u.docId!, g);
      });
    return [...m.values()];
  }, [usedBy]);
  const codeUses = usedBy.filter((u) => u.kind === 'code');

  const writeUsage = async (next: UsageEntry[]) => {
    await client.patch(asset._id).set({ usedBy: next, usedByCount: next.length }).commit();
    setUsedBy(next);
  };

  const unassign = async (docId: string) => {
    setBusy(true);
    const docs: UndoEntry['docs'] = [];
    try {
      for (const id of [publishedId(docId), draftId(docId)]) {
        const doc = await client.getDocument(id);
        if (!doc) continue;
        const { value, removed } = removeAsset(doc, asset);
        if (!removed) continue;
        const { set, unset } = diffTopLevel(doc, value);
        const touched = [...Object.keys(set), ...unset];
        if (!touched.length) continue;
        let p = client.patch(id).ifRevisionId(doc._rev);
        if (Object.keys(set).length) p = p.set(set);
        if (unset.length) p = p.unset(unset);
        await p.commit();
        docs.push({ id, before: Object.fromEntries(touched.map((k) => [k, doc[k]])), touched });
      }
      if (!docs.length) {
        toast.push({ status: 'warning', title: 'Nothing to remove', description: 'This file is no longer referenced by that document.' });
      }
      const next = usedBy.filter((u) => u.docId !== docId);
      pushUndo({ title: `Unassigned from ${docId}`, assetId: asset._id, usedByBefore: usedBy, docs });
      await writeUsage(next);
      toast.push({ status: 'success', title: 'Unassigned', description: 'Removed from the document. Undo is available.' });
      onChanged();
    } catch (e: any) {
      // If the published doc was patched but the draft failed, the change is real: record it so Undo works.
      if (docs.length) pushUndo({ title: `Partly unassigned from ${docId}`, assetId: asset._id, usedByBefore: usedBy, docs });
      toast.push({ status: 'error', title: 'Unassign failed', description: friendly(e) });
    } finally {
      setBusy(false);
      setConfirm(null);
    }
  };

  const assign = async () => {
    if (!target) return;
    const path = assetWritePath(asset);
    if (!path) {
      toast.push({ status: 'error', title: 'This asset has no path to assign' });
      return;
    }
    setBusy(true);
    const docs: UndoEntry['docs'] = [];
    try {
      let found = 0;
      for (const id of [publishedId(target._id), draftId(target._id)]) {
        const doc = await client.getDocument(id);
        if (!doc) continue;
        found++;
        const nextValue = assignedValue(field, doc[field.key], path);
        if (JSON.stringify(nextValue) === JSON.stringify(doc[field.key])) continue;
        await client.patch(id).ifRevisionId(doc._rev).set({ [field.key]: nextValue }).commit();
        docs.push({ id, before: { [field.key]: doc[field.key] }, touched: [field.key] });
      }
      if (!found) throw new Error('That document no longer exists.');
      const entry: UsageEntry = {
        _key: randomKey(),
        _type: 'assetUsage',
        kind: 'content',
        label: `${type}: ${target.label}`,
        field: field.key,
        docId: publishedId(target._id),
        docType: type,
      };
      const next = [...usedBy.filter((u) => !(u.docId === entry.docId && u.field === entry.field)), entry];
      pushUndo({ title: `Assigned to ${target.label}`, assetId: asset._id, usedByBefore: usedBy, docs });
      await writeUsage(next);
      toast.push({
        status: 'success',
        title: docs.length ? 'Assigned' : 'Already assigned',
        description: `${field.label} on ${target.label}`,
      });
      setConfirm(null);
      onChanged();
    } catch (e: any) {
      if (docs.length) pushUndo({ title: `Partly assigned to ${target.label}`, assetId: asset._id, usedByBefore: usedBy, docs });
      toast.push({ status: 'error', title: 'Assign failed', description: friendly(e) });
    } finally {
      setBusy(false);
    }
  };

  const undoLast = async () => {
    const last = undo[undo.length - 1];
    if (!last) return;
    setBusy(true);
    try {
      for (const d of last.docs) {
        const doc = await client.getDocument(d.id);
        if (!doc) continue;
        const set: Record<string, any> = {};
        const unset: string[] = [];
        for (const k of d.touched) {
          if (d.before[k] === undefined) unset.push(k);
          else set[k] = d.before[k];
        }
        let p = client.patch(d.id);
        if (Object.keys(set).length) p = p.set(set);
        if (unset.length) p = p.unset(unset);
        await p.commit();
      }
      await client.patch(last.assetId).set({ usedBy: last.usedByBefore, usedByCount: last.usedByBefore.length }).commit();
      popUndo();
      if (last.assetId === asset._id) setUsedBy(last.usedByBefore);
      toast.push({ status: 'success', title: 'Undone', description: last.title });
      onChanged();
    } catch (e: any) {
      toast.push({ status: 'error', title: 'Undo failed', description: friendly(e) });
    } finally {
      setBusy(false);
    }
  };

  const sameValue = field.kind === 'string' && currentValue && toRel(currentValue) === toRel(assetWritePath(asset));
  const replaces = field.kind === 'string' && currentValue && !sameValue;

  return (
    <Stack space={3} style={{ borderTop: `1px solid ${BORDER}`, paddingTop: 12 }}>
      {/* Used by */}
      <Stack space={2}>
        <Flex align="center" gap={2}>
          <Text size={1} weight="bold">Used by</Text>
          <Badge fontSize={0} tone={usedBy.length ? 'positive' : 'caution'}>{loading ? '…' : usedBy.length}</Badge>
        </Flex>
        {!loading && !usedBy.length && (
          <Text size={0} muted>Nothing references this file. Assign it below.</Text>
        )}
        {grouped.map((g) => (
          <Card key={g.docId} padding={2} radius={2} border>
            <Stack space={2}>
              <Text size={1} weight="semibold">{g.label}</Text>
              <Text size={0} style={{ color: MUTED, fontFamily: 'monospace', wordBreak: 'break-all' }}>
                {g.fields.join(', ')}
              </Text>
              {confirm === `un:${g.docId}` ? (
                <Flex gap={2}>
                  <Button text="Confirm remove" tone="critical" fontSize={0} padding={2} disabled={busy} onClick={() => unassign(g.docId)} />
                  <Button text="Cancel" mode="ghost" fontSize={0} padding={2} onClick={() => setConfirm(null)} />
                </Flex>
              ) : (
                <Button text="Unassign" mode="ghost" tone="critical" fontSize={0} padding={2} disabled={busy} onClick={() => setConfirm(`un:${g.docId}`)} />
              )}
            </Stack>
          </Card>
        ))}
        {codeUses.length > 0 && (
          <Text size={0} muted>
            Also referenced in code ({codeUses.map((c) => c.label).join(', ')}) — edit those in the repo.
          </Text>
        )}
      </Stack>

      {/* Assign */}
      <Stack space={2} style={{ borderTop: `1px solid ${BORDER}`, paddingTop: 12 }}>
        <Text size={1} weight="bold">Assign to…</Text>
        <Select value={type} onChange={(e) => setType(e.currentTarget.value)} aria-label="Document type">
          {ASSIGN_TARGETS.map((t) => (
            <option key={t.type} value={t.type}>{t.label}</option>
          ))}
        </Select>
        <TextInput
          placeholder={`Search ${targetDef.label.toLowerCase()}…`}
          value={query}
          onChange={(e) => setQuery(e.currentTarget.value)}
          aria-label="Search documents"
        />
        <Stack space={1} style={{ maxHeight: 150, overflowY: 'auto' }}>
          {results.map((r) => (
            <Button
              key={r._id}
              text={r.label}
              mode={target?._id === r._id ? 'default' : 'ghost'}
              tone={target?._id === r._id ? 'primary' : 'default'}
              fontSize={0}
              padding={2}
              style={{ textAlign: 'left', justifyContent: 'flex-start' }}
              onClick={() => { setTarget(r); setConfirm(null); }}
            />
          ))}
          {!results.length && <Text size={0} muted>No matches.</Text>}
        </Stack>
        <Select value={field.key} onChange={(e) => { setFieldKey(e.currentTarget.value); setConfirm(null); }} aria-label="Field">
          {targetDef.fields.map((f) => (
            <option key={f.key} value={f.key}>{f.label}</option>
          ))}
        </Select>
        {replaces && (
          <Text size={0} style={{ color: 'var(--card-badge-caution-fg-color, #b36b00)', wordBreak: 'break-all' }}>
            Replaces the current {field.label.toLowerCase()}: {currentValue}
          </Text>
        )}
        {sameValue && <Text size={0} muted>Already set to this file.</Text>}
        {confirm === 'assign' ? (
          <Flex gap={2}>
            <Button text="Confirm assign" tone="primary" fontSize={0} padding={2} disabled={busy || !target} onClick={assign} />
            <Button text="Cancel" mode="ghost" fontSize={0} padding={2} onClick={() => setConfirm(null)} />
          </Flex>
        ) : (
          <Button
            text={target ? `Assign to ${target.label}` : 'Pick a document first'}
            tone="primary"
            fontSize={1}
            disabled={busy || !target || !!sameValue}
            onClick={() => setConfirm('assign')}
          />
        )}
      </Stack>

      {undo.length > 0 && (
        <Button
          text={`Undo: ${undo[undo.length - 1].title}`}
          mode="ghost"
          fontSize={0}
          padding={2}
          disabled={busy}
          onClick={undoLast}
        />
      )}
    </Stack>
  );
}

export default AssetUsagePanel;
