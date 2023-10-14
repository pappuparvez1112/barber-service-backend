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
exports.AuthService = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const http_status_1 = __importDefault(require("http-status"));
const client_1 = require("@prisma/client");
const config_1 = __importDefault(require("../../../config"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const jwtHelpers_1 = require("../../../helpers/jwtHelpers");
const prisma = new client_1.PrismaClient();
const loginUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = payload;
    const isUserExist = yield prisma.user.findUnique({
        where: { email },
    });
    console.log(isUserExist, 'user');
    if (!isUserExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'User does not exist');
    }
    // const PasswordMatched =await prisma.user.findUnique(password);
    //   };
    const PasswordMatched = yield bcrypt_1.default.compare(password, isUserExist.password);
    console.log(PasswordMatched, 'password');
    if (!PasswordMatched) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, 'Password is incorrect');
    }
    //create access token & refresh token
    const { email: adminEmail, role } = isUserExist;
    const token = jwtHelpers_1.jwtHelpers.createToken({ adminEmail, role }, config_1.default.jwt.secret, config_1.default.jwt.expires_in);
    // const refreshToken = jwtHelpers.createToken(
    //   { adminEmail, role },
    //   config.jwt.refresh_secret as Secret,
    //   config.jwt.refresh_expires_in as string
    // );
    // console.log(accessToken, 'token');
    return {
        token,
        // refreshToken,
    };
});
// const refreshToken = async (token: string): Promise<IRefreshTokenResponse> => {
//   //verify token
//   // invalid token - synchronous
//   let verifiedToken = null;
//   try {
//     verifiedToken = jwtHelpers.verifyToken(
//       token,
//       config.jwt.refresh_secret as Secret
//     );
//   } catch (err) {
//     throw new ApiError(httpStatus.FORBIDDEN, 'Invalid Refresh Token');
//   }
//   const { adminEmail } = verifiedToken;
//   // console.log(UserId, 'userId', verifiedToken);
//   // user delete hoice kintu  refresh token ase
//   // checking deleted user's refresh token
//   // const isUserExist = await UserModel.isUserExist(adminPhoneNumber);
//   // console.log(isUserExist);
//   const isUserExist = await prisma.user.findUnique(adminEmail);
//   if (!isUserExist) {
//     throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
//   }
//   //generate new token
//   const newAccessToken = jwtHelpers.createToken(
//     {
//       id: isUserExist.id,
//       role: isUserExist.role,
//     },
//     config.jwt.secret as Secret,
//     config.jwt.expires_in as string
//   );
//   return {
//     accessToken: newAccessToken,
//   };
// };
exports.AuthService = {
    loginUser,
    // refreshToken,
};
