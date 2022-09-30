import { Gender, Patient } from "@prisma/client";
import Joi from "joi";
import validateMyanmarPhone, { JoiObjectId } from "../utils/validation";

export interface CreatePatientInput
  extends Partial<
    Pick<
      Patient,
      | "name"
      | "phone"
      | "password"
      | "dateOfBirth"
      | "gender"
      | "regionId"
      | "city"
    >
  > {}

export const createPatientInputSchema = Joi.object<CreatePatientInput>({
  name: Joi.string().required().trim(),
  phone: Joi.string()
    .required()
    .custom((value, helpers) => validateMyanmarPhone(value)),
  password: Joi.string().required().trim(),
  dateOfBirth: Joi.date(),
  gender: Joi.string().valid(...Object.keys(Gender)),
  regionId: JoiObjectId().trim(),
  city: Joi.string().trim(),
});
