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

export const findById = async (id: string) => {
  return await appointmentRepository.findById(id);
};

export const findByIdOrFail = async (id: string) => {
  const appointment = await findById(id);

  if (!appointment) throw new NotFound(`Appointment not found with id ${id}`);
};

export const create = async ({
  consultationType,
  reason,
  from,
  to,
  patientId,
  doctorId,
}: CreateAppointmentInput) => {
  return await appointmentRepository.create({
    consultationType,
    reason,
    from,
    to,
    patientId,
    doctorId,
  });
};

export const update = async (id: string, { name }: UpdateAppointmentInput) => {
  return await appointmentRepository.update(id, { name });
};

export const deleteById = async (id: string) => {
  return await appointmentRepository.deleteById(id);
};
