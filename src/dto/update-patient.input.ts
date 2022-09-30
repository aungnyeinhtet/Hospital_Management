import { Gender } from "@prisma/client";
import Joi from "joi";
import { JoiObjectId } from "../utils/validation";
import { CreatePatientInput } from "./create-patient.input";

export interface UpdatePatientInput
  extends Partial<Omit<CreatePatientInput, "password">> {}

export const updatePatientInputSchema = Joi.object<UpdatePatientInput>({
  name: Joi.string().trim(),
  phone: Joi.string().trim(),
  dateOfBirth: Joi.date(),
  gender: Joi.string().valid(...Object.keys(Gender)),
  regionId: JoiObjectId().trim(),
  city: Joi.string().trim(),
});
