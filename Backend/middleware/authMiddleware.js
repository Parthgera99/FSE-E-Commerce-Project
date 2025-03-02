
import jwt from 'jsonwebtoken';
import { User } from '../models/database_models.js';
import dotenv from 'dotenv';

dotenv.config();

// ✅ Middleware to Verify JWT Token
export const authenticateUser = async (req, res, next) => {
  try {
      const authHeader = req.headers.authorization;
      
      // ✅ Check if token is provided
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
          return res.status(401).json({ message: 'No token provided' });
      }

      // ✅ Extract token from Bearer
      const token = authHeader.split(' ')[1];

      // ✅ Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findByPk(decoded.id, {
          attributes: ['id', 'username', 'email', 'roleId']
      });

      if (!req.user) {
          return res.status(401).json({ message: 'User not found' });
      }

      next();
  } catch (error) {
      console.error('🔥 Authentication Error:', error);
      return res.status(401).json({ message: 'Invalid Token' });
  }
};

// ✅ Middleware for Role-Based Authorization
export const authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Forbidden! Insufficient permissions' });
    }
    next();
  };
};
