import { Router } from "express";
import { HttpStatus } from "../nsw/types/http-status";

const router = Router();

router.get("/", (req, res) => {
  // TODO
  // this endpoint will return a list of doctors
  res.status(HttpStatus.OK).json({
    data: [],
  });
});

export default router;
