import { View, Text, FlatList, TouchableOpacity, StyleSheet, StatusBar } from 'react-native';
import { useEffect, useState } from 'react';
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

export default function AdminDashboard() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPendingReviews();
  }, []);

  const fetchPendingReviews = async () => {
    setLoading(true);
    try {
      const res = await fetch('http://127.0.0.1:5000/pending_reviews');
      const data = await res.json();
      setReviews(data.reviews);
    } catch (error) {
      console.error('Failed to fetch pending reviews:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id) => {
    try {
      const res = await fetch(`http://127.0.0.1:5000/approve_review/${id}`, {
        method: 'POST',
      });
      const data = await res.json();
      alert(data.message);
      fetchPendingReviews();
    } catch (error) {
      alert('Error approving review');
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`http://127.0.0.1:5000/reject_review/${id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      alert(data.message);
      fetchPendingReviews();
    } catch (error) {
      alert('Error deleting review');
    }
  };

  const renderStars = (rating) => {
    return '★'.repeat(rating) + '☆'.repeat(5 - rating);
  };

  const renderItem = ({ item }) => {
    const professor = baseProfessors.find(prof => prof.id === item.professorID.toString());

    return (
      <View style={styles.card}>
        <Text style={styles.name}>{professor ? professor.name : 'Unknown Professor'}</Text>
        <View style={styles.courseContainer}>
          <Text style={styles.courseLabel}>Course:</Text>
          <Text style={styles.courseValue}>{item.course}</Text>
        </View>
        <View style={styles.ratingContainer}>
          <Text style={styles.ratingLabel}>Rating:</Text>
          <Text style={styles.ratingValue}>{renderStars(item.stars)}</Text>
        </View>
        <View style={styles.commentContainer}>
          <Text style={styles.commentLabel}>Comment:</Text>
          <Text style={styles.commentValue}>{item.comment? item.comment: "-"}</Text>
        </View>
        <View style={styles.buttonRow}>
          <TouchableOpacity 
            style={[styles.button, styles.approveButton]} 
            onPress={() => handleApprove(item.id)}
          >
            <Text style={styles.buttonText}>✓ Approve</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.button, styles.deleteButton]} 
            onPress={() => handleDelete(item.id)}
          >
            <Text style={styles.buttonText}>✕ Reject</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={colors.primary} barStyle="light-content" />
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Pending Reviews</Text>
        <TouchableOpacity 
          style={styles.refreshButton}
          onPress={fetchPendingReviews}
        >
          <Text style={styles.refreshButtonText}>Refresh</Text>
        </TouchableOpacity>
      </View>
      {loading ? (
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading reviews...</Text>
        </View>
      ) : reviews.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No pending reviews</Text>
        </View>
      ) : (
        <FlatList
          data={reviews}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 16, 
    backgroundColor: colors.background,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.accent,
    marginBottom: 16,
  },
  header: { 
    fontSize: 28, 
    fontWeight: 'bold',
    color: colors.primary,
  },
  refreshButton: {
    backgroundColor: colors.accent,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  refreshButtonText: {
    color: colors.primary,
    fontWeight: '600',
  },
  listContainer: {
    // paddingBottom: 40,
  },
  card: {
    padding: 16,
    marginBottom: 16,
    backgroundColor: colors.cardBackground,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: colors.primary,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  name: { 
    fontSize: 20, 
    fontWeight: '700', 
    marginBottom: 12,
    color: colors.primary,
  },
  courseContainer: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  courseLabel: {
    fontWeight: '600',
    color: colors.textSecondary,
    width: 70,
  },
  courseValue: {
    color: colors.textPrimary,
    flex: 1,
    fontWeight: '500',
  },
  ratingContainer: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  ratingLabel: {
    fontWeight: '600',
    color: colors.textSecondary,
    width: 70,
  },
  ratingValue: {
    color: colors.secondary,
    letterSpacing: 2,
  },
  commentContainer: {
  },
  commentLabel: {
    fontWeight: '600',
    color: colors.textSecondary,
    marginBottom: 4,
  },
  commentValue: {
    color: colors.textPrimary,
    backgroundColor: '#f9f7f1',
    padding: 12,
    borderRadius: 8,
    borderLeftWidth: 2,
    borderLeftColor: colors.accent,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  button: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  approveButton: {
    backgroundColor: '#e0ebd5',
    marginRight: 8,
  },
  deleteButton: {
    backgroundColor: '#fbdfdf',
    marginLeft: 8,
  },
  buttonText: {
    fontWeight: '600',
    color: colors.textPrimary,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: colors.textSecondary,
    fontSize: 16,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    color: colors.textSecondary,
    fontSize: 16,
  },
});