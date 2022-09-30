import { faker } from "@faker-js/faker";
import { Doctor } from "@prisma/client";
import { General_Illness_ID, Heart_and_specialist_ID } from "./specialists";

export const doctors: Omit<Doctor, "id" | "createdAt" | "updatedAt">[] = [
  {
    name: "Dr.John Doe",
    degree: "M.B.B.S",
    startedAt: new Date(Date.now()),
    biography: faker.lorem.paragraph(),
    address: faker.address.streetAddress(),
    specialistId: General_Illness_ID,
  },
  {
    name: "Dr.Two",
    degree: "M.B.B.S",
    startedAt: new Date(Date.now()),
    biography: faker.lorem.paragraph(),
    address: faker.address.streetAddress(),
    specialistId: Heart_and_specialist_ID,
  },
];
