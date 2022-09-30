import { InternalServerError } from "http-errors";
import { DEFAULT_TAKE } from "../config/constants";
import { CreateAppointmentInput } from "../dto/create-appointment.input";
import { FindManyAppointmentArgs } from "../dto/find-many-appointment.args";
import { UpdateAppointmentInput } from "../dto/update-appointment.input";
import prisma from "../lib/prisma";

export const findMany = async ({
  take,
  skip,
  filter,
}: FindManyAppointmentArgs) => {
  try {
    return await prisma.appointment.findMany({
      where: {
        AND: [
          filter && filter?.doctorId
            ? {
                doctorId: filter.doctorId,
              }
            : undefined,

          filter && filter?.status
            ? {
                status: filter.status,
              }
            : undefined,

          filter && filter?.patientId
            ? {
                patientId: filter.patientId,
              }
            : undefined,
        ],
      },
      take: Number(take) || DEFAULT_TAKE,
      skip: Number(skip) || undefined,
    });
  } catch (error) {
    console.log(error);
    throw new InternalServerError("DB Error");
  }
};

export const create = async ({
  consultationType,
  reason,
  from,
  to,
  patientId,
  doctorId,
  tokenNumber,
}: CreateAppointmentInput) => {
  try {
    return await prisma.appointment.create({
      data: {
        consultationType,
        reason,
        from,
        to,
        tokenNumber,
        patient: {
          connect: {
            id: patientId,
          },
        },
        doctor: {
          connect: {
            id: doctorId,
          },
        },
      },
      include: {
        patient: true,
        doctor: true,
      },
    });
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
      include: {
        doctor: true,
        patient: true,
      },
    });
  } catch (error) {
    console.log(error);
    throw new InternalServerError("DB Error");
  }
};

export const update = async (
  id: string,
  { consultationType, from, to }: UpdateAppointmentInput,
) => {
  try {
    return await prisma.appointment.update({
      where: {
        id,
      },
      data: {
        consultationType,
        from,
        to,
      },
      include: {
        doctor: true,
        patient: true,
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
