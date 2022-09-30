import { Router } from "express";
import { login } from "../controllers/login.controller";
import { register } from "../controllers/register.controller";
import { routeMiddleware } from "../middlewares/route.middleware";

const router = Router();

/**
 * this route handle login
 *
 * @middleware [routeMiddleware]
 * @method POST
 */
router.post("/login", routeMiddleware(login));

/**
 * this route handle to register
 *
 * @middleware [routeMiddleware]
 * @method POST
 */
router.post("/register", routeMiddleware(register));

export default router;
