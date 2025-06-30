// components/ProgressBar.tsx

import { useThemeColor } from '@/hooks/useThemeColor'; // Importe useThemeColor
import React from 'react';
import { StyleSheet, View } from 'react-native';

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

export default function ProgressBar({ currentStep, totalSteps }: ProgressBarProps) {
  // Calcula a porcentagem de progresso
  const progressPercentage = (currentStep / totalSteps) * 100;

  // Cores do tema para a barra de progresso
  const activeColor = useThemeColor({}, 'details'); // Cor ativa 
  const trackColor = useThemeColor({}, 'btnBackground'); // Cor de fundo da barra (ex: cinza claro)

  return (
    <View style={styles.container}>
      <View style={[styles.progressBarTrack, { backgroundColor: trackColor }]}>
        <View style={[styles.progressBarFill, { width: `${progressPercentage}%`, backgroundColor: activeColor }]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginTop: -20
  },
  progressBarTrack: {
    height: 8, // Altura da barra
    borderRadius: 4, // Bordas arredondadas
    overflow: 'hidden', // Garante que o preenchimento seja arredondado
    width: '100%',
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 4, // Bordas arredondadas
  },
});