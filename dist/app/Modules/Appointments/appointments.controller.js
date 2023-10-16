"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.appointmentController = void 0;
const appointments_services_1 = require("./appointments.services");
const bookAppointment = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId, serviceId, appointmentDate } = req.body;
        const appointment = yield appointments_services_1.appointmentServices.bookAppointment(userId, serviceId, appointmentDate);
        res.status(200).json({
            status: 'success',
            message: 'Appointment created successfully',
            data: appointment,
        });
    }
    catch (error) {
        next(error);
    }
});
// const startAppointment = async (req: Request, res: Response, next: NextFunction) => {
//     try {
//         const { id } = req.params;
//         const appointment = await appointmentServices.startAppointment(id);
//         res.status(200).json({
//             status: 'success',
//             message: 'Appointment started successfully',
//             data: appointment
//         });
//     } catch (error) {
//         next(error)
//     }
// };
const cancelAppointment = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const appointment = yield appointments_services_1.appointmentServices.cancelAppointment(id);
        res.status(200).json({
            status: 'success',
            message: 'Appointment created successfully',
            data: appointment,
        });
    }
    catch (error) {
        next(error);
    }
});
// const finishAppointment = async (req: Request, res: Response, next: NextFunction) => {
//     try {
//         const { id } = req.params;
//         const appointment = await appointmentServices.finishAppointment(id);
//         res.status(200).json({
//             status: 'success',
//             message: 'Appointment completed successfully',
//             data: appointment
//         });
//     } catch (error) {
//         next(error)
//     }
// };
const getAllAppointments = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const appointments = yield appointments_services_1.appointmentServices.getAllAppointments();
        res.status(200).json({
            status: 'success',
            message: 'Appointments cancelled successfully',
            data: appointments.data,
        });
    }
    catch (error) {
        next(error);
    }
});
const getSingleAppointment = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const appointment = yield appointments_services_1.appointmentServices.getSingleAppointment(id);
        res.status(200).json({
            status: 'success',
            message: 'Appointment fetched successfully',
            data: appointment,
        });
    }
    catch (error) {
        next(error);
    }
});
const updateAppointment = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const appointmentData = __rest(req.body, []);
        const appointment = yield appointments_services_1.appointmentServices.updateAppointment(id, appointmentData);
        res.status(200).json({
            status: 'success',
            message: 'Appointment updated successfully',
            data: appointment,
        });
    }
    catch (error) {
        next(error);
    }
});
const deleteAppointment = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const appointment = yield appointments_services_1.appointmentServices.deleteAppointment(id);
        res.status(200).json({
            status: 'success',
            message: 'Appointment deleted successfully',
            data: appointment,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.appointmentController = {
    bookAppointment,
    // startAppointment,
    cancelAppointment,
    // finishAppointment,
    getAllAppointments,
    getSingleAppointment,
    updateAppointment,
    deleteAppointment,
};
