"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_route_1 = require("../Modules/User/user.route");
const book_route_1 = require("../Modules/book/book.route");
const category_route_1 = require("../Modules/category/category.route");
const order_route_1 = require("../Modules/order/order.route");
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
        path: '/categories',
        routes: category_route_1.categoryRoutes,
    },
    {
        path: '/books',
        routes: book_route_1.bookRoutes,
    },
    {
        path: '/orders',
        routes: order_route_1.orderRoutes,
    },
];
moduleRoutes.forEach(route => router.use(route.path, route.routes));
exports.default = router;
