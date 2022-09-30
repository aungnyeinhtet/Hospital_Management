import { NotFound } from "http-errors";
import { FindManySpecialistArgs } from "../dto/find-many-specialist.args";
import * as specialistRepository from "../repositories/specialist.repository";

export const findMany = async ({ take, skip }: FindManySpecialistArgs) => {
  return await specialistRepository.findMany({ take, skip });
};

export const findById = async (id: string) => {
  return await specialistRepository.findById(id);
};

export const findByIdOrFail = async (id: string) => {
  const specialist = await findById(id);

  if (!specialist) throw new NotFound(`Record not found with id ${id}`);

  return specialist;
};
