import React from 'react';
import { Flex, Text, Badge } from '@sanity/ui';

export function StudioLogo() {
  return (
    <Flex align="center" gap={2} style={{ padding: '4px 8px' }}>
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ display: 'block' }}
      >
        <path
          d="M3 5.5L7.5 18.5L12 9.5L16.5 18.5L21 5.5"
          stroke="#ffd000"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <Text weight="bold" size={1} style={{ letterSpacing: '-0.02em', color: '#f4f4f4' }}>
        wugweb
      </Text>
      <Badge tone="caution" fontSize={0} mode="outline" style={{ border: '1px solid rgba(255, 208, 0, 0.4)', color: '#ffd000' }}>
        STUDIO
      </Badge>
    </Flex>
  );
}
