import { Hospital } from "@prisma/client";

export const hospitals: Omit<Hospital, "id" | "createdAt" | "updatedAt">[] = [
  {
    name: "Hospital One",
    address: "Yangon",
  },
  {
    name: "Hospital Two",
    address: "Mandalay",
  },
];
