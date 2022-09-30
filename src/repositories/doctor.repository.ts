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
export const findMany = async ({ take, skip, filter }: FindManyDoctorArgs) => {
  try {
    return await prisma.doctor.findMany({
      take: Number(take) || DEFAULT_TAKE,
      skip: Number(skip) || undefined,
      include: {
        specialist: true,
      },
    });
  } catch (error) {
    console.log(error);
    throw new InternalServerError("DB Error");
  }
};

export const create = async ({
  name,
  address,
  biography,
  degree,
  specialistId,
}: CreateDoctorInput) => {
  try {
    return await prisma.doctor.create({
      data: {
        name,
        degree,
        address,
        biography,
        specialist: {
          connect: {
            id: specialistId,
          },
        },
      },
      include: {
        specialist: true,
      },
    });
  } catch (error) {
    console.log(error);
    throw new InternalServerError("DB Error");
  }
};

export const findById = async (id: string) => {
  try {
    return await prisma.doctor.findFirst({
      where: {
        id,
      },
      include: {
        specialist: true,
      },
    });
  } catch (error) {
    console.log(error);
    throw new InternalServerError("DB Error");
  }
};

export const update = async (
  id: string,
  { name, degree, biography, address, specialistId }: UpdateDoctorInput,
) => {
  try {
    return await prisma.doctor.update({
      where: {
        id,
      },
      data: {
        name,
        degree,
        biography,
        address,
        specialist: specialistId
          ? {
              connect: {
                id: specialistId,
              },
            }
          : undefined,
      },
      include: {
        specialist: true,
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
