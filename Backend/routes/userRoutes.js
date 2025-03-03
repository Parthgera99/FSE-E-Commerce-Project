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

import express from 'express';
import { getAllUsers, getUserById } from '../controllers/userController.js';
import { authenticateUser, authorizeRoles } from '../middleware/authMiddleware.js';

const router = express.Router();

// 🔒 Only Admins Can Access This
router.get('/', authenticateUser, authorizeRoles('Admin'), getAllUsers);

// 🔒 Users Can View Their Own Profile, Admins Can View Any User
router.get('/:id', authenticateUser, getUserById);

// ✅ FIXED: Now using role names instead of role IDs
router.get('/admin', authenticateUser, authorizeRoles('Admin'), getAllUsers);
router.get('/customer', authenticateUser, authorizeRoles('Customer'), getAllUsers);

export default router;
