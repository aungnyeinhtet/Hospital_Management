import Joi from "joi";
import { CreateHospitalInput } from "./create-hospital.input";

export interface UpdateHospitalInput extends Partial<CreateHospitalInput> {}

export const updateHospitalInputSchema = Joi.object<UpdateHospitalInput>({
  name: Joi.string().trim(),
  address: Joi.string().trim(),
});
