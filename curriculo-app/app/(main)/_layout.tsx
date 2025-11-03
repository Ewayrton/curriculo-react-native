import { Stack } from "expo-router";
import React from "react";

export default function MainLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="projects" />
      <Stack.Screen name="academic-exp" />
      <Stack.Screen name="work-exp" />
      <Stack.Screen name="skills" />
      <Stack.Screen name="about" />
    </Stack>
  );
}
