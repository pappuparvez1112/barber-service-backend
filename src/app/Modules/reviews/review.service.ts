import { ReviewAndRating } from '@prisma/client';
import prisma from '../../../shared/prisma';

const insertIntoDB = async (
  data: ReviewAndRating
): Promise<ReviewAndRating> => {
  const result = await prisma.reviewAndRating.create({
    data,
  });
  return result;
};

const getAllFromDB = async () => {
  const result = await prisma.reviewAndRating.findMany({
    include: {
      user: true,
      service: true,
    },
  });
  return result;
};

const getByIdFromDB = async (id: string): Promise<ReviewAndRating | null> => {
  const result = await prisma.reviewAndRating.findUnique({
    where: {
      id,
    },
  });
  return result;
};

const updateOneInDB = async (
  id: string,
  payload: Partial<ReviewAndRating>
): Promise<ReviewAndRating> => {
  const result = await prisma.reviewAndRating.update({
    where: {
      id,
    },
    data: payload,
  });
  return result;
};

const deleteByIdFromDB = async (id: string): Promise<ReviewAndRating> => {
  const result = await prisma.reviewAndRating.delete({
    where: {
      id,
    },
  });
  return result;
};

export const ReviewAndRatingService = {
  insertIntoDB,
  getAllFromDB,
  getByIdFromDB,
  updateOneInDB,
  deleteByIdFromDB,
};
