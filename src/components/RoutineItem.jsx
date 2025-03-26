import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const RoutineCard = ({ routine, onStart }) => {
    return (
      <View style={styles.card}>
        <Text style={styles.title}>{routine.name}</Text>
        <Text style={styles.desc}>{routine.exercises}</Text>
        <TouchableOpacity style={styles.button} onPress={onStart}>
          <Text style={styles.buttonText}>Start Routine</Text>
        </TouchableOpacity>
      </View>
    );
  };
  

const styles = StyleSheet.create({
  card: {
    width: "48%", 
    marginBottom: 10,
    padding: 10,
    backgroundColor: "#333",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
    marginBottom: 5,
  },
  desc: {
    fontSize: 14,
    color: "#fff",
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#007bff",
    padding: 8,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
});

export default RoutineCard;
