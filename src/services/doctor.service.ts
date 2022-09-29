import { FindManyDoctorArgs } from "../dto/find-many-doctor.args";
import * as doctorRepository from "../repositories/doctor.repository";

/**
 * find many doctor
 *
 * @param param0 FindManyDoctorArgs
 * @returns Promise<Doctor[]>
 */
export const findManyDoctor = async ({ take, skip }: FindManyDoctorArgs) => {
  return await doctorRepository.findManyDoctor({ take, skip });
};
