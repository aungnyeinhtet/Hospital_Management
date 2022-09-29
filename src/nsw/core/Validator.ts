import { badData } from "@hapi/boom";
import { ObjectSchema } from "joi";

export class Validator {
  constructor(private input: any, private schema: ObjectSchema<any>) {}

  /**
   * make validate
   *
   * @param input T
   * @param schema ObjectSchema<T>
   * @returns Validator
   */
  public static make<T>(input: T, schema: ObjectSchema<T>): Validator {
    return new Validator(input, schema);
  }

  /**
   * validte input
   *
   * @returns Promise<any>
   */
  async validate(): Promise<any> {
    try {
      return await this.schema.validateAsync(this.input);
    } catch (error) {
      throw badData("Unprocessable Entity", error);
    }
  }
}
