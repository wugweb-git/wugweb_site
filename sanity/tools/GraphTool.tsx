import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { useClient } from 'sanity';
import {
  Card,
  Flex,
  Stack,
  Text,
  Badge,
  Button,
  Spinner,
  Box,
  Select,
  TextInput,
} from '@sanity/ui';
import {
  RefreshIcon,
  LaunchIcon,
  SearchIcon,
  ControlsIcon,
  SplitHorizontalIcon,
} from '@sanity/icons';
import { StudioErrorBoundary } from '../components/StudioErrorBoundary';

interface GraphNode {
  id: string;
  type: string;
  label: string;
  slug?: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  connections: number;
}

interface GraphLink {
  source: string;
  target: string;
  label: string;
  type: string;
}

const TYPE_COLORS: Record<string, string> = {
  post: '#2167E9',        // Blue
  caseStudy: '#FA4108',   // Orange/Red
  service: '#E6309F',     // Magenta
  client: '#3ED219',      // Green
  person: '#FFD000',      // Yellow
  testimonial: '#7A4DFF', // Purple
  singletonPage: '#09E2C0',// Cyan
};

function GraphToolContent() {
  const client = useClient({ apiVersion: '2026-01-01' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [nodes, setNodes] = useState<GraphNode[]>([]);
  const [links, setLinks] = useState<GraphLink[]>([]);
  const [selectedNode, setSelectedNode] = useState<GraphNode | null>(null);
  const [typeFilter, setTypeFilter] = useState('all');
  const [relationFilter, setRelationFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Zoom & Pan state
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);
  const startPanRef = useRef({ x: 0, y: 0 });

  const loadGraph = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const docs = await client.fetch<any[]>(
        `*[_type in ["post","caseStudy","service","client","person","testimonial"] && !(_id in path("drafts.**"))][0...350] {
          _id, _type, title, name, "slug": slug.current,
          "authorId": author._ref,
          "clientId": client._ref,
          "serviceId": service._ref,
          "relatedPosts": relatedPosts[]._ref
        }`
      );

      const nodeList: GraphNode[] = [];
      const linkList: GraphLink[] = [];
      const nodeMap = new Map<string, GraphNode>();

      const width = 900;
      const height = 580;
      const radius = Math.min(width, height) * 0.38;
      const count = docs.length;

      docs.forEach((d, idx) => {
        const angle = (idx / count) * 2 * Math.PI;
        const node: GraphNode = {
          id: d._id,
          type: d._type,
          label: d.title || d.name || d._id,
          slug: d.slug,
          x: width / 2 + radius * Math.cos(angle) + (Math.random() - 0.5) * 30,
          y: height / 2 + radius * Math.sin(angle) + (Math.random() - 0.5) * 30,
          vx: 0,
          vy: 0,
          connections: 0,
        };
        nodeList.push(node);
        nodeMap.set(d._id, node);
      });

      docs.forEach((d) => {
        if (d.authorId && nodeMap.has(d.authorId)) {
          linkList.push({ source: d._id, target: d.authorId, label: 'authored by', type: 'author' });
          nodeMap.get(d._id)!.connections++;
          nodeMap.get(d.authorId)!.connections++;
        }
        if (d.clientId && nodeMap.has(d.clientId)) {
          linkList.push({ source: d._id, target: d.clientId, label: 'client', type: 'client' });
          nodeMap.get(d._id)!.connections++;
          nodeMap.get(d.clientId)!.connections++;
        }
        if (d.serviceId && nodeMap.has(d.serviceId)) {
          linkList.push({ source: d._id, target: d.serviceId, label: 'service', type: 'service' });
          nodeMap.get(d._id)!.connections++;
          nodeMap.get(d.serviceId)!.connections++;
        }
        if (Array.isArray(d.relatedPosts)) {
          d.relatedPosts.forEach((refId: string) => {
            if (nodeMap.has(refId)) {
              linkList.push({ source: d._id, target: refId, label: 'related post', type: 'related' });
              nodeMap.get(d._id)!.connections++;
              nodeMap.get(refId)!.connections++;
            }
          });
        }
      });

      // Quick 40-step spring relaxation simulation for organic layout clustering
      for (let iter = 0; iter < 45; iter++) {
        // Repulsion between all nodes
        for (let i = 0; i < nodeList.length; i++) {
          for (let j = i + 1; j < nodeList.length; j++) {
            const dx = nodeList[j].x - nodeList[i].x;
            const dy = nodeList[j].y - nodeList[i].y;
            const dist = Math.sqrt(dx * dx + dy * dy) || 1;
            if (dist < 180) {
              const force = (180 - dist) / dist * 0.08;
              nodeList[i].x -= dx * force;
              nodeList[i].y -= dy * force;
              nodeList[j].x += dx * force;
              nodeList[j].y += dy * force;
            }
          }
        }
        // Spring attraction along links
        for (const l of linkList) {
          const s = nodeMap.get(l.source);
          const t = nodeMap.get(l.target);
          if (!s || !t) continue;
          const dx = t.x - s.x;
          const dy = t.y - s.y;
          const dist = Math.sqrt(dx * dx + dy * dy) || 1;
          const force = (dist - 90) * 0.05;
          s.x += (dx / dist) * force;
          s.y += (dy / dist) * force;
          t.x -= (dx / dist) * force;
          t.y -= (dy / dist) * force;
        }
      }

      setNodes(nodeList);
      setLinks(linkList);
    } catch (err: any) {
      setError(err?.message || 'Failed to generate reference graph.');
    } finally {
      setLoading(false);
    }
  }, [client]);

  useEffect(() => {
    loadGraph();
  }, [loadGraph]);

  const filteredNodes = useMemo(() => {
    if (typeFilter === 'all') return nodes;
    return nodes.filter((n) => n.type === typeFilter);
  }, [nodes, typeFilter]);

  const filteredNodeIds = useMemo(() => new Set(filteredNodes.map((n) => n.id)), [filteredNodes]);

  const filteredLinks = useMemo(() => {
    return links.filter((l) => {
      if (relationFilter !== 'all' && l.type !== relationFilter) return false;
      return filteredNodeIds.has(l.source) && filteredNodeIds.has(l.target);
    });
  }, [links, filteredNodeIds, relationFilter]);

  const nodeMap = useMemo(() => {
    const map = new Map<string, GraphNode>();
    nodes.forEach((n) => map.set(n.id, n));
    return map;
  }, [nodes]);

  const searchMatches = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return new Set<string>();
    const matches = new Set<string>();
    nodes.forEach((n) => {
      if (n.label.toLowerCase().includes(q) || (n.slug && n.slug.toLowerCase().includes(q))) {
        matches.add(n.id);
      }
    });
    return matches;
  }, [nodes, searchQuery]);

  const openDocument = (node: GraphNode) => {
    window.location.hash = `#/structure/intent/edit/id=${node.id};type=${node.type}`;
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.target instanceof SVGElement && (e.target.tagName === 'svg' || e.target.tagName === 'rect')) {
      setIsPanning(true);
      startPanRef.current = { x: e.clientX - pan.x, y: e.clientY - pan.y };
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isPanning) return;
    setPan({
      x: e.clientX - startPanRef.current.x,
      y: e.clientY - startPanRef.current.y,
    });
  };

  const handleMouseUp = () => {
    setIsPanning(false);
  };

  const resetView = () => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
    setSelectedNode(null);
  };

  return (
    <Card padding={[2, 3, 4]} tone="default" style={{ minHeight: '100%' }}>
      <Stack space={4}>
        <Flex justify="space-between" align="center" wrap="wrap" gap={3}>
          <Stack space={1}>
            <Text size={3} weight="bold">Document Reference Graph</Text>
            <Text size={1} muted>
              Interactive topology showing links between Posts, Case Studies, Clients, Services, and Team
            </Text>
          </Stack>
          <Flex gap={2}>
            <Button text="Zoom +" mode="ghost" onClick={() => setZoom((z) => Math.min(2.5, z + 0.2))} />
            <Button text="Zoom −" mode="ghost" onClick={() => setZoom((z) => Math.max(0.4, z - 0.2))} />
            <Button text="Reset View" mode="ghost" onClick={resetView} />
            <Button text="Refresh" icon={RefreshIcon} mode="ghost" onClick={loadGraph} />
          </Flex>
        </Flex>

        {/* Filter Controls & Search Bar */}
        <Flex justify="space-between" align="center" wrap="wrap" gap={2}>
          <Flex gap={2} align="center" wrap="wrap" flex={1}>
            <Box style={{ minWidth: 200, maxWidth: 280 }}>
              <TextInput
                icon={SearchIcon}
                placeholder="Find node by name or slug…"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.currentTarget.value)}
              />
            </Box>
            <Select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.currentTarget.value)}
              style={{ minWidth: 140 }}
            >
              <option value="all">All Types ({nodes.length})</option>
              <option value="post">Posts</option>
              <option value="caseStudy">Case Studies</option>
              <option value="client">Clients</option>
              <option value="person">Team</option>
              <option value="service">Services</option>
            </Select>
            <Select
              value={relationFilter}
              onChange={(e) => setRelationFilter(e.currentTarget.value)}
              style={{ minWidth: 140 }}
            >
              <option value="all">All Relations ({links.length})</option>
              <option value="author">Author Links</option>
              <option value="client">Client Links</option>
              <option value="service">Service Links</option>
              <option value="related">Related Posts</option>
            </Select>
          </Flex>

          <Flex gap={2} wrap="wrap" align="center">
            {Object.entries(TYPE_COLORS).map(([type, color]) => (
              <Flex key={type} align="center" gap={1}>
                <Box style={{ width: 9, height: 9, borderRadius: '50%', background: color }} />
                <Text size={0} muted>{type}</Text>
              </Flex>
            ))}
          </Flex>
        </Flex>

        {/* Graph Canvas & Selected Inspector */}
        {loading ? (
          <Card padding={5} style={{ textAlign: 'center' }}>
            <Spinner size={2} />
            <Text size={1} muted style={{ marginTop: 8 }}>Computing document network simulation…</Text>
          </Card>
        ) : error ? (
          <Card padding={4} tone="critical" radius={2}>
            <Text size={1}>{error}</Text>
          </Card>
        ) : (
          <Flex gap={3} style={{ minHeight: 560 }}>
            {/* Interactive SVG Graph */}
            <Card
              border
              radius={2}
              flex={1}
              style={{
                background: '#09090b',
                position: 'relative',
                overflow: 'hidden',
                userSelect: 'none',
              }}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
            >
              <svg
                width="100%"
                height="560"
                viewBox="0 0 900 580"
                style={{ display: 'block', cursor: isPanning ? 'grabbing' : 'grab' }}
              >
                <rect width="900" height="580" fill="transparent" />

                <g transform={`translate(${pan.x}, ${pan.y}) scale(${zoom})`}>
                  {/* Links */}
                  {filteredLinks.map((link, idx) => {
                    const s = nodeMap.get(link.source);
                    const t = nodeMap.get(link.target);
                    if (!s || !t) return null;
                    const isSelected = selectedNode && (selectedNode.id === s.id || selectedNode.id === t.id);
                    return (
                      <line
                        key={idx}
                        x1={s.x}
                        y1={s.y}
                        x2={t.x}
                        y2={t.y}
                        stroke={isSelected ? '#ffd000' : 'rgba(255, 255, 255, 0.12)'}
                        strokeWidth={isSelected ? 2.2 : 1}
                      />
                    );
                  })}

                  {/* Nodes */}
                  {filteredNodes.map((node) => {
                    const isSelected = selectedNode?.id === node.id;
                    const isSearchMatch = searchMatches.has(node.id);
                    const hasSearch = searchQuery.trim().length > 0;
                    const color = TYPE_COLORS[node.type] || '#fff';
                    const radiusSize = Math.min(18, Math.max(7, 6 + node.connections * 2));
                    const opacity = hasSearch ? (isSearchMatch ? 1 : 0.2) : (isSelected ? 1 : 0.85);

                    return (
                      <g
                        key={node.id}
                        transform={`translate(${node.x}, ${node.y})`}
                        style={{ cursor: 'pointer', transition: 'opacity 0.2s ease' }}
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedNode(node);
                        }}
                        onDoubleClick={(e) => {
                          e.stopPropagation();
                          openDocument(node);
                        }}
                      >
                        {isSearchMatch && (
                          <circle
                            r={radiusSize + 6}
                            fill="none"
                            stroke="#ffd000"
                            strokeWidth={2}
                            strokeDasharray="3 3"
                          />
                        )}
                        <circle
                          r={radiusSize}
                          fill={color}
                          opacity={opacity}
                          stroke={isSelected ? '#fff' : 'rgba(0,0,0,0.6)'}
                          strokeWidth={isSelected ? 3 : 1}
                        />
                        <text
                          y={radiusSize + 11}
                          textAnchor="middle"
                          fill={isSearchMatch || isSelected ? '#fff' : '#aaa'}
                          fontSize={9}
                          fontWeight={isSelected || isSearchMatch ? 700 : 400}
                          fontFamily="Inter, system-ui, sans-serif"
                          style={{ pointerEvents: 'none', userSelect: 'none' }}
                        >
                          {node.label.length > 15 ? node.label.slice(0, 13) + '…' : node.label}
                        </text>
                      </g>
                    );
                  })}
                </g>
              </svg>
            </Card>

            {/* Selected Node Inspector Drawer */}
            {selectedNode && (
              <Card
                padding={3}
                border
                radius={2}
                style={{ width: 280, background: '#121215' }}
              >
                <Stack space={3}>
                  <Flex align="center" justify="space-between">
                    <Badge tone="primary" fontSize={0}>
                      {selectedNode.type.toUpperCase()}
                    </Badge>
                    <Button
                      text="Close"
                      mode="ghost"
                      fontSize={0}
                      padding={1}
                      onClick={() => setSelectedNode(null)}
                    />
                  </Flex>

                  <Stack space={1}>
                    <Text size={2} weight="bold">{selectedNode.label}</Text>
                    {selectedNode.slug && (
                      <Text size={0} muted style={{ fontFamily: 'monospace' }}>
                        @{selectedNode.slug}
                      </Text>
                    )}
                  </Stack>

                  <Text size={1} muted>
                    Connected references: <strong>{selectedNode.connections}</strong>
                  </Text>

                  <Button
                    text="Open in Studio"
                    tone="primary"
                    mode="default"
                    icon={LaunchIcon}
                    onClick={() => openDocument(selectedNode)}
                  />
                </Stack>
              </Card>
            )}
          </Flex>
        )}
      </Stack>
    </Card>
  );
}

export function GraphTool() {
  return (
    <StudioErrorBoundary toolTitle="Graph View">
      <GraphToolContent />
    </StudioErrorBoundary>
  );
}

export default GraphTool;
