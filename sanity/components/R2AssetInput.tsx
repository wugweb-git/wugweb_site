import React, { useState, useEffect, useCallback } from 'react';
import { StringInputProps, set, unset, useClient } from 'sanity';
import { Stack, Text, Card, Flex, TextInput, Box, Badge, Spinner, Button } from '@sanity/ui';
import { ImageIcon, SearchIcon, CheckmarkIcon, CloseIcon } from '@sanity/icons';

interface AssetOption {
  sitePath: string;
  relativePath?: string;
  displayName?: string;
  extension?: string;
  mediaType?: string;
}

export function R2AssetInput(props: StringInputProps) {
  const { value = '', onChange, schemaType } = props;
  const client = useClient({ apiVersion: '2026-01-01' });

  const [assets, setAssets] = useState<AssetOption[]>([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  // Load registered assets on mount
  useEffect(() => {
    let isMounted = true;
    async function loadAssets() {
      setLoading(true);
      try {
        const data = await client.fetch(
          `*[_type == "asset" && defined(sitePath)] {
            sitePath, relativePath, displayName, extension, mediaType
          } | order(sitePath asc) [0...600]`
        );
        if (isMounted) setAssets(data || []);
      } catch (err) {
        console.error('Failed to load assets for autocomplete:', err);
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    loadAssets();
    return () => {
      isMounted = false;
    };
  }, [client]);

  const handleSelect = useCallback(
    (path: string) => {
      onChange(set(path));
      setIsOpen(false);
      setQuery('');
    },
    [onChange]
  );

  const handleClear = useCallback(() => {
    onChange(unset());
  }, [onChange]);

  const filtered = assets.filter((a) => {
    if (!query.trim()) return true;
    const q = query.toLowerCase();
    return (
      (a.sitePath && a.sitePath.toLowerCase().includes(q)) ||
      (a.displayName && a.displayName.toLowerCase().includes(q)) ||
      (a.relativePath && a.relativePath.toLowerCase().includes(q))
    );
  });

  const isVideo = value.endsWith('.mp4') || value.endsWith('.webm') || value.endsWith('.mov');
  const isImage = value.endsWith('.jpg') || value.endsWith('.jpeg') || value.endsWith('.png') || value.endsWith('.svg') || value.endsWith('.webp');

  return (
    <Stack space={3}>
      <Flex gap={2} align="center">
        <Box flex={1}>
          <TextInput
            value={value}
            onChange={(e) => onChange(e.currentTarget.value ? set(e.currentTarget.value) : unset())}
            placeholder="/assets/work/... or /assets/brand/..."
            icon={ImageIcon}
          />
        </Box>
        {value && (
          <Button
            mode="ghost"
            tone="default"
            icon={CloseIcon}
            onClick={handleClear}
            title="Clear path"
          />
        )}
        <Button
          mode="default"
          tone="primary"
          icon={SearchIcon}
          text={isOpen ? 'Close' : 'Browse R2'}
          onClick={() => setIsOpen(!isOpen)}
        />
      </Flex>

      {/* Live Preview of Selected Asset */}
      {value && (
        <Card padding={2} radius={2} border tone="transparent" style={{ background: 'rgba(255,255,255,0.02)' }}>
          <Flex align="center" gap={3}>
            {isVideo && (
              <Badge tone="caution" fontSize={0}>VIDEO</Badge>
            )}
            {isImage && (
              <Badge tone="positive" fontSize={0}>IMAGE</Badge>
            )}
            <Text size={1} style={{ wordBreak: 'break-all' }}>
              <strong>Current:</strong> {value}
            </Text>
          </Flex>
        </Card>
      )}

      {/* Autocomplete / Asset Dropdown Drawer */}
      {isOpen && (
        <Card padding={3} radius={2} tone="default" border style={{ maxHeight: 320, overflowY: 'auto' }}>
          <Stack space={3}>
            <Flex align="center" justify="space-between">
              <Text size={1} weight="bold">R2 / Local Asset Registry ({assets.length} items)</Text>
              {loading && <Spinner size={1} />}
            </Flex>

            <TextInput
              value={query}
              onChange={(e) => setQuery(e.currentTarget.value)}
              placeholder="Search assets by name or path..."
              icon={SearchIcon}
              autoFocus
            />

            <Stack space={1}>
              {filtered.slice(0, 40).map((asset, idx) => {
                const selected = asset.sitePath === value;
                return (
                  <Card
                    key={idx}
                    padding={2}
                    radius={2}
                    tone={selected ? 'primary' : 'default'}
                    onClick={() => handleSelect(asset.sitePath)}
                    style={{ cursor: 'pointer', transition: 'background 0.15s ease' }}
                  >
                    <Flex align="center" justify="space-between" gap={2}>
                      <Stack space={1} flex={1}>
                        <Text size={1} weight={selected ? 'bold' : 'regular'}>
                          {asset.displayName || asset.sitePath}
                        </Text>
                        <Text size={0} muted style={{ wordBreak: 'break-all' }}>
                          {asset.sitePath}
                        </Text>
                      </Stack>
                      {asset.extension && (
                        <Badge tone="default" fontSize={0}>
                          {asset.extension.toUpperCase()}
                        </Badge>
                      )}
                      {selected && <CheckmarkIcon style={{ color: '#ffd000' }} />}
                    </Flex>
                  </Card>
                );
              })}
              {filtered.length === 0 && !loading && (
                <Text size={1} muted align="center" style={{ padding: 16 }}>
                  No matching assets found
                </Text>
              )}
            </Stack>
          </Stack>
        </Card>
      )}
    </Stack>
  );
}
