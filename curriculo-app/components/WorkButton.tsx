import React from "react";
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

  // valor para animação de escala
  const scale = useSharedValue(1);

  // animação contínua de “pulsar” suave
  React.useEffect(() => {
    scale.value = withRepeat(
      withSequence(
        withTiming(1.05, { duration: 600 }),
        withTiming(1, { duration: 600 })
      ),
      -1, // infinito
      true
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <Animated.View style={animatedStyle}>
      <Pressable
        onPress={() => navigation.openDrawer()}
        className={`rounded-2xl px-6 py-3 shadow-md ${
          isDark ? "bg-[#72B6E0]" : "bg-[#A1DBFF]"
        }`}
        style={{
          elevation: 5, // sombra no Android
        }}
      >
        <Text
          className={`text-lg font-bold ${
            isDark ? "text-white" : "text-black"
          }`}
        >
          VEJA MEU TRABALHO
        </Text>
      </Pressable>
    </Animated.View>
  );
}