const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const Enquiry = require('../models/Enquiry');
const sampleProducts = require('../utils/sampleProducts');

// Helper function to seed sample products if none exist
const seedProducts = async () => {
  try {
    const count = await Product.countDocuments({});
    if (count === 0) {
      await Product.insertMany(sampleProducts);
      console.log('Sample products seeded');
    }
  } catch (error) {
    console.error('Error seeding products:', error.message);
  }
};

// Call seed on route initialization
seedProducts();

router.use((req, res, next) => {
  next();
});

// GET helpers
const parseIntQuery = (req, key, defaultVal) => {
  const val = req.query[key];
  return val !== undefined ? Math.max(0, parseInt(val, 10)) : defaultVal;
};

const parseFloatQuery = (req, key, defaultVal) => {
  const val = req.query[key];
  return val !== undefined ? Math.max(0, parseFloat(val)) : defaultVal;
};

// @route   GET /api/products
// @desc    Get all products with filtering, sorting and pagination
// @access  Public
router.get('/', async (req, res) => {
  try {
    // Pagination
    const page = parseIntQuery(req, 'page', 1);
    const limit = parseIntQuery(req, 'limit', 20);
    const skip = (page - 1) * limit;

    // Filtering
    const filter = {};

    // Category filter
    if (req.query.category) {
      filter.category = req.query.category;
    }

    // Brand filter
    if (req.query.brand) {
      filter.brand = req.query.brand;
    }

    // Price range filter
    const minPrice = parseFloatQuery(req, 'minPrice', 0);
    const maxPrice = parseFloatQuery(req, 'maxPrice', Infinity);
    if (minPrice >= 0 || maxPrice > 0) {
      filter.price = {};
      if (minPrice > 0) filter.price.$gte = minPrice;
      if (maxPrice < Infinity) filter.price.$lte = maxPrice;
    }

    // Search filter
    if (req.query.search) {
      filter.$or = [
        { name: { $regex: req.query.search, $options: 'i' } },
        { description: { $regex: req.query.search, $options: 'i' } },
      ];
    }

    // Sorting
    let sort = {};
    if (req.query.sortBy) {
      if (req.query.sortBy === 'price-asc') {
        sort = { price: 1 };
      } else if (req.query.sortBy === 'price-desc') {
        sort = { price: -1 };
      } else if (req.query.sortBy === 'newest') {
        sort = { dateCreated: -1 };
      } else if (req.query.sortBy === 'name-asc') {
        sort = { name: 1 };
      } else if (req.query.sortBy === 'name-desc') {
        sort = { name: -1 };
      }
    } else {
      sort = { isFeatured: -1, dateCreated: -1 };
    }

    // Execute query with pagination
    const products = await Product.find(filter)
      .sort(sort)
      .skip(skip)
      .limit(limit)
      .lean();

    // Get total count for pagination metadata
    const total = await Product.countDocuments(filter);

    res.json({
      success: true,
      data: products,
      pagination: {
        page,
        pages: Math.ceil(total / limit),
        total,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   GET /api/products/:id
// @desc    Get single product by ID
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json({
      success: true,
    data: product,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   POST /api/products
// @desc    Create a new product (admin)
// @access  Private
router.post('/', async (req, res) => {
  try {
    const product = new Product({
      name: req.body.name,
      slug: req.body.slug || '',
      description: req.body.description,
      price: req.body.price,
      category: req.body.category,
      image: req.body.image,
      stock: req.body.stock || 0,
      rating: req.body.rating || 0,
      numReviews: req.body.numReviews || 0,
      isFeatured: req.body.isFeatured || false,
    });

    const createdProduct = await product.save();
    res.status(201).json({
      success: true,
      data: createdProduct,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @route   PUT /api/products/:id
// @desc    Update a product (admin)
// @access  Private
router.put('/:id', async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        slug: req.body.slug || '',
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
        image: req.body.image,
        stock: req.body.stock,
        rating: req.body.rating,
        isFeatured: req.body.isFeatured,
      },
      { new: true, runValidators: true }
    );

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json({
      success: true,
      data: product,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @route   DELETE /api/products/:id
// @desc    Delete a product (admin)
// @access  Private
router.delete('/:id', async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json({
      success: true,
      message: 'Product removed',
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   POST /api/products/:id/reviews
// @desc    Create a review for a product
// @access  Public
router.post('/:id/reviews', async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    const alreadyReviewed = product.reviews.find(
      (review) => review.user.toString() === req.user?.id?.toString()
    );

    if (alreadyReviewed) {
      return res.status(400).json({ message: 'Product already reviewed' });
    }

    const review = {
      user: req.user?.id,
      name: req.user?.name,
      rating: Number(rating),
      comment,
    };

    product.reviews.push(review);
    product.numReviews = product.reviews.length;
    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length;

    await product.save();
    res.status(201).json({
      success: true,
      data: product,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   GET /api/categories
// @desc    Get all categories
// @access  Public
router.get('/categories', async (req, res) => {
  try {
    const categories = await Category.find().sort({ name: 1 });
    res.json({
      success: true,
      data: categories,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   GET /api/brands
// @desc    Get all brands
// @access  Public
router.get('/brands', async (req, res) => {
  try {
    const brands = [
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
    ];
    res.json({
      success: true,
      data: brands,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;