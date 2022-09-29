import Joi from "joi";
import { BaseFindManyArgs } from "./base-find-many.args";

export interface FindManyDoctorArgs extends BaseFindManyArgs {}

export const findManyDoctorArgsSchema = Joi.object({
  take: Joi.number(),
  skip: Joi.number(),
});
