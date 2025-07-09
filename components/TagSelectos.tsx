import { useThemeColor } from '@/hooks/useThemeColor';
import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity
} from 'react-native';
import ThemedInput from './ThemedInput';
import { ThemedText } from './ThemedText';
import { ThemedView } from './ThemedView';

type Props = {
  suggestedTags: string[];
  selectedTags: string[];
  setSelectedTags: (tags: string[]) => void;
};

export default function TagSelector({ suggestedTags, selectedTags, setSelectedTags }: Props) {
  const [input, setInput] = useState('');

  // Adiciona nova tag, se não estiver repetida
  const addTag = (text: string) => {
    const newTags = text
      .split(',')
      .map(tag => tag.trim())
      .filter(tag => tag.length > 0 && !selectedTags.includes(tag));

    if (newTags.length > 0) {
      setSelectedTags([...selectedTags, ...newTags]);
    }
    setInput('');
  };

  const removeTag = (tagToRemove: string) => {
    setSelectedTags(selectedTags.filter(tag => tag !== tagToRemove));
  };

  const renderSuggestion = (tag: string) => (
    <TouchableOpacity
      key={tag}
      onPress={() => addTag(tag)}
      style={styles.suggestion}
    >
      <Text style={styles.suggestionText}>+ {tag}</Text>
    </TouchableOpacity>
  );

  return (
    <ThemedView >

      <ThemedInput
        placeholder="Digite uma tag e pressione enter"
        value={input}
        onChangeText={setInput}
        onSubmitEditing={() => addTag(input)}
      />

      <ThemedText style={styles.label}>Sugestões:</ThemedText>
      <ThemedView style={styles.suggestionContainer}>
        {suggestedTags
          .filter(tag => !selectedTags.includes(tag))
          .map(renderSuggestion)}
      </ThemedView>

      <ThemedText style={styles.label}>Tags selecionadas:</ThemedText>
      <ThemedView style={styles.tagContainer}>
        {selectedTags.map(tag => (
          <ThemedView key={tag} style={styles.tag}>
            <ThemedText style={styles.tagText}>{tag}</ThemedText>
            <TouchableOpacity onPress={() => removeTag(tag)}>
              <ThemedText style={styles.remove}> × </ThemedText>
            </TouchableOpacity>
          </ThemedView>
        ))}
      </ThemedView>

    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  label: { fontWeight: 'bold', marginTop: 16 },
  tagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 8
  },
  tag: {
    backgroundColor: useThemeColor({}, 'details'),
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    margin: 4
  },
  tagText: { fontSize: 14, color: '#ECEDEE' },
  remove: {
    marginLeft: 4,
    color: ' #11181C',
    fontSize: 18
  },
  input: {
    borderColor: '#CCC',
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginTop: 12
  },
  suggestionContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
    gap: 8
  },
  suggestion: {
    backgroundColor: '#F0F0F0',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    margin: 4
  },
  suggestionText: {
    color: '#333'
  }
});
