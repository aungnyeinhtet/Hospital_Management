import { AppointmentStatus } from "@prisma/client";
import Joi from "joi";
import { BaseFindManyArgs } from "./base-find-many.args";

interface AppointmentFilter {
  doctorId?: string;
  patientId?: string;
  status?: AppointmentStatus;
}

export interface FindManyAppointmentArgs
  extends BaseFindManyArgs<AppointmentFilter> {}

export const findManyAppointmentArgsSchema = Joi.object({
  take: Joi.number(),
  skip: Joi.number(),
});
