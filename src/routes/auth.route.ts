import bcrypt from "bcrypt";
import { Router } from "express";
import { BadRequest, NotFound } from "http-errors";
import jwt from "jsonwebtoken";
import { ACCESS_TOKEN_SECRET } from "../config/constants";
import { loginInputSchema } from "../dto/login.input";
import { HttpStatus } from "../nsw/types/http-status";
import { findUserByEmail } from "../services/user.service";
import { validate } from "../utils/validate";

const router = Router();

router.post("/login", async (req, res, next) => {
  try {
    const { email, password } = await validate(req.body, loginInputSchema);

    const user = await findUserByEmail(email);

    if (!user) throw new NotFound(`User not found with email ${email}`);

    const validatePassword = await bcrypt.compare(password, user.password);

    if (!validatePassword) throw new BadRequest("Invalid password");

    const token = jwt.sign({ sub: user.id }, ACCESS_TOKEN_SECRET);

    res.status(HttpStatus.OK).json({
      token,
      user,
    });
  } catch (error) {
    next(error);
  }
});

router.post("/register", (req, res, next) => {
  //
});

export default router;
