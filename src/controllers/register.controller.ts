import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { ACCESS_TOKEN_EXPIRES_IN } from "../config/constants";
import { registerInputSchema } from "../dto/register.input";
import { HttpStatus } from "../nsw/types/http-status";
import * as patientService from "../services/patient.service";
import { validate } from "../utils/validation";

/**
 * handle to register
 *
 * @param req Request
 * @param res Response
 * @return Promise<void>
 */
export const register = async (req: Request, res: Response): Promise<void> => {
  const { name, phone, password } = await validate(
    req.body,
    registerInputSchema,
  );

  await patientService.checkPatientExistsWithPhone(phone);

  const patient = await patientService.create({
    name,
    phone,
    password,
  });

  const accessToken = jwt.sign(
    { sub: patient.id },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: ACCESS_TOKEN_EXPIRES_IN,
    },
  );

  res.status(HttpStatus.OK).json({
    data: {
      accessToken,
      type: "Bearer",
      expiredAt: ACCESS_TOKEN_EXPIRES_IN,
    },
  });
};
