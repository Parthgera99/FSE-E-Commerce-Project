import sequelize from '../config/database.js';
import { Country, State, Region, Department, Designation, Category, Role, User, PermissionMaster } from './database_models.js';

const syncDatabase = async () => {
  try {
    await sequelize.sync({ alter: true }); // Use { force: true } to drop tables and recreate them
    console.log('✅ All models were synchronized successfully.');
  } catch (error) {
    console.error('❌ Error syncing database:', error);
  }
};

syncDatabase();

export { Country, State, Region, Department, Designation, Category, Role, User, PermissionMaster };
