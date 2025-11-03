import React from "react";
import { Text } from "@/components/ui/text";
import AppBackground from "@/components/AppBackground";
import { Box } from "@/components/ui/box";

export default function ProjectsScreen() {
  return (
    <AppBackground scrollable>
      <Box className="pt-20 items-center justify-center">
        <Text className="text-4xl font-bold text-[#72b5f7ff] dark:text-[#93C5FD]">
          MEUS PROJETOS
        </Text>
      </Box>

      {/* ... mais conteúdo com rolagem */}
    </AppBackground>
  );
}
