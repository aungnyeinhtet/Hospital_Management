import { Router } from "express";
import { createDoctorInputSchema } from "../dto/create-doctor.input";
import { findManyDoctorArgsSchema } from "../dto/find-many-doctor.args";
import { authMiddleware } from "../middlewares/auth.middleware";
import { routeMiddleware } from "../middlewares/route.middleware";
import { HttpStatus } from "../nsw/types/http-status";
import {
  createDoctor,
  findDoctorBydIdOrFail,
  findManyDoctor,
} from "../services/doctor.service";
import { validate } from "../utils/validate";

const router = Router();

/**
 * this endpoint will return a list of doctor
 *
 * @method GET
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

/**
 * this endpoint will create new doctor and return it
 *
 * @method POST
 */
router.post(
  "/",
  authMiddleware,
  routeMiddleware(async (req, res) => {
    const { name } = await validate(req.body, createDoctorInputSchema);

    const doctor = await createDoctor({ name });

    res.status(HttpStatus.CREATED).json({
      data: doctor,
    });
  }),
);

/**
 * this endpoint will return doctor from given id
 */
router.get(
  "/:id",
  routeMiddleware(async (req, res) => {
    const doctor = await findDoctorBydIdOrFail(req.params.id);

    res.status(HttpStatus.OK).json({
      data: doctor,
    });
  }),
);

/**
 * this endpoint will handle to update doctor from given id
 */
router.patch(
  "/:id",
  routeMiddleware(async (req, res) => {
    // TODO
  }),
);

/**
 * this endpoint will handle to delete doctor
 */
router.delete(
  "/:id",
  routeMiddleware(async (req, res) => {
    // TODO
  }),
);

export default router;
