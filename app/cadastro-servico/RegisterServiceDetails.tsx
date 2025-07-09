import servicesData from '@/components/ServicesData'; // VERIFIQUE O CAMINHO CORRETO
import TagSelector from '@/components/TagSelectos';
import ThemedButton from '@/components/ThemedButton';
import ThemedInput from '@/components/ThemedInput';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { globalStyles, homeStyles } from '@/constants/globalStyle';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ScrollView, Text } from 'react-native';

export default function NomeDoComponente() {
  const params = useLocalSearchParams();
  const { selectedCategory, selectedSubcategory } = params;

  const [ServiceName, setName] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  
  const [isNameValid, setIsNameValid] = useState(false);
  const [isTagsvalid, setIsTagsValid] = useState(false);

  const [nameError, setNameError] = useState('');
  const [tagsError, setTagsError] = useState('');

  const categoria = servicesData.find(cat => cat["categoria-long"] === selectedCategory);

  const tags = categoria
    ? categoria.subcategorias.find(sub => sub.nome === selectedSubcategory)?.tags ?? []
    : [];


  useEffect(() => {
    if (ServiceName.length > 0) { //verifica se tem algo digitado
      if(ServiceName.length > 2){ //O nome precisa ter mais que 2 caracteres
        setIsNameValid(true); //valida o nome
        setNameError(''); //não exibe erro
      }
      else{
        setIsNameValid(false); //seta o nome como não validado
        setNameError('Por favor, o nome do seu serviço precisa ter pelo menos 3 caracteres'); //não exibe erro
      }
    } else {
      setIsNameValid(false); //seta o nome como não validado
      setNameError(''); //não exibe erro
    }
  }, [ServiceName]);

  useEffect(() => {
    if(selectedTags.length > 0){ //verifica se tem tag selecionada
      if(selectedTags.length > 2){
        setIsTagsValid(true);
        setTagsError('');
      }else{
        setIsTagsValid(false);
        setTagsError('Por favor, adicione pelo menor 3 tags ao seu serviço!');
      }
    }else{
      setIsTagsValid(false);
      setTagsError('');
    }
  }, [selectedTags]);

  function handleNext() {
    if (!isNameValid || !isTagsvalid) {
      return;
    } 

    router.push({
      pathname: '/cadastro-servico/RegisterServiceLocation', // Navega para a próxima tela
      params: {selectedCategory, selectedSubcategory, selectedTags, ServiceName}, // Passa todos os dados coletados {categoria, subcategoria, tags e Nome}
    });
  }


  return (
    <ThemedView style={globalStyles.container}>
      <ScrollView contentContainerStyle={homeStyles.scrollViewContent}>
        <ThemedText style={globalStyles.title}>Informações do serviço</ThemedText>
        <ThemedText style={globalStyles.subtitle}>Nos conte mais sobre o que você oferece!</ThemedText>

        <ThemedText style={globalStyles.sectionTitle}>Nome do serviço</ThemedText>
        <ThemedInput
          placeholder="Exemplo: Serralheria do João"
          value={ServiceName}
          onChangeText={setName}
        />
        {nameError ? <Text style={globalStyles.errorText}>{nameError}</Text> : null}
          
        <ThemedText style={globalStyles.sectionTitle}>Tags:</ThemedText>
        <ThemedText style={globalStyles.subtitle}>As tags podem ser úteis para ajudar clientes a encontrarem seu serviço!</ThemedText>
        <TagSelector
          suggestedTags={tags}
          selectedTags={selectedTags}
          setSelectedTags={setSelectedTags}
        />
        {tagsError ? <Text style={globalStyles.errorText}>{tagsError}</Text> : null}

        <ThemedButton title="Continuar" onPress={handleNext} disabled={(!isNameValid || !isTagsvalid)} />
      </ScrollView>
    </ThemedView>
  );
}
