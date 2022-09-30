import { Router } from "express";
import * as hospitalController from "../controllers/hospital.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { routeMiddleware } from "../middlewares/route.middleware";

const router = Router();

/**
 * this endpoint will return a list of record
 *
 * @middleware [routeMiddleware]
 * @method GET
 */
router.get("/", routeMiddleware(hospitalController.findMany));

/**
 * this endpoint will create new record and return it
 *
 * @middleware [authMiddleware, routeMiddleware]
 * @method POST
 */
router.post("/", authMiddleware, routeMiddleware(hospitalController.create));

/**
 * this endpoint will return hospital from given id
 *
 * @middleware [routeMiddleware]
 * @method GET
 */
router.get("/:id", routeMiddleware(hospitalController.findById));

/**
 * this endpoint will handle to update record from given id
 *
 * @middleware [authMiddleware,routeMiddleware]
 * @method PATCH
 */
router.patch(
  "/:id",
  authMiddleware,
  routeMiddleware(hospitalController.update),
);

/**
 * this endpoint will handle to delete record by id
 *
 * @middleware [authMiddleware,routeMiddleware]
 * @method DELETE
 */
router.delete(
  "/:id",
  authMiddleware,
  routeMiddleware(hospitalController.deleteById),
);

export default router;
