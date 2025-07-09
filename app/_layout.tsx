import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { router, Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useThemeColor } from '@/hooks/useThemeColor';
import { Ionicons } from '@expo/vector-icons';
import { Platform, TouchableOpacity } from 'react-native';

export default function RootLayout() {
  const colorScheme = useColorScheme();

  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

 const ProgressBar = ({ step }: { step: number }) => {
    const progressPercentage = (step / 4) * 100;

    return (
      <ThemedView style={{ paddingHorizontal: 16, marginBottom: 10 }}>
        <ThemedView style={{ height: 8, backgroundColor: '#E0E0E0', borderRadius: 4 }}>
          <ThemedView
            style={{
              height: 8,
              width: `${progressPercentage}%`,
              backgroundColor: '#4A90E2',
              borderRadius: 4,
            }}
          />
        </ThemedView>
        <ThemedText style={{ marginTop: 4, textAlign: 'center', fontSize: 12, color: '#666' }}>
          Passo {step} de 4
        </ThemedText>
      </ThemedView>
    );
  };


  const loginOptions = {
    title: 'ACESSAR CONTA',
    headerShown: Platform.OS === 'web' ? false : true,
    headerLeft: () => (
      <TouchableOpacity onPress={() => router.replace('/connect')} style={{ marginLeft: 10 }}>
        <Ionicons name="chevron-back" size={24} color={useThemeColor({}, 'details')} />
      </TouchableOpacity>
    ),
  };
  const connect = {
    title: '',
    headerShown: Platform.OS === 'web' ? false : true,
    headerLeft: () => (
      <TouchableOpacity onPress={() => router.replace('/(tabs)/perfil')} style={{ marginLeft: 10 }}>
        <Ionicons name="chevron-back" size={24} color={useThemeColor({}, 'details')} />
      </TouchableOpacity>
    ),
  };
  const signUpPhone = {
    title: 'CADASTRAR CONTA',
    headerShown: Platform.OS === 'web' ? false : true,
    headerLeft: () => (
      <TouchableOpacity onPress={() => router.replace('/connect')} style={{ marginLeft: 10 }}>
        <Ionicons name="chevron-back" size={24} color={useThemeColor({}, 'details')} />
      </TouchableOpacity>
    ),
  };
  const signUpDetails = {
    title: 'CADASTRAR CONTA',
    headerShown: Platform.OS === 'web' ? false : true,
    headerLeft: () => (
      <TouchableOpacity onPress={() => router.back()} style={{ marginLeft: 10 }}>
        <Ionicons name="chevron-back" size={24} color={useThemeColor({}, 'details')} />
      </TouchableOpacity>
    ),
  };
  const signUp = {
    title: 'CADASTRAR CONTA',
    headerShown: Platform.OS === 'web' ? false : true,

    headerLeft: () => (
      <TouchableOpacity onPress={() => router.back()} style={{ marginLeft: 10 }}>
        <Ionicons name="chevron-back" size={24} color={useThemeColor({}, 'details')} />
      </TouchableOpacity>
    ),
  };
  const categoryHeader = {
    headerShown: false
  };
  const RegisterServiceOption = {
    title: 'CADASTRE SEU SERVIÇO',
    headerShown: Platform.OS === 'web' ? false : true,

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
        <Stack.Screen name="cadastro-servico/RegisterServiceInit" options={RegisterServiceOption}></Stack.Screen>
        <Stack.Screen name="cadastro-servico/RegisterServiceDetails" options={RegisterServiceOption}></Stack.Screen>
        <Stack.Screen name="cadastro-servico/RegisterServiceLocation" options={RegisterServiceOption}></Stack.Screen>
        <Stack.Screen name="cadastro-servico/RegisterServiceReview" options={RegisterServiceOption}></Stack.Screen>
        <Stack.Screen name="cadastro-servico/RegisterServiceOwnerInfo" options={RegisterServiceOption}></Stack.Screen>
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
