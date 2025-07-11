/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = '#11181C';
const tintColorDark = '#fff';
const blueColor = '#41a4ff';

export const Colors = {
  light: {
    text: '#11181C',
    subtext: '#666',
    background: '#fff',
    tint: tintColorLight,
    icon: '#11181C',
    tabIconDefault: '#11181C',
    tabIconSelected: tintColorLight,
    details: blueColor,
    btnBackground: '#F5F5F5'
  },
  dark: {
    text: '#ECEDEE',
    subtext: '#a3a3a3ff',
    background: '#151718',
    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
    details: blueColor, 
    btnBackground: '#121212'
  },
};
