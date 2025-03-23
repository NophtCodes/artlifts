import { View, Text, StyleSheet, ScrollView} from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import exercises from '../../assets/data/exercises.json';
import { Stack } from 'expo-router';
export default function ExerciseDetailScreen()
{
    const params = useLocalSearchParams();
    const exercise = exercises.find(item => item.name === params.name);
    if (!exercise) 
    {
        return (
            <Text>Exercise not found!</Text>
        )
    }
    return(
        <ScrollView contentContainerStyle={styles.container}>
            <Stack.Screen options={{ title: exercise.name }}/>
            <View style={styles.panel}>
            <Text style={styles.exerciseName}>{exercise.name}</Text>
                  <Text style={styles.exerciseSubtitle}>{exercise.muscle[0].toUpperCase() + exercise.muscle.slice(1)} | {exercise.equipment[0].toUpperCase() + exercise.equipment.slice(1)}</Text>
            </View>
            <View style={styles.panel}>
                <Text style={styles.instructions}>{exercise.instructions}</Text>
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
    }
});