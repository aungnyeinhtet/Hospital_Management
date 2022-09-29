import { Router } from "express";
import { findManySpecialistArgsSchema } from "../dto/find-many-specialist.args";
import { routeMiddleware } from "../middlewares/route.middleware";
import { HttpStatus } from "../nsw/types/http-status";
import * as specialistService from "../services/specialist.service";
import { validate } from "../utils/validate";

const router = Router();

router.get(
  "/",
  routeMiddleware(async (req, res) => {
    const { take, skip } = await validate(
      req.query,
      findManySpecialistArgsSchema,
    );

    const specialists = await specialistService.findMany({ take, skip });

    res.status(HttpStatus.OK).json({
      data: specialists,
    });
  }),
);

router.get(
  "/:id",
  routeMiddleware(async (req, res) => {
    // TODO get details of specialist with doctors
  }),
);

export default router;
