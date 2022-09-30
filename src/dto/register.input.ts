import { Patient } from "@prisma/client";
import Joi from "joi";
import validateMyanmarPhone from "../utils/validation";

export interface RegisterInput
  extends Pick<Patient, "name" | "phone" | "password"> {}

export const registerInputSchema = Joi.object<RegisterInput>({
  name: Joi.string().required().trim(),
  phone: Joi.string()
    .required()
    .custom((value, helpers) => validateMyanmarPhone(value)),
  password: Joi.string().required().trim(),
});
