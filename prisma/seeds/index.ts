import prisma from "../../src/lib/prisma";
import { adminSeeder } from "./adminSeeder";
import { doctorSeeder } from "./doctorSeeder";
import { hospitalSeeder } from "./hospitalSeeder";
import { patientSeeder } from "./patientSeeder";
import { specialistSeeder } from "./specialistSeeder";

(async () => {
  await hospitalSeeder();
  await adminSeeder();
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
