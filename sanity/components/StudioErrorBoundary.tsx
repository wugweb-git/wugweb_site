import React, { Component, type ReactNode } from 'react';
import { Card, Stack, Text, Button, Flex } from '@sanity/ui';
import { ResetIcon, WarningOutlineIcon } from '@sanity/icons';

interface Props {
  children: ReactNode;
  toolTitle?: string;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class StudioErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error(`StudioErrorBoundary caught an error in ${this.props.toolTitle || 'Tool'}:`, error, errorInfo);
  }

  private handleRetry = () => {
    this.setState({ hasError: false, error: null });
  };

  public render() {
    if (this.state.hasError) {
      return (
        <Card padding={5} margin={4} radius={3} tone="critical" border>
          <Stack space={4}>
            <Flex align="center" gap={3}>
              <Text size={3} weight="bold">
                <WarningOutlineIcon />
              </Text>
              <Text size={2} weight="bold">
                {this.props.toolTitle ? `${this.props.toolTitle} Error` : 'Tool Unavailable'}
              </Text>
            </Flex>
            <Text size={1} style={{ fontFamily: 'monospace', whiteSpace: 'pre-wrap' }}>
              {this.state.error?.message || 'An unexpected error occurred while loading this view.'}
            </Text>
            <Flex gap={2}>
              <Button
                icon={ResetIcon}
                text="Retry Tool"
                tone="critical"
                mode="ghost"
                onClick={this.handleRetry}
              />
              <Button
                text="Reload Page"
                tone="default"
                mode="ghost"
                onClick={() => window.location.reload()}
              />
            </Flex>
          </Stack>
        </Card>
      );
    }

    return this.props.children;
  }
}
