import express from 'express';
import { adminRoutes } from '../Modules/Admins/admins.routes';
import { serviceRoutes } from '../Modules/Services/services.routes';
import { UserRoutes } from '../Modules/User/user.route';
import { categoryRoutes } from '../Modules/category/category.route';

import { appointmentRoutes } from '../Modules/Appointments/appointments.routes';
import { AuthRoutes } from './../Modules/auth/auth.route';

const router = express.Router();

const moduleRoutes = [
  // ... routes
  {
    path: '/auth',
    routes: AuthRoutes,
  },
  {
    path: '/users',
    routes: UserRoutes,
  },
  {
    path: '/admins',
    routes: adminRoutes,
  },
  {
    path: '/categories',
    routes: categoryRoutes,
  },
  {
    path: '/appointments',
    routes: appointmentRoutes,
  },
  {
    path: '/services',
    routes: serviceRoutes,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.routes));
export default router;
