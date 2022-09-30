import { BadRequest } from "http-errors";
import Joi, { ObjectSchema, ValidationError } from "joi";

/**
 * validate input value
 *
 * @param schema : Promise<T>
 */
export const validate = async <T extends unknown>(
  value: T,
  schema: ObjectSchema<T>,
) => {
  try {
    return await schema.validateAsync(value);
  } catch (error) {
    if (error instanceof ValidationError)
      throw new BadRequest(error.details.map((d) => d.message).join());

    throw new BadRequest("Validation Failed");
  }
};

export const JoiObjectId = (message = "Should be valid ObjectId") =>
  Joi.string().regex(/^[0-9a-fA-F]{24}$/, message);
