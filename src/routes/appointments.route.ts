import { Router } from "express";
import * as appointmentController from "../controllers/appointment.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { routeMiddleware } from "../middlewares/route.middleware";

const router = Router();

/**
 * this route return a list of record
 *
 * @middleware [authMiddleware, routeMiddleware]
 * @method GET
 */
router.get(
  "/",
  authMiddleware,
  routeMiddleware(appointmentController.findMany),
);

/**
 * this route handle to create new record and return it back
 *
 * @middleware [authMiddleware, routeMiddleware]
 * @method POST
 */
router.post("/", authMiddleware, routeMiddleware(appointmentController.create));

/**
 * this route return single record
 *
 * @middleware [authMiddleware, routeMiddleware]
 * @method GET
 */
router.get("/:id", routeMiddleware(appointmentController.findById));

/**
 * this route handle to update record with given id
 *
 * @middleware [authMiddleware, routeMiddleware]
 * @method PATCH
 */
router.patch(
  "/:id",
  authMiddleware,
  routeMiddleware(appointmentController.update),
);

/**
 * this route handle to delete records with given id
 *
 * @middleware [authMiddleware,routeMiddleware]
 * @method DELETE
 */
router.delete(
  "/:id",
  authMiddleware,
  routeMiddleware(appointmentController.deleteById),
);

export default router;
