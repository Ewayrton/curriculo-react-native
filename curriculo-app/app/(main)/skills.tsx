import React from "react";
import { SafeAreaView } from "react-native";
import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import { RefreshScrollView } from "@/components/RefreshScrollView";
import { useColorScheme } from "nativewind"; // 1. Importar

// (Opcional) Helper para simular delay
const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export default function SkillsScreen() {
  
  // 2. Lógica do tema
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === "dark";
  const backgroundColor = isDark ? "#0F172A" : "#DFEFF4";

  const loadData = async () => {
    console.log("Buscando dados da página HABILIDADES...");
    await wait(2000); 
    console.log("Dados da página HABILIDADES carregados!");
  };

  return (
    // 3. Aplicar a cor dinâmica no SafeAreaView
    <SafeAreaView style={{ flex: 1, backgroundColor: backgroundColor }}>
      <RefreshScrollView
        onRefresh={loadData}
        scrollViewProps={{
          style: { flex: 1 },
          contentContainerStyle: { flex: 1 } 
        }}
      >
        {/* 4. Remover a cor fixa do Box (bg-transparent) */}
        <Box className="flex-1 pt-20 items-center justify-center bg-transparent">
          
        </Box>
      </RefreshScrollView>
    </SafeAreaView>
  );
}