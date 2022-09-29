import { Router } from "express";
import { createAppointmentInputSchema } from "../dto/create-appointment.input";
import { findManyAppointmentArgsSchema } from "../dto/find-many-appointment.args";
import { updateAppointmentInputSchema } from "../dto/update-appointment.input";
import { authMiddleware } from "../middlewares/auth.middleware";
import { routeMiddleware } from "../middlewares/route.middleware";
import { HttpStatus } from "../nsw/types/http-status";
import * as appointmentService from "../services/appointment.service";
import { validate } from "../utils/validate";

const router = Router();

router.get(
  "/",
  routeMiddleware(async (req, res) => {
    const { take, skip } = await validate(
      req.query,
      findManyAppointmentArgsSchema,
    );

    const appointments = await appointmentService.findMany({ take, skip });

    res.status(HttpStatus.OK).json({
      data: appointments,
    });
  }),
);

router.post(
  "/",
  authMiddleware,
  routeMiddleware(async (req, res) => {
    const { name } = await validate(req.body, createAppointmentInputSchema);

    const appointment = await appointmentService.create({ name });

    res.status(HttpStatus.CREATED).json({
      data: appointment,
    });
  }),
);

router.get(
  "/:id",
  routeMiddleware(async (req, res) => {
    const appointment = await appointmentService.findById(req.params.id);

    res.status(HttpStatus.OK).json({
      data: appointment,
    });
  }),
);

router.patch(
  "/:id",
  authMiddleware,
  routeMiddleware(async (req, res) => {
    const { name } = await validate(req.body, updateAppointmentInputSchema);

    const id = req.params.id;

    await appointmentService.findByIdOrFail(id);

    const appointment = await appointmentService.update(id, { name });

    res.status(HttpStatus.OK).json({
      data: appointment,
    });
  }),
);

router.delete(
  "/:id",
  authMiddleware,
  routeMiddleware(async (req, res) => {
    const id = req.params.id;

    await appointmentService.findByIdOrFail(id);

    await appointmentService.deleteById(id);

    res.status(HttpStatus.OK).json({
      message: `Appointment with id ${id} deleted successfully`,
    });
  }),
);

export default router;
