import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { AssetSource, AssetSourceComponentProps, useClient } from 'sanity';
import {
  Dialog,
  Card,
  Flex,
  Stack,
  Text,
  TextInput,
  Select,
  Grid,
  Box,
  Badge,
  Button,
  Spinner,
} from '@sanity/ui';
import {
  ImagesIcon,
  SearchIcon,
  CheckmarkIcon,
  CloseIcon,
  ImageIcon,
} from '@sanity/icons';

interface AssetDoc {
  _id: string;
  displayName?: string;
  name?: string;
  sitePath?: string;
  relativePath?: string;
  publicUrl?: string;
  r2Key?: string;
  extension?: string;
  mediaType?: string;
  assetGroup?: string;
}

export function R2AssetSourceComponent(props: AssetSourceComponentProps) {
  const { onSelect, onClose, selectedAssets } = props;
  const client = useClient({ apiVersion: '2026-01-01' });

  const [assets, setAssets] = useState<AssetDoc[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [groupFilter, setGroupFilter] = useState('all');
  const [selectedAsset, setSelectedAsset] = useState<AssetDoc | null>(null);

  useEffect(() => {
    let isMounted = true;
    async function loadAssets() {
      setLoading(true);
      setError(null);
      try {
        const data = await client.fetch<AssetDoc[]>(
          `*[_type == "asset" && defined(sitePath)] {
            _id, displayName, name, sitePath, relativePath, publicUrl, r2Key, extension, mediaType, assetGroup
          } | order(sitePath asc) [0...600]`
        );
        if (isMounted) setAssets(data || []);
      } catch (err: any) {
        if (isMounted) setError(err?.message || 'Failed to load assets');
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    loadAssets();
    return () => {
      isMounted = false;
    };
  }, [client]);

  const filteredAssets = useMemo(() => {
    let list = assets;
    if (groupFilter !== 'all') {
      list = list.filter((a) => a.assetGroup === groupFilter);
    }
    const q = query.trim().toLowerCase();
    if (q) {
      list = list.filter((a) =>
        [a.displayName, a.name, a.sitePath, a.relativePath, a.r2Key]
          .some((f) => String(f || '').toLowerCase().includes(q))
      );
    }
    return list;
  }, [assets, query, groupFilter]);

  const handleConfirmSelect = useCallback(() => {
    if (!selectedAsset) return;
    const url = selectedAsset.publicUrl || (selectedAsset.sitePath ? `https://wugweb.pages.dev${selectedAsset.sitePath}` : '');
    onSelect([
      {
        kind: 'url',
        value: url || selectedAsset.sitePath || '',
      },
    ]);
  }, [selectedAsset, onSelect]);

  return (
    <Dialog
      id="r2-asset-source-dialog"
      header="Cloudflare R2 Asset Library"
      onClose={onClose}
      width={4}
      zOffset={10000}
    >
      <Box padding={4}>
        <Stack space={4}>
          {/* Header Controls */}
          <Flex gap={3} align="center" wrap="wrap">
            <Box flex={1}>
              <TextInput
                icon={SearchIcon}
                placeholder="Search by name, slug or path…"
                value={query}
                onChange={(e) => setQuery(e.currentTarget.value)}
                autoFocus
              />
            </Box>
            <Select
              value={groupFilter}
              onChange={(e) => setGroupFilter(e.currentTarget.value)}
              style={{ minWidth: 150 }}
            >
              <option value="all">All Groups ({assets.length})</option>
              <option value="Work">Work</option>
              <option value="Services">Services</option>
              <option value="Brand">Brand</option>
              <option value="Blog">Blog</option>
              <option value="More">More</option>
              <option value="Framer">Framer</option>
            </Select>
            <Button
              text="Cancel"
              mode="ghost"
              icon={CloseIcon}
              onClick={onClose}
            />
          </Flex>

          {/* Asset Count / Status */}
          <Flex justify="space-between" align="center">
            <Text size={1} muted>
              Showing {filteredAssets.length} of {assets.length} assets
            </Text>
            {loading && <Spinner size={1} />}
          </Flex>

          {/* Grid of Assets */}
          {error ? (
            <Card padding={4} tone="critical" radius={2}>
              <Text size={1}>{error}</Text>
            </Card>
          ) : filteredAssets.length === 0 && !loading ? (
            <Card padding={5} style={{ textAlign: 'center' }} tone="transparent" border radius={2}>
              <Text size={2} muted>No assets match your search</Text>
            </Card>
          ) : (
            <Box style={{ maxHeight: '52vh', overflowY: 'auto', paddingRight: 4 }}>
              <Grid columns={[2, 3, 4, 5]} gap={2}>
                {filteredAssets.map((asset) => {
                  const isSelected = selectedAsset?._id === asset._id;
                  const ext = String(asset.extension || '').toLowerCase();
                  const isImg = ['jpg', 'jpeg', 'png', 'svg', 'webp', 'gif'].includes(ext);
                  const isVid = ['mp4', 'webm', 'mov'].includes(ext);
                  const previewUrl = asset.publicUrl || (asset.sitePath ? `https://wugweb.pages.dev${asset.sitePath}` : '');

                  return (
                    <Card
                      key={asset._id}
                      padding={1}
                      radius={2}
                      border
                      tone={isSelected ? 'primary' : 'default'}
                      style={{
                        cursor: 'pointer',
                        transition: 'border-color 0.15s ease, transform 0.15s ease',
                        borderColor: isSelected ? 'var(--card-focus-ring-color, #ffd000)' : undefined,
                        background: isSelected ? 'rgba(255, 208, 0, 0.06)' : undefined,
                      }}
                      onClick={() => setSelectedAsset(asset)}
                      onDoubleClick={() => {
                        setSelectedAsset(asset);
                        const url = asset.publicUrl || (asset.sitePath ? `https://wugweb.pages.dev${asset.sitePath}` : '');
                        onSelect([{ kind: 'url', value: url || asset.sitePath || '' }]);
                      }}
                    >
                      <Box
                        style={{
                          height: 96,
                          background: 'rgba(0,0,0,0.3)',
                          borderRadius: 4,
                          overflow: 'hidden',
                          display: 'grid',
                          placeItems: 'center',
                          position: 'relative',
                        }}
                      >
                        {isImg && previewUrl ? (
                          <img
                            src={previewUrl}
                            alt={asset.displayName || asset.name || ''}
                            loading="lazy"
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                          />
                        ) : isVid ? (
                          <Badge tone="caution" fontSize={0}>VIDEO</Badge>
                        ) : (
                          <Text size={1} muted>{ext.toUpperCase() || 'FILE'}</Text>
                        )}
                        {isSelected && (
                          <Box style={{ position: 'absolute', top: 4, right: 4, background: '#ffd000', borderRadius: '50%', padding: 2 }}>
                            <CheckmarkIcon style={{ color: '#000', fontSize: 14 }} />
                          </Box>
                        )}
                      </Box>
                      <Box padding={2}>
                        <Text size={1} weight={isSelected ? 'bold' : 'regular'} textOverflow="ellipsis">
                          {asset.displayName || asset.name}
                        </Text>
                        <Text size={0} muted textOverflow="ellipsis" style={{ fontFamily: 'monospace' }}>
                          {asset.sitePath}
                        </Text>
                      </Box>
                    </Card>
                  );
                })}
              </Grid>
            </Box>
          )}

          {/* Footer Selection Controls */}
          <Flex justify="space-between" align="center" paddingTop={3} style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
            <Text size={1} muted>
              {selectedAsset ? (
                <>Selected: <strong>{selectedAsset.displayName || selectedAsset.sitePath}</strong></>
              ) : (
                'Select an asset from the library'
              )}
            </Text>
            <Flex gap={2}>
              <Button text="Cancel" mode="ghost" onClick={onClose} />
              <Button
                text="Use Asset"
                tone="primary"
                mode="default"
                disabled={!selectedAsset}
                icon={CheckmarkIcon}
                onClick={handleConfirmSelect}
              />
            </Flex>
          </Flex>
        </Stack>
      </Box>
    </Dialog>
  );
}

export const r2AssetSource: AssetSource = {
  name: 'r2-asset-library',
  title: 'R2 Asset Library',
  icon: ImagesIcon,
  component: R2AssetSourceComponent,
};
