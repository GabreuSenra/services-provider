import ThemedButton from '@/components/ThemedButton';
import ThemedInput from '@/components/ThemedInput';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { signupStyles } from '@/constants/globalStyle';
import { auth } from '@/scripts/firebaseConfig';
import { useRouter } from 'expo-router';
import { signInWithEmailAndPassword } from 'firebase/auth';
import React, { useEffect, useState } from 'react'; // Adicionei useEffect para um possível debug futuro
import { ActivityIndicator, Text } from 'react-native'; // Adicionei Platform

export default function LoginContinuacao() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1); // 1: Email, 2: Senha

  const validateEmailFormat = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Log para o estado do botão "Continuar" (Passo 1)
  const isContinueButtonDisabled = !email || !validateEmailFormat(email) || loading;
  useEffect(() => {

  }, [email, loading, isContinueButtonDisabled]);

  // Log para o estado do botão "Entrar" (Passo 2)
  const isLoginButtonDisabled = !password || loading;
  useEffect(() => {
  }, [password, loading, isLoginButtonDisabled]);


  async function handleContinueToPassword() {
    if (!email || !validateEmailFormat(email)) {
      setError('Por favor, insira um e-mail válido.');
      return;
    }
    setError('');
    setCurrentStep(2);
  }

  async function handleLogin() {
    if (!email || !password) {
      setError('Por favor, preencha o e-mail e a senha.');
      return;
    }
    setError('');
    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.replace('/(tabs)');
    } catch (err: any) {
      setLoading(false);
      let errorMessage = 'Erro ao fazer login. Verifique seu e-mail e senha.';
      if (err.code === 'auth/invalid-email') {
        errorMessage = 'E-mail inválido.';
      } else if (err.code === 'auth/user-not-found') {
        errorMessage = 'Usuário não encontrado. Crie uma nova conta.';
      } else if (err.code === 'auth/wrong-password') {
        errorMessage = 'Senha incorreta.';
      } else if (err.code === 'auth/too-many-requests') {
        errorMessage = 'Muitas tentativas de login. Tente novamente mais tarde.';
      }
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }

  function handleBack() {
    if (currentStep === 2) {
      setCurrentStep(1);
      setError('');
      setPassword('');
    } else {
      router.replace('/login');
    }
  }

  return (
    <ThemedView style={signupStyles.container}>

      {/* Passo 1: E-mail */}
      {currentStep === 1 && (
        <>
          <ThemedText style={signupStyles.title}>Qual é o seu e-mail?</ThemedText>
          <ThemedText style={signupStyles.subtitle}>Insira seu e-mail cadastrado para acessar sua conta</ThemedText>
          <ThemedInput
            placeholder="E-mail"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
            editable={!loading}
          />
          {loading && <ActivityIndicator size="small" color="#0000ff" style={signupStyles.activityIndicator} />}
          {error ? <Text style={signupStyles.errorText}>{error}</Text> : null}
          <ThemedButton
            title={loading ? 'Verificando...' : 'Continuar'}
            onPress={handleContinueToPassword}
            disabled={isContinueButtonDisabled} // Usa a variável de estado do disabled
          />
        </>
      )}

      {/* Passo 2: Senha */}
      {currentStep === 2 && (
        <>
          <ThemedText style={signupStyles.title}>Insira sua senha!</ThemedText>
          <ThemedText style={signupStyles.subtitle}>Insira a senha cadastrada na sua conta</ThemedText>
          <ThemedInput
            placeholder="Senha"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            editable={!loading}
          />
          {loading && <ActivityIndicator size="small" color="#0000ff" style={signupStyles.activityIndicator} />}
          {error ? <Text style={signupStyles.errorText}>{error}</Text> : null}
          <ThemedButton
            title={loading ? 'Entrando...' : 'Entrar'}
            onPress={handleLogin}
            disabled={isLoginButtonDisabled} // Usa a variável de estado do disabled
          />
          <ThemedButton
            title="Voltar"
            onPress={handleBack}
            style={signupStyles.secondaryButton}
            textStyle={signupStyles.secondaryButtonText}
            disabled={loading}
          />
        </>
      )}
    </ThemedView>
  );
}