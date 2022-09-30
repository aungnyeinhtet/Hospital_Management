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
    .required()
    .valid(...Object.keys(ConsultationType))
    .trim();

export const getFrom = () =>
  Joi.date()
    .required()
    .greater(Date.now() + 48 * 60 * 60 * 1000);

export const getTo = () => Joi.date().required().greater(Joi.ref("from"));

export const createAppointmentInputSchema = Joi.object<CreateAppointmentInput>({
  consultationType: getConsultantionType(),
  reason: Joi.string().required().trim(),
  from: getFrom(),
  to: getTo(),
  doctorId: JoiObjectId().required().trim(),
});
