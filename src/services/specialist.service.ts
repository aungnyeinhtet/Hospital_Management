import { FindManySpecialistArgs } from "../dto/find-many-specialist.args";
import * as specialistRepository from "../repositories/specialist.repository";

export const findMany = async ({ take, skip }: FindManySpecialistArgs) => {
  return await specialistRepository.findMany({ take, skip });
};
