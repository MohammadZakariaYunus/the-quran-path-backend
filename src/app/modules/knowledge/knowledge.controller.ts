import type { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync.js";
import { KnowledgeServices } from "./knowledge.service.js";
import { sendResponse } from "../../utils/sendResponse.js";
import { StatusCodes } from "http-status-codes";

const createKnowledge = catchAsync(async (req: Request, res: Response) => {
  const result = await KnowledgeServices.createKnowledge(req.body);
  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: "Knowledge created successfully",
    data: result,
  });
});

const getAllKnowledge = catchAsync(async (req: Request, res: Response) => {
  const result = await KnowledgeServices.getAllKnowledge(req.query);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Knowledge retrieved successfully",
    data: result,
  });
});

const getSingleKnowledge = catchAsync(async (req: Request, res: Response) => {
  const result = await KnowledgeServices.getSingleKnowledge(
    req.params.slug as string,
  );
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Knowledge retrieved successfully",
    data: result,
  });
});

const updateKnowledge = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await KnowledgeServices.updateKnowledge(
    id as string,
    req.body,
  );
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Knowledge updated successfully",
    data: result,
  });
});

const deleteKnowledge = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await KnowledgeServices.deleteKnowledge(id as string);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Knowledge deleted successfully",
    data: result,
  });
});

export const KnowledgeControllers = {
  createKnowledge,
  getAllKnowledge,
  getSingleKnowledge,
  updateKnowledge,
  deleteKnowledge,
};
