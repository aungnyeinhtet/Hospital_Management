import { Router } from "express";
import * as specialistController from "../controllers/specialist.controller";
import { routeMiddleware } from "../middlewares/route.middleware";

const router = Router();

/**
 * this route return a list of record
 *
 * @middleware [routeMiddleware]
 * @method GET
 */
router.get("/", routeMiddleware(specialistController.findMany));

/**
 * this route return a sigle record from given id
 *
 * @middleware [routeMiddleware]
 * @method GET
 */
router.get(
  "/:id",
  routeMiddleware(async (req, res) => {
    // TODO get details of specialist with doctors
  }),
);

export default router;
