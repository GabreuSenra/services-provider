import { useThemeColor } from '@/hooks/useThemeColor';
import { StyleSheet, TextInput } from 'react-native';

export default function ThemedInput(props: any) {
  const backgroundColor = useThemeColor({}, 'background');
  const textColor = useThemeColor({}, 'text');

  return (
    <TextInput
      placeholderTextColor={textColor + '99'}
      style={[styles.input, { backgroundColor, color: textColor},]}
      {...props}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    height: 50,
    borderRadius: 10,
    paddingHorizontal: 16,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 16,
  },
});
