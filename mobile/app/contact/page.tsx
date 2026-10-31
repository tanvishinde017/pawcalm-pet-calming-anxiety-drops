import { View, Text, Pressable, TextInput, SafeAreaView, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from 'expo-router';
import { useState } from 'react';

export default function ContactScreen() {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    if (!name || !email || !subject || !message) {
      setError('Please fill in all required fields');
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      const baseUrl = process.env.EXPO_PUBLIC_API_BASE_URL || 'http://localhost:4000';
      const response = await fetch(`${baseUrl}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, phone, subject, message }),
      });

      if (!response.ok) throw new Error('Failed to submit enquiry');

      const data = await response.json();
      setName('');
      setEmail('');
      setPhone('');
      setSubject('');
      setMessage('');
      navigation.goBack();
    } catch (err: any) {
      setError(err.message || 'Failed to submit enquiry');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.title}>Get in Touch</Text>
            <Text style={styles.subtitle}>
              Have questions about our products or need help choosing the right calming solution for your pet? We're here to help.
            </Text>
          </View>

          <View style={styles.form}>
            {error && <Text style={styles.errorMessage}>{error}</Text>}

            <TextInput
              placeholder="Your name"
              value={name}
              onChangeText={setName}
              style={styles.input}
            />
            <TextInput
              placeholder="your@email.com"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              style={styles.input}
            />
            <TextInput
              placeholder="Phone number (optional)"
              value={phone}
              onChangeText={setPhone}
              keyboardType="phone-pad"
              style={styles.input}
            />
            <TextInput
              placeholder="Subject"
              value={subject}
              onChangeText={setSubject}
              style={styles.input}
            />
            <TextInput
              placeholder="Tell us about your pet and what you're looking for..."
              value={message}
              onChangeText={setMessage}
              multiline={true}
              numberOfLines={4}
              style={styles.input}
            />

            <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
              <Text style={styles.submitButtonText}>
                {submitting ? 'Sending...' : 'Submit Enquiry'}
              </Text>
            </TouchableOpacity>
          </View>
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
  header: {
    marginBottom: 32,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2d5a27',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#6b8a62',
  },
  form: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 24,
  },
  errorMessage: {
    color: '#d32f2f',
    marginBottom: 16,
    fontSize: 14,
  },
  input: {
    width: '100%',
    height: 48,
    backgroundColor: '#f0f4f7',
    borderRadius: 10,
    paddingHorizontal: 16,
    fontSize: 16,
    marginBottom: 16,
  },
  submitButton: {
    backgroundColor: '#4caf50',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  submitButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
});