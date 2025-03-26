import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from "react-native";

export default function RoutineEditorScreen({ route, navigation }) {
  const { selectedExercises } = route.params;
  const [workoutData, setWorkoutData] = useState(
    selectedExercises.map((exercise, index) => ({
      id: String(new Date().getTime() + index), // Уникальный id
      name: exercise.name,
      sets: "3",
      reps: "10",
      weight: "20",
    }))
  );

  const updateExercise = (id, field, value) => {
    setWorkoutData((prev) =>
      prev.map((exercise) =>
        exercise.id === id ? { ...exercise, [field]: value } : exercise
      )
    );
  };

  // Сохранение и передача данных обратно
  const saveRoutine = () => {
    const newRoutine = {
      id: String(new Date().getTime()), // Уникальный id
      name: `Routine ${Math.floor(Math.random() * 100)}`,
      exercises: workoutData.map((ex) => ex.name).join(", "),
    };
    navigation.navigate("Workout", { newRoutine }); // Передаём данные
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Workout Settings</Text>
      <FlatList
        data={workoutData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.exerciseRow}>
            <Text style={styles.exerciseText}>{item.name}</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              value={item.sets}
              onChangeText={(text) => updateExercise(item.id, "sets", text)}
            />
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              value={item.reps}
              onChangeText={(text) => updateExercise(item.id, "reps", text)}
            />
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              value={item.weight}
              onChangeText={(text) => updateExercise(item.id, "weight", text)}
            />
          </View>
        )}
      />
      <TouchableOpacity style={styles.saveButton} onPress={saveRoutine}>
        <Text style={styles.saveButtonText}>Save</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.closeButton} onPress={() => navigation.goBack()}>
        <Text style={styles.closeButtonText}>Cancel</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#222" },
  header: { fontSize: 18, fontWeight: "bold", color: "white", marginBottom: 10 },
  exerciseRow: { flexDirection: "row", alignItems: "center", marginBottom: 10 },
  exerciseText: { flex: 2, color: "white" },
  input: { flex: 1, borderWidth: 1, borderColor: "white", color: "white", padding: 5, textAlign: "center" },
  saveButton: { backgroundColor: "green", padding: 10, marginTop: 10, alignItems: "center" },
  saveButtonText: { color: "white", fontWeight: "bold" },
  closeButton: { backgroundColor: "red", padding: 10, marginTop: 10, alignItems: "center" },
  closeButtonText: { color: "white", fontWeight: "bold" },
});