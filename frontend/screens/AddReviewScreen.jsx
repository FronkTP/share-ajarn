import { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

export default function AddReviewScreen({ route, navigation }) {
  const { professorId } = route.params;
  const [rating, setRating] = useState('');
  const [comment, setComment] = useState('');

  const handleSubmit = () => {
    console.log('Submitted:', { professorId, rating, comment });
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add a Review</Text>

      <TextInput
        placeholder="Rating (1-5)"
        keyboardType="numeric"
        style={styles.input}
        value={rating}
        onChangeText={setRating}
      />

      <TextInput
        placeholder="Optional Comment"
        style={styles.input}
        value={comment}
        onChangeText={setComment}
      />

      <Button title="Submit Review" onPress={handleSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'flex-start',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    width: '100%',
  },
});