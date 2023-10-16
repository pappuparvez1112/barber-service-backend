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
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
const bcrypt_1 = __importDefault(require("bcrypt"));
const client_1 = require("@prisma/client");
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const jwtHelpers_1 = require("../../../helpers/jwtHelpers");
const prisma = new client_1.PrismaClient();
const loginUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = payload;
    let isUserExist;
    const admin = yield prisma.admin.findUnique({
        where: {
            email,
        },
    });
    const user = yield prisma.user.findUnique({
        where: {
            email,
        },
    });
    if (!admin && !user) {
        throw new Error('User does not exist');
    }
    if (admin || user) {
        isUserExist = admin || user;
    }
    const PasswordMatched = yield bcrypt_1.default.compare(password, isUserExist.password);
    console.log(PasswordMatched, 'password');
    if (!PasswordMatched) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, 'Password is incorrect');
    }
    // if (isUserExist && isUserExist.password !== password) {
    //   throw new Error('Password is incorrect');
    // }
    const payloadData = {
        email: isUserExist.email,
        role: isUserExist.role,
        contactNo: isUserExist.contactNo,
        fullName: isUserExist.fullName,
    };
    //create token
    const accessToken = jwtHelpers_1.jwtHelpers.createToken(payloadData, process.env.JWT_SECRET, process.env.JWT_EXPIRES_IN);
    return { accessToken };
});
// const loginUser = async (payload: ILoginUser): Promise<ILoginUserResponse> => {
//   const { email, password } = payload;
//   const isUserExist = await prisma.user.findUnique({
//     where: { email },
//   });
//   console.log(isUserExist, 'user');
//   if (!isUserExist) {
//     throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
//   }
//   // const PasswordMatched =await prisma.user.findUnique(password);
//   //   };
//   const PasswordMatched = await bcrypt.compare(password, isUserExist.password);
//   console.log(PasswordMatched, 'password');
//   if (!PasswordMatched) {
//     throw new ApiError(httpStatus.UNAUTHORIZED, 'Password is incorrect');
//   }
//   //create access token & refresh token
//   const { email: adminEmail, role } = isUserExist;
//   const token = jwtHelpers.createToken(
//     { adminEmail, role },
//     config.jwt.secret as Secret,
//     config.jwt.expires_in as string
//   );
//   // const refreshToken = jwtHelpers.createToken(
//   //   { adminEmail, role },
//   //   config.jwt.refresh_secret as Secret,
//   //   config.jwt.refresh_expires_in as string
//   // );
//   // console.log(accessToken, 'token');
//   return {
//     token,
//     // refreshToken,
//   };
// };
const refreshToken = (token) => __awaiter(void 0, void 0, void 0, function* () {
    if (!token) {
        throw new Error('Token is required');
    }
    const decodedToken = jwtHelpers_1.jwtHelpers.decodeToken(token);
    const { email, role, contactNo, fullName } = decodedToken;
    if (!email || !role || !contactNo || !fullName) {
        throw new Error('Invalid Token');
    }
    const admin = yield prisma.admin.findUnique({
        where: {
            email,
        },
    });
    const user = yield prisma.user.findUnique({
        where: {
            email,
        },
    });
    if (!admin && !user) {
        throw new Error('User does not exist');
    }
    const payloadData = {
        email: email,
        role: role,
        contactNo: contactNo,
        fullName: fullName,
    };
    const newAccessToken = jwtHelpers_1.jwtHelpers.createToken(payloadData, process.env.JWT_SECRET, process.env.JWT_EXPIRES_IN);
    return {
        accessToken: newAccessToken,
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
    refreshToken,
    // refreshToken,
};
