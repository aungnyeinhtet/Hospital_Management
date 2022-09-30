import { NotFound } from "http-errors";
import { CreateHospitalInput } from "../dto/create-hospital.input";
import { FindManyHospitalArgs } from "../dto/find-many-hospital.args";
import { UpdateHospitalInput } from "../dto/update-hospital.input";
import * as hospitalRepository from "../repositories/hospital.repository";

export const findMany = async ({ take, skip }: FindManyHospitalArgs) => {
  return await hospitalRepository.findMany({ take, skip });
};

export const findById = async (id: string) => {
  return await hospitalRepository.findById(id);
};

export const findByIdOrFail = async (id: string) => {
  const hospital = await findById(id);

  if (!hospital) throw new NotFound(`Hospital not found with id ${id}`);

  return hospital;
};

export const create = async ({ name, address }: CreateHospitalInput) => {
  return await hospitalRepository.create({ name, address });
};

export const update = async (id: string, { name }: UpdateHospitalInput) => {
  return await hospitalRepository.update(id, { name });
};

export const deleteById = async (id: string) => {
  return await hospitalRepository.deleteById(id);
};
