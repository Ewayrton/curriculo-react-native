import React from "react";
import { View } from "react-native";
import {
  DrawerContentScrollView,
  DrawerContentComponentProps,
} from "@react-navigation/drawer";
import { Button, ButtonText } from "@/components/ui/button";
import ThemeSwitcher from "./ThemeSwitcher";
import { useColorScheme } from "nativewind";
import { router } from "expo-router";

export default function SideMenu(props: DrawerContentComponentProps) {
  const { navigation } = props;
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === "dark";

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
        <ThemeSwitcher className="mb-6 mt-2" />

        <Button variant="link" className="mb-4" onPress={() => router.push("/projects")}>
          <ButtonText>Projetos</ButtonText>
        </Button>

        <Button variant="link" className="mb-4" onPress={() => router.push("/academic-exp")}>
          <ButtonText>Experiência Acadêmica</ButtonText>
        </Button>

        <Button variant="link" className="mb-4" onPress={() => router.push("/work-exp")}>
          <ButtonText>Experiência Profissional</ButtonText>
        </Button>

        <Button variant="link" className="mb-4" onPress={() => router.push("/skills")}>
          <ButtonText>Habilidades</ButtonText>
        </Button>

        <Button variant="link" className="mb-4" onPress={() => router.push("/about")}>
          <ButtonText>Sobre</ButtonText>
        </Button>

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
