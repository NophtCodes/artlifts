import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WorkoutScreen from "./index"; // Главный экран
import WorkoutSessionScreen from "./WorkoutSessionScreen"; // Новый экран тренировки

const Stack = createNativeStackNavigator();

export default function Layout() {
  return (
      <Stack.Navigator>
        <Stack.Screen name="Workout" component={WorkoutScreen} />
        <Stack.Screen name="WorkoutSession" component={WorkoutSessionScreen} />
      </Stack.Navigator>
  );
}
