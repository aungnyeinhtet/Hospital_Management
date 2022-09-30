import { faker } from "@faker-js/faker";
import { Patient } from "@prisma/client";

export const patients: Omit<
  Patient,
  "id" | "createdAt" | "updatedAt" | "regionId"
>[] = [
  {
    name: "Patient One",
    phone: "09671161193",
    dateOfBirth: null,
    gender: "MALE",
    city: faker.address.cityName(),
    password: "password",
  },
  {
    name: "Patient Two",
    phone: "09671161192",
    dateOfBirth: null,
    gender: "FEMALE",
    city: faker.address.cityName(),
    password: "password",
  },
];
