import { Request, Response } from "express";
import { createPatientInputSchema } from "../dto/create-patient.input";
import { findManyPatientArgsSchema } from "../dto/find-many-patient.args";
import { updatePatientInputSchema } from "../dto/update-patient.input";
import { HttpStatus } from "../nsw/types/http-status";
import * as patientService from "../services/patient.service";
import { validate } from "../utils/validate";

export const findMany = async (req: Request, res: Response) => {
  const { take, skip } = await validate(req.query, findManyPatientArgsSchema);

  const patients = await patientService.findMany({ take, skip });

  res.status(HttpStatus.OK).json({
    data: patients,
  });
};

export const create = async (req: Request, res: Response) => {
  const { name } = await validate(req.body, createPatientInputSchema);

  const patient = await patientService.create({ name });

  res.status(HttpStatus.CREATED).json({
    data: patient,
  });
};

export const findById = async (req: Request, res: Response) => {
  const patient = await patientService.findById(req.params.id);

  res.status(HttpStatus.OK).json({
    data: patient,
  });
};

export const update = async (req: Request, res: Response) => {
  const { name } = await validate(req.body, updatePatientInputSchema);

  const id = req.params.id;

  await patientService.findByIdOrFail(id);

  const patient = await patientService.update(id, { name });

  res.status(HttpStatus.OK).json({
    data: patient,
  });
};

export const deleteById = async (req: Request, res: Response) => {
  const id = req.params.id;

  await patientService.findByIdOrFail(id);

  await patientService.deleteById(id);

  res.status(HttpStatus.OK).json({
    message: `Patient with id ${id} deleted successfully`,
  });
};
