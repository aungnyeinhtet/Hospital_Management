import { Router } from "express";
import * as doctorController from "../controllers/doctor.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { routeMiddleware } from "../middlewares/route.middleware";

const router = Router();

/**
 * this endpoint will return a list of doctor
 *
 * @method GET
 */
router.get("/", routeMiddleware(doctorController.findMany));

/**
 * this endpoint will create new doctor and return it
 *
 * @method POST
 */
router.post("/", authMiddleware, routeMiddleware(doctorController.create));

/**
 * this endpoint will return doctor from given id
 *
 * @method GET
 */
router.get("/:id", routeMiddleware(doctorController.findById));

/**
 * this endpoint will handle to update doctor from given id
 *
 * @method PATCH
 */
router.patch("/:id", routeMiddleware(doctorController.update));

/**
 * this endpoint will handle to delete doctor
 *
 * @method DELETE
 */
router.delete("/:id", routeMiddleware(doctorController.deleteById));

export default router;
