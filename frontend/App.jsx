import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from './screens/LoginScreen';
import ProfessorListScreen from './screens/ProfessorListScreen';
import ProfessorDetailScreen from './screens/ProfessorDetailScreen';
import AddReviewScreen from './screens/AddReviewScreen';

export default function App() {
  const Stack = createNativeStackNavigator();

  return (
    <>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="ProfessorList" component={ProfessorListScreen} />
        <Stack.Screen name="ProfessorDetail" component={ProfessorDetailScreen} />
        <Stack.Screen name="AddReview" component={AddReviewScreen} />
      </Stack.Navigator>
    </NavigationContainer>
    <StatusBar style="auto" />
    </>
  );
}