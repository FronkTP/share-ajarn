import { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Platform, Alert } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as WebBrowser from 'expo-web-browser';
import { CLIENT_ID, ADMIN_GMAIL } from '@env';
import { BASE_URL } from "../data/BASE_URL"


let useAuthRequest, WebClientID;
if (Platform.OS !== 'android') {
  // Only import Google Auth on non-Android platforms
  WebBrowser.maybeCompleteAuthSession();
  ({ useAuthRequest } = require('expo-auth-session/providers/google'));
  WebClientID = CLIENT_ID;
}

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userInfo, setUserInfo] = useState(null);

  // Only set up Google OAuth if not on Android
  const [request, response, promptAsync] = Platform.OS !== 'android'
    ? useAuthRequest({ webClientId: WebClientID })
    : [null, null, null];

  useEffect(() => {
    if (Platform.OS !== 'android' && response?.type === 'success') {
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
      const isAdmin = user.email === ADMIN_GMAIL;

      await AsyncStorage.setItem("user", JSON.stringify(user));

      await fetch(`${BASE_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: user.email,
          name: user.name,
          isAdmin,
        }),
      });

      navigation.reset({
        index: 0,
        routes: [{ name: "ProfessorList" }],
      });
    } catch (error) {
      console.error("Error fetching user info:", error);
    }
  };

  const handleEmailPasswordLogin = async () => {
    try {
      const response = await fetch("http://10.0.2.2:5000/email_login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (data.success && data.user && Array.isArray(data.user)) {
        const [id, name, isAdminRaw] = data.user;

        const userInfo = {
          id,
          name,
          email,
          isAdmin: isAdminRaw === 1,
        };

        await AsyncStorage.setItem("user", JSON.stringify(userInfo));

        navigation.reset({
          index: 0,
          routes: [{ name: "ProfessorList" }],
        });
      } else {
        Alert.alert("Login Failed", data.message || "Invalid credentials");
      }
    } catch (error) {
      console.error("Login error:", error);
      Alert.alert("Login Error", "Something went wrong");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Rate My Professor</Text>

      {Platform.OS === 'android' ? (
        <>
          <TextInput
            placeholder="Gmail"
            value={email}
            onChangeText={setEmail}
            style={styles.input}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <TextInput
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            style={styles.input}
          />
          <Button title="Login with Gmail & Password" onPress={handleEmailPasswordLogin} />
        </>
      ) : (
        <Button title="Login with Google" onPress={() => promptAsync()} disabled={!request} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 24 },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
});