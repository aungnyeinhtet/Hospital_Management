import Joi from "joi";

export interface UpdateHospitalInput {
  name: string;
}

export const updateHospitalInputSchema = Joi.object({
  name: Joi.string().required().trim(),
});
