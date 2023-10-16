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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const auth_service_1 = require("./auth.service");
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
const loginUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const loginData = __rest(req.body, []);
        const result = yield auth_service_1.AuthService.loginUser(loginData);
        res.send({
            statusCode: 200,
            success: true,
            message: 'User logged in successfully',
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
const refreshToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.headers.authorization;
        const result = yield auth_service_1.AuthService.refreshToken(token);
        res.send({
            statusCode: 200,
            success: true,
            message: 'Token refresh successfully',
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
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
exports.AuthController = {
    loginUser,
    refreshToken,
    // refreshToken,
};
