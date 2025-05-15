import { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import Stars from 'react-native-stars';
import { Picker } from '@react-native-picker/picker';


export default function AddReviewScreen({ route, navigation }) {
  const { professorId } = route.params;
  const [course,setCourse] = useState('');
  const [comment, setComment] = useState('');
  const [stars,setStars] = useState(0);

const handleSubmit = async () => {
  try {
    const response = await fetch('http://127.0.0.1:5000/add_review', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        professorId,
        course,
        stars,
        comment,
      }),
    });

    const data = await response.json();
    console.log(data);

    if (response.ok) {
      alert('Review submitted!');
      navigation.goBack();
    } else {
      alert('Failed to submit: ' + data.error);
    }
  } catch (error) {
    console.error('Error:', error);
    alert('An error occurred.');
  }
};

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add a Review</Text>
    <View style={styles.input}>
  <Text>Course Name</Text>
  <Picker
    selectedValue={course}
    onValueChange={(itemValue, itemIndex) => setCourse(itemValue)}
    style={{ height: 50, width: '100%' }}
  >
    <Picker.Item label="Select a course" value="" />
    <Picker.Item label="CS101 - Intro to CS" value="CS101" />
    <Picker.Item label="MATH201 - Calculus II" value="MATH201" />
    <Picker.Item label="ENG102 - English Lit" value="ENG102" />
    {/* Add more courses here as needed */}
  </Picker>
</View>

    <View style={styles.input}>
    <Text>Rating</Text>
    <Stars
      default={0}
      update={(val)=> setStars(val)}
      spacing={4}
      starSize={40}
      count={5}
      fullStar={require('../assets/starYellow.png')}
      emptyStar={require('../assets/starBlack.png')}
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