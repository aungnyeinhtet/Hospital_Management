import Joi from "joi";

export interface CreateHospitalInput {
  name: string;
}

export const createHospitalInputSchema = Joi.object({
  name: Joi.string().required().trim(),
});
