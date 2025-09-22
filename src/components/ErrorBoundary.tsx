import React from 'react';
import { ScrollView, Text } from 'react-native';

export class ErrorBoundary extends React.Component<
  React.PropsWithChildren, { error?: Error | null }
> {
  state = { error: null as Error | null };
  static getDerivedStateFromError(error: Error) { return { error }; }
  componentDidCatch(error: Error, info: any) { console.log('ErrorBoundary:', error, info); }
  render() {
    if (this.state.error) {
      return (
        <ScrollView contentContainerStyle={{ flexGrow: 1, padding: 16, alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ fontSize: 18, fontWeight: '700', marginBottom: 6 }}>Something crashed</Text>
          <Text selectable style={{ color: '#6b7280' }}>{String(this.state.error?.message || this.state.error)}</Text>
        </ScrollView>
      );
    }
    return this.props.children as any;
  }
}
export default ErrorBoundary;
