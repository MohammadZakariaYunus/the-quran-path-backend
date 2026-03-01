import { Course } from "./course.model.js";
import AppError from "../../errorHelpers/AppError.js";
import { StatusCodes } from "http-status-codes";
import type { ICourse } from "./course.interface.js";

const createCourse = async (payload: ICourse) => {
  const slug = payload.title.toLowerCase().split(" ").join("-");
  const isExist = await Course.findOne({ slug });
  if (isExist) {
    throw new AppError(StatusCodes.BAD_REQUEST, "Course title already exists!");
  }
  payload.slug = slug;

  let totalLectures = 0;
  payload.modules.forEach((module) => {
    totalLectures += module.lessons.length;
  });
  payload.totalLectures = totalLectures;

  const result = await Course.create(payload);
  return result;
};

const getAllCourses = async () => {
  const result = await Course.find().populate("instructor");
  return result;
};

const getSingleCourse = async (slug: string) => {
  const result = await Course.findOne({ slug }).populate("instructor");
  if (!result) {
    throw new AppError(StatusCodes.NOT_FOUND, "Course not found!");
  }
  return result;
};

const updateCourse = async (id: string, payload: Partial<ICourse>) => {
  if (payload.title) {
    payload.slug = payload.title.toLowerCase().split(" ").join("-");
  }

  if (payload.modules) {
    let totalLectures = 0;
    payload.modules.forEach((module) => {
      totalLectures += module.lessons.length;
    });
    payload.totalLectures = totalLectures;
  }

  const result = await Course.findByIdAndUpdate(id, payload, { new: true });
  return result;
};

const deleteCourse = async (id: string) => {
  const result = await Course.findByIdAndUpdate(
    id,
    { isActive: false },
    { after: true },
  );
  return result;
};

export const CourseServices = {
  createCourse,
  getAllCourses,
  getSingleCourse,
  updateCourse,
  deleteCourse,
};
