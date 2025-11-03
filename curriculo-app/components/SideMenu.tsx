import React from "react";
import { View } from "react-native";
import {
  DrawerContentScrollView,
  DrawerContentComponentProps,
} from "@react-navigation/drawer";
import { Button, ButtonText } from "@/components/ui/button";
import ThemeSwitcher from "./ThemeSwitcher";
import { useColorScheme } from "nativewind";
import { router, usePathname } from "expo-router";

export default function SideMenu(props: DrawerContentComponentProps) {
  const { navigation } = props;
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === "dark";

  // Hook do expo-router para detectar a rota atual
  const pathname = usePathname();

  // Função utilitária para saber se o botão está ativo
  const isActive = (path: string) => pathname === path;

  // Cor de destaque do item ativo
  const activeColor = isDark ? "#60A5FA" : "#2563EB";

  return (
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={{
        flex: 1,
        backgroundColor: isDark ? "#1f2937" : "#f3f4f6",
      }}
    >
      <View
        style={{
          flex: 1,
          alignItems: "center",
          backgroundColor: isDark ? "#1f2937" : "#f3f4f6",
        }}
      >
        {/* Switch de tema */}
        <ThemeSwitcher className="mb-6 mt-2" />

        {/* Botões de navegação */}
        <Button
          variant="link"
          className="mb-4"
          onPress={() => router.push("/")}
        >
          <ButtonText
            style={{
              color: isActive("/")
                ? activeColor
                : isDark
                ? "#fff"
                : "#000",
              fontWeight: isActive("/") ? "bold" : "normal",
            }}
          >
            Início
          </ButtonText>
        </Button>
        
        <Button
          variant="link"
          className="mb-4"
          onPress={() => router.push("/(main)/projects")}
        >
          <ButtonText
            style={{
              color: isActive("/(main)/projects")
                ? activeColor
                : isDark
                ? "#fff"
                : "#000",
              fontWeight: isActive("/(main)/projects") ? "bold" : "normal",
            }}
          >
            Projetos
          </ButtonText>
        </Button>

        <Button
          variant="link"
          className="mb-4"
          onPress={() => router.push("/(main)/academic-exp")}
        >
          <ButtonText
            style={{
              color: isActive("/(main)/academic-exp")
                ? activeColor
                : isDark
                ? "#fff"
                : "#000",
              fontWeight: isActive("/(main)/academic-exp") ? "bold" : "normal",
            }}
          >
            Experiência Acadêmica
          </ButtonText>
        </Button>

        <Button
          variant="link"
          className="mb-4"
          onPress={() => router.push("/(main)/work-exp")}
        >
          <ButtonText
            style={{
              color: isActive("/(main)/work-exp")
                ? activeColor
                : isDark
                ? "#fff"
                : "#000",
              fontWeight: isActive("/(main)/work-exp") ? "bold" : "normal",
            }}
          >
            Experiência Profissional
          </ButtonText>
        </Button>

        <Button
          variant="link"
          className="mb-4"
          onPress={() => router.push("/(main)/skills")}
        >
          <ButtonText
            style={{
              color: isActive("/(main)/skills")
                ? activeColor
                : isDark
                ? "#fff"
                : "#000",
              fontWeight: isActive("/(main)/skills") ? "bold" : "normal",
            }}
          >
            Habilidades
          </ButtonText>
        </Button>

        <Button
          variant="link"
          className="mb-4"
          onPress={() => router.push("/(main)/about")}
        >
          <ButtonText
            style={{
              color: isActive("/(main)/about")
                ? activeColor
                : isDark
                ? "#fff"
                : "#000",
              fontWeight: isActive("/(main)/about") ? "bold" : "normal",
            }}
          >
            Sobre
          </ButtonText>
        </Button>

        {/* Botão de fechar o menu */}
        <Button
          className="absolute bottom-5 w-2/4 bg-[#4B8AC8]"
          onPress={() => navigation.closeDrawer()}
        >
          <ButtonText>Fechar menu</ButtonText>
        </Button>
      </View>
    </DrawerContentScrollView>
  );
}
