import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Designation = sequelize.define('Designation', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
}, {
  timestamps: true,
});

export default Designation;
