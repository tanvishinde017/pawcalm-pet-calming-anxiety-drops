const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const auth = require('../middleware/auth');

// Create order
router.post('/', auth, async (req, res) => {
  try {
    const {
      items,
      deliveryAddress,
      subtotal,
      shippingCharge,
      discount,
      total,
      paymentMethod,
    } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ message: 'Cart is empty' });
    }

    if (!deliveryAddress) {
      return res.status(400).json({ message: 'Delivery address is required' });
    }

    const order = new Order({
      user: req.user.id,
      items,
      deliveryAddress,
      subtotal,
      shippingCharge,
      discount,
      total,
      paymentMethod: paymentMethod || 'cod',
      paymentStatus: 'pending',
      orderStatus: 'pending',
    });

    await order.calculateTotals();
    await order.save();

    res.status(201).json({
      success: true,
      data: {
        orderId: order.orderId || order._id,
        orderStatus: order.orderStatus,
        paymentStatus: order.paymentStatus,
        subtotal: order.subtotal,
        shippingCharge: order.shippingCharge,
        discount: order.discount,
        total: order.total,
        paymentMethod: order.paymentMethod,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get customer orders
router.get('/', auth, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id })
      .sort({ createdAt: -1 })
      .lean();
    res.json({
      success: true,
      data: orders,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get individual order
router.get('/:id', auth, async (req, res) => {
  try {
    const order = await Order.findOne({
      _id: req.params.id,
      user: req.user.id,
    }).lean();

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.json({
      success: true,
      data: order,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Admin: Get all orders
router.get('/', auth, admin, async (req, res) => {
  try {
    const orders = await Order.find()
      .sort({ createdAt: -1 })
      .lean();
    res.json({
      success: true,
      data: orders,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Admin: Get individual order
router.get('/admin/:id', auth, admin, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).lean();

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.json({
      success: true,
      data: order,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Admin: Update order status
router.patch('/admin/:id/status', auth, admin, async (req, res) => {
  try {
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({ message: 'Status is required' });
    }

    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Valid status transitions
    const validTransitions = {
      pending: ['confirmed', 'cancelled'],
      confirmed: ['shipped', 'cancelled'],
      shipped: ['delivered', 'cancelled'],
    };

    const currentStatus = order.orderStatus;
    const allowed = validTransitions[currentStatus] && validTransitions[currentStatus].includes(status);

    if (!allowed) {
      return res.status(400).json({ 
        message: `Invalid status transition from ${currentStatus} to ${status}` 
      });
    }

    order.orderStatus = status;
    await order.save();

    res.json({
      success: true,
      data: {
        orderStatus: order.orderStatus,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Admin: Cancel order
router.patch('/admin/:id/cancel', auth, admin, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    const result = await order.cancel();

    res.json({
      success: result.success,
      message: result.message,
      data: {
        orderStatus: order.orderStatus,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;