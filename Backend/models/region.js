import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import Country from './country.js'; 

const Region = sequelize.define('Region', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  countryId: {
    type: DataTypes.INTEGER,
    references: {
      model: Country,
      key: 'id',
    },
    onDelete: 'CASCADE',
  },
}, {
  timestamps: true,
});

Region.belongsTo(Country, { foreignKey: 'countryId' });

export default Region;
