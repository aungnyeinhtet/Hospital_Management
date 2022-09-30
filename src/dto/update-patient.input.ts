import { Gender } from "@prisma/client";
import Joi from "joi";
import validateMyanmarPhone, { JoiObjectId } from "../utils/validation";
import { CreatePatientInput } from "./create-patient.input";

export interface UpdatePatientInput
  extends Partial<Omit<CreatePatientInput, "password">> {}

export const updatePatientInputSchema = Joi.object<UpdatePatientInput>({
  name: Joi.string().trim(),
  phone: Joi.string().custom((value, helpers) => validateMyanmarPhone(value)),
  dateOfBirth: Joi.date(),
  gender: Joi.string().valid(...Object.keys(Gender)),
  regionId: JoiObjectId().trim(),
  city: Joi.string().trim(),
});
