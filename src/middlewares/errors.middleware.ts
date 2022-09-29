import { NextFunction, Request, Response } from "express";
import { isHttpError } from "http-errors";
import { IS_DEVELOPMENT } from "../config/constants";
import { HttpException } from "../nsw/exceptions";
import { HttpStatus } from "../nsw/types/http-status";

/**
 * Custom error handler to standardize error objects returned to
 * the client
 *
 * @param error Error caught by Express.js
 * @param req Request object provided by Express
 * @param res Response object provided by Express
 * @param next NextFunction function provided by Express
 */
export const handleError = (
  error: TypeError | HttpException,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (res.headersSent) return next(error);

  if (isHttpError(error)) {
    console.log("Http Error");
    res.status(error.statusCode).json({
      message: error.message,
      statusCode: error.statusCode,
      name: error.name,
      stack: IS_DEVELOPMENT && error.stack,
    });

    return;
  }

  console.log("Unknown Error");
  res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
    message: error.message,
    name: error.name,
    stack: error.stack,
  });
};
