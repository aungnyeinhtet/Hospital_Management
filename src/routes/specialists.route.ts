import { Router } from "express";
import * as specialistController from "../controllers/specialist.controller";
import { routeMiddleware } from "../middlewares/route.middleware";

const router = Router();

router.get("/", routeMiddleware(specialistController.findMany));

router.get(
  "/:id",
  routeMiddleware(async (req, res) => {
    // TODO get details of specialist with doctors
  }),
);

export default router;
