import type { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync.js";
import { sendResponse } from "../../utils/sendResponse.js";
import { StatusCodes } from "http-status-codes";
import { AuthServices } from "./auth.service.js";
import AppError from "../../errorHelpers/AppError.js";
import { setAuthCookie } from "../../utils/setCookie.js";
import type { JwtPayload } from "jsonwebtoken";
import { createUserTokens } from "../../utils/user.tokens.js";
import { envVars } from "../../config/env.js";
import type { IUser } from "../user/user.interface.js";

const credentialsLogin = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const loginInfo = await AuthServices.credentialsLogin(req.body);
    setAuthCookie(res, loginInfo);

    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: "User Logged In Successfully",
      data: loginInfo,
    });
  },
);

const getNewAccessToken = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
      throw new AppError(
        StatusCodes.BAD_REQUEST,
        "No refresh token received from cookies ",
      );
    }
    const tokenInfo = await AuthServices.getNewAccessToken(
      refreshToken as string,
    );

    setAuthCookie(res, tokenInfo);

    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: "New Access Token Retrieved Successfully",
      data: tokenInfo,
    });
  },
);

const logout = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    res.clearCookie("accessToken", {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    });

    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    });

    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: "User Logged Out Successfully",
      data: null,
    });
  },
);
const resetPassword = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const newPassword = req.body.newPassword;
    const oldPassword = req.body.oldPassword;
    const decodedToken = req.user as JwtPayload;

    await AuthServices.resetPassword(oldPassword, newPassword, decodedToken);

    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: "Password changed Successfully",
      data: null,
    });
  },
);

const googleCallbackController = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    let redirectTo = req.query.state ? (req.query.state as string) : "";
    if (redirectTo.startsWith("/")) {
      redirectTo = redirectTo.slice(1);
    }

    const user = req.user;
    if (!user) {
      throw new AppError(StatusCodes.NOT_FOUND, "User Not Found");
    }

    const tokenInfo = createUserTokens(user);
    setAuthCookie(res, tokenInfo);
    res.redirect(`${envVars.FRONTEND_URL}/${redirectTo}`);
  },
);

export const AuthControllers = {
  credentialsLogin,
  getNewAccessToken,
  logout,
  resetPassword,
  googleCallbackController,
};
