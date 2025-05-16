import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

import LoginScreen from './screens/LoginScreen';
import ProfessorListScreen from './screens/ProfessorListScreen';
import ProfessorDetailScreen from './screens/ProfessorDetailScreen';
import AddReviewScreen from './screens/AddReviewScreen';
import AdminDashboardScreen from './screens/AdminDashboardScreen';

const PERSISTENCE_KEY = 'NAVIGATION_STATE_V1';

const Stack = createNativeStackNavigator();

export default function App() {
  const [isReady, setIsReady] = useState(false);
  const [initialState, setInitialState] = useState();

  // Load saved navigation state from AsyncStorage on app start
  useEffect(() => {
    const restoreState = async () => {
      try {
        const savedStateString = await AsyncStorage.getItem(PERSISTENCE_KEY);
        const state = savedStateString ? JSON.parse(savedStateString) : undefined;
        if (state) {
          setInitialState(state);
        }
      } catch (e) {
        console.warn('Failed to load navigation state:', e);
      } finally {
        setIsReady(true);
      }
    };

    restoreState();
  }, []);

  if (!isReady) {
    // Render splash/loading screen or null until restored
    return null;
  }

  return (
    <>
      <NavigationContainer
        initialState={initialState}
        onStateChange={(state) =>
          AsyncStorage.setItem(PERSISTENCE_KEY, JSON.stringify(state))
        }
      >
        <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="ProfessorList" component={ProfessorListScreen} />
          <Stack.Screen name="ProfessorDetail" component={ProfessorDetailScreen} />
          <Stack.Screen name="AddReview" component={AddReviewScreen} />
          <Stack.Screen name="AdminDashboard" component={AdminDashboardScreen} />
        </Stack.Navigator>
      </NavigationContainer>
      <StatusBar style="auto" />
    </>
  );
}