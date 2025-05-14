import { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import * as Google from "expo-auth-session/providers/google"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { CLIENT_ID } from '@env';
import * as WebBrowser from 'expo-web-browser';

WebBrowser.maybeCompleteAuthSession(); // Required for auth flow to complete

export default function LoginScreen({ navigation }) {
  const [userInfo, setUserInfo] = useState(null);
  const [request,response, promptAsync] = Google.useAuthRequest({
    webClientId: CLIENT_ID,
  });

  useEffect(() => {
    if (response?.type === 'success') {
      const { authentication } = response;
      fetchUserInfo(authentication.accessToken);
    }
  }, [response]);

    const fetchUserInfo = async (token) => {
    try {
      const res = await fetch("https://www.googleapis.com/userinfo/v2/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const user = await res.json();
      setUserInfo(user);
      await AsyncStorage.setItem("user", JSON.stringify(user));

      // Navigate after successful login
      navigation.replace("ProfessorList");
    } catch (error) {
      console.error("Failed to fetch user info", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Rate My Professor</Text>
      <Button title="Log In with Google" onPress={() => promptAsync()} disabled={!request} />
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
  },
});