import { View, Text, Button, StyleSheet } from 'react-native';

export default function ProfessorDetailScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Professor Detail Page</Text>
      <Text>Professor Name: Dr. Example</Text>
      <Text>Department: Computer Engineering</Text>
      <Text>Average Rating: 4.3 ⭐</Text>
      <Button
        title="Rate This Professor"
        onPress={() => navigation.navigate('AddReview')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  title: {
  },
});