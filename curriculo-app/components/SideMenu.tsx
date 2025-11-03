import React from "react";
import { View, Image, Pressable } from "react-native";
import {
  DrawerContentScrollView,
  DrawerContentComponentProps,
} from "@react-navigation/drawer";
import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import { Button, ButtonText } from "@/components/ui/button";
import ThemeSwitcher from "./ThemeSwitcher";
import { useColorScheme } from "nativewind";
import { router, usePathname } from "expo-router";

import {
  Home,
  Briefcase,
  GraduationCap,
  Building2,
  Award,
  Info,
  X,
  type LucideIcon,
} from "lucide-react-native";

// 1. Adicionar "as const" no final do array.
// Isso diz ao TypeScript que este array é imutável 
// e seus valores são literais (ex: "/", não string).
const navItems = [
  { label: "Início", path: "/", icon: Home },
  { label: "Projetos", path: "/(main)/projects", icon: Briefcase },
  { label: "Formação", path: "/(main)/academic-exp", icon: GraduationCap },
  { label: "Experiência", path: "/(main)/work-exp", icon: Building2 },
  { label: "Habilidades", path: "/(main)/skills", icon: Award },
  { label: "Sobre", path: "/(main)/about", icon: Info },
] as const; // <--- CORREÇÃO AQUI

// 2. Criar um tipo dinâmico para as rotas válidas
// Isso extrai todos os valores de 'path' do array acima.
type ValidNavPath = typeof navItems[number]["path"];

// 3. Atualizar a interface de props
type DrawerItemProps = {
  label: string;
  path: ValidNavPath; // <--- CORREÇÃO AQUI (usando o tipo dinâmico)
  icon: LucideIcon;
};

export default function SideMenu(props: DrawerContentComponentProps) {
  const { navigation } = props;
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === "dark";
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  // Paleta de cores (sem alteração)
  const bgColor = isDark ? "#1e293b" : "#f1f5f9";
  const activeBg = isDark ? "#2563EB" : "#dbeafe";
  const activeText = isDark ? "#ffffff" : "#2563EB";
  const inactiveText = isDark ? "#cbd5e1" : "#334155";
  const activeIcon = isDark ? "#ffffff" : "#2563EB";
  const inactiveIcon = isDark ? "#94a3b8" : "#475569";

  // 4. Aplicar a tipagem no componente local
  const DrawerItem = ({ label, path, icon: Icon }: DrawerItemProps) => {
    const active = isActive(path);

    return (
      // Agora 'path' tem o tipo correto e o router.push aceita.
      <Pressable onPress={() => router.push(path)}>
        <Box
          className={`
            flex-row items-center w-full px-3 py-3 rounded-lg mb-1
            ${active ? (isDark ? "bg-blue-600" : "bg-blue-100") : "bg-transparent"}
          `}
        >
          <Icon color={active ? activeIcon : inactiveIcon} size={20} />
          <Text
            className={`
              ml-4 text-base
              ${active ? (isDark ? "text-white" : "text-blue-600") : (isDark ? "text-slate-300" : "text-slate-700")}
              ${active ? "font-bold" : "medium"}
            `}
          >
            {label}
          </Text>
        </Box>
      </Pressable>
    );
  };

  return (
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={{
        flex: 1,
        backgroundColor: bgColor,
      }}
    >
      <View style={{ flex: 1, padding: 16 }}>
        {/* === SEÇÃO SUPERIOR: Perfil e Navegação === */}
        <View style={{ flex: 1 }}>
          
          {/* Perfil */}
          <Box className="flex-row items-center px-3 mb-6">
            <Image
              source={require("../assets/images/perfil_app.png")} //
              className="w-12 h-12 rounded-full border-2 border-blue-400"
            />
            <Box className="ml-3">
              <Text className="text-lg font-bold text-black dark:text-white">
                Ewayrton
              </Text>
              <Text className="text-sm text-slate-500 dark:text-slate-400">
                Ver Currículo
              </Text>
            </Box>
          </Box>

          {/* Itens de Navegação */}
          {navItems.map((item) => (
            <DrawerItem
              key={item.path}
              label={item.label}
              path={item.path}
              icon={item.icon}
            />
          ))}
        </View>

        {/* === SEÇÃO INFERIOR: Ações === */}
        <View>
          <ThemeSwitcher className="mb-4" />
          <Button
            className="w-full"
            variant="outline"
            action="secondary"
            onPress={() => navigation.closeDrawer()}
          >
            <X color={isDark ? "#94a3b8" : "#475569"} size={18} style={{ marginRight: 8 }} />
            <ButtonText className="text-slate-600 dark:text-slate-400">
              Fechar
            </ButtonText>
          </Button>
        </View>
      </View>
    </DrawerContentScrollView>
  );
}