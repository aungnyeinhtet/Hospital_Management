import { NotFound } from "http-errors";
import { CreatePatientInput } from "src/dto/create-patient.input";
import { FindManyPatientArgs } from "src/dto/find-many-patient.args";
import { UpdatePatientInput } from "src/dto/update-patient.input";
import * as patientRepository from "../repositories/patient.repository";

export const findMany = async ({ take, skip }: FindManyPatientArgs) => {
  return await patientRepository.findMany({ take, skip });
};

export const findById = async (id: string) => {
  return await patientRepository.findById(id);
};

export const findByIdOrFail = async (id: string) => {
  const patient = await findById(id);

  if (!patient) throw new NotFound(`Patient not found with id ${id}`);

  return patient;
};

export const findByPhone = async (phone: string) => {
  return await patientRepository.findByPhone(phone);
};

export const findByPhoneOrFail = async (phone: string) => {
  const patient = await findByPhone(phone);

  if (!patient) throw new NotFound(`Patient not found with phone ${phone}`);

  return patient;
};

export const create = async ({ name }: CreatePatientInput) => {
  return await patientRepository.create({ name });
};

export const update = async (id: string, { name }: UpdatePatientInput) => {
  return await patientRepository.update(id, { name });
};

export const deleteById = async (id: string) => {
  return await patientRepository.deleteById(id);
};
