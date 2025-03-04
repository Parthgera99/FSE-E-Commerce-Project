// Backend/routes/masterRoutes.js
import express from 'express';
import { 
  countryController,
  stateController,
  regionController,
  departmentController,
  designationController,
  categoryController,
  roleController,
  permissionController
} from '../controllers/masterController.js';
import { authenticateUser, authorizeRoles } from '../middleware/authMiddleware.js';

const router = express.Router();

// Generic route creator
const createMasterRoutes = (path, controller) => {
  router.route(`/${path}`)
    .get(authenticateUser, authorizeRoles('Admin'), controller.getAll)
    .post(authenticateUser, authorizeRoles('Admin'), controller.create);

  router.route(`/${path}/:id`)
    .get(authenticateUser, authorizeRoles('Admin'), controller.getById)
    .put(authenticateUser, authorizeRoles('Admin'), controller.update)
    .delete(authenticateUser, authorizeRoles('Admin'), controller.delete);
};

// Create routes for all master tables
createMasterRoutes('countries', countryController);
createMasterRoutes('states', stateController);
createMasterRoutes('regions', regionController);
createMasterRoutes('departments', departmentController);
createMasterRoutes('designations', designationController);
createMasterRoutes('categories', categoryController);
createMasterRoutes('roles', roleController);
createMasterRoutes('permissions', permissionController);

export default router;