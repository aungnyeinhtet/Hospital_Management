import { Request, Response } from "express";
import { createDoctorInputSchema } from "../dto/create-doctor.input";
import { findManyDoctorArgsSchema } from "../dto/find-many-doctor.args";
import { updateDoctorInputSchema } from "../dto/update-doctor.input";
import { HttpStatus } from "../nsw/types/http-status";
import * as doctorService from "../services/doctor.service";
import { validate } from "../utils/validate";

export const findMany = async (req: Request, res: Response) => {
  const { take, skip } = await validate(req.query, findManyDoctorArgsSchema);

  const doctors = await doctorService.findMany({ take, skip });

  res.status(HttpStatus.OK).json({
    data: doctors,
  });
};

export const create = async (req: Request, res: Response) => {
  const { name } = await validate(req.body, createDoctorInputSchema);

  const doctor = await doctorService.create({ name });

  res.status(HttpStatus.CREATED).json({
    data: doctor,
  });
};

export const findById = async (req: Request, res: Response) => {
  const doctor = await doctorService.findBydIdOrFail(req.params.id);

  res.status(HttpStatus.OK).json({
    data: doctor,
  });
};

export const update = async (req: Request, res: Response) => {
  const { name } = await validate(req.body, updateDoctorInputSchema);

  const doctorId = req.params.id;

  await doctorService.findBydIdOrFail(doctorId);

  const doctor = await doctorService.update(doctorId, { name });

  res.status(HttpStatus.OK).json({
    data: doctor,
  });
};

export const deleteById = async (req: Request, res: Response) => {
  const doctorId = req.params.id;

  await doctorService.findBydIdOrFail(doctorId);

  await doctorService.deleteById(doctorId);

  res.status(HttpStatus.OK).json({
    message: `Doctor with id ${doctorId} deleted successfully`,
  });
};
