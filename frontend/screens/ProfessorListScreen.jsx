import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import Test from '../components/Test'

export default function ProfessorList({ navigation }) {
  const professors = [
    { id: '1', name: 'Dr. Charnchai' },
    { id: '2', name: 'Dr. David' },
    { id: '3', name: 'Dr. Yan' },
    { id: '4', name: 'Dr. Panda' },
  ];

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('ProfessorDetail', { professorId: item.id })}
    >
      <Text style={styles.name}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Test/>
      <Text style={styles.title}>Professor List</Text>
      <FlatList
        data={professors}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#f9f9f9',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 2,
  },
  name: {
    fontSize: 16,
    fontWeight: '500',
  },
});