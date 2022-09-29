import Joi from "joi";
import { BaseFindManyArgs } from "./base-find-many.args";

export interface FindManyHospitalArgs extends BaseFindManyArgs {}

export const findManyHospitalArgsSchema = Joi.object({
  take: Joi.number(),
  skip: Joi.number(),
});
