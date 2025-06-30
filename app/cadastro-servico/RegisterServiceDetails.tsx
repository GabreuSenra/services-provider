import servicesData from '@/components/ServicesData'; // VERIFIQUE O CAMINHO CORRETO
import TagSelector from '@/components/TagSelectos';
import ThemedButton from '@/components/ThemedButton';
import ThemedInput from '@/components/ThemedInput';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { globalStyles, homeStyles } from '@/constants/globalStyle';
import { useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView } from 'react-native';

export default function NomeDoComponente() {
  const params = useLocalSearchParams();
  const { selectedCategory, selectedSubcategory } = params;

  const [ServiceName, setName] = useState('');
  const [error, setError] = useState('');
  const [isNameValid, setIsNamevalid] = useState(false);


  const categoria = servicesData.find(cat => cat["categoria-long"] === selectedCategory);

  const tags = categoria
    ? categoria.subcategorias.find(sub => sub.nome === selectedSubcategory)?.tags ?? []
    : [];

  function handleNext() {
    if (isNameValid) {

    } else {

    }
  }


  return (
    <ThemedView style={globalStyles.container}>
      <ScrollView contentContainerStyle={homeStyles.scrollViewContent }>
        <ThemedText style={globalStyles.title}>Informações do serviço</ThemedText>
        <ThemedText style={globalStyles.subtitle}>Nos conte mais sobre o que você oferece!</ThemedText>

        <ThemedText style={globalStyles.sectionTitle}>Nome do serviço</ThemedText>
        <ThemedInput
          placeholder="Exemplo: Serralheria do João"
          value={ServiceName}
          onChangeText={setName}
        />

        <ThemedText style={globalStyles.sectionTitle}>Tags:</ThemedText>
        <ThemedText style={globalStyles.subtitle}>As tags podem ser úteis para ajudar clientes a encontrarem seu serviço!</ThemedText>
        <TagSelector suggestedTags={tags} />

        <ThemedButton title="Continuar" onPress={handleNext} disabled={!isNameValid} />
      </ScrollView>
    </ThemedView>
  );
}
