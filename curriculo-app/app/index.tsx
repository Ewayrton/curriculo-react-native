import React from "react";
import { View, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Text } from "@/components/ui/text";
import { Box } from "@/components/ui/box";
import WorkButton from "@/components/WorkButton";

export default function IndexScreen() {
  return (
    <LinearGradient
      colors={["#346CC7", "#a1dbffff"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      className="flex-1 justify-center items-center"
    >
      <Box className="items-center">

        <Box className="items-center mb-10">
          <Text className="text-4xl font-bold text-white">
            MEU CURRÍCULO
          </Text>
        </Box>

        <Box className="items-center mb-10">
          <Image
            source={require("@/assets/images/perfil_app.png")}
            className="w-40 h-40 rounded-full border-4 border-white"
            resizeMode="cover"
          />
        </Box>

        <Box className="items-center mb-4">
          <Text className="text-3xl font-semibold text-white">
            Desenvolvedor React-Native
          </Text>
        </Box>

        <Box className="items-center px-10">
          <Text className="text-base text-white text-center">
            Construo aplicações mobile usando React Native e Expo.
          </Text>
        </Box>

        <Box className="mt-10">
          <WorkButton />
        </Box>
        
      </Box>
    </LinearGradient>
  );
}