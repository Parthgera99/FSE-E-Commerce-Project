import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import Role from './role.js';

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  roleId: {
    type: DataTypes.STRING,
    references: {
      model: Role,
      key: 'id',
    },
    onDelete: 'CASCADE',
  },
}, {
  timestamps: true,
});

User.belongsTo(Role, { foreignKey: 'roleId' });

export default User;
