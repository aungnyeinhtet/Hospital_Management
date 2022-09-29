import { InternalServerError } from "http-errors";
import { DEFAULT_TAKE } from "../config/constants";
import { CreateDoctorInput } from "../dto/create-doctor.input";
import { FindManyDoctorArgs } from "../dto/find-many-doctor.args";
import { UpdateDoctorInput } from "../dto/update-doctor.input";
import prisma from "../lib/prisma";

/**
 * find many doctor
 *
 * @param param0 FindManyDoctorArgs
 * @returns Promise<Doctor[]>
 */
export const findMany = async ({ take, skip }: FindManyDoctorArgs) => {
  try {
    return await prisma.doctor.findMany({
      take: Number(take) || DEFAULT_TAKE,
      skip: Number(skip) || undefined,
    });
  } catch (error) {
    console.log(error);
    throw new InternalServerError("findManyDoctor");
  }
};

export const create = async ({ name }: CreateDoctorInput) => {
  try {
    return await prisma.doctor.create({
      data: {
        name,
      },
    });
  } catch (error) {
    console.log(error);
    throw new InternalServerError("create doctor error");
  }
};

export const findById = async (id: string) => {
  try {
    return await prisma.doctor.findFirst({
      where: {
        id,
      },
    });
  } catch (error) {
    console.log(error);
    throw new InternalServerError("DB Error");
  }
};

export const update = async (id: string, { name }: UpdateDoctorInput) => {
  try {
    return await prisma.doctor.update({
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
    return await prisma.doctor.delete({
      where: {
        id,
      },
    });
  } catch (error) {
    console.log(error);
    throw new InternalServerError("DB Error");
  }
};
