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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.appointmentServices = void 0;
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const bookAppointment = (userId, serviceId, appointmentDate) => __awaiter(void 0, void 0, void 0, function* () {
    //checking if the available service exist
    const availableService = yield prisma_1.default.service.findUnique({
        where: {
            id: serviceId,
        },
    });
    if (!availableService) {
        throw new Error('This service is not available');
    }
    const booking = yield prisma_1.default.$transaction((transactionClient) => __awaiter(void 0, void 0, void 0, function* () {
        const appointment = yield transactionClient.appointment.create({
            data: {
                appointmentDate,
                userId,
                serviceId,
                status: 'pending',
            },
        });
        // if (appointment.serviceId) {
        //   throw new Error('This service is Already Booked');
        // }else{
        // }
        return {
            appointment: appointment,
        };
    }));
    return booking;
});
const cancelAppointment = (appointmentId) => __awaiter(void 0, void 0, void 0, function* () {
    const appointment = yield prisma_1.default.appointment.findUnique({
        where: {
            id: appointmentId,
        },
    });
    if (!appointment) {
        throw new Error('Appointment does not exist');
    }
    if (appointment.status === 'booked') {
        throw new Error('Appointment has already been cancelled');
    }
    if (appointment.status === 'finished') {
        throw new Error('Appointment has already been completed');
    }
    const cancelledAppointment = yield prisma_1.default.$transaction((transactionClient) => __awaiter(void 0, void 0, void 0, function* () {
        const appointmentToCancel = yield transactionClient.appointment.update({
            where: {
                id: appointmentId,
            },
            data: {
                status: 'cancelled',
            },
        });
        // const availableService = await transactionClient.service.findUnique({
        //     where: {
        //         id: appointment.serviceId
        //     }
        // })
        // await transactionClient.service.update({
        //     where: {
        //         id: appointment.serviceId
        //     },
        //     data: {
        //         availableSeats: {
        //             increment: 1
        //         },
        //         isBooked: availableService && availableService.availableSeats + 1 > 0 ? false : true
        //     }
        // })
        return {
            appointment: appointmentToCancel,
        };
    }));
    return cancelledAppointment;
});
// const startAppointment = async (appointmentId: string): Promise<any> => {
//     const appointment = await prisma.appointment.findUnique({
//         where: {
//             id: appointmentId
//         }
//     })
//     if (!appointment) {
//         throw new Error("Appointment does not exist")
//     }
//     if (appointment.status === "cancelled") {
//         throw new Error("Appointment has already been cancelled")
//     }
//     if (appointment.status === "finished") {
//         throw new Error("Appointment has already been completed")
//     }
//     const startedAppointment = await prisma.$transaction(async transactionClient => {
//         await transactionClient.payment.update({
//             where: {
//                 appointmentId
//             },
//             data: {
//                 paymentStatus: 'paid',
//                 paymentDate: new Date().toISOString()
//             }
//         })
//         const appointmentToStart = await transactionClient.appointment.update({
//             where: {
//                 id: appointmentId
//             },
//             data: {
//                 status: "started"
//             }
//         })
//         if (!appointmentToStart) {
//             await transactionClient.payment.update({
//                 where: {
//                     appointmentId
//                 },
//                 data: {
//                     paymentStatus: "refund"
//                 }
//             })
//         }
//         return appointmentToStart
//     })
//     return startedAppointment
// }
// const finishAppointment = async (appointmentId: string): Promise<any> => {
//     const appointment = await prisma.appointment.findUnique({
//         where: {
//             id: appointmentId
//         }
//     })
//     if (!appointment) {
//         throw new Error("Appointment does not exist")
//     }
//     if (appointment.status === "cancelled") {
//         throw new Error("Appointment has already been cancelled")
//     }
//     if (appointment.status === "finished") {
//         throw new Error("Appointment has already been completed")
//     }
//     const appointmentToFinish = await prisma.appointment.update({
//         where: {
//             id: appointmentId
//         },
//         data: {
//             status: "finished"
//         }
//     })
//     return appointmentToFinish
// }
const getAllAppointments = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.appointment.findMany();
    const total = yield prisma_1.default.appointment.count();
    return {
        meta: {
            total,
        },
        data: result,
    };
});
const getSingleAppointment = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.appointment.findUnique({
        where: {
            id: id,
        },
    });
    return result;
});
const updateAppointment = (id, appointment) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.appointment.update({
        where: {
            id: id,
        },
        data: appointment,
    });
    return result;
});
const deleteAppointment = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.appointment.delete({
        where: {
            id: id,
        },
    });
    return result;
});
exports.appointmentServices = {
    bookAppointment,
    cancelAppointment,
    // startAppointment,
    // finishAppointment,
    getAllAppointments,
    getSingleAppointment,
    updateAppointment,
    deleteAppointment,
};
