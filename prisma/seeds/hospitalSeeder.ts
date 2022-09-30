import prisma from "../../src/lib/prisma";
import { hospitals } from "../../_data/hospitals";

export const hospitalSeeder = async () => {
  for (const { name, address } of hospitals) {
    await prisma.hospital.create({
      data: {
        name,
        address,
      },
    });
  }
};
