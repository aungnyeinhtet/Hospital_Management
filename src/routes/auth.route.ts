import { Router } from "express";
import { login } from "../controllers/login.controller";
import { routeMiddleware } from "../middlewares/route.middleware";

const router = Router();

router.post("/login", routeMiddleware(login));

router.post("/register", (req, res, next) => {
  //
});

export default router;
