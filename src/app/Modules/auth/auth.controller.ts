/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { NextFunction, Request, Response } from 'express';

import { AuthService } from './auth.service';

// const loginUser = catchAsync(async (req: Request, res: Response) => {
//   const { ...loginData } = req.body;
//   const result = await AuthService.loginUser(loginData);
//   console.log(result, 'result');
//   const { token } = result;
//   // console.log(refreshToken);
//   //set refreshToken into cookie
//   // const cookieOptions = {
//   //   secure: config.env === 'production' ? true : false,
//   //   httpOnly: true,
//   // };
//   // res.cookie('refreshToken', refreshToken, cookieOptions);

//   res.status(200).json({
//     success: true,
//     statusCode: 200,
//     message: 'User signin successfully!',
//     token,
//   });
// });

const loginUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { ...loginData } = req.body;
    const result = await AuthService.loginUser(loginData);
    res.send({
      statusCode: 200,
      success: true,
      message: 'User logged in successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const refreshToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization;
    const result = await AuthService.refreshToken(token!);
    res.send({
      statusCode: 200,
      success: true,
      message: 'Token refresh successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

// const refreshToken = catchAsync(async (req: Request, res: Response) => {
//   const { refreshToken } = req.cookies;
//   console.log(req.cookies);

//   const result = await AuthService.refreshToken(refreshToken);

//   //set refreshToken into cookie
//   const cookieOptions = {
//     secure: config.env === 'production' ? true : false,
//     httpOnly: true,
//   };
//   res.cookie('refreshToken', refreshToken, cookieOptions);

//   sendResponse<IRefreshTokenResponse>(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'User logged in successfully',
//     data: result,
//   });
// });

export const AuthController = {
  loginUser,
  refreshToken,
  // refreshToken,
};
