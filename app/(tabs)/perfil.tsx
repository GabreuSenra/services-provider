import { auth } from '@/scripts/firebaseConfig';
import { useRouter } from 'expo-router';
import { onAuthStateChanged, User } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Image } from 'react-native';

import { signOut } from 'firebase/auth';

import ThemedButton from '@/components/ThemedButton';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { perfilStyles } from '@/constants/globalStyle';

export default function Perfil() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [logged, setLogged] = useState(false);


  function handleLogin() {
    router.replace('/connect'); 
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
        setLogged(true);
      } else {
        setUser(null); // Garante que user é null se não estiver logado
        setLogged(false);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  if (loading) {
    return (
      <ThemedView style={perfilStyles.container}>
        <ActivityIndicator size="large" color="#999" />
      </ThemedView>
    );
  }

  // REMOVIDO: if (!user) return null; // Esta linha impedia a renderização do botão "Entrar"

  function handleLogout() {
    signOut(auth).then(() => router.replace('/(tabs)/perfil')); 
  }

  return (
    <ThemedView style={perfilStyles.container}>
      {logged === true && user ? ( // Verifica se está logado E se user não é null
        <>
          {user.photoURL ? (
            <Image source={{ uri: user.photoURL }} style={perfilStyles.avatar} />
          ) : (
            <Image source={require('@/assets/images/avatar-default-svgrepo-com.svg')} style={perfilStyles.avatar} />
          )}
          <ThemedText style={perfilStyles.name}>{user.displayName ?? 'Usuário sem nome'}</ThemedText>
          <ThemedText style={perfilStyles.email}>{user.email}</ThemedText>
          <ThemedButton title='Sair' onPress={handleLogout} />
        </>
      ) : ( // Se não estiver logado
        <>
          <ThemedText style={perfilStyles.notLoggedInText}>Você não está conectado(a).</ThemedText>
          <ThemedButton title='Entrar ou Cadastrar' onPress={handleLogin} />
        </>
      )}
    </ThemedView>
  );
}
