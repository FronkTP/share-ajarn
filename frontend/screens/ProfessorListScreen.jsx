import { View, Text, TouchableOpacity, FlatList, Image, StyleSheet } from 'react-native';

export default function ProfessorList({ navigation }) {
  const professors = [
  {
    id: '1',
    name: 'Dr. Charnchai',
    department: 'Electrical Engineering',
    avgRating: 0,
    image: '',
    courses: ['Data Structures', 'Algorithms'],
  },
  {
    id: '2',
    name: 'Dr. David',
    department: 'Electrical Engineering',
    avgRating: 4.2,
    image: '',
    courses: ['Thermodynamics', 'Statics'],
  },
];

const renderItem = ({ item }) => (
  <TouchableOpacity
    style={styles.card}
    onPress={() =>
      navigation.navigate('ProfessorDetail', {
        professorId: item.id,
        name: item.name,
        department: item.department,
      })
    }
  >
    <Image source={{ uri: item.image }} />
    <View style={styles.info}>
      <Text style={styles.name}>{item.name}</Text>
      <Text >{item.department}</Text>
      <Text >⭐ {item.avgRating}</Text>
    </View>
  </TouchableOpacity>
);

  return (
    <View style={styles.container}>
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