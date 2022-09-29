import Joi from "joi";

export interface CreatePatientInput {
  name: string;
}

export const createPatientInputSchema = Joi.object({
  name: Joi.string().required().trim(),
});
