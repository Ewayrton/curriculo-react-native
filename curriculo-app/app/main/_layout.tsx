import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProjectsScreen from "./projects";
import React from "react";
import AcademicScreen from "./academic-exp";
import AboutScreen from "./about";
import SkillScreen from "./skills";
import WorkScreen from "./work-exp";

const Stack = createNativeStackNavigator();

export default function MainStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="projects" component={ProjectsScreen} />
      <Stack.Screen name="academic" component={AcademicScreen} />
      <Stack.Screen name="work-exp" component={WorkScreen} />
      <Stack.Screen name="skills" component={SkillScreen} />
      <Stack.Screen name="about" component={AboutScreen} />
    </Stack.Navigator>
  );
}
