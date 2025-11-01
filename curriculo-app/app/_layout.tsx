import { Drawer } from "expo-router/drawer";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import SideMenu from "@/components/SideMenu";
import "@/global.css";
import type { DrawerContentComponentProps } from "@react-navigation/drawer";
import { useColorScheme } from "nativewind";
import React from "react";

export default function RootLayout() {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === "dark";

  return (
    <GluestackUIProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Drawer
          screenOptions={{
            headerShown: true,
            headerStyle: {
              backgroundColor: isDark ? "#1f2937" : "#DFEFF4",
            },
            headerTitleStyle: {
              color: isDark ? "#fff" : "#000",
              fontWeight: "bold",
            },
            headerTintColor: isDark ? "#fff" : "#000",
            drawerStyle: {
              backgroundColor: "transparent",
              width: "70%",
            },
          }}
          drawerContent={(props: DrawerContentComponentProps) => (
            <SideMenu {...props} />
          )}
        >
          <Drawer.Screen
            name="index"
            options={{
              title: "Ewayrton Brito de Oliveira - DEV",
            }}
          />
        </Drawer>
      </GestureHandlerRootView>
    </GluestackUIProvider>
  );
}
