import { Appointment } from "@prisma/client";
import { NotFound } from "http-errors";
import { CreateAppointmentInput } from "../dto/create-appointment.input";
import { FindManyAppointmentArgs } from "../dto/find-many-appointment.args";
import { UpdateAppointmentInput } from "../dto/update-appointment.input";
import * as appointmentRepository from "../repositories/appointment.repository";

export const findMany = async ({
  take,
  skip,
  filter,
}: FindManyAppointmentArgs) => {
  return await appointmentRepository.findMany({ take, skip, filter });
};

/**
 * find appointment by id
 *
 * @param id string
 * @returns Promise<Appointment>
 */
export const findById = async (id: string) => {
  return await appointmentRepository.findById(id);
};

/**
 * find appointment by id
 * throw error if record not found with id
 *
 * @param id string
 * @returns Promise<Appointment>
 */
export const findByIdOrFail = async (id: string): Promise<Appointment> => {
  const appointment = await findById(id);

  if (!appointment) throw new NotFound(`Appointment not found with id ${id}`);

  return appointment;
};

export const create = async ({
  consultationType,
  reason,
  from,
  to,
  tokenNumber,
  patientId,
  doctorId,
}: CreateAppointmentInput) => {
  return await appointmentRepository.create({
    consultationType,
    reason,
    from,
    to,
    tokenNumber,
    patientId,
    doctorId,
  });
};

export const update = async (
  id: string,
  { consultationType, from, to, status }: UpdateAppointmentInput,
) => {
  return await appointmentRepository.update(id, {
    consultationType,
    from,
    to,
    status,
  });
};

export const deleteById = async (id: string) => {
  return await appointmentRepository.deleteById(id);
};
