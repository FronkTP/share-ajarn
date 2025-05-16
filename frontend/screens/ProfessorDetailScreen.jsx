import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView, SafeAreaView } from 'react-native';
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

  const fetchReviews = async () => {
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
    <Text key={index} style={styles.star}>
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
      <ScrollView style={styles.scrollView}>
        <View style={styles.profileSection}>
          <View style={styles.profileHeader}>
            {image ? (
              <Image 
                source={{ uri: image }} 
                style={styles.profileImage}
              />
            ) : (
              <View style={styles.profileImagePlaceholderContainer}>
                <Text style={styles.profileImagePlaceholder}>😐</Text>
              </View>
            )}
            
            <View style={styles.nameSection}>
              <Text style={styles.profileName}>{name}</Text>
              <Text style={styles.profileDepartment}>{department}</Text>
            </View>
          </View>
          
          <View style={styles.infoSection}>
            <Text style={styles.sectionTitle}>Courses</Text>
            <Text style={styles.profileCourses}>
              {courses ? 
                (Array.isArray(courses) ? courses.join(', ') : courses) : 
                'No courses yet'}
            </Text>
          </View>
          
          <View style={styles.ratingSection}>
            <Text style={styles.sectionTitle}>Rating</Text>
            <View style={styles.ratingContainer}>
              <Text style={styles.ratingText}>{getAverageRating()}</Text>
              {renderStars(Math.round(parseFloat(getAverageRating())))}
            </View>
          </View>

          <TouchableOpacity 
            style={styles.rateButton}
            onPress={() => navigation.navigate('AddReview', { professorId })}
          >
            <Text style={styles.rateButtonText}>Rate this professor</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.reviewsContainer}>
          <Text style={styles.reviewsTitle}>Reviews ({reviews.length})</Text>
          
          {reviews.map((item, index) => (
            <View key={`review-${index}`} style={styles.reviewCard}>
              <View style={styles.reviewHeader}>
                <Text style={styles.reviewScore}>{item.stars}/5</Text>
                <Text style={styles.reviewCourse}>Course: {item.course}</Text>
              </View>
              <View style={styles.starsRow}>
                {renderStars(item.stars)}
              </View>
              <Text style={styles.reviewComment}>{item.comment || 'No comment'}</Text>
            </View>
          ))}
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
  scrollView: {
    flex: 1,
  },
  profileSection: {
    backgroundColor: colors.cardBackground,
    padding: 20,
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
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
  },
  profileImagePlaceholderContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: colors.accent,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  profileImagePlaceholder: {
    fontSize: 40,
  },
  nameSection: {
    flex: 1,
  },
  profileName: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 4,
    color: colors.primary,
  },
  profileDepartment: {
    fontSize: 16,
    color: colors.textSecondary,
  },
  infoSection: {
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
    color: colors.primary,
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
    fontSize: 22,
    fontWeight: 'bold',
    marginRight: 10,
    color: colors.secondary,
  },
  starContainer: {
    flexDirection: 'row',
  },
  star: {
    fontSize: 22,
    color: colors.secondary,
    marginRight: 2,
  },
  rateButton: {
    backgroundColor: colors.primary,
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignItems: 'center',
    marginTop: 5,
  },
  rateButtonText: {
    fontSize: 16,
    color: colors.cardBackground,
    fontWeight: '600',
  },
  reviewsContainer: {
    padding: 20,
  },
  reviewsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    color: colors.primary,
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
  },
  reviewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  reviewScore: {
    fontWeight: 'bold',
    fontSize: 16,
    marginRight: 12,
    minWidth: 40,
    color: colors.secondary,
  },
  reviewCourse: {
    fontSize: 16,
    color: colors.textSecondary,
  },
  starsRow: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  reviewComment: {
    fontSize: 15,
    lineHeight: 22,
    color: colors.textPrimary,
  }
});