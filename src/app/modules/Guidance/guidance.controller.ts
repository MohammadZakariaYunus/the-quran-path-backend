import type { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync.js";
import { GuidanceServices } from "./guidance.service.js";
import { sendResponse } from "../../utils/sendResponse.js";
import { StatusCodes } from "http-status-codes";

const createGuidance = catchAsync(async (req: Request, res: Response) => {
  const result = await GuidanceServices.createGuidance(req.body);
  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: "Data created successfully",
    data: result,
  });
});

const getAllGuidance = catchAsync(async (req: Request, res: Response) => {
  const query = req.query;
  const result = await GuidanceServices.getAllGuidance(
    query as Record<string, string>,
  );
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Data retrieved successfully",
    data: result,
  });
});

const getSingleGuidance = catchAsync(async (req: Request, res: Response) => {
  const result = await GuidanceServices.getSingleGuidance(
    req.params.slug as string,
  );
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Data retrieved successfully",
    data: result,
  });
});

const updateGuidance = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await GuidanceServices.updateGuidance(id as string, req.body);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Data updated successfully",
    data: result,
  });
});

const deleteGuidance = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await GuidanceServices.deleteGuidance(id as string);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Data deleted successfully",
    data: result,
  });
});

export const GuidanceControllers = {
  createGuidance,
  getAllGuidance,
  getSingleGuidance,
  updateGuidance,
  deleteGuidance,
};
