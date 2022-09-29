import compression from "compression";
import * as dotenv from "dotenv"; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
import express from "express";
import expressRateLimit from "express-rate-limit";
import helmet from "helmet";
import "reflect-metadata";
import { PORT } from "./config/constants";
import passport from "./lib/passport";
import { handleError } from "./middlewares/errors.middleware";
import routes from "./routes";
dotenv.config();

/**
 * bootstrap application
 *
 * @return
 */
(async () => {
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

  app.listen(app.get(PORT), () => {
    console.log(
      `[${process.env.NODE_ENV}] Server is up and running on PORT :${app.get(
        PORT,
      )}`,
    );
  });
})();
