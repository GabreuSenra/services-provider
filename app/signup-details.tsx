import ThemedInput from '@/components/ThemedInput';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Text } from 'react-native';

import ThemedButton from '@/components/ThemedButton';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { signupStyles } from '@/constants/globalStyle';

export default function SignupDetails() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { phone } = params; // Obtém e-mail e telefone

  const [name, setName] = useState('');
  //const [cpf, setCpf] = useState(''); //desabilitando o cpf por responsabilidades com LGPD, por enquanto
  const [error, setError] = useState('');
  const [isNameValid, setIsNameValid] = useState(false);

  const validateName = () => {
    const nameRegex = /^[a-zA-Z\u00C0-\u017F\s'-]+$/; // Verifica se contém apenas letras e espaços
    return nameRegex.test(name);
  };

  useEffect (() => {
    if(name.length > 1){ //verifica se tem algo digitado
      if(validateName()){
        setIsNameValid(true); //seta o nome como validado
        setError(''); //limpa o erro caso não esteja limpo
      }else{
        setIsNameValid(false); //seta o nome como não validado
        setError('Por favor, insira um nome válido'); 
      }
    }else{
      setIsNameValid(false); //seta o email como não validado
      setError(''); //não exibe erro
    }
  }, [name] );

  // Função para ir para o próximo passo (senha)
  function handleNext() {
    if (!isNameValid) {
      setError('Por favor, insira um nome ');
      return;
    }
    // TODO: Adicionar validação de CPF aqui

    setError('');
    router.push({
      pathname: '/signup', // Navega para a próxima tela
      params: { phone, name}, // Passa todos os dados coletados
    });
  }


  return (
    <ThemedView style={signupStyles.container}>
      <ThemedText style={signupStyles.title}>Complete as informações da sua conta</ThemedText>
      <ThemedText style={signupStyles.subtitle}>Cadastre seus dados para identificação no app e maior segurança da conta</ThemedText>

      <ThemedInput
        placeholder="Nome e sobrenome"
        value={name}
        onChangeText={setName}
        autoCapitalize="words" // Capitaliza a primeira letra de cada palavra
      />
      {/* 
      <ThemedInput
        placeholder="CPF"
        value={cpf}
        onChangeText={setCpf}
        style={styles.input}
        keyboardType="numeric" // Teclado numérico
        maxLength={14} // Ex: para formato 000.000.000-00
      />*/}

      {error ? <Text style={signupStyles.errorText}>{error}</Text> : null}

      <ThemedButton title="Continuar" onPress={handleNext} disabled={!isNameValid} />
    </ThemedView>
  );
}
