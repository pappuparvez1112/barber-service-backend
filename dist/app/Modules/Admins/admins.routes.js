"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_1 = require("../../../enums/user");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const admins_controller_1 = require("./admins.controller");
const router = express_1.default.Router();
router.post('/create-admin', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN), admins_controller_1.adminController.createAdmin);
router.get('/', (0, auth_1.default)(user_1.ENUM_USER_ROLE.SUPER_ADMIN, user_1.ENUM_USER_ROLE.ADMIN), admins_controller_1.adminController.getAllAdmins);
router.get('/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.SUPER_ADMIN, user_1.ENUM_USER_ROLE.ADMIN), admins_controller_1.adminController.getSingleAdmin);
router.patch('/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.SUPER_ADMIN, user_1.ENUM_USER_ROLE.ADMIN), admins_controller_1.adminController.updateAdmin);
router.delete('/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.SUPER_ADMIN), admins_controller_1.adminController.deleteAdmin);
exports.adminRoutes = router;
