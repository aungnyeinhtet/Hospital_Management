import { Patient } from "@prisma/client";
import Joi from "joi";
import validateMyanmarPhone from "../utils/validation";

export interface LoginInput extends Pick<Patient, "phone" | "password"> {}

export const loginInputSchema = Joi.object<LoginInput>({
  phone: Joi.string()
    .required()
    .custom((value, helpers) => validateMyanmarPhone(value)),
  password: Joi.string().required().trim(),
});
