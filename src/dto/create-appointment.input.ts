import Joi from "joi";

export interface CreateAppointmentInput {
  name: string;
}

export const createAppointmentInputSchema = Joi.object({
  name: Joi.string().required().trim(),
});
