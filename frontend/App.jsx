import { StatusBar } from 'expo-status-bar';
import { Text, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './screens/HomeScreen';
import ProfessorDetailScreen from './screens/ProfessorDetailScreen';
import AddReviewScreen from './screens/AddReviewScreen';

export default function App() {
  const Stack = createNativeStackNavigator();

  return (
    <>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="ProfessorDetail" component={ProfessorDetailScreen} />
        <Stack.Screen name="AddReview" component={AddReviewScreen} />
      </Stack.Navigator>
    </NavigationContainer>
    <StatusBar style="auto" />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
