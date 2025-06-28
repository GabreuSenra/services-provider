import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { router, Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';
import { useThemeColor } from '@/hooks/useThemeColor';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';

export default function RootLayout() {
  const colorScheme = useColorScheme();

  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  const loginOptions = {
    title: 'ACESSAR CONTA',
    headerShown: true,
    headerLeft: () => (
      <TouchableOpacity onPress={() => router.replace('/connect')} style={{ marginLeft: 10 }}>
        <Ionicons name="chevron-back" size={24} color={useThemeColor({}, 'details')} />
      </TouchableOpacity>
    ),
  };
  const connect = {
    title: '',
    headerShown: true,
    headerLeft: () => (
      <TouchableOpacity onPress={() => router.replace('/(tabs)/perfil')} style={{ marginLeft: 10 }}>
        <Ionicons name="chevron-back" size={24} color={useThemeColor({}, 'details')} />
      </TouchableOpacity>
    ),
  };
  const signUpPhone = {
    title: 'CADASTRAR CONTA',
    headerShown: true,
    headerLeft: () => (
      <TouchableOpacity onPress={() => router.replace('/connect')} style={{ marginLeft: 10 }}>
        <Ionicons name="chevron-back" size={24} color={useThemeColor({}, 'details')} />
      </TouchableOpacity>
    ),
  };
  const signUpDetails = {
    title: 'CADASTRAR CONTA',
    headerShown: true,
    headerLeft: () => (
      <TouchableOpacity onPress={() => router.back()} style={{ marginLeft: 10 }}>
        <Ionicons name="chevron-back" size={24} color={useThemeColor({}, 'details')} />
      </TouchableOpacity>
    ),
  };
  const signUp = {
    title: 'CADASTRAR CONTA',
    headerShown: true,
    headerLeft: () => (
      <TouchableOpacity onPress={() => router.back()} style={{ marginLeft: 10 }}>
        <Ionicons name="chevron-back" size={24} color={useThemeColor({}, 'details')} />
      </TouchableOpacity>
    ),
  };
  const categoryHeader = {
    title: '',
    headerShown: false,
    headerLeft: () => (
      <TouchableOpacity onPress={() => router.back()} style={{ marginLeft: 10 }}>
        <Ionicons name="chevron-back" size={24} color={useThemeColor({}, 'details')} />
      </TouchableOpacity>
    ),
  };

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
        <Stack.Screen name="login" options={loginOptions} />
        <Stack.Screen name="connect" options={connect} />
        <Stack.Screen name="signup-phone" options={signUpPhone} />
        <Stack.Screen name="signup-details" options={signUpDetails} />
        <Stack.Screen name="signup" options={signUp} />
        <Stack.Screen name="category/[id]" options={categoryHeader} />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
