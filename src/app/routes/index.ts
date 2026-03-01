import { Router } from "express";
import { UserRoutes } from "../modules/user/user.route.js";
import { AuthRoutes } from "../modules/auth/auth.route.js";
import { CourseRoutes } from "../modules/course/course.route.js";
import { KnowledgeRoutes } from "../modules/knowledge/knowledge.route.js";
import { BlogRoutes } from "../modules/blog/blog.route.js";

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
    path: "/knowledge",
    route: KnowledgeRoutes,
  },
];

moduleRoutes.forEach((route) => {
  router.use(route.path, route.route);
});
