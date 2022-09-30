import prisma from "../../src/lib/prisma";
import { specialists } from "../../_data/specialists";

export const specialistSeeder = async () => {
  for (const { id, name } of specialists) {
    await prisma.specialist.create({
      data: {
        id,
        name,
      },
    });
  }
};
