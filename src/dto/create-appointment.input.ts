import { ConsultationType } from "@prisma/client";
import Joi from "joi";
import { JoiObjectId } from "../utils/validation";

export interface CreateAppointmentInput {
  consultationType: ConsultationType;
  reason: string;
  from: Date;
  to: Date;
  patientId: string;
  doctorId: string;
  tokenNumber: number;
}

export const getConsultantionType = () =>
  Joi.string()
    .valid(...Object.keys(ConsultationType))
    .trim();

export const getFrom = () => Joi.date().greater(new Date(Date.now()));

export const getTo = () => Joi.date().greater(Joi.ref("from"));

export const createAppointmentInputSchema = Joi.object<CreateAppointmentInput>({
  consultationType: getConsultantionType().required(),
  reason: Joi.string().required().trim(),
  from: getFrom().required(),
  to: getTo().required(),
  doctorId: JoiObjectId().required().trim(),
});
