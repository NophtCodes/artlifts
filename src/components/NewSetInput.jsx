import { View, Text, StyleSheet, TextInput, Button} from 'react-native';
import { useState } from 'react';
const NewSetInput = () => {
    const [reps, setReps] = useState('');
    const [weight, setWeight] = useState('');
    const addSet = () => {
        console.warn('Add set ', reps, weight);
        setReps('');
        setWeight('');
    };
    return (
        <View style={styles.container}>
            <TextInput value={reps} onChangeText={setReps} placeholder="Reps" style={styles.input} keyboardType="numeric"/>
            <TextInput value={weight} onChangeText={setWeight} placeholder="Weight" keyboardType="numeric" style={styles.input} />
            <Button title="Add" onPress={addSet}  />
        </View>      
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 5,
        flexDirection: 'row',
        gap: 10,
    },
    input: {
        borderWidth: 1,
        padding: 10, 
        borderColor: 'gainsboro',
        flex: 1,
        borderRadius: 5, 
    }
})
export default NewSetInput;