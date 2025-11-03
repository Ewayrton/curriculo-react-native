// components/GradientBrackground.tsx (Corrigido)

import React, { useState, useCallback } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { useColorScheme } from "nativewind";
import { Platform, ScrollView, View, StyleSheet } from "react-native";

import { RefreshControl } from "@/components/ui/refresh-control";

type Props = {
  children: React.ReactNode;
  onRefresh?: () => Promise<void>; 
};

export default function GradientBackground({ children, onRefresh }: Props) {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === "dark";

  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = useCallback(async () => {
    if (!onRefresh) return; 

    setRefreshing(true);
    try {
      await onRefresh();
    } catch (error) {
      console.error("Falha ao atualizar:", error);
    } finally {
      setRefreshing(false);
    }
  }, [onRefresh]);

  const refreshControl = onRefresh ? (
    <RefreshControl
      refreshing={refreshing}
      onRefresh={handleRefresh}
      tintColor={isDark ? "#FFFFFF" : "#0F172A"} 
      colors={isDark ? ["#FFFFFF"] : ["#0F172A"]}
    />
  ) : undefined;


  // 1. Adicionado "as const" para criar um array readonly (tuple)
  const darkColors = ["#0F172A", "#1E293B", "#0F172A"] as const;
  const lightColors = ["#72b5f7", "#a0c6e8", "#DFEFF4"] as const;
  
  // 'colors' agora terá o tipo correto que o LinearGradient espera
  const colors = isDark ? darkColors : lightColors;

  const scrollView = (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
      refreshControl={refreshControl} 
    >
      {children}
    </ScrollView>
  );

  if (Platform.OS === 'android') {
    return (
      <View style={{ flex: 1 }}>
        <LinearGradient colors={colors} style={{ ...StyleSheet.absoluteFillObject }} />
        {scrollView}
      </View>
    );
  }

  return (
    <LinearGradient colors={colors} style={{ flex: 1 }}>
      {scrollView}
    </LinearGradient>
  );
}