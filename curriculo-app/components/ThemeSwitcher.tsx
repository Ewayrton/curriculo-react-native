import { useState, useEffect } from 'react';
import { Box } from '@/components/ui/box';
import { Text } from '@/components/ui/text';
import { Switch } from '@/components/ui/switch';
import { useColorScheme } from 'nativewind';

// 1. Defininindo um tipo para as props que o componente vai receber
type ThemeSwitcherProps = {
  className?: string;
};

// 2. Adicionar na assinatura da função para aceitar 'className'
export default function ThemeSwitcher({ className }: ThemeSwitcherProps) {
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
    // 3. Mescle a 'className' recebida com as classes existentes do Box
    <Box className={`flex-row items-center ${className || ''}`}>
      <Text className="text-1xl mr-2 text-typography-500">
        Tema: {isDarkMode ? 'Escuro' : 'Claro'}
      </Text>
      <Switch
        value={isDarkMode}
        onValueChange={toggleDarkMode}
      />
    </Box>
  );
}