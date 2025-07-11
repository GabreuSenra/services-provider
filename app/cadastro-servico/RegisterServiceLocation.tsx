import ProgressBar from '@/components/ProgressBar';
import ThemedButton from '@/components/ThemedButton';
import ThemedInput from '@/components/ThemedInput';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { globalStyles } from '@/constants/globalStyle';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, ScrollView, StyleSheet, Text, View } from 'react-native';

// Estrutura para os dados do endereço
interface AddressData {
  logradouro: string;
  bairro: string;
  localidade: string;
  uf: string;
}


export default function RegisterServiceLocation() {
  const params = useLocalSearchParams();
  const { selectedCategory, selectedSubcategory, selectedTags, ServiceName } = params;

  const [locationType, setLocationType] = useState<'fixo' | 'domicilio' | null>(null);
  
  const [cep, setCep] = useState('');
  const [address, setAddress] = useState<AddressData | null>(null);
  const [number, setNumber] = useState('');
  const [complement, setComplement] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (cep.replace(/\D/g, '').length === 8) {
      fetchAddressFromCEP(cep);
    } else {
      setAddress(null);
    }
  }, [cep]);

  const fetchAddressFromCEP = async (cepToFetch: string) => {
    setIsLoading(true);
    setError('');
    setAddress(null);

    try {
      // Passo 1: Buscar endereço no ViaCEP
      const viaCepResponse = await fetch(`https://viacep.com.br/ws/${cepToFetch.replace(/\D/g, '')}/json/`);
      const addressData = await viaCepResponse.json();

      if (addressData.erro) {
        setError('CEP não encontrado. Verifique o número digitado.');
        setIsLoading(false);
        return;
      }
      
      setAddress({
        logradouro: addressData.logradouro,
        bairro: addressData.bairro,
        localidade: addressData.localidade,
        uf: addressData.uf,
      });

      // <<< MUDANÇA INÍCIO: Passo 2 - Geocoding para obter as coordenadas
      // Usando a rua e a cidade para ter uma busca mais precisa
      const queryString = `${addressData.logradouro}, ${addressData.localidade}, ${addressData.uf}`;
      const geocodeResponse = await fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(queryString)}&format=json&limit=1`);
      const geocodeData = await geocodeResponse.json();

      if (geocodeData && geocodeData.length > 0) {
        const { lat, lon } = geocodeData[0];
      } else {
        setError('Não foi possível encontrar as coordenadas para este CEP.');
      }
      // <<< MUDANÇA FIM

    } catch (e) {
      setError('Não foi possível buscar o endereço. Verifique sua conexão.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleNext = () => {
    if (locationType === 'fixo') {
      if (!address || !number) {
        Alert.alert('Campos Incompletos', 'Por favor, preencha o CEP e o número do seu endereço.');
        return;
      }
    } else if (locationType === 'domicilio') {
      if (!address) {
        Alert.alert('Campos Incompletos', 'Por favor, informe seu CEP de partida.');
        return;
      }
    } else {
      return; 
    }

    const allParams = {
      ...params,
      locationType,
      cep,
      street: address?.logradouro ?? '',
      neighborhood: address?.bairro ?? '',
      city: address?.localidade ?? '',
      state: address?.uf ?? '',
      number,
      complement,
    };
    
    router.push({
      pathname: '/cadastro-servico/RegisterServiceReview',
      params: allParams,
    });
  };

  const renderForm = () => {
    if (!locationType) return null;

    if (locationType === 'fixo') {
      return (
        <View style={styles.formContainer}>
          <ThemedText style={globalStyles.sectionTitle}>Endereço do seu estabelecimento</ThemedText>
          <ThemedInput
            placeholder="Digite o CEP"
            value={cep}
            onChangeText={setCep}
            keyboardType="numeric"
            maxLength={9}
          />
          {isLoading && <ActivityIndicator size="small" color="#007bff" />}
          {error ? <Text style={globalStyles.errorText}>{error}</Text> : null}
          
          {address && (
            <>
              <ThemedInput label="Rua" value={address.logradouro} editable={false} />
              <ThemedInput label="Bairro" value={address.bairro} editable={false} />
              <ThemedInput label="Cidade" value={address.localidade} editable={false} />
              <ThemedInput label="Estado" value={address.uf} editable={false} />
              <ThemedInput placeholder="Número" value={number} onChangeText={setNumber} keyboardType="numeric" />
              <ThemedInput placeholder="Complemento (opcional)" value={complement} onChangeText={setComplement} />
            </>
          )}
        </View>
      );
    }

    if (locationType === 'domicilio') {
      return (
        <View style={styles.formContainer}>
          <ThemedText style={globalStyles.sectionTitle}>Ponto de Partida</ThemedText>
          <ThemedText style={globalStyles.subtitle}>Informe seu endereço de partida</ThemedText>
          <ThemedInput
            placeholder="Seu CEP de partida"
            value={cep}
            onChangeText={setCep}
            keyboardType="numeric"
            maxLength={9}
          />
          {isLoading && <ActivityIndicator size="small" color="#007bff" />}
          {error ? <Text style={globalStyles.errorText}>{error}</Text> : null}
          
          {address && (
            <>
              <ThemedInput label="Rua" value={address.logradouro} editable={false} />
              <ThemedInput label="Bairro" value={address.bairro} editable={false} />
              <ThemedInput label="Cidade" value={address.localidade} editable={false} />
              <ThemedInput label="Estado" value={address.uf} editable={false} />
            </>
          )}

        </View>
      );
    }
  };

  return (
    <ThemedView style={globalStyles.container}>
      <ProgressBar currentStep={1} totalSteps={4} /> 
      <ScrollView contentContainerStyle={globalStyles.scrollViewContent}>
        <ThemedText style={globalStyles.title}>Localização do Serviço</ThemedText>
        <ThemedText style={globalStyles.subtitle}>Onde você realiza seus serviços?</ThemedText>

        <View style={styles.choiceContainer}>
          <ThemedButton 
            title="Tenho um endereço fixo" 
            onPress={() => setLocationType('fixo')}
          />
          <ThemedButton 
            title="Atendo a domicílio" 
            onPress={() => setLocationType('domicilio')}
          />
        </View>

        {renderForm()}

        <ThemedButton 
          title="Continuar" 
          onPress={handleNext} 
          disabled={!locationType || !address} 
        />
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  scrollViewContent: {
    padding: 20,
  },
  choiceContainer: {
    marginVertical: 20,
    gap: 15,
  },
  formContainer: {
    marginBottom: 30,
    gap: 10,
  },
});
