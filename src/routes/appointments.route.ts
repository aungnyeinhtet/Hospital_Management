import { Router } from "express";
import * as appointmentController from "../controllers/appointment.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { routeMiddleware } from "../middlewares/route.middleware";

const router = Router();

/**
 * this route return a list of appointment that belong to
 */
router.get(
  "/",
  authMiddleware,
  routeMiddleware(appointmentController.findMany),
);

/**
 * this route handle to create new appointment and return it
 *
 * @middleware authMiddleware | routeMiddleware
 * @method POST
 */
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
