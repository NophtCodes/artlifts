import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList, ActivityIndicator } from 'react-native';
import ExerciseListItem from '../components/ExerciseListItem';
import { useQuery } from '@tanstack/react-query';
import { gql } from 'graphql-request';
import client from '../graphqlClient.js';
const exercisesQuery = gql`
  query exercises($muscle: String, $name: String) {
    exercises(muscle: $muscle, name: $name) {
      name
      muscle
      equipment
    }
  }
`;
export default function ExerciesesScreen() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['exercises'],
    queryFn: async () => client.request(exercisesQuery)
  });
  if (isLoading) {
    return <ActivityIndicator style={{marginTop: 20}} />
  }
  if (error) {
    return <Text style={{margin: 15}}>Failed to fetch exercises</Text>
  }
  console.log(data);
  
  return (
    <View style={styles.container}>
      <FlatList contentContainerStyle={{gap:5}} data={data?.exercises || []} keyExtractor={(item, index) => {item.name + index}} renderItem={({item}) => <ExerciseListItem item={item} />}/>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'ghostwhite',
    justifyContent: 'center',
    padding: 10
  },
});
