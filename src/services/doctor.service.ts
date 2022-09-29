import { NotFound } from "http-errors";
import { UpdateDoctorInput } from "src/dto/update-doctor.input";
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

export const findDoctorBydId = async (id: string) => {
  return await doctorRepository.findById(id);
};

export const findDoctorBydIdOrFail = async (id: string) => {
  const doctor = await findDoctorBydId(id);

  if (!doctor) throw new NotFound(`Doctor not found with id ${id}`);

  return doctor;
};

export const updateDoctor = async (id: string, { name }: UpdateDoctorInput) => {
  return await doctorRepository.update(id, { name });
};

export const deleteDoctorById = async (id: string) => {
  return await doctorRepository.deleteById(id);
};
