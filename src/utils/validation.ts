import { BadRequest } from "http-errors";
import Joi, { ObjectSchema, ValidationError } from "joi";

/**
 * validate input value
 *
 * @param schema : Promise<T>
 */
export const validate = async <T = unknown>(
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

/**
 * validate incoming id is valid object id or not
 *
 * @param id string
 * @returns string
 */
export const parseObjectId = (id: string): string => {
  const message = `${id} is not valid ObjectId`;

  if (!id) throw new BadRequest(message);

  if (!/^[0-9a-fA-F]{24}$/.test(id)) throw new BadRequest(message);

  return id;
};

/**
 * allow orderBy validation
 *
 * @param keys string[]
 * @returns
 */
export const allowedOrderBy =
  (keys: string[]) => (value: string, helpers: Joi.CustomHelpers<any>) => {
    const [field, direction] = value.split("=");

    if (direction && !["asc", "desc"].includes(direction))
      return helpers.error("any.invalid");

    if (!keys.includes(field)) return helpers.error("any.invalid");

    return value;
  };

/**
 * allowed include relationship keys
 *
 * @param keys string[]
 * @returns
 */
export const allowedInclude =
  (keys: string[]) => (value: string, helpers: Joi.CustomHelpers<any>) => {
    const isValid = value
      .split(",")
      .every((item) => keys.includes(item.trim()));

    if (!isValid) return helpers.error("any.invalid");

    return value;
  };

/**
 * allowed filter
 *
 * @param key string[]
 */
export function allowedFilter(key: string[]) {
  //
}
