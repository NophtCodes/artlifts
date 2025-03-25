import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";
import { FontAwesome, Ionicons } from "@expo/vector-icons";

export default function WorkoutScreen({ setCurrentScreen }) {
  const [routines, setRoutines] = useState([
    {
      id: "1",
      name: "Arms 1",
      exercises: "Treadmill, Bicep Curl, Hammer Curl, Triceps Pushdown",
    },
    {
      id: "2",
      name: "Pull",
      exercises: "Deadlift, Bent Over Row, Pull Up, Face Pull",
    },
    {
      id: "3",
      name: "Push 1",
      exercises: "Bench Press, Triceps Pushdown, Shoulder Press",
    },
  ]);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Workout</Text>

      {/* Блок Quick Start */}
      <Text style={styles.sectionTitle}>Quick Start</Text>
      <TouchableOpacity style={styles.startWorkoutButton}>
        <Text style={styles.buttonText}>+ Start Empty Workout</Text>
      </TouchableOpacity>

      {/* Блок Routines */}
      <Text style={styles.sectionTitle}>Routines</Text>
      <View style={styles.row}>
        <TouchableOpacity style={styles.actionButton}>
          <FontAwesome name="plus" size={16} color="white" />
          <Text style={styles.actionButtonText}>New Routine</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="search" size={16} color="white" />
          <Text style={styles.actionButtonText}>Template Routines</Text>
        </TouchableOpacity>
      </View>

      {/* Блок My Routines */}
      <Text style={styles.sectionTitle}>My Routines ({routines.length})</Text>
      <FlatList
        data={routines}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.routineCard}>
            <Text style={styles.routineTitle}>{item.name}</Text>
            <Text style={styles.routineDesc}>{item.exercises}</Text>
            <TouchableOpacity style={styles.startRoutineButton}>
              <Text style={styles.startRoutineText}>Start Routine</Text>
            </TouchableOpacity>
          </View>
        )}
      />

      {/* Нижняя навигация */}
      <View style={styles.navbar}>
        <TouchableOpacity style={styles.navButton}>
          <Ionicons name="home-outline" size={24} color="white" />
          <Text style={styles.navText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton}>
          <Ionicons name="barbell-outline" size={24} color="blue" />
          <Text style={[styles.navText, { color: "blue" }]}>Workout</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton}>
          <Ionicons name="person-outline" size={24} color="white" />
          <Text style={styles.navText}>Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// Стили
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#121212", padding: 20 },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#ccc",
    marginTop: 20,
    marginBottom: 10,
  },
  startWorkoutButton: {
    backgroundColor: "#333",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: { color: "#fff", fontSize: 16 },
  row: { flexDirection: "row", justifyContent: "space-between" },
  actionButton: {
    flexDirection: "row",
    backgroundColor: "#222",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    width: "48%",
    justifyContent: "center",
  },
  actionButtonText: { color: "#fff", marginLeft: 8 },
  routineCard: {
    backgroundColor: "#222",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  routineTitle: { fontSize: 18, fontWeight: "bold", color: "#fff" },
  routineDesc: { fontSize: 14, color: "#ccc", marginVertical: 5 },
  startRoutineButton: {
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 5,
  },
  startRoutineText: { color: "#fff", fontWeight: "bold" },
  navbar: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#181818",
    paddingVertical: 10,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
  navButton: { alignItems: "center" },
  navText: { color: "#ccc", fontSize: 12, marginTop: 2 },
});
