import express from 'express';
import { getAllUsers, getUserById } from '../controllers/userController.js';
import { authenticateUser, authorizeRoles } from '../middleware/authMiddleware.js';

const router = express.Router();

// 🔒 Only Admins Can Access This
router.get('/', authenticateUser, authorizeRoles('Admin'), getAllUsers);

// 🔒 Users Can View Their Own Profile, Admins Can View Any User
router.get('/:id', authenticateUser, getUserById);

export default router;
