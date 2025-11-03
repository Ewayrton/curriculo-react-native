import React from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import { useColorScheme } from "nativewind";

type AppBackgroundProps = {
  children: React.ReactNode;
  scrollable?: boolean;
};

export default function AppBackground({ children, scrollable = false }: AppBackgroundProps) {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === "dark";

  // 🎨 Cores fixas (sem gradiente)
  const backgroundColor = isDark ? "#0F172A" : "#DFEFF4";

  const content = (
    <View style={[styles.inner, { backgroundColor }]}>
      {children}
    </View>
  );

  return scrollable ? (
    <ScrollView
      contentContainerStyle={[styles.scroll, { backgroundColor }]}
      showsVerticalScrollIndicator={false}
      bounces={true}
      overScrollMode="always"
    >
      {content}
    </ScrollView>
  ) : (
    content
  );
}

const styles = StyleSheet.create({
  inner: {
    flex: 1,
    minHeight: "100%",
  },
  scroll: {
    flexGrow: 1,
  },
});
