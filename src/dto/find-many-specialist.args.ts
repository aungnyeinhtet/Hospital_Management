import Joi from "joi";
import { BaseFindManyArgs } from "./base-find-many.args";

export interface FindManySpecialistArgs extends BaseFindManyArgs {}

export const findManySpecialistArgsSchema = Joi.object({
  take: Joi.number(),
  skip: Joi.number(),
});
