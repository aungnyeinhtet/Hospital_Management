import { Router } from "express";
import * as hospitalController from "../controllers/hospital.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { routeMiddleware } from "../middlewares/route.middleware";

const router = Router();

/**
 * this endpoint will return a list of hospital
 *
 * @method GET
 */
router.get("/", routeMiddleware(hospitalController.findMany));

/**
 * this endpoint will create new hospital and return it
 *
 * @method POST
 */
router.post("/", authMiddleware, routeMiddleware(hospitalController.create));

/**
 * this endpoint will return hospital from given id
 *
 * @method GET
 */
router.get("/:id", routeMiddleware(hospitalController.findById));

/**
 * this endpoint will handle to update hospital from given id
 *
 * @method PATCH
 */
router.patch(
  "/:id",
  authMiddleware,
  routeMiddleware(hospitalController.update),
);

/**
 * this endpoint will handle to delete hospital
 *
 * @method DELETE
 */
router.delete(
  "/:id",
  authMiddleware,
  routeMiddleware(hospitalController.deleteById),
);

export default router;
