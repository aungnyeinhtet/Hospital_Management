import Joi from "joi";
import { JoiObjectId } from "../utils/validate";

export interface findManyAppointmentByIdArgs {
  id: string;
}

export const findManyAppointmentByIdArgsSchema = Joi.object({
  id: JoiObjectId().required().trim(),
});
