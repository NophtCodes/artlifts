import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Modal,
} from "react-native";
import RoutineCard from "../components/RoutineItem.jsx";
import ExerciseSelection from "./ExerciseSelectionScreen.jsx";

export default function WorkoutScreen({ navigation, route }) {
  const [routines, setRoutines] = useState([
    { id: "1", name: "Arms 1", exercises: "Bicep Curl, Hammer Curl" },
    { id: "2", name: "Pull", exercises: "Deadlift, Pull Up" },
  ]);
  const [isModalVisible, setModalVisible] = useState(false);

  // Добавляем рутину при возврате из RoutineEditorScreen
  useEffect(() => {
    if (route.params?.newRoutine) {
      setRoutines((prevRoutines) => {
        if (!prevRoutines.some(r => r.id === route.params.newRoutine.id)) {
          return [...prevRoutines, route.params.newRoutine];
        }
        return prevRoutines;
      });
    }
  }, [route.params?.newRoutine]);

  const addRoutine = (selectedExercises) => {
    setModalVisible(false);
    navigation.navigate("RoutineEditor", { selectedExercises });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>My Routines ({routines.length})</Text>

      <TouchableOpacity
        style={styles.actionButton}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.actionButtonText}>New Routine</Text>
      </TouchableOpacity>

      <FlatList
        data={routines}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.row}
        renderItem={({ item }) => <RoutineCard routine={item} />}
      />

      <Modal visible={isModalVisible} animationType="slide">
        <ExerciseSelection
          onClose={() => setModalVisible(false)}
          onSave={addRoutine}
          navigation={navigation}
        />
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#121212" },
  sectionTitle: { fontSize: 18, fontWeight: "bold", color: "#fff" },
  actionButton: {
    backgroundColor: "#222",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  actionButtonText: { color: "#fff" },
  row: { flexDirection: "row", justifyContent: "space-between" },
});
