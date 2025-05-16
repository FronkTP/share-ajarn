import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Platform, StatusBar, StyleSheet } from 'react-native';
import Stars from 'react-native-stars';
import { Picker } from '@react-native-picker/picker';
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

export default function AddReviewScreen({ route, navigation }) {
  const { professorId, professorName, courses } = route.params;
  const [course, setCourse] = useState('');
  const [comment, setComment] = useState('');
  const [stars, setStars] = useState(0);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    // Form validation
    if (!course) {
      alert('Please select a course');
      return;
    }
    
    if (stars === 0) {
      alert('Please provide a rating');
      return;
    }
    
    setSubmitting(true);
    
    try {
      const response = await fetch(`${BASE_URL}/add_review`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          professorId,
          course,
          stars,
          comment,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert('Review submitted successfully!');
        navigation.goBack();
      } else {
        alert('Failed to submit: ' + (data.error || 'Unknown error'));
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Network error. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={colors.primary} barStyle="light-content" />
      
      <View style={styles.headerContainer}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Add a Review</Text>
        <View style={styles.headerRight} />
      </View>
      
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {professorName && (
          <View style={styles.professorCard}>
            <Text style={styles.professorLabel}>Professor:</Text>
            <Text style={styles.professorName}>{professorName}</Text>
          </View>
        )}
        
        <View style={styles.formContainer}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Course Name</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={course}
                onValueChange={(itemValue) => setCourse(itemValue)}
                style={styles.picker}
                dropdownIconColor={colors.secondary}
                mode="dropdown"
              >
                <Picker.Item label="Select a course" value="" color={colors.textSecondary} />
                {Array.isArray(courses) && courses.map((c, index) => (
                  <Picker.Item 
                    key={index} 
                    label={c} 
                    value={c} 
                    color={colors.textPrimary} 
                  />
                ))}
              </Picker>
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Rating</Text>
            <View style={styles.ratingContainer}>
              <Stars
                default={0}
                update={(val) => setStars(val)}
                spacing={8}
                starSize={36}
                count={5}
                fullStar={require('../assets/starYellow.png')}
                emptyStar={require('../assets/starBlack.png')}
              />
              <Text style={styles.ratingHint}>
                {stars === 0 ? 'Tap to rate' : `${stars}/5 stars`}
              </Text>
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Comments</Text>
            <TextInput
              placeholder="Share your experience with this professor..."
              placeholderTextColor={colors.textSecondary}
              style={styles.commentInput}
              value={comment}
              onChangeText={setComment}
              multiline
              numberOfLines={Platform.OS === 'ios' ? null : 4}
              minHeight={Platform.OS === 'ios' ? 100 : null}
              textAlignVertical="top"
            />
          </View>

          <TouchableOpacity 
            style={[
              styles.submitButton,
              submitting && styles.submitButtonDisabled
            ]}
            onPress={handleSubmit}
            disabled={submitting}
          >
            <Text style={styles.submitButtonText}>
              {submitting ? 'Submitting...' : 'Submit Review'}
            </Text>
          </TouchableOpacity>
          
          <Text style={styles.disclaimer}>
            Your review will be submitted for approval by moderators.
          </Text>
        </View>
      </ScrollView>
    </View>
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
  scrollContent: {
    padding: 16,
  },
  professorCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.cardBackground,
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
    borderLeftWidth: 4,
    borderLeftColor: colors.primary,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  professorLabel: {
    fontSize: 16,
    color: colors.textSecondary,
    marginRight: 8,
  },
  professorName: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.primary,
  },
  formContainer: {
    backgroundColor: colors.cardBackground,
    borderRadius: 12,
    padding: 16,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.primary,
    marginBottom: 8,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    backgroundColor: colors.cardBackground,
    overflow: 'hidden',
  },
  picker: {
    height: 50,
    width: '100%',
    color: colors.textPrimary,
  },
  ratingContainer: {
    alignItems: 'center',
    paddingVertical: 12,
  },
  ratingHint: {
    marginTop: 8,
    color: colors.textSecondary,
    fontSize: 14,
  },
  commentInput: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    padding: 12,
    backgroundColor: colors.cardBackground,
    color: colors.textPrimary,
    fontSize: 16,
  },
  submitButton: {
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
  submitButtonDisabled: {
    backgroundColor: '#9E7E7E', // Lighter version of primary color
    shadowOpacity: 0,
    elevation: 0,
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 16,
  },
  disclaimer: {
    marginTop: 16,
    textAlign: 'center',
    color: colors.textSecondary,
    fontSize: 12,
    fontStyle: 'italic',
  },
});