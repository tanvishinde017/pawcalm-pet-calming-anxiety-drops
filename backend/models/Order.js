const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  items: [
    {
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
      }, // Price at purchase time
      mrp: {
        type: Number,
      }, // MRP at purchase time
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
    },
  ],
  deliveryAddress: {
    fullName: {
      type: String,
      required: [true, 'Full name is required'],
    },
    address: {
      type: String,
      required: [true, 'Address is required'],
    },
    city: {
      type: String,
      required: [true, 'City is required'],
    },
    state: {
      type: String,
    },
    pincode: {
      type: String,
      match: [/^\d{6}$/, 'PIN code must be 6 digits'],
    },
    country: {
      type: String,
      default: 'India',
    },
  },
  subtotal: {
    type: Number,
    required: true,
  },
  shippingCharge: {
    type: Number,
    default: 0,
  },
  discount: {
    type: Number,
    default: 0,
  },
  total: {
    type: Number,
    required: true,
  },
  paymentMethod: {
    type: String,
    enum: ['cod', 'razorpay', 'upi', 'card'],
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'completed', 'failed', 'refunded'],
    default: 'pending',
  },
  orderStatus: {
    type: String,
    enum: ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled', 'return-initiated'],
    default: 'pending',
  },
  orderId: {
    type: String,
  },
  transactionId: {
    type: String,
  },
  notes: {
    type: String,
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
OrderSchema.index({ user: 1, createdAt: -1 });
OrderSchema.index({ orderStatus: 1 });

// Method to calculate totals
OrderSchema.methods.calculateTotals = function () {
  let subtotal = 0;
  
  this.items.forEach((item) => {
    subtotal += item.total;
  });
  
  this.subtotal = subtotal;
  this.shippingCharge = 0; // Will be calculated based on location
  this.discount = 0; // Applied at checkout
  this.total = subtotal + this.shippingCharge - this.discount;
  
  return this.total;
});

// Method to cancel order (if eligible)
OrderSchema.methods.cancel = async function () {
  if (this.orderStatus === 'delivered' || this.orderStatus === 'return-initiated') {
    return { success: false, message: 'Order cannot be cancelled as it has been delivered' };
  }
  
  this.orderStatus = 'cancelled';
  await this.save();
  return { success: true, message: 'Order cancelled successfully' };
});

const Order = mongoose.model('Order', OrderSchema);

module.exports = Order;