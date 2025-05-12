import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

export default function AddReviewScreen({ navigation }) {
  const [rating, setRating] = useState('');
  const [comment, setComment] = useState('');

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

      <Button title="Submit" onPress={() => navigation.goBack()} />
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
  },
  input: {
  },
});