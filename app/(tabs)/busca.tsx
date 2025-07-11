import ThemedButton from '@/components/ThemedButton';
import { ThemedView } from '@/components/ThemedView';
import { router } from 'expo-router';
import React from 'react';
import { StyleSheet } from 'react-native';

export default function NomeDoComponente() {

  function handleNext(){
    router.push('/signup');
  }

  return (
    <ThemedView style={styles.container}>
      <ThemedButton title='Serviço' onPress={handleNext}></ThemedButton>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 80,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});