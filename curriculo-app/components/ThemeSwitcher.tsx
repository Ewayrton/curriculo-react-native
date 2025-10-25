import { useState, useEffect } from 'react';
import { Box } from '@/components/ui/box';
import { Text } from '@/components/ui/text';
import { Switch } from '@/components/ui/switch';
import { useColorScheme } from 'nativewind';

export default function ThemeSwitcher() {
  const { colorScheme, setColorScheme } = useColorScheme();
  const [isDarkMode, setIsDarkMode] = useState(colorScheme === 'dark');

  useEffect(() => {
    setIsDarkMode(colorScheme === 'dark');
  }, [colorScheme]);

  const toggleDarkMode = (value: boolean) => {
    setIsDarkMode(value);
    setColorScheme(value ? 'dark' : 'light');
  };

  return (
    <Box className="flex-row items-center">
      <Text className="text-2xl mr-5 text-typography-900">
        Modo: {isDarkMode ? 'Escuro' : 'Claro'}
      </Text>
      <Switch
        value={isDarkMode}
        onValueChange={toggleDarkMode}
      />
    </Box>
  );
}