import Joi from "joi";

export interface LoginInput {
  phone: string;
  password: string;
}

export const loginInputSchema = Joi.object<LoginInput>({
  phone: Joi.string().required().min(5).max(15).trim(),
  password: Joi.string().required().trim(),
});
