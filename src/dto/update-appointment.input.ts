import { AppointmentStatus } from "@prisma/client";
import Joi from "joi";
import {
  CreateAppointmentInput,
  getConsultantionType,
  getFrom,
  getTo,
} from "./create-appointment.input";

export interface UpdateAppointmentInput
  extends Partial<
    Pick<CreateAppointmentInput, "consultationType" | "from" | "to">
  > {
  status?: AppointmentStatus;
}

export const updateAppointmentInputSchema = Joi.object<UpdateAppointmentInput>({
  consultationType: getConsultantionType(),
  from: getFrom(),
  to: getTo(),
});
