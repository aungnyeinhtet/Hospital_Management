import { Request, Response } from "express";
import { findManySpecialistArgsSchema } from "../dto/find-many-specialist.args";
import { HttpStatus } from "../nsw/types/http-status";
import * as specialistService from "../services/specialist.service";
import { validate } from "../utils/validate";

export const findMany = async (req: Request, res: Response) => {
  const { take, skip } = await validate(
    req.query,
    findManySpecialistArgsSchema,
  );

  const specialists = await specialistService.findMany({ take, skip });

  res.status(HttpStatus.OK).json({
    data: specialists,
  });
};

export const create = async (req: Request, res: Response) => {
  //
};

export const findById = async (req: Request, res: Response) => {
  //
};

export const update = async (req: Request, res: Response) => {
  //
};

export const deleteById = async (req: Request, res: Response) => {
  //
};
