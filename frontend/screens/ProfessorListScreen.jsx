import { View, Text, TouchableOpacity, FlatList, Image, Dimensions, SafeAreaView, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useEffect } from 'react';
import baseProfessors from '../data/baseProfessors';

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

  const [screenWidth, setScreenWidth] = useState(Dimensions.get('window').width);
  const cardWidth = 200;
  const numColumns = Math.max(1, Math.floor(screenWidth / cardWidth));
  const isMobile = screenWidth < 400;

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
      const updatedProfessors = await Promise.all(
        baseProfessors.map(async (prof) => {
          const avgRating = await fetchRating(prof.id);
          return { ...prof, avgRating };
        })
      );
      setProfessors(updatedProfessors);
    };

    fetchRatings();
  }, []);

  const fetchRating = async (professorId) => {
  try {
    const response = await fetch(`http://127.0.0.1:5000/get_reviews/${professorId}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const reviews = await response.json();
    if (!Array.isArray(reviews) || reviews.length === 0) return 0;

    const total = reviews.reduce((sum, review) => sum + (review.stars || 0), 0);
    return (total / reviews.length).toFixed(1); // 1 decimal
  } catch (error) {
    console.error("Failed to fetch rating for professor", professorId, error);
    return 0;
  }
  };
  
  const checkAdminStatus = async (email) => {
    try {
      const response = await fetch('http://127.0.0.1:5000/api/get_user_info', {
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
        setIsAdmin(userInfo.isAdmin); // ✅ update state
        await AsyncStorage.setItem('user', JSON.stringify(userInfo));
      } else {
        console.warn('Invalid user data:', data);
      }
    } catch (error) {
      console.error('Failed to check admin status:', error);
    }
  };
  console.log(isAdmin)

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
    <SafeAreaView style={[styles.container, isMobile ? null : { alignItems: 'center' }]}>
      <View style={styles.container}>
        {userName ? <Text style={styles.welcome}>Welcome, {userName}!</Text> : null}

        {isAdmin && (
          <TouchableOpacity
            style={styles.adminButton}
            onPress={() => navigation.navigate('AdminDashboard')}
          >
            <Text style={styles.adminButtonText}>Go to Admin Dashboard</Text>
          </TouchableOpacity>
        )}

        <Text style={styles.title}>Professor List</Text>

        <FlatList
          data={professors}
          keyExtractor={(item) => item.id}
          renderItem={renderProfessorCard}
          numColumns={numColumns}
          key={numColumns}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  listContainer: {
    padding: 12,
    paddingBottom: 20,
  },
  title: {
    marginTop: 20,
    marginBottom: 20,
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: colors.primary,
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
  adminButton: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 8,
    marginBottom: 20,
    alignItems: 'center',
  },
  adminButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});