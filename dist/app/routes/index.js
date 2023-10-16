"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const admins_routes_1 = require("../Modules/Admins/admins.routes");
const services_routes_1 = require("../Modules/Services/services.routes");
const user_route_1 = require("../Modules/User/user.route");
const category_route_1 = require("../Modules/category/category.route");
const appointments_routes_1 = require("../Modules/Appointments/appointments.routes");
const review_route_1 = require("../Modules/reviews/review.route");
const auth_route_1 = require("./../Modules/auth/auth.route");
const router = express_1.default.Router();
const moduleRoutes = [
    // ... routes
    {
        path: '/auth',
        routes: auth_route_1.AuthRoutes,
    },
    {
        path: '/users',
        routes: user_route_1.UserRoutes,
    },
    {
        path: '/admins',
        routes: admins_routes_1.adminRoutes,
    },
    {
        path: '/categories',
        routes: category_route_1.categoryRoutes,
    },
    {
        path: '/appointments',
        routes: appointments_routes_1.appointmentRoutes,
    },
    {
        path: '/services',
        routes: services_routes_1.serviceRoutes,
    },
    {
        path: '/reviews',
        routes: review_route_1.ReviewAndRatingRoutes,
    },
];
moduleRoutes.forEach(route => router.use(route.path, route.routes));
exports.default = router;
