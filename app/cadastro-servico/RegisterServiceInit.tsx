import { Picker } from '@react-native-picker/picker';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Platform, ScrollView, StyleSheet } from 'react-native';

import ThemedButton from '@/components/ThemedButton';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

// Importe os dados dos seus serviços
import ProgressBar from '@/components/ProgressBar';
import servicesData from '@/components/ServicesData'; // VERIFIQUE O CAMINHO CORRETO
import { globalStyles, PickerStyles } from '@/constants/globalStyle';


export default function RegisterServicesInit() {
  const router = useRouter();
  const [error, setError] = useState('');

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);

  const selectedCategoryData = servicesData.find(
    (item) => item["categoria-long"] === selectedCategory
  );

  function handleNext() {
    if (!selectedCategory || !selectedSubcategory) {
      setError('Por favor, selecione uma categoria e uma subcategoria.');
      return;
    }
    setError('');
    router.push({
      pathname: '/cadastro-servico/RegisterServiceDetails',
      params:{
        selectedCategory,
        selectedSubcategory,
      },
    });
  }

  const isWebApplication = Platform.OS === 'web';

  return (
    <ThemedView style={globalStyles.container}>
      <ProgressBar currentStep={1} totalSteps={4} /> 
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {isWebApplication && (
          <ThemedText type="title" style={globalStyles.title}>Cadastrar Novo Serviço</ThemedText>
        )}

        <ThemedText type="subtitle" style={globalStyles.sectionTitle}>Selecione uma Categoria</ThemedText>
          <Picker
          style = {isWebApplication ? PickerStyles.pickerInpuText : undefined}
          selectedValue={selectedCategory}
          onValueChange={(value) => {
            setSelectedCategory(value);
            setSelectedSubcategory(null); // Resetar a subcategoria ao mudar a categoria
          }}
        >
          <Picker.Item label="Selecione..." value={null} />
          {servicesData.map((item) => (
            <Picker.Item
              key={item.id}
              label={item["categoria-long"]}
              value={item["categoria-long"]}
            />
          ))}
        </Picker>

        {/* Seção de Seleção de Subcategoria (aparece após a categoria principal ser selecionada) */}
        {selectedCategory && (
          <>
          <ThemedText style={globalStyles.sectionTitle}>Selecione uma Subcategoria:</ThemedText>
          <Picker
            style = {isWebApplication ? PickerStyles.pickerInpuText : undefined}
            selectedValue={selectedSubcategory}
            onValueChange={(value) => setSelectedSubcategory(value)}
          >
            <Picker.Item label="Selecione..." value={null} />
            {selectedCategoryData?.subcategorias.map((sub) => (
              <Picker.Item key={sub.id} label={sub.nome} value={sub.nome} />
            ))}
          </Picker>
        </>
        )}

        {error ? <ThemedText style={globalStyles.errorText}>{error}</ThemedText> : null}

        <ThemedButton
          title="Próximo"
          onPress={handleNext}
          disabled={!selectedCategory || !selectedSubcategory} // Desabilitado até ambos serem selecionados
        />
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  scrollViewContent: {
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  customHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingTop: Platform.OS === 'android' ? 40 : 50,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    width: '100%',
  },
  backButtonHeader: {
    padding: 5,
    marginLeft: -5,
  },
});
