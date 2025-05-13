import { View, Text, Button, StyleSheet } from 'react-native';

export default function ProfessorDetailScreen({ route, navigation }) {
  const { professorId, name, department } = route.params;


  return (
    <View style={styles.container}>
      <Text style={styles.title}>{name}</Text>
      <Text>Department: {department}</Text>
      <Text>Average Rating: 4.3</Text>

      <Button
        title="Rate This Professor"
        onPress={() => navigation.navigate('AddReview', { professorId })}
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
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});