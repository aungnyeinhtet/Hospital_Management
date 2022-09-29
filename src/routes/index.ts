import { Router } from "express";
import { HttpStatus } from "../nsw/types/http-status";
import authRoutes from "./auth.route";
import doctorRoutes from "./doctors.route";

const router = Router();

router.get("/", (req, res) => {
  res.status(HttpStatus.OK).json({
    message: "Hello World!",
  });
});

router.use("/doctors", doctorRoutes);
router.use(authRoutes);

export default router;
