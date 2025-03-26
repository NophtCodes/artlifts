import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WorkoutScreen from "./index"; // Главный экран
import ExerciseSelection from "./ExerciseSelectionScreen.jsx";
import RoutineEditorScreen from "./RoutineEditorScreen";
const Stack = createNativeStackNavigator();

export default function Layout() {
  return (
      <Stack.Navigator>
        <Stack.Screen name="Workout" component={WorkoutScreen} />
        <Stack.Screen name="ExerciseSelection" component={ExerciseSelection} />
        <Stack.Screen name="RoutineEditor" component={RoutineEditorScreen} />
      </Stack.Navigator>
  );
}
