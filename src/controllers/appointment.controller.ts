import { Patient } from "@prisma/client";
import { Request, Response } from "express";
import { createAppointmentInputSchema } from "../dto/create-appointment.input";
import { findManyAppointmentArgsSchema } from "../dto/find-many-appointment.args";
import { updateAppointmentInputSchema } from "../dto/update-appointment.input";
import { HttpStatus } from "../nsw/types/http-status";
import * as appointmentService from "../services/appointment.service";
import * as doctorService from "../services/doctor.service";
import { validate } from "../utils/validate";

export const findMany = async (req: Request, res: Response) => {
  const authUserId = req.user as any;

  const { take, skip } = await validate(
    req.query,
    findManyAppointmentArgsSchema,
  );

  const appointments = await appointmentService.findMany({ take, skip });

  res.status(HttpStatus.OK).json({
    data: appointments,
  });
};

export const create = async (req: Request, res: Response) => {
  const { id: patientId } = req.user as Patient;

  const { consultationType, reason, from, to, doctorId } = await validate(
    req.body,
    createAppointmentInputSchema,
  );

  /**
   * check doctor with {doctorID} is exists or not
   */
  await doctorService.findBydIdOrFail(doctorId);

  const appointment = await appointmentService.create({
    consultationType,
    reason,
    from,
    to,
    patientId,
    doctorId,
  });

  res.status(HttpStatus.CREATED).json({
    data: appointment,
  });
};

export const findById = async (req: Request, res: Response) => {
  const appointment = await appointmentService.findById(req.params.id);

  res.status(HttpStatus.OK).json({
    data: appointment,
  });
};

export const update = async (req: Request, res: Response) => {
  const { name } = await validate(req.body, updateAppointmentInputSchema);

  const id = req.params.id;

  await appointmentService.findByIdOrFail(id);

  const appointment = await appointmentService.update(id, { name });

  res.status(HttpStatus.OK).json({
    data: appointment,
  });
};

export const deleteById = async (req: Request, res: Response) => {
  const id = req.params.id;

  await appointmentService.findByIdOrFail(id);

  await appointmentService.deleteById(id);

  res.status(HttpStatus.OK).json({
    message: `Appointment with id ${id} deleted successfully`,
  });
};
