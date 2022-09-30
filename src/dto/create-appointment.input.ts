import { ConsultationType } from "@prisma/client";
import Joi from "joi";
import { JoiObjectId } from "../utils/validate";

export interface CreateAppointmentInput {
  consultationType: ConsultationType;
  reason: string;
  from: Date;
  to: Date;
  patientId: string;
  doctorId: string;
}

export const createAppointmentInputSchema = Joi.object<CreateAppointmentInput>({
  consultationType: Joi.string()
    .required()
    .valid(...Object.keys(ConsultationType))
    .trim(),
  reason: Joi.string().required().trim(),
  from: Joi.date()
    .required()
    .greater(Date.now() + 48 * 60 * 60 * 1000),
  to: Joi.date().required().greater(Joi.ref("from")),
  doctorId: JoiObjectId().required().trim(),
});
