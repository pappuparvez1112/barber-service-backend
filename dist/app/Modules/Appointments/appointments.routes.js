"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.appointmentRoutes = void 0;
const express_1 = __importDefault(require("express"));
const appointments_controller_1 = require("./appointments.controller");
const router = express_1.default.Router();
router.post('/book-appointment', appointments_controller_1.appointmentController.bookAppointment);
router.patch('/cancel-appointment/:id', appointments_controller_1.appointmentController.cancelAppointment);
// router.patch('/start-appointment/:id', appointmentController.startAppointment)
// router.patch('/finish-appointment/:id', appointmentController.finishAppointment)
router.get('/', appointments_controller_1.appointmentController.getAllAppointments);
router.get('/:id', appointments_controller_1.appointmentController.getSingleAppointment);
router.patch('/:id', appointments_controller_1.appointmentController.updateAppointment);
router.delete('/:id', appointments_controller_1.appointmentController.deleteAppointment);
exports.appointmentRoutes = router;
