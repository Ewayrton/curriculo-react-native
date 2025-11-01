import React from "react";
import { SafeAreaView } from "react-native";
import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";

export default function SkillScreen() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#DFEFF4" }}>
      <Box className="flex-4xl pt-20 items-center justify-center bg-[#DFEFF4]">
        <Text className="text-4xl font-bold"
        style={{
            color: "#72b5f7ff",
            textShadowColor: "#d1d1d1ff",   // Cor da sombra
            textShadowOffset: { width: 2, height: 2 }, // Deslocamento da sombra
            textShadowRadius: 4,       // Quanto a sombra se espalha
        }}
        >
        HABILIDADES
        </Text>
      </Box>
    </SafeAreaView>
  );
}
