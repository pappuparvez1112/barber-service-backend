/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import bcrypt from 'bcrypt';
import { Secret } from 'jsonwebtoken';

import { PrismaClient } from '@prisma/client';

import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { jwtHelpers } from '../../../helpers/jwtHelpers';

const prisma = new PrismaClient();

const loginUser = async (payload: any): Promise<any> => {
  const { email, password }: { email: string; password: string } = payload;
  let isUserExist: any;
  const admin = await prisma.admin.findUnique({
    where: {
      email,
    },
  });

  const user = await prisma.user.findUnique({
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
  const PasswordMatched = await bcrypt.compare(password, isUserExist.password);
  console.log(PasswordMatched, 'password');

  if (!PasswordMatched) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Password is incorrect');
  }
  // if (isUserExist && isUserExist.password !== password) {
  //   throw new Error('Password is incorrect');
  // }
  const payloadData = {
    email: isUserExist!.email,
    role: isUserExist!.role,
    contactNo: isUserExist!.contactNo,
    fullName: isUserExist!.fullName,
  };
  //create token
  const accessToken = jwtHelpers.createToken(
    payloadData,
    process.env.JWT_SECRET as Secret,
    process.env.JWT_EXPIRES_IN as string
  );
  return { accessToken };
};
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

const refreshToken = async (token: string) => {
  if (!token) {
    throw new Error('Token is required');
  }
  const decodedToken = jwtHelpers.decodeToken(token);
  const { email, role, contactNo, fullName } = decodedToken;
  if (!email || !role || !contactNo || !fullName) {
    throw new Error('Invalid Token');
  }

  const admin = await prisma.admin.findUnique({
    where: {
      email,
    },
  });

  const user = await prisma.user.findUnique({
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
  const newAccessToken = jwtHelpers.createToken(
    payloadData,
    process.env.JWT_SECRET as Secret,
    process.env.JWT_EXPIRES_IN as string
  );
  return {
    accessToken: newAccessToken,
  };
};

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

export const AuthService = {
  loginUser,
  refreshToken,
  // refreshToken,
};
