import { Router } from "express";
import { UserControllers } from "./user.controller.js";
import { validateRequest } from "../../middlewares/validateRequest.js";
import {
  createUserZodValidation,
  updateUserZodValidation,
} from "./user.validation.js";
import { Role } from "./user.interface.js";
import { checkAuth } from "../../middlewares/checkAuth.js";

const router = Router();

router.post(
  "/register",
  validateRequest(createUserZodValidation),
  UserControllers.createUser,
);

router.get(
  "/all-users",
  checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
  UserControllers.getAllUsers,
);

router.patch(
  "/:id",
  checkAuth(...Object.values(Role)),
  validateRequest(updateUserZodValidation),
  UserControllers.updateUser,
);

export const UserRoutes = router;
