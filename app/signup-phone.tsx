import ThemedInput from '@/components/ThemedInput';
import { useLocalSearchParams, useRouter } from 'expo-router'; // Importe useLocalSearchParams
import React, { useEffect, useState } from 'react';
import { Text } from 'react-native';

import ThemedButton from '@/components/ThemedButton';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { globalStyles } from '@/constants/globalStyle';

export default function SignupPhone() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { redirectToServiceRegistration } = params; // Obtém o parâmetro


  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const [isPhoneValid, setIsPhoneValid] = useState(false);

  const validatePhone = (phone: string) => {
    const phoneRegex = /^(?:(?:\+|00)?55\s?)?(?:\(?([1-9][0-9])\)?\s?)(?:((?:9\d|[2-9])\d{3})\-?(\d{4}))$/;
    return phoneRegex.test(phone);
  }

  //sempre que a constante phone for alterada, chama o useEffect
  useEffect (() => {
    if(phone.length > 0){ //só valida se tiver algo digitado
      if(validatePhone(phone)){
        setIsPhoneValid(true); //seta o email como validado
        setError(''); //limpa o erro caso não esteja limpo
      } else {
        setIsPhoneValid(false); //seta o email como não validado
        setError('Por favor, insira um número de telefone válido'); //exibe uma mensagem de erro
      }
    }else{
      setIsPhoneValid(false); //seta o email como não validado
      setError(''); //não exibe erro
    }
  }, [phone]);

  // Função para ir para o próximo passo (nome e CPF)
  function handleNext() {
    if (!isPhoneValid) {
      setError('Por favor, insira seu número de telefone.');
      return;
    }
    setError('');
    router.push({
      pathname: '/signup-details', // Navega para a próxima tela
      params: { redirectToServiceRegistration, phone }, // Passa o telefone
    });
  }


  return (
    <ThemedView style={globalStyles.container}>
      <ThemedText style={globalStyles.title}>Qual é o seu número de telefone?</ThemedText>
      <ThemedText style={globalStyles.subtitle}>É importante usar um número de telefone válido para criar sua conta</ThemedText>

      <ThemedInput
        placeholder="Telefone"
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad" // Teclado otimizado para telefone
      />
      {error ? <Text style={globalStyles.errorText}>{error}</Text> : null}

      <ThemedButton title="Continuar" onPress={handleNext} disabled={!isPhoneValid} />
    </ThemedView>
  );
}