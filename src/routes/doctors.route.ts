import { Router } from "express";
import { createDoctorInputSchema } from "../dto/create-doctor.input";
import { findManyDoctorArgsSchema } from "../dto/find-many-doctor.args";
import { updateDoctorInputSchema } from "../dto/update-doctor.input";
import { authMiddleware } from "../middlewares/auth.middleware";
import { routeMiddleware } from "../middlewares/route.middleware";
import { HttpStatus } from "../nsw/types/http-status";
import * as doctorService from "../services/doctor.service";
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

    const doctors = await doctorService.findMany({ take, skip });

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

    const doctor = await doctorService.create({ name });

    res.status(HttpStatus.CREATED).json({
      data: doctor,
    });
  }),
);

/**
 * this endpoint will return doctor from given id
 *
 * @method GET
 */
router.get(
  "/:id",
  routeMiddleware(async (req, res) => {
    const doctor = await doctorService.findBydIdOrFail(req.params.id);

    res.status(HttpStatus.OK).json({
      data: doctor,
    });
  }),
);

/**
 * this endpoint will handle to update doctor from given id
 *
 * @method PATCH
 */
router.patch(
  "/:id",
  routeMiddleware(async (req, res) => {
    const { name } = await validate(req.body, updateDoctorInputSchema);

    const doctorId = req.params.id;

    await doctorService.findBydIdOrFail(doctorId);

    const doctor = await doctorService.update(doctorId, { name });

    res.status(HttpStatus.OK).json({
      data: doctor,
    });
  }),
);

/**
 * this endpoint will handle to delete doctor
 *
 * @method DELETE
 */
router.delete(
  "/:id",
  routeMiddleware(async (req, res) => {
    const doctorId = req.params.id;

    await doctorService.findBydIdOrFail(doctorId);

    await doctorService.deleteById(doctorId);

    res.status(HttpStatus.OK).json({
      message: `Doctor with id ${doctorId} deleted successfully`,
    });
  }),
);

export default router;
