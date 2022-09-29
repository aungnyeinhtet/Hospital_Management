import Joi from "joi";

export interface UpdateDoctorInput {
  name: string;
}

export const updateDoctorInputSchema = Joi.object({
  name: Joi.string().trim(),
});
