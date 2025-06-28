// components/ServiceCategoryCard.tsx

import React from 'react';
import { Image, ImageSourcePropType, Platform, StyleSheet, TextStyle, TouchableOpacity, View, ViewStyle } from 'react-native';
import { ThemedText } from './ThemedText'; // Importe ThemedText

interface ServiceCategoryCardProps {
  name: string;
  backgroundColor: string;
  imageSource: ImageSourcePropType;
  onPress: () => void;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export default function ServiceCategoryCard({ name, backgroundColor, imageSource, onPress, style, textStyle }: ServiceCategoryCardProps) {
  const textColor = '#FFFFFF'; 

  return (
    <TouchableOpacity
      style={[styles.card, { backgroundColor: backgroundColor }, style]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      {/* Container para o texto - posicionado absolutamente no canto superior esquerdo */}
      <View style={styles.textContainer}>
        <ThemedText
          style={[styles.cardText, { color: textColor }, textStyle]}
          numberOfLines={2} // <--- Permite que o texto quebre em até 2 linhas
          ellipsizeMode="tail" // <--- Adiciona "..." se o texto for cortado
        >
          {name}
        </ThemedText>
      </View>
      
      {/* Imagem - posicionado absolutamente no canto inferior direito */}
      <Image
        source={imageSource}
        style={styles.cardImage}
        resizeMode="contain"
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 8,
    overflow: 'hidden',
    position: 'relative', // Define o card como referência para os filhos absolutos
    padding: 10, // Padding geral para o conteúdo do card
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  textContainer: {
    position: 'absolute',
    top: 10,              // <--- Distância do topo
    left: 10,             // <--- Distância da esquerda
    right: 50,            // Garante espaço para a imagem não sobrepor o texto
    // Explicitamente alinha o conteúdo do texto ao topo e à esquerda dentro deste container
    justifyContent: 'flex-start', // <--- Garante alinhamento vertical superior
    alignItems: 'flex-start',     // <--- Garante alinhamento horizontal esquerdo
    ...Platform.select({
      web: {
        top: 20,              // <--- Distância do topo
        left: 20,             // <--- Distância da esquerda
        right: 70,            // Garante espaço para a imagem não sobrepor o texto
      },
    }),
  },
  cardText: {
    fontSize: 14, 
    fontWeight: 'bold',
    ...Platform.select({
      web: {
        fontSize: 18, 
      },
    }),
  },
  cardImage: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 60,
    height: 60,
  },
});