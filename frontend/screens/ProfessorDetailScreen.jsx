import { View, Text, Button, StyleSheet, FlatList } from 'react-native';
import { useCallback, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';

export default function ProfessorDetailScreen({ route, navigation }) {
  const { professorId, name, department } = route.params;
  const [reviews, setReviews] = useState([]);

  const fetchReviews = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:5000/get_reviews/${professorId}`);
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

  const renderReview = ({ item }) => (
    <View style={styles.reviewCard}>
      <Text style={styles.reviewCourse}>Course: {item.course}</Text>
      <Text>Stars: {item.stars}</Text>
      <Text>Comment: {item.comment || 'No comment'}</Text>
    </View>
  );


  return (
    <View style={styles.container}>
      <Text style={styles.title}>{name}</Text>
      <Text>Department: {department}</Text>
      <Text>Average Rating: 4.3</Text>

      <Button
        title="Rate This Professor"
        onPress={() => navigation.navigate('AddReview', { professorId })}
      />
      <Text style={styles.reviewTitle}>Reviews:</Text>
      <FlatList
        data={reviews}
        keyExtractor={(_, index) => index.toString()}
        renderItem={renderReview}
      />

    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
    title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
    reviewTitle: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: 'bold',
  },
  reviewCard: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginTop: 10,
  },
  reviewCourse: {
    fontWeight: 'bold',
  },
});