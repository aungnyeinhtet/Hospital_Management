import { faker } from "@faker-js/faker";
import { Patient } from "@prisma/client";

export const patients: Omit<
  Patient,
  "id" | "createdAt" | "updatedAt" | "regionId"
>[] = [
  {
    name: "Patient One",
    phone: faker.phone.number(),
    dateOfBirth: null,
    gender: "MALE",
    city: faker.address.cityName(),
  },
  {
    name: "Patient Two",
    phone: faker.phone.number(),
    dateOfBirth: null,
    gender: "FEMALE",
    city: faker.address.cityName(),
  },
];
