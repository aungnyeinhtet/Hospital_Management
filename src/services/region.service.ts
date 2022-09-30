import { NotFound } from "http-errors";
import * as regionRepository from "../repositories/region.repository";

export const findBydId = async (id: string) => {
  return await regionRepository.findById(id);
};

export const findBydIdOrFail = async (id: string) => {
  const region = await findBydId(id);

  if (!region) throw new NotFound(`Record not found with id ${id}`);

  return region;
};
