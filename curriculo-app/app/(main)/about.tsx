import React from "react";
import { SafeAreaView } from "react-native";
import { useColorScheme } from "nativewind";
import { RefreshScrollView } from "@/components/RefreshScrollView";

// Importando componentes do Gluestack UI "linha por linha"
import { Box } from "@/components/ui/box";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { Card } from "@/components/ui/card";
import { Badge, BadgeText } from "@/components/ui/badge";
import { HStack } from "@/components/ui/hstack";
import { Icon } from "@/components/ui/icon";

// Importando ícones (baseado no seu package.json e novos ícones)
import {
  Cpu,
  Navigation,
  Palette,
  Sparkles,
  Code,
  TerminalSquare,
  Zap, // Novo ícone para "features"
  Database, // Novo ícone para "API/backend"
} from "lucide-react-native";

// 1. Dados das TECNOLOGIAS (baseado no package.json)
const techGroups = [
  {
    title: "Core & Frameworks",
    icon: Cpu,
    techs: ["React 19", "React Native", "Expo SDK 54", "TypeScript"],
  },
  {
    title: "Navegação",
    icon: Navigation,
    techs: [
      "Expo Router v6",
      "React Navigation (Drawer)",
      "React Native Gesture Handler",
      "React Native Reanimated",
    ],
  },
  {
    title: "UI & Design System",
    icon: Palette,
    techs: [
      "Gluestack UI",
      "NativeWind v4",
      "Tailwind CSS",
      "Lucide Icons",
      "Expo Linear Gradient",
    ],
  },
  {
    title: "Animação & Interação",
    icon: Sparkles,
    techs: ["Moti", "Gorhom BottomSheet", "Expo Haptics"],
  },
  {
    title: "Ferramentas & Configuração",
    icon: TerminalSquare,
    techs: ["ESLint", "Babel Module Resolver", "Expo Dev Client"],
  },
];

// 2. Dados das FUNCIONALIDADES EXTRAS (como solicitado)
const extraFeatures = [
  {
    title: "Experiência do Usuário",
    icon: Zap,
    action: "success", // Badge verde
    items: [
      "Dark Mode / Light Mode",
      "Pull-to-Refresh (todas as telas)",
      "Animações fluídas (Moti)",
    ],
  },
  {
    title: "Gerenciamento de Conteúdo (Planejado)",
    icon: Database,
    action: "warning", // Badge amarelo
    items: [
      "Integração com API Backend",
      "CMS para Habilidades",
      "CMS para Experiências Profissionais",
      "CMS para Experiências Acadêmicas",
    ],
  },
];

// (Opcional) Helper para simular delay
const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export default function AboutScreen() {
  // Lógica de Tema
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === "dark";
  const backgroundColor = isDark ? "#0F172A" : "#DFEFF4";
  const iconColor = isDark ? "#94a3b8" : "#475569";

  // Lógica de Refresh
  const loadData = async () => {
    console.log("Atualizando dados da página SOBRE...");
    await wait(1000);
    console.log("Dados da página SOBRE atualizados!");
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: backgroundColor }}>
      <RefreshScrollView
        onRefresh={loadData}
        scrollViewProps={{
          contentContainerStyle: { paddingBottom: 40 },
        }}
      >
        <Box className="px-5 py-5">
          {/* --- SEÇÃO DE TECNOLOGIAS --- */}
          <HStack className="items-center mb-2">
            <Icon as={Code} size="xl" color={iconColor} className="mr-2" />
            <Heading className="text-3xl font-bold text-black dark:text-white">
              Sobre este App
            </Heading>
          </HStack>
          <Text className="text-base text-slate-600 dark:text-slate-400 mb-6">
            Este aplicativo foi construído com as tecnologias mais modernas
            do ecossistema React Native.
          </Text>

          {techGroups.map((group) => (
            <Card
              key={group.title}
              className="w-full mb-4 p-4 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700"
            >
              <HStack className="items-center mb-3">
                <Icon
                  as={group.icon}
                  size="md"
                  color={iconColor}
                  className="mr-2.5"
                />
                <Heading className="text-lg font-semibold text-black dark:text-white">
                  {group.title}
                </Heading>
              </HStack>
              <Box className="flex-row flex-wrap">
                {group.techs.map((tech) => (
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
  
          <HStack className="items-center mt-8 mb-2">
            <Icon as={Zap} size="xl" color={iconColor} className="mr-2" />
            <Heading className="text-3xl font-bold text-black dark:text-white">
              Funcionalidades Extras
            </Heading>
          </HStack>
          <Text className="text-base text-slate-600 dark:text-slate-400 mb-6">
            Além das bibliotecas, o app implementa features de
            alta qualidade para uma ótima experiência.
          </Text>

          {extraFeatures.map((group) => (
            <Card
              key={group.title}
              className="w-full mb-4 p-4 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700"
            >
              <HStack className="items-center mb-3">
                <Icon
                  as={group.icon}
                  size="md"
                  color={iconColor}
                  className="mr-2.5"
                />
                <Heading className="text-lg font-semibold text-black dark:text-white">
                  {group.title}
                </Heading>
              </HStack>
              <Box className="flex-row flex-wrap">
                {group.items.map((item) => (
                  <Badge
                    key={item}
                    // @ts-ignore - Permite usar "success" e "warning"
                    action={group.action} 
                    variant="solid"
                    className="mr-2 mb-2 rounded-md" 
                    // Aplica a cor correta com base na "action"
                  >
                    <BadgeText 
                      className={
                        group.action === "success" 
                          ? "text-green-800 dark:text-green-200"
                          : "text-yellow-800 dark:text-yellow-200"
                      }
                    >
                      {item}
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