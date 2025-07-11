import ProgressBar from '@/components/ProgressBar';
import ThemedButton from '@/components/ThemedButton';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { globalStyles } from '@/constants/globalStyle';
import { router, useLocalSearchParams } from 'expo-router';
import React from 'react';
import { Alert, ScrollView, StyleSheet, View } from 'react-native';

export default function RegisterServiceReviewLocation() {
  const params = useLocalSearchParams();
  const {
    selectedCategory, 
    selectedSubcategory, 
    selectedTags, 
    ServiceName,
    street,
    number,
    complement,
    neighborhood,
    city,
    state,
    cep,
    locationType,
  } = params;

  // Validação mínima para garantir que os dados essenciais chegaram
  if (!street || !city || !state) {
    Alert.alert(
      "Erro de Endereço", 
      "As informações de endereço não foram recebidas corretamente. Por favor, volte e tente novamente.",
      [{ text: "Voltar", onPress: () => router.back() }]
    );
    return (
      <ThemedView style={globalStyles.container}>
        <ThemedText>Erro ao carregar o endereço...</ThemedText>
      </ThemedView>
    );
  }

  const handleConfirm = () => {
    // Apenas passa todos os parâmetros recebidos para a próxima tela.
    router.push({
      pathname: '/cadastro-servico/RegisterServiceOwnerInfo',
      params: params,
    });
  };

  const getAddressText = () => {
    let address = `${street}, ${number}`;
    if (complement) {
      address += ` - ${complement}`;
    }
    return `${address}\n${neighborhood} - ${city}, ${state}\nCEP: ${cep}`;
  };

  return (
    <ThemedView style={globalStyles.container}>
      <ProgressBar currentStep={1} totalSteps={4} /> 
      <ScrollView style={globalStyles.scrollViewContent}>
        <ThemedText style={globalStyles.title}>Revise a Localização</ThemedText>
        <ThemedText style={globalStyles.subtitle}>
          Confirme se o endereço abaixo está correto.
        </ThemedText>

        {/* Container principal para exibir o endereço */}
        <ThemedView style={styles.addressContainer}>
            <ThemedText style={styles.addressTitle}>
                {locationType === 'fixo' ? 'Endereço do Estabelecimento' : 'Seu Ponto de Partida'}
            </ThemedText>
            <ThemedText style={styles.addressText}>
                {getAddressText()}
            </ThemedText>
        </ThemedView>

        <View style={styles.buttonContainer}>
            <ThemedButton
            title="Confirmar e Continuar"
            onPress={handleConfirm}
            />
            <ThemedButton
            title="Corrigir Endereço"
            onPress={() => router.back()}
            />
        </View>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
    addressContainer: {
        padding: 20,
        backgroundColor: '#f5f5f5',
        borderRadius: 10,
        marginVertical: 30, // Dá um bom espaçamento vertical
        borderWidth: 1,
        borderColor: '#eee',
    },
    addressTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 12,
        color: '#333',
    },
    addressText: {
        fontSize: 16,
        lineHeight: 26, // Melhora a legibilidade
        color: '#555',
    },
    buttonContainer: {
        gap: 15, // Espaço entre os botões
    }
});
