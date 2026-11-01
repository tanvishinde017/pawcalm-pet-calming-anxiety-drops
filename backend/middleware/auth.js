const jwt = require('jsonwebtoken');
const User = require('../models/User');

const auth = async (req, res, next) => {
  try {
    const authorization = req.headers.authorization;

    if (!authorization || !authorization.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Authorization token required' });
    }

    const token = authorization.replace('Bearer ', '');
    const payload = jwt.verify(token, process.env.JWT_SECRET || 'default-secret-key');

    req.user = {
      id: payload.id,
      role: payload.role,
      name: payload.name,
    };

    const findUser = await User.findById(payload.id);
    if (!findUser) {
      return res.status(401).json({ message: 'User not found' });
    }

    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};

// Optional: Admin only middleware
const admin = async (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Admin access required' });
  }
  next();
};

module.exports = { auth, admin };