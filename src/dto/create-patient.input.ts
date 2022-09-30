import { Gender, Patient } from "@prisma/client";
import Joi from "joi";
import { JoiObjectId } from "../utils/validation";

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
  phone: Joi.string().required().trim(),
  password: Joi.string().required().trim(),
  dateOfBirth: Joi.date(),
  gender: Joi.string().valid(...Object.keys(Gender)),
  regionId: JoiObjectId().trim(),
  city: Joi.string().trim(),
});
