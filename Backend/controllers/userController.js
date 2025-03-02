import { User } from '../models/database_models.js';

// ✅ Get all users (Only for Admins)
export const getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll({
            attributes: ['id', 'username', 'email', 'roleId']
        });
        res.status(200).json(users);
    } catch (error) {
        console.error('🔥 Error fetching users:', error);
        res.status(500).json({ message: 'Error fetching users', error });
    }
};

// ✅ Get user by ID
export const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findByPk(id, {
            attributes: ['id', 'username', 'email', 'roleId']
        });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(user);
    } catch (error) {
        console.error('🔥 Error fetching user:', error);
        res.status(500).json({ message: 'Error fetching user', error });
    }
};
