import { InternalServerError } from "http-errors";
import { DEFAULT_TAKE } from "../config/constants";
import { FindManySpecialistArgs } from "../dto/find-many-specialist.args";
import prisma from "../lib/prisma";

export const findMany = async ({ take, skip }: FindManySpecialistArgs) => {
  try {
    return await prisma.specialist.findMany({
      take: Number(take) || DEFAULT_TAKE,
      skip: Number(skip) || undefined,
    });
  } catch (error) {
    console.log(error);
    throw new InternalServerError("DB Error");
  }
};

export const findById = async (id: string) => {
  try {
    return await prisma.specialist.findFirst({
      where: {
        id,
      },
    });
  } catch (error) {
    console.log(error);
    throw new InternalServerError("DB Error");
  }
};
