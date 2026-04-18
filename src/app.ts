import cors from "cors";
import express, {
  type NextFunction,
  type Request,
  type Response,
} from "express";
import { UserRoutes } from "./app/modules/user/user.route.js";
import { StatusCodes } from "http-status-codes";
import { globalErrorHandler } from "./app/middlewares/globalErrorHandler.js";
import { success } from "zod";
import notFound from "./app/middlewares/notFound.js";
import { AuthRoutes } from "./app/modules/auth/auth.route.js";
import cookieParser from "cookie-parser";
import passport from "passport";
import expressSession from "express-session";
import "./app/config/passport.js";
import { BlogRoutes } from "./app/modules/blog/blog.route.js";
import { CourseRoutes } from "./app/modules/course/course.route.js";
import { GuidanceRoutes } from "./app/modules/Guidance/guidance.route.js";

const app = express();

app.use(
  expressSession({
    secret: "your secret",
    resave: false,
    saveUninitialized: false,
  }),
);
app.use(passport.initialize());
app.use(passport.session());
app.use(cookieParser());
app.use(express.json());
app.use(cors());

app.use("/api/v1/user", UserRoutes);
app.use("/api/v1/auth", AuthRoutes);
app.use("/api/v1/course", CourseRoutes);
app.use("/api/v1/blogs", BlogRoutes);
app.use("/api/v1/guidance", GuidanceRoutes);

app.get("/", (req: Request, res: Response) => {
  res.status(StatusCodes.ACCEPTED).json({
    message: "Welcome to The Quran Path Backend",
  });
});

app.use(globalErrorHandler);

app.use(notFound);

export default app;
