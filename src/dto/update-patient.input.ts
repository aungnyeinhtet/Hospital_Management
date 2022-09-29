import Joi from "joi";

export interface UpdatePatientInput {
  name: string;
}

export const updatePatientInputSchema = Joi.object({
  name: Joi.string().required().trim(),
});
