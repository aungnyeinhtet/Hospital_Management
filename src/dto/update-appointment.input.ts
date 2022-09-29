import Joi from "joi";

export interface UpdateAppointmentInput {
  name: string;
}

export const updateAppointmentInputSchema = Joi.object({
  name: Joi.string().required().trim(),
});
