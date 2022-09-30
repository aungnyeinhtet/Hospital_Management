import prisma from "../../src/lib/prisma";
import { doctorSeeder } from "./doctorSeeder";
import { patientSeeder } from "./patientSeeder";
import { specialistSeeder } from "./specialistSeeder";
import { userSeeder } from "./userSeeder";

(async () => {
  await userSeeder();
  await specialistSeeder();
  await doctorSeeder();
  await patientSeeder();
})()
  .catch((e) => {
    console.log(e);
    process.exit(1);
  })
  .finally(async () => {
    console.log("Seeding complete");
    await prisma.$disconnect();
  });
