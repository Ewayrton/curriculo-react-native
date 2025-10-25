import React, { useRef, useState } from "react";
import { Animated, TouchableOpacity } from "react-native";
import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import { useColorScheme } from "nativewind";
import { Moon, Sun, Menu } from "lucide-react-native";

export default function SideMenu({ children }: { children: React.ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const slideAnim = useRef(new Animated.Value(-250)).current; // menu começa escondido
  const { colorScheme, setColorScheme } = useColorScheme();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
    Animated.timing(slideAnim, {
      toValue: menuOpen ? -250 : 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const toggleTheme = () => {
    setColorScheme(colorScheme === "dark" ? "light" : "dark");
  };

  return (
    <Box className="flex-1 bg-background-0">
      {/* Botão Sanduíche */}
      <TouchableOpacity onPress={toggleMenu} style={{ padding: 16 }}>
        <Menu size={28} color={colorScheme === "dark" ? "white" : "black"} />
      </TouchableOpacity>

      {/* Conteúdo principal */}
      {children}

      {/* Menu lateral animado */}
      <Animated.View
        style={{
          position: "absolute",
          left: slideAnim,
          top: 0,
          bottom: 0,
          width: 250,
          backgroundColor: colorScheme === "dark" ? "#1e1e1e" : "#fff",
          shadowColor: "#000",
          shadowOpacity: 0.3,
          shadowRadius: 5,
          elevation: 5,
          paddingTop: 60,
          paddingHorizontal: 20,
        }}
      >
        <Text className="text-xl font-bold mb-5 text-typography-900">
          Menu
        </Text>

        {/* Opções do menu */}
        <TouchableOpacity onPress={toggleTheme}>
          <Box className="flex-row items-center mb-5">
            {colorScheme === "dark" ? (
              <Sun size={20} color="#facc15" />
            ) : (
              <Moon size={20} color="#0ea5e9" />
            )}
            <Text className="ml-3 text-lg text-typography-900">
              Alternar Tema
            </Text>
          </Box>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => alert("Navegar para tela X")}>
          <Text className="text-lg text-typography-900 mb-3">Página 1</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => alert("Navegar para tela Y")}>
          <Text className="text-lg text-typography-900">Página 2</Text>
        </TouchableOpacity>
      </Animated.View>
    </Box>
  );
}