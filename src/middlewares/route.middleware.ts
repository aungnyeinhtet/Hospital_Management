import { NextFunction, Request, Response } from "express";

export const routeMiddleware =
  (cb: (req: Request, res: Response) => Promise<void>) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      return await cb(req, res);
    } catch (error) {
      next(error);
    }
  };
