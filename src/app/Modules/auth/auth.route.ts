import express from 'express';

import validateRequest from '../../middlewares/validateRequest';
import { UserController } from '../User/user.controller';
import { UserValidation } from '../User/user.validation';
import { AuthController } from './auth.controller';
import { AuthValidation } from './auth.validation';

const router = express.Router();

router.post(
  '/signup',
  validateRequest(UserValidation.createUserZodSchema),
  UserController.createUser
);

router.post(
  '/signin',
  validateRequest(AuthValidation.createLoginZodSchema),
  AuthController.loginUser
);
router.post(
  '/refresh-token',

  AuthController.refreshToken
);

export const AuthRoutes = router;
