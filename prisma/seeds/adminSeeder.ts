import { genSaltSync, hash } from "bcrypt";
import prisma from "../../src/lib/prisma";

export const adminSeeder = async () => {
  await prisma.admin.create({
    data: {
      name: "Admin One",
      email: "admin@admin.com",
      password: await hash("password", genSaltSync(12)),
    },
  });
};
