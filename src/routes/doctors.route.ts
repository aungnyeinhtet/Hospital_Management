import { Router } from "express";
import { findManyDoctorArgsSchema } from "../dto/find-many-doctor.args";
import { routeMiddleware } from "../middlewares/route.middleware";
import { HttpStatus } from "../nsw/types/http-status";
import { findManyDoctor } from "../services/doctor.service";
import { validate } from "../utils/validate";

const router = Router();

/**
 * this endpoint will return a list of doctor
 */
router.get(
  "/",
  routeMiddleware(async (req, res) => {
    const { take, skip } = await validate(req.query, findManyDoctorArgsSchema);

    const doctors = await findManyDoctor({ take, skip });

    res.status(HttpStatus.OK).json({
      data: doctors,
    });
  }),
);

router.post(
  "/",
  routeMiddleware(async (req, res) => {
    // TODO handle to create new doctor
  }),
);

router.get(
  "/:id",
  routeMiddleware(async (req, res) => {
    // TODO return doctor from given id
  }),
);

router.patch(
  "/:id",
  routeMiddleware(async (req, res) => {
    // TODO handle to update doctor from given id
  }),
);

router.delete(
  "/:id",
  routeMiddleware(async (req, res) => {
    // TODO handle to delete doctor
  }),
);

export default router;
