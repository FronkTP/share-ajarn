import { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, Image, Dimensions, SafeAreaView, StyleSheet } from 'react-native';
import professors from '../data/professors';

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
  const [screenWidth, setScreenWidth] = useState(Dimensions.get('window').width);
  
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

  const cardWidth = 200;
  const numColumns = Math.max(1, Math.floor(screenWidth / cardWidth));
  const isMobile = screenWidth < 400;

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
          <Text style={styles.rating}>⭐ {item.avgRating === 0 ? "-" : item.avgRating} / 5.0
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={[styles.container, isMobile ? null : { alignItems: 'center' }]}>
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
});