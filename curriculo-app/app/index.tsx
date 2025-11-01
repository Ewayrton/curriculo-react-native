import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import { useColorScheme } from "nativewind";

export default function HomeScreen() {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === "dark";

  return (
    <Box
      className={`flex-1 justify-center items-center ${
        isDark ? "bg-gray-900" : "bg-white"
      }`}
    >
      <Text
        className={`text-2xl font-bold ${
          isDark ? "text-white" : "text-gray-900"
        }`}
      >
        Tela Inicial
      </Text>
    </Box>
  );
}
