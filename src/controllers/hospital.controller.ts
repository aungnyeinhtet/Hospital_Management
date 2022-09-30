import { Request, Response } from "express";
import { createHospitalInputSchema } from "../dto/create-hospital.input";
import { findManyHospitalArgsSchema } from "../dto/find-many-hospital.args";
import { updateHospitalInputSchema } from "../dto/update-hospital.input";
import { HttpStatus } from "../nsw/types/http-status";
import {
  createHospital,
  deleteHospitalById,
  findHospitalByIdOrFail,
  findManyHospital,
  updateHospital,
} from "../services/hospital.service";
import { validate } from "../utils/validation";

export const findMany = async (req: Request, res: Response) => {
  const { take, skip } = await validate(req.query, findManyHospitalArgsSchema);

  const hispitals = await findManyHospital({ take, skip });

  res.status(HttpStatus.OK).json({
    data: hispitals,
  });
};

export const create = async (req: Request, res: Response) => {
  const { name } = await validate(req.body, createHospitalInputSchema);

  const hospital = await createHospital({ name });

  res.status(HttpStatus.CREATED).json({
    data: hospital,
  });
};

export const findById = async (req: Request, res: Response) => {
  const hospital = await findHospitalByIdOrFail(req.params.id);

  res.status(HttpStatus.OK).json({
    data: hospital,
  });
};

export const update = async (req: Request, res: Response) => {
  const { name } = await validate(req.body, updateHospitalInputSchema);

  const hospitalId = req.params.id;

  await findHospitalByIdOrFail(hospitalId);

  const hospital = await updateHospital(hospitalId, { name });

  res.status(HttpStatus.OK).json({
    data: hospital,
  });
};

export const deleteById = async (req: Request, res: Response) => {
  const hospitalId = req.params.id;

  await findHospitalByIdOrFail(hospitalId);

  await deleteHospitalById(hospitalId);

  res.status(HttpStatus.OK).json({
    message: `Hospital with id ${hospitalId} deleted successfully`,
  });
};
