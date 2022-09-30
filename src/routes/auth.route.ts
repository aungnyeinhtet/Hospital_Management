import { Router } from "express";
import { login } from "../controllers/login.controller";
import { register } from "../controllers/register.controller";
import { routeMiddleware } from "../middlewares/route.middleware";

const router = Router();

router.post("/login", routeMiddleware(login));

router.post("/register", routeMiddleware(register));

export default router;
