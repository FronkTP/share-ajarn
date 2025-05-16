import { View, Text, TouchableOpacity, Image, ScrollView, SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import { useCallback, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
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

export default function ProfessorDetailScreen({ route, navigation }) {
  const { professorId, name, department, avgRating, image, courses } = route.params;
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchReviews = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/get_reviews/${professorId}`);
      const data = await response.json();
      if (Array.isArray(data)) {
        setReviews(data);
      } else {
        console.error('Unexpected data format:', data);
      }
    } catch (error) {
      console.error('Fetch error:', error);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchReviews();
    }, [professorId])
  );

  const getAverageRating = () => {
    if (reviews.length === 0) return avgRating || 0;
    const totalStars = reviews.reduce((sum, review) => sum + review.stars, 0);
    return (totalStars / reviews.length).toFixed(1);
  };

  const renderStar = (index, filled) => (
    <Text key={index} style={[styles.star, filled ? styles.starFilled : styles.starEmpty]}>
      {filled ? '★' : '☆'}
    </Text>
  );
  
  const renderStars = (count, max = 5) => {
    const stars = [];
    for (let i = 0; i < max; i++) {
      stars.push(renderStar(i, i < count));
    }
    return <View style={styles.starContainer}>{stars}</View>;
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={colors.primary} barStyle="light-content" />
      
      <View style={styles.headerContainer}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Professor Details</Text>
        <View style={styles.headerRight} />
      </View>
      
      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.profileSection}>
          <View style={styles.profileHeader}>
            {image ? (
              <Image 
                source={{ uri: image }} 
                style={styles.profileImage}
              />
            ) : (
              <View style={styles.profileImagePlaceholderContainer}>
                <Text style={styles.profileImagePlaceholder}>👨</Text>
              </View>
            )}
            
            <View style={styles.nameSection}>
              <Text style={styles.profileName}>{name}</Text>
              <Text style={styles.profileDepartment}>{department}</Text>
            </View>
          </View>
          
          <View style={styles.infoSection}>
            <Text style={styles.sectionTitle}>Courses</Text>
            <View style={styles.coursesContainer}>
              <Text style={styles.profileCourses}>
                {courses ? 
                  (Array.isArray(courses) ? courses.join(', ') : courses) : 
                  'No courses yet'}
              </Text>
            </View>
          </View>
          
          <View style={styles.ratingSection}>
            <Text style={styles.sectionTitle}>Rating</Text>
            <View style={styles.ratingContainer}>
              <Text style={styles.ratingText}>{getAverageRating()}</Text>
              {renderStars(Math.round(parseFloat(getAverageRating())))}
              <Text style={styles.ratingCount}>
                ({reviews.length} {reviews.length === 1 ? 'review' : 'reviews'})
              </Text>
            </View>
          </View>

          <TouchableOpacity 
            style={styles.rateButton}
            onPress={() => navigation.navigate('AddReview', { 
              professorId, 
              professorName: name,
              courses
            })}
          >
            <Text style={styles.rateButtonText}>Rate This Professor</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.reviewsContainer}>
          <Text style={styles.reviewsTitle}>Student Reviews ({reviews.length})</Text>
          
          {loading ? (
            <View style={styles.loadingContainer}>
              <Text style={styles.loadingText}>Loading reviews...</Text>
            </View>
          ) : reviews.length === 0 ? (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No reviews yet. Be the first to review!</Text>
            </View>
          ) : (
            reviews.map((item, index) => (
              <View key={`review-${index}`} style={styles.reviewCard}>
                <View style={styles.reviewHeader}>
                  <View style={styles.reviewScoreContainer}>
                    <Text style={styles.reviewScore}>{item.stars}/5</Text>
                  </View>
                  <Text style={styles.reviewCourse}>Course: {item.course}</Text>
                </View>
                <View style={styles.starsRow}>
                  {renderStars(item.stars)}
                </View>
                <Text style={styles.reviewComment}>
                  {item.comment || '-'}
                </Text>
              </View>
            ))
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
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
  backButton: {
    paddingVertical: 8,
    paddingRight: 12,
  },
  backButtonText: {
    color: colors.secondary,
    fontSize: 16,
    fontWeight: '600',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.primary,
    flex: 1,
    textAlign: 'center',
  },
  headerRight: {
    width: 48, // Match width of back button
  },
  scrollView: {
    flex: 1,
  },
  profileSection: {
    backgroundColor: colors.cardBackground,
    padding: 20,
    marginBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginRight: 15,
    borderWidth: 3,
    borderColor: colors.accent,
  },
  profileImagePlaceholderContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: colors.accent,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
    borderWidth: 3,
    borderColor: colors.accent,
  },
  profileImagePlaceholder: {
    fontSize: 40,
  },
  nameSection: {
    flex: 1,
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
    color: colors.primary,
  },
  profileDepartment: {
    fontSize: 16,
    color: colors.textSecondary,
    fontStyle: 'italic',
  },
  infoSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
    color: colors.primary,
  },
  coursesContainer: {
    backgroundColor: colors.background,
    borderRadius: 8,
    padding: 12,
    borderLeftWidth: 3,
    borderLeftColor: colors.accent,
  },
  profileCourses: {
    fontSize: 15,
    lineHeight: 22,
    color: colors.textPrimary,
  },
  ratingSection: {
    marginBottom: 20,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginRight: 10,
    color: colors.secondary,
  },
  ratingCount: {
    marginLeft: 8,
    fontSize: 14,
    color: colors.textSecondary,
  },
  starContainer: {
    flexDirection: 'row',
  },
  star: {
    fontSize: 22,
    marginRight: 2,
  },
  starFilled: {
    color: colors.secondary,
  },
  starEmpty: {
    color: colors.border,
  },
  rateButton: {
    backgroundColor: colors.primary,
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignItems: 'center',
    marginTop: 5,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  rateButtonText: {
    fontSize: 16,
    color: colors.cardBackground,
    fontWeight: '600',
  },
  reviewsContainer: {
    paddingTop: 20,
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
  reviewsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    color: colors.primary,
  },
  loadingContainer: {
    padding: 20,
    alignItems: 'center',
  },
  loadingText: {
    color: colors.textSecondary,
    fontSize: 16,
  },
  emptyContainer: {
    padding: 20,
    alignItems: 'center',
    backgroundColor: colors.cardBackground,
    borderRadius: 8,
    borderLeftWidth: 3,
    borderLeftColor: colors.accent,
  },
  emptyText: {
    color: colors.textSecondary,
    fontSize: 16,
    textAlign: 'center',
  },
  reviewCard: {
    backgroundColor: colors.cardBackground,
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
    borderLeftWidth: 3,
    borderLeftColor: colors.accent,
  },
  reviewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  reviewScoreContainer: {
    backgroundColor: colors.background,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    marginRight: 10,
  },
  reviewScore: {
    fontWeight: 'bold',
    fontSize: 16,
    color: colors.secondary,
  },
  reviewCourse: {
    fontSize: 16,
    color: colors.textSecondary,
    flex: 1,
  },
  starsRow: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  reviewComment: {
    fontSize: 15,
    lineHeight: 22,
    color: colors.textPrimary,
    backgroundColor: colors.background,
    padding: 12,
    borderRadius: 8,
  }
});