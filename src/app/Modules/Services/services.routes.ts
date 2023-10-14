import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import { serviceController } from './services.controller';

const router = express.Router();

router.post(
  '/create-service',
  auth(ENUM_USER_ROLE.ADMIN),
  serviceController.createService
);
router.get('/', serviceController.getAllServices);
router.get('/:id', serviceController.getSingleService);
router.patch('/:id', serviceController.updateService);
router.delete('/:id', serviceController.deleteService);

export const serviceRoutes = router;
