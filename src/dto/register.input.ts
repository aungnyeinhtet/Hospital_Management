import { Patient } from "@prisma/client";
import Joi from "joi";

export interface RegisterInput
  extends Pick<Patient, "name" | "phone" | "password"> {}

export const registerInputSchema = Joi.object<RegisterInput>({
  name: Joi.string().required().trim(),
  phone: Joi.string().required().min(5).max(15).trim(),
  password: Joi.string().required().trim(),
});
