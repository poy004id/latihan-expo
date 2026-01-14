import { AuthProvider } from '@/contexts/AuthContext';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { PaperProvider } from 'react-native-paper';
import 'react-native-reanimated';
import NavGuard from "./NavGuard";

import { useColorScheme } from '@/hooks/use-color-scheme';

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <PaperProvider>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <AuthProvider>
          <NavGuard/>
        </AuthProvider>
        <StatusBar style="auto" />
      </ThemeProvider>
    </PaperProvider>
  );
}
