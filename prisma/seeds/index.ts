import prisma from "../../src/lib/prisma";
import { specialistSeeder } from "./specialistSeeder";
import { userSeeder } from "./userSeeder";

(async () => {
  await specialistSeeder();
  await userSeeder();
})()
  .catch((e) => {
    console.log(e);
    process.exit(1);
  })
  .finally(async () => {
    console.log("Seeding complete");
    await prisma.$disconnect();
  });
