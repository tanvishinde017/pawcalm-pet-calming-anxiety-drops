const mongoose = require('mongoose');
const CartItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  packSize: {
    type: String,
  },
  price: {
    type: Number,
    required: true,
  },
  mrp: {
    type: Number,
  },
  discount: {
    type: Number,
    default: 0,
  },
  quantity: {
    type: Number,
    required: true,
    min: [1, 'Quantity must be at least 1'],
    default: 1,
  },
  total: {
    type: Number,
    required: true,
  },
}, { timestamps: true });

const CartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  items: [CartItemSchema],
  total: {
    type: Number,
    default: 0,
  },
  totalItems: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Index for faster queries
CartSchema.index({ user: 1 });

// Method to add item to cart
CartSchema.methods.addItem = async function (productData) {
  const { productId, name, image, packSize, price, mrp } = productData;

  // Check if item already exists in cart
  const existingItemIndex = this.items.findIndex(
    (item) => item.product.toString() === productId
  );

  if (existingItemIndex >= 0) {
    const existingItem = this.items[existingItemIndex];
    // Update quantity if product same
    existingItem.quantity += 1;
    existingItem.total = existingItem.price * existingItem.quantity;
    this.items[existingItemIndex] = existingItem;
  } else {
    // Add new item
    const newItem = {
      product: productId,
      name,
      image,
      packSize,
      price,
      mrp,
      discount: productData.discount || 0,
      quantity: 1,
      total: price,
    };
    this.items.push(newItem);
  }

  // Recalculate totals
  this.totalItems = this.items.reduce((sum, item) => sum + item.quantity, 0);
  this.total = this.items.reduce((sum, item) => sum + item.total, 0);
  await this.save();
  return this;
};

// Method to update item quantity
CartSchema.methods.updateQty = async function (productId, newQty) {
  const itemIndex = this.items.findIndex(
    (item) => item.product.toString() === productId
  );

  if (itemIndex >= 0) {
    const item = this.items[itemIndex];
    if (newQty >= 1) {
      item.quantity = newQty;
      item.total = item.price * newQty;
      this.items[itemIndex] = item;
    } else {
      // Remove item if quantity would be 0 or less
      this.items.splice(itemIndex, 1);
    }
  }

  // Recalculate totals
  this.totalItems = this.items.reduce((sum, item) => sum + item.quantity, 0);
  this.total = this.items.reduce((sum, item) => sum + item.total, 0);
  await this.save();
  return this;
};

// Method to remove item from cart
CartSchema.methods.removeItem = async function (productId) {
  const itemIndex = this.items.findIndex(
    (item) => item.product.toString() === productId
  );

  if (itemIndex >= 0) {
    this.items.splice(itemIndex, 1);
  }

  // Recalculate totals
  this.totalItems = this.items.reduce((sum, item) => sum + item.quantity, 0);
  this.total = this.items.reduce((sum, item) => sum + item.total, 0);
  await this.save();
  return this;
};

const Cart = mongoose.model('Cart', CartSchema);

module.exports = Cart;