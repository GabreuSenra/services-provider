import { globalStyles } from '@/constants/globalStyle';
import { useThemeColor } from '@/hooks/useThemeColor';
import { TextInput } from 'react-native';

export default function ThemedInput(props: any) {
  const textColor = useThemeColor({}, 'text');

  return (
    <TextInput
      placeholderTextColor={textColor + '99'}
      style={[globalStyles.input]}
      {...props}
    />
  );
}
