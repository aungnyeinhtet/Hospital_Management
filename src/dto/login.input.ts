import Joi from "joi";

export interface LoginInput {
  email: string;
  password: string;
}

export const loginInputSchema = Joi.object<LoginInput>({
  email: Joi.string().required().min(5).max(15).trim(),
  password: Joi.string().required().trim(),
});
