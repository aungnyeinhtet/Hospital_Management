import bcrypt from "bcrypt";
import { Request, Response } from "express";
import { BadRequest } from "http-errors";
import jwt from "jsonwebtoken";
import { ACCESS_TOKEN_EXPIRES_IN } from "../config/constants";
import { loginInputSchema } from "../dto/login.input";
import { HttpStatus } from "../nsw/types/http-status";
import * as patientService from "../services/patient.service";
import { validate } from "../utils/validation";

/**
 * handle to login
 *
 * @param req Request
 * @param res Response
 * @return Promise<void>
 */
export const login = async (req: Request, res: Response): Promise<void> => {
  const { phone, password } = await validate(req.body, loginInputSchema);

  const patient = await patientService.findByPhoneOrFail(phone);

  const validatePassword = await bcrypt.compare(password, patient.password);

  if (!validatePassword) throw new BadRequest("Invalid password");

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
