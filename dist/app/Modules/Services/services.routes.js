"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.serviceRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_1 = require("../../../enums/user");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const services_controller_1 = require("./services.controller");
const router = express_1.default.Router();
router.post('/create-service', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN), services_controller_1.serviceController.createService);
router.get('/', services_controller_1.serviceController.getAllServices);
router.get('/:id', services_controller_1.serviceController.getSingleService);
router.patch('/:id', services_controller_1.serviceController.updateService);
router.delete('/:id', services_controller_1.serviceController.deleteService);
exports.serviceRoutes = router;
