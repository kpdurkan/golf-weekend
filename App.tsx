Import ErrorBoundary from './src/components/ErrorBoundary';
import * as React from 'react';
import { View, Text, Button, TextInput, Platform } from 'react-native';
import * as Linking from 'expo-linking';

// ...

const redirectTo = Linking.createURL('auth-callback'); 
// Works in Expo Go (exp://...), iOS/Android standalone (kdt://auth-callback), and web (http://localhost...)

// Debug: see the actual URL you need to add in Supabase while developing:
console.log('Auth redirectTo =', redirectTo);

const { error } = await supabase.auth.signInWithOtp({
  email,
  options: { emailRedirectTo: redirectTo },
});

import { supabase } from './src/lib/supabase';

export default function App() {
  const [email, setEmail] = React.useState('');

  // Deep-link handler (PKCE)
  React.useEffect(() => {
  const handleUrl = async (incoming?: string | null) => {
    if (!incoming) return;
    try {
      const parsed = Linking.parse(incoming); // supports exp:// and kdt://
      const code = (parsed.queryParams?.code as string) || '';
      if (code) {
        const { error } = await supabase.auth.exchangeCodeForSession({ code });
        if (error) console.log('exchange error', error.message);
      }
    } catch (e: any) {
      console.log('Linking handler error:', e?.message || e);
    }
  };
  Linking.getInitialURL().then(handleUrl).catch(()=>{});
  const sub = Linking.addEventListener('url', (e) => handleUrl(e.url));
  return () => (sub as any)?.remove?.();
}, []);


  const sendMagicLink = async () => {
    const ok = /^\S+@\S+\.\S+$/.test(email);
    if (!ok) {
      alert('Please enter a valid email address.');
      return;
    }
    // Mobile uses the custom scheme; web uses a full URL
    const redirectTo =
      Platform.OS === 'web' ? Linking.createURL('/') : 'kdt://callback';

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: redirectTo },
    });
    if (error) {
      alert(error.message);
    } else {
      alert('Magic link sent. Open it on this device to sign in.');
    }
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', gap: 12, padding: 16 }}>
      <Text style={{ fontSize: 20, fontWeight: '700' }}>KDT – Sign in</Text>
      <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder="you@yourdomain.com"
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
        style={{ width: '90%', maxWidth: 420, borderWidth: 1, borderColor: '#ddd', padding: 12, borderRadius: 8 }}
      />
      <Button title="Send magic link" onPress={sendMagicLink} />
    </View>
  );
}

