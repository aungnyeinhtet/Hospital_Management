import { AppointmentStatus } from "@prisma/client";
import { NotFound, UnprocessableEntity } from "http-errors";
import { MAX_SEE_PATIENT_PER_DAY } from "../config/constants";
import { CreateAppointmentInput } from "../dto/create-appointment.input";
import { CreateDoctorInput } from "../dto/create-doctor.input";
import { FindManyDoctorArgs } from "../dto/find-many-doctor.args";
import { UpdateDoctorInput } from "../dto/update-doctor.input";
import * as doctorRepository from "../repositories/doctor.repository";
import * as appointmentService from "./appointment.service";

/**
 * find many doctor
 *
 * @param param0 FindManyDoctorArgs
 * @returns Promise<Doctor[]>
 */
export const findMany = async ({ take, skip, filter }: FindManyDoctorArgs) => {
  return await doctorRepository.findMany({ take, skip, filter });
};

export const create = async ({ name }: CreateDoctorInput) => {
  return await doctorRepository.create({ name });
};

export const findBydId = async (id: string) => {
  return await doctorRepository.findById(id);
};

export const findBydIdOrFail = async (id: string) => {
  const doctor = await findBydId(id);

  if (!doctor) throw new NotFound(`Doctor not found with id ${id}`);

  return doctor;
};

export const update = async (id: string, { name }: UpdateDoctorInput) => {
  return await doctorRepository.update(id, { name });
};

export const deleteById = async (id: string) => {
  return await doctorRepository.deleteById(id);
};

export const checkConflitTime = async (
  id: string,
  { from, to }: Pick<CreateAppointmentInput, "from" | "to">,
) => {
  await findBydIdOrFail(id);

  /**
   * find doctor active appointments, request day
   */
  const activeAppointments = await appointmentService.findMany({
    filter: {
      doctorId: id,
      status: AppointmentStatus.ACTIVE,
    },
  });

  /**
   * check if doctor have MAX_SEE_PATIENT_PER_DAY or not
   * if yes, we throw error
   */
  if (activeAppointments.length >= MAX_SEE_PATIENT_PER_DAY)
    throw new UnprocessableEntity(
      `Sorry!. this doctor have full of schedule for today, please choose another avaliable day`,
    );

  // Loop throw all of the appointment and see confilition time

  return;
};
