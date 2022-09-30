import { Router } from "express";
import * as appointmentController from "../controllers/appointment.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { routeMiddleware } from "../middlewares/route.middleware";

const router = Router();

router.get("/", routeMiddleware(appointmentController.findMany));
router.post("/", authMiddleware, routeMiddleware(appointmentController.create));
router.get("/:id", routeMiddleware(appointmentController.findById));
router.patch(
  "/:id",
  authMiddleware,
  routeMiddleware(appointmentController.update),
);

router.delete(
  "/:id",
  authMiddleware,
  routeMiddleware(appointmentController.deleteById),
);

export default router;
