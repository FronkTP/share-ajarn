import { View, Text, Button, StyleSheet } from 'react-native';
import Test from '../components/Test'

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
        <Test />
        <Text style={styles.title}>Professor List Page</Text>
        <Button
        title="Go to Professor Detail"
        onPress={() => navigation.navigate('ProfessorDetail')}
        />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
  },
});