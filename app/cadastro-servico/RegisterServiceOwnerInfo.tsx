import ProgressBar from '@/components/ProgressBar';
import ThemedButton from '@/components/ThemedButton';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { globalStyles } from '@/constants/globalStyle';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import { Alert, ScrollView, StyleSheet, View } from 'react-native';
import { MaskedTextInput } from "react-native-mask-text";

export default function OwnerInfo() {
  const params = useLocalSearchParams();

  const [documentType, setDocumentType] = useState<'CPF' | 'CNPJ' | null>(null);
  const [fullName, setFullName] = useState('');
  const [cpfNumber, setCpf] = useState('');
  const [cnpjNumber, setCnpj] = useState('');
  const [birthDate, setBirthDate] = useState('');

  const validateForm = () => {
    if (!documentType) {
      Alert.alert("Campo Obrigatório", "Por favor, selecione se o cadastro será por CPF ou CNPJ.");
      return false;
    }
    if (fullName.trim().split(' ').length < 2) {
      Alert.alert("Nome Inválido", "Por favor, insira seu nome completo.");
      return false;
    }
    const unmaskedCpf = cpfNumber.replace(/\D/g, '');
    const unmaskedCnpj = cnpjNumber.replace(/\D/g, '');

    if (documentType === 'CPF' && unmaskedCpf.length !== 11) {
      Alert.alert("CPF Inválido", "O CPF deve conter 11 dígitos.");
      return false;
    }
    if (documentType === 'CNPJ' && unmaskedCnpj.length !== 14) {
      Alert.alert("CNPJ Inválido", "O CNPJ deve conter 14 dígitos.");
      return false;
    }
    if (birthDate.replace(/\D/g, '').length !== 8) {
      Alert.alert("Data Inválida", "A data de nascimento deve estar no formato DD/MM/AAAA.");
      return false;
    }
    return true;
  };

  const handleNext = () => {
    if (!validateForm()) return;

    // Reúne TODOS os dados do fluxo de cadastro
    const allParams = {
      ...params,
      // Adiciona os dados desta tela
      ownerFullName: fullName.trim(),
      ownerCpfNumber: cpfNumber,
      ...(documentType === 'CNPJ' && { ownerCnpjNumber: cnpjNumber }),
      ownerBirthDate: birthDate,
    };


    router.push({
      pathname: '/cadastro-servico/RegisterServiceFinalReview',
      params: allParams,
    });
  };

  return (
    <ThemedView style={globalStyles.container}>
      <ProgressBar currentStep={1} totalSteps={4} />
      <ScrollView contentContainerStyle={styles.content}>
        <ThemedText style={globalStyles.title}>Informações do Responsável</ThemedText>
        <ThemedText style={globalStyles.subtitle}>
          Para finalizar, precisamos dos seus dados.
        </ThemedText>

        <View style={styles.choiceContainer}>
          <ThemedButton title="Cadastrar com CPF" onPress={() => setDocumentType('CPF')} />
          <ThemedButton title="Cadastrar com CNPJ" onPress={() => setDocumentType('CNPJ')} />
        </View>

        {documentType === 'CPF' ? (
          <ThemedView style={styles.formContainer}>
            <MaskedTextInput
              style={globalStyles.input}
              placeholder="Nome completo"
              value={fullName}
              onChangeText={setFullName}
            />

            <MaskedTextInput
              style={globalStyles.input}
              mask="999.999.999-99"
              placeholder="CPF"
              keyboardType="numeric"
              value={cpfNumber}
              onChangeText={(text) => setCpf(text)}
            />

            <MaskedTextInput
              style={globalStyles.input}
              mask="99/99/9999"
              placeholder="Data de Nascimento (DD/MM/AAAA)"
              keyboardType="numeric"
              value={birthDate}
              onChangeText={(text) => setBirthDate(text)}
            />
          </ThemedView>
        ) : (
          <ThemedView style={styles.formContainer}>
            <MaskedTextInput
              style={globalStyles.input}
              mask="99.999.999/9999-99"
              placeholder="CNPJ"
              keyboardType="numeric"
              value={cnpjNumber}
              onChangeText={(text) => setCnpj(text)}
            />
            <MaskedTextInput
              style={globalStyles.input}
              placeholder="Nome completo do responsável legal"
              value={fullName}
              onChangeText={setFullName}
            />
            <MaskedTextInput
              style={globalStyles.input}
              mask="999.999.999-99"
              placeholder="CPF do responsável legal"
              keyboardType="numeric"
              value={cpfNumber}
              onChangeText={(text) => setCpf(text)}
            />
            <MaskedTextInput
              style={globalStyles.input}
              mask="99/99/9999"
              placeholder="Data de Nascimento (DD/MM/AAAA)"
              keyboardType="numeric"
              value={birthDate}
              onChangeText={(text) => setBirthDate(text)}
            />
          </ThemedView>
        )}

        <ThemedButton
          title="Ir para Revisão Final"
          onPress={handleNext}
          disabled={!documentType}
        />
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  content: {
    flexGrow: 1,
    padding: 20,
  },
  choiceContainer: {
    marginVertical: 20,
    gap: 15,
  },
  formContainer: {
    marginBottom: 30,
    gap: 15,
  }
});
