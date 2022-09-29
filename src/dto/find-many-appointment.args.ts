import Joi from "joi";
import { BaseFindManyArgs } from "./base-find-many.args";

export interface FindManyAppointmentArgs extends BaseFindManyArgs {}

export const findManyAppointmentArgsSchema = Joi.object({
  take: Joi.number(),
  skip: Joi.number(),
});
