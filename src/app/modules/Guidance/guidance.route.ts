import { Router } from "express";
import { validateRequest } from "../../middlewares/validateRequest.js";
import {
  createGuidanceValidationSchema,
  updateGuidanceValidationSchema,
} from "./guidance.validation.js";
import { GuidanceControllers } from "./guidance.controller.js";
import { checkAuth } from "../../middlewares/checkAuth.js";
import { Role } from "../user/user.interface.js";

const router = Router();

router.post(
  "/create",
  checkAuth(Role.ADMIN, Role.SUPER_ADMIN, Role.MODERATOR),
  validateRequest(createGuidanceValidationSchema),
  GuidanceControllers.createGuidance,
);

router.get("/", GuidanceControllers.getAllGuidance);

router.get("/:slug", GuidanceControllers.getSingleGuidance);

router.patch(
  "/:id",
  checkAuth(Role.ADMIN, Role.MODERATOR),
  validateRequest(updateGuidanceValidationSchema),
  GuidanceControllers.updateGuidance,
);

router.delete(
  "/:id",
  checkAuth(Role.ADMIN, Role.MODERATOR),
  GuidanceControllers.deleteGuidance,
);

export const GuidanceRoutes = router;
