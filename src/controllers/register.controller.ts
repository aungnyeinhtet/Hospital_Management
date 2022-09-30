import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { registerInputSchema } from "../dto/register.input";
import { HttpStatus } from "../nsw/types/http-status";
import * as patientService from "../services/patient.service";
import { validate } from "../utils/validate";

export const register = async (req: Request, res: Response) => {
  const { name, phone, password } = await validate(
    req.body,
    registerInputSchema,
  );

  await patientService.checkUserExistsWithPhone(phone);

  const patient = await patientService.create({
    name,
    phone,
    password,
    gender: "FEMALE",
    city: "",
  });

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
