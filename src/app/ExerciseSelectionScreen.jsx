import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  Image,
  TextInput,
  SafeAreaView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function ExerciseSelection({ onClose, onSave }) {
  const [exercises, setExercises] = useState([]);
  const [filteredExercises, setFilteredExercises] = useState([]);
  const [selectedExercises, setSelectedExercises] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  
  const navigation = useNavigation(); // Подключаем навигацию

  const fetchExercises = async () => {
    if (loading || searchQuery) return;

    setLoading(true);
    try {
      const response = await fetch(
        `https://exercisedb.p.rapidapi.com/exercises?offset=${
          page * 50
        }&limit=50`,
        {
          method: "GET",
          headers: {
            "X-RapidAPI-Key": "8c6416c0aamsh3f647e579637c27p1bb59bjsn11bd37c36146",
            "X-RapidAPI-Host": "exercisedb.p.rapidapi.com",
          },
        }
      );

      const data = await response.json();
      setExercises((prev) => [...prev, ...data]);
      setPage((prev) => prev + 1);
    } catch (error) {
      console.error("Ошибка загрузки:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchExercises();
  }, []);

  useEffect(() => {
    setFilteredExercises(
      searchQuery.trim() === ""
        ? exercises
        : exercises.filter((exercise) =>
            exercise.name.toLowerCase().includes(searchQuery.toLowerCase())
          )
    );
  }, [exercises, searchQuery]);

  const toggleExercise = (exercise) => {
    setSelectedExercises((prev) => 
      prev.some(e => e.name === exercise.name)
        ? prev.filter(e => e.name !== exercise.name)
        : [...prev, exercise]
    );
  };

  const handleProceed = () => {
    if (selectedExercises.length > 0) {
      onSave(selectedExercises); // Передаём данные в WorkoutScreen
    }
  };

  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.container}>
        <Text style={styles.header}>Exercises</Text>

        <TextInput
          style={styles.searchInput}
          placeholder="Search..."
          placeholderTextColor="#ccc"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />

        <FlatList
          data={filteredExercises}
          keyExtractor={(item) => item.id}
          onEndReached={() => {
            if (!searchQuery) fetchExercises();
          }}
          onEndReachedThreshold={0.5}
          ListFooterComponent={
            loading ? <ActivityIndicator size="large" /> : null
          }
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.exerciseItem,
                selectedExercises.includes(item) && styles.selectedItem,
              ]}
              onPress={() => toggleExercise(item)}
            >
              <Image
                style={styles.exerciseImage}
                source={{ uri: item.gifUrl }}
              />
              <View style={styles.exerciseTextContainer}>
                <Text style={styles.exerciseText}>{item.name}</Text>
                <Text style={styles.bodyPartText}>{item.bodyPart}</Text>
              </View>
            </TouchableOpacity>
          )}
        />

        <TouchableOpacity style={styles.saveButton} onPress={handleProceed}>
          <Text style={styles.saveButtonText}>Add</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <Text style={styles.closeButtonText}>Close</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeContainer: { flex: 1, backgroundColor: "#222" },
  container: { flex: 1, paddingHorizontal: 20 },
  header: { fontSize: 18, fontWeight: "bold", color: "white", marginBottom: 10 },
  searchInput: {
    height: 40,
    borderWidth: 1,
    borderColor: "#888",
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 10,
    color: "white",
    backgroundColor: "#333",
  },
  exerciseItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#fff",
  },
  selectedItem: { backgroundColor: "#333" },
  exerciseImage: { width: 50, height: 50, marginRight: 10 },
  exerciseTextContainer: { flex: 1 },
  exerciseText: { color: "white", fontSize: 16, fontWeight: "bold" },
  bodyPartText: { fontSize: 14, color: "white" },
  saveButton: {
    backgroundColor: "green",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  saveButtonText: { color: "#fff", fontWeight: "bold" },
  closeButton: {
    backgroundColor: "red",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  closeButtonText: { color: "#fff", fontWeight: "bold" },
});
