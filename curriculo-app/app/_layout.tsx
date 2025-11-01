import { Drawer } from "expo-router/drawer";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { useColorScheme } from "nativewind";
import { useEffect } from "react";
import "@/global.css";
import SideMenu from "@/components/SideMenu";

export default function RootLayout() {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === "dark";

  useEffect(() => {
    // força re-render quando muda o tema
  }, [colorScheme]);

  return (
    <GluestackUIProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Drawer
          screenOptions={{
            headerShown: true,
            headerStyle: {
              backgroundColor: isDark ? "#111827" : "#f9fafb", // dark / light
            },
            headerTintColor: isDark ? "#f3f4f6" : "#111827",
            drawerStyle: {
              backgroundColor: isDark ? "#1f2937" : "#f3f4f6",
              width: 300,
            },
            drawerActiveTintColor: isDark ? "#60a5fa" : "#0284c7",
            drawerInactiveTintColor: isDark ? "#d1d5db" : "#374151",
          }}
          drawerContent={(props) => <SideMenu {...props} />}
        >
          <Drawer.Screen
            name="index"
            options={{
              title: "Início",
              // ✅ AQUI colocamos o fundo principal da tela (substitui o sceneContainerStyle)
              drawerItemStyle: { display: "none" }, // oculta o item "index" da lista do menu
            }}
          />
        </Drawer>
      </GestureHandlerRootView>
    </GluestackUIProvider>
  );
}
