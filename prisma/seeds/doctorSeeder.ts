import prisma from "../../src/lib/prisma";
import { doctors } from "../../_data/doctors";

export const doctorSeeder = async () => {
  for (const {
    name,
    degree,
    startedAt,
    biography,
    address,
    specialistId,
  } of doctors) {
    await prisma.doctor.create({
      data: {
        name,
        degree,
        biography,
        address,
        specialist: {
          connect: {
            id: specialistId,
          },
        },
      },
    });
  }
};
