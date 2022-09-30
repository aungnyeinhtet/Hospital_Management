import bcrypt from "bcrypt";
import { Request, Response } from "express";
import { BadRequest } from "http-errors";
import jwt from "jsonwebtoken";
import { loginInputSchema } from "../dto/login.input";
import { HttpStatus } from "../nsw/types/http-status";
import * as patientService from "../services/patient.service";
import { validate } from "../utils/validate";

export const login = async (req: Request, res: Response) => {
  const { phone, password } = await validate(req.body, loginInputSchema);

  const patient = await patientService.findByPhoneOrFail(phone);

  const validatePassword = await bcrypt.compare(password, patient.password);

  if (!validatePassword) throw new BadRequest("Invalid password");

  const token = jwt.sign(
    { sub: patient.id },
    "process.env.ACCESS_TOKEN_SECRET",
  );

  res.status(HttpStatus.OK).json({
    data: {
      token,
      patient,
    },
  });
};
