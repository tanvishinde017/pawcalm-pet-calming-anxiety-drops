const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

// Define Indian pet product categories
const indianCategories = [
  'dog-food',
  'cat-food', 
  'treats-and-chews',
  'calming-and-wellness',
  'toys-and-accessories',
  'grooming-and-hygiene',
  'beds-and-comfort',
  'health-and-care',
];

const categoryEnum = indianCategories.map(c => c.replace(/[-]/g, ' ').replace(/^\w/, c => c.toUpperCase()).replace(/\s/g, ' ')).reduce((acc, curr) => {
  acc[curr] = curr;
  return acc;
}, {});

// Extend with common Indian pet brands as category sub-options
const extendedCategories = [
  'dog-food',
  'cat-food', 
  'treats-and-chews',
  'calming-and-wellness',
  'toys-and-accessories',
  'grooming-and-hygiene',
  'beds-and-comfort',
  'health-and-care',
  'brands',
];

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Category name is required'],
    trim: true,
    maxlength: [50, 'Category name cannot exceed 50 characters'],
  },
  slug: {
    type: String,
    required: [true, 'Category slug is required'],
    unique: true,
    lowercase: true,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  image: {
    type: String,
  },
  parent: {
    type: String,
    enum: extendedCategories,
  },
}, { timestamps: true });

categorySchema.pre('save', async function(next) {
  if (!this.slug) {
    this.slug = this.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  }
  next();
});

const Category = mongoose.model('Category', categorySchema);

// Define enhanced product schema for Indian pet e-commerce
const productSchema = new mongoose.Schema({
  // Basic product info
  name: {
    type: String,
    required: [true, 'Product name is required'],
    trim: true,
    maxlength: [200, 'Product name cannot exceed 200 characters'],
  },
  slug: {
    type: String,
    required: [true, 'Product slug is required'],
    unique: true,
    lowercase: true,
    trim: true,
  },
  brand: {
    type: String,
    required: [true, 'Brand name is required'],
    trim: true,
    enum: [
      'Drools',
      'Pedigree', 
      'Royal Canin',
      'Farmina N&D',
      'Himalaya PET',
      'Wiggles',
      'Heads Up For Tails',
      'Purepet',
      'Whiskas',
      'Me-O',
      'Other',
    ],
  },
  category: {
    type: String,
    required: [true, 'Product category is required'],
    enum: indianCategories,
    default: 'dog-food',
  },
  
  // Pricing in INR
  price: {
    type: Number,
    required: [true, 'Product price is required'],
    min: [0, 'Price must be a positive number'],
  },
  mrp: {
    type: Number,
    description: 'Maximum Retail Price in INR',
  },
  discount: {
    type: Number, // percentage discount
    min: [0, 'Discount must be at least 0'],
    max: [100, 'Discount cannot exceed 100'],
  },
  
  // Pack size (e.g., 200g, 1kg, 12pcs, 750ml)
  packSize: {
    type: String,
    required: [true, 'Pack size is required'],
    trim: true,
  },
  
  // Product images - support multiple images
  images: {
    type: [String],
    validate: [
      {
        validator: (images) => images && images.length > 0,
        message: 'At least one product image is required',
      },
      {
        validator: (images) => images.every(img => img && img.startsWith('http')),
        message: 'Product images must be valid URLs',
      },
    ],
    default: [],
  },
  
  // Inventory and availability
  stock: {
    type: Number,
    required: [true, 'Stock quantity is required'],
    min: [0, 'Stock must be a non-negative number'],
    default: 0,
  },
  inStock: {
    type: Boolean,
    default: true,
  },
  
  // Product specifications
  specifications: {
    type: Map,
    of: String,
    default: {},
  },
  
  // Product description
  description: {
    type: String,
    required: [true, 'Product description is required'],
    trim: true,
  },
  
  // Rating and reviews
  rating: {
    type: Number,
    default: 0,
    min: [0, 'Rating must be at least 0'],
    max: [5, 'Rating must not exceed 5'],
  },
  numReviews: {
    type: Number,
    default: 0,
  },
  reviews: [
    {
      user: mongoose.Schema.Types.ObjectId,
      name: String,
      rating: Number,
      comment: String,
      date: { type: Date, default: Date.now },
    },
  ],
  
  // Product status
  isFeatured: {
    type: Boolean,
    default: false,
  },
  isAvailable: {
    type: Boolean,
    default: true,
  },
  isDiscontinued: {
    type: Boolean,
    default: false,
  },
  
  // Timestamps
  dateCreated: {
    type: Date,
    default: Date.now,
  },
  lastUpdated: {
    type: Date,
    default: Date.now,
  },
}, {
  timestamps: { currentField: 'lastUpdated' },
});

// Indexes for search performance
productSchema.index({ name: 'text', description: 'text', brand: 'text', category: 'text' });
productSchema.index({ price: 1, stock: 1, isAvailable: 1 });
productSchema.index({ brand: 1, category: 1 });

// Pagination plugin
productSchema.plugin(mongoosePaginate);

// Generate slug before saving
productSchema.pre('save', async function(next) {
  if (!this.slug) {
    this.slug = this.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  }
  // Also update lastUpdated
  this.lastUpdated = Date.now();
  next();
});

// Virtual for calculating discounted price
productSchema.virtual('discountedPrice').get(function() {
  if (this.discount && this.discount > 0) {
    return Math.round(this.price - (this.price * this.discount) / 100);
  }
  return this.price;
});

// Virtual to check if on sale
productSchema.virtual('onSale').get(function() {
  return !!(this.discount && this.discount > 0 && this.price < this.mrp);
});

const Product = mongoose.model('Product', productSchema);

module.exports = { Product, Category, indianCategories };