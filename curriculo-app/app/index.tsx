import React from "react";
import { Image } from "react-native";
import { Text } from "@/components/ui/text";
import { Box } from "@/components/ui/box";
import WorkButton from "@/components/WorkButton";
import GradientBackground from "@/components/GradientBrackground";

export default function IndexScreen() {
  return (
    <GradientBackground>
      <Box className="flex-1 justify-center items-center">

        {/* Título */}
        <Box className="items-center mb-10">
          <Text className="text-4xl font-bold text-white">
            MEU CURRÍCULO
          </Text>
        </Box>

        {/* Foto de perfil */}
        <Box className="items-center mb-10">
          <Image
            source={require("@/assets/images/perfil_app.png")}
            className="w-40 h-40 rounded-full border-4 border-white"
            resizeMode="cover"
          />
        </Box>

        {/* Subtítulo */}
        <Box className="items-center mb-4">
          <Text className="text-3xl font-semibold text-white">
            Desenvolvedor React-Native
          </Text>
        </Box>

        {/* Descrição */}
        <Box className="items-center px-10">
          <Text className="text-base text-white text-center">
            Construo aplicações mobile usando React Native e Expo.
          </Text>
        </Box>

        {/* Botão de ação */}
        <Box className="mt-10">
          <WorkButton />
        </Box>

      </Box>
    </GradientBackground>
  );
}
