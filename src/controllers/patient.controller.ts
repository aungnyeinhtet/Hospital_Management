import { Request, Response } from "express";
import { createPatientInputSchema } from "../dto/create-patient.input";
import { findManyPatientArgsSchema } from "../dto/find-many-patient.args";
import { updatePatientInputSchema } from "../dto/update-patient.input";
import { HttpStatus } from "../nsw/types/http-status";
import * as patientService from "../services/patient.service";
import * as regionService from "../services/region.service";
import { parseObjectId, validate } from "../utils/validation";

/**
 * return a list of record
 *
 * @param req Request
 * @param res Response
 * @return Promise<void>
 */
export const findMany = async (req: Request, res: Response): Promise<void> => {
  const { take, skip } = await validate(req.query, findManyPatientArgsSchema);

  const patients = await patientService.findMany({ take, skip });

  res.status(HttpStatus.OK).json({
    data: patients,
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
  const { name, phone, password, dateOfBirth, gender, regionId, city } =
    await validate(req.body, createPatientInputSchema);

  /**
   * check wheather region is exists or not
   *
   * if not we throw `NotFound` Exception
   */
  if (regionId) await regionService.findBydIdOrFail(regionId);

  /**
   * check wheather patient with phone already exists or not
   *
   * if yes we throw `Conflit` Exception
   */
  await patientService.checkPatientExistsWithPhone(phone);

  const patient = await patientService.create({
    name,
    phone,
    password,
    dateOfBirth,
    gender,
    regionId,
    city,
  });

  res.status(HttpStatus.CREATED).json({
    data: patient,
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

  const patient = await patientService.findByIdOrFail(id);

  res.status(HttpStatus.OK).json({
    data: patient,
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
  const { name } = await validate(req.body, updatePatientInputSchema);

  const id = req.params.id;

  await patientService.findByIdOrFail(id);

  const patient = await patientService.update(id, { name });

  res.status(HttpStatus.OK).json({
    data: patient,
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
  const id = req.params.id;

  await patientService.findByIdOrFail(id);

  await patientService.deleteById(id);

  res.status(HttpStatus.OK).json({
    message: `Patient with id ${id} deleted successfully`,
  });
};
