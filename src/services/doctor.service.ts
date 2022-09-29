import { CreateDoctorInput } from "../dto/create-doctor.input";
import { FindManyDoctorArgs } from "../dto/find-many-doctor.args";
import * as doctorRepository from "../repositories/doctor.repository";

/**
 * find many doctor
 *
 * @param param0 FindManyDoctorArgs
 * @returns Promise<Doctor[]>
 */
export const findManyDoctor = async ({ take, skip }: FindManyDoctorArgs) => {
  return await doctorRepository.findMany({ take, skip });
};

export const createDoctor = async ({ name }: CreateDoctorInput) => {
  return await doctorRepository.create({ name });
};
