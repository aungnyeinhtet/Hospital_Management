import { Router } from "express";
import * as doctorController from "../controllers/doctor.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { routeMiddleware } from "../middlewares/route.middleware";

const router = Router();

/**
 * this endpoint will return a list record
 *
 * @middleware [routeMiddleware]
 * @method GET
 */
router.get("/", routeMiddleware(doctorController.findMany));

/**
 * this endpoint will create new record and return it
 *
 * @middleware [authMiddleware, routeMiddleware]
 * @method POST
 */
router.post("/", authMiddleware, routeMiddleware(doctorController.create));

/**
 * this endpoint will return record from given id
 *
 * @middleware [routeMiddleware]
 * @method GET
 */
router.get("/:id", routeMiddleware(doctorController.findById));

/**
 * this endpoint will handle to update record from given id
 *
 * @middleware [authMiddleware, routeMiddleware]
 * @method PATCH
 */
router.patch("/:id", authMiddleware, routeMiddleware(doctorController.update));

/**
 * this endpoint will handle to record doctor
 *
 * @middleware [authMiddleware, routeMiddleware]
 * @method DELETE
 */
router.delete(
  "/:id",
  authMiddleware,
  routeMiddleware(doctorController.deleteById),
);

export default router;
