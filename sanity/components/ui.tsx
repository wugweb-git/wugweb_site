import { Badge, Box, Flex, Text, Tooltip } from '@sanity/ui';
import type { ReactNode } from 'react';
import { initials, relativeTime } from '../lib/format';
import { seoLevel, COMPLETENESS_HELP, type Severity } from '../lib/health';

/* ─────────────────────────── Status badge ─────────────────────────── */

const STATUS_TONE: Record<string, 'positive' | 'caution' | 'critical' | 'neutral' | 'primary'> = {
  active: 'positive',
  completed: 'positive',
  live: 'positive',
  published: 'positive',
  synced: 'positive',
  'Active': 'positive',
  pending: 'caution',
  planned: 'caution',
  'Pending': 'caution',
  onhold: 'caution',
  'on-hold': 'caution',
  error: 'critical',
  disabled: 'critical',
  archived: 'neutral',
  'Archived': 'neutral',
  draft: 'neutral',
  inactive: 'neutral',
  'Inactive': 'neutral',
  reserved: 'neutral',
  'Reserved': 'neutral',
};

const STATUS_LABEL: Record<string, string> = {
  active: 'Active',
  completed: 'Completed',
  live: 'Live',
  published: 'Published',
  synced: 'Synced',
  pending: 'Pending',
  planned: 'Planned',
  onhold: 'On hold',
  'on-hold': 'On hold',
  error: 'Error',
  disabled: 'Disabled',
  archived: 'Archived',
  draft: 'Draft',
  inactive: 'Inactive',
  reserved: 'Reserved',
};

export function StatusBadge({ value }: { value: string | null | undefined }) {
  if (!value) return <Badge tone="neutral" muted>—</Badge>;
  const tone = STATUS_TONE[value.toLowerCase()] ?? 'neutral';
  const label = STATUS_LABEL[value.toLowerCase()] ?? value;
  return <Badge tone={tone} fontSize={1}>{label}</Badge>;
}

/* ─────────────────────────── Health / SEO ─────────────────────────── */

const SEO_TONE: Record<Severity, 'positive' | 'caution' | 'critical'> = {
  good: 'positive',
  warn: 'caution',
  bad: 'critical',
};

export function SeoBadge({ score }: { score: number }) {
  const { label, severity } = seoLevel(score);
  return (
    <Tooltip content={`Completeness: ${score}/100 — ${label}. ${COMPLETENESS_HELP}`} placement="top">
      <Badge tone={SEO_TONE[severity]} fontSize={1}>{score}</Badge>
    </Tooltip>
  );
}

/** Small dot-style health flag chip. */
export function HealthFlagChip({ severity, label }: { severity: Severity; label: string }) {
  const tone = SEO_TONE[severity];
  return (
    <Badge tone={tone} fontSize={1} mode="outline">
      {label}
    </Badge>
  );
}

/* ─────────────────────────── Thumbnail ─────────────────────────── */

const MEDIA_EMOJI: Record<string, string> = {
  video: '🎬',
  image: '🖼',
  svg: '🧩',
  audio: '🎵',
};

export function Thumb({ row }: { row: Record<string, unknown> }) {
  const mediaType = String(row.mediaType ?? row.media_type ?? '').toLowerCase();
  const url = row.thumbnailUrl || row.imageUrl || row.coverImageUrl || row.url;
  const emoji = MEDIA_EMOJI[mediaType] ?? '📄';
  return (
    <Box
      style={{
        width: 40,
        height: 40,
        borderRadius: 6,
        overflow: 'hidden',
        background: 'var(--card-muted-bg-color, #f1f3f5)',
        display: 'grid',
        placeItems: 'center',
        flexShrink: 0,
      }}
    >
      {typeof url === 'string' && url ? (
        <img src={url} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      ) : (
        <Text size={2}>{emoji}</Text>
      )}
    </Box>
  );
}

/* ─────────────────────────── Author avatar ─────────────────────────── */

export function AuthorAvatar({ name, url }: { name?: string | null; url?: string | null }) {
  const label = name || '?';
  return (
    <Tooltip content={label} placement="top">
      <Flex
        align="center"
        justify="center"
        style={{
          width: 24,
          height: 24,
          borderRadius: '50%',
          background: 'var(--card-muted-bg-color, #e6e8eb)',
          flexShrink: 0,
          overflow: 'hidden',
          fontSize: 10,
          fontWeight: 600,
        }}
      >
        {url ? (
          <img src={url} alt={label} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        ) : (
          initials(label)
        )}
      </Flex>
    </Tooltip>
  );
}

/* ─────────────────────────── Relative time ─────────────────────────── */

export function UpdatedTime({ iso }: { iso?: string | null }) {
  if (!iso) return <Text size={1} muted>—</Text>;
  return (
    <Tooltip content={iso} placement="top">
      <Text size={1} muted style={{ whiteSpace: 'nowrap' }}>
        {relativeTime(iso)}
      </Text>
    </Tooltip>
  );
}

/* ─────────────────────────── Draft / Published ─────────────────────────── */

export function PublishState({ row }: { row: Record<string, unknown> }) {
  const draft = Boolean(row._draft);
  const published = Boolean(row._id) && !String(row._id).startsWith('drafts.');
  if (draft) return <Badge tone="neutral">Draft</Badge>;
  return published ? <Badge tone="positive">Published</Badge> : <Badge tone="neutral">Draft</Badge>;
}

/* ─────────────────────────── Empty state ─────────────────────────── */

export function EmptyState({
  icon = '📭',
  title,
  body,
  action,
}: {
  icon?: string;
  title: string;
  body?: ReactNode;
  action?: ReactNode;
}) {
  return (
    <Flex direction="column" align="center" justify="center" padding={6} style={{ minHeight: 240, textAlign: 'center' }}>
      <Text size={4}>{icon}</Text>
      <Text size={2} weight="semibold" muted style={{ marginTop: 8 }}>
        {title}
      </Text>
      {body && (
        <Text size={1} muted style={{ marginTop: 4, maxWidth: 420 }}>
          {body}
        </Text>
      )}
      {action && <Box style={{ marginTop: 12 }}>{action}</Box>}
    </Flex>
  );
}

/* ─────────────────────────── Loading skeleton ─────────────────────────── */

export function RowSkeleton({ cols }: { cols: number }) {
  return (
    <Flex direction="column" gap={1} padding={3}>
      {Array.from({ length: 6 }).map((_, i) => (
        <Flex key={i} gap={2} align="center" padding={1}>
          <Box style={{ width: 40, height: 40, borderRadius: 6, background: 'var(--card-muted-bg-color, #eee)' }} />
          {Array.from({ length: cols }).map((_, j) => (
            <Box
              key={j}
              style={{
                height: 12,
                flex: 1,
                borderRadius: 4,
                background: 'var(--card-muted-bg-color, #eee)',
                opacity: 1 - j * 0.15,
              }}
            />
          ))}
        </Flex>
      ))}
    </Flex>
  );
}
