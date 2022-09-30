import { Request, Response } from "express";
import { createDoctorInputSchema } from "../dto/create-doctor.input";
import { findManyDoctorArgsSchema } from "../dto/find-many-doctor.args";
import { updateDoctorInputSchema } from "../dto/update-doctor.input";
import { HttpStatus } from "../nsw/types/http-status";
import * as doctorService from "../services/doctor.service";
import * as specialistService from "../services/specialist.service";
import { parseObjectId, validate } from "../utils/validation";

/**
 * return a list of record
 *
 * @param req Request
 * @param res Response
 * @return Promise<void>
 */
export const findMany = async (req: Request, res: Response): Promise<void> => {
  const { take, skip } = await validate(req.query, findManyDoctorArgsSchema);

  const doctors = await doctorService.findMany({ take, skip });

  res.status(HttpStatus.OK).json({
    data: doctors,
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
  const { name, degree, biography, address, specialistId } = await validate(
    req.body,
    createDoctorInputSchema,
  );

  await specialistService.findByIdOrFail(specialistId);

  const doctor = await doctorService.create({
    name,
    degree,
    biography,
    address,
    specialistId,
  });

  res.status(HttpStatus.CREATED).json({
    data: doctor,
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

  const doctor = await doctorService.findBydIdOrFail(id);

  res.status(HttpStatus.OK).json({
    data: doctor,
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
  const { name, degree, biography, address, specialistId } = await validate(
    req.body,
    updateDoctorInputSchema,
  );

  const doctorId = parseObjectId(req.params.id);

  if (specialistId) await specialistService.findByIdOrFail(specialistId);

  await doctorService.findBydIdOrFail(doctorId);

  const doctor = await doctorService.update(doctorId, {
    name,
    degree,
    biography,
    address,
    specialistId,
  });

  res.status(HttpStatus.OK).json({
    data: doctor,
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
  const doctorId = parseObjectId(req.params.id);

  await doctorService.findBydIdOrFail(doctorId);

  await doctorService.deleteById(doctorId);

  res.status(HttpStatus.OK).json({
    message: `Doctor with id ${doctorId} deleted successfully`,
  });
};
