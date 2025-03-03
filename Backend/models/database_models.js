import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database.js';

class Country extends Model {}
Country.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false }
  },
  { sequelize, modelName: 'country', tableName: 'country' } // Prevent pluralization
);

class State extends Model {}
State.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    countryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: Country, key: 'id' },
      onDelete: 'CASCADE'
    }
  },
  { sequelize, modelName: 'state', tableName: 'state' }
);

class Region extends Model {}
Region.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    stateId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: State, key: 'id' },
      onDelete: 'CASCADE'
    }
  },
  { sequelize, modelName: 'region', tableName: 'region' }
);

class Department extends Model {}
Department.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false }
  },
  { sequelize, modelName: 'department', tableName: 'department' }
);

class Designation extends Model {}
Designation.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false }
  },
  { sequelize, modelName: 'designation', tableName: 'designation' }
);

class Category extends Model {}
Category.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false }
  },
  { sequelize, modelName: 'category', tableName: 'category' }
);

class Role extends Model {}
Role.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false }
  },
  { sequelize, modelName: 'role', tableName: 'role' }
);

class User extends Model {}
User.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    username: { type: DataTypes.STRING, allowNull: false, unique: true },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
    roleId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: Role, key: 'id' },
      onDelete: 'CASCADE'
    }
  },
  { sequelize, modelName: 'user', tableName: 'user' }
);

class PermissionMaster extends Model {}
PermissionMaster.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false }
  },
  { sequelize, modelName: 'permission_master', tableName: 'permission_master' }
);

// Define Relationships
Country.hasMany(State, { foreignKey: 'countryId', onDelete: 'CASCADE' });
State.belongsTo(Country, { foreignKey: 'countryId' });

State.hasMany(Region, { foreignKey: 'stateId', onDelete: 'CASCADE' });
Region.belongsTo(State, { foreignKey: 'stateId' });

Role.hasMany(User, { foreignKey: 'roleId', as: 'roleUsers', onDelete: 'CASCADE' });
User.belongsTo(Role, { foreignKey: 'roleId', as: 'role' });

// Export all models
export { Country, State, Region, Department, Designation, Category, Role, User, PermissionMaster };
