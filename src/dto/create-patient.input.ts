import { Gender } from "@prisma/client";
import Joi from "joi";

export interface CreatePatientInput {
  name: string;
  phone: string;
  password: string;
  gender: Gender;
  city: string;
}

export const createPatientInputSchema = Joi.object({
  name: Joi.string().required().trim(),
});
