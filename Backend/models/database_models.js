import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database.js';

class Country extends Model {}
Country.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
  },
  { sequelize, modelName: 'country' }
);

class State extends Model {}
State.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    countryId: { type: DataTypes.INTEGER, references: { model: Country, key: 'id' } },
  },
  { sequelize, modelName: 'state' }
);

class Region extends Model {}
Region.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    stateId: { type: DataTypes.INTEGER, references: { model: State, key: 'id' } },
  },
  { sequelize, modelName: 'region' }
);

class Department extends Model {}
Department.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
  },
  { sequelize, modelName: 'department' }
);

class Designation extends Model {}
Designation.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
  },
  { sequelize, modelName: 'designation' }
);

class Category extends Model {}
Category.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
  },
  { sequelize, modelName: 'category' }
);

class Role extends Model {}
Role.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
  },
  { sequelize, modelName: 'role' }
);

class User extends Model {}
User.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    username: { type: DataTypes.STRING, allowNull: false, unique: true },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
    roleId: { type: DataTypes.INTEGER, references: { model: Role, key: 'id' } },
  },
  { sequelize, modelName: 'user' }
);

class PermissionMaster extends Model {}
PermissionMaster.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
  },
  { sequelize, modelName: 'permission_master' }
);

// Relationships
State.belongsTo(Country, { foreignKey: 'countryId' });
Region.belongsTo(State, { foreignKey: 'stateId' });
User.belongsTo(Role, { foreignKey: 'roleId' });

export { Country, State, Region, Department, Designation, Category, Role, User, PermissionMaster };
