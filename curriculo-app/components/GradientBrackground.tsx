import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { useColorScheme } from "nativewind";

type GradientBackgroundProps = {
  children: React.ReactNode;
};

export default function GradientBackground({ children }: GradientBackgroundProps) {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === "dark";

  // Cores diferentes conforme o tema
  const gradientColors = isDark
    ? (["#0F172A", "#1E293B"] as const) // degrade escuro
    : (["#346CC7", "#DFEFF4"] as const); // degrade claro

  return (
    <LinearGradient
      colors={gradientColors}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      className="flex-1"
    >
      {children}
    </LinearGradient>
  );
}
