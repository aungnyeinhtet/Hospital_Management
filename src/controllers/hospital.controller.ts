import { Request, Response } from "express";
import { createHospitalInputSchema } from "../dto/create-hospital.input";
import { findManyHospitalArgsSchema } from "../dto/find-many-hospital.args";
import { updateHospitalInputSchema } from "../dto/update-hospital.input";
import { HttpStatus } from "../nsw/types/http-status";
import * as hospitalService from "../services/hospital.service";
import { parseObjectId, validate } from "../utils/validation";

/**
 * return a list of record
 *
 * @param req Request
 * @param res Response
 * @return Promise<void>
 */
export const findMany = async (req: Request, res: Response): Promise<void> => {
  const { take, skip } = await validate(req.query, findManyHospitalArgsSchema);

  const hispitals = await hospitalService.findMany({ take, skip });

  res.status(HttpStatus.OK).json({
    data: hispitals,
  });
};

/**
 * handle to create new record
 *
 * @param req Request
 * @param res Response
 * @return Promise<void>
 */
export const create = async (req: Request, res: Response): Promise<void> => {
  const { name, address } = await validate(req.body, createHospitalInputSchema);

  const hospital = await hospitalService.create({ name, address });

  res.status(HttpStatus.CREATED).json({
    data: hospital,
  });
};

/**
 * find record by id
 *
 * @param req Request
 * @param res Response
 * @return Promise<void>
 */
export const findById = async (req: Request, res: Response): Promise<void> => {
  const id = parseObjectId(req.params.id);

  const hospital = await hospitalService.findByIdOrFail(id);

  res.status(HttpStatus.OK).json({
    data: hospital,
  });
};

/**
 * handle to update record by id
 *
 * @param req Request
 * @param res Response
 * @return Promise<void>
 */
export const update = async (req: Request, res: Response): Promise<void> => {
  const { name, address } = await validate(req.body, updateHospitalInputSchema);

  const hospitalId = parseObjectId(req.params.id);

  await hospitalService.findByIdOrFail(hospitalId);

  const hospital = await hospitalService.update(hospitalId, { name, address });

  res.status(HttpStatus.OK).json({
    data: hospital,
  });
};

/**
 * handle to delete record by id
 *
 * @param req Request
 * @param res Response
 * @return Promise<void>
 */
export const deleteById = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const hospitalId = parseObjectId(req.params.id);

  await hospitalService.findByIdOrFail(hospitalId);

  await hospitalService.deleteById(hospitalId);

  res.status(HttpStatus.OK).json({
    message: `Hospital with id ${hospitalId} deleted successfully`,
  });
};
