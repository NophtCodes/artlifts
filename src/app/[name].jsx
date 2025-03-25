import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import exercises from '../../assets/data/exercises.json';
import { Stack } from 'expo-router';
import { useState } from 'react';
import { gql } from 'graphql-request';
import graphqlClient from '../graphqlClient.js';
import { useQuery } from '@tanstack/react-query';
const exerciseQuery = gql`
query exercises($name: String) {
    exercises(name: $name) {
      name
      muscle
      instructions
      equipment
    }
  }`;
export default function ExerciseDetailScreen()
{
    const {name} = useLocalSearchParams();
    const [isInstructionExpanded, setIsInstructionExpanded] = useState(false);
    const {data,isLoading,error} = useQuery({
        queryKey: ['exercises', name],
        queryFn: async () => graphqlClient.request(exerciseQuery, { name })
      });
    if (isLoading) {
        return <ActivityIndicator />;
    }
    if (error)
    {
        return <Text>Failed to fetch data</Text>;
    }
    const exercise = data.exercises[0];
    
    if (!exercise) {
        return <Text>Exercise not found!</Text>;
    }
    return(
        <ScrollView contentContainerStyle={styles.container}>
            <Stack.Screen options={{ title: exercise.name }}/>
            <View style={styles.panel}>
            <Text style={styles.exerciseName}>{exercise.name}</Text>
                  <Text style={styles.exerciseSubtitle}>{exercise.muscle[0].toUpperCase() + exercise.muscle.slice(1)} | {exercise.equipment[0].toUpperCase() + exercise.equipment.slice(1)}</Text>
            </View>
            <View style={styles.panel}>
                <Text style={styles.instructions} numberOfLines={isInstructionExpanded ? 0 : 3}>{exercise.instructions}</Text>
                <Text onPress={() => setIsInstructionExpanded(!isInstructionExpanded)} style={styles.seeMore}>{isInstructionExpanded ? "See less" : "See more"}</Text>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        gap: 10
    },
    panel: {
      backgroundColor: 'white',
      borderRadius: 5,
      padding: 10
    },
    exerciseName: {
        fontSize: 20, 
        fontWeight: '500',
      },
      exerciseSubtitle: {
        color: 'dimgray'
      },
    instructions: {
        fontSize: 16,
        lineHeight: 25,
    },
    seeMore: {
        alignSelf: 'center',
        padding: 10,
        fontWeight: 600,
        color: 'grey'
    }
});