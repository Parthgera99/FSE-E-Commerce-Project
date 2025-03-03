import sequelize from '../config/database.js'; // Database connection
import {
    Country, State, Region, Department, Designation, Category,
    Role, User, PermissionMaster
} from './database_models.js'; // Import models

// Associations (if any)
Role.hasMany(User, { foreignKey: 'roleId', as: 'users' });

// Sync models with DB
(async () => {
    try {
        await sequelize.sync({ alter: true }); // Ensure schema matches DB
        console.log('✅ Database synced successfully');
    } catch (error) {
        console.error('❌ Database sync failed:', error);
    }
})();

// Export models for use elsewhere
export {
    sequelize,
    Country, State, Region, Department, Designation,
    Category, Role, User, PermissionMaster
};
