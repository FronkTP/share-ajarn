import { View, Text, TouchableOpacity, FlatList, Image, Dimensions, SafeAreaView, TextInput, StatusBar, StyleSheet, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useEffect } from 'react';
import baseProfessors from '../data/baseProfessors';
import Icon from 'react-native-vector-icons/FontAwesome';
import { BASE_URL } from "../data/BASE_URL"

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

export default function ProfessorList({ navigation }) {
  const [userName, setUserName] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [professors, setProfessors] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [minRating, setMinRating] = useState(0); // Default: show all
  const [loading, setLoading] = useState(true);

  const filteredProfessors = professors.filter((prof) => {
    const matchesSearch =
      prof.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prof.department.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesRating = parseFloat(prof.avgRating) >= minRating;

    return matchesSearch && matchesRating;
  });

  const [screenWidth, setScreenWidth] = useState(Dimensions.get('window').width);
  const cardWidth = 200;
  const numColumns = Math.max(1, Math.floor(screenWidth / cardWidth));
  const isMobile = screenWidth < 400;

  const logout = async () => {
    await AsyncStorage.removeItem('user');
    navigation.replace('Login');
  };

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const userData = await AsyncStorage.getItem('user');
        if (userData) {
          const user = JSON.parse(userData);
          setUserName(user.name || '')

        if (user.email) {
          await checkAdminStatus(user.email);
        }
        }
      } catch (error) {
        console.error('Failed to load user info:', error);
      }
    };

    fetchUserInfo();
  }, []);

  useEffect(() => {
    const fetchRatings = async () => {
      setLoading(true);
      const updatedProfessors = await Promise.all(
        baseProfessors.map(async (prof) => {
          const avgRating = await fetchRating(prof.id);
          return { ...prof, avgRating };
        })
      );
      setProfessors(updatedProfessors);
      setLoading(false);
    };

    fetchRatings();
  }, []);

  const fetchRating = async (professorId) => {
  try {
    const response = await fetch(`${BASE_URL}/get_reviews/${professorId}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const reviews = await response.json();
    if (!Array.isArray(reviews) || reviews.length === 0) return 0;

    const total = reviews.reduce((sum, review) => sum + (review.stars || 0), 0);
    return (total / reviews.length).toFixed(1);
  } catch (error) {
    console.error("Failed to fetch rating for professor", professorId, error);
    return 0;
  }};
  
  const checkAdminStatus = async (email) => {
    try {
      const response = await fetch(`${BASE_URL}/api/get_user_info`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      console.log("data after response:", data);

      if (data.user && Array.isArray(data.user)) {
        const [id, name, isAdminRaw] = data.user;

        const userInfo = {
          id,
          name,
          email,
          isAdmin: isAdminRaw === 1,
        };

        console.log("after put in userInfo", userInfo);

        setUserName(name);
        setIsAdmin(userInfo.isAdmin);
        await AsyncStorage.setItem('user', JSON.stringify(userInfo));
      } else {
        console.warn('Invalid user data:', data);
      }
    } catch (error) {
      console.error('Failed to check admin status:', error);
    }
  };

  useEffect(() => {
    const updateLayout = () => {
      setScreenWidth(Dimensions.get('window').width);
    };
    
    Dimensions.addEventListener('change', updateLayout);
    
    return () => {
      // Cleanup (for older RN versions)
      if (Dimensions.removeEventListener) {
        Dimensions.removeEventListener('change', updateLayout);
      }
    };
  }, []);

  const renderProfessorCard = ({ item }) => {
    // Mobile optimized layout
    if (isMobile) {
      return (
        <TouchableOpacity
          style={styles.mobileCard}
          onPress={() =>
            navigation.navigate('ProfessorDetail', {
              professorId: item.id,
              name: item.name,
              department: item.department,
              avgRating: item.avgRating,
              image: item.image,
              courses: item.courses
            })
          }
        >
          <View style={styles.mobileCardContent}>
            <Image 
              source={{ uri: item.image }} 
              style={styles.mobileImage} 
            />
            <View style={styles.mobileInfo}>
              <Text style={styles.name} numberOfLines={1} ellipsizeMode="tail">{item.name}</Text>
              <Text style={styles.department} numberOfLines={1} ellipsizeMode="tail">{item.department}</Text>
              <Text style={styles.rating}>⭐ {item.avgRating === 0 ? "-" : item.avgRating} / 5.0</Text>
            </View>
          </View>
        </TouchableOpacity>
      );
    }
    
    // Tablet/desktop layout
    return (
      <TouchableOpacity
        style={[styles.card, { width: cardWidth - 20 }]} // Minus margins
        onPress={() =>
          navigation.navigate('ProfessorDetail', {
            professorId: item.id,
            name: item.name,
            department: item.department,
            avgRating: item.avgRating,
            image: item.image,
            courses: item.courses
          })
        }
      >
        <Image 
          source={{ uri: item.image }} 
          style={styles.image} 
        />
        <View style={styles.info}>
          <Text style={styles.name} numberOfLines={1} ellipsizeMode="tail">{item.name}</Text>
          <Text style={styles.department} numberOfLines={1} ellipsizeMode="tail">{item.department}</Text>
          <Text style={styles.rating}>⭐ {item.avgRating === 0 ? "-" : item.avgRating} / 5.0</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={colors.primary} barStyle="light-content" />
      
      <View style={[
        styles.headerContainer,
        Platform.OS === 'ios' ? styles.headerIOS : null,
        Platform.OS === 'android' ? styles.headerAndroid : null
      ]}>
        {userName ? <Text style={styles.welcomeText}>Welcome, {userName}!</Text> : null}
        
        <View style={styles.buttonContainer}>
          {isAdmin && (
            <TouchableOpacity
              style={styles.adminButton}
              onPress={() => navigation.navigate('AdminDashboard')}
            >
              <Text style={styles.buttonText}>Admin</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity onPress={logout} style={styles.logoutButton}>
            <Text style={styles.buttonText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.searchBarContainer}>
        <Icon name="search" size={18} color={colors.textSecondary} style={styles.searchIcon} />
        <TextInput
          style={styles.searchBarInput}
          placeholder="Search professor's name / department"
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholderTextColor={colors.textSecondary}
        />
      </View>

      <View style={styles.filterContainer}>
        <Text style={styles.filterLabel}>Filter by Rating:</Text>
        <View style={styles.ratingButtons}>
          {[1, 2, 3, 4, 5].map((rating) => (
            <TouchableOpacity
              key={rating}
              style={[
                styles.ratingButton,
                minRating === rating && styles.ratingButtonActive,
              ]}
              onPress={() => setMinRating(minRating === rating ? 0 : rating)}
            >
              <Text style={styles.ratingButtonText}>{rating}+</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.listWrapper}>
        {loading ? (
          <View style={styles.loadingContainer}>
            <Text style={styles.loadingText}>Loading professors...</Text>
          </View>
        ) : (
          <FlatList
            data={filteredProfessors}
            keyExtractor={(item) => item.id}
            renderItem={renderProfessorCard}
            numColumns={numColumns}
            key={numColumns}
            contentContainerStyle={styles.listContainer}
            showsVerticalScrollIndicator={false}
            columnWrapperStyle={numColumns > 1 ? { justifyContent: 'center' } : null}
          />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    width: '100%',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: colors.cardBackground,
    borderBottomWidth: 1,
    borderBottomColor: colors.accent,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  // iOS specific header styling
  headerIOS: {
    paddingTop: Platform.OS === 'ios' ? 44 : 16, // Add extra padding for status bar on iOS
  },
  // Android specific header styling
  headerAndroid: {
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight + 10 : 16, // Use StatusBar.currentHeight for Android
  },
  welcomeText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.primary,
    textAlign: 'left',
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 10,
  },
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16,
    marginVertical: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderColor: colors.border,
    borderWidth: 1,
    paddingHorizontal: 10,
    width: 'auto',
  },
  adminButton: {
    backgroundColor: colors.secondary,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  logoutButton: {
    backgroundColor: colors.primary,
    padding: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  buttonText: {
    color: colors.cardBackground,
    fontWeight: '600',
  },
  searchIcon: {
    marginRight: 8,
  },
  searchBarInput: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 10,
    color: colors.textPrimary,
  },
  listWrapper: {
    flex: 1,
    width: '100%',
  },
  listContainer: {
    paddingHorizontal: 12,
    paddingBottom: 20,
    width: '100%',
    // alignItems: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loadingText: {
    fontSize: 16,
    color: colors.textSecondary,
  },
  filterContainer: {
    marginHorizontal: 16,
    marginBottom: 16,
    width: 'auto',
  },
  filterLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 8,
  },
  ratingButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  ratingButton: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    backgroundColor: '#ddd',
    borderRadius: 8,
    marginRight: 10,
    marginBottom: 6,
  },
  ratingButtonActive: {
    backgroundColor: colors.primary,
  },
  ratingButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  // Tablet/desktop card style
  card: {    
    margin: 10,
    padding: 15,
    backgroundColor: colors.cardBackground,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: 12,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  image: {
    width: 100,
    height: 125,
    marginBottom: 12,
    alignSelf: 'center',
    borderRadius: 12,
  },
  info: {
    width: '100%',
  },
  // Mobile styles
  mobileCard: {
    marginVertical: 10,
    marginHorizontal: 12,
    backgroundColor: colors.cardBackground,
    borderRadius: 12,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
    borderColor: colors.border,
    borderWidth: 1,
    // width: '95%',
  },
  mobileCardContent: {
    flexDirection: 'row',
    padding: 12,
    alignItems: 'center',
  },
  mobileImage: {
    width: 70,
    height: 90,
    borderRadius: 8,
    marginRight: 20,
  },
  mobileInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
    color: colors.textPrimary,
  },
  department: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 4,
  },
  rating: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.primary,
  },
});