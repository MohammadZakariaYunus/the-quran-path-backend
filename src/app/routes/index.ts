import { Router } from "express";
import { UserRoutes } from "../modules/user/user.route.js";
import { AuthRoutes } from "../modules/auth/auth.route.js";
import { CourseRoutes } from "../modules/course/course.route.js";
import { BlogRoutes } from "../modules/blog/blog.route.js";
import { GuidanceRoutes } from "../modules/Guidance/guidance.route.js";

const router = Router();

const moduleRoutes = [
  {
    path: "/user",
    route: UserRoutes,
  },
  {
    path: "/auth",
    route: AuthRoutes,
  },
  {
    path: "/course",
    route: CourseRoutes,
  },
  {
    path: "/blogs",
    route: BlogRoutes,
  },
  {
    path: "/guidance",
    route: GuidanceRoutes,
  },
];

moduleRoutes.forEach((route) => {
  router.use(route.path, route.route);
});
