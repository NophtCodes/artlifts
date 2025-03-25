import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Image, TouchableOpacity, ActivityIndicator, StyleSheet } from "react-native";

export default function ExerciseListScreen({ setCurrentScreen }) {
  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchExercises();
  }, []);

  const fetchExercises = async () => {
    try {
      const response = await fetch("https://exercisedb.p.rapidapi.com/exercises", {
        headers: {
          "X-RapidAPI-Key": "ТВОЙ_API_КЛЮЧ",
          "X-RapidAPI-Host": "exercisedb.p.rapidapi.com",
        },
      });

      const data = await response.json();
      setExercises(data.slice(0, 20)); // Ограничиваем до 20 упражнений
      setLoading(false);
    } catch (error) {
      console.error("Ошибка при загрузке упражнений:", error);
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Список упражнений</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#4CAF50" />
      ) : (
        <FlatList
          data={exercises}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.exerciseItem}>
              <Image source={{ uri: item.gifUrl }} style={styles.image} />
              <View style={{ flex: 1 }}>
                <Text style={styles.exerciseName}>{item.name}</Text>
                <Text style={styles.exerciseDesc}>{item.bodyPart}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      )}

      <TouchableOpacity style={styles.backButton} onPress={() => setCurrentScreen("Workout")}>
        <Text style={styles.buttonText}>Назад</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 10 },
  exerciseItem: { flexDirection: "row", padding: 10, backgroundColor: "#f5f5f5", borderRadius: 10, marginBottom: 10 },
  image: { width: 60, height: 60, marginRight: 10 },
  exerciseName: { fontSize: 16, fontWeight: "bold" },
  exerciseDesc: { fontSize: 14, color: "gray" },
  backButton: { backgroundColor: "blue", padding: 15, borderRadius: 10, alignItems: "center", marginTop: 20 },
  buttonText: { color: "#fff", fontSize: 18 },
});
