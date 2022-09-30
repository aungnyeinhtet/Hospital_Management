import Joi from "joi";
import { JoiObjectId } from "../utils/validation";
import { CreateDoctorInput } from "./create-doctor.input";

export interface UpdateDoctorInput extends Partial<CreateDoctorInput> {}

export const updateDoctorInputSchema = Joi.object({
  name: Joi.string().trim(),
  degree: Joi.string().trim().max(255),
  biography: Joi.string().trim().max(5000),
  address: Joi.string().trim().max(255),
  specialistId: JoiObjectId(),
});
