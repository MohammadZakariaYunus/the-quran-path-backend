import { Router } from "express";
import { validateRequest } from "../../middlewares/validateRequest.js";
import { createCourseValidationSchema } from "./course.validation.js";
import { CourseControllers } from "./course.controller.js";
import { checkAuth } from "../../middlewares/checkAuth.js";
import { Role } from "../user/user.interface.js";

const router = Router();

router.post(
  "/create-course",
  checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
  validateRequest(createCourseValidationSchema),
  CourseControllers.createCourse,
);

router.get("/", CourseControllers.getAllCourses);

router.get("/:slug", CourseControllers.getSingleCourse);

router.patch(
  "/:id",
  checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
  CourseControllers.updateCourse,
);

router.delete(
  "/:id",
  checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
  CourseControllers.deleteCourse,
);

export const CourseRoutes = router;
