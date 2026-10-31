import { View, Text, Pressable, Image, ScrollView, SafeAreaView, StyleSheet } from 'react-native';
import { useNavigation } from 'expo-router';

export default function HomeScreen() {
  const navigation = useNavigation();

  const featuredProducts = [
    {
      id: 1,
      name: 'Calming Salmon Oil Drops',
      description: 'Natural salmon oil formula with Omega-3 to reduce anxiety',
      price: 29.99,
      image: require('../assets/calming-salmon.jpg'),
      category: 'calming-drops',
    },
    {
      id: 2,
      name: 'Chamomile Anxiety Relief Drops',
      description: 'Gentle chamomile formula for mild anxiety',
      price: 24.99,
      image: require('../assets/chamomile-drops.jpg'),
      category: 'calming-drops',
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Hero Section */
        <View style={styles.heroSection}>
          <Text style={styles.heroTitle}>Natural Calming Solutions for Anxious Pets</Text>
          <Text style={styles.heroSubtitle}>
            helping your furry friend find peace and relaxation naturally
          </Text>
        </View>

        {/* Introduction */
        <View style={styles.introSection}>
          <Text style={styles.introTitle}>Welcome to Pet Calming & Anxiety Drops</Text>
          <Text style={styles.introDescription}>
            We provide natural, veterinarian-approved solutions to help your pets
            stay calm during stressful situations like thunderstorms, fireworks, travel,
            and separation anxiety.
          </Text>
        </View>

        {/* Featured Products */
        <View style={styles.productsSection}>
          <Text style={styles.sectionTitle}>Featured Products</Text>
          <FlatList
            data={featuredProducts}
            keyExtractor={(item) => item.id.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.productList}
            renderItem={({ item }) => (
              <Pressable style={styles.productCard} onPress={() => navigation.navigate('Product Details', { productId: item.id })}>
                <Image source={item.image} style={styles.productImage} />
                <View style={styles.productInfo}>
                  <Text style={styles.productName}>{item.name}</Text>
                  <Text style={styles.productPrice}>${item.price.toFixed(2)}</Text>
                </View>
              </Pressable>
            )}
          />
        </View>

        {/* Browse All Products Button */
        <Pressable style={styles.browseButton} onPress={() => navigation.navigate('Products')}>
          <Text style={styles.browseText}>Browse All Products</Text>
        </Pressable>
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
  heroSection: {
    marginBottom: 32,
    padding: 32,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    alignItems: 'center',
  },
  heroTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2d5a27',
    marginBottom: 8,
    textAlign: 'center',
  },
  heroSubtitle: {
    fontSize: 16,
    color: '#6b8a62',
    textAlign: 'center',
  },
  introSection: {
    marginBottom: 24,
    padding: 24,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    alignItems: 'center',
  },
  introTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2d5a27',
    marginBottom: 8,
  },
  introDescription: {
    fontSize: 14,
    color: '#6b8a62',
    textAlign: 'center',
    lineHeight: 20,
  },
  productsSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2d5a27',
    marginBottom: 16,
  },
  productList: {
    gap: 12,
  },
  productCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    overflow: 'hidden',
    width: 160,
    elevation: 2,
  },
  productImage: {
    width: '100%',
    height: 180,
    resizeMode: 'cover',
  },
  productInfo: {
    padding: 12,
  },
  productName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2d5a27',
    marginBottom: 4,
  },
  productPrice: {
    fontSize: 12,
    color: '#4caf50',
    fontWeight: '500',
  },
  browseButton: {
    marginTop: 32,
    padding: 14,
    backgroundColor: '#4caf50',
    borderRadius: 8,
    alignItems: 'center',
  },
  browseText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});