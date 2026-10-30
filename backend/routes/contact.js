const express = require('express');
const router = express.Router();
const Enquiry = require('../models/Enquiry');

// @route   POST /api/contact
// @desc    Submit contact enquiry
// @access  Public
router.post('/', async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({ message: 'Please fill in all required fields' });
    }

    const enquiry = new Enquiry({
      name,
      email,
      phone,
      subject,
      message,
    });

    const createdEnquiry = await enquiry.save();

    res.status(201).json({
      success: true,
      data: createdEnquiry,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   GET /api/contact
// @desc    Get all enquiries (admin)
// @access  Private/Admin
router.get('/', async (req, res) => {
  try {
    const enquiries = await Enquiry.find().sort({ dateSubmitted: -1 });
    res.json({
      success: true,
      count: enquiries.length,
      data: enquiries,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   GET /api/contact/:id
// @desc    Get single enquiry by ID
// @access  Private/Admin
router.get('/:id', async (req, res) => {
  try {
    const enquiry = await Enquiry.findById(req.params.id);

    if (!enquiry) {
      return res.status(404).json({ message: 'Enquiry not found' });
    }

    res.json({
      success: true,
      data: enquiry,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;