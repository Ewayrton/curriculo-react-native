import React from "react";
import { SafeAreaView, Pressable, Linking } from "react-native";
import { useColorScheme } from "nativewind";
import { RefreshScrollView } from "@/components/RefreshScrollView";

import { Box } from "@/components/ui/box";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { Card } from "@/components/ui/card";
import { Badge, BadgeText } from "@/components/ui/badge";
import { HStack } from "@/components/ui/hstack";
import { Icon } from "@/components/ui/icon";

import { Briefcase, Github } from "lucide-react-native";

// 1. Dados fictícios (mock data) para os projetos
// (Você pode substituir isso por uma API no futuro)
const projectData = [
  {
    id: "2",
    title: "Este App de Currículo",
    description:
      "O próprio app que você está usando! Construído do zero com Expo, React Native e Gluestack UI para ser um portfólio interativo.",
    techs: ["Expo", "NativeWind", "Gluestack UI", "Expo Router", "Moti"],
    link: "https://github.com/ewayrton/curriculo-react-native",
  },
  {
    id: "1",
    title: "Jogo da Forca (Em desenvolvimento)",
    description:
      "Um jogo da forca simples, construído com React Native e Expo. Os usuários podem adivinhar letras e tentar descobrir a palavra secreta.",
    techs: ["React Native", "TypeScript", "Gluestack UI", "Reanimated"],
    link: "https://github.com/Ewayrton/atv-JOGO-DA-FORCA-PDM", 
  },

];

// (Opcional) Helper para simular delay
const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export default function ProjectsScreen() {
  // Lógica de Tema
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === "dark";
  const backgroundColor = isDark ? "#0F172A" : "#DFEFF4";
  const iconColor = isDark ? "#94a3b8" : "#475569"; // slate-400 | slate-600

  // Lógica de Refresh
  const loadData = async () => {
    console.log("Buscando dados da página PROJETOS...");
    await wait(1000);
    console.log("Dados da página PROJETOS carregados!");
  };

  // Função para abrir o link
  const openLink = (url: string) => {
    Linking.openURL(url).catch((err) =>
      console.error("Não foi possível abrir o link", err)
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: backgroundColor }}>
      <RefreshScrollView
        onRefresh={loadData}
        scrollViewProps={{
          // 2. Ajustamos o ScrollView para permitir rolagem (não centralizar)
          contentContainerStyle: { paddingBottom: 40 },
        }}
      >
        {/* 3. Container principal com padding */}
        <Box className="px-5 py-5">
          <HStack className="items-center mb-6">
            <Icon as={Briefcase} size="xl" color={iconColor} className="mr-2" />
            <Heading className="text-3xl font-bold text-black dark:text-white">
              Projetos Mobile
            </Heading>
          </HStack>

          {/* 4. Mapeando os dados do projeto em Cards */}
          {projectData.map((project) => (
            <Card
              key={project.id}
              className="w-full mb-4 p-4 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700"
            >
              <HStack className="justify-between items-center mb-2">
                <Heading className="text-lg font-semibold text-black dark:text-white w-[85%]">
                  {project.title}
                </Heading>
                {/* Botão para o GitHub */}
                <Pressable
                  onPress={() => openLink(project.link)}
                  className="p-1"
                >
                  <Icon
                    as={Github}
                    size="md"
                    color={iconColor}
                  />
                </Pressable>
              </HStack>

              <Text className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                {project.description}
              </Text>

              {/* 5. Box com 'wrap' para as badges */}
              <Box className="flex-row flex-wrap">
                {project.techs.map((tech) => (
                  <Badge
                    key={tech}
                    action="info"
                    variant="solid"
                    className="mr-2 mb-2 bg-blue-100 dark:bg-blue-900 rounded-md"
                  >
                    <BadgeText className="text-blue-800 dark:text-blue-200 font-medium">
                      {tech}
                    </BadgeText>
                  </Badge>
                ))}
              </Box>
            </Card>
          ))}
        </Box>
      </RefreshScrollView>
    </SafeAreaView>
  );
}