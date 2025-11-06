// components/SideMenu.tsx (Corrigido)

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

const navItems = [
  { label: "Início", path: "/", icon: Home },
  { label: "Projetos", path: "/projects", icon: Briefcase },
  { label: "Formação Acadêmica", path: "/academic-exp", icon: GraduationCap },
  { label: "Experiência Profissional", path: "/work-exp", icon: Building2 },
  { label: "Habilidades", path: "/skills", icon: Award },
  { label: "Sobre", path: "/about", icon: Info },
] as const;

type ValidNavPath = typeof navItems[number]["path"];

type DrawerItemProps = {
  label: string;
  path: ValidNavPath;
  icon: LucideIcon;
};

export default function SideMenu(props: DrawerContentComponentProps) {
  const { navigation } = props;
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === "dark";
  const pathname = usePathname();

  // Esta função agora vai comparar "/projects" === "/projects" (e vai funcionar)
  const isActive = (path: string) => pathname === path;

  // Paleta de cores (sem alteração)
  const bgColor = isDark ? "#1e293b" : "#f1f5f9";
  const activeIcon = isDark ? "#ffffff" : "#2563EB";
  const inactiveIcon = isDark ? "#94a3b8" : "#475569";

  const DrawerItem = ({ label, path, icon: Icon }: DrawerItemProps) => {
    const active = isActive(path);

    return (
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
              ${active ? "font-bold" : "font-medium"}
            `}
          >
            {label}
          </Text>
        </Box>
      </Pressable>
    );
  };

  // O resto do componente continua igual
  return (
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={{
        flex: 1,
        backgroundColor: bgColor,
      }}
    >
      <View style={{ flex: 1, padding: 16 }}>
        <View style={{ flex: 1 }}>
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

          {navItems.map((item) => (
            <DrawerItem
              key={item.path}
              label={item.label}
              path={item.path}
              icon={item.icon}
            />
          ))}
        </View>

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