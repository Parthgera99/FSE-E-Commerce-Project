
// import jwt from 'jsonwebtoken';
// import { User } from '../models/database_models.js';
// import dotenv from 'dotenv';

// dotenv.config();

// // ✅ Middleware to Verify JWT Token
// export const authenticateUser = async (req, res, next) => {
//   try {
//       const authHeader = req.headers.authorization;
      
//       // ✅ Check if token is provided
//       if (!authHeader || !authHeader.startsWith('Bearer ')) {
//           return res.status(401).json({ message: 'No token provided' });
//       }

//       // ✅ Extract token from Bearer
//       const token = authHeader.split(' ')[1];

//       // ✅ Verify token
//       // const decoded = jwt.verify(token, process.env.JWT_SECRET);
//       // req.user = await User.findOne(decoded.id, {
//       //     attributes: ['id', 'username', 'email', 'roleId']
//       // });

//       const decoded = jwt.verify(token, process.env.JWT_SECRET);

// req.user = await User.findOne({
//     where: { id: decoded.id }, // ✅ Correct way to use findOne
//     attributes: ['id', 'username', 'email', 'roleId']
// });

//       if (!req.user) {
//           return res.status(401).json({ message: 'User not found' });
//       }

//       next();
//   } catch (error) {
//       console.error('🔥 Authentication Error:', error);
//       return res.status(401).json({ message: 'Invalid Token' });
//   }
// };

// // ✅ Middleware for Role-Based Authorization
// export const authorizeRoles = (...allowedRoles) => {
//   return (req, res, next) => {
//     console.log("🔐 Checking role-based access. Allowed roles:", allowedRoles);
//     console.log("👤 User's roleId:", req.user?.roleId);

//     if (!req.user || !allowedRoles.includes(req.user.roleId)) {
//       return res.status(403).json({ message: 'Forbidden! Insufficient permissions' });
//     }
    
//     next();
//   };
// };


import jwt from 'jsonwebtoken';
import { User, Role } from '../models/database_models.js';
import dotenv from 'dotenv';

dotenv.config();

// ✅ Middleware to Verify JWT Token
export const authenticateUser = async (req, res, next) => {
  try {
      const authHeader = req.headers.authorization;

      if (!authHeader || !authHeader.startsWith('Bearer ')) {
          return res.status(401).json({ message: 'No token provided' });
      }

      const token = authHeader.split(' ')[1];

      // ✅ Verify token
      let decoded;
      try {
          decoded = jwt.verify(token, process.env.JWT_SECRET);
      } catch (error) {
          console.error('🔥 JWT Verification Error:', error);
          return res.status(401).json({ message: error.name === 'TokenExpiredError' ? 'Token expired' : 'Invalid Token' });
      }

      // ✅ Fetch user from DB
      // req.user = await User.findOne({
      //     where: { id: decoded.id },
      //     attributes: ['id', 'username', 'email', 'roleId']
      // });

      req.user = await User.findOne({
        where: { id: decoded.id },
        attributes: ['id', 'username', 'email', 'roleId'],
        include: {
          model: Role,
          as: 'role',
          attributes: ['name'],
        },
      });

      if (!req.user) {
          return res.status(404).json({ message: 'User not found' });
      }

      console.log("✅ Authenticated User:", req.user.username);
      next();
  } catch (error) {
      console.error('🔥 Authentication Middleware Error:', error);
      return res.status(500).json({ message: 'Internal Server Error' });
  }
};

// ✅ Middleware for Role-Based Authorization
export const authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    console.log("🔐 Checking role-based access. Allowed roles:", allowedRoles);
    console.log("👤 User's roleId:", req.user?.roleId);

    if (!req.user || !allowedRoles.includes(req.user.role.name)) {
      return res.status(403).json({ message: 'Forbidden! Insufficient permissions' });
    }

    next();
  };
};
