import { useState, useEffect } from "react";
import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import { Switch } from "@/components/ui/switch";
import { useColorScheme } from "nativewind";

type ThemeSwitcherProps = {
  className?: string;
};

export default function ThemeSwitcher({ className }: ThemeSwitcherProps) {
  const { colorScheme, setColorScheme } = useColorScheme();
  const [isDarkMode, setIsDarkMode] = useState(colorScheme === "dark");

  useEffect(() => {
    setIsDarkMode(colorScheme === "dark");
  }, [colorScheme]);

  const toggleDarkMode = (value: boolean) => {
    setIsDarkMode(value);
    setColorScheme(value ? "dark" : "light");
  };

  return (
    <Box className={`flex-row items-center ${className || ""}`}>
      <Text className="text-1xl mr-2 text-typography-500">
        Tema: {isDarkMode ? "Escuro" : "Claro"}
      </Text>
      <Switch value={isDarkMode} onValueChange={toggleDarkMode} />
    </Box>
  );
}