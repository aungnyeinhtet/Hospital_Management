import bcrypt from "bcrypt";
import { Request, Response } from "express";
import { BadRequest, NotFound } from "http-errors";
import jwt from "jsonwebtoken";
import { loginInputSchema } from "../dto/login.input";
import { HttpStatus } from "../nsw/types/http-status";
import { findByEmail } from "../repositories/user.repository";
import { validate } from "../utils/validate";

export const login = async (req: Request, res: Response) => {
  const { email, password } = await validate(req.body, loginInputSchema);

  const user = await findByEmail(email);

  if (!user) throw new NotFound(`User not found with email ${email}`);

  const validatePassword = await bcrypt.compare(password, user.password);

  if (!validatePassword) throw new BadRequest("Invalid password");

  const token = jwt.sign({ sub: user.id }, "ACCESS_TOKEN_SECRET");

  res.status(HttpStatus.OK).json({
    data: {
      token,
      user,
    },
  });
};
