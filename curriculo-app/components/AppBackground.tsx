import React from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import { useColorScheme } from "nativewind";

type AppBackgroundProps = {
  children: React.ReactNode;
  scrollable?: boolean;
};

export default function AppBackground({ children, scrollable = true }: AppBackgroundProps) {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === "dark";

  // Cor sólida conforme tema
  const backgroundColor = isDark ? "#0F172A" : "#DFEFF4";

  const content = (
    <View style={[styles.contentContainer]}>
      {children}
    </View>
  );

  return (
    <View style={[styles.flex, { backgroundColor }]}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        bounces
        overScrollMode="always"
      >
        {content}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  scrollContent: {
    paddingVertical: 40,
    paddingHorizontal: 24,
    flexGrow: 1,
    justifyContent: "flex-start",
  },
  contentContainer: {
    flex: 1,
  },
});
