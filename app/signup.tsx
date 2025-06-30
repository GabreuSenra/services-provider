import ThemedInput from '@/components/ThemedInput';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Text } from 'react-native';

import ThemedButton from '@/components/ThemedButton';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { globalStyles } from '@/constants/globalStyle';
import { auth, db } from '@/scripts/firebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';


export default function Signup() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const {redirectToServiceRegistration, phone, name } = params; // Obtém todos os dados dos passos anteriores

  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(false); // controla o estado do email
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1); // Novo estado para controlar o passo: 1 para e-mail, 2 para senha

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  useEffect(() => {
    if (email.length > 0) {
      if (validateEmail(email)) {
        setIsEmailValid(true);
        setError('');
      } else {
        setIsEmailValid(false);
        setError('Por favor, insira um e-mail válido');
      }
    } else {
      setIsEmailValid(false);
      setError('');
    }
  }, [email]);

  // Função para avançar para o passo da senha
  function handleContinueToPassword() {
    if (!isEmailValid) {
      setError('Por favor, insira um e-mail válido para continuar.');
      return;
    }
    setError(''); // Limpa qualquer erro antes de avançar
    setCurrentStep(2); // Muda para o passo da senha
  }

  // Função para finalizar o cadastro (agora só lida com a senha)
  async function handleSignup() {
    if (!password || !confirmPassword) {
      setError('Por favor, preencha a senha e a confirmação.');
      return;
    }
    if (password !== confirmPassword) {
      setError('As senhas não coincidem.');
      return;
    }
    if (password.length < 6) {
      setError('A senha é muito fraca. Use uma senha mais forte.');
      return;
    }

    setError('');
    setLoading(true);

    try {
      // 1. Criar usuário no Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, email as string, password);
      const user = userCredential.user;

      // 2. Salvar dados adicionais do usuário no Firestore (coleção 'users')
      if (user.uid) {
        await setDoc(doc(db, 'users', user.uid), {
          id: user.uid,
          email: user.email,
          name: name as string,
          // CPF: cpf as string, // Descomente se for usar CPF
          phone: phone as string,
          createdAt: new Date(),
          userType: 'client',
          location: null,
          photoURL: null,
        });
      }

      // 3. Redirecionar
      if (redirectToServiceRegistration === 'true') {
        // Redireciona para o cadastro de serviço
        router.replace({
        pathname: '/cadastro-servico/RegisterServiceInit'
      });
      } else {
        router.replace('/(tabs)'); // Redireciona para a tela principal normal
      }


    } catch (err: any) {
      setLoading(false);
      let errorMessage = 'Ocorreu um erro ao cadastrar. Tente novamente.';
      if (err.code === 'auth/email-already-in-use') {
        errorMessage = 'Este e-mail já está em uso. Tente fazer login ou use outro e-mail.';
      } else if (err.code === 'auth/invalid-email') {
        errorMessage = 'O formato do e-mail é inválido.';
      } else if (err.code === 'auth/weak-password') {
        errorMessage = 'A senha é muito fraca. Use uma senha mais forte.';
      }
      setError(errorMessage);
      console.error("Erro no cadastro Firebase:", err);
    }
  }

  // Função para voltar para o passo anterior (detalhes)
  function handleBack() {
    if (currentStep === 2) {
      setCurrentStep(1); // Volta para o passo do e-mail
      setError(''); // Limpa erro ao voltar
      setPassword(''); // Limpa senha ao voltar
      setConfirmPassword(''); // Limpa confirmação ao voltar
    } else {
      router.replace({
        pathname: '/signup-details', // Volta para a tela de detalhes (nome, CPF)
        params: { phone, name }, // Passa telefone, nome e CPF de volta
      });
    }
  }

  return (
    <ThemedView style={globalStyles.container}>


      {/* Passo 1: E-mail */}
      {currentStep === 1 && (
        <>
          <ThemedText style={globalStyles.title}>Qual é o seu e-mail?</ThemedText>
          <ThemedText style={globalStyles.subtitle}>É importante usar um e-mail válido para criar sua conta</ThemedText>
          <ThemedInput
            placeholder="E-mail"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
          />
          {error ? <Text style={globalStyles.errorText}>{error}</Text> : null}
          <ThemedButton
            title="Continuar"
            onPress={handleContinueToPassword}
            disabled={!isEmailValid || loading}
          />
        </>
      )}

      {/* Passo 2: Senha */}
      {currentStep === 2 && (
        <>
          <ThemedText style={globalStyles.title}>Defina a sua senha!</ThemedText>
          <ThemedText style={globalStyles.subtitle}>Defina uma senha para a sua conta</ThemedText>
          <ThemedInput
            placeholder="Senha"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          <ThemedInput
            placeholder="Confirme sua senha"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
          />
          {error ? <Text style={globalStyles.errorText}>{error}</Text> : null}
          <ThemedButton
            title={loading ? 'Cadastrando...' : 'Finalizar Cadastro'}
            onPress={handleSignup}
            disabled={loading || !password || !confirmPassword}
          />
          <ThemedButton
            title="Escolher outro E-mail"
            onPress={handleBack}
            style={globalStyles.secondaryButton}
            textStyle={globalStyles.secondaryButtonText}
            disabled={loading}
          />
        </>
      )}


      {loading && <ActivityIndicator size="large" color="#0000ff" style={globalStyles.activityIndicator} />}
    </ThemedView>
  );
}

