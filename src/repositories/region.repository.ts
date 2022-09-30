import { InternalServerError } from "http-errors";
import prisma from "../lib/prisma";

export const findById = async (id: string) => {
  try {
    return await prisma.region.findFirst({
      where: {
        id,
      },
    });
  } catch (error) {
    console.log(error);
    throw new InternalServerError("DB Error");
  }
};
