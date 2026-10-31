import { View, Text, Pressable, Image, ScrollView, SafeAreaView, StyleSheet } from 'react-native';
import { useNavigation } from 'expo-router';

export default function AboutScreen() {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.content}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>About Pet Calming & Anxiety Drops</Text>
            <Text style={styles.sectionDescription}>
              We are dedicated to providing natural, effective solutions for anxious pets and their families.
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Our Mission</Text>
            <ul style={styles.missionList}>
              <li>Improve the quality of life for anxious dogs everywhere</li>
              <li>Provide veterinarian-approved, natural calming solutions</li>
              <li>Educate pet owners about stress reduction for dogs</li>
              <li>Build trust through transparency and quality</li>
            </ul>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Meet the Team</Text>
            <div style={styles.teamMembers}>
              <View style={styleItem}>
                <Text style={styleItemTitle}>Dr. Sarah Johnson, DVM</Text>
                <Text style={styleItemSubtitle}>Veterinary Advisor</Text>
              </View>
              <View style={styleItem}>
                <Text style={styleItemTitle}>Michael Chen</Text>
                <Text style={styleItemSubtitle}>Product Developer</Text>
              </View>
            </div>
          </View>

          <Pressable style={styles.button} onPress={() => navigation.navigate('Home')}>
            <Text style={styles.buttonText}>Back Home</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f7fa',
  },
  scrollContent: {
    padding: 20,
  },
  content: {
    maxWidth: 400,
  },
  section: {
    marginBottom: 32,
    padding: 24,
    backgroundColor: '#ffffff',
    borderRadius: 12,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2d5a27',
    marginBottom: 16,
  },
  sectionDescription: {
    fontSize: 14,
    color: '#6b8a62',
    marginBottom: 24,
  },
  missionList: {
    marginLeft: 20,
    marginBottom: 16,
  },
  missionListItem: {
    marginBottom: 8,
  },
  teamMembers: {
    display: 'flex',
    gap: 20,
    marginTop: 16,
  },
  styleItem: {
    backgroundColor: '#f0f4f7',
    padding: 16,
    borderRadius: 8,
    width: 150,
  },
  styleItemTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2d5a27',
    marginBottom: 4,
  },
  styleItemSubtitle: {
    fontSize: 12,
    color: '#6b8a62',
  },
  button: {
    marginTop: 24,
    padding: 12,
    backgroundColor: '#4caf50',
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
  },
});