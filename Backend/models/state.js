import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import Country from './country.js'; 

const State = sequelize.define('State', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
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

State.belongsTo(Country, { foreignKey: 'countryId' });

export default State;
