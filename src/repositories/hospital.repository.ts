import { InternalServerError } from "http-errors";
import { DEFAULT_TAKE } from "../config/constants";
import { CreateHospitalInput } from "../dto/create-hospital.input";
import { FindManyHospitalArgs } from "../dto/find-many-hospital.args";
import { UpdateHospitalInput } from "../dto/update-hospital.input";
import prisma from "../lib/prisma";

export const findMany = async ({ take, skip }: FindManyHospitalArgs) => {
  try {
    return await prisma.hospital.findMany({
      take: Number(take) || DEFAULT_TAKE,
      skip: Number(skip) || undefined,
    });
  } catch (error) {
    console.log(error);
    throw new InternalServerError("DB Error");
  }
};

export const create = async ({ name, address }: CreateHospitalInput) => {
  try {
    return await prisma.hospital.create({
      data: {
        name,
        address,
      },
    });
  } catch (error) {
    console.log(error);
    throw new InternalServerError("DB Error");
  }
};

export const findById = async (id: string) => {
  try {
    return await prisma.hospital.findFirst({
      where: {
        id,
      },
    });
  } catch (error) {
    console.log(error);
    throw new InternalServerError("DB Error");
  }
};

export const update = async (id: string, { name }: UpdateHospitalInput) => {
  try {
    return await prisma.hospital.update({
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
    return await prisma.hospital.delete({
      where: {
        id,
      },
    });
  } catch (error) {
    console.log(error);
    throw new InternalServerError("DB Error");
  }
};
