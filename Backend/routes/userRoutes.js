// import express from 'express';
// import { getAllUsers, getUserById } from '../controllers/userController.js';
// import { authenticateUser, authorizeRoles } from '../middleware/authMiddleware.js';

// const router = express.Router();

// // 🔒 Only Admins Can Access This
// router.get('/', authenticateUser, authorizeRoles('Admin'), getAllUsers);

// // 🔒 Users Can View Their Own Profile, Admins Can View Any User
// router.get('/:id', authenticateUser, getUserById);

// router.get('/admin', authenticateUser, authorizeRoles(1), getAllUsers);
// router.get('/customer', authenticateUser, authorizeRoles(2), getAllUsers);
// export default router;

// import express from 'express';
// import { getAllUsers, getUserById } from '../controllers/userController.js';
// import { authenticateUser, authorizeRoles } from '../middleware/authMiddleware.js';

// const router = express.Router();

// // // 🔒 Only Admins Can Access This
// // router.get('/', authenticateUser, getAllUsers);

// // // 🔒 Users Can View Their Own Profile, Admins Can View Any User
// // router.get('/:id', authenticateUser, getUserById);

// // // ✅ FIXED: Now using role names instead of role IDs
// // router.get('/admin', authenticateUser, authorizeRoles('Admin'), getAllUsers);
// // router.get('/customer', authenticateUser, authorizeRoles('Customer'), getAllUsers);
// // Only Admins can access all users
// router.get('/', authenticateUser, authorizeRoles('Admin'), getAllUsers);

// // Users can view their own profile
// router.get('/:id', authenticateUser, (req, res, next) => {
//   if (req.user.id !== parseInt(req.params.id) && req.user.role.name !== 'Admin') {
//     return res.status(403).json({ message: 'Forbidden' });
//   }
//   next();
// }, getUserById);

// export default router;
// Backend/routes/userRoutes.js
import express from 'express';
import { 
  getAllUsers, 
  getUserById 
} from '../controllers/userController.js';
import { authenticateUser, authorizeRoles } from '../middleware/authMiddleware.js';

const router = express.Router();

// 🔒 Admin-only routes
router.get(
  '/',
  authenticateUser,
  authorizeRoles('Admin'), // Now checks for role name 'Admin'
  getAllUsers
);

// 🔒 User can view own profile, Admin can view any
router.get(
  '/:id',
  authenticateUser,
  (req, res, next) => {
    // Allow access if:
    // 1. User is Admin, OR
    // 2. User is accessing their own profile
    if (req.user.role.name === 'Admin' || req.user.id === parseInt(req.params.id)) {
      return next();
    }
    res.status(403).json({ message: 'Forbidden' });
  },
  getUserById
);

export default router;
