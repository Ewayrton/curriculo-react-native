// app/index.tsx (Atualizado)

import React from "react";
import { Image } from "react-native";
import { Text } from "@/components/ui/text";
import { Box } from "@/components/ui/box";
import WorkButton from "@/components/WorkButton";
import { MotiView } from "moti";
import GradientBackground from "@/components/GradientBrackground";

// (Opcional) Helper para simular delay
const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export default function IndexScreen() {

  // 1. Adicionar a função de carregar dados
  const loadData = async () => {
    console.log("Buscando dados da página INDEX...");
    await wait(1500); 
    console.log("Dados da página INDEX carregados!");
  };

  return (
    // 2. Passar a função 'onRefresh' para o GradientBackground
    <GradientBackground onRefresh={loadData}>
      {/* O Box interno continua igual. 
        O ScrollView dentro do GradientBackground usará 'flexGrow: 1',
        então este Box precisa de 'flex: 1' para centralizar o conteúdo.
      */}
      <Box className="flex-1 justify-center items-center px-10">

        {/* Título com animação */}
        <MotiView
          from={{ opacity: 0, translateY: -20 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ delay: 200, duration: 800 }}
        >
          <Text className="text-4xl font-bold text-white mb-10 tracking-wide">
            CURRÍCULO
          </Text>
        </MotiView>

        {/* Imagem com fade suave */}
        <MotiView
          from={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 400, duration: 800 }}
        >
          <Image
            source={require("../assets/images/perfil_app.png")}
            className="w-36 h-36 rounded-full mb-8 border-4 border-white shadow-lg"
            resizeMode="cover"
          />
        </MotiView>

        {/* Subtítulo */}
        <MotiView
          from={{ opacity: 0, translateY: 10 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ delay: 600, duration: 700 }}
        >
          <Text className="text-2xl font-semibold text-white mb-3">
            Desenvolvedor React Native
          </Text>
        </MotiView>

        {/* Descrição */}
        <MotiView
          from={{ opacity: 0, translateY: 10 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ delay: 800, duration: 700 }}
        >
          <Text className="text-base text-white text-center leading-6 mb-10 opacity-90">
            Construo aplicações mobile com foco em experiência, performance e design intuitivo.
          </Text>
        </MotiView>

        {/* Botão */}
        <MotiView
          from={{ opacity: 0, translateY: 10 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ delay: 1000, duration: 700 }}
        >
          <Box className="mt-2">
            <WorkButton />
          </Box>
        </MotiView>
        
      </Box>
    </GradientBackground>
  );
}