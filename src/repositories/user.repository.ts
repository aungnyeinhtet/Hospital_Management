import prisma from "../lib/prisma";
import { InternalServerException } from "../nsw/exceptions";

export const findUserById = async (id: string) => {
  try {
    return await prisma.user.findFirst({
      where: {
        id,
      },
    });
  } catch (error) {
    throw new InternalServerException("findUserByIdError");
  }
};
