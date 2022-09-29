import { genSaltSync, hash } from "bcrypt";
import prisma from "../../src/lib/prisma";
import { users } from "../../_data/users";

export const userSeeder = async () => {
  for (const { name, email, password } of users) {
    await prisma.user.create({
      data: {
        name,
        email,
        password: await hash(password, genSaltSync(12)),
      },
    });
  }
};
