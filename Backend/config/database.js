import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
import Category from './category.js';
import Country from './country.js';
import Department from './department.js';
import Designation from './designation.js';
import Region from './region.js';
import Role from './role.js';
import State from './state.js';
import User from './user.js';

dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    logging: false, // Set to true for debugging queries
  }
);

(async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Database connected successfully!');
  } catch (error) {
    console.error('❌ Unable to connect to the database:', error);
  }
})();

export default sequelize;
const models = { Category, Country, Department, Designation, Region, Role, State, User };

export { sequelize, Category, Country, Department, Designation, Region, Role, State, User };