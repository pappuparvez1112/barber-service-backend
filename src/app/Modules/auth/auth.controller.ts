import { Request, Response } from 'express';

import { AuthService } from './auth.service';

import catchAsync from '../../../shared/catchAsync';

const loginUser = catchAsync(async (req: Request, res: Response) => {
  const { ...loginData } = req.body;
  const result = await AuthService.loginUser(loginData);
  console.log(result, 'result');
  const { token } = result;
  // console.log(refreshToken);
  //set refreshToken into cookie
  // const cookieOptions = {
  //   secure: config.env === 'production' ? true : false,
  //   httpOnly: true,
  // };
  // res.cookie('refreshToken', refreshToken, cookieOptions);

  res.status(200).json({
    success: true,
    statusCode: 200,
    message: 'User signin successfully!',
    token,
  });
});

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
  // refreshToken,
};
