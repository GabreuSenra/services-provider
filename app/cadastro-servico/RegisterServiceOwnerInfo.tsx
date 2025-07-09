import ThemedButton from '@/components/ThemedButton';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { globalStyles } from '@/constants/globalStyle';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import { Alert, ScrollView, StyleSheet, View } from 'react-native';
import { MaskedTextInput } from "react-native-mask-text";

export default function NomeDoComponente() {
  const params = useLocalSearchParams();

  const [documentType, setDocumentType] = useState<'CPF' | 'CNPJ' | null>(null);
  const [fullName, setFullName] = useState('');
  const [documentNumber, setDocumentNumber] = useState('');
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
    const unmaskedDoc = documentNumber.replace(/\D/g, '');
    if (documentType === 'CPF' && unmaskedDoc.length !== 11) {
      Alert.alert("CPF Inválido", "O CPF deve conter 11 dígitos.");
      return false;
    }
    if (documentType === 'CNPJ' && unmaskedDoc.length !== 14) {
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
      ownerDocumentType: documentType,
      ownerDocumentNumber: documentNumber,
      ownerBirthDate: birthDate,
    };

    
    router.push({
      pathname: '/cadastro-servico/RegisterServiceOwnerInfo',
      params: allParams,
    });
  };

  return (
    <ThemedView style={globalStyles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <ThemedText style={globalStyles.title}>Informações do Responsável</ThemedText>
        <ThemedText style={globalStyles.subtitle}>
          Para finalizar, precisamos dos seus dados.
        </ThemedText>

        <View style={styles.choiceContainer}>
            <ThemedButton title="Cadastrar com CPF" onPress={() => setDocumentType('CPF')} />
            <ThemedButton title="Cadastrar com CNPJ" onPress={() => setDocumentType('CNPJ')}/>
        </View>

        {documentType && (
            <View style={styles.formContainer}>
                <MaskedTextInput
                    placeholder="Nome completo"
                    value={fullName}
                    onChangeText={setFullName}
                />
                
                {documentType === 'CPF' ? (
                    <MaskedTextInput
                        mask="999.999.999-99"
                        placeholder="CPF"
                        keyboardType="numeric"
                        value={documentNumber}
                        onChangeText={(text) => setDocumentNumber(text)}
                    />
                ) : (
                    <MaskedTextInput
                        mask="99.999.999/9999-99"
                        placeholder="CNPJ"
                        keyboardType="numeric"
                        value={documentNumber}
                        onChangeText={(text) => setDocumentNumber(text)}
                    />
                )}

                <MaskedTextInput
                    mask="99/99/9999"
                    placeholder="Data de Nascimento (DD/MM/AAAA)"
                    keyboardType="numeric"
                    value={birthDate}
                    onChangeText={(text) => setBirthDate(text)}
                />
            </View>
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
