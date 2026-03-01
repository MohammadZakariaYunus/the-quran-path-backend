import type { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { UserServices } from "./user.service.js";
import { catchAsync } from "../../utils/catchAsync.js";
import { sendResponse } from "../../utils/sendResponse.js";
import { verifyToken } from "../../utils/jwt.js";
import { envVars } from "../../config/env.js";
import type { JwtPayload } from "jsonwebtoken";

//
// Create User
//
const createUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = await UserServices.createUser(req.body);

    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.CREATED,
      message: "User Created Successfully",
      data: user,
    });
  },
);

//
// Update User
//

const updateUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.params.id as string;

    const verifiedToken = req.user as JwtPayload;
    const payload = req.body;
    const user = await UserServices.updateUser(userId, payload, verifiedToken);

    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: "User Updated Successfully",
      data: user,
    });
  },
);

//
// Get All Users
//

const getAllUsers = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await UserServices.getAllUsers();

    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: "All Users retrieved Successfully",
      data: result.data,
      meta: result.meta,
    });
  },
);

export const UserControllers = {
  createUser,
  getAllUsers,
  updateUser,
};
