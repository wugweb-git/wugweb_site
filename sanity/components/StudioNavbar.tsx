import React from 'react';
import { NavbarProps } from 'sanity';
import { Flex, Card, Button, Text, Badge, Box } from '@sanity/ui';
import { LaunchIcon } from '@sanity/icons/Launch';
import { ControlsIcon } from '@sanity/icons/Controls';
import { EarthAmericasIcon } from '@sanity/icons/EarthAmericas';
import { CheckmarkIcon } from '@sanity/icons/Checkmark';

export function StudioNavbar(props: NavbarProps) {
  return (
    <StackWithCustomNavbar props={props} />
  );
}

function StackWithCustomNavbar({ props }: { props: NavbarProps }) {
  return (
    <Box>
      {/* Top Banner / Utility Quick Bar */}
      <Card
        paddingX={3}
        paddingY={2}
        tone="transparent"
        borderBottom
        style={{
          background: '#09090b',
          borderBottomColor: 'rgba(255, 255, 255, 0.08)',
        }}
      >
        <Flex justify="space-between" align="center">
          <Flex align="center" gap={2}>
            <Badge tone="positive" fontSize={0}>
              ● API 2026-01-01
            </Badge>
            <Badge tone="default" fontSize={0}>
              PRODUCTION (splvhmk1)
            </Badge>
          </Flex>

          <Flex align="center" gap={2}>
            <Button
              as="a"
              href="https://wugweb.pages.dev/kits"
              target="_blank"
              rel="noopener noreferrer"
              text="Kits Showcase"
              icon={ControlsIcon}
              mode="ghost"
              fontSize={0}
              padding={2}
            />
            <Button
              as="a"
              href="https://wugweb.pages.dev"
              target="_blank"
              rel="noopener noreferrer"
              text="Live Website"
              icon={LaunchIcon}
              mode="ghost"
              fontSize={0}
              padding={2}
            />
          </Flex>
        </Flex>
      </Card>

      {/* Default Sanity Navbar */}
      {props.renderDefault(props)}
    </Box>
  );
}
