const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Product name is required'],
    trim: true,
    maxlength: [100, 'Product name cannot exceed 100 characters'],
  },
  slug: {
    type: String,
    required: [true, 'Product slug is required'],
    unique: true,
    lowercase: true,
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'Product description is required'],
    trim: true,
  },
  price: {
    type: Number,
    required: [true, 'Product price is required'],
    min: [0, 'Price must be a positive number'],
  },
  category: {
    type: String,
    required: [true, 'Product category is required'],
    enum: ['calming-drops', 'treats', 'toys', 'accessories'],
    default: 'calming-drops',
  },
  image: {
    type: String,
    required: [true, 'Product image is required'],
  },
  stock: {
    type: Number,
    default: 0,
    min: [0, 'Stock must be a non-negative number'],
  },
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
  isFeatured: {
    type: Boolean,
    default: false,
  },
  dateCreated: {
    type: Date,
    default: Date.now,
  },
}, {
  timestamps: true,
});

// Generate slug before saving
productSchema.pre('save', async function(next) {
  if (!this.slug) {
    this.slug = this.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  }
  next();
});

// Pagination plugin
productSchema.plugin(mongoosePaginate);

const Product = mongoose.model('Product', productSchema);
module.exports = Product;