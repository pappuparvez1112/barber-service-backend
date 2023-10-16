import { NextFunction, Request, Response } from 'express';
import { serviceServices } from './services.services';

const createService = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { ...serviceData } = req.body;
    const service = await serviceServices.createService(serviceData);
    res.status(200).json({
      status: 'success',
      message: 'Service created successfully',
      data: service,
    });
  } catch (error) {
    next(error);
  }
};

const getAllServices = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const {
    page = 1,
    limit = 10,
    sortBy = 'createdAt',
    sortOrder = 'asc',
    searchTerm = '',
    ...filtersData
  } = req.query;
  console.log(req.query);
  try {
    const services = await serviceServices.getAllServices(
      Number(page),
      Number(limit),
      sortBy as string,
      sortOrder as 'asc' | 'desc',
      searchTerm as string,
      filtersData as Record<string, unknown>
    );
    res.status(200).json({
      status: 'success',
      message: 'Services fetched successfully',
      meta: services.meta,
      data: services.data,
    });
  } catch (error) {
    next(error);
  }
};

// const getAllServices = async (req: Request, res: Response, next: NextFunction) => {
//     try {
//         const services = await serviceServices.getAllServices();
//         res.status(200).json({
//             status: 'success',
//             message: 'Services fetched successfully',
//             data: services.data,
//         });
//     } catch (error) {
//         next(error)
//     }
// };

const getSingleService = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const service = await serviceServices.getSingleService(id);
    res.status(200).json({
      status: 'success',
      message: 'Service fetched successfully',
      data: service,
    });
  } catch (error) {
    next(error);
  }
};

const updateService = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const { ...serviceData } = req.body;
    const service = await serviceServices.updateService(id, serviceData);
    res.status(200).json({
      status: 'success',
      message: 'Service updated successfully',
      data: service,
    });
  } catch (error) {
    next(error);
  }
};

const deleteService = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const service = await serviceServices.deleteService(id);
    res.status(200).json({
      status: 'success',
      message: 'Service deleted successfully',
      data: service,
    });
  } catch (error) {
    next(error);
  }
};

export const serviceController = {
  createService,
  getAllServices,
  getSingleService,
  updateService,
  deleteService,
};
