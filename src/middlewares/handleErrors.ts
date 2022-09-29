import { NextFunction, Request, Response } from "express";
import { HttpException } from "../nsw/exceptions";

/**
 * Custom error handler to standardize error objects returned to
 * the client
 *
 * @param error Error caught by Express.js
 * @param req Request object provided by Express
 * @param res Response object provided by Express
 * @param next NextFunction function provided by Express
 */
export default function handleError(
  error: Error | HttpException,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (res.headersSent) return next(error);

  if (error instanceof HttpException) {
    console.log("HttpException");

    res.status(error.statusCode).json({
      message: error.message,
      statusCode: error.statusCode,
      success: false,
      ...(process.env.NODE_ENV === "production"
        ? null
        : { stack: error.stack }),
    });
  } else {
    console.log("Error");
    res.status(500).send(error.message);
  }
}
