// Seed script to populate database with sample products
require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('./models/Product');
const sampleProducts = require('./utils/sampleProducts');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/calming-drops';

const importProducts = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    
    // Clear existing products
    await Product.deleteMany({});
    
    // Import sample products
    await Product.insertMany(sampleProducts);
    
    console.log('Sample products imported successfully');
    process.exit();
  } catch (error) {
    console.error('Error importing products:', error.message);
    process.exit(1);
  }
};

const destroyProducts = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    await Product.deleteMany({});
    console.log('All products deleted');
    process.exit();
  } catch (error) {
    console.error('Error deleting products:', error.message);
    process.exit(1);
  }
};

// Check command line arguments
const args = process.argv[2];

if (args === 'import') {
  importProducts();
} else if (args === 'destroy') {
  destroyProducts();
} else {
  console.log('Usage:');
  console.log('  node seed.js import   - Import sample products');
  console.log('  node seed.js destroy  - Delete all products');
}