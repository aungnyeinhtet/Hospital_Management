import { NextFunction, Request, Response } from "express";

export const handleErrors =
  (cb: any) => async (req: Request, res: Response, next: NextFunction) => {
    try {
      return await cb(req, res);
    } catch (error) {
      next(error);
    }
  };
