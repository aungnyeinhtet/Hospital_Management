import { InternalServerError } from "http-errors";
import prisma from "../lib/prisma";

export const findUserById = async (id: string) => {
  try {
    return await prisma.user.findFirst({
      where: {
        id,
      },
    });
  } catch (error) {
    throw new InternalServerError("findUserByIdError");
  }
};

export const findUserByEmail = async (email: string) => {
  try {
    return await prisma.user.findFirst({
      where: {
        email,
      },
    });
  } catch (error) {
    console.log(error);
    throw new InternalServerError("findUserByEmail");
  }
};
