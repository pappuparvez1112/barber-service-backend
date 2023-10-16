"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewAndRatingRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_1 = require("../../../enums/user");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const review_controller_1 = require("./review.controller");
const router = express_1.default.Router();
router.get('/', review_controller_1.ReviewAndRatingController.getAllFromDB);
router.get('/:id', review_controller_1.ReviewAndRatingController.getByIdFromDB);
router.post('/create-review', review_controller_1.ReviewAndRatingController.insertIntoDB);
router.patch('/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.SUPER_ADMIN, user_1.ENUM_USER_ROLE.ADMIN), review_controller_1.ReviewAndRatingController.updateOneInDB);
router.delete('/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.SUPER_ADMIN, user_1.ENUM_USER_ROLE.ADMIN), review_controller_1.ReviewAndRatingController.deleteByIdFromDB);
exports.ReviewAndRatingRoutes = router;
