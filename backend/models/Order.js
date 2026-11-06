const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
  items: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Product' },
      name: { type: String, required: true },
      price: { type: Number, required: true },
      quantity: { type: Number, required: true, default: 1 },
    },
  ],
  shippingAddress: {
    fullName: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    pincode: { type: String, required: true },
    country: { type: String, required: true },
  },
  shippingCharge: { type: Number, default: 0 },
  discount: { type: Number, default: 0 },
  tax: { type: Number, default: 0 },
  total: { type: Number, required: true },
  orderStatus: { type: String, default: 'pending' },
  paymentStatus: { type: String, default: 'pending' },
  orderDate: { type: Date, default: Date.now },
  deliveredAt: { type: Date },
}, { timestamps: true });

// Index for faster queries
OrderSchema.index({ user: 1, createdAt: -1 });
OrderSchema.index({ orderStatus: 1 });

// Method to calculate totals
OrderSchema.methods.calculateTotals = function () {
  let subtotal = 0;

  this.items.forEach((item) => {
    subtotal += item.price * item.quantity;
  });

  this.subtotal = subtotal;
  this.total = subtotal + this.shippingCharge - this.discount;
  return this.total;
};

// Method to cancel order (if eligible)
OrderSchema.methods.cancel = async function () {
  if (this.orderStatus === 'delivered' || this.orderStatus === 'return-initiated') {
    return { success: false, message: 'Order cannot be cancelled as it has been delivered' };
  }

  this.orderStatus = 'cancelled';
  await this.save();
  return { success: true, message: 'Order cancelled successfully' };
};

const Order = mongoose.model('Order', OrderSchema);

module.exports = Order;