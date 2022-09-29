import { ObjectSchema, ValidationError } from "joi";
import { BadRequestException } from "../nsw/exceptions";

/**
 * validate input value
 *
 * @param schema : Promise<T>
 */
export async function validate<T>(
  value: T,
  schema: ObjectSchema<T>,
): Promise<T> {
  try {
    return await schema.validateAsync(value);
  } catch (error) {
    if (error instanceof ValidationError)
      throw new BadRequestException(error.details.map((d) => d.message).join());

    throw new BadRequestException();
  }
}
