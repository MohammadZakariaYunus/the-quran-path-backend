import type { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { envVars } from "../config/env.js";
import AppError from "../errorHelpers/AppError.js";

export const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  let statusCode: number = StatusCodes.INTERNAL_SERVER_ERROR;
  let message: string = "Something went wrong!!!";

  if (err instanceof AppError) {
    statusCode = err.statusCode;
    message = err.message;
  } else if (err instanceof Error) {
    message = err.message;
  }

  return res.status(statusCode).json({
    success: false,
    message: message || "Something went wrong",
    error: err,
    stack: envVars.NODE_ENV === "development" ? err.stack : null,
  });
};
