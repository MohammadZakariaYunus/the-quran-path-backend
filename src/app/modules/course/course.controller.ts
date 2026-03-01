import type { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync.js";
import { CourseServices } from "./course.service.js";
import { sendResponse } from "../../utils/sendResponse.js";
import { StatusCodes } from "http-status-codes";

const createCourse = catchAsync(async (req: Request, res: Response) => {
  const result = await CourseServices.createCourse(req.body);
  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: "Course created successfully",
    data: result,
  });
});

const getAllCourses = catchAsync(async (req: Request, res: Response) => {
  const result = await CourseServices.getAllCourses();
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Courses retrieved successfully",
    data: result,
  });
});

const getSingleCourse = catchAsync(async (req: Request, res: Response) => {
  const result = await CourseServices.getSingleCourse(
    req.params.slug as string,
  );
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Course retrieved successfully",
    data: result,
  });
});

const updateCourse = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await CourseServices.updateCourse(id as string, req.body);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Course updated successfully",
    data: result,
  });
});

const deleteCourse = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await CourseServices.deleteCourse(id as string);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Course deleted successfully",
    data: result,
  });
});

export const CourseControllers = {
  createCourse,
  getAllCourses,
  getSingleCourse,
  updateCourse,
  deleteCourse,
};
