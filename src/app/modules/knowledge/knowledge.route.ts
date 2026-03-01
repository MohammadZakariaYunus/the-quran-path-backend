import { Router } from "express";
import { validateRequest } from "../../middlewares/validateRequest.js";
import {
  createKnowledgeValidationSchema,
  updateKnowledgeValidationSchema,
} from "./knowledge.validation.js";
import { KnowledgeControllers } from "./knowledge.controller.js";
import { checkAuth } from "../../middlewares/checkAuth.js";
import { Role } from "../user/user.interface.js";

const router = Router();

router.post(
  "/create",
  checkAuth(Role.ADMIN, Role.SUPER_ADMIN, Role.MODERATOR),
  validateRequest(createKnowledgeValidationSchema),
  KnowledgeControllers.createKnowledge,
);

router.get("/", KnowledgeControllers.getAllKnowledge);

router.get("/:slug", KnowledgeControllers.getSingleKnowledge);

router.patch(
  "/:id",
  checkAuth(Role.ADMIN, Role.MODERATOR),
  validateRequest(updateKnowledgeValidationSchema),
  KnowledgeControllers.updateKnowledge,
);

router.delete(
  "/:id",
  checkAuth(Role.ADMIN, Role.MODERATOR),
  KnowledgeControllers.deleteKnowledge,
);

export const KnowledgeRoutes = router;
