import bcrypt from 'bcrypt';

import httpStatus from 'http-status';
import { Secret } from 'jsonwebtoken';

import { PrismaClient } from '@prisma/client';

import config from '../../../config';
import ApiError from '../../../errors/ApiError';
import { jwtHelpers } from '../../../helpers/jwtHelpers';
import { ILoginUser, ILoginUserResponse } from './auth.interface';

const prisma = new PrismaClient();

const loginUser = async (payload: ILoginUser): Promise<ILoginUserResponse> => {
  const { email, password } = payload;

  const isUserExist = await prisma.user.findUnique({
    where: { email },
  });
  console.log(isUserExist, 'user');
  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
  }
  // const PasswordMatched =await prisma.user.findUnique(password);
  //   };

  const PasswordMatched = await bcrypt.compare(password, isUserExist.password);
  console.log(PasswordMatched, 'password');

  if (!PasswordMatched) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Password is incorrect');
  }

  //create access token & refresh token
  const { email: adminEmail, role } = isUserExist;

  const token = jwtHelpers.createToken(
    { adminEmail, role },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

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
  // refreshToken,
};
