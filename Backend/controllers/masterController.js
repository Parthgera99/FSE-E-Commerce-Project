// Backend/controllers/masterController.js
import { 
    Country, State, Region, Department, 
    Designation, Category, Role, PermissionMaster 
  } from '../models/database_models.js';
  
  // Generic CRUD Operations
  const createEntry = (Model) => async (req, res) => {
    try {
      const entry = await Model.create(req.body);
      res.status(201).json(entry);
    } catch (error) {
      res.status(500).json({ message: `Error creating ${Model.name}`, error });
    }
  };
  
  const getAllEntries = (Model) => async (req, res) => {
    try {
      const entries = await Model.findAll();
      res.json(entries);
    } catch (error) {
      res.status(500).json({ message: `Error fetching ${Model.name}s`, error });
    }
  };
  
  const getEntryById = (Model) => async (req, res) => {
    try {
      const entry = await Model.findByPk(req.params.id);
      if (!entry) return res.status(404).json({ message: `${Model.name} not found` });
      res.json(entry);
    } catch (error) {
      res.status(500).json({ message: `Error fetching ${Model.name}`, error });
    }
  };
  
  const updateEntry = (Model) => async (req, res) => {
    try {
      const [updated] = await Model.update(req.body, {
        where: { id: req.params.id }
      });
      if (updated) {
        const updatedEntry = await Model.findByPk(req.params.id);
        return res.json(updatedEntry);
      }
      throw new Error(`${Model.name} not found`);
    } catch (error) {
      res.status(500).json({ message: `Error updating ${Model.name}`, error });
    }
  };
  
  const deleteEntry = (Model) => async (req, res) => {
    try {
      const deleted = await Model.destroy({
        where: { id: req.params.id }
      });
      if (deleted) return res.json({ message: `${Model.name} deleted` });
      throw new Error(`${Model.name} not found`);
    } catch (error) {
      res.status(500).json({ message: `Error deleting ${Model.name}`, error });
    }
  };
  
  // Export all CRUD operations for each model
  export const countryController = {
    create: createEntry(Country),
    getAll: getAllEntries(Country),
    getById: getEntryById(Country),
    update: updateEntry(Country),
    delete: deleteEntry(Country)
  };
  
  export const stateController = {
    create: createEntry(State),
    getAll: getAllEntries(State),
    getById: getEntryById(State),
    update: updateEntry(State),
    delete: deleteEntry(State)
  };
  
  export const regionController = {
    create: createEntry(Region),
    getAll: getAllEntries(Region),
    getById: getEntryById(Region),
    update: updateEntry(Region),
    delete: deleteEntry(Region)
  };
  
  export const departmentController = {
    create: createEntry(Department),
    getAll: getAllEntries(Department),
    getById: getEntryById(Department),
    update: updateEntry(Department),
    delete: deleteEntry(Department)
  };
  
  export const designationController = {
    create: createEntry(Designation),
    getAll: getAllEntries(Designation),
    getById: getEntryById(Designation),
    update: updateEntry(Designation),
    delete: deleteEntry(Designation)
  };
  
  export const categoryController = {
    create: createEntry(Category),
    getAll: getAllEntries(Category),
    getById: getEntryById(Category),
    update: updateEntry(Category),
    delete: deleteEntry(Category)
  };
  
  export const roleController = {
    create: createEntry(Role),
    getAll: getAllEntries(Role),
    getById: getEntryById(Role),
    update: updateEntry(Role),
    delete: deleteEntry(Role)
  };
  
  export const permissionController = {
    create: createEntry(PermissionMaster),
    getAll: getAllEntries(PermissionMaster),
    getById: getEntryById(PermissionMaster),
    update: updateEntry(PermissionMaster),
    delete: deleteEntry(PermissionMaster)
  };
  