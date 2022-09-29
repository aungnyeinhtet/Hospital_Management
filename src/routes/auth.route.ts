import { Router } from "express";
import { HttpStatus } from "../nsw/types/http-status";

const router = Router();

router.post("/login", (req, res) => {
  res.status(HttpStatus.OK).json({
    message: "Login Routes",
  });
});

router.post("/register", (req, res) => {
  //
});

export default router;
