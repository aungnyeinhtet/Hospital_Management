import prisma from "../../src/lib/prisma";
import { patients } from "../../_data/patients";

export const patientSeeder = async () => {
  for (const { name, phone, gender, city } of patients) {
    await prisma.patient.create({
      data: {
        name,
        phone,
        gender,
        city,
      },
    });
  }
};
