const Product = require('../models/Product');
const Category = require('../models/Category');
const Order = require('../models/Order');
const User = require('../models/User');
const { auth, admin } = require('../middleware/auth');
router.get('/stats', auth, admin, async (req, res) => {
  try {
    const totalProducts = await Product.countDocuments({ isDiscontinued: false });
    const totalOrders = await Order.countDocuments();
    const pendingOrders = await Order.countDocuments({ orderStatus: 'pending' });
    const deliveredOrders = await Order.countDocuments({ orderStatus: 'delivered' });
    const lowStockProducts = await Product.countDocuments({
      isDiscontinued: false,
      stock: { $lt: 10, $gt: 0 },
    });
    const totalCustomers = await User.countDocuments({ role: 'user' });

    res.json({
      success: true,
      data: {
        totalProducts,
        totalOrders,
        pendingOrders,
        deliveredOrders,
        lowStockProducts,
        totalCustomers,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ============ Product Management ============
router.get('/', auth, admin, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    const filter = {};
    if (req.query.search) {
      filter.$or = [
        { name: { $regex: req.query.search, $options: 'i' } },
        { brand: { $regex: req.query.search, $options: 'i' } },
      ];
    }
    if (req.query.category) {
      filter.category = req.query.category;
    }

    const products = await Product.find(filter)
      .sort({ isFeatured: -1, dateCreated: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    const total = await Product.countDocuments(filter);

    res.json({
      success: true,
      data: products,
      pagination: { page, pages: Math.ceil(total / limit), total },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get single product (admin)
router.get('/:id', auth, admin, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).lean();
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json({ success: true, data: product });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create product (admin)
router.post('/', auth, admin, async (req, res) => {
  try {
    const product = new Product({
      name: req.body.name,
      slug: req.body.slug || '',
      brand: req.body.brand,
      category: req.body.category,
      price: req.body.price,
      mrp: req.body.mrp,
      discount: req.body.discount,
      packSize: req.body.packSize,
      images: req.body.images || [],
      stock: req.body.stock,
      inStock: req.body.inStock !== undefined ? req.body.inStock : true,
      specifications: req.body.specifications || {},
      description: req.body.description,
      rating: req.body.rating,
      numReviews: req.body.numReviews,
      isFeatured: req.body.isFeatured,
      isAvailable: req.body.isAvailable,
    });

    const createdProduct = await product.save();
    res.status(201).json({ success: true, data: createdProduct });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update product (admin)
router.put('/:id', auth, admin, async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        slug: req.body.slug || '',
        brand: req.body.brand,
        category: req.body.category,
        price: req.body.price,
        mrp: req.body.mrp,
        discount: req.body.discount,
        packSize: req.body.packSize,
        images: req.body.images,
        stock: req.body.stock,
        inStock: req.body.inStock,
        specifications: req.body.specifications,
        description: req.body.description,
        rating: req.body.rating,
        numReviews: req.body.numReviews,
        isFeatured: req.body.isFeatured,
        isAvailable: req.body.isAvailable,
      },
      { new: true, runValidators: true }
    );

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json({ success: true, data: product });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete or deactivate product (admin)
router.delete('/:id', auth, admin, async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { isDiscontinued: true },
      { new: true }
    );

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json({ success: true, data: product, message: 'Product deactivated' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/orders', auth, admin, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    const filter = {};
    if (req.query.status) {
      filter.orderStatus = req.query.status;
    }
    if (req.query.paymentStatus) {
      filter.paymentStatus = req.query.paymentStatus;
    }
    if (req.query.userId) {
      filter.user = req.query.userId;
    }

    const orders = await Order.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    const total = await Order.countDocuments(filter);

    res.json({
      success: true,
      data: orders,
      pagination: { page, pages: Math.ceil(total / limit), total },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
});

// Get single order (admin)
router.get('/orders/:id', auth, admin, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).lean();
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.json({ success: true, data: order });
  } catch (error) {
    res.status(500).json({ message: error.message });
});

// Admin: Update order status
router.patch('/orders/:id/status', auth, admin, async (req, res) => {
  try {
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({ message: 'Status is required' });
    }

    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    const validTransitions = {
      pending: ['confirmed', 'cancelled'],
      confirmed: ['shipped', 'cancelled'],
      shipped: ['delivered', 'cancelled'],
      delivered: [],
      cancelled: [],
    };

    const currentStatus = order.orderStatus;
    const allowed = validTransitions[currentStatus] && validTransitions[currentStatus].includes(status);

    if (!allowed) {
      return res.status(400).json({ message: 'Invalid transition from ' + currentStatus + ' to ' + status });
    }

    order.orderStatus = status;
    await order.save();

    res.json({ success: true, data: { orderStatus: order.orderStatus } });
  } catch (error) {
    res.status(500).json({ message: error.message });
});

// Admin: Cancel order
router.patch('/orders/:id/cancel', auth, admin, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    if (order.orderStatus === 'delivered') {
      return res.status(400).json({ message: 'Cannot cancel delivered order' });
    }

    order.orderStatus = 'cancelled';
    await order.save();

    res.json({ success: true, data: { orderStatus: order.orderStatus } });
  } catch (error) {
    res.status(500).json({ message: error.message });
});

// ============ Customer Management ============
});
"