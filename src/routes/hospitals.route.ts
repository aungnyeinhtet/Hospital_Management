import { Router } from "express";
import { createHospitalInputSchema } from "../dto/create-hospital.input";
import { findManyHospitalArgsSchema } from "../dto/find-many-hospital.args";
import { updateHospitalInputSchema } from "../dto/update-hospital.input";
import { authMiddleware } from "../middlewares/auth.middleware";
import { routeMiddleware } from "../middlewares/route.middleware";
import { HttpStatus } from "../nsw/types/http-status";
import {
  createHospital,
  deleteHospitalById,
  findHospitalByIdOrFail,
  findManyHospital,
  updateHospital,
} from "../services/hospital.service";
import { validate } from "../utils/validate";

const router = Router();

/**
 * this endpoint will return a list of hospital
 *
 * @method GET
 */
router.get(
  "/",
  routeMiddleware(async (req, res) => {
    const { take, skip } = await validate(
      req.query,
      findManyHospitalArgsSchema,
    );

    const hispitals = await findManyHospital({ take, skip });

    res.status(HttpStatus.OK).json({
      data: hispitals,
    });
  }),
);

/**
 * this endpoint will create new hospital and return it
 *
 * @method POST
 */
router.post(
  "/",
  authMiddleware,
  routeMiddleware(async (req, res) => {
    const { name } = await validate(req.body, createHospitalInputSchema);

    const hospital = await createHospital({ name });

    res.status(HttpStatus.CREATED).json({
      data: hospital,
    });
  }),
);

/**
 * this endpoint will return hospital from given id
 *
 * @method GET
 */
router.get(
  "/:id",
  routeMiddleware(async (req, res) => {
    const hospital = await findHospitalByIdOrFail(req.params.id);

    res.status(HttpStatus.OK).json({
      data: hospital,
    });
  }),
);

/**
 * this endpoint will handle to update hospital from given id
 *
 * @method PATCH
 */
router.patch(
  "/:id",
  authMiddleware,
  routeMiddleware(async (req, res) => {
    const { name } = await validate(req.body, updateHospitalInputSchema);

    const hospitalId = req.params.id;

    await findHospitalByIdOrFail(hospitalId);

    const hospital = await updateHospital(hospitalId, { name });

    res.status(HttpStatus.OK).json({
      data: hospital,
    });
  }),
);

/**
 * this endpoint will handle to delete hospital
 *
 * @method DELETE
 */
router.delete(
  "/:id",
  authMiddleware,
  routeMiddleware(async (req, res) => {
    const hospitalId = req.params.id;

    await findHospitalByIdOrFail(hospitalId);

    await deleteHospitalById(hospitalId);

    res.status(HttpStatus.OK).json({
      message: `Hospital with id ${hospitalId} deleted successfully`,
    });
  }),
);

export default router;
