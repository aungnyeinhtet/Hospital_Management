import compression from "compression";
import express, { Express } from "express";
import expressRateLimit from "express-rate-limit";
import helmet from "helmet";
import "reflect-metadata";
import { PORT } from "./config/constants";
import passport from "./lib/passport";
import { handleError } from "./middlewares/errors.middleware";
import routes from "./routes";

export const createApp = (): Express => {
  const app = express();

  app.set(PORT, process.env.PORT || 4000);

  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(expressRateLimit({ windowMs: 60 * 1000, max: 30 }));
  app.use(helmet());
  app.use(compression());
  app.use(passport.initialize());

  app.use("/api", routes);

  app.use(handleError);

  return app;
};
