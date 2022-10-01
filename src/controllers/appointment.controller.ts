import { AppointmentStatus, Patient } from "@prisma/client";
import { differenceInHours } from "date-fns";
import { Request, Response } from "express";
import { createAppointmentInputSchema } from "../dto/create-appointment.input";
import { findManyAppointmentArgsSchema } from "../dto/find-many-appointment.args";
import { updateAppointmentInputSchema } from "../dto/update-appointment.input";
import { HttpStatus } from "../nsw/types/http-status";
import * as appointmentService from "../services/appointment.service";
import * as doctorService from "../services/doctor.service";
import { parseObjectId, validate } from "../utils/validation";

/**
 * find many auth user appointment
 *
 * @param req Request
 * @param res Response
 * @return Promise<void>
 */
export const findMany = async (req: Request, res: Response): Promise<void> => {
  const { id: authUserId } = req.user as Patient;

  const { take, skip } = await validate(
    req.query,
    findManyAppointmentArgsSchema,
  );

  const appointments = await appointmentService.findMany({
    take,
    skip,
    filter: {
      patientId: authUserId,
    },
  });

  res.status(HttpStatus.OK).json({
    data: appointments,
  });
};

/**
 * create new appointment
 *
 * @param req Request
 * @param res Response
 * @return Promise<void>
 */
export const create = async (req: Request, res: Response): Promise<void> => {
  const { id: patientId } = req.user as Patient;

  const { consultationType, reason, from, to, doctorId } = await validate(
    req.body,
    createAppointmentInputSchema,
  );

  /**
   * check requested doctor is avaliable on that time or not
   */
  await doctorService.checkDoctorIsAvaliableOrNot(doctorId, from, to);

  /**
   * check booking with doctor is overlapping time or not
   */
  await appointmentService.checkBookingOverlapping(doctorId, from, to);

  /**
   * check doctor with {doctorID} is exists or not
   */
  await doctorService.findBydIdOrFail(doctorId);

  /**
   * get all of doctor appointment for given date
   */
  const activeAppointments =
    await appointmentService.findManyActiveAppointmentsByDoctorId(
      doctorId,
      from,
      to,
    );

  console.log("activeAppointments", activeAppointments);

  // generate token number each day
  const tokenNumber = activeAppointments.length + 1;

  const appointment = await appointmentService.create({
    consultationType,
    reason,
    from,
    to,
    patientId,
    doctorId,
    tokenNumber,
  });

  res.status(HttpStatus.CREATED).json({
    data: appointment,
  });
};

/**
 * find appointment by id
 *
 * @param req Request
 * @param res Response
 * @return Promise<void>
 */
export const findById = async (req: Request, res: Response): Promise<void> => {
  const id = parseObjectId(req.params.id);

  const appointment = await appointmentService.findByIdOrFail(id);

  // calculate approximate from  given appointment `to` date time
  const approximateTime = differenceInHours(appointment.from, new Date());

  res.status(HttpStatus.OK).json({
    data: {
      ...appointment,
      approximateTime,
    },
  });
};

/**
 * update record by id
 *
 * @param req Request
 * @param res Response
 * @return Promise<void>
 */
export const update = async (req: Request, res: Response): Promise<void> => {
  const { consultationType, from, to } = await validate(
    req.body,
    updateAppointmentInputSchema,
  );

  const id = parseObjectId(req.params.id);

  await appointmentService.findByIdOrFail(id);

  const appointment = await appointmentService.update(id, {
    consultationType,
    from,
    to,
  });

  res.status(HttpStatus.OK).json({
    data: appointment,
  });
};

/**
 * hadle cancel appointment by id
 *
 * @param req Request
 * @param res Response
 * @return Promise<void>
 */
export const cancel = async (req: Request, res: Response) => {
  const id = parseObjectId(req.params.id);

  await appointmentService.findByIdOrFail(id);

  const appointment = await appointmentService.update(id, {
    status: AppointmentStatus.CANCELLED,
  });

  res.status(HttpStatus.OK).json({
    data: appointment,
    message: "You appointment has been cancel successfully",
  });
};

/**
 * delete appointment by id
 *
 * @param req Request
 * @param res Response
 * @return Promise<void>
 */
export const deleteById = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const id = parseObjectId(req.params.id);

  await appointmentService.findByIdOrFail(id);

  await appointmentService.deleteById(id);

  res.status(HttpStatus.OK).json({
    message: `Appointment with id ${id} deleted successfully`,
  });
};
