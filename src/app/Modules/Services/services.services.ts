/* eslint-disable @typescript-eslint/no-explicit-any */
import { Service } from '@prisma/client';
import prisma from '../../../shared/prisma';

const createService = async (service: Service): Promise<Service> => {
  const result = await prisma.service.create({
    data: service,
  });
  return result;
};

const getAllServices = async (
  page: number,
  limit: number,
  sortBy: string,
  sortOrder: 'asc' | 'desc',
  searchTerm: string,
  filtersData: Record<string, unknown>
): Promise<Service[] | any> => {
  const result = await prisma.service.findMany({
    where: {
      AND: [
        {
          OR: [
            {
              category: {
                title: {
                  contains: searchTerm,
                  mode: 'insensitive',
                },
              },
            },
          ],
        },
        {
          category: {
            title: {
              equals: filtersData.category as string,
              mode: 'insensitive',
            },
          },
        },
      ],
    },
    include: {
      category: true,
    },
    take: limit,
    skip: (page - 1) * limit,
    orderBy: {
      [sortBy]: sortOrder,
    },
  });
  const total = await prisma.service.count();
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleService = async (id: string): Promise<Service | null> => {
  const result = await prisma.service.findUnique({
    where: {
      id: id,
    },
  });
  return result;
};

const updateService = async (
  id: string,
  service: Service
): Promise<Service> => {
  const result = await prisma.service.update({
    where: {
      id: id,
    },
    data: service,
  });
  return result;
};

const deleteService = async (id: string): Promise<Service> => {
  const result = await prisma.service.delete({
    where: {
      id: id,
    },
  });
  return result;
};

export const serviceServices = {
  createService,
  getAllServices,
  getSingleService,
  updateService,
  deleteService,
};
