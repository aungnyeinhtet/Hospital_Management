import { Router } from "express";
import { createPatientInputSchema } from "../dto/create-patient.input";
import { findManyPatientArgsSchema } from "../dto/find-many-patient.args";
import { updatePatientInputSchema } from "../dto/update-patient.input";
import { authMiddleware } from "../middlewares/auth.middleware";
import { routeMiddleware } from "../middlewares/route.middleware";
import { HttpStatus } from "../nsw/types/http-status";
import * as patientService from "../services/patient.service";
import { validate } from "../utils/validate";

const router = Router();

router.get(
  "/",
  routeMiddleware(async (req, res) => {
    const { take, skip } = await validate(req.query, findManyPatientArgsSchema);

    const patients = await patientService.findMany({ take, skip });

    res.status(HttpStatus.OK).json({
      data: patients,
    });
  }),
);

router.post(
  "/",
  authMiddleware,
  routeMiddleware(async (req, res) => {
    const { name } = await validate(req.body, createPatientInputSchema);

    const patient = await patientService.create({ name });

    res.status(HttpStatus.CREATED).json({
      data: patient,
    });
  }),
);

router.get(
  "/:id",
  routeMiddleware(async (req, res) => {
    const patient = await patientService.findById(req.params.id);

    res.status(HttpStatus.OK).json({
      data: patient,
    });
  }),
);

router.patch(
  "/:id",
  authMiddleware,
  routeMiddleware(async (req, res) => {
    const { name } = await validate(req.body, updatePatientInputSchema);

    const id = req.params.id;

    await patientService.findByIdOrFail(id);

    const patient = await patientService.update(id, { name });

    res.status(HttpStatus.OK).json({
      data: patient,
    });
  }),
);

router.delete(
  "/:id",
  authMiddleware,
  routeMiddleware(async (req, res) => {
    const id = req.params.id;

    await patientService.findByIdOrFail(id);

    await patientService.deleteById(id);

    res.status(HttpStatus.OK).json({
      message: `Patient with id ${id} deleted successfully`,
    });
  }),
);

export default router;
