import { NotFound } from "http-errors";
import { CreateHospitalInput } from "../dto/create-hospital.input";
import { FindManyHospitalArgs } from "../dto/find-many-hospital.args";
import { UpdateHospitalInput } from "../dto/update-hospital.input";
import * as hospitalRepository from "../repositories/hospital.repository";

export const findManyHospital = async ({
  take,
  skip,
}: FindManyHospitalArgs) => {
  return await hospitalRepository.findMany({ take, skip });
};

export const findHospitalById = async (id: string) => {
  return await hospitalRepository.findById(id);
};

export const findHospitalByIdOrFail = async (id: string) => {
  const hospital = await findHospitalById(id);

  if (!hospital) throw new NotFound(`Hospital not found with id ${id}`);
};

export const createHospital = async ({
  name,
  address,
}: CreateHospitalInput) => {
  return await hospitalRepository.create({ name, address });
};

export const updateHospital = async (
  id: string,
  { name }: UpdateHospitalInput,
) => {
  return await hospitalRepository.update(id, { name });
};

export const deleteHospitalById = async (id: string) => {
  return await hospitalRepository.deleteById(id);
};
