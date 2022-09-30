import { Doctor } from "@prisma/client";
import Joi from "joi";
import { JoiObjectId } from "../utils/validation";

export interface CreateDoctorInput
  extends Pick<
    Doctor,
    "name" | "degree" | "biography" | "address" | "specialistId"
  > {}

export const createDoctorInputSchema = Joi.object<CreateDoctorInput>({
  name: Joi.string().required().trim(),
  degree: Joi.string().trim().max(255),
  biography: Joi.string().trim().max(5000),
  address: Joi.string().trim().max(255),
  specialistId: JoiObjectId().required(),
});
