import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import { ReviewAndRatingController } from './review.controller';

const router = express.Router();

router.get('/', ReviewAndRatingController.getAllFromDB);
router.get('/:id', ReviewAndRatingController.getByIdFromDB);

router.post(
  '/create-review',

  ReviewAndRatingController.insertIntoDB
);

router.patch(
  '/:id',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  ReviewAndRatingController.updateOneInDB
);

router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  ReviewAndRatingController.deleteByIdFromDB
);

export const ReviewAndRatingRoutes = router;
