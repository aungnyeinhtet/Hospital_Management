import { AppointmentStatus, Doctor } from "@prisma/client";
import { BadRequest, NotFound, UnprocessableEntity } from "http-errors";
import { MAX_SEE_PATIENT_PER_DAY } from "../config/constants";
import { CreateAppointmentInput } from "../dto/create-appointment.input";
import { CreateDoctorInput } from "../dto/create-doctor.input";
import { FindManyDoctorArgs } from "../dto/find-many-doctor.args";
import { UpdateDoctorInput } from "../dto/update-doctor.input";
import * as doctorRepository from "../repositories/doctor.repository";
import { isSameDay } from "../utils/validation";
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

export const create = async ({
  name,
  degree,
  biography,
  address,
  specialistId,
}: CreateDoctorInput) => {
  return await doctorRepository.create({
    name,
    address,
    biography,
    degree,
    specialistId,
  });
};

/**
 * find record by id
 *
 * @param id string
 * @returns Promise<Doctor>
 */
export const findBydId = async (id: string): Promise<Doctor> => {
  return await doctorRepository.findById(id);
};

/**
 * find record by id or fail
 *
 * @param id string
 * @returns Promise<Doctor>
 */
export const findBydIdOrFail = async (id: string): Promise<Doctor> => {
  const doctor = await findBydId(id);

  if (!doctor) throw new NotFound(`Doctor not found with id ${id}`);

  return doctor;
};

/**
 * check given doctor is avaliable on that time or not
 *
 * @param from Date
 * @param to Date
 */
export const checkDoctorIsAvaliableOrNot = async (
  doctorId: string,
  from: Date,
  to: Date,
) => {
  /** TODO, here we will get list of doctor avaliable time for today,
   *  for now we use hard coded value
   */
  const date = new Date();
  const fromHour = date.setUTCHours(17); // 5PM
  const toHour = date.setUTCHours(20); // 8PM

  // console.log("from", getHours(new Date(from)));
  console.log("fromHour", fromHour);
  console.log("toHour", toHour);

  // check given two date is same day or not
  if (!isSameDay(from, to))
    throw new BadRequest(
      "Sorry!, invalid appointment schedule, please make sure your from and to date is at the same day and specify allowed time",
    );

  // if (from.getHours() < fromHour || to.getHours() > toHour)
  //   throw new BadRequest(
  //     "Sorry!, this doctor is not avaliable schedule for this time, avaliable time is between  5PM - 8PM everyday",
  //   );

  await isFullOfSchedule(doctorId, { from, to });
};

/**
 * update record by id
 *
 * @param id string
 * @param param1 UpdateDoctorInput
 * @returns Promise<Doctor>
 */
export const update = async (
  id: string,
  { name, degree, biography, address, specialistId }: UpdateDoctorInput,
): Promise<Doctor> => {
  return await doctorRepository.update(id, {
    name,
    degree,
    biography,
    address,
    specialistId,
  });
};

/**
 * delete record by id
 *
 * @param id string
 * @returns Promise<Doctor>
 */
export const deleteById = async (id: string): Promise<Doctor> => {
  return await doctorRepository.deleteById(id);
};

/**
 * check doctor conflit time for given time
 *
 * @param id string
 * @param param1 CreateAppointmentInput
 * @returns Promise<any>
 */
export const isFullOfSchedule = async (
  id: string,
  { from, to }: Pick<CreateAppointmentInput, "from" | "to">,
) => {
  /**
   * find doctor active appointments, request day
   */
  const activeAppointments = await appointmentService.findMany({
    filter: {
      doctorId: id,
      status: AppointmentStatus.ACTIVE,
      from,
      to,
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
};
