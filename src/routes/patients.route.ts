import { Router } from "express";
import * as patientController from "../controllers/patient.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { routeMiddleware } from "../middlewares/route.middleware";

const router = Router();

router.get("/", routeMiddleware(patientController.findMany));

router.post("/", authMiddleware, routeMiddleware(patientController.create));

router.get("/:id", routeMiddleware(patientController.findById));

router.patch("/:id", authMiddleware, routeMiddleware(patientController.update));

router.delete(
  "/:id",
  authMiddleware,
  routeMiddleware(patientController.deleteById),
);

export default router;
