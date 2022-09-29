import Joi from "joi";

export interface CreateDoctorInput {
  name: string;
}

export const createDoctorInputSchema = Joi.object({
  name: Joi.string().required().trim(),
});
