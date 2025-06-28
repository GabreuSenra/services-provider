import React from 'react';
import { StyleSheet, TextStyle, TouchableOpacity, ViewStyle } from 'react-native';

import { useThemeColor } from '@/hooks/useThemeColor'; // Para usar as cores dos temas
import { ThemedText } from './ThemedText'; // Vamos usar no texto

interface ThemedButtonProps {
  title: string; // O texto do botão
  onPress: () => void; // a função que será chamada ao clicar
  style?: ViewStyle; // o "css"
  textStyle?: TextStyle; // o "css" do texto
  disabled?: boolean; // desabilitar o botão
}

export default function ThemedButton({ title, onPress, style, textStyle, disabled = false }: ThemedButtonProps) {

  //usa a cor de details definida no Colors.ts
  const buttonBackgroundColor = useThemeColor({}, 'details'); 
                                                          
  //mantem a cor do texto como branco
  const buttonTextColor = '#FFFFFF';

  //vamos retorna um TouchableOpacity pois é mais interessante que um Button
  return (
    <TouchableOpacity
      style={[
        styles.button,
        { backgroundColor: buttonBackgroundColor }, //aplica a cor do background definida
        style, //aplica o css passado como parametro (props)
        disabled && styles.disabledButton, // o "css" para caso esteja desabilitado
      ]}
      onPress={onPress} // passa a função do parametro
      disabled={disabled} //define se esta desabilitado
      activeOpacity={0.7} // Oopacidade ao ser precionado
    >
      <ThemedText style={[styles.buttonText, { color: buttonTextColor }, textStyle]}> 
        {title} 
      </ThemedText>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    width: '100%', // Occupies the full width of the parent div
    paddingVertical: 15, // Vertical padding
    borderRadius: 10, // Rounded corners
    alignItems: 'center', // Centers text horizontally
    justifyContent: 'center', // Centers text vertically
    marginTop: 10, // Small top margin for spacing
    marginBottom: 10, // Small bottom margin
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  disabledButton: {
    opacity: 0.6, // Makes the button slightly transparent when disabled
  },
});
