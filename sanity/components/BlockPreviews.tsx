import React from 'react';
import { Card, Text, Badge, Flex, Box, Stack, Code as SanityCode } from '@sanity/ui';
import {
  LaunchIcon,
  BarChartIcon,
  HelpCircleIcon,
  PlayIcon,
  ImageIcon,
  CodeBlockIcon,
  SplitHorizontalIcon,
  ImagesIcon,
} from '@sanity/icons';

// ── CTA Preview Component ──
export function CtaPreview(props: any) {
  const { heading, buttonText, body } = props || {};
  return (
    <Card padding={3} radius={2} tone="primary" border style={{ background: 'rgba(255, 208, 0, 0.04)' }}>
      <Flex align="center" justify="space-between" gap={3}>
        <Stack space={2}>
          <Flex align="center" gap={2}>
            <Badge tone="caution" fontSize={0} mode="outline">CTA BLOCK</Badge>
            <Text weight="bold" size={1}>{heading || 'Call to Action'}</Text>
          </Flex>
          {body && <Text size={0} muted>{body}</Text>}
        </Stack>
        {buttonText && (
          <Card padding={2} radius={2} tone="caution" style={{ background: '#ffd000', color: '#000' }}>
            <Flex align="center" gap={1}>
              <Text size={0} weight="bold" style={{ color: '#000' }}>{buttonText}</Text>
              <LaunchIcon style={{ color: '#000' }} />
            </Flex>
          </Card>
        )}
      </Flex>
    </Card>
  );
}

// ── Stats Preview Component ──
export function StatsPreview(props: any) {
  const items = props?.items || [];
  return (
    <Card padding={3} radius={2} tone="default" border>
      <Stack space={2}>
        <Flex align="center" gap={2}>
          <BarChartIcon />
          <Badge tone="positive" fontSize={0} mode="outline">STATS ROW ({items.length})</Badge>
        </Flex>
        <Flex gap={2} wrap="wrap">
          {items.map((item: any, idx: number) => (
            <Card key={idx} padding={2} radius={2} tone="transparent" border style={{ minWidth: 90 }}>
              <Text size={2} weight="bold" style={{ color: '#ffd000' }}>{item.number || '—'}</Text>
              <Text size={0} muted>{item.label || 'Stat label'}</Text>
            </Card>
          ))}
        </Flex>
      </Stack>
    </Card>
  );
}

// ── Accordion Preview Component ──
export function AccordionPreview(props: any) {
  const { title, items = [] } = props || {};
  return (
    <Card padding={3} radius={2} tone="default" border>
      <Stack space={2}>
        <Flex align="center" justify="space-between">
          <Flex align="center" gap={2}>
            <HelpCircleIcon />
            <Text weight="bold" size={1}>{title || 'Accordion / FAQ'}</Text>
          </Flex>
          <Badge tone="default" fontSize={0}>{items.length} Question{items.length !== 1 ? 's' : ''}</Badge>
        </Flex>
        {items.slice(0, 2).map((item: any, idx: number) => (
          <Text key={idx} size={0} muted style={{ borderLeft: '2px solid #555', paddingLeft: 6 }}>
            Q: {item.question || 'Question title'}
          </Text>
        ))}
      </Stack>
    </Card>
  );
}

// ── Video Preview Component ──
export function VideoPreview(props: any) {
  const { url, caption, autoplay, loop } = props || {};
  return (
    <Card padding={3} radius={2} tone="default" border>
      <Flex align="center" gap={3}>
        <Card padding={3} radius={2} tone="caution" style={{ background: 'rgba(255, 208, 0, 0.1)' }}>
          <PlayIcon style={{ fontSize: 24, color: '#ffd000' }} />
        </Card>
        <Stack space={1} flex={1}>
          <Flex align="center" gap={2}>
            <Badge tone="caution" fontSize={0} mode="outline">VIDEO</Badge>
            {autoplay && <Badge tone="positive" fontSize={0}>AUTOPLAY</Badge>}
            {loop && <Badge tone="default" fontSize={0}>LOOP</Badge>}
          </Flex>
          <Text size={1} textOverflow="ellipsis">{url || 'No URL specified'}</Text>
          {caption && <Text size={0} muted>Caption: {caption}</Text>}
        </Stack>
      </Flex>
    </Card>
  );
}

// ── Code Block Preview Component ──
export function CodePreview(props: any) {
  const { language, code } = props || {};
  return (
    <Card padding={3} radius={2} tone="default" border style={{ background: '#111' }}>
      <Stack space={2}>
        <Flex align="center" justify="space-between">
          <Flex align="center" gap={2}>
            <CodeBlockIcon />
            <Badge tone="primary" fontSize={0}>{language || 'CODE'}</Badge>
          </Flex>
        </Flex>
        <SanityCode size={0} style={{ maxHeight: 60, overflow: 'hidden', opacity: 0.85 }}>
          {code || '// code block'}
        </SanityCode>
      </Stack>
    </Card>
  );
}

// ── Two Columns Preview Component ──
export function TwoColumnsPreview(props: any) {
  const { layout = '50/50' } = props || {};
  return (
    <Card padding={3} radius={2} tone="default" border>
      <Stack space={2}>
        <Flex align="center" gap={2}>
          <SplitHorizontalIcon />
          <Badge tone="default" fontSize={0} mode="outline">2 COLUMNS ({layout})</Badge>
        </Flex>
        <Flex gap={2}>
          <Card padding={2} radius={2} border tone="transparent" flex={1}>
            <Text size={0} muted align="center">Left Column Content</Text>
          </Card>
          <Card padding={2} radius={2} border tone="transparent" flex={1}>
            <Text size={0} muted align="center">Right Column Content</Text>
          </Card>
        </Flex>
      </Stack>
    </Card>
  );
}

// ── Logo Cloud Preview Component ──
export function LogoCloudPreview(props: any) {
  const { title, logos = [] } = props || {};
  return (
    <Card padding={3} radius={2} tone="default" border>
      <Flex align="center" justify="space-between">
        <Flex align="center" gap={2}>
          <ImagesIcon />
          <Text weight="bold" size={1}>{title || 'Logo Cloud'}</Text>
        </Flex>
        <Badge tone="positive" fontSize={0}>{logos.length} Logos</Badge>
      </Flex>
    </Card>
  );
}

// ── Callout Preview Component ──
export function CalloutPreview(props: any) {
  const { type = 'info', title, text } = props || {};
  const toneMap: Record<string, 'primary' | 'positive' | 'caution' | 'critical' | 'default'> = {
    info: 'primary',
    tip: 'positive',
    warning: 'caution',
    success: 'positive',
    quote: 'default',
  };
  const tone = toneMap[type] || 'default';

  return (
    <Card padding={3} radius={2} tone={tone} border style={{ background: 'rgba(255, 208, 0, 0.03)' }}>
      <Stack space={2}>
        <Flex align="center" gap={2}>
          <Badge tone={tone} fontSize={0} mode="outline">
            {type.toUpperCase()}
          </Badge>
          <Text weight="bold" size={1}>{title || 'Notice / Callout'}</Text>
        </Flex>
        {text && <Text size={0} muted>{text}</Text>}
      </Stack>
    </Card>
  );
}

// ── Quote Block Preview Component ──
export function QuoteBlockPreview(props: any) {
  const { quote, author, role, company } = props || {};
  return (
    <Card padding={3} radius={2} tone="default" border style={{ borderLeft: '3px solid #ffd000' }}>
      <Stack space={2}>
        <Text size={1} style={{ fontStyle: 'italic' }}>
          "{quote || 'Quote text…'}"
        </Text>
        {(author || role || company) && (
          <Text size={0} muted>
            — <strong>{author || 'Anonymous'}</strong>
            {role ? `, ${role}` : ''}
            {company ? ` @ ${company}` : ''}
          </Text>
        )}
      </Stack>
    </Card>
  );
}

// ── Comparison Table Preview Component ──
export function ComparisonTablePreview(props: any) {
  const { title, columns = [], rows = [] } = props || {};
  return (
    <Card padding={3} radius={2} tone="default" border>
      <Stack space={2}>
        <Flex align="center" justify="space-between">
          <Text weight="bold" size={1}>{title || 'Comparison Table'}</Text>
          <Badge tone="default" fontSize={0}>{rows.length} Rows</Badge>
        </Flex>
        {columns.length > 0 && (
          <Flex gap={2} wrap="wrap">
            {columns.map((c: string, idx: number) => (
              <Badge key={idx} tone="primary" mode="outline" fontSize={0}>{c}</Badge>
            ))}
          </Flex>
        )}
      </Stack>
    </Card>
  );
}

