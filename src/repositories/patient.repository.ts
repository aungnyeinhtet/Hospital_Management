import { InternalServerError } from "http-errors";
import { DEFAULT_TAKE } from "../config/constants";
import { CreatePatientInput } from "../dto/create-patient.input";
import { FindManyPatientArgs } from "../dto/find-many-patient.args";
import { UpdatePatientInput } from "../dto/update-patient.input";
import prisma from "../lib/prisma";

export const findMany = async ({ take, skip }: FindManyPatientArgs) => {
  try {
    return await prisma.patient.findMany({
      take: Number(take) || DEFAULT_TAKE,
      skip: Number(skip) || undefined,
    });
  } catch (error) {
    console.log(error);
    throw new InternalServerError("DB Error");
  }
};

export const create = async ({
  name,
  phone,
  password,
  dateOfBirth,
  gender,
  regionId,
  city,
}: CreatePatientInput) => {
  try {
    return await prisma.patient.create({
      data: {
        name,
        phone,
        password,
        dateOfBirth,
        gender,
        region: regionId
          ? {
              connect: {
                id: regionId,
              },
            }
          : undefined,
        city,
      },
      include: {
        region: true,
      },
    });
  } catch (error) {
    console.log(error);
    throw new InternalServerError("DB Error");
  }
};

export const findById = async (id: string) => {
  try {
    return await prisma.patient.findFirst({
      where: {
        id,
      },
      include: {
        region: true,
      },
    });
  } catch (error) {
    console.log(error);
    throw new InternalServerError("DB Error");
  }
};

export const findByPhone = async (phone: string) => {
  try {
    return await prisma.patient.findUnique({
      where: {
        phone,
      },
    });
  } catch (error) {
    console.log(error);
    throw new InternalServerError("DB Error");
  }
};

export const update = async (
  id: string,
  { name, city, dateOfBirth, gender, phone, regionId }: UpdatePatientInput,
) => {
  try {
    return await prisma.patient.update({
      where: {
        id,
      },
      data: {
        name,
        city,
        dateOfBirth,
        gender,
        phone,
        region: regionId
          ? {
              connect: {
                id: regionId,
              },
            }
          : undefined,
      },
      include: {
        region: true,
      },
    });
  } catch (error) {
    console.log(error);
    throw new InternalServerError("DB Error");
  }
};

export const deleteById = async (id: string) => {
  try {
    return await prisma.patient.delete({
      where: {
        id,
      },
    });
  } catch (error) {
    console.log(error);
    throw new InternalServerError("DB Error");
  }
};
