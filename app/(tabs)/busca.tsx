import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function NomeDoComponente() {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>NomeDoComponente</Text>
    </View>
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