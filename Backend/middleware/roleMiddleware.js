import jwt from 'jsonwebtoken';
import { User, Role } from '../models/database_models.js';
import dotenv from 'dotenv';

dotenv.config();

/**
 * ✅ Middleware to verify JWT token
 */
// export const authenticateUser = async (req, res, next) => {
//   try {
//     const authHeader = req.headers.authorization;

//     // ✅ Check if token exists
//     if (!authHeader || !authHeader.startsWith('Bearer ')) {
//       return res.status(401).json({ message: 'No token provided' });
//     }

//     // ✅ Extract token
//     const token = authHeader.split(' ')[1];

//     // ✅ Verify token
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     const user = await User.findByPk(decoded.id, {
//       attributes: ['id', 'username', 'email', 'roleId'],
//       include: { model: Role, attributes: ['name'] },
//     });

//     if (!user) {
//       return res.status(401).json({ message: 'User not found' });
//     }

//     // ✅ Attach user info to request
//     req.user = {
//       id: user.id,
//       username: user.username,
//       email: user.email,
//       role: user.Role.name, // Fetch role name
//     };

//     next();
//   } catch (error) {
//     console.error('🔥 Authentication Error:', error);
//     return res.status(401).json({ message: 'Invalid Token' });
//   }
// };

export const authenticateUser = async (req, res, next) => {
    try {
      const authHeader = req.headers.authorization;
  
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'No token provided' });
      }
  
      const token = authHeader.split(' ')[1];
  
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findByPk(decoded.id, {
        attributes: ['id', 'username', 'email', 'roleId'],
        include: { model: Role, as: 'role', attributes: ['name'] },
      });
  
      if (!user) {
        return res.status(401).json({ message: 'User not found' });
      }
  
      // ✅ FIXED: Correct role assignment
      req.user = {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role ? user.role.name : 'User',
      };
  
      next();
    } catch (error) {
      console.error('🔥 Authentication Error:', error);
      return res.status(401).json({ message: 'Invalid Token' });
    }
  };
  

/**
 * ✅ Middleware for Role-Based Authorization
 */
// export const authorizeRoles = (...allowedRoles) => {
//   return (req, res, next) => {
//     if (!req.user || !allowedRoleIds.includes(req.user.roleId)) {
//       return res.status(403).json({ message: 'Forbidden! Insufficient permissions' });
//     }
//     next();
//   };
// };

export const authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user?.role || !allowedRoles.includes(req.user.role.name)) {
      return res.status(403).json({ message: 'Forbidden! Insufficient permissions' });
    }
    next();
  };
};
