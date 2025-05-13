import { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import Stars from 'react-native-stars';

export default function AddReviewScreen({ route, navigation }) {
  const { professorId } = route.params;
  const [course,setCourse] = useState('');
  const [comment, setComment] = useState('');
  const [stars,setStars] = useState(0);

  const handleSubmit = () => {
    console.log('Submitted:', { professorId, course , stars, comment });
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add a Review</Text>
      <TextInput
      placeholder="Course name"
      style={styles.input}
      value={course}
      onChangeText={setCourse}
      />
    <View style={styles.input}>
    <Text>Rating</Text>
    <Stars
      default={0}
      update={(val)=> setStars(val)}
      spacing={4}
      starSize={40}
      count={5}
      fullStar={require('../assets/starFilled.png')}
      emptyStar={require('../assets/starEmpty.png')}
    />
    </View>
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