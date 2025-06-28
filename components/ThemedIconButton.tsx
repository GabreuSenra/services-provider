// components/ThemedIconButton.tsx

import { useThemeColor } from '@/hooks/useThemeColor';
import React from 'react';
import { Image, ImageSourcePropType, StyleSheet, TextStyle, TouchableOpacity, ViewStyle } from 'react-native'; // <--- ADICIONE Image e ImageSourcePropType
import { ThemedText } from './ThemedText';

interface ThemedIconButtonProps {
  iconSource: ImageSourcePropType; 
  iconSize?: number;
  iconColor?: string; 
  title: string;
  onPress: () => void;
  style?: ViewStyle;
  textStyle?: TextStyle;
  disabled?: boolean;
}

export default function ThemedIconButton({
  iconSource,
  iconSize = 30,
  iconColor,
  title,
  onPress,
  style,
  textStyle,
  disabled = false,
}: ThemedIconButtonProps) {
  const buttonBackgroundColor = useThemeColor({}, 'btnBackground');
  const defaultIconColor = iconColor || useThemeColor({}, 'details'); // Usará a cor do tema 'details' ou a passada

  return (
    <TouchableOpacity
      style={[
        styles.button,
        { backgroundColor: buttonBackgroundColor },
        style,
        disabled && styles.disabledButton,
      ]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.7}
    >
      <Image
        source={iconSource} 
        style={{
          width: iconSize,
          height: iconSize,
          //tintColor: defaultIconColor, // <--- Use tintColor para colorir (funciona bem com SVGs)
        }}
        resizeMode="contain" // Garante que a imagem se ajuste ao tamanho sem cortar
      />

      <ThemedText style={[styles.buttonText, textStyle]}>
        {title}
      </ThemedText>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    padding: 5,
  },
  buttonText: {
    fontSize: 10,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  disabledButton: {
    opacity: 0.6,
  },
});