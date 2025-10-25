import { useState, useEffect } from 'react';
import { useColorScheme } from 'nativewind';
import { Box } from '@/components/ui/box';
import { Text } from '@/components/ui/text';
import { Switch } from '@/components/ui/switch';
import { HStack } from '@/components/ui/hstack';

export default function ThemeSwitcher() {
  const { colorScheme, setColorScheme } = useColorScheme();
  const [isDarkMode, setIsDarkMode] = useState(colorScheme === 'dark');

  useEffect(() => {
    setIsDarkMode(colorScheme === 'dark');
  }, [colorScheme]);

  const toggleDarkMode = () => {
    const newColorScheme = isDarkMode ? 'light' : 'dark';
    setIsDarkMode(!isDarkMode);
    setColorScheme(newColorScheme);
  };

  return (
    <Box className="p-4">
      <HStack className="space-x-2 items-center">
        <Text className="text-typography-900 dark:text-typography-50">
          Modo: {isDarkMode ? 'Escuro' : 'Claro'}
        </Text>
        <Switch
          isChecked={isDarkMode}
          onChange={toggleDarkMode}
          aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
        />
      </HStack>
    </Box>
  );
}
