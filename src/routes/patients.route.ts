import { Router } from "express";
import * as patientController from "../controllers/patient.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { routeMiddleware } from "../middlewares/route.middleware";

const router = Router();

/**
 * this endpoint will return a list record
 *
 * @middleware [routeMiddleware]
 * @method GET
 */
router.get("/", routeMiddleware(patientController.findMany));

/**
 * this endpoint will create new record and return it
 *
 * @middleware [authMiddleware, routeMiddleware]
 * @method POST
 */
router.post("/", authMiddleware, routeMiddleware(patientController.create));

/**
 * this endpoint will return record from given id
 *
 * @middleware [routeMiddleware]
 * @method GET
 */
router.get("/:id", routeMiddleware(patientController.findById));

/**
 * this endpoint will handle to update record from given id
 *
 * @middleware [authMiddleware, routeMiddleware]
 * @method PATCH
 */
router.patch("/:id", authMiddleware, routeMiddleware(patientController.update));

/**
 * this endpoint will handle to record doctor
 *
 * @middleware [authMiddleware, routeMiddleware]
 * @method DELETE
 */
router.delete(
  "/:id",
  authMiddleware,
  routeMiddleware(patientController.deleteById),
);

export default router;
