import type { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { envVars } from "../config/env.js";
import AppError from "../errorHelpers/AppError.js";
import { handlerDuplicateError } from "../helpers/handleDuplicateError.js";
import { handleCastError } from "../helpers/handleCastError.js";
import { handlerZodError } from "../helpers/handlerZodError.js";
import type { TErrorSources } from "../interfaces/error.types.js";
import { handlerValidationError } from "../helpers/handlerValidationError.js";

export const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  let statusCode: number = StatusCodes.INTERNAL_SERVER_ERROR;
  let message: string = "Something went wrong!!!";
  let errorSources: TErrorSources[] = [];

  if (err.code === 11000) {
    const simplifiedError = handlerDuplicateError(err);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorSources = simplifiedError.errorSources || [];
  } else if (err.name === "CastError") {
    const simplifiedError = handleCastError(err);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorSources = simplifiedError.errorSources || [];
  } else if (err.name === "ZodError") {
    const simplifiedError = handlerZodError(err);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorSources = simplifiedError.errorSources || [];
  } else if (err.name === "ValidationError") {
    const simplifiedError = handlerValidationError(err);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorSources = simplifiedError.errorSources || [];
  } else if (err instanceof AppError) {
    statusCode = err.statusCode;
    message = err.message;
    errorSources = [{ path: "", message: err.message }];
  } else if (err instanceof Error) {
    message = err.message;
    errorSources = [{ path: "", message: err.message }];
  }

  return res.status(statusCode).json({
    success: false,
    message,
    errorSources,
    stack: envVars.NODE_ENV === "development" ? err?.stack : null,
  });
};
