
import * as React from 'react';
import { View, Text, Button } from 'react-native';
import * as Linking from 'expo-linking';
import { supabase, SUPABASE_CONFIG_OK } from './src/lib/supabase';
import { ErrorBoundary } from './src/components/ErrorBoundary';

export default function App() {
  // Deep link handler (safe)
  React.useEffect(() => {
    const handleUrl = async (incoming?: string | null) => {
      if (!incoming) return;
      try {
        const parsed = Linking.parse(incoming);
        const code = (parsed.queryParams?.code as string) || '';
        if (code) {
          const { error } = await supabase.auth.exchangeCodeForSession({ code });
          if (error) console.log('exchange error', error.message);
        }
      } catch (e: any) {
        console.log('Linking handler error:', e?.message || e);
      }
    };
    Linking.getInitialURL().then(handleUrl).catch(() => {});
    const sub = Linking.addEventListener('url', (e) => handleUrl(e.url));
    return () => (sub as any)?.remove?.();
  }, []);

  return (
    <ErrorBoundary>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', gap: 12 }}>
        <Text style={{ fontSize: 20, fontWeight: '700' }}>KDT – Safe Boot</Text>
        <Text>Supabase config: {SUPABASE_CONFIG_OK ? 'OK ✅' : 'Missing ⚠️'}</Text>
        <Button title="Test sign-in email" onPress={async () => {
          try {
            const { error } = await supabase.auth.signInWithOtp({
              email: 'you@example.com',
              options: { emailRedirectTo: 'kdt://callback' },
            });
            if (error) throw error;
            alert('Check your email for a magic link');
          } catch (e: any) {
            alert(e?.message || String(e));
          }
        }} />
      </View>
    </ErrorBoundary>
  );
}
