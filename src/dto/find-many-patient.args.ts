import Joi from "joi";
import { BaseFindManyArgs } from "./base-find-many.args";

export interface FindManyPatientArgs extends BaseFindManyArgs {}

export const findManyPatientArgsSchema = Joi.object({
  take: Joi.number(),
  skip: Joi.number(),
});
