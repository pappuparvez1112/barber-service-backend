/* eslint-disable @typescript-eslint/no-explicit-any */
import { Appointment } from '@prisma/client';
import prisma from '../../../shared/prisma';

const bookAppointment = async (
  userId: string,
  serviceId: string,
  appointmentDate: string
): Promise<any> => {
  //checking if the available service exist
  const availableService = await prisma.service.findUnique({
    where: {
      id: serviceId,
    },
  });

  if (!availableService) {
    throw new Error('This service is not available');
  }

  const booking = await prisma.$transaction(async transactionClient => {
    const appointment = await transactionClient.appointment.create({
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
  });

  return booking;
};

const cancelAppointment = async (appointmentId: string): Promise<any> => {
  const appointment = await prisma.appointment.findUnique({
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

  const cancelledAppointment = await prisma.$transaction(
    async transactionClient => {
      const appointmentToCancel = await transactionClient.appointment.update({
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
    }
  );

  return cancelledAppointment;
};

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

const getAllAppointments = async (): Promise<Appointment[] | any> => {
  const result = await prisma.appointment.findMany();
  const total = await prisma.appointment.count();
  return {
    meta: {
      total,
    },
    data: result,
  };
};

const getSingleAppointment = async (
  id: string
): Promise<Appointment | null> => {
  const result = await prisma.appointment.findUnique({
    where: {
      id: id,
    },
  });
  return result;
};

const updateAppointment = async (
  id: string,
  appointment: Appointment
): Promise<Appointment> => {
  const result = await prisma.appointment.update({
    where: {
      id: id,
    },
    data: appointment,
  });
  return result;
};

const deleteAppointment = async (id: string): Promise<Appointment> => {
  const result = await prisma.appointment.delete({
    where: {
      id: id,
    },
  });
  return result;
};

export const appointmentServices = {
  bookAppointment,
  cancelAppointment,
  // startAppointment,
  // finishAppointment,
  getAllAppointments,
  getSingleAppointment,
  updateAppointment,
  deleteAppointment,
};
