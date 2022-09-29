import { NotFound } from "http-errors";
import { CreateDoctorInput } from "../dto/create-doctor.input";
import { FindManyDoctorArgs } from "../dto/find-many-doctor.args";
import { UpdateDoctorInput } from "../dto/update-doctor.input";
import * as doctorRepository from "../repositories/doctor.repository";

/**
 * find many doctor
 *
 * @param param0 FindManyDoctorArgs
 * @returns Promise<Doctor[]>
 */
export const findMany = async ({ take, skip }: FindManyDoctorArgs) => {
  return await doctorRepository.findMany({ take, skip });
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
