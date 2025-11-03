import React, { useEffect } from "react";
import { Pressable } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";
import { Text } from "@/components/ui/text";
import { useNavigation } from "expo-router";
import { useColorScheme } from "nativewind";

export default function WorkButton() {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === "dark";
  const navigation = useNavigation<any>();

  // valor de escala animado
  const scale = useSharedValue(1);

  // animação contínua de pulsar suave
  useEffect(() => {
    scale.value = withRepeat(
      withSequence(
        withTiming(1.05, { duration: 700 }),
        withTiming(1, { duration: 700 })
      ),
      -1, // infinito
      true // alternar direção
    );
  }, [scale]);

  // estilo animado com Reanimated
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <Animated.View style={animatedStyle}>
      <Pressable
        onPress={() => navigation.openDrawer()}
        className={`rounded-2xl px-7 py-4 shadow-md active:opacity-90 ${
          isDark ? "bg-[#72B6E0]" : "bg-[#A1DBFF]"
        }`}
        style={{
          elevation: 6, // sombra mais forte no Android
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.2,
          shadowRadius: 4,
        }}
      >
        <Text
          className={`text-lg font-extrabold tracking-wide ${
            isDark ? "text-white" : "text-black"
          }`}
        >
          VEJA MEU TRABALHO
        </Text>
      </Pressable>
    </Animated.View>
  );
}
