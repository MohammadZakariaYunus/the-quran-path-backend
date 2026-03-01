import { Router } from "express";
import { checkAuth } from "../../middlewares/checkAuth.js";
import { Role } from "../user/user.interface.js";
import { validateRequest } from "../../middlewares/validateRequest.js";
import {
  createBlogValidationSchema,
  updateBlogValidationSchema,
} from "./blog.validation.js";
import { BlogControllers } from "./blog.controller.js";

const router = Router();
router.get("/health-check", (req, res) =>
  res.send("Blog routes are reachable!"),
);
router.post(
  "/create",
  checkAuth(Role.ADMIN, Role.SUPER_ADMIN, Role.MODERATOR),
  validateRequest(createBlogValidationSchema),
  BlogControllers.createBlog,
);

router.get("/", BlogControllers.getAllBlogs);

router.get("/:slug", BlogControllers.getSingleBlog);

router.patch(
  "/:id",
  checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
  validateRequest(updateBlogValidationSchema),
  BlogControllers.updateBlog,
);

router.delete(
  "/:id",
  checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
  BlogControllers.deleteBlog,
);

export const BlogRoutes = router;
