const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart');

router.get('/', auth, async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id });
    if (!cart) {
      return res.json({ items: [], total: 0, totalItems: 0 });
    }
    res.json({ items: cart.items, total: cart.total, totalItems: cart.totalItems });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/add', auth, async (req, res) => {
  try {
    const { productId } = req.body;
    
    if (!productId) {
      return res.status(400).json({ message: 'Product ID is required' });
    }
    
    // Find the product
    const Product = require('../models/Product');
    const product = await Product.findById(productId);
    
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    // Check stock
    if (!product.isAvailable || product.stock <= 0) {
      return res.status(400).json({ message: 'Product is out of stock' });
    }
    
    const cart = await Cart.findOne({ user: req.user.id });
    
    if (!cart) {
      const newCart = new Cart({
        user: req.user.id,
        items: [],
        total: 0,
        totalItems: 0,
      });
      await newCart.addItem({
        productId,
        name: product.name,
        image: product.images?.[0] || '',
        packSize: product.packSize,
        price: product.price,
        mrp: product.mrp,
        discount: product.discount || 0,
      });
      res.json({ items: newCart.items, total: newCart.total, totalItems: newCart.totalItems });
    } else {
      await cart.addItem({
        productId,
        name: product.name,
        image: product.images?.[0] || '',
        packSize: product.packSize,
        price: product.price,
        mrp: product.mrp,
        discount: product.discount || 0,
      });
      res.json({ items: cart.items, total: cart.total, totalItems: cart.totalItems });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/remove', auth, async (req, res) => {
  try {
    const { productId } = req.body;
    
    if (!productId) {
      return res.status(400).json({ message: 'Product ID is required' });
    }
    
    const cart = await Cart.findOne({ user: req.user.id });
    
    if (!cart) {
      return res.json({ items: [], total: 0, totalItems: 0 });
    }
    
    await cart.removeItem(productId);
    res.json({ items: cart.items, total: cart.total, totalItems: cart.totalItems });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/update', auth, async (req, res) => {
  try {
    const { productId, qty } = req.body;
    
    if (!productId || qty === undefined) {
      return res.status(400).json({ message: 'Product ID and quantity are required' });
    }
    
    const cart = await Cart.findOne({ user: req.user.id });
    
    if (!cart) {
      return res.json({ items: [], total: 0, totalItems: 0 });
    }
    
    await cart.updateQty(productId, qty);
    res.json({ items: cart.items, total: cart.total, totalItems: cart.totalItems });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;