import { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  Platform, 
  Alert,
  Image,
  StatusBar,
  SafeAreaView,
  KeyboardAvoidingView,
  ScrollView
} from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as WebBrowser from 'expo-web-browser';
import { CLIENT_ID, ADMIN_GMAIL } from '@env';
import { BASE_URL } from "../data/BASE_URL";

let useAuthRequest, WebClientID;
if (Platform.OS !== 'android') {
  // Only import Google Auth on non-Android platforms
  WebBrowser.maybeCompleteAuthSession();
  ({ useAuthRequest } = require('expo-auth-session/providers/google'));
  WebClientID = CLIENT_ID;
}

// Using the same color palette from AddReviewScreen
const colors = {
  background: '#fffcf2',
  cardBackground: '#ffffff',
  primary: '#6D2323',
  secondary: '#A31D1D',
  accent: '#E5D0AC',
  textPrimary: '#333333',
  textSecondary: '#555555',
  border: '#e0e0e0',
  shadow: '#000000',
};

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userInfo, setUserInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Only set up Google OAuth if not on Android
  const [request, response, promptAsync] = Platform.OS !== 'android'
    ? useAuthRequest({ webClientId: WebClientID })
    : [null, null, null];

  useEffect(() => {
    if (Platform.OS !== 'android' && response?.type === 'success') {
      setIsLoading(true);
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
      Alert.alert("Login Error", "Failed to connect with Google. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmailPasswordLogin = async () => {
    if (!email || !password) {
      Alert.alert("Input Required", "Please enter both email and password");
      return;
    }
    
    setIsLoading(true);
    
    try {
      const response = await fetch(`${BASE_URL}/email_login`, {
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
      Alert.alert("Login Error", "Something went wrong. Please check your connection.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={colors.primary} barStyle="light-content" />
      
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardAvoidView}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.logoContainer}>
            <Image 
              source={require('../assets/shareajarn_logo.png')} 
              style={styles.logo} 
              resizeMode="contain"
            />
            <Text style={styles.appTitle}>Share Ajarn</Text>
            <Text style={styles.appSubtitle}>Rate and review your professors</Text>
          </View>
          
          <View style={styles.formCardContainer}>
            <View style={styles.formCard}>
              {Platform.OS === 'android' ? (
                <>
                  <View style={styles.inputGroup}>
                    <Text style={styles.label}>Email</Text>
                    <TextInput
                      placeholder="user@shareajarn.com"
                      placeholderTextColor={colors.textSecondary}
                      value={email}
                      onChangeText={setEmail}
                      style={styles.input}
                      keyboardType="email-address"
                      autoCapitalize="none"
                    />
                  </View>
                  
                  <View style={styles.inputGroup}>
                    <Text style={styles.label}>Password</Text>
                    <TextInput
                      placeholder="1234"
                      placeholderTextColor={colors.textSecondary}
                      value={password}
                      onChangeText={setPassword}
                      secureTextEntry
                      style={styles.input}
                    />
                  </View>
                  
                  <TouchableOpacity 
                    style={[styles.loginButton, isLoading && styles.loginButtonDisabled]}
                    onPress={handleEmailPasswordLogin}
                    disabled={isLoading}
                  >
                    <Text style={styles.loginButtonText}>
                      {isLoading ? "Logging in..." : "Login with Email"}
                    </Text>
                  </TouchableOpacity>
                </>
              ) : (
                <View style={styles.googleLoginContainer}>
                  <Text style={styles.googleLoginPrompt}>Sign in quickly with your Google account</Text>
                  <TouchableOpacity 
                    style={[styles.googleButton, isLoading && styles.loginButtonDisabled]}
                    onPress={() => promptAsync()}
                    disabled={!request || isLoading}
                  >
                    <Text style={styles.googleButtonText}>
                      {isLoading ? "Logging in..." : "Login with Google"}
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </View>
          
          <Text style={styles.footerText}>
            Share your experience, help others choose
          </Text>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  keyboardAvoidView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    padding: 20,
    justifyContent: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 16,
  },
  appTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.primary,
    textAlign: 'center',
    marginBottom: 8,
  },
  appSubtitle: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  formCardContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 24,
  },
  formCard: {
    backgroundColor: colors.cardBackground,
    borderRadius: 12,
    padding: 20,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderLeftWidth: 4,
    borderLeftColor: colors.primary,
    width: '100%',
    maxWidth: Platform.OS === 'web' ? 450 : '100%',
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.primary,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: colors.textPrimary,
    backgroundColor: colors.cardBackground,
  },
  loginButton: {
    backgroundColor: colors.primary,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
    marginTop: 8,
  },
  loginButtonDisabled: {
    backgroundColor: '#9E7E7E', // Lighter version of primary color
    shadowOpacity: 0,
    elevation: 0,
  },
  loginButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 16,
  },
  googleLoginContainer: {
    alignItems: 'center',
    width: '100%',
  },
  googleLoginPrompt: {
    fontSize: 16,
    color: colors.primary,
    marginBottom: 16,
    textAlign: 'center',
    fontWeight: '500',
  },
  googleButton: {
    backgroundColor: colors.secondary,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
    maxWidth: 300,
    width: '100%',
  },
  googleButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 16,
  },
  footerText: {
    textAlign: 'center',
    color: colors.textSecondary,
    fontSize: 14,
    marginTop: 16,
    fontStyle: 'italic',
  },
});