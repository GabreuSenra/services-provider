import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, View } from 'react-native'; // Importe View

import ThemedButton from '@/components/ThemedButton'; // Importe ThemedButton
import { ThemedText } from '@/components/ThemedText'; // Importe ThemedText
import { ThemedView } from '@/components/ThemedView'; // Importe ThemedView

export default function Login() {
  const router = useRouter();

  function goToLoginContinuacao() {
    router.replace('/login'); // Redireciona para a nova tela de continuação do login
  }

  function goToSignupPhone() {
    router.replace('/signup-phone'); // Redireciona para o primeiro passo do cadastro (telefone)
  }

  return (
    <ThemedView style={styles.container}>

      <ThemedText style={styles.welcomeText}>Bem-vindo(a) ao seu app de serviços!</ThemedText>

      {/* Botões na parte inferior */}
      <View style={styles.buttonContainer}>
        <ThemedButton
          title="Já tenho uma conta"
          onPress={goToLoginContinuacao}
        />
        <ThemedButton
          title="Criar nova conta"
          onPress={goToSignupPhone}
          style={styles.secondaryButton}
          textStyle={styles.secondaryButtonText}
        />
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between', // Espaça o conteúdo: logo em cima, botões em baixo
    alignItems: 'center',
    padding: 20,
  },
  appLogo: {
    width: 200, // Ajuste o tamanho conforme sua imagem
    height: 200,
    marginTop: 80, // Margem superior para posicionar a logo
    // flex: 1, // Permite que a logo ocupe espaço flexível
  },
  welcomeText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 50, // Espaçamento antes dos botões
  },
  buttonContainer: {
    width: '100%', // Ocupa a largura total para os botões
    marginBottom: 40, // Margem inferior para os botões
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    borderColor: '#CCC',
    borderWidth: 1,
  },
  secondaryButtonText: {
    color: '#666',
  },
});
