import { Hospital } from "@prisma/client";
import Joi from "joi";

export interface CreateHospitalInput
  extends Pick<Hospital, "name" | "address"> {}

export const createHospitalInputSchema = Joi.object<CreateHospitalInput>({
  name: Joi.string().required().trim(),
  address: Joi.string().trim(),
});
