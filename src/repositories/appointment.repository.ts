import { InternalServerError } from "http-errors";
import { DEFAULT_TAKE } from "../config/constants";
import { CreateAppointmentInput } from "../dto/create-appointment.input";
import { FindManyAppointmentArgs } from "../dto/find-many-appointment.args";
import { UpdateAppointmentInput } from "../dto/update-appointment.input";
import prisma from "../lib/prisma";

export const findMany = async ({ take, skip }: FindManyAppointmentArgs) => {
  try {
    return await prisma.appointment.findMany({
      take: Number(take) || DEFAULT_TAKE,
      skip: Number(skip) || undefined,
    });
  } catch (error) {
    console.log(error);
    throw new InternalServerError("DB Error");
  }
};

export const create = async ({ name }: CreateAppointmentInput) => {
  try {
    // return await prisma.appointment.create({
    //   data: {
    //     name,
    //   },
    // });
  } catch (error) {
    console.log(error);
    throw new InternalServerError("DB Error");
  }
};

export const findById = async (id: string) => {
  try {
    return await prisma.appointment.findFirst({
      where: {
        id,
      },
    });
  } catch (error) {
    console.log(error);
    throw new InternalServerError("DB Error");
  }
};

export const update = async (id: string, { name }: UpdateAppointmentInput) => {
  try {
    return await prisma.appointment.update({
      where: {
        id,
      },
      data: {
        name,
      },
    });
  } catch (error) {
    console.log(error);
    throw new InternalServerError("DB Error");
  }
};

export const deleteById = async (id: string) => {
  try {
    return await prisma.appointment.delete({
      where: {
        id,
      },
    });
  } catch (error) {
    console.log(error);
    throw new InternalServerError("DB Error");
  }
};
